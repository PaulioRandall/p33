import toSvgModel from './to-svg-model.js'

describe('toSvgModel', () => {
	test('creates simple polygon model', () => {
		const polygons = [
			[
				[0, 5],
				[5, 5],
				[5, 0],
				[0, 0],
			],
		]

		const exp = {
			tag: 'svg',
			namespaceURI: 'http://www.w3.org/2000/svg',
			attributes: {
				'xmlns:xlink': 'http://www.w3.org/1999/xlink',
				viewBox: '0 0 5 5',
				preserveAspectRatio: 'xMidYMid',
			},
			style: {
				width: '100%',
				height: '100%',
			},
			children: [
				{
					tag: 'g',
					children: [
						{
							tag: 'polygon',
							attributes: {
								points: '0,5 5,5 5,0 0,0',
							},
						},
					],
				},
			],
		}

		const act = toSvgModel(polygons)
		expect(act).toEqual(exp)
	})

	test('creates simple polygon model', () => {
		const polygons = [
			[
				[0, 5],
				[5, 5],
				[5, 0],
				[0, 0],
			],
			[
				[1, 2],
				[3, 4],
				[5, 6],
				[7, 8],
				[9, 0],
			],
			[
				[0, 0],
				[100, 0],
				[0, 100],
			],
		]

		const exp = {
			tag: 'svg',
			namespaceURI: 'http://www.w3.org/2000/svg',
			attributes: {
				'xmlns:xlink': 'http://www.w3.org/1999/xlink',
				viewBox: '0 0 100 100',
				preserveAspectRatio: 'xMidYMid',
			},
			style: {
				width: '100%',
				height: '100%',
			},
			children: [
				{
					tag: 'g',
					children: [
						{
							tag: 'polygon',
							attributes: {
								points: '0,5 5,5 5,0 0,0',
							},
						},
						{
							tag: 'polygon',
							attributes: {
								points: '1,2 3,4 5,6 7,8 9,0',
							},
						},
						{
							tag: 'polygon',
							attributes: {
								points: '0,0 100,0 0,100',
							},
						},
					],
				},
			],
		}

		const act = toSvgModel(polygons)
		expect(act).toEqual(exp)
	})
})
