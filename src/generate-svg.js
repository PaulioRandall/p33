// generateSvg accepts an svgModel and returns an <svg> element.
//
// This function will only work if there is a global 'document' object with the
// standard set of functions.
export default (svgModel) => {
	checkHasCreateElementNS()
	return createNode(svgModel)
}

const checkHasCreateElementNS = () => {
	if (!!!document?.createElementNS) {
		throw new Error('[P33] Missing document.createElement')
	}
}

const createNode = (model) => {
	const node = document.createElementNS(model.namespaceURI, model.tag)
	setAttributes(node, model)
	setStyle(node, model)
	appendChildren(model.namespaceURI, node, model)
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

const appendChildren = (namespaceURI, node, { children }) => {
	if (!children) {
		return
	}

	for (const child of children) {
		child.namespaceURI = namespaceURI
		node.append(createNode(child))
	}
}
