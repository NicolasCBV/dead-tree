import { TreeNode } from '@lib/trees/nodes/TreeNode';

export interface IRemovedNodeContext<T> {
	affected: TreeNode<T> | null;
}
