const { deepStrictEqual } = require('assert')
const sinon = require('sinon')

const Fatorial = require('./src/index')

;(async () => {
  const fatorial = new Fatorial()
  const spy = sinon.spy(fatorial, fatorial.calculate.name)
  
  fatorial.calculate(3)
  deepStrictEqual(spy.callCount, 3)
  deepStrictEqual(spy.getCall(0).firstArg, 3)
  deepStrictEqual(spy.getCall(1).firstArg, 2)
  deepStrictEqual(spy.getCall(2).firstArg, 1)
})()