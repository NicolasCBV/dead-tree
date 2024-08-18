import { NumberComparator } from '@lib/comparators/NumberComparator';
import { AVLTree } from '@lib/trees/AVLTree';
import { Suite, Event } from 'benchmark';

const suite = new Suite();

const collectionTarget = parseInt(process.env.COLLECTION_TARGET!);

suite
	.add('AVL Tree insertion', () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator(),
		});
		for (let i = 0; i < collectionTarget; i++) tree.push(i);
	})
	.add('Array insertion', () => {
		const arr: number[] = [];
		for (let i = 0; i < collectionTarget; i++) arr.push(i);
	})
	.on('cycle', function (e: Event) {
		console.log(String(e.target));
	})
	.on('complete', function () {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
	})
	.run({ async: false });
