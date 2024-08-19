import { NumberComparator } from '@lib/comparators/NumberComparator';
import { AVLTree } from '@lib/trees/AVLTree';

describe('Insert operations methods tests', () => {
	it('should', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
		});

		tree.push(0);
		tree.push(0);
		tree.push(0);
		tree.push(0);

		expect(tree.length).toBe(1);
		let i = 0;
		for (const node of tree) {
			expect(i).toBe(0);
			expect(node.item).toBe(0);
			i = ++i;
		}
	});
	it('should be able to save object', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
		});
		for (let i = 0; i < 16; i++) {
			tree.push(Number((Math.random() * 1000000).toFixed()));
		}

		expect(tree.getRoot()?.height).toBe(5);
		expect(tree.length).toBe(16);
	});

	it('should be able to create a tree with pre loaded data object', () => {
		const arr: number[] = [];
		for (let i = 0; i < 16; i++) arr.push(i);

		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
			data: arr,
			behavior: 'in-order',
		});

		let i = 0;
		for (const node of tree) {
			expect(node.item).toBe(i);
			i = ++i;
		}
		expect(tree.length).toBe(16);
	});

	it('should be able to create a tree with pre loaded data object - inverted insertion order', () => {
		const arr: number[] = [];
		for (let i = 16; i > 0; i--) arr.push(i);

		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
			data: arr,
			behavior: 'in-order',
		});

		let i = 1;
		for (const node of tree) {
			expect(node.item).toBe(i);
			i = ++i;
		}
		expect(tree.length).toBe(16);
	});

	it('should be able to create a tree and load the array', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
			behavior: 'in-order',
		});
		for (let i = 0; i < 16; i++) tree.push(i);

		const arr: number[] = [];
		for (let i = 16; i < 32; i++) arr.push(i);

		tree.put(arr);

		let i = 0;
		for (const node of tree) {
			expect(node.item).toBe(i);
			i = ++i;
		}
		expect(tree.length).toBe(32);
	});
});
