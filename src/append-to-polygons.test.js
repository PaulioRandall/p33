import RightTriangle from './RightTriangle.js'
import appendToPolygons from './append-to-polygons.js'

describe('appendToPolygon', () => {
	test('appends simple polygon', () => {
		const rt = new RightTriangle()

		const polygons = {
			type: 'RightTriangle',
			a: {
				type: 'Square',
				length: 5,
				coordinates: [
					[0, 5],
					[5, 5],
					[5, 0],
					[0, 0],
				],
			},
		}

		const exp = {
			type: 'RightTriangle',
			a: {
				type: 'RightTriangle',
				a: {
					type: 'Square',
					length: 3,
					rotation: -0.644,
					coordinates: [
						[5, 5],
						[6.8, 7.4],
						[9.2, 5.6],
						[7.4, 3.2],
					],
				},
				b: {
					type: 'Square',
					length: 4,
					rotation: 0.644,
					coordinates: [
						[5, 0],
						[7.4, 3.2],
						[10.6, 0.8],
						[8.2, -2.4],
					],
				},
				c: {
					type: 'Square',
					length: 5,
					rotation: 0,
					coordinates: [
						[0, 5],
						[5, 5],
						[5, 0],
						[0, 0],
					],
				},
				t: {
					type: 'Triangle',
					length: null,
					rotation: null,
					coordinates: [
						[5, 5],
						[7.4, 3.2],
						[5, 0],
					],
				},
			},
		}

		appendToPolygons(polygons, 'a', rt)
		expect(exp).toEqual(polygons)
	})
})
