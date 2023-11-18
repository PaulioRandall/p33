import tidyUpPolygons from './tidy-up-polygons.js'

describe('tidyUpPolygons', () => {
	test('properly translates coordinates', () => {
		const givenPolygons = {
			type: 'RightTriangle',
			a: {
				coordinates: [
					[0, 5],
					[5, 5],
					[5, 0],
					[0, 0],
				],
			},
			b: {
				coordinates: [
					[0, 0],
					[-10, 0],
					[-10, -10],
					[0, -10],
				],
			},
			c: {
				coordinates: [
					[0, 0],
					[10, 0],
					[0, 100],
				],
			},
		}

		const expPolygons = {
			type: 'RightTriangle',
			a: {
				coordinates: [
					[10, 15],
					[15, 15],
					[15, 10],
					[10, 10],
				],
			},
			b: {
				coordinates: [
					[10, 10],
					[0, 10],
					[0, 0],
					[10, 0],
				],
			},
			c: {
				coordinates: [
					[10, 10],
					[20, 10],
					[10, 110],
				],
			},
		}

		tidyUpPolygons(givenPolygons)
		expect(givenPolygons).toEqual(expPolygons)
	})

	test('returns expected size', () => {
		const givenPolygons = {
			type: 'RightTriangle',
			a: {
				coordinates: [
					[0, 5],
					[15, 5],
					[15, 0],
					[0, 0],
				],
			},
			b: {
				coordinates: [
					[0, 0],
					[-10, 0],
					[-10, -10],
					[0, -10],
				],
			},
		}

		const expSize = [25, 15]

		const actSize = tidyUpPolygons(givenPolygons)
		expect(expSize).toEqual(actSize)
	})
})
