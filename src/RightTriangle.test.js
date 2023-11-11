import RightTriangle from './RightTriangle.js'

// 2, 2, 8
// 45, 45, 90

describe('RightTriangle', () => {
	describe('setC', () => {
		test('3, 4, 5 => ?, ?, 13', () => {
			const t = new RightTriangle()
			t.setC(13)

			expect(t.a).toEqual(7.8)
			expect(t.b).toEqual(10.4)
		})

		test('3, 4, 5 => ?, ?, 42', () => {
			const t = new RightTriangle()
			t.setC(42)

			expect(t.a).toEqual(25.2)
			expect(t.b).toEqual(33.6)
		})
	})

	describe('setA', () => {
		test('3, 4, 5 => 7.8, ?, ?', () => {
			const t = new RightTriangle()
			t.setA(4)

			expect(t.c).toEqual(5.7)
			expect(t.b).toEqual(4)
		})
	})
})
