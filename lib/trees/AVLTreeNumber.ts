import { NumberComparator } from "@lib/comparators/NumberComparator";
import { AVLTree } from "./AVLTree";

export class AVLTreeNumber extends AVLTree<number> {
	constructor() { super(new NumberComparator()); }
}
