import Victor from 'victor'

// generatePolygons
export default (schema) => {
	schema = structuredClone(schema)

	/*
		{
			a: 3,
			b: 4,
		}
	*/

	addLengthC(schema)

	/*
		{
			a: 3,
			b: 4,
			c: 5,
		}
	*/

	schema.polygons = []

	/*
		{
			a: 3,
			b: 4,
			c: 5,
			polygons: [], 
		}
	*/

	appendTrianglePolygon(schema)

	/*
		{
			a: 3,
			b: 4,
			c: 5,
			polygons: [
				{
					shape: 'triangle',
					angle: 0.6435011087932844,
					points: [
						[0, 0],
						[2.4, 3.2],
						[0, 5],
					],
				},
			]
		}
	*/

	return schema
}

// addLengthC calculates c (hypotenuse) for the schema and each sub-schema.
const addLengthC = (schema) => {
	schema.c = calcHypotenuse(schema.a, schema.b)
}

const calcHypotenuse = (a, b) => {
	return Math.sqrt(a * a + b * b)
}

// appendTrianglePolygons calculates the polygons points for a triangle
// starting at (0,0) moving anti-clockwise.
//
// The result  will be in the form:
// {
//   shape: 'triangle',
//   points: [
//     [0, 0],
//     [x, y], // Where x > 0 && x < c && y > 0 && y < c
//     [0, c],
//   ],
// }
const appendTrianglePolygon = (schema) => {
	const rotation = Math.asin(schema.a / schema.c)
	const midPoint = new Victor(0, schema.b).rotate(-rotation)

	schema.polygons.push({
		shape: 'triangle',
		angle: rotation,
		points: [[0, 0], midPoint.toArray(), [0, schema.c]],
	})
}

const round = (n, dp) => {
	const dpMod = Math.pow(10, dp)
	return Math.round(n * dpMod) / dpMod
}

const sqrtRound = (n, dp) => {
	n = Math.sqrt(n)
	return round(n, dp)
}
