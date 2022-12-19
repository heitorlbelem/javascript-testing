const { readFile } = require('fs/promises')
const { error } = require('./constants')
const User = require('./user')

const DEFAULT_OPTIONS = {
  maxLines: 4,
  fields: ['id','name','profession','age']
}

class File {
  static async csvToJSON(filePath) {
    const content = await this.getFileContent(filePath)
    const validation = await this.isValid(content)

    if(!validation.valid) throw new Error(validation.error)

    return await this.parseCsvToJson(content)
  }

  static async getFileContent(filePath) {
    const content = (await readFile(filePath)).toString()
    return content
  }

  static async isValid(csvContent, options = DEFAULT_OPTIONS) {
    const items = csvContent.split('\n')
    const header = items.shift()

    const isFileEmpty = items.length === 0 && header.length === 0
    if(isFileEmpty) {
      return {
        error: error.EMPTY_FILE_ERROR_MESSAGE,
        valid: false
      }
    }

    const isHeaderValid = header === options.fields.join(',')
    if(!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    const isItemsCountValid = items.length > 0 &&
      items.length <= options.maxLines
    if(!isItemsCountValid) {
      return {
        error: error.FILE_ITEMS_COUNT_ERROR_MESSAGE,
        valid: false
      }
    }

    return { valid: true }
  }

  static async parseCsvToJson(csvContent) {
    const items = csvContent.split('\n')
    const header = items.shift().split(',')

    return items.map((line) => {
      const columns = line.split(',')
      let user = {}
      columns.forEach((column, index) => {
        user[header[index]] = column
      })
      return new User(user)
    })
  }
}

module.exports = File