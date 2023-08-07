function main() {
  // return getListCuti('dimashpt');
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function parseData(data, username) {
  const filtered = data.filter((employee) => employee[0] !== '');
  const keys = filtered[0].filter((key) => key !== '');
  const values = filtered.slice(1);
  const result = values.map((value) => {
    const obj = {};

    keys.forEach((key, index) => {
      const finalKey = key.toLowerCase().replace(' ', '_');

      obj[finalKey] = value[index];
    });

    return obj;
  });

  if (username) {
    // Execute selected name
    return result.find((employee) => employee.username === username);
  }

  return result;
}

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
  const parsedData = parseData(data);

  console.log(parsedData.filter((d) => d.username === username));

  return parsedData;
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
  } else if (req.parameter.action === 'getCutiHistory') {
    response = getListCuti(req.parameter.username);
  } else {
    response = {
      error: true,
      message: 'Invalid action',
    };
  }

  return jsonResponse(response);
}
