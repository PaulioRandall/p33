import generateGeometry from './generate-geometry.js'

const RIGHT_ANGLE = (Math.PI / 180) * 90

// fixAllObjectNumbers accepts an object and optional positive decimal place
// number and converts all numbers into strings using Number.toFixed.
//
// This function is recursive such that all numbers in all nested objects and
// arrays are also converted. Defaults to seven decimal places.
//
// Created for dealing with JavaScript's dodgy number precision and rounding
// within automated tests.
export const fixAllObjectNumbers = (obj, dp = 7) => {
	for (const name in obj) {
		switch (typeOf(obj[name])) {
			case 'number':
				obj[name] = obj[name].toFixed(dp)
			case 'object':
				fixAllObjectNumbers(obj[name])
			case 'array':
				fixAllArrayNumbers(obj[name])
		}
	}
}

// fixAllArrayNumbers accepts an array and optional positive decimal place
// number and converts all numbers into strings using Number.toFixed.
//
// This function is recursive such that all numbers in all nested objects and
// arrays are also converted. Defaults to seven decimal places.
//
// Created for dealing with JavaScript's dodgy number precision and rounding
// within automated tests.
export const fixAllArrayNumbers = (array, dp = 7) => {
	for (let i = 0; i < array.length; i++) {
		switch (typeOf(array[i])) {
			case 'number':
				array[i] = array[i].toFixed(dp)
			case 'object':
				fixAllObjectNumbers(array[i])
			case 'array':
				fixAllArrayNumbers(array[i])
		}
	}
}

const typeOf = (v) => {
	if (Array.isArray(v)) return 'array'
	if (v === null || v === undefined) return 'meh'
	return typeof v
}

