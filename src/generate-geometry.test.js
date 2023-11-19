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
					points: [
						{ x: 5, y: 2.4, angle: 0.6435011087932844 },
						{ x: 7.4, y: 5.6, angle: RIGHT_ANGLE },
						{ x: 5, y: 7.4, angle: RIGHT_ANGLE - 0.6435011087932844 },
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
					side: 'a',
					shape: 'square',
					points: [
						{ x: 5, y: 7.4, angle: RIGHT_ANGLE },
						{ x: 7.4, y: 5.6, angle: RIGHT_ANGLE },
						{ x: 9.2, y: 8, angle: RIGHT_ANGLE },
						{ x: 6.8, y: 9.8, angle: RIGHT_ANGLE },
					],
				},
			],
		}

		const act = generateGeometry(given)
		expect(fixAllObjectNumbers(act)).toEqual(fixAllObjectNumbers(exp))
	})

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
		expect(fixAllObjectNumbers(act)).toEqual(fixAllObjectNumbers(exp))
	})
})
