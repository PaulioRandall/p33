import RightTriangle from './RightTriangle'

// generatePolygons returns an array of polygons from a right angle triangle.
// The result will include the triangle and three squares.
//
// Polygon c's top left point will be (0,0) and all other positions derived
// from it. This is intended for easy use with the SVG g tag. To offset pass
// an array as the second parameter in the form [x, y] where both values are
// numbers.
export default generatePolygons = (rt, offset = [0, 0]) => {
	checkRightTriangle(rt)
	offset = checkOffset(offset)

	return [
		// cs
		// as
		// bs
		// triangle
	]
}

const checkRightTriangle = (rt) => {
	if (!rt) {
		throw newError('Missing instance of RightTriangle')
	}

	if (!(rt instanceof RightTriangle)) {
		throw newError(`Expected instanceof RightTriangle but got ${typeof rt}`)
	}
}

const checkOffset = (offset) => {
	if (!offset) {
		return [0, 0]
	}

	const expected = 'Expected two number offset array'

	if (!Array.isArray(offset)) {
		throw newError(`${expected} but got '${typeof offset}'`)
	}

	if (offset.length != 2) {
		throw newError(`${expected} but got one of length ${offset.length}`)
	}

	if (typeof offset[0] !== 'number' || typeof offset[1] !== 'number') {
		throw newError(`${expected} but got items of the wrong type '${offset}'`)
	}

	return offset
}

const newError = (msg) => {
	return new Error(`[RightTriangle] ${msg}`)
}
