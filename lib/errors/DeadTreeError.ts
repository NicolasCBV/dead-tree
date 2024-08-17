export class DeadTreeError extends Error {
  constructor(e: string) {
    super(`Dead Tree Error: ${e}`)
  }
}
