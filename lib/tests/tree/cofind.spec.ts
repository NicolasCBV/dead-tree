import { NumberComparator } from '@lib/comparators/NumberComparator';
import { AVLTree } from '@lib/trees/AVLTree';

describe('iterate method tests', () => {
	it('should be able to iterate', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
		});
		for (let i = 0; i < 16; i++) {
			tree.push(i);
		}

		const iterator = tree.cofind(0);
		let next = iterator.next();
		const arr: number[] = [];
		while (!next.done) {
			arr.push(next.value!.item);
			next = iterator.next();
		}

		expect(arr[0]).toBe(7);
		expect(arr[1]).toBe(3);
		expect(arr[2]).toBe(1);
		expect(arr[3]).toBe(0);
	});
});
