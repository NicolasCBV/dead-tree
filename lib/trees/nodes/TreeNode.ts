export class TreeNode<T> {
	item: T;
	height: number;
	left: TreeNode<T> | null;
	right: TreeNode<T> | null;

	constructor(
		item: T,
		height: number = 1,
		left: TreeNode<T> | null = null,
		right: TreeNode<T> | null = null
	) {
		this.item = item
		this.height = height
		this.left = left
		this.right = right
	}
}
