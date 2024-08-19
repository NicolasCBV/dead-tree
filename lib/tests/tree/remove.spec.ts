/* eslint-disable @typescript-eslint/no-unused-vars */
import { NumberComparator } from '@lib/comparators/NumberComparator';
import { AVLTree } from '@lib/trees/AVLTree';

describe('remove method test', () => {
	it('should clear all the tree', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
		});
		for (let i = 0; i < 50; i++) {
			tree.push(i);
		}
		tree.clear();
		for (const _ of tree) {
			expect(() => {
				throw Error('Tree is was not cleared!');
			}).not.toThrow(Error);
		}
		expect(tree.getRoot()).toBeNull();
		expect(tree.height).toBe(0);
		expect(tree.length).toBe(0);
	});
	it('should grant that no child node are lost if one node is removed', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
		});
		for (let i = 0; i < 50; i++) {
			tree.push(i);
		}

		tree.removeBy(tree.getRoot()?.item as number);
		let i = 0;
		for (const node of tree) {
			if (i === 31) {
				expect(node.item).not.toBe(31);
				break;
			} else {
				expect(node.item).toBe(i);
			}

			i = ++i;
		}

		tree.removeBy(3);

		i = 0;
		for (const node of tree) {
			if (i === 31 || i === 3) {
				expect(node.item).not.toBe(3);
				break;
			} else {
				expect(node.item).toBe(i);
			}

			i = ++i;
		}
	});

	it('should remove all items manually', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
		});
		for (let i = 0; i < 2000; i++) {
			tree.push(i);
		}

		for (let i = 0; i < 2000; i++) {
			expect(tree.removeBy(i)?.item).toBe(i);
		}

		expect(tree.length).toBe(0);
		expect(tree.getRoot()).toBeNull();
		expect(tree.height).toBe(0);
	});

	it('should be able to execute remove method with Left rebalancing strategy', () => {
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

		expect(tree.removeBy(1)?.item).toBe(1);

		expect(tree.getHeight(tree.getRoot())).toBe(2);
		expect(tree.getRoot()?.item).toBe(4);

		expect(tree.getHeight(tree.getRoot()!.left)).toBe(1);
		expect(tree.getRoot()?.left?.item).toBe(3);

		expect(tree.getHeight(tree.getRoot()!.right)).toBe(1);
		expect(tree.getRoot()?.right?.item).toBe(5);

		const deletedNode = tree.findBy(1);
		expect(deletedNode).toBeNull();

		expect(tree.length).toBe(3);
		expect(tree.removeBy(1)).toBeNull();
		expect(tree.length).toBe(3);
	});

	it('should be able to execute remove method with Right-Left rebalancing strategy', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
		});
		tree.push(3);
		tree.push(1);
		tree.push(5);
		tree.push(4);

		expect(tree.length).toBe(4);
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

		expect(tree.length).toBe(3);
		expect(tree.removeBy(1)).toBeNull();
		expect(tree.length).toBe(3);
	});

	it('should be able to execute remove method with Right rebalancing strategy', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
		});
		tree.push(1);
		tree.push(2);
		tree.push(3);
		tree.push(0);

		expect(tree.length).toBe(4);
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

		expect(tree.length).toBe(3);
		expect(tree.removeBy(3)).toBeNull();
		expect(tree.length).toBe(3);
	});

	it('should be able to execute remove method with Left-Right strategy', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
		});
		tree.push(3);
		tree.push(4);
		tree.push(1);
		tree.push(2);

		expect(tree.length).toBe(4);
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

		expect(tree.length).toBe(3);
		expect(tree.removeBy(4)).toBeNull();
		expect(tree.length).toBe(3);
	});
});
