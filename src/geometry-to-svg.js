// geometry-to-svg accepts a geometry object generated via the generateGeometry
// function and returns a HTML SVG element.
//
// This is great if you just want a static SVG element that you can modify with
// your own attributes. If you want an interactive SVG diagram I recommend
// using the polygons directly with your web framework of choice. This is what
// I've done.
//
// Note that the input coordinate system has its origin at bottom left while
// the SVG coordinate system is at the top left. This means the resultant SVG
// will be a vertical mirror of the input geometry. If you want to maintain the
// orientation you'll either have to mirror the input geometry points first or
// apply a 180 y-rotation to the output SVG element.
export default (geometry) => {
	checkHasCreateElementNS()
	return newSvg(geometry)
}

const checkHasCreateElementNS = () => {
	if (!document?.createElementNS) {
		throw new Error('[P33] Missing document.createElementNS')
	}
}

const newSvg = (geometry) => {
	return createNode({
		tag: 'svg',
		attributes: {
			'xmlns:xlink': 'http://www.w3.org/1999/xlink',
			viewBox: `0 0 ${geometry.width} ${geometry.height}`,
			preserveAspectRatio: 'xMidYMid',
			class: 'width: 100%; height: 100%;',
			stroke: 'goldenrod',
		},
		children: polygonsToElements(geometry.polygons),
	})
}

const polygonsToElements = (polygons) => {
	return polygons.map((poly) => polygonToElement(poly)).flat()
}

const polygonToElement = (poly) => {
	if (poly.polygons) {
		return polygonsToElements(poly.polygons)
	}

	return createNode({
		tag: 'polygon',
		attributes: {
			points: poly.points.map((p) => `${p.x},${p.y}`).join(' '),
		},
	})
}

const createNode = (model) => {
	const node = document.createElementNS('http://www.w3.org/2000/svg', model.tag)
	setAttributes(node, model)
	setStyle(node, model)
	appendChildren(node, model)
	return node
}

const setAttributes = (node, { attributes }) => {
	if (!attributes) {
		return
	}

	for (const name in attributes) {
		node.setAttribute(name, attributes[name])
	}
}

const setStyle = (node, { style }) => {
	if (!style) {
		return
	}

	for (const name in style) {
		node.style[name] = style[name]
	}
}

const appendChildren = (node, { children }) => {
	if (!children) {
		return
	}

	for (const child of children) {
		node.append(child)
	}
}
