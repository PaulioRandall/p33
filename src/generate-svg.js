// toSvgModel accepts a set of polygons and returns a model object for
// for constructing an SVG.
export const toSvgModel = (polygons) => {
	return {
		tag: 'svg',
		attributes: {
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: '0 0 1000 1000',
			preserveAspectRatio: 'xMidYMid',
		},
		children: newGroup(polygons),
	}
}

const newGroup = (polygons) => {
	return [
		{
			tag: 'g',
			children: polygons.map(newPolygon),
		},
	]
}

const newPolygon = (polygon) => {
	return {
		tag: 'polygon',
		attributes: {
			points: polygon.map((p) => `${p[0]},${p[1]}`).join(' '),
		},
	}
}

// generateSvg returns an SVG for embedding in a
export const generateSvg = (svgElements) => {}
