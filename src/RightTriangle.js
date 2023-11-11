export default class RightTriangle {
	constructor(dp = 1) {
		this.dp = dp

		this.a = 3
		this.b = 4
		this.c = 5

		this.as = 9
		this.bs = 16
		this.cs = 25
	}

	// setC sets the length of c then recalculates a and b such that they
	// maintain their ratio.
	setC(c) {
		const oldCs = this.cs

		this.cs = c * c
		this.c = c

		this.as = this.cs * (1 / oldCs) * this.as
		this.a = this._sqrtRound(this.as)

		this.bs = this.cs - this.as
		this.b = this._sqrtRound(this.bs)
	}

	// setA sets the length of a then recalculates c while keeping b fixed.
	setA(a) {
		const oldAs = this.as

		this.as = a * a
		this.a = a

		this.cs = this.as + this.bs
		this.c = this._sqrtRound(this.cs)
	}

	_sqrtRound(n) {
		n = Math.sqrt(n)
		const precision = Math.pow(10, this.dp)
		return Math.round(n * precision) / precision
	}
}
