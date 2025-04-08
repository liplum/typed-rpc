import { TypedResponse } from "./def.js"
import { ContentfulStatusCode } from "./status-code.js"
import { InvalidJSONValue, JSONParsed, JSONValue, } from "./utils/json.js"
import { SimplifyDeepArray } from "./utils/typing.js"

export interface RpcResponseFactory {
  json: <
    TValue extends JSONValue | SimplifyDeepArray<unknown> | InvalidJSONValue,
    TStatus extends ContentfulStatusCode,
  >(
    object: TValue,
    arg?: TStatus,
  ) => TypedResponse<
    SimplifyDeepArray<TValue> extends JSONValue
    ? JSONValue extends SimplifyDeepArray<TValue>
    ? never
    : JSONParsed<TValue>
    : never,
    TStatus,
    'json'
  >
}
