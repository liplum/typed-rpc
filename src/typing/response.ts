import { ContentfulStatusCode, StatusCode } from "./status-code.js"
import { InvalidJSONValue, JSONParsed, JSONValue, } from "./json.js"
import { SimplifyDeepArray } from "./utils.js"
import { ResponseFormat } from "./rpc.js"

export type RpcResponse<
  TValue = unknown,
  TStatus extends StatusCode = StatusCode,
  TFormat extends ResponseFormat = TValue extends string
  ? 'text'
  : TValue extends JSONValue
  ? 'json'
  : ResponseFormat
> = {
  _data: TValue
  _status: TStatus
  _format: TFormat
}

export type MergeTypedResponse<T> = T extends Promise<infer T2>
  ? T2 extends RpcResponse
  ? T2
  : RpcResponse
  : T extends RpcResponse
  ? T
  : RpcResponse

export interface RpcResponseFactory {
  union: <
    TRes1 extends RpcResponse,
    TRes2 extends RpcResponse,
  >(...res: [
    TRes1, TRes2
  ]) => TRes1 | TRes2

  json: <
    TValue extends JSONValue | SimplifyDeepArray<unknown> | InvalidJSONValue,
    TStatus extends ContentfulStatusCode,
  >(
    object: TValue,
    arg?: TStatus,
  ) => RpcResponse<
    SimplifyDeepArray<TValue> extends JSONValue
    ? JSONValue extends SimplifyDeepArray<TValue>
    ? never
    : JSONParsed<TValue>
    : never,
    TStatus,
    'json'
  >
}
