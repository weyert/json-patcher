import test, {ExecutionContext} from 'ava'

import {join} from 'path'
import {readFileSync} from 'fs'
import * as yaml from 'js-yaml'

import {applyPatch, createPatch, type PatchOperation} from '..'

interface Spec {
  ignored: boolean;
  name: string
  input: any
  patch: PatchOperation[]
  output: any
  results: (string | null)[],
  diffable: boolean
}

const spec_data = yaml.load(readFileSync(join(__dirname, 'spec.yaml'),
                                         {encoding: 'utf8'})) as Spec[]

function runCatching(spec: Spec, t: ExecutionContext, f: () => void) {
  try {
    f()
  } catch (e) {
    if (spec.results.some(it => it.includes('Error'))) {
      t.pass(`should throw error`)
    } else {
      throw e
    }
  }
}

test('Specification format', t => {
  t.deepEqual(spec_data.length, 19, 'should have 19 items')
  // use sorted values and sort() to emulate set equality
  const props = ['diffable', 'input', 'name', 'output', 'patch', 'results']
  spec_data.forEach(spec => {
    t.deepEqual(Object.keys(spec).filter(it => it !== 'ignored').sort(), props, `"${spec.name}" should have items with specific properties`)
  })
})

// take the input, apply the patch, and check the actual result against the
// expected output
spec_data.forEach(spec => {
  test(`patch ${spec.name}`, t => {
    // patch operations are applied to object in-place
    const expected = spec.output
    runCatching(spec, t, () => {
      const results = applyPatch(spec.input, spec.patch)
      t.deepEqual(results, expected, `should equal expected output after applying patches`)
    })
  })
})

spec_data.filter(spec => spec.diffable).forEach(spec => {
  test(`diff ${spec.name}`, t => {
    if (spec.ignored) {
      t.pass(`should be ignored`)
      return
    }

    // we read this separately because patch is destructive and it's easier just to start with a blank slate
    // ignore spec items that are marked as not diffable
    // perform diff (create patch = list of operations) and check result against non-test patches in spec
    runCatching(spec, t, () => {
      const actual = createPatch(spec.input, spec.output)
      const expected = spec.patch.filter(operation => operation.op !== 'test')
      t.deepEqual(JSON.parse(actual), expected, `should produce diff equal to spec patch`)
    })
  })
})
