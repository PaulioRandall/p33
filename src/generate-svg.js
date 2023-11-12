// generateSvg accepts an svgModel and returns an <svg> element.
//
// This function will only work if there is a global 'document' object with the
// standard set of functions.
export default (svgModel) => {
	checkHasCreateElement()
	return createNode(svgModel)
}

const checkHasCreateElement = () => {
	const hasFunc = document?.hasOwnProperty('createElement')
	if (!hasFunc) {
		throw new Error('[P33] Missing document.createElement')
	}
}

const createNode = (model) => {
	const node = document.createElement(model.tag)
	setAttributes(node, model)
	appendChildren(node, model)
}

const setAttributes = (node, { attributes }) => {
	if (!attributes) {
		return
	}

	for (const name in attributes) {
		node.setAttribute(name, attributes[name])
	}
}

const appendChildren = (node, { children }) => {
	if (!children) {
		return
	}

	for (const child of children) {
		node.append(createNode(child))
	}
}
