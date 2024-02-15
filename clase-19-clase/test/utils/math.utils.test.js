const { sum, subtraction, calculator } = require('../../src/utils/math.utils')

describe('Function suma', () => {
    test('sum deberia Lanzar un error si el primer parametro no es numero', () => {
        expect(() => sum('hola', 3)).toThrow()
        expect(() => sum(null, 3)).toThrow()
        expect(() => sum(undefined, 3)).toThrow()
        expect(() => sum({}, 3)).toThrow()
        expect(() => sum(new Date(), 3)).toThrow()
    })
    
    test('sum deberia Lanzar un error si el segundo parametro no es numero', () => {
        expect(() => sum(3, 'Hola')).toThrow()
        expect(() => sum(3, null)).toThrow()
        expect(() => sum(3, undefined)).toThrow()
        expect(() => sum(3, {})).toThrow()
        expect(() => sum(3, new Date())).toThrow()
    })
    
    test('sum deberia devolver las suma correcta de los numeros', () => {
        expect(sum(2, 3)).toBe(5)
        expect(sum(2 * 4, 2 ** 3)).toBe(16)
    })
})

describe('Function subtraction', () => {
    test('subtraction deberia Lanzar un error si el primer parametro no es numero', () => {
        expect(() => subtraction('hola', 3)).toThrow()
        expect(() => subtraction(null, 3)).toThrow()
        expect(() => subtraction(undefined, 3)).toThrow()
        expect(() => subtraction({}, 3)).toThrow()
        expect(() => subtraction(new Date(), 3)).toThrow()
    })
    
    test('subtraction deberia Lanzar un error si el segundo parametro no es numero', () => {
        expect(() => subtraction(3, 'Hola')).toThrow()
        expect(() => subtraction(3, null)).toThrow()
        expect(() => subtraction(3, undefined)).toThrow()
        expect(() => subtraction(3, {})).toThrow()
        expect(() => subtraction(3, new Date())).toThrow()
    })
    
    test('subtraction deberia devolver las resta correcta de los numeros', () => {
        expect(subtraction(10, 5)).toBe(5)
        expect(subtraction(100, 200)).toBe(-100)
        expect(subtraction(50, -50)).toBe(100)
    })
})

describe('Function multiplication', () => {
})

describe('Function division', () => {
})

describe('Function calculator', () => {
    describe('Function calculator sin mocking', () => {
        test('calculator con sum deberia devolver las suma correcta de los numeros', () => {
            expect(calculator(2, 3, sum)).toBe(5)
            expect(calculator(2, -2, sum)).toBe(0)
            expect(calculator(10, 10, sum)).toBe(20)
        })

        test('calculator con subtraction deberia devolver las restas correctas de los numeros', () => {
            expect(calculator(2, 3, subtraction)).toBe(-1)
            expect(calculator(2, -2, subtraction)).toBe(4)
            expect(calculator(10, 10, subtraction)).toBe(0)
        })
    })

    describe('Function calculator con mocking', () => {

        test('Calculator ejecuta correctamente el callback', () => {
            const mockOperationFn = jest.fn()

            calculator(2, 3, mockOperationFn)

            expect(mockOperationFn).toHaveBeenCalledTimes(1)
            expect(mockOperationFn).toHaveBeenLastCalledWith(2, 3)
        })
    })
})