import RightTriangle from './RightTriangle.js'
import generatePolygons from './generate-polygons.js'

describe('generatePolygons', () => {
	test('1st square (c)', () => {
		const rt = new RightTriangle()

		const act = generatePolygons(rt)
		const exp = [
			[0, 5],
			[5, 5],
			[5, 0],
			[0, 0],
			[0, 5],
		]

		expect(act[0]).toEqual(exp)
	})

	test('2nd square (a)', () => {
		const rt = new RightTriangle()

		const act = generatePolygons(rt)
		const exp = [
			[5, 5],
			[6.8, 7.4],
			[9.2, 5.6],
			[7.4, 3.2],
			[5, 5],
		]

		expect(act[1]).toEqual(exp)
	})

	test('3rd square (b)', () => {
		const rt = new RightTriangle()

		const act = generatePolygons(rt)
		const exp = [
			[5, 0],
			[7.4, 3.2],
			[10.6, 0.8],
			[8.2, -2.4],
			[5, 0],
		]

		expect(act[2]).toEqual(exp)
	})

	test('Triangle', () => {
		const rt = new RightTriangle()

		const act = generatePolygons(rt)
		const exp = [
			[5, 5],
			[7.4, 3.2],
			[5, 0],
			[5, 5],
		]

		expect(act[3]).toEqual(exp)
	})
})
