import { IComparator } from '@lib/types/IComparator';
import { TreeNode } from './nodes/TreeNode';
import { DeadTreeError } from '@lib/errors/DeadTreeError';
import { IRemovedNodeContext } from '@lib/types/IRemovedNodeContext';

/**
 * Interface used on AVLTree<T> class constructor
 *
 * @template T Any non nullable data
 **/
export interface IAVLTree<T> {
	/**
	 * Implementation of IComparator<T> to navigate through nodes
	 * @type {IComparator<T>}
	 **/
	comparator: IComparator<T>;

	/**
	 * Set the behavior iteration used on iteration protocol
	 * @type {'pre-order' | 'post-order' | 'in-order'}
	 * @default 'in-order'
	 **/
	behavior?: 'pre-order' | 'post-order' | 'in-order';

	/**
	 * Pre-defined data to be loaded on tree as node
	 * @type {Iterable<NonNullable<T>>}
	 **/
	data?: Iterable<NonNullable<T>>;
}

export class AVLTree<T> {
	protected root: TreeNode<T> | null;
	protected _length: number = 0;
	protected comparator: IComparator<T>;
	protected readonly behavior: 'pre-order' | 'post-order' | 'in-order';

	/**
	 * Instantiate a new AVL Tree
	 * @param {IAVLTree<T>} args - Parameters of AVL Tree
	 **/
	constructor({ comparator, behavior = 'in-order', data }: IAVLTree<T>) {
		this.root = null;
		this.comparator = comparator;
		this.behavior = behavior;

		if (data) {
			let length = 0;
			for (const item of data) {
				if (item === null || item === undefined)
					throw new DeadTreeError(
						'AVLTree should not have null values or undefined values!',
					);
				this.push(item);
				length = ++length;
			}
			this._length = length;
		}
	}

	/** Returns the root node */
	getRoot() {
		return this.root;
	}

	/** Represents the height of tree */
	get height() {
		return this.getHeight(this.root);
	}

	/** Represents how many nodes are present on the tree */
	get length() {
		return this._length;
	}

	/** Calculates the height of a node, if the node is a nullable value, it returns 0, if not, it returns x >= 1 */
	getHeight(n?: TreeNode<T> | null) {
		return n ? n.height : 0;
	}

	/** Calculates the balance factor of a node */
	getBalanceFactor(node: TreeNode<T>) {
		return this.getHeight(node.left) - this.getHeight(node.right);
	}

	/** Make a right rotation on node and your childs */
	private rightRotate(node: TreeNode<T>): TreeNode<T> {
		const leftTreeNode = node.left;
		const leftRightTreeNode = leftTreeNode!.right;

		leftTreeNode!.right = node;
		node.left = leftRightTreeNode;

		node.height =
			Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
		leftTreeNode!.height =
			Math.max(
				this.getHeight(leftTreeNode!.left),
				this.getHeight(leftTreeNode!.right),
			) + 1;

		return leftTreeNode!;
	}

	/** Make a left rotation on node and your childs */
	private leftRotate(node: TreeNode<T>): TreeNode<T> {
		const rightTreeNode = node.right;
		const rightLeftTreeNode = rightTreeNode!.left;

		rightTreeNode!.left = node;
		node.right = rightLeftTreeNode;

		node.height =
			Math.max(this.getHeight(node.right), this.getHeight(node.left)) + 1;
		rightTreeNode!.height =
			Math.max(
				this.getHeight(rightTreeNode!.right),
				this.getHeight(rightTreeNode!.left),
			) + 1;

		return rightTreeNode!;
	}

	/** Insert a new node on the tree with recursive strategy */
	protected insert(item: T, node?: TreeNode<T> | null): TreeNode<T> {
		if (!node) {
			this._length = ++this._length;
			return new TreeNode(item);
		}

		const c = this.comparator.compare(item, node.item);
		if (c <= -1) {
			node!.left = this.insert(item, node.left);
		} else if (c >= 1) {
			node.right = this.insert(item, node.right);
		} else {
			return node;
		}

		node.height =
			1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
		const balance = this.getBalanceFactor(node);

		if (balance > 1) {
			const c = this.comparator.compare(item, node.left!.item);
			if (c <= -1) {
				return this.rightRotate(node);
			} else {
				node.left = this.leftRotate(node!.left!);
				return this.rightRotate(node);
			}
		}

		if (balance < -1) {
			const c = this.comparator.compare(item, node.right!.item);
			if (c >= 1) {
				return this.leftRotate(node);
			} else {
				node.right = this.rightRotate(node!.right!);
				return this.leftRotate(node);
			}
		}

		return node;
	}

