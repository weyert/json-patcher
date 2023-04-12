const bindings = require("../artifacts/diff_updater.node");

module.exports = {
    createPatch: bindings.createPatch,
    applyPatch: bindings.applyPatch,
}