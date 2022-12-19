const File = require('./src/file')
const { rejects, deepStrictEqual } = require('assert')
const { error } = require('./src/constants')
  ;

(async () => {
  {
    const filePath = './mocks/invalid-fields.csv'
    const rejection = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/invalid-four-lines.csv'
    const rejection = new Error(error.FILE_ITEMS_COUNT_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/invalid-empty-file.csv'
    const rejection = new Error(error.EMPTY_FILE_ERROR_MESSAGE)
    const result = File.csvToJSON(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/valid-file.csv'
    const expected = [
      {
        "id": 1,
        "name": "heitor",
        "profession": "dev",
        "birthYear": 1998
      },
      {
        "id": 2,
        "name": "nat",
        "profession": "dentista",
        "birthYear": 1997
      },
      {
        "id": 3,
        "name": "tres",
        "profession": "pedreiro",
        "birthYear": 1982
      },
      {
        "id": 4,
        "name": "quatro",
        "profession": "maceneiro",
        "birthYear": 1988
      }
    ]
    const result = await File.csvToJSON(filePath)
    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
})()