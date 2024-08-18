import { NumberComparator } from '@lib/comparators/NumberComparator';
import { AVLTree } from '@lib/trees/AVLTree';

describe('push method tests', () => {
	it('should be able to find object', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
		});
		for (let i = 0; i < 16; i++) {
			tree.push(i);
		}

		expect(tree.getRoot()?.height).toBe(5);

		const node = tree.findBy(0);
		expect(node?.height).toBe(1);
	});
});
