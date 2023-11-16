import tidyUpPolygons from './tidy-up-polygons.js'

// polygons-to-svg-model accepts a set of polygons and returns a model object
// for constructing an SVG.
//
// This intermediate step is a precursor to the generateSvg function that
// actually creates an SVG from JavaScript Elements.
//
// By decoupling it from the generate function it allows users to customise
// attributes and makes it much easier for users of web language frameworks
// to build their own SVGs. For example, a Svelte component can easily be built
// from a model that includes reactive parts.
export default (polygons) => {
	const size = tidyUpPolygons(polygons)
	return newSvg(polygons, size)
}

const newSvg = (polygons, [width, height]) => {
	return {
		tag: 'svg',
		namespaceURI: 'http://www.w3.org/2000/svg',
		attributes: {
			'xmlns:xlink': 'http://www.w3.org/1999/xlink',
			viewBox: `0 0 ${width} ${height}`,
			preserveAspectRatio: 'xMidYMid',
		},
		style: {
			width: '100%',
			height: '100%',
		},
		children: newGroups(polygons),
	}
}

const newGroups = (polygons) => {
	return [newGroup(polygons)]
}

const newGroup = (polygons) => {
	return {
		tag: 'g',
		children: polygonsToElements(polygons),
	}
}

const polygonsToElements = (polygons) => {
	return Object.entries(polygons)
		.filter(([name, _]) => name !== 'type')
		.map(([name, poly]) => polygonToElement(name, poly))
}

const polygonToElement = (name, poly) => {
	return {
		tag: 'polygon',
		attributes: {
			points: poly.coordinates
				.map((p) => {
					return `${p[0]},${p[1]}`
				})
				.join(' '),
		},
	}
}
