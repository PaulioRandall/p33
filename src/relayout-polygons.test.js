import relayoutPolygons from './relayout-polygons.js'

describe('relayoutPolygons', () => {
	test('properly translates polygons', () => {
		const givenPolygons = [
			[
				[0, 5],
				[5, 5],
				[5, 0],
				[0, 0],
			],
			[
				[0, 0],
				[-10, 0],
				[-10, -10],
				[0, -10],
			],
			[
				[0, 0],
				[10, 0],
				[0, 100],
			],
		]

		const expPolygons = [
			[
				[10, 15],
				[15, 15],
				[15, 10],
				[10, 10],
			],
			[
				[10, 10],
				[0, 10],
				[0, 0],
				[10, 0],
			],
			[
				[10, 10],
				[20, 10],
				[10, 110],
			],
		]

		relayoutPolygons(givenPolygons)
		expect(givenPolygons).toEqual(expPolygons)
	})

	test('returns expected size', () => {
		const givenPolygons = [
			[
				[0, 5],
				[15, 5],
				[15, 0],
				[0, 0],
			],
			[
				[0, 0],
				[-10, 0],
				[-10, -10],
				[0, -10],
			],
		]

		const expSize = [25, 15]

		const actSize = relayoutPolygons(givenPolygons)
		expect(expSize).toEqual(actSize)
	})
})
