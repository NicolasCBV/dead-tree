import { NumberComparator } from '@lib/comparators/NumberComparator';
import { AVLTree } from '@lib/trees/AVLTree';

describe('min method tests', () => {
	it('should be able to get the lowest value', () => {
		const arr: number[] = [];
		for (let i = 0; i < 16; i++) arr.push(i);

		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
			data: arr,
		});

		expect(tree.min()?.item).toBe(0);
	});
});
