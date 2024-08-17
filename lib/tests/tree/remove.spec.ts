import { NumberComparator } from '@lib/comparators/NumberComparator';
import { AVLTree } from '@lib/trees/AVLTree';

describe('remove method test', () => {
	it('should be able to execute remove method with Left rebalancing strategy', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
		});
		tree.push(3);
		tree.push(1);
		tree.push(4);
		tree.push(5);
		expect(tree.getHeight(tree.getRoot())).toBe(3);
		expect(tree.getRoot()?.item).toBe(3);

		expect(tree.getHeight(tree.getRoot()!.right)).toBe(2);
		expect(tree.getRoot()?.right?.item).toBe(4);

		expect(tree.getHeight(tree.getRoot()!.right!.right)).toBe(1);
		expect(tree.getRoot()?.right?.right?.item).toBe(5);

		expect(tree.getHeight(tree.getRoot()!.left)).toBe(1);
		expect(tree.getRoot()?.left?.item).toBe(1);

		expect(tree.removeBy(1)?.item).toBe(1);

		expect(tree.getHeight(tree.getRoot())).toBe(2);
		expect(tree.getRoot()?.item).toBe(4);

		expect(tree.getHeight(tree.getRoot()!.left)).toBe(1);
		expect(tree.getRoot()?.left?.item).toBe(3);

		expect(tree.getHeight(tree.getRoot()!.right)).toBe(1);
		expect(tree.getRoot()?.right?.item).toBe(5);

		const deletedNode = tree.findBy(1);
		expect(deletedNode).toBeNull();
	});

	it('should be able to execute remove method with Right-Left rebalancing strategy', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
		});
		tree.push(3);
		tree.push(1);
		tree.push(5);
		tree.push(4);
		expect(tree.getHeight(tree.getRoot())).toBe(3);
		expect(tree.getRoot()?.item).toBe(3);

		expect(tree.getHeight(tree.getRoot()!.right)).toBe(2);
		expect(tree.getRoot()?.right?.item).toBe(5);

		expect(tree.getHeight(tree.getRoot()!.right!.left)).toBe(1);
		expect(tree.getRoot()?.right?.left?.item).toBe(4);

		expect(tree.getHeight(tree.getRoot()!.left)).toBe(1);
		expect(tree.getRoot()?.left?.item).toBe(1);

		expect(tree.removeBy(1)?.item).toBe(1);

		expect(tree.getHeight(tree.getRoot())).toBe(2);
		expect(tree.getRoot()?.item).toBe(4);

		expect(tree.getHeight(tree.getRoot()!.left)).toBe(1);
		expect(tree.getRoot()?.left?.item).toBe(3);

		expect(tree.getHeight(tree.getRoot()!.right)).toBe(1);
		expect(tree.getRoot()?.right?.item).toBe(5);

		const deletedNode = tree.findBy(1);
		expect(deletedNode).toBeNull();
	});

	it('should be able to execute remove method with Right rebalancing strategy', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
		});
		tree.push(1);
		tree.push(2);
		tree.push(3);
		tree.push(0);
		expect(tree.getHeight(tree.getRoot())).toBe(3);
		expect(tree.getRoot()?.item).toBe(2);

		expect(tree.getHeight(tree.getRoot()!.right)).toBe(1);
		expect(tree.getRoot()?.right?.item).toBe(3);

		expect(tree.getHeight(tree.getRoot()!.left)).toBe(2);
		expect(tree.getRoot()?.left?.item).toBe(1);

		expect(tree.getHeight(tree.getRoot()!.left!.left)).toBe(1);
		expect(tree.getRoot()?.left?.left?.item).toBe(0);

		expect(tree.removeBy(3)?.item).toBe(3);

		expect(tree.getHeight(tree.getRoot())).toBe(2);
		expect(tree.getRoot()?.item).toBe(1);

		expect(tree.getHeight(tree.getRoot()!.left)).toBe(1);
		expect(tree.getRoot()?.left?.item).toBe(0);

		expect(tree.getHeight(tree.getRoot()!.right)).toBe(1);
		expect(tree.getRoot()?.right?.item).toBe(2);

		const deletedNode = tree.findBy(3);
		expect(deletedNode).toBeNull();
	});

	it('should be able to execute remove method with Left-Right strategy', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
		});
		tree.push(3);
		tree.push(4);
		tree.push(1);
		tree.push(2);
		expect(tree.getHeight(tree.getRoot())).toBe(3);
		expect(tree.getRoot()?.item).toBe(3);

		expect(tree.getHeight(tree.getRoot()!.right)).toBe(1);
		expect(tree.getRoot()?.right?.item).toBe(4);

		expect(tree.getHeight(tree.getRoot()!.left)).toBe(2);
		expect(tree.getRoot()?.left?.item).toBe(1);

		expect(tree.getHeight(tree.getRoot()!.left!.right)).toBe(1);
		expect(tree.getRoot()?.left?.right?.item).toBe(2);

		expect(tree.removeBy(4)?.item).toBe(4);

		expect(tree.getHeight(tree.getRoot())).toBe(2);
		expect(tree.getRoot()?.item).toBe(2);

		expect(tree.getHeight(tree.getRoot()!.left)).toBe(1);
		expect(tree.getRoot()?.left?.item).toBe(1);

		expect(tree.getHeight(tree.getRoot()!.right)).toBe(1);
		expect(tree.getRoot()?.right?.item).toBe(3);

		const deletedNode = tree.findBy(4);
		expect(deletedNode).toBeNull();
	});
});
