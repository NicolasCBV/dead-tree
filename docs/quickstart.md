# Quickstart

This section will guide you through the installation process and basic usage, Whether you are a seasoned developer or new to AVL trees, this guide provides everything you need to integrate and utilize this powerful data structure in your projects.

## Installation

To install the package, use your favorite package to pull from npm repositories:

```bash
npm i dead-tree
```

## Usage

The main class used on Dead Tree is AVLTree, and each AVLTree should receive your [Comparator](comparators), that will be used on node manipulations, by default, Dead Tree already has a simple [Comparator](comparators) fully dedicated for AVL tree of number type:

```javascript
import { NumberComparator } from '@dead-tree/NumberComparator';
import { AVLTree } from '@lib/trees/AVLTree';

const tree = new AVLTree<number>({
	comparator: new NumberComparator(),
});
```

The diamond operator indicates which type the nodes should store. Do not use this to indicate possible nullable values, because it will block every push or put operation and throw a **DeadTreeError** with the following message:
> AVLTree should not have null values or undefined values!

Now you created your tree, you can safely manipulate your nodes with the AVLTree API, using basic methods, like, push to add new elements, removeBy to remove the indicated element with the exact value or iterate through the tree using the classic ```for of```.

## Considerations

To adopt the best practices of this library, check anothers section and tutorials to understand the impact of each operation.
