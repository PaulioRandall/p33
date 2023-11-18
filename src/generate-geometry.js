import Victor from 'victor'

const RIGHT_ANGLE = (Math.PI / 180) * 90

// generatePolygons
const generatePolygons = (schema) => {
	schema = structuredClone(schema)
	schema.polygons = []

	addLengthC(schema)
	
	const tp = trianglePolygon(schema)
	translatePolygon(tp, schema.c, 0)

	const ap = squarePolygon(schema, 'a')
	translatePolygon(ap, schema.c, -schema.c)
	
	const bp = squarePolygon(schema, 'b')
	translatePolygon(bp, schema.c, schema.c)

	const cp = squarePolygon(schema, 'c')

	schema.polygons = [
		tp,
		ap,
		bp,
		cp
	]

	return schema
}

// addLengthC calculates c (hypotenuse) for the schema and each sub-schema.
const addLengthC = (schema) => {
	schema.c = calcHypotenuse(schema.a, schema.b)
}

const calcHypotenuse = (a, b) => {
	return Math.sqrt(a * a + b * b)
}

// trianglePolygon calculates the polygons points for a triangle
// starting at (0,0) moving anti-clockwise.
//
// The result  will be in the form:
// {
//   shape: 'triangle',
//   points: [
//     { x: 0, y: 0, angle: angleOppositeA },
//     { x: ?, y: ?, angle: RIGHT_ANGLE },
//     { x: 0, y: c, angle: RIGHT_ANGLE - angleOppositeA },
//   ],
// }
const trianglePolygon = (schema) => {
	const angleA = Math.asin(schema.a / schema.c)
	const midPoint = new Victor(0, schema.b).rotate(-angleA)

	return {
		shape: 'triangle',
		points: [
			newPoint(0, 0, angleA),
			newPoint(midPoint.x, midPoint.y, RIGHT_ANGLE),
			newPoint(0, schema.c, RIGHT_ANGLE - angleA),
		],
	}
}

// squarePolygon calculates the polygons points for a square starting at
// (0,0) moving anti-clockwise.
//
// The result  will be in the form:
// {
//   side: 'a',
//   shape: 'square',
//   points: [
//     { x: 0,    y: 0,    angle: RIGHT_ANGLE },
//     { x: side, y: 0,    angle: RIGHT_ANGLE },
//     { x: side, y: side, angle: RIGHT_ANGLE },
//     { x: 0,    y: side, angle: RIGHT_ANGLE },
//   ],
// }
const squarePolygon = (schema, side) => {
	const len = schema[side]

	return {
		side: side,
		shape: 'square',
		points: [
			newPoint(0, 0, RIGHT_ANGLE),
			newPoint(len, 0, RIGHT_ANGLE),
			newPoint(len, len, RIGHT_ANGLE),
			newPoint(0, len, RIGHT_ANGLE),
		],
	}
}

const translatePolygon = (polygon, x, y) => {
	for (const point of polygon.points) {
		point.x += x
		point.y += y
	}
}

const newPoint = (x, y, angle) => ({ x, y, angle })

const round = (n, dp) => {
	const dpMod = Math.pow(10, dp)
	return Math.round(n * dpMod) / dpMod
}

const sqrtRound = (n, dp) => {
	n = Math.sqrt(n)
	return round(n, dp)
}

export default generatePolygons
