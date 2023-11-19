import Victor from 'victor'

const RIGHT_ANGLE = (Math.PI / 180) * 90

// generatePolygons returns an extension of the input object containing the
// points for one triangle, representing the right angle triangle, and points
// for three square polygons, representing the squared sides of that triangle.
const generatePolygons = (schema) => {
	schema = structuredClone(schema)

	applyLengthCToSchema(schema)

	// Lowercase for sides
	const a = getLength(schema.a)
	const b = getLength(schema.b)
	const c = schema.c

	// Uppercase for angles in radians
	const A = findAngleA(a, c)
	const B = A - RIGHT_ANGLE

	const tp = trianglePolygon(a, b, c, A)
	translatePolygon(tp, c, 0)

	const ap = squarePolygon(a, 'a')
	translatePolygon(ap, c, c)
	rotatePolygon(ap, ap.points[0], A)

	const bp = squarePolygon(b, 'b')
	translatePolygon(bp, c, -b)
	rotatePolygon(bp, bp.points[3], B)

	const cp = squarePolygon(c, 'c')

	schema.polygons = [tp, ap, bp, cp]

	const bounds = findBounds(schema.polygons)
	translatePolygons(schema.polygons, -bounds.left, -bounds.top)

	const size = calcSize(bounds)
	schema.width = size.width
	schema.height = size.height

	return schema
}

// applyLengthCToSchema calculates c (hypotenuse) for the schema and each
// sub-schema.
const applyLengthCToSchema = (schema) => {
	schema.c = calcHypotenuse(schema.a, schema.b)
}

const calcHypotenuse = (a, b) => {
	a = getLength(a)
	b = getLength(b)
	return Math.sqrt(a * a + b * b)
}

const getLength = (schema) => {
	if (typeof schema === 'number') {
		return schema
	}

	applyLengthCToSchema(schema)
	return schema.c
}

const findAngleA = (a, c) => {
	return Math.asin(a / c)
}

// trianglePolygon calculates the polygons points for a triangle
// starting at (0,0) moving anti-clockwise.
const trianglePolygon = (a, b, c, A) => {
	const midPoint = new Victor(0, b).rotate(-A)

	return {
		shape: 'triangle',
		points: [
			newPoint(0, 0, A),
			newPoint(midPoint.x, midPoint.y, RIGHT_ANGLE),
			newPoint(0, c, RIGHT_ANGLE - A),
		],
	}
}

// squarePolygon calculates the polygons points for a square starting at
// (0,0) moving anti-clockwise.
const squarePolygon = (len, side) => {
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
