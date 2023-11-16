import tidyUpPolygons from './tidy-up-polygons.js'

describe('tidyUpPolygons', () => {
	test('properly translates polygons', () => {
		const givenPolygons = {
			a: [
				[0, 5],
				[5, 5],
				[5, 0],
				[0, 0],
			],
			b: [
				[0, 0],
				[-10, 0],
				[-10, -10],
				[0, -10],
			],
			c: [
				[0, 0],
				[10, 0],
				[0, 100],
			],
		}

		const expPolygons = {
			a: [
				[10, 15],
				[15, 15],
				[15, 10],
				[10, 10],
			],
			b: [
				[10, 10],
				[0, 10],
				[0, 0],
				[10, 0],
			],
			c: [
				[10, 10],
				[20, 10],
				[10, 110],
			],
		}

		tidyUpPolygons(givenPolygons)
		expect(givenPolygons).toEqual(expPolygons)
	})

	test('returns expected size', () => {
		const givenPolygons = {
			a: [
				[0, 5],
				[15, 5],
				[15, 0],
				[0, 0],
			],
			b: [
				[0, 0],
				[-10, 0],
				[-10, -10],
				[0, -10],
			],
		}

		const expSize = [25, 15]

		const actSize = tidyUpPolygons(givenPolygons)
		expect(expSize).toEqual(actSize)
	})
})
