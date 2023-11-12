// toSvgModel accepts a set of polygons and returns a model object for
// constructing an SVG.
//
// This intermediate step is a precursor to the generateSvg function that
// actually creates an SVG from JavaScript Elements.
//
// By decoupling it from the generate function it allows users to customise
// attributes and makes it much easier for users of web language frameworks
// to build their own SVGs. For example, a Svelte component can easily be built
// from a model that includes reactive parts.
export default (polygons) => {
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
