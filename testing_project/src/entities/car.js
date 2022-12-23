const Base = require("./base");

class Car extends Base {
  constructor({ id, name, year, available, gasFull }) {
    super({ id, name })

    this.year = year
    this.available = available
    this.gasFull = gasFull
  }
}

module.exports = Car