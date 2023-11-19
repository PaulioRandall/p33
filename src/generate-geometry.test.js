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
			width: 10.6,
			height: 9.8,
			polygons: [
				{
					shape: 'triangle',
					points: [
						{ x: 5, y: 2.4, angle: 0.6435011087932844 },
						{ x: 7.4, y: 5.6, angle: RIGHT_ANGLE },
						{ x: 5, y: 7.4, angle: RIGHT_ANGLE - 0.6435011087932844 },
					],
				},
				{
					side: 'a',
					shape: 'square',
					points: [
						{ x: 5, y: 7.4, angle: RIGHT_ANGLE },
						{ x: 7.4, y: 5.6, angle: RIGHT_ANGLE },
						{ x: 9.2, y: 8, angle: RIGHT_ANGLE },
						{ x: 6.8, y: 9.8, angle: RIGHT_ANGLE },
					],
				},
				{
					side: 'b',
					shape: 'square',
					points: [
						{ x: 8.2, y: 0, angle: RIGHT_ANGLE },
						{ x: 10.6, y: 3.2, angle: RIGHT_ANGLE },
						{ x: 7.4, y: 5.6, angle: RIGHT_ANGLE },
						{ x: 5, y: 2.4, angle: RIGHT_ANGLE },
					],
				},
				{
					side: 'c',
					shape: 'square',
					points: [
						{ x: 0, y: 2.4, angle: RIGHT_ANGLE },
						{ x: 5, y: 2.4, angle: RIGHT_ANGLE },
						{ x: 5, y: 7.4, angle: RIGHT_ANGLE },
						{ x: 0, y: 7.4, angle: RIGHT_ANGLE },
					],
				},
			],
		}

		const act = generateGeometry(given)
		expect(act).toEqual(exp)
	})
	/*
	test('generates nested polygon', () => {
		const given = {
			a: {
				a: 3,
				b: 4,
			},
			b: 12,
			// c: 13
		}

		const exp = {
			a: {
				a: 3,
				b: 4,
			},
			b: 12,
			c: 13,
			width: 10.6,
			height: 9.8,
			polygons: [
				{
					shape: 'triangle',
					points: [
						{ x: 5, y: 2.4, angle: 0.6435011087932844 },
						{ x: 7.4, y: 5.6, angle: RIGHT_ANGLE },
						{ x: 5, y: 7.4, angle: RIGHT_ANGLE - 0.6435011087932844 },
					],
				},
				{
					side: 'a',
					shape: 'square',
					polygons: [
						{
							shape: 'triangle',
							points: [
								{ x: 5, y: 2.4, angle: 0.6435011087932844 },
								{ x: 7.4, y: 5.6, angle: RIGHT_ANGLE },
								{ x: 5, y: 7.4, angle: RIGHT_ANGLE - 0.6435011087932844 },
							],
						},
						{
							side: 'a',
							shape: 'square',
							points: [
								{ x: 5, y: 7.4, angle: RIGHT_ANGLE },
								{ x: 7.4, y: 5.6, angle: RIGHT_ANGLE },
								{ x: 9.2, y: 8, angle: RIGHT_ANGLE },
								{ x: 6.8, y: 9.8, angle: RIGHT_ANGLE },
							],
						},
						{
							side: 'b',
							shape: 'square',
							points: [
								{ x: 8.2, y: 0, angle: RIGHT_ANGLE },
								{ x: 10.6, y: 3.2, angle: RIGHT_ANGLE },
								{ x: 7.4, y: 5.6, angle: RIGHT_ANGLE },
								{ x: 5, y: 2.4, angle: RIGHT_ANGLE },
							],
						},
						{
							side: 'c',
							shape: 'square',
							points: [
								{ x: 0, y: 2.4, angle: RIGHT_ANGLE },
								{ x: 5, y: 2.4, angle: RIGHT_ANGLE },
								{ x: 5, y: 7.4, angle: RIGHT_ANGLE },
								{ x: 0, y: 7.4, angle: RIGHT_ANGLE },
							],
						},
					],
				},
				{
					side: 'b',
					shape: 'square',
					points: [
						{ x: 8.2, y: 0, angle: RIGHT_ANGLE },
						{ x: 10.6, y: 3.2, angle: RIGHT_ANGLE },
						{ x: 7.4, y: 5.6, angle: RIGHT_ANGLE },
						{ x: 5, y: 2.4, angle: RIGHT_ANGLE },
					],
				},
				{
					side: 'c',
					shape: 'square',
					points: [
						{ x: 0, y: 2.4, angle: RIGHT_ANGLE },
						{ x: 5, y: 2.4, angle: RIGHT_ANGLE },
						{ x: 5, y: 7.4, angle: RIGHT_ANGLE },
						{ x: 0, y: 7.4, angle: RIGHT_ANGLE },
					],
				},
			],
		}

		const act = generateGeometry(given)
		expect(act).toEqual(exp)
	})
	*/
})
