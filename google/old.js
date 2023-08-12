// function main() {
//   return doPresence(
//     '6285750506009',
//     '-0.053545678188727235,109.31976583801759',
//   );
// }

/*
  Fungsi ini digunakan untuk mengakomodasi permintaan HTTP GET yang mengandung parameter action=doPresence dengan   memanggil fungsi doPresence() dan mengembalikan hasilnya. Jika tidak terdapat parameter action=doPresence, maka akan mengembalikan pesan "Invalid action.".

  #ref: https://developers.google.com/apps-script/guides/web?hl=en
*/
// function doGet(e) {
//   var output = '';
//   // untuk membaca apakah ada request get dengan parameter ?action=doPresence
//   if (e.parameter.action == 'absen') {
//     output = doPresence(e.parameter.waNumber, e.parameter.latlang);
//   } else {
//     output = 'Invalid action.';
//   }

//   return output;
// }

/*
  doPresence(waNumber, latlang)
  merupakan fungsi utama untuk melakukan proses absensi
*/
function doPresence(waNumber, latlang) {
  // menginisiasi semua sheet yang dibutuhkan
  let sheetPresensi =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Presensi');
  let sheetLog = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Log');
  let sheetDataPegawai =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data-Pegawai');
  let sheetSettings =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Settings');

  // ambil range data di sheet Data-Pegawai
  let rangeDataPegawai = sheetDataPegawai.getDataRange();
  let dataPegawai = rangeDataPegawai.getValues();

  // ambil range data di sheet Presensi
  let rangePresensi = sheetPresensi.getDataRange();
  let presensi = rangePresensi.getValues();

  // ambil range data di sheet Settings
  let rangeSettings = sheetSettings.getDataRange();
  let settings = rangeSettings.getValues();

  // cek apakah terdapat data pegawai berdasarkan nomor wa
  if (!findPegawaiByWaNumber(waNumber)) {
    //return response jika data tidak ada
    const response = {
      success: false,
      brand: sheetSettings.getRange('B1').getValue(),
      message: `Data pegawai ${waNumber} tidak ditemukan`,
    };

    return ContentService.createTextOutput(
      JSON.stringify(response),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // inisiasi untuk memanggil data pegawai
  dataPegawai = findPegawaiByWaNumber(waNumber);

  // inisiasi latlang
  let latlngPegawai = latlang.split(',');
  let latPegawai = parseFloat(latlngPegawai[0]);
  let lngPegawai = parseFloat(latlngPegawai[1]);

  // get latlang di sheet Settings row B5
  // settings[4][1] = maksudnya ambil data di baris index ke 4 dan kolom index 1 -> B5
  // mulai index dari 0
  let latlngUsaha = settings[4][1].split(',');
  let latUsaha = parseFloat(latlngUsaha[0]);
  let lngUsaha = parseFloat(latlngUsaha[1]);

  // get latlang di sheet Settings row B6
  // settings[5][1] = maksudnya ambil data di baris index ke 5 dan kolom index 1 -> B6
  let radius = settings[5][1];

  //hitung titik lokasi absen masuk dalam radius yg diizinkan dengan metode Haversine
  let dist = getDistance(latPegawai, lngPegawai, latUsaha, lngUsaha);
  if (dist > radius) {
    // return pesan gagal jika diluar area
    const response = {
      success: false,
      brand: sheetSettings.getRange('B1').getValue(),
      message: 'Anda tidak berada dalam jangkauan area',
    };

    return ContentService.createTextOutput(
      JSON.stringify(response),
    ).setMimeType(ContentService.MimeType.JSON);
  }

  // inisiasi untuk mengambil tanggal dan jam sekarang
  let now = new Date();
  let dateToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let jam = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

  //# lakukan INSERT ke Log Presensi setiap kali melakukan absen
  let rowLog = [dateToday, jam, dataPegawai[1], waNumber, latlang];
  sheetLog.appendRow(rowLog);

  let response = {};

  // generate id berdasarkan lastrow untuk data di sheet Presensi
  let lastRowPresensi = sheetPresensi.getLastRow();

  // Ambil ID dari row sebelumnya
  let lastIdPresensi = sheetPresensi.getRange(lastRowPresensi, 1).getValue();
  let newIdPresensi = lastIdPresensi + 1;

  // cek apakah pegawai sudah absen atau belum hari ini
  let presensiData = findPresenceTodayByStaff(dateToday, waNumber);

  if (presensiData) {
    console.log('Sudah absen pagi');
    var row = presensiData;

    // lakukan update jam pulang jika sudah absen
    sheetPresensi.getRange(row[0], 6).setValue(jam);
    // lakukan update koordinat
    sheetPresensi.getRange(row[0], 8).setValue(latlang);

    //jika pulang sebelum waktunya, tandai dg warna kuning di absen
    // pulang sebelum waktunya (PSW) adalah kondisi pegawai absen sebelum jam pulang (lihat di sheet Settings -> B4)
    if (getStatusJamPulang(jam) == 'Pulang Sebelum Waktunya') {
      //update status PSW
      const lastStatus = sheetPresensi.getRange(row[0], 9).getValue();
      const statusArr = lastStatus.split(', ');
      if (!statusArr.includes('Pulang Sebelum Waktunya')) {
        statusArr.push('Pulang Sebelum Waktunya');
      }
      const newStatus = statusArr.join(', ');
      sheetPresensi.getRange(row[0], 9).setValue(newStatus);

      var range = sheetPresensi.getRange(
        row[0],
        1,
        1,
        sheetPresensi.getLastColumn(),
      );
      range.setBackground('#FED966'); //ubah warna baris background menjadi kuning
    }

    //lakukan return response yg nanti akan dibaca oleh WaBot
    response = {
      success: true,
      message: 'Berhasil melakukan Presensi Pulang',
      presence: {
        brand: sheetSettings.getRange('B1').getValue(),
        name: dataPegawai[1],
        date: dateFormatIndonesia(now),
        jam_datang: sheetPresensi.getRange(row[0], 5).getDisplayValue(),
        jam_pulang: jam,
      },
    };
  } else {
    // jika data tidak ada atau belum ada absen hari ini
    console.log('Belum ada data absen hari ini');

    // insert data presensi baru (absen kedatangan)
    sheetPresensi.appendRow([
      isNaN(newIdPresensi) ? 1 : newIdPresensi,
      dateToday,
      dataPegawai[1], //nama pegawai
      waNumber,
      jam,
      '',
      latlang,
      '',
      getStatusJamKedatangan(jam),
    ]);

    //jika datang terlambat, tandai dg warna kuning di absen
    if (getStatusJamKedatangan(jam) == 'Datang Terlambat') {
      var range = sheetPresensi.getRange(
        lastRowPresensi + 1,
        1,
        1,
        sheetPresensi.getLastColumn(),
      );
      range.setBackground('#FED966'); //ubah warna background menjadi kuning
    }

    //lakukan return response yg nanti akan dibaca oleh WaBot
    response = {
      success: true,
      message: 'Berhasil melakukan Presensi Kedatangan',
      presence: {
        brand: sheetSettings.getRange('B1').getValue(),
        name: dataPegawai[1],
        date: dateFormatIndonesia(now),
        jam_datang: jam,
        jam_pulang: null,
      },
    };
  }

  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/*
  findPegawaiByWaNumber(waNumber)
  adalah fungsi untuk mencari data pegawai berdasarkan nomor whatsapp

  return data pegawai jika ditemukan
*/
function findPegawaiByWaNumber(waNumber) {
  var sheetDataPegawai =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data-Pegawai');
  var rangeDataPegawai = sheetDataPegawai.getDataRange();
  var dataPegawai = rangeDataPegawai.getValues();

  for (var i = 1; i < dataPegawai.length; i++) {
    if (dataPegawai[i][2] == waNumber) {
      return dataPegawai[i];
    }
  }
  return null;
}

/*
  findPresensiByDateAndWaNumber(dateToday, waNumber)
  adalah fungsi untuk mencari presensi berdasarkan tanggal dan nomor whatsapp

  return data jika ditemukan
*/
function findPresenceTodayByStaff(dateToday, waNumber) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const presensiSheet = ss.getSheetByName('Presensi');

  const data = presensiSheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const tgl = new Date(row[1]);
    const nomor_wa = row[3].toString();

    if (
      tgl.toDateString() == dateToday.toDateString() &&
      nomor_wa == waNumber
    ) {
      return [i + 1, row];
    }
  }

  return null; // data presensi tidak ditemukan
}

/*
  function untuk mendapatkan status jam pulang berdasarkan jam absen
  jika absen kurang dari jam pulang, maka status = Pulang Sebelum Waktunya
*/
function getStatusJamKedatangan(jam) {
  const sheetSettings = SpreadsheetApp.getActive().getSheetByName('Settings');
  const jamKedatangan = sheetSettings.getRange('B3').getValue();

  const jamKedatanganFormatted = Utilities.formatDate(
    jamKedatangan,
    'GMT+07:00',
    'HH:mm:ss',
  );

  //mengubah format jam ke HH:mm:ss
  const jamDate = new Date('January 1, 1970 ' + jam);
  const jamFormatted = Utilities.formatDate(jamDate, 'GMT+07:00', 'HH:mm:ss');

  console.log('Jam Absen : ' + jamFormatted);
  console.log('Jam Kedatangan : ' + jamKedatanganFormatted);

  if (jamFormatted <= jamKedatanganFormatted) {
    return '';
  } else {
    return 'Datang Terlambat';
  }
}

/*
  function untuk mendapatkan status jam pulang berdasarkan jam absen
  jika absen kurang dari jam pulang, maka status = Pulang Sebelum Waktunya
*/
function getStatusJamPulang(jam) {
  const sheetSettings = SpreadsheetApp.getActive().getSheetByName('Settings');
  const jamPulang = sheetSettings.getRange('B4').getValue();

  const jamPulangFormatted = Utilities.formatDate(
    jamPulang,
    'GMT+07:00',
    'HH:mm:ss',
  );

  //mengubah format jam ke HH:mm:ss
  const jamDate = new Date('January 1, 1970 ' + jam);
  const jamFormatted = Utilities.formatDate(jamDate, 'GMT+07:00', 'HH:mm:ss');

  console.log('Jam Absen : ' + jamFormatted);
  console.log('Jam Pulang : ' + jamPulangFormatted);

  if (jamFormatted < jamPulangFormatted) {
    return 'Pulang Sebelum Waktunya';
  } else {
    return '';
  }
}

/*
  function untuk mengubah format tanggal ke format indonesia
*/
function dateFormatIndonesia(date) {
  var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  var formattedDate = date
    .toLocaleDateString('id-ID', options)
    .replace('Januari', 'Jan')
    .replace('Februari', 'Feb')
    .replace('Maret', 'Mar')
    .replace('Mei', 'May')
    .replace('Juni', 'Jun')
    .replace('Juli', 'Jul')
    .replace('Agustus', 'Agu')
    .replace('Oktober', 'Okt')
    .replace('Desember', 'Des')
    .replace(/,/g, ''); // menghapus koma diantara tanggal dan tahun

  var parts = formattedDate.split(' ');
  var dayName = parts[0];
  var dayNumber = parts[1];
  var monthName = parts[2];
  var yearNumber = parts[3];

  // mengubah format ke "Hari, Tanggal Bulan Tahun"
  var result = dayName + ', ' + dayNumber + ' ' + monthName + ' ' + yearNumber;

  console.log(result);
  return result;
}

/*
  Metode yang digunakan dalam menghitung jarak antara dua titik koordinat pada fungsi getDistance() adalah menggunakan rumus Haversine.
*/
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371000; // earth radius in meters
  const phi1 = toRadians(lat1);
  const phi2 = toRadians(lat2);
  const deltaPhi = toRadians(lat2 - lat1);
  const deltaLambda = toRadians(lng2 - lng1);

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) *
      Math.cos(phi2) *
      Math.sin(deltaLambda / 2) *
      Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c;

  return d;
}

function toRadians(degrees) {
  return (degrees * Math.PI) / 180;
}
