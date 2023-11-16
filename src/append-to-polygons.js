// append-to-polygons attaches polygons from a rightTriangle after setting the
// c length with the value of the specified side.
//
// Given polygons in the form: { a, b, c, t };
// A single side from the set: ['a', 'b', 'c'];
// And an instance of RightTriangle.
//
// For instance, invoking:
// (
//   { ..., c: { type: 'Square', length: 13, ... } },
//   'c',
//   RightTriangle{ ..., c: 5 }
// )
//
// would yield: { ..., c: { type: 'Polygon', ..., c: 13, ... } }
export default (polygons, side, rightTriangle) => {}
