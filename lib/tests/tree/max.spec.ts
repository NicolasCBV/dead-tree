import { NumberComparator } from '@lib/comparators/NumberComparator';
import { AVLTree } from '@lib/trees/AVLTree';

describe('max method tests', () => {
	it('should be able to get the greatest value', () => {
		const arr: number[] = [];
		for (let i = 0; i < 16; i++) arr.push(i);

		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
			data: arr,
		});

		expect(tree.max()?.item).toBe(15);
	});
});
