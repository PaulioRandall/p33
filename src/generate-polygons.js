import Victor from 'victor'

export default (rt) => {
	const cs = [
		new Victor(0, rt.c), // top left
		new Victor(rt.c, rt.c), // top right
		new Victor(rt.c, 0), // bot right
		new Victor(0, 0), // bot left
	]

	const rotation = Math.asin(rt.a / rt.c)
	const ca = rotatedSquare(cs[1], rt.a, rotation)
	const cb = rotatedSquare(cs[2], rt.b, rotation)

	const tri = [
		ca[0],
		cb[1], // or ca[3]
		cb[0],
	]

	return mapAndRoundPolygons([cs, ca, cb, tri], rt.precision())
}

const rotatedSquare = (origin, len, rotation) => {
	const left = origin.clone()

	const leftToTop = newRotationVictor(len, rotation)
	const top = left.clone().add(leftToTop)

	const topToRight = newRotationVictor(len, rotation + Math.PI / 2)
	const right = top.clone().add(topToRight)

	const rightToBot = newRotationVictor(len, rotation + Math.PI)
	const bot = right.clone().add(rightToBot)

	return [left, top, right, bot]
}

const newRotationVictor = (len, rotation) => {
	return new Victor(0, len).rotate(rotation).invertX()
}

const mapAndRoundPolygons = (polys, dp) => {
	return polys.map((p) => mapAndRoundPolygon(p, dp))
}

const mapAndRoundPolygon = (poly, dp) => {
	return poly.map((v) => mapAndRoundVictor(v, dp))
}

const mapAndRoundVictor = (vic, dp) => {
	return [round(vic.x, dp), round(vic.y, dp)]
}

const round = (n, dp) => {
	const dpMod = Math.pow(10, dp)
	return Math.round(n * dpMod) / dpMod
}

const radiansToDegrees = (rads) => {
	return rads * (180 / Math.PI)
}
