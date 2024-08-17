import { NumberComparator } from "@lib/comparators/NumberComparator"
import { AVLTree } from "@lib/trees/AVLTree"

describe("push method tests", () => {
	it("should be able to find object", () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator()
		})
		for(let i=0; i<16; i++) {
			tree.push(i)
		}

		expect(tree.getRoot()?.height).toBe(5)

		const node = tree.findBy(0)
		expect(node?.height).toBe(1)
	})

	it("should be able to test the velocity", () => {
		const tree = new AVLTree<number>({
			comparator: new NumberComparator()
		})
		const arr: number[] = []
		for(let i=0; i<2000000; i++) {
			tree.push(Math.random() * 2000000000)
			arr.push(i)
		}

		const id = 20000000001
		tree.push(id)
		arr.push(id)

		const avlSpeedStartAt = Date.now()	
		tree.findBy(id)
		const avlSpeedEndAt = Date.now()

		const arraySpeedStartAt = Date.now()
		arr.find((item) => item === id)
		const arraySpeedEndAt = Date.now()

		const avlSpentTime = avlSpeedEndAt - avlSpeedStartAt
		const arraySpentTime = arraySpeedEndAt - arraySpeedStartAt
		console.log(`AVL Search time was: ${avlSpentTime}ms`)
		console.log(`Array Search time was: ${arraySpentTime}ms`)

		expect(avlSpentTime < arraySpentTime).toBe(true)
	})
})
