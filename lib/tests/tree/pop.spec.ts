import { NumberComparator } from "@lib/comparators/NumberComparator"
import { AVLTree } from "@lib/trees/AVLTree"

describe("pop method test", () => {
	it("should be able to execute pop method", () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator()
		})
		tree.push(5)
		tree.push(3)
		tree.push(6)
		tree.push(4)
		expect(tree.getHeight(tree.getRoot())).toBe(3)
		expect(tree.getRoot()?.item).toBe(5)

		expect(tree.getHeight(tree.getRoot()!.right)).toBe(1)
		expect(tree.getRoot()?.right?.item).toBe(6)

		expect(tree.getHeight(tree.getRoot()!.left)).toBe(2)
		expect(tree.getRoot()?.left?.item).toBe(3)

		expect(tree.getHeight(tree.getRoot()!.left!.right)).toBe(1)
		expect(tree.getRoot()?.left?.right?.item).toBe(4)

		expect(tree.pop()?.item).toBe(6)

		expect(tree.getHeight(tree.getRoot())).toBe(2)
		expect(tree.getRoot()?.item).toBe(4)

		expect(tree.getHeight(tree.getRoot()!.left)).toBe(1)
		expect(tree.getRoot()?.left?.item).toBe(3)

		expect(tree.getHeight(tree.getRoot()!.right)).toBe(1)
		expect(tree.getRoot()?.right?.item).toBe(5)

		const deletedNode = tree.findBy(6)
		expect(deletedNode).toBeNull()
	})
})
