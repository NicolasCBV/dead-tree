import { NumberComparator } from '@lib/comparators/NumberComparator';
import { AVLTree } from '@lib/trees/AVLTree';
import { Suite, Event } from 'benchmark';

const suite = new Suite();

const collectionTarget = parseInt(process.env.COLLECTION_TARGET!);

const tree = new AVLTree<number>({
	comparator: new NumberComparator(),
});
const arr: number[] = [];
for (let i = 0; i < collectionTarget; i++) {
	tree.push(i);
	arr.push(i);
}

suite
	.add('AVL Tree search', () => {
		tree.findBy(collectionTarget - 1);
	})
	.add('Array Search', () => {
		arr.find((item) => item === collectionTarget - 1);
	})
	.on('cycle', function (e: Event) {
		console.log(String(e.target));
	})
	.on('complete', function () {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
	})
	.run({ async: false });
