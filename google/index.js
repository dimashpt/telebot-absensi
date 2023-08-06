function main() {
  // return findEmployee('dimashpt');
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function parseData(data, username) {
  const filtered = data.filter((employee) => employee[0] !== '');
  const keys = filtered[0];
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
  const parsedData = parseData(data);

  return parsedData;
}

function doGet(e) {
  let response;

  if (e.parameter.action === 'getEmployee') {
    response = findEmployee(e.parameter.username);
  } else {
    response = {
      message: 'Invalid action',
    };
  }

  return jsonResponse(response);
}
