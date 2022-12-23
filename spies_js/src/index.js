class Fatorial {
  calculate(curr) {
    if(curr <= 1) return 1

    return curr * this.calculate(curr-1)
  }
}

module.exports = Fatorial