import { ContentfulStatusCode, RedirectStatusCode, StatusCode } from "./status-code.js"
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
  union: RpcResponseUnion

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

  text: <
    TValue extends string,
    TStatus extends ContentfulStatusCode,
  >(
    text: TValue,
    arg?: TStatus,
  ) => RpcResponse<
    TValue,
    TStatus,
    'text'
  >

  redirect: <TStatus extends RedirectStatusCode = 302>(
    status?: TStatus
  ) => RpcResponse<undefined, TStatus, "redirect">

  any: <TStatus extends StatusCode>(
    status?: TStatus
  ) => RpcResponse<undefined, TStatus, "body">
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