describe('generatePolygons', () => {
	test('generates simple polygon', () => {
		const given = {
			a: 3,
			b: 4,
			// c: 5
		}

		const exp = {
			shape: 'right-triangle',
			a: 3,
			b: 4,
			c: 5,
			width: 10.6,
			height: 9.8,
			origin: {
				x: 0,
				y: 2.4,
			},
			polygons: [
				{
					shape: 'triangle',
					side: 't',
					points: [
						{ x: 5, y: 2.4, angle: 0.6435011087932844 },
						{ x: 7.4, y: 5.6, angle: RIGHT_ANGLE },
						{ x: 5, y: 7.4, angle: RIGHT_ANGLE - 0.6435011087932844 },
					],
					len: 3,
					area: 6,
					center: {
						x: 6,
						y: 5.4,
					},
				},
				{
					shape: 'square',
					side: 'c',
					points: [
						{ x: 0, y: 2.4, angle: RIGHT_ANGLE },
						{ x: 5, y: 2.4, angle: RIGHT_ANGLE },
						{ x: 5, y: 7.4, angle: RIGHT_ANGLE },
						{ x: 0, y: 7.4, angle: RIGHT_ANGLE },
					],
					len: 5,
					area: 25,
					center: {
						x: 2.5,
						y: 4.9,
					},
				},
				{
					shape: 'square',
					side: 'b',
					points: [
						{ x: 8.2, y: 0, angle: RIGHT_ANGLE },
						{ x: 10.6, y: 3.2, angle: RIGHT_ANGLE },
						{ x: 7.4, y: 5.6, angle: RIGHT_ANGLE },
						{ x: 5, y: 2.4, angle: RIGHT_ANGLE },
					],
					len: 4,
					area: 16,
					center: {
						x: 7.8,
						y: 2.8,
					},
				},
				{
					shape: 'square',
					side: 'a',
					points: [
						{ x: 5, y: 7.4, angle: RIGHT_ANGLE },
						{ x: 7.4, y: 5.6, angle: RIGHT_ANGLE },
						{ x: 9.2, y: 8, angle: RIGHT_ANGLE },
						{ x: 6.8, y: 9.8, angle: RIGHT_ANGLE },
					],
					len: 3,
					area: 9,
					center: {
						x: 7.1,
						y: 7.7,
					},
				},
			],
		}

		const act = generateGeometry(given)
		fixAllObjectNumbers(act)
		fixAllObjectNumbers(exp)
		expect(act).toEqual(exp)
	})

	test('generates nested polygon', () => {
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
			shape: 'right-triangle',
			a: {
				a: 3,
				b: 4,
				c: 5,
			},
			b: 12,
			c: 13,
			width: 28.6923077,
			height: 21.7230769,
			origin: {
				x: 0,
				y: 4.6153846,
			},
			polygons: [
				{
					shape: 'triangle',
					side: 't',
					points: [
						{ x: 13, y: 4.6153846, angle: 0.3947911 },
						{ x: 17.6153846, y: 15.6923077, angle: RIGHT_ANGLE },
						{ x: 13, y: 17.6153846, angle: 1.1760052 },
					],
					len: 5,
					area: 30,
					center: {
						x: 15,
						y: 14.6153846,
					},
				},
				{
					shape: 'square',
					side: 'c',
					points: [
						{ x: 0, y: 4.6153846, angle: RIGHT_ANGLE },
						{ x: 13, y: 4.6153846, angle: RIGHT_ANGLE },
						{ x: 13, y: 17.6153846, angle: RIGHT_ANGLE },
						{ x: 0, y: 17.6153846, angle: 1.5707963 },
					],
					len: 13,
					area: 169,
					center: {
						x: 6.5,
						y: 11.1153846,
					},
				},
				{
					shape: 'square',
					side: 'b',
					points: [
						{ x: 24.0769231, y: 0, angle: RIGHT_ANGLE },
						{ x: 28.6923077, y: 11.0769231, angle: RIGHT_ANGLE },
						{ x: 17.6153846, y: 15.6923077, angle: RIGHT_ANGLE },
						{ x: 13, y: 4.6153846, angle: RIGHT_ANGLE },
					],
					len: 12,
					area: 144,
					center: {
						x: 20.8461538,
						y: 7.8461538,
					},
				},
				{
					shape: 'right-triangle',
					side: 'a',
					a: 3,
					b: 4,
					c: 5,
					origin: {
						x: 13,
						y: 17.6153846,
					},
					polygons: [
						{
							shape: 'triangle',
							side: 't',
							points: [
								{ x: 17.6153846, y: 15.6923077, angle: 0.6435011087932844 },
								{ x: 15.5846154, y: 19.1384615, angle: RIGHT_ANGLE },
								{
									x: 13,
									y: 17.6153846,
									angle: RIGHT_ANGLE - 0.6435011087932844,
								},
							],
							len: 3,
							area: 6,
							center: {
								x: 15.2307692,
								y: 17.7692308,
							},
						},
						{
							shape: 'square',
							side: 'b',
							points: [
								{ x: 21.0615385, y: 17.7230769, angle: RIGHT_ANGLE },
								{ x: 19.0307692, y: 21.1692308, angle: RIGHT_ANGLE },
								{ x: 15.5846154, y: 19.1384615, angle: RIGHT_ANGLE },
								{ x: 17.6153846, y: 15.6923077, angle: RIGHT_ANGLE },
							],
							len: 4,
							area: 16,
							center: {
								x: 18.3230769,
								y: 18.4307692,
							},
						},
						{
							shape: 'square',
							side: 'a',
							points: [
								{ x: 13, y: 17.6153846, angle: RIGHT_ANGLE },
								{ x: 15.5846154, y: 19.1384615, angle: RIGHT_ANGLE },
								{ x: 14.0615385, y: 21.7230769, angle: RIGHT_ANGLE },
								{ x: 11.4769231, y: 20.2, angle: RIGHT_ANGLE },
							],
							len: 3,
							area: 9,
							center: {
								x: 13.5307692,
								y: 19.6692308,
							},
						},
					],
				},
			],
		}

		const act = generateGeometry(given)
		fixAllObjectNumbers(act)
		fixAllObjectNumbers(exp)
		expect(act).toEqual(exp)
	})
})
