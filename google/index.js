function main() {}

function findEmployee(username) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('karyawan');
  const dataRange = sheet.getRange(1, 1, 100, 10);
  const data = dataRange.getValues();
  const parsedData = parseData(data, username);

  return parsedData;
}

function findDetails(username) {
  const sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName('detail karyawan');
  const dataRange = sheet.getRange(1, 1, 100, 15);
  const data = dataRange.getValues();
  const parsedData = parseData(data, username);

  return parsedData;
}

function getListCuti(username) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('cuti');
  const dataRange = sheet.getRange(
    1,
    1,
    sheet.getLastRow(),
    sheet.getLastColumn(),
  );
  const data = dataRange.getValues();
  const parsedData = parseData(data).filter((d) => d.username === username);

  return {
    sisa_cuti: findEmployee(username)?.sisa_cuti,
    history_cuti: parsedData,
  };
}

function addCuti(data) {
  const SS = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = SS.getSheetByName('cuti');
  const dataFinal = [
    data?.username,
    data?.tanggal_mulai,
    data?.tanggal_akhir,
    data?.jumlah_hari,
    data?.alasan,
    'pending',
  ];

  sheet.appendRow(dataFinal);
}

function updateInformasiPribadi(data) {
  const SS = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = SS.getSheetByName('detail karyawan');
  const dataFinal = [
    data?.username,
    data?.nama_lengkap,
    data?.jenis_kelamin,
    data?.tempat_lahir,
    data?.tanggal_lahir,
    data?.telepon,
    data?.agama,
    data?.menikah,
    data?.alamat,
    data?.no_ktp,
    data?.no_npwp,
  ];

  const lastRowEdit = sheet.getLastRow();

  for (var i = 2; i <= lastRowEdit; i++) {
    if (sheet.getRange(i, 1).getValue() == data.username) {
      sheet.getRange('A' + i + ':K' + i).setValues([dataFinal]);
    }
  }
}

function doGet(req) {
  const authenticatedUser = findEmployee(req.parameter.username);
  let response;

  if (!authenticatedUser?.aktif) {
    return jsonResponse({
      error: true,
      message: 'Anda tidak memiliki akses ke bot ini',
    });
  }

  if (req.parameter.action === 'getEmployee') {
    response = findEmployee(req.parameter.username);
  } else if (req.parameter.action === 'getEmployeeDetails') {
    response = findDetails(req.parameter.username);
  } else if (req.parameter.action === 'updateInformasiPribadi') {
    response = updateInformasiPribadi(req.parameter);
  } else if (req.parameter.action === 'getCutiHistory') {
    response = getListCuti(req.parameter.username);
  } else if (req.parameter.action === 'addCuti') {
    response = addCuti(req.parameter);
  } else if (req.parameter.action === 'presensi') {
    response = presence(req.parameter.username, req.parameter.coordinate);
  } else {
    response = {
      error: true,
      message: 'Invalid action',
    };
  }

  return jsonResponse(response);
}
