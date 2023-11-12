import RightTriangle from './RightTriangle.js'

describe('RightTriangle', () => {
	describe('As a leaf', () => {
		describe('setA', () => {
			test('3, 4, 5 => 4, 4, ?', () => {
				const t = new RightTriangle()
				t.setA(4)

				expect(t.a).toEqual(4)
				expect(t.b).toEqual(4)
				expect(t.c).toEqual(5.7)
			})
		})

		describe('setB', () => {
			test('3, 4, 5 => 3, 5, ?', () => {
				const t = new RightTriangle()
				t.setB(5)

				expect(t.a).toEqual(3)
				expect(t.b).toEqual(5)
				expect(t.c).toEqual(5.8)
			})
		})

		describe('setC', () => {
			test('3, 4, 5 => ?, ?, 13', () => {
				const t = new RightTriangle()
				t.setC(13)

				expect(t.a).toEqual(7.8)
				expect(t.b).toEqual(10.4)
				expect(t.c).toEqual(13)
			})

			test('3, 4, 5 => ?, ?, 42', () => {
				const t = new RightTriangle()
				t.setC(42)

				expect(t.a).toEqual(25.2)
				expect(t.b).toEqual(33.6)
				expect(t.c).toEqual(42)
			})
		})

		describe('scaleA', () => {
			test('by 2: 3, 4, 5 => 6, 4, ?', () => {
				const t = new RightTriangle()
				t.scaleA(2)

				expect(t.a).toEqual(6)
				expect(t.b).toEqual(4)
				expect(t.c).toEqual(7.2)
			})
		})

		describe('scaleB', () => {
			test('by 2: 3, 4, 5 => 3, 8, ?', () => {
				const t = new RightTriangle()
				t.scaleB(2)

				expect(t.a).toEqual(3)
				expect(t.b).toEqual(8)
				expect(t.c).toEqual(8.5)
			})
		})

		describe('scaleC', () => {
			test('by 2: 3, 4, 5 => ?, ?, 10', () => {
				const t = new RightTriangle()
				t.scaleC(2)

				expect(t.a).toEqual(6)
				expect(t.b).toEqual(8)
				expect(t.c).toEqual(10)
			})
		})

		describe('setPrecision', () => {
			test('adds recalculates with correct number of decimal points', () => {
				const t = new RightTriangle()
				t.setPrecision(3)
				t.setA(4)

				expect(t.a).toEqual(4)
				expect(t.b).toEqual(4)
				expect(t.c).toEqual(5.657)

				t.setPrecision(2)

				expect(t.a).toEqual(4)
				expect(t.b).toEqual(4)
				expect(t.c).toEqual(5.66)
			})
		})
	})
})
