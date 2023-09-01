import {createPatch} from '..'

export function createParsedPatch(input: any, output: any) {
  const patch = createPatch(input, output)
  return patch
}
