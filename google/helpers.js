function getSheet(name) {
  const SS = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = SS.getSheetByName(name);

  return sheet;
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
      const finalKey = key.toLowerCase().replaceAll(' ', '_');

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

function objectToArray(obj) {
  let result = [];
  for (let key in obj) {
    result.push(obj[key]);
  }
  return result;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('-');
}
