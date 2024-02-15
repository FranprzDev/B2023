const sum = (a, b) => a + b
const subtraction = (a, b) => a - b
const multiplication = (a, b) => a * b
const division = (a, b) => a / b
const calculator = (a, b, operation) => operation(a, b)

module.exports = {
    sum,
    subtraction,
    multiplication,
    division,
    calculator
}
