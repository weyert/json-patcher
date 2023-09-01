import {applyPatch, createPatch} from "..";
import {expect} from "chai";

it(`dates round trip`, () => {
    const input = {
        date: new Date(2023, 6, 9),
        systemHeader: {
            date: new Date(2023, 4, 20)
        },
        arr: [
            new Date(2023, 4, 20),
            {
                date: new Date(2023, 4, 20)
            },
        ]
    } as const
    const output = {
        date: new Date(2023, 4, 20),
        systemHeader: {
            date: new Date(2023, 6, 9)
        },
        arr: [
            new Date(2023, 6, 9),
            {
                date: new Date(2023, 6, 9)
            }
        ]
    } as const
    const patch = createPatch(input, output)
    const actualOutput = applyPatch(input, patch)

    expect(actualOutput).to.deep.equal(output);
    // this is a way to check that the `actualOutput.date` is actually a date.
    // for some reason, after going through neon, instanceof Date check fails _here_?
    // this may have something to do with jest, as in neon_serde tests with mocha, the assertion is successful
    expect(actualOutput.date.toISOString()).to.equal(output.date.toISOString())
    expect(actualOutput.systemHeader.date.toISOString()).to.equal(output.systemHeader.date.toISOString())
    expect(actualOutput.arr[0].toISOString()).to.equal(output.arr[0].toISOString())
    expect(actualOutput.arr[1].date.toISOString()).to.equal(output.arr[1].date.toISOString())

})

it(`patch includes dates`, () => {
    const date = new Date()
    const input = {}
    const output = {
        date
    }
    const patch = createPatch(input, output)
    const op = patch[0]
    expect(op.value.toISOString()).to.equal(date.toISOString())
})
