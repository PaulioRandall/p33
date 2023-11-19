import Victor from 'victor'

const RIGHT_ANGLE = (Math.PI / 180) * 90

// generatePolygons returns an extension of the input object containing the
// points for one triangle, representing the right angle triangle, and points
// for three square polygons, representing the squared sides of that triangle.
const generatePolygons = (schema) => {
	schema = structuredClone(schema)

	addLengthC(schema)
	const angleA = findAngleA(schema)
	const angleB = angleA - RIGHT_ANGLE

	const tp = trianglePolygon(schema)
	translatePolygon(tp, schema.c, 0)

	const ap = squarePolygon(schema, 'a')
	translatePolygon(ap, schema.c, schema.c)
	rotatePolygon(ap, ap.points[0], angleA)

	const bp = squarePolygon(schema, 'b')
	translatePolygon(bp, schema.c, -schema.b)
	rotatePolygon(bp, bp.points[3], angleB)

	const cp = squarePolygon(schema, 'c')

	schema.polygons = [tp, ap, bp, cp]

	const bounds = findBounds(schema.polygons)
	translatePolygons(schema.polygons, -bounds.left, -bounds.top)

	const size = calcSize(bounds)
	schema.width = size.width
	schema.height = size.height

	return schema
}

// addLengthC calculates c (hypotenuse) for the schema and each sub-schema.
const addLengthC = (schema) => {
	schema.c = calcHypotenuse(schema.a, schema.b)
}

const calcHypotenuse = (a, b) => {
	return Math.sqrt(a * a + b * b)
}

const findAngleA = (schema) => {
	return Math.asin(schema.a / schema.c)
}

// trianglePolygon calculates the polygons points for a triangle
// starting at (0,0) moving anti-clockwise.
const trianglePolygon = (schema) => {
	const angleA = findAngleA(schema)
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

const translatePolygons = (polygons, x, y) => {
	for (const poly of polygons) {
		translatePolygon(poly, x, y)
	}
}

const translatePolygon = (poly, x, y) => {
	for (const point of poly.points) {
		point.x += x
		point.y += y
	}
}

const rotatePolygon = (poly, origin, amount) => {
	for (const point of poly.points) {
		const v = new Victor(point.x - origin.x, point.y - origin.y)
		v.rotate(-amount)

		// Rounding because fails test due to miniscule JS float rounding.
		point.x = round(v.x + origin.x, 9)
		point.y = round(v.y + origin.y, 9)
	}
}

const newPoint = (x, y, angle) => ({ x, y, angle })

const round = (n, dp) => {
	const dpMod = Math.pow(10, dp)
	return Math.round(n * dpMod) / dpMod
}

const findBounds = (polygons) => {
	const bounds = {
		left: 0,
		right: 0,
		top: 0,
		bot: 0,
	}

	updateBoundsFromPolygons(polygons, bounds)
	return bounds
}

const updateBoundsFromPolygons = (polygons, bounds) => {
	for (const poly of polygons) {
		for (const point of poly.points) {
			updateBoundsFromPoint(point, bounds)
		}
	}
}

const updateBoundsFromPoint = (point, bounds) => {
	bounds.left = Math.min(point.x, bounds.left)
	bounds.right = Math.max(point.x, bounds.right)

	bounds.top = Math.min(point.y, bounds.top)
	bounds.bot = Math.max(point.y, bounds.bot)
}

const calcSize = (bounds) => {
	return {
		width: bounds.right - bounds.left,
		height: bounds.bot - bounds.top,
	}
}

export default generatePolygons
