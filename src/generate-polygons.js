import RightTriangle from './RightTriangle'

// ######################################
// ######################################
// TODO: Just create the squares with one point in the correct place then use
//       this func to rotate them around that point:
//       https://stackoverflow.com/questions/4465931/rotate-rectangle-around-a-point

// generatePolygons returns an array of polygons representing the passed right
// angle triangle.
//
// The result will include the triangle and three squares. It is primarily
// intended for easy use with the SVG g tag.
//
// Polygon c's top left point will be (0,0) and all other positions derived
// from it. The collection will start with the hypotenuse square (c) on the
// left, the triangle attached to the right edge, square a attached to the
// upper triangle edge, and sqaure b attached to the bottom triangle edge.
//
// Because these are polygons the last item in each array will be the same as
// the first. Splice it off if you just need an array of points.
export default generatePolygons = (rt) => {
	checkRightTriangle(rt)
	//offset = checkOffset(offset)

	const cSquare = newSquarePoly([0, 0], rt.c)
	const triangle = newRightTrianglePoly(cSquare[1], rt.a, rt.b, rt.c)

	const aSquare = rotatePolygon(
		newSquarePoly(cSquare[1], rt.a),
		cSquare[1],
		Math.asin(b / c) // TODO: is correct?
	)

	const bSquare = rotatePolygon(
		translatePolygon(newSquarePoly(cSquare[2], rt.b), [0, -rt.b]),
		cSquare[2],
		Math.asin(a / c) // TODO: is correct?
	)

	return [cSquare, aSquare, bSquare, triangle]
}

const checkRightTriangle = (rt) => {
	if (!rt) {
		throw newError('Missing instance of RightTriangle')
	}

	if (!(rt instanceof RightTriangle)) {
		throw newError(`Expected instanceof RightTriangle but got ${typeof rt}`)
	}
}

const newSquarePoly = ([x, y], len) => [
	[x, y],
	[x + len, y],
	[x + len, y + len],
	[x, y + len],
	[x, y],
]

const newRightTrianglePoly = (x, y, a, b, c) => {
	return [[x, y], [x, y + c], calcRightAnglePoint(x, y, a, b, c), [x, y]]
}

// translatePolygon moves a polygon by the passed x and y.
const translatePolygon = (poly, [x, y]) => {
	return poly.map((point) => [point.x + x, point.y + y])
}

// rotatePolygon rotates a polygon around an origin point.
//
// Source: https://stackoverflow.com/questions/4465931/rotate-rectangle-around-a-point
const rotatePolygon = (poly, origin, rads) => {
	return poly.map((point) => rotatePoint(point, origin, rads))
}

// rotatePoint rotates a single point around an origin point.
//
// Source: https://stackoverflow.com/questions/4465931/rotate-rectangle-around-a-point
const rotatePoint = ([px, py], [ox, oy], rads) => {
	const angle = (rads * Math.PI) / 180.0
	return [
		Math.cos(angle) * (px - ox) - Math.sin(angle) * (py - oy) + ox,
		Math.sin(angle) * (px - ox) + Math.cos(angle) * (py - oy) + oy,
	]
}

const calcRightAnglePoint = (x, y, a, b, c) => {
	const radsOfOppositeA = radiansRemainingInRightAngle(a, c)
	const bo = lengthOfOpposite(radsOfOppositeA, b)
	const ba = lengthOfAdjacent(bo, b)

	return [x + ba, y + bo]
}

const radiansRemainingInRightAngle = (o, h) => {
	return degreesToRadians(90) - Math.asin(o / h)
}

const radiansToDegrees = (rads) => {
	return rads * (180 / Math.PI)
}

const degreesToRadians = (degs) => {
	return degs * (Math.PI / 180)
}

const lengthOfOpposite = (rads, h) => {
	return Math.sin(rads) * h
}

const lengthOfAdjacent = (o, h) => {
	return Math.sqrt(h * h - o * o)
}

/*
const checkOffset = (offset) => {
	if (!offset) {
		return [0, 0]
	}

	const expected = 'Expected two number offset array'

	if (!Array.isArray(offset)) {
		throw newError(`${expected} but got '${typeof offset}'`)
	}

	if (offset.length !== 2) {
		throw newError(`${expected} but got one of length ${offset.length}`)
	}

	if (typeof offset[0] !== 'number' || typeof offset[1] !== 'number') {
		throw newError(`${expected} but got items of the wrong type '${offset}'`)
	}

	return offset
}
*/
const newError = (msg) => {
	return new Error(`[RightTriangle] ${msg}`)
}
