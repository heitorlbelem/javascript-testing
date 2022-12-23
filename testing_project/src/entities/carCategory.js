const Base = require("./base");

class CarCategory extends Base {
  constructor({ id, name, price, carIds }) {
    super({ id, name })

    this.price = price
    this.carIds = carIds
  }
}

module.exports = CarCategory