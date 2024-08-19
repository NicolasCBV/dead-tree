# Co-routines

Co-routines, in javascript, are functions that can be executed or suspended at any time. This can be really useful if you need to, for example, iterate through a collection, and each item of this collection will need to execute some part of your code.

Some features, like ```for of``` depends on this mechanism to work properly, by default, ```for of``` will always search in your class a method called ```[Symbol.iterator]``` that is considered a co-routine, for example:
```javascript
class Programmer {
	*[Symbol.iterator](): Generator<string> {
		yield "sleep"
		console.log("-----")
		yield "code"
		console.log("-----")
		yield "sleep again"
	}
}

for(let actions of new Programmer()) {
	console.log(actions)
}
```
This will use the [javascript iteration protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols) to execute a co-routine, where **Programmer.[Symbol.iterator]** will **yield** every string, let to ```for of``` execute the rest of the loop, and returns to the method. Naturally, we use the **\*** operator to indicate a co-routine, and every co-routine should return **Generator<T>**, like **Promise<T>** for async operations.

With this in mind, Dead Tree has common methods, like **findBy** which uses only recursive strategies, but it also has **cofind**, ***[Symbol.iterator]()** and another methods that will let us use the co-routine strategies.

In this [section](iteration), you learned how iteration works on AVL and also understand how to handle it on Dead Tree. But one of the things that was mentioned, is that you cannot redefine your iteration strategies used on [javascript iteration protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols), but you can use another iteration strategy with co-routines. This is what we will talk about in the next fragment

## How to use co-routines on iteration processes

In Dead Tree we have three most important types of co-routine functions:
- postOrderTraverseByRoot: Will iterate through your tree with a post-order iteration strategy.
- preOrderTraverseByRoot: Will iterate through your tree with a pre-order iteration strategy.
- inOrderTraverseByRoot: Will iterate through your tree with a in-order iteration strategy.

> You can also start your iteration process on a specific node by the name of these methods without "ByRoot", like preOrderTraverse.

To iterate with every strategy on each tree node, you will always follow the same example:
```javascript
const tree = new AVLTree<number>({
	comparator: new NumberComparator(),
	behavior: 'post-order',
});
for (let i = 0; i < 16; i++) {
	tree.push(i);
}

const iter = tree.inOrderTraverseByRoot()
let next = iter.next()
while(!next.done) {
	const node = next.value
	console.log(node.item)
	next = iter.next()
}
```

First, we create and populate our tree. Pay attention to the fact that we are using another **behavior** value, to let us know that this really does not matter when we are manually manipulating our iteration process.

After this, we start our co-routine, and every time we call next, we will execute one iteration of the **while** loop, until the end of the tree iteration process.
