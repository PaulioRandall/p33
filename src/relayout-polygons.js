// relayoutPolygons translates all polygons so that the left most and top most
// point of the entire set becomes zero. The width and height are returned.
export default (polygons) => {
	const bounds = findBounds(polygons)

	if (bounds.left || bounds.top) {
		const offset = [-bounds.left, -bounds.top]
		translatePolygons(polygons, offset)
	}

	return [bounds.right - bounds.left, bounds.bot - bounds.top]
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
		for (const point of poly) {
			updateBoundsFromPoint(point, bounds)
		}
	}
}

const updateBoundsFromPoint = (point, bounds) => {
	bounds.left = Math.min(point[0], bounds.left)
	bounds.right = Math.max(point[0], bounds.right)

	bounds.top = Math.min(point[1], bounds.top)
	bounds.bot = Math.max(point[1], bounds.bot)
}

const translatePolygons = (polygons, offset) => {
	for (const poly of polygons) {
		for (const point of poly) {
			translatePoint(point, offset)
		}
	}
}

const translatePoint = (point, [x, y]) => {
	point[0] = point[0] + x
	point[1] = point[1] + y
}
