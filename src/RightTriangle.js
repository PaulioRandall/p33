import Victor from 'victor'

// RightTriangle models the lengths and square lengths of a right angle
// triangle.
//
// By default the lengths (3, 4, 5) and derived sqaures (9, 16, 25) are used
// for (a, b, c) and (as, bs, cs) respectively where c is the hypotenuse.
export default class RightTriangle {
	constructor() {
		// Length values
		this.a = 3
		this.b = 4
		this.c = 5

		// Squared values
		this.as = 9
		this.bs = 16
		this.cs = 25

		this._precision = 1
	}

	// setA sets the length of a then recalculates c while keeping b fixed.
	setA(a) {
		a = this._round(a)

		if (a === this.a) {
			return this
		}

		this.as = a * a
		this.a = a
		this._recalcC()

		return this
	}

	// setB sets the length of b then recalculates c while keeping a fixed.
	setB(b) {
		b = this._round(b)

		if (b === this.b) {
			return this
		}

		this.bs = b * b
		this.b = b
		this._recalcC()

		return this
	}

	// setC sets the length of c then recalculates a and b such that they
	// maintain their ratio.
	setC(c, recalc = false) {
		c = this._round(c)

		if (!recalc && c === this.c) {
			return this
		}

		const oldCs = this.cs

		this.cs = c * c
		this.c = c

		this.as = this.cs * (1 / oldCs) * this.as
		this.a = this._sqrtRound(this.as)

		this._recalcB()

		return this
	}

	// scaleA scales length a by the passed modifier.
	//
	// To clarify, a mod between 1 and -1 (exclusive) will cause length a to
	// shrink and values beyond 1 or -1 will cause length a to grow.
	scaleA(mod) {
		this.setA(this.a * mod)
		return this
	}

	// scaleB scales length b by the passed modifier.
	//
	// To clarify, a mod between 1 and -1 (exclusive) will cause length b to
	// shrink and values beyond 1 or -1 will cause length b to grow.
	scaleB(mod) {
		this.setB(this.b * mod)
		return this
	}

	// scaleC scales length c by the passed modifier.
	//
	// To clarify, a mod between 1 and -1 (exclusive) will cause length c to
	// shrink and values beyond 1 or -1 will cause length c to grow.
	scaleC(mod) {
		this.setC(this.c * mod)
		return this
	}

	// precision sets the max number of decimal places length values can have.
	//
	// After setting the precision all length values will be re-evaluated based
	// on a new rounded value of length c. If the current precision of any length
	// is greater than the new precision then the lengths will change.
	//
	// Pick your precision updates wisely. If you're externally caching values
	// computed inside RightTriangle then a change in precision may cause
	// equality tests to fail where, from a behavioural view of the system, they
	// should succeed.
	precision(dp) {
		this._precision = dp
		this.setC(this.c, true)
		return this
	}

	// generatePolygons returns an array of polygons representing the passed
	// right angle triangle.
	//
	// The result will include the triangle and three squares. It is primarily
	// intended for easy use with the SVG g tag.
	//
	// Polygon c's top left point will be (0,0) with all other positions relative
	// to it. The collection will start with the hypotenuse square 'c' on the
	// left, the triangle attached to the right edge, square 'a' attached to the
	// upper triangle edge, and square 'b' attached to the bottom triangle edge.
	generatePolygons() {
		const cs = [
			new Victor(0, this.c), // top left
			new Victor(this.c, this.c), // top right
			new Victor(this.c, 0), // bot right
			new Victor(0, 0), // bot left
		]

		const rotation = Math.asin(this.a / this.c)
		const ca = this._rotatedSquare(cs[1], this.a, rotation)
		const cb = this._rotatedSquare(cs[2], this.b, rotation)

		const tri = [
			ca[0],
			cb[1], // or ca[3]
			cb[0],
		]

		return this._mapAndRoundPolygons([cs, ca, cb, tri])
	}

	_recalcA() {
		this.as = this.cs - this.bs
		this.a = this._sqrtRound(this.as)
	}

	_recalcB() {
		this.bs = this.cs - this.as
		this.b = this._sqrtRound(this.bs)
	}

	_recalcC() {
		this.cs = this.as + this.bs
		this.c = this._sqrtRound(this.cs)
	}

	_round(n) {
		const dpMod = Math.pow(10, this._precision)
		return Math.round(n * dpMod) / dpMod
	}

	_sqrtRound(n) {
		n = Math.sqrt(n)
		return this._round(n)
	}

	_rotatedSquare = (origin, len, rotation) => {
		const left = origin.clone()

		const leftToTop = this._newRotationVictor(len, rotation)
		const top = left.clone().add(leftToTop)

		const topToRight = this._newRotationVictor(len, rotation + Math.PI / 2)
		const right = top.clone().add(topToRight)

		const rightToBot = this._newRotationVictor(len, rotation + Math.PI)
		const bot = right.clone().add(rightToBot)

		return [left, top, right, bot]
	}

	_newRotationVictor = (len, rotation) => {
		return new Victor(0, len).rotate(rotation).invertX()
	}

	_mapAndRoundPolygons = (polys, dp) => {
		return polys.map((p) => this._mapAndRoundPolygon(p))
	}

	_mapAndRoundPolygon = (poly, dp) => {
		return poly.map((v) => this._mapAndRoundVictor(v))
	}

	_mapAndRoundVictor = (vic, dp) => {
		return [this._round(vic.x), this._round(vic.y)]
	}
}
