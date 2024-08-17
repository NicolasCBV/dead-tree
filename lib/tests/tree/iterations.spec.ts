import { NumberComparator } from '@lib/comparators/NumberComparator';
import { AVLTree } from '@lib/trees/AVLTree';

describe('Symbol.iterator method tests', () => {
	it('should be able to use in-order iteration strategy', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
			behavior: 'in-order',
		});
		for (let i = 0; i < 16; i++) {
			tree.push(i);
		}

		let i = 0;
		for (const node of tree) {
			expect(node.item).toBe(i);
			i = ++i;
		}
	});

	it('should be able to use pre-order iteration strategy', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
			behavior: 'pre-order',
		});
		for (let i = 4; i > 0; i--) {
			tree.push(i);
		}

		const arr: number[] = [];
		for (const node of tree) arr.push(node.item);

		expect(arr[0]).toBe(3);
		expect(arr[1]).toBe(2);
		expect(arr[2]).toBe(1);
		expect(arr[3]).toBe(4);
	});

	it('should be able to use post-order iteration strategy', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
			behavior: 'post-order',
		});
		for (let i = 4; i > 0; i--) {
			tree.push(i);
		}

		const arr: number[] = [];
		for (const node of tree) arr.push(node.item);

		expect(arr[0]).toBe(1);
		expect(arr[1]).toBe(2);
		expect(arr[2]).toBe(4);
		expect(arr[3]).toBe(3);
	});
});
