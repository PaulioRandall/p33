import RightTriangle from './RightTriangle.js'
import generatePolygons from './generate-polygons.js'

describe('generatePolygons', () => {
	test('1st square #1', () => {
		const rt = new RightTriangle()

		const act = generatePolygons(rt)
		const exp = [
			[0, 0],
			[5, 0],
			[5, 5],
			[0, 5],
			[0, 0]
		]
		
		expect(act[0]).toEqual(exp)
	})

	test('1st square #2', () => {
		const rt = new RightTriangle()
		rt.setC(20)

		const act = generatePolygons(rt)
		const exp = [
			[0, 0],
			[20, 0],
			[20, 20],
			[0, 20],
			[0, 0]
		]

		expect(act[0]).toEqual(exp)
	})

	test('2nd square', () => {
		const rt = new RightTriangle()
		
		const act = generatePolygons(rt)
		const exp = [
			[5, 0],
			[7.4, -1.8]
			[9.7, 0],
			[7.4, 1.8],
			[5, 0]
		]

		expect(act[1]).toEqual(exp)
	})

	test('3rd square', () => {
		const rt = new RightTriangle()
		
		const act = generatePolygons(rt)
		const exp = [
			[5, 5],
			[7.4, -1.8],
			[9.7, 5],
			[7.4, 1.8],
			[5, 5]
		]

		//expect(act[2]).toEqual(exp)
	})
})
