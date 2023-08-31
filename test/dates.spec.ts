import {createParsedPatch as createPatch} from "./_index";
import {applyPatch} from "..";
import {expect} from "chai";

it(`dates round trip`, () => {
    const input = {
        date: new Date(2023, 4, 20)
    }
    const output = {
        date: new Date(2023, 6, 9)
    }
    const patch = createPatch(input, output)
    const actualOutput = applyPatch(input, patch)

    expect(actualOutput).to.deep.equal(output);
    // this is a way to check that the `actualOutput.date` is actually a date.
    // for some reason, after going through neon, instanceof Date check fails _here_?
    // this may have something to do with jest, as in neon_serde tests with mocha, the assertion is successful
    expect(actualOutput.date.toISOString()).to.equal(output.date.toISOString())

})

it(`patch has special date string`, () => {
    const input = {}
    const output = {
        date: new Date(2023, 6, 9)
    }
    const patch = createPatch(input, output)
    const op = patch[0]
    expect(op.value.startsWith('$::date:')).to.be.true
})