	/** Reorganize node chains after removing operations, doing right or left rotations */
	private reorganizeNodeChainAfterRemoveOp(node: TreeNode<T>) {
		node.height =
			Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
		const balance = this.getBalanceFactor(node);

		if (balance > 1) {
			if (this.getBalanceFactor(node.left!) >= 1) {
				return this.rightRotate(node);
			} else {
				node.left = this.leftRotate(node.left!);
				return this.rightRotate(node);
			}
		}

		if (balance < -1) {
			if (this.getBalanceFactor(node.right!) <= -1) {
				return this.leftRotate(node);
			} else {
				node.right = this.rightRotate(node.right!);
				return this.leftRotate(node);
			}
		}

		return node;
	}

	/** Rebalance all affected subtrees after remove method execution */
	private internalRebalanceAfterRemotion(
		deletedNode: IRemovedNodeContext<T>,
		node?: TreeNode<T> | null,
		internalRebalanceOnly?: 'always-right' | 'always-left',
	): TreeNode<T> | null {
		if (!node) return null;

		if (node.right && internalRebalanceOnly === 'always-right') {
			node.right = this.internalRebalanceAfterRemotion(
				deletedNode,
				node.right,
				'always-right',
			);
		} else if (node.left && internalRebalanceOnly === 'always-left') {
			node.left = this.internalRebalanceAfterRemotion(
				deletedNode,
				node.left,
				'always-left',
			);
		}

		if (!deletedNode.substituteNode) {
			deletedNode.substituteNode = node;
			deletedNode!.substituteNode!.right =
				deletedNode.substituteNode !== deletedNode.rightChild!
					? deletedNode.rightChild!
					: null;
			deletedNode!.substituteNode!.left =
				deletedNode.substituteNode !== deletedNode.leftChild!
					? deletedNode.leftChild!
					: null;

			deletedNode.substituteNode.height =
				1 +
				Math.max(
					this.getHeight(deletedNode.substituteNode.left),
					this.getHeight(deletedNode.substituteNode.right),
				);
			return null;
		}

		return this.reorganizeNodeChainAfterRemoveOp(node);
	}

	/** Remove a node on the tree with recursive strategy */
	protected remove(
		item: T,
		deletedNode: IRemovedNodeContext<T>,
		node?: TreeNode<T> | null,
	): TreeNode<T> | null {
		if (!node) return null;

		const c = this.comparator.compare(item, node.item);
		if (c <= -1) {
			node.left = this.remove(item, deletedNode, node.left);
		} else if (c >= 1) {
			node.right = this.remove(item, deletedNode, node.right);
		} else {
			deletedNode.affected = node;
			deletedNode.rightChild = node.right;
			deletedNode.leftChild = node.left;
			this._length = --this._length;
			if (deletedNode.leftChild) {
				this.internalRebalanceAfterRemotion(
					deletedNode,
					deletedNode.leftChild,
					'always-right',
				);
				return deletedNode.substituteNode ?? null;
			} else if (deletedNode.rightChild) {
				this.internalRebalanceAfterRemotion(
					deletedNode,
					deletedNode.rightChild,
					'always-left',
				);
				return deletedNode.substituteNode ?? null;
			}

			return null;
		}

		return this.reorganizeNodeChainAfterRemoveOp(node);
	}

	/** Traverse on the tree with recursive strategy */
	protected traverse(item: T, node?: TreeNode<T> | null): TreeNode<T> | null {
		if (!node) return null;

		const c = this.comparator.compare(item, node.item);
		let searchedTreeNode: TreeNode<T> | null = null;
		if (c <= -1) {
			searchedTreeNode = this.traverse(item, node.left);
		} else if (c >= 1) {
			searchedTreeNode = this.traverse(item, node.right);
		} else {
			return node;
		}

		return searchedTreeNode;
	}

	/** Iterate through the tree with co-routine strategy and post-order iteration strategy */
	*postOrderTraverse(node: TreeNode<T>): Generator<TreeNode<T>> {
		if (!node) return null;

		const leftHeight = this.getHeight(node.left);
		const rightHeight = this.getHeight(node.right);
		if (leftHeight !== 0) yield* this.postOrderTraverse(node.left!);

		if (rightHeight !== 0) yield* this.postOrderTraverse(node.right!);

		yield node;
	}

	postOrderTraverseByRoot(): Generator<TreeNode<T>> {
		return this.postOrderTraverse(this.root!);
	}

	/** Iterate through the tree with the co-routine strategy and pre-order iteration strategy */
	*preOrderTraverse(node: TreeNode<T>): Generator<TreeNode<T>> {
		if (!node) return null;

		yield node;
		const leftHeight = this.getHeight(node.left);
		const rightHeight = this.getHeight(node.right);

		if (leftHeight !== 0) yield* this.preOrderTraverse(node.left!);

		if (rightHeight !== 0) yield* this.preOrderTraverse(node.right!);
	}

	preOrderTraverseByRoot(): Generator<TreeNode<T>> {
		return this.preOrderTraverse(this.root!);
	}

