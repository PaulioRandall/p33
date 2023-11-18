import generatePolygons from './generate-polygons.js'

const nintyDegreesAsRadians = (Math.PI / 180) * 90

describe('generatePolygons', () => {
	test('generates simple polygon', () => {
		const given = {
			a: 3,
			b: 4,
			// c: 5
		}

		const exp = {
			a: 3,
			b: 4,
			c: 5,
			polygons: [
				{
					shape: 'triangle',
					points: [
						{ x: 0, y: 0, rads: 0.6435011087932844 },
						{ x: 2.4, y: 3.2, rads: nintyDegreesAsRadians },
						{ x: 0, y: 5, rads: nintyDegreesAsRadians - 0.6435011087932844 },
					],
				},
			],
		}

		const act = generatePolygons(given)
		expect(act).toEqual(exp)
	})
	/*
	test('generates simple polygon', () => {
		const given = {
			a: 3,
			b: 4,
			// c: 5
		}

		const exp = {
			a: 3,
			b: 4,
			c: 5,
			width: 0,
			height: 0,
			polygons: [
				{
					shape: 'triangle',
					points: [
						[5, 5],
						[7.4, 3.2],
						[5, 0],
					],
				},
				{
					side: 'a',
					shape: 'square',
					points: [
						[5, 5],
						[6.8, 7.4],
						[9.2, 5.6],
						[7.4, 3.2],
					],
				},
				{
					side: 'b',
					shape: 'square',
					points: [
						[5, 0],
						[7.4, 3.2],
						[10.6, 0.8],
						[8.2, -2.4],
					],
				},
				{
					side: 'c',
					shape: 'square',
					points: [
						[0, 5],
						[5, 5],
						[5, 0],
						[0, 0],
					],
				},
			],
		}

		const act = generatePolygons(given)
		expect(act).toEqual(exp)
	})
*/
	/*
	test('generates with nested polygon', () => {
		const given = {
			a: {
				a: 3,
				b: 4,
				// c: 5
			},
			b: 12,
			// c: 13
		}

		const exp = {
			width: 0,
			height: 0,
			polygons: [
				{
					shape: 'triangle',
					points: [
						[0, 0],
						[0, 0],
						[0, 0],
					],
				},
				{
					side: 'a',
					shape: 'square',
					polygons: [
						{
							shape: 'triangle',
							points: [
								[0, 0],
								[0, 0],
								[0, 0],
							],
						},
						{
							side: 'a',
							shape: 'square',
							points: [
								[0, 0],
								[0, 0],
								[0, 0],
								[0, 0],
							],
						},
						{
							side: 'b',
							shape: 'square',
							points: [
								[0, 0],
								[0, 0],
								[0, 0],
								[0, 0],
							],
						},
						{
							side: 'c',
							shape: 'square',
							points: [
								[0, 0],
								[0, 0],
								[0, 0],
								[0, 0],
							],
						},
					],
				},
				{
					side: 'b',
					shape: 'square',
					points: [
						[0, 0],
						[0, 0],
						[0, 0],
						[0, 0],
					],
				},
				{
					side: 'c',
					shape: 'square',
					points: [
						[0, 0],
						[0, 0],
						[0, 0],
						[0, 0],
					],
				},
			],
		}

		const act = generatePolygons(given)
		expect(act).toEqual(exp)
	})
	*/
})
