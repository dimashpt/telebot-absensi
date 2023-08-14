// ini adalah file untuk mengelola presensi di google sheet
function presence(username = 'dimashpt', coordinate = '-6.917464, 107.619125') {
  // kolom absensi: Username, Nama, Tanggal, Jam Datang, Jam Pulang, Koordinat Datang, Koordinat Pulang, Status, Keterangan
  // mengambil data dari sheet 'presensi'
  const ss = getSheet('presensi');
  const date = new Date();
  // date format DD-MM-YYYY
  const dateNow =
    date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
  const timeNow =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

  // cek apakah user sedang cuti atau tidak
  const listCuti = getListCuti(username).history_cuti;
  const searchCuti = listCuti.filter((cuti) => {
    const dateNoTime = date.setHours(0, 0, 0, 0);

    return (
      dateNoTime >= new Date(cuti.tanggal_cuti) &&
      dateNoTime <= new Date(cuti.tanggal_akhir_cuti)
    );
  });
  const isCuti = searchCuti.length > 0;

  if (isCuti) {
    console.log('Sedang cuti');
    return {
      isError: true,
      message: 'Tidak dapat melakukan absen, anda sedang dalam cuti',
    };
  }

  const filterData = (item) => {
    const _isUsernameEqual = item.username === username;
    const _isDateEqual =
      new Date(item.tanggal).toDateString() === date.toDateString();

    return _isUsernameEqual && _isDateEqual;
  };
  const data = ss
    .getRange(1, 1, ss.getLastRow(), ss.getLastColumn())
    .getValues();
  const parsedData = parseData(data);
  const row = parsedData.findIndex(filterData) + 2;

  // console.log({timeNow, lat, lng, dateNow, user, data})

  // cek apakah user sudah absen atau belum, jika sudah maka update data absensi berdasarkan username dan tanggal, jika belum maka tambahkan data absensi
  if (row > 1) {
    if (parsedData[row - 2].jam_pulang !== '') {
      console.log('Sudah absen');
      return {
        error: true,
        message: 'Anda sudah absen pulang hari ini',
      };
    }

    // jika user sudah absen maka update data absensi
    ss.getRange(row, 5).setValue(timeNow);
    ss.getRange(row, 7).setValue(coordinate);
  } else {
    ss.appendRow([
      username,
      'Dimas',
      formatDate(date),
      timeNow,
      '',
      coordinate,
      '',
      'Hadir',
      '',
    ]);
  }
}
