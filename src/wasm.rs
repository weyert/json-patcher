use wasm_bindgen::prelude::*;
use json_patch::PatchOperation;

#[wasm_bindgen(js_name = createPatch)]
pub fn create_patch(left: JsValue, right: JsValue) -> Result<String, serde_wasm_bindgen::Error> {
    let left = serde_wasm_bindgen::from_value(left)?;
    let right = serde_wasm_bindgen::from_value(right)?;
    let diff = json_patch::diff(&left, &right);
    Ok(serde_json::to_string(&diff).expect("diff is valid json"))
}

#[wasm_bindgen(js_name = applyPatch)]
pub fn apply_patch(doc: JsValue, patches: JsValue) -> Result<JsValue, serde_wasm_bindgen::Error> {
    let mut doc = serde_wasm_bindgen::from_value(doc)?;
    let patches: Vec<PatchOperation> = serde_wasm_bindgen::from_value(patches)?;
    json_patch::patch(&mut doc, &patches).expect("todo");
    serde_wasm_bindgen::to_value(&doc)
}
