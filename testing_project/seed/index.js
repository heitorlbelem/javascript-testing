const faker = require('faker')
const Car = require('../src/entities/car')
const CarCategory = require('../src/entities/carCategory')
const Customer = require('../src/entities/customer')

const { join } = require('path')
const { writeFile } = require('fs/promises')
const databaseFolder = join(__dirname, "../", "database")
const ITEMS_AMOUNT = 2

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100)
})

const cars = []
const customers = []
for(let index=0; index <= ITEMS_AMOUNT; index++) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasFull: true,
    year: faker.date.past().getFullYear
  })

  const customer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({ min: 18, max: 50 })
  })

  carCategory.carIds.push(car.id)
  cars.push(car)
  customers.push(customer)
}

const write = (filename, data) => {
  writeFile(join(databaseFolder, filename), JSON.stringify(data))
}

;(async() => {
  write('cars.json', cars)
  write('carCategories.json', [carCategory])
  write('customers.json', customers)
})()