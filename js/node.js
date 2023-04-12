const bindings = require("../artifacts/index.node");

module.exports = {
    createPatch: bindings.createPatch,
    applyPatch: bindings.applyPatch,
}