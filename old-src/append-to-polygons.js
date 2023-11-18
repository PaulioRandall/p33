// append-to-polygons attaches polygons from a rightTriangle after setting the
// c length with the value of the specified side.
//
// Given polygons in the form: { a, b, c, t };
// A single side from the set: ['a', 'b'];
// And an instance of RightTriangle.
//
// For instance, invoking:
// appendToPolygons: (
//   { ..., b: { type: 'Square', length: 13, ... } },
//   'b',
//   RightTriangle{ ..., b: 5 }
// )
//
// would yield: { ..., b: { type: 'RightTriangle', ..., c: 13, ... } }
export default (polygons, side, rightTriangle) => {
	if (side !== 'a' && side !== 'b') {
		throw new Error(`Require side value to be either 'a' or 'b'`)
	}

	const len = getLength(polygons[side])
	rightTriangle.setC(len)
	polygons[side] = rightTriangle.generatePolygons()
}

const getLength = (shape) => {
	if (shape.type === 'RightTriangle') {
		return shape.c.length
	} else {
		return shape.length
	}
}
