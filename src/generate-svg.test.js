import { toSvgModel } from './generate-svg.js'

describe('generate-svg', () => {
	describe('toSvgModel', () => {
		test('?', () => {
			const polygons = [
				[
					[0, 5],
					[5, 5],
					[5, 0],
					[0, 0],
					[0, 5],
				]
			]

			const exp = {
				tag: 'svg',
				children: [
					{
						tag: 'g',
						children: [
							{
								tag: 'polygon',
								points: '0,5 5,5 5,0 0,0',
							}
						]
					}
				]
			}

			const act = toSvgModel(polygons)

			expect(act).toEqual(exp)
		})
	})
})
