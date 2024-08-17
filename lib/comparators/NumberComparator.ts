import { IComparator } from "@lib/types/IComparator";

export class NumberComparator implements IComparator<number> {
	compare(c1: number, c2: number): -1 | 0 | 1 {
		if(c1 < c2) return -1
		if(c1 > c2) return 1
		return 0
	}
}
