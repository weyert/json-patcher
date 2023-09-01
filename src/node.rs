use json_patch::PatchOperation;

use neon::prelude::*;
use neon::result::Throw;
use serde::de::DeserializeOwned;

macro_rules! map_to_neon {
    ($cx:expr, $val:expr) => {{
        match $val {
            Ok(v) => Ok(v),
            Err(e) => $cx.throw_error(e.to_string()),
        }
    }};
}

fn to_json_value<'a, D: DeserializeOwned>(
    cx: &mut FunctionContext<'a>,
    js_value: Handle<'a, JsValue>,
) -> Result<D, Throw> {
    match neon_serde::from_value(cx, js_value) {
        Ok(v) => Ok(v),
        Err(neon_serde::errors::Error::Js(err)) => Err(err),
        Err(e) => cx.throw_error(e.to_string()),
    }
}

pub fn create_patch(mut cx: FunctionContext) -> JsResult<JsValue> {
    let left = cx.argument::<JsValue>(0)?;
    let left = to_json_value(&mut cx, left)?;

    let right = cx.argument::<JsValue>(1)?;
    let right = to_json_value(&mut cx, right)?;

    let patch = json_patch::diff(&left, &right);
    let s = map_to_neon!(cx, neon_serde::to_value(&mut cx, &patch))?;
    Ok(s)
}

pub fn apply_patch(mut cx: FunctionContext) -> JsResult<JsValue> {
    let doc = cx.argument::<JsValue>(0)?;
    let mut doc = to_json_value(&mut cx, doc)?;

    let patch = cx.argument::<JsValue>(1)?;
    let patch: Vec<PatchOperation> = to_json_value(&mut cx, patch)?;

    map_to_neon!(cx, json_patch::patch(&mut doc, &patch))?;

    match neon_serde::to_value(&mut cx, &doc) {
        Ok(v) => Ok(v),
        Err(neon_serde::errors::Error::Js(err)) => Err(err),
        Err(e) => cx.throw_error(e.to_string()),
    }
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("createPatch", create_patch)?;
    cx.export_function("applyPatch", apply_patch)?;
    Ok(())
}
