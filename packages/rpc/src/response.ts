import { ContentfulStatusCode, RedirectStatusCode, StatusCode } from "./typing/status-code.js"
import { InvalidJSONValue, JSONParsed, JSONValue, } from "./typing/json.js"
import { SimplifyDeepArray } from "./typing/utils.js"
import { ResponseFormat } from "./typing/rpc.js"

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

export type RpcResponseJson<
  TValue extends JSONValue | SimplifyDeepArray<unknown> | InvalidJSONValue = null,
  TStatus extends ContentfulStatusCode = ContentfulStatusCode,
> = RpcResponse<
  SimplifyDeepArray<TValue> extends JSONValue
  ? JSONValue extends SimplifyDeepArray<TValue>
  ? never
  : JSONParsed<TValue>
  : never,
  TStatus,
  'json'
>

export type RpcResponseText<
  TStatus extends ContentfulStatusCode = ContentfulStatusCode,
> = RpcResponse<string, TStatus, 'text'>

export type RpcResponseRedirect<
  TStatus extends RedirectStatusCode = RedirectStatusCode,
> = RpcResponse<undefined, TStatus, 'redirect'>

export type RpcResponseAny<
  TStatus extends StatusCode = ContentfulStatusCode,
> = RpcResponse<undefined, TStatus, 'body'>

export interface RpcResponseFactory {
  <TRes extends RpcResponse>(): TRes

  union: RpcResponseUnion

  json: <
    TValue extends JSONValue | SimplifyDeepArray<unknown> | InvalidJSONValue = null,
    TStatus extends ContentfulStatusCode = ContentfulStatusCode,
  >() => RpcResponseJson<TValue, TStatus>

  text: <
    TStatus extends ContentfulStatusCode = ContentfulStatusCode,
  >() => RpcResponseText<TStatus>

  redirect: <
    TStatus extends RedirectStatusCode = RedirectStatusCode
  >() => RpcResponseRedirect<TStatus>

  any: <
    TStatus extends StatusCode = ContentfulStatusCode
  >() => RpcResponseAny<TStatus>
}

export type RpcResponseUnion = {
  <
    TRes1 extends RpcResponse,
    TRes2 extends RpcResponse,
  >(...res: [
    TRes1,
    TRes2,
  ]): TRes1 | TRes2

  <
    TRes1 extends RpcResponse,
    TRes2 extends RpcResponse,
    TRes3 extends RpcResponse,
  >(...res: [
    TRes1,
    TRes2,
    TRes3,
  ]): TRes1 | TRes2 | TRes2

  <
    TRes1 extends RpcResponse,
    TRes2 extends RpcResponse,
    TRes3 extends RpcResponse,
    TRes4 extends RpcResponse,
  >(...res: [
    TRes1,
    TRes2,
    TRes3,
    TRes4,
  ]): TRes1 | TRes2 | TRes3 | TRes4

  <
    TRes1 extends RpcResponse,
    TRes2 extends RpcResponse,
    TRes3 extends RpcResponse,
    TRes4 extends RpcResponse,
    TRes5 extends RpcResponse,
  >(...res: [
    TRes1,
    TRes2,
    TRes3,
    TRes4,
    TRes5,
  ]): TRes1 | TRes2 | TRes3 | TRes4 | TRes5

  <
    TRes1 extends RpcResponse,
    TRes2 extends RpcResponse,
    TRes3 extends RpcResponse,
    TRes4 extends RpcResponse,
    TRes5 extends RpcResponse,
    TRes6 extends RpcResponse,
  >(...res: [
    TRes1,
    TRes2,
    TRes3,
    TRes4,
    TRes5,
    TRes6,
  ]): TRes1 | TRes2 | TRes3 | TRes4 | TRes5 | TRes6

  <
    TRes1 extends RpcResponse,
    TRes2 extends RpcResponse,
    TRes3 extends RpcResponse,
    TRes4 extends RpcResponse,
    TRes5 extends RpcResponse,
    TRes6 extends RpcResponse,
    TRes7 extends RpcResponse,
  >(...res: [
    TRes1,
    TRes2,
    TRes3,
    TRes4,
    TRes5,
    TRes6,
    TRes7,
  ]): TRes1 | TRes2 | TRes3 | TRes4 | TRes5 | TRes6 | TRes7

  <
    TRes1 extends RpcResponse,
    TRes2 extends RpcResponse,
    TRes3 extends RpcResponse,
    TRes4 extends RpcResponse,
    TRes5 extends RpcResponse,
    TRes6 extends RpcResponse,
    TRes7 extends RpcResponse,
    TRes8 extends RpcResponse,
  >(...res: [
    TRes1,
    TRes2,
    TRes3,
    TRes4,
    TRes5,
    TRes6,
    TRes7,
    TRes8,
  ]): TRes1 | TRes2 | TRes3 | TRes4 | TRes5 | TRes6 | TRes7 | TRes8

  <
    TRes1 extends RpcResponse,
    TRes2 extends RpcResponse,
    TRes3 extends RpcResponse,
    TRes4 extends RpcResponse,
    TRes5 extends RpcResponse,
    TRes6 extends RpcResponse,
    TRes7 extends RpcResponse,
    TRes8 extends RpcResponse,
    TRes9 extends RpcResponse,
  >(...res: [
    TRes1,
    TRes2,
    TRes3,
    TRes4,
    TRes5,
    TRes6,
    TRes7,
    TRes8,
    TRes9,
  ]): TRes1 | TRes2 | TRes3 | TRes4 | TRes5 | TRes6 | TRes7 | TRes8 | TRes9

  <
    TRes1 extends RpcResponse,
    TRes2 extends RpcResponse,
    TRes3 extends RpcResponse,
    TRes4 extends RpcResponse,
    TRes5 extends RpcResponse,
    TRes6 extends RpcResponse,
    TRes7 extends RpcResponse,
    TRes8 extends RpcResponse,
    TRes9 extends RpcResponse,
    TRes10 extends RpcResponse,
  >(...res: [
    TRes1,
    TRes2,
    TRes3,
    TRes4,
    TRes5,
    TRes6,
    TRes7,
    TRes8,
    TRes9,
    TRes10,
  ]): TRes1 | TRes2 | TRes3 | TRes4 | TRes5 | TRes6 | TRes7 | TRes8 | TRes9 | TRes10
}
