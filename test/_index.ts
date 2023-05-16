/**
This module is prefixed with an underscore so that ava recognizes it as a helper,
instead of failing the entire test suite with a "No tests found" error.
 */

import {createPatch} from '..'

export function createParsedPatch(input: any, output: any) {
  const patch = createPatch(input, output)
  return JSON.parse(patch)
}
