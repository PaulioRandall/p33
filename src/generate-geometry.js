import Victor from 'victor'

const RIGHT_ANGLE = (Math.PI / 180) * 90

// generatePolygons returns an extension of the input object containing the
// points for one triangle, representing the right angle triangle, and points
// for three square polygons, representing the squared sides of that triangle.
const generatePolygons = (schema, root = true) => {
	schema = structuredClone(schema)

	let ap = null
	if (typeof schema.a === 'object') {
		ap = generatePolygons(schema.a, false)
		ap.side = 'a'
	}

	let bp = null
	if (typeof schema.b === 'object') {
		bp = generatePolygons(schema.b, false)
		bp.side = 'b'
	}

	applyLengthCToSchema(schema)

	// Lowercase for sides
	const a = getLength(schema.a)
	const b = getLength(schema.b)
	const c = schema.c

	// Uppercase for angles in radians
	const A = findAngleA(a, c)
	const B = A - RIGHT_ANGLE

	const tp = trianglePolygon(a, b, c, A)
	translatePolygonBy(tp, c, 0)

	if (ap) {
		rotateSchemaBy(ap, -RIGHT_ANGLE)
		translateSchemaBy(ap, c + a, c - a)
		changeSchemaOriginPoint(ap, 2)
		rotateSchemaBy(ap, A)
		removeSquarePolygon(ap, 'c')
	} else {
		ap = squarePolygon(a, 'a')
		translatePolygonBy(ap, c, c)
		rotatePointsBy(ap.points, ap.points[0], A)
	}

	if (bp) {
		translateSchemaBy(bp, c - b, 0)
		changeSchemaOriginPoint(bp, 1)
		rotateSchemaBy(bp, A)
		removeSquarePolygon(bp, 'c')
	} else {
		bp = squarePolygon(b, 'b')
		translatePolygonBy(bp, c, -b)
		rotatePointsBy(bp.points, bp.points[3], B)
	}

	const cp = squarePolygon(c, 'c')

	schema.shape = 'right-triangle'
	schema.polygons = [tp, cp, bp, ap]
	schema.origin = { x: 0, y: 0 }

	if (root) {
		const bounds = findBounds(schema.polygons)
		translateSchemaBy(schema, -bounds.left, -bounds.top)
		computeSchemaCentroids(schema)

		const size = calcSize(bounds)
		schema.width = size.width
		schema.height = size.height
	}

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
		side: 't',
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
		shape: 'square',
		side: side,
		len: len,
		points: [
			newPoint(0, 0, RIGHT_ANGLE),
			newPoint(len, 0, RIGHT_ANGLE),
			newPoint(len, len, RIGHT_ANGLE),
			newPoint(0, len, RIGHT_ANGLE),
		],
	}
}

const changeSchemaOriginPoint = (schema, index) => {
	const newPoint = getPolygonBasePoints(schema.polygons)[index]
	schema.origin = {
		x: newPoint.x,
		y: newPoint.y,
	}
}

const getPolygonBasePoints = (polygons) => {
	const cp = polygons.find((poly) => poly.side === 'c')

	if (cp.polygons) {
		return getPolygonBasePoints(cp.polygons)
	}

	return cp.points
}

const translateSchemaBy = (schema, x, y) => {
	schema.origin.x += x
	schema.origin.y += y
	translatePolygonsBy(schema.polygons, x, y)
}

const translatePolygonsBy = (polygons, x, y) => {
	for (const poly of polygons) {
		translatePolygonBy(poly, x, y)
	}
}

const translatePolygonBy = (poly, x, y) => {
	if (poly.polygons) {
		translateSchemaBy(poly, x, y)
		return
	}

	for (const point of poly.points) {
		point.x += x
		point.y += y
	}
}

const rotateSchemaBy = (schema, amount) => {
	rotatePolygonsBy(schema.polygons, schema.origin, amount)
}

const rotatePolygonsBy = (polygons, origin, amount) => {
	for (const poly of polygons) {
		rotatePolygonBy(poly, origin, amount)
	}
}

const rotatePolygonBy = (poly, origin, amount) => {
	if (poly.polygons) {
		rotatePolygonsBy(poly.polygons, origin, amount)
		return
	}

	rotatePointsBy(poly.points, origin, amount)
}

const rotatePointsBy = (points, origin, amount) => {
	for (const point of points) {
		const v = new Victor(point.x - origin.x, point.y - origin.y)
		v.rotate(-amount)

		point.x = v.x + origin.x
		point.y = v.y + origin.y
	}
}

const removeSquarePolygon = (schema, side) => {
	const i = schema.polygons.findIndex((poly) => poly.side === 'c')
	schema.polygons.splice(i, 1)
}

const newPoint = (x, y, angle) => ({ x, y, angle })

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
		if (poly.polygons) {
			updateBoundsFromPolygons(poly.polygons, bounds)
			continue
		}

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

const computeSchemaCentroids = (schema) => {
	for (const poly of schema.polygons) {
		if (poly.polygons) {
			computeSchemaCentroids(poly)
			continue
		}

		if (poly.shape === 'triangle') {
			computeTriangleInCenter(poly)
			continue
		}

		computePolygonCenter(poly)
	}
}

const computeTriangleInCenter = (tri) => {
	const va = new Victor(tri.points[0].x, tri.points[0].y)
	const vb = new Victor(tri.points[1].x, tri.points[1].y)
	const vc = new Victor(tri.points[2].x, tri.points[2].y)

	const lenC = va.distance(vb)
	const lenA = vb.distance(vc)
	const lenB = vc.distance(va)

	const c = {
		x: 0,
		y: 0,
	}

	c.x = lenA * va.x
	c.x += lenB * vb.x
	c.x += lenC * vc.x
	c.x /= lenA + lenB + lenC

	c.y = lenA * va.y
	c.y += lenB * vb.y
	c.y += lenC * vc.y
	c.y /= lenA + lenB + lenC

	tri.center = c
	tri.len = Math.min(lenA, lenB, lenC)
	tri.area = (lenA * lenC) / 2
}

const computePolygonCenter = (poly) => {
	const points = poly.points

	const c = {
		x: 0,
		y: 0,
	}

	const len = points.length
	let shoelaceArea = 0

	for (let i = 0; i < len; i++) {
		const p = points[i]
		const p2 = i < len - 1 ? points[i + 1] : points[0]
		const intersect = p.x * p2.y - p2.x * p.y
		c.x += (p.x + p2.x) * intersect
		c.y += (p.y + p2.y) * intersect
		shoelaceArea += intersect
	}

	const area = shoelaceArea * 0.5
	const postSum = 1 / (6 * area)
	c.x *= postSum
	c.y *= postSum

	poly.area = area
	poly.center = c
}

export default generatePolygons
