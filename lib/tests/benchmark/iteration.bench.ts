/* eslint-disable @typescript-eslint/no-unused-vars */
import { NumberComparator } from '@lib/comparators/NumberComparator';
import { AVLTree } from '@lib/trees/AVLTree';
import { Suite, Event } from 'benchmark';

const suite = new Suite();

const tree = new AVLTree<number>({
	comparator: new NumberComparator(),
	behavior: 'in-order',
});
const arr: number[] = [];
for (let i = 0; i < parseInt(process.env.COLLECTION_TARGET!); i++) {
	tree.push(i);
	arr.push(i);
}

suite
	.add('AVL Tree insertion - javascript iteration protocol', () => {
		for (const _ of tree) {
			continue;
		}
	})
	.add('AVL Tree coroutine iteration - in-order strategy', () => {
		const iter = tree.inOrderTraverse(tree.getRoot()!);
		let next = iter.next();
		while (!next.done) {
			next = iter.next();
		}
	})
	.add('AVL Tree coroutine iteration - pre-order strategy', () => {
		const iter = tree.preOrderTraverse(tree.getRoot()!);
		let next = iter.next();
		while (!next.done) {
			next = iter.next();
		}
	})
	.add('AVL Tree coroutine iteration - post-order strategy', () => {
		const iter = tree.postOrderTraverse(tree.getRoot()!);
		let next = iter.next();
		while (!next.done) {
			next = iter.next();
		}
	})
	.add('Array insertion', () => {
		for (const _ of arr) {
			continue;
		}
	})
	.on('cycle', function (e: Event) {
		console.log(String(e.target));
	})
	.on('complete', function () {
		console.log('Fastest is ' + this.filter('fastest').map('name'));
	})
	.run({ async: false });
