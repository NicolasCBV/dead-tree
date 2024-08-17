export interface IComparator<T> {
	compare(c1: T, c2: T): -1 | 0 | 1;
}
