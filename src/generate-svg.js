
// toSvgModel accepts a set of polygons and returns a model object for
// for constructing an SVG.
export const toSvgModel = (polygons) => {
	return {
		tag: 'svg',
		children: newGroup(polygons),
	}
}

const newGroup = (polygons) => {
	return [
		{
			tag: 'g',
			children: polygons.map(newPolygon),
		}
	]
}

const newPolygon = (polygon) => {
	let points = polygon.slice(0, -1)
	points = points.map((p) => `${p[0]},${p[1]}`)

	return {
		tag: 'polygon',
		points: points.join(' '),
	}
}

// generateSvg returns an SVG for embedding in a
export const generateSvg = (svgElements) => {

}