	/** Iterate through the tree with the co-routine strategy and in-order iteration strategy */
	*inOrderTraverse(node: TreeNode<T>): Generator<TreeNode<T>> {
		if (!node) return null;

		const leftHeight = this.getHeight(node.left);
		const rightHeight = this.getHeight(node.right);
		if (leftHeight !== 0) yield* this.inOrderTraverse(node.left!);

		yield node;

		if (rightHeight !== 0) yield* this.inOrderTraverse(node.right!);
	}

	inOrderTraverseByRoot(): Generator<TreeNode<T>> {
		return this.inOrderTraverse(this.root!);
	}

	/** Iterate through the tree with the co-routine strategy and with the defined behavior iteration strategy */
	*[Symbol.iterator](): Generator<TreeNode<T>> {
		if (!this.root) return;

		if (this.behavior === 'in-order')
			yield* this.inOrderTraverse(this.root);
		else if (this.behavior === 'pre-order')
			yield* this.preOrderTraverse(this.root);
		else yield* this.postOrderTraverse(this.root);
	}

	get [Symbol.toStringTag](): string {
		return 'Binary AVL Tree Object';
	}

	/** Traverse on the tree with co-routine strategy */
	protected *cotraverse(item: T, node: TreeNode<T>): Generator<TreeNode<T>> {
		let cursor: TreeNode<T> = node;
		while (cursor) {
			const c = this.comparator.compare(item, cursor.item);
			if (c <= -1 && cursor.left) {
				yield cursor.left;
				cursor = cursor.left;
			} else if (c >= 1 && cursor.right) {
				yield cursor.right;
				cursor = cursor.right;
			} else {
				return cursor;
			}

			if (!cursor?.left && !cursor?.right) return;
		}
	}

	/** Search through the tree by the specified node and with co-routine strategy */
	*cofind(item: T): Generator<TreeNode<T>> {
		if (!this.root) return;
		yield this.root;
		yield* this.cotraverse(item, this.root);
	}

	/** Remove specified node and returns it, if it exist */
	removeBy(item: T): TreeNode<T> | null {
		const ctx: IRemovedNodeContext<T> = { affected: null };
		this.root = this.remove(item, ctx, this.root);
		return ctx.affected;
	}

	/** Clear all AVL Tree */
	clear() {
		this.root = null;
		this._length = 0;
	}

	/** Search through the tree by the specified node and with recursive strategy */
	findBy(item: T) {
		return this.traverse(item, this.root);
	}

	/** Push a new node on the tree */
	push(item: NonNullable<T>) {
		if (item === null || item === undefined)
			throw new DeadTreeError(
				'AVLTree should not have null values or undefined values!',
			);

		this.root = this.insert(item, this.root);
	}

	/** Insert a iterable collection of type NonNullable<T> on the tree */
	put(data: Iterable<NonNullable<T>>) {
		let length = 0;
		for (const item of data) {
			this.push(item);
			length = ++length;
		}
	}

	protected getMax(node: TreeNode<T> | null): TreeNode<T> | null {
		let item = node;
		if (!item) return null;

		const rightHeight = this.getHeight(item?.right);
		if (rightHeight !== 0) item = this.getMax(item.right!)!;

		return item;
	}

	/** Get greatest node value */
	max() {
		return this.getMax(this.root);
	}

	protected getMin(node: TreeNode<T> | null): TreeNode<T> | null {
		let item = node;
		if (!item) return null;

		const leftHeight = this.getHeight(item?.left);
		if (leftHeight !== 0) item = this.getMin(item.left!)!;

		return item;
	}

	/** Get lowestest node value */
	min() {
		return this.getMin(this.root);
	}

	protected removeLowestNode(
		deletedNode: IRemovedNodeContext<T>,
		node?: TreeNode<T> | null,
	) {
		const item = node;
		if (!item) return null;

		const leftHeight = this.getHeight(item.left);
		if (leftHeight !== 0) {
			item.left = this.removeLowestNode(deletedNode, item.left);
		} else {
			deletedNode.affected = item;
			this._length = --this._length;
			return null;
		}

		return this.reorganizeNodeChainAfterRemoveOp(item);
	}

	/** Remove the lowest node and returns it, if it exist */
	shift() {
		const ctx: IRemovedNodeContext<T> = { affected: null };
		this.root = this.removeLowestNode(ctx, this.root);
		return ctx.affected;
	}

	protected removeGreatestNode(
		deletedNode: IRemovedNodeContext<T>,
		node?: TreeNode<T> | null,
	) {
		const item = node;
		if (!item) return null;

		const leftRight = this.getHeight(item.right);
		if (leftRight !== 0) {
			item.right = this.removeGreatestNode(deletedNode, item.right);
		} else {
			deletedNode.affected = item;
			this._length = --this._length;
			return null;
		}

		return this.reorganizeNodeChainAfterRemoveOp(item);
	}

	/** Remove the greatest node and returns it, if it exist */
	pop() {
		const ctx: IRemovedNodeContext<T> = { affected: null };
		this.root = this.removeGreatestNode(ctx, this.root);
		return ctx.affected;
	}
}
