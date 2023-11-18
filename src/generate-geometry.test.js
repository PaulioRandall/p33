import generateGeometry from './generate-geometry.js'

const RIGHT_ANGLE = (Math.PI / 180) * 90

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
						{ x: 5, y: 0, angle: 0.6435011087932844 },
						{ x: 7.4, y: 3.2, angle: RIGHT_ANGLE },
						{ x: 5, y: 5, angle: RIGHT_ANGLE - 0.6435011087932844 },
					],
				},
				{
					side: 'a',
					shape: "square",
					points: [
						{ x: 5, y: -5, angle: RIGHT_ANGLE },
						{ x: 8, y: -5, angle: RIGHT_ANGLE },
						{ x: 8, y: -2, angle: RIGHT_ANGLE },
						{ x: 5, y: -2, angle: RIGHT_ANGLE },
					]
				},
				{
					side: 'b',
					shape: "square",
					points: [
						{ x: 5, y: 5, angle: RIGHT_ANGLE },
						{ x: 9, y: 5, angle: RIGHT_ANGLE },
						{ x: 9, y: 9, angle: RIGHT_ANGLE },
						{ x: 5, y: 9, angle: RIGHT_ANGLE },
					]
				},
				{
					side: 'c',
					shape: "square",
					points: [
						{ x: 0, y: 0, angle: RIGHT_ANGLE },
						{ x: 5, y: 0, angle: RIGHT_ANGLE },
						{ x: 5, y: 5, angle: RIGHT_ANGLE },
						{ x: 0, y: 5, angle: RIGHT_ANGLE },
					]
				}				
			],
		}

		const act = generateGeometry(given)
		expect(act).toEqual(exp)
	})

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
