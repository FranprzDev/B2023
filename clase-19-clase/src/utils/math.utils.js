const sum = (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') throw new Error('Arguments must be numbers')
    
    return a + b
}

const subtraction = (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') throw new Error('Arguments must be numbers')

    return a - b
}

const multiplication = (a, b) => a * b // TODO: Realizar el testing. 
// TODO: Verificar que las multiplicaciones tengan el segino correcpondiente

const division = (a, b) => a / b // TODO: mejor el codigo de la division, ya que no se puede dividir por 0.
// TODO: Realizar el testing

const calculator = (a, b, operation) => operation(a, b)
// TODO: Mockear callback multiplicacion y division

module.exports = {
    sum,
    subtraction,
    multiplication,
    division,
    calculator
}
