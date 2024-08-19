import { NumberComparator } from '@lib/comparators/NumberComparator';
import { DeadTreeError } from '@lib/errors/DeadTreeError';
import { AVLTree } from '@lib/trees/AVLTree';

describe('AVLTree Error test', () => {
	it('should be able to throw error on null push method', () => {
		const tree = new AVLTree({ comparator: new NumberComparator() });
		expect(() => tree.push(null as unknown as number)).toThrow(
			DeadTreeError,
		);
	});

	it('should be able to throw error on pre loaded null data', () => {
		expect(() => {
			new AVLTree({
				comparator: new NumberComparator(),
				data: [null as unknown as number],
			});
		}).toThrow(DeadTreeError);
	});
});
