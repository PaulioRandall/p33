import Victor from 'victor'
import RightTriangle from './RightTriangle.js'

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
export default (rt) => {
	checkRightTriangle(rt)

	const cs = [
		new Victor(0, rt.c), // top left
		new Victor(rt.c, rt.c), // top right
		new Victor(rt.c, 0), // bot right
		new Victor(0, 0), // bot left
		new Victor(0, rt.c), // top left
	]

	const ca = rotatedSquare(cs[1], rt.a, Math.asin(rt.a / rt.c))
	const cb = rotatedSquare(cs[2], rt.b, Math.asin(rt.a / rt.c))

	const tri = [
		ca[0],
		cb[1], // or ca[3]
		cb[0],
		ca[0],
	]

	return mapAndRoundPolygons([cs, ca, cb, tri], rt.precision())
}

const rotatedSquare = (origin, len, rotation) => {
	const left_to_top = new Victor(0, len).rotate(rotation).invertX()
	const top_to_right = new Victor(0, len)
		.rotate(rotation + Math.PI / 2)
		.invertX()
	const right_to_bot = new Victor(0, len).rotate(rotation + Math.PI).invertX()

	const left = origin.clone()
	const top = left.clone().add(left_to_top)
	const right = top.clone().add(top_to_right)
	const bot = right.clone().add(right_to_bot)

	return [left, top, right, bot, left]
}

const checkRightTriangle = (rt) => {
	if (!rt) {
		throw newError('Missing instance of RightTriangle')
	}

	if (!(rt instanceof RightTriangle)) {
		throw newError(`Expected instanceof RightTriangle but got ${typeof rt}`)
	}
}

const newError = (msg) => {
	return new Error(`[RightTriangle] ${msg}`)
}

const mapAndRoundPolygons = (polys, dp) => {
	return polys.map((p) => mapAndRoundPolygon(p, dp))
}

const mapAndRoundPolygon = (poly, dp) => {
	return poly.map((v) => mapAndRoundVictor(v, dp))
}

const mapAndRoundVictor = (vic, dp) => {
	return [round(vic.x, dp), round(vic.y, dp)]
}

const round = (n, dp) => {
	const dpMod = Math.pow(10, dp)
	return Math.round(n * dpMod) / dpMod
}

const radiansToDegrees = (rads) => {
	return rads * (180 / Math.PI)
}
