/**
 * @param shouldThrow Whether a runtime error should be thrown
 */
export function assertNever(x: never, shouldThrow: boolean): never {
  if (shouldThrow) {
    throw new Error(`Unexpected object: ${x}`);
  } else {
    return x;
  }
}
