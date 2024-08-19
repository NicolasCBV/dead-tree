import { NumberComparator } from '@lib/comparators/NumberComparator';
import { AVLTree } from '@lib/trees/AVLTree';

describe('shift method test', () => {
	it('should be able to execute shift method', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
		});
		tree.push(3);
		tree.push(1);
		tree.push(4);
		tree.push(5);

		expect(tree.length).toBe(4);
		expect(tree.getHeight(tree.getRoot())).toBe(3);
		expect(tree.getRoot()?.item).toBe(3);

		expect(tree.getHeight(tree.getRoot()!.right)).toBe(2);
		expect(tree.getRoot()?.right?.item).toBe(4);

		expect(tree.getHeight(tree.getRoot()!.right!.right)).toBe(1);
		expect(tree.getRoot()?.right?.right?.item).toBe(5);

		expect(tree.getHeight(tree.getRoot()!.left)).toBe(1);
		expect(tree.getRoot()?.left?.item).toBe(1);

		expect(tree.shift()?.item).toBe(1);

		expect(tree.getHeight(tree.getRoot())).toBe(2);
		expect(tree.getRoot()?.item).toBe(4);

		expect(tree.getHeight(tree.getRoot()!.left)).toBe(1);
		expect(tree.getRoot()?.left?.item).toBe(3);

		expect(tree.getHeight(tree.getRoot()!.right)).toBe(1);
		expect(tree.getRoot()?.right?.item).toBe(5);

		const deletedNode = tree.findBy(1);
		expect(deletedNode).toBeNull();

		expect(tree.length).toBe(3);
	});
});
