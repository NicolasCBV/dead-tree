import { TreeNode } from '@lib/trees/nodes/TreeNode';

export interface IRemovedNodeContext<T> {
	affected: TreeNode<T> | null;
	substituteNode?: TreeNode<T> | null;
	leftChild?: TreeNode<T> | null;
	rightChild?: TreeNode<T> | null;
}
