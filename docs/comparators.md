# Comparators

Every time you create your **AVLTree<T>** class, you should offer an implementation class of **IComparator**, these classes are called as **Comparators**, and are used to compare your **T** type every time that you try to search, delete, create or iterate through your tree. This classes **MUST** follow some simple rules to work properly inside your tree.
- If the element that you are offering, or that is being internally used, is less than the others nodes, the **Comparator** class must return -1.
- If this same element is equal to the others nodes, the **Comparator** class must return 0.
- If the element is greater than the others nodes, the **Comparator** class must return 1.

## Example

By default, Dead Tree already has a simple **Comparator** called **NumberComparator**. With this in mind, lets try to understand how it is implemented:
```javascript
import { IComparator } from "@dead-tree/IComparator";

export class NumberComparator implements IComparator<number> {
	compare(c1: number, c2: number): -1 | 0 | 1 {
		if(c1 < c2) return -1
		if(c1 > c2) return 1
		return 0
	}
}
```

First of all, we need to implement the method **compare**, that has **c1** and **c2** arguments, where **c1** is your compared node and **c2** is all others nodes used on iteration process. Keep in mind that AVL trees are made to be fast, so do not overload this method because you will affect your application performance.
