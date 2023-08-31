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
    expect(actualOutput.date).to.be.instanceOf(Date)
})

it(`patch has special date string`, () => {
    const input = {
    }
    const output = {
        date: new Date(2023, 6, 9)
    }
    const patch = createPatch(input, output)
    const op = patch[0]
    expect(op.value.startsWith('$::date:')).to.be.true
})
