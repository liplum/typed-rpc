import { JSONValue } from "./json.js"
import { StatusCode } from "./status-code.js"
import { ExtractStringKey, IsAny, PrefixWith$, Simplify, UnionToIntersection } from "./utils/typing.js"

export type BlankSchema = {}
export type BlankInput = {}

export type KnownResponseFormat = 'json' | 'text' | 'redirect'
export type ResponseFormat = KnownResponseFormat | string

export type Input = {
  in?: {}
  out?: {}
  outputFormat?: ResponseFormat
}

export type TypedResponse<
  T = unknown,
  U extends StatusCode = StatusCode,
  F extends ResponseFormat = T extends string
  ? 'text'
  : T extends JSONValue
  ? 'json'
  : ResponseFormat
> = {
  _data: T
  _status: U
  _format: F
}

export type HandlerResponse<O> = TypedResponse<O>

export type MiddlewareHandler<
  TPath extends string = string,
  TInput extends Input = {}
> = (_: TPath | TInput | undefined) => void

export type FinalHandler<
  TPath extends string = any,
  TInput extends Input = BlankInput,
  TRes extends HandlerResponse<any> = any
> = (_: TPath | TInput | undefined) => TRes

export type IRefDef<
  TPath extends string = any,
  TInput extends Input = BlankInput,
  TRes extends HandlerResponse<any> = any
> = MiddlewareHandler<TPath, TInput> | FinalHandler<TPath, TInput, TRes>

export const defineRpc = <
  TSchema extends Schema = BlankSchema,
  TBasePath extends string = "/",
>() => new RpcDef<TSchema, TBasePath>()

export class RpcDef<
  TSchema extends Schema = BlankSchema,
  TBasePath extends string = "/",
> {
  get!: IRpcRefHandler<'get', TSchema, TBasePath>
  post!: IRpcRefHandler<'post', TSchema, TBasePath>
  put!: IRpcRefHandler<'put', TSchema, TBasePath>
  delete!: IRpcRefHandler<'delete', TSchema, TBasePath>
  options!: IRpcRefHandler<'options', TSchema, TBasePath>
  patch!: IRpcRefHandler<'patch', TSchema, TBasePath>
  all!: IRpcRefHandler<'all', TSchema, TBasePath>
}

type MergeTypedResponse<T> = T extends Promise<infer T2>
  ? T2 extends TypedResponse
  ? T2
  : TypedResponse
  : T extends TypedResponse
  ? T
  : TypedResponse


export interface IRpcRefHandler<
  TMethod extends string = string,
  TSchema extends Schema = BlankSchema,
  TBasePath extends string = "/"
> {
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TRes extends HandlerResponse<any> = any,
  >(
    handler: IRefDef<TPath, TInput, TRes>
  ): RpcDef<TSchema & ToSchema<TMethod, TPath, TInput, MergeTypedResponse<TRes>>, TBasePath>
}

export type Endpoint = {
  input: any
  output: any
  outputFormat: ResponseFormat
  status: StatusCode
}

export type Schema = {
  [Path: string]: {
    [Method: `$${Lowercase<string>}`]: Endpoint
  }
}

type ParamKey<Component> = Component extends `:${infer NameWithPattern}`
  ? NameWithPattern extends `${infer Name}{${infer Rest}`
  ? Rest extends `${infer _Pattern}?`
  ? `${Name}?`
  : Name
  : NameWithPattern
  : never

export type ParamKeys<TPath> = TPath extends `${infer Component}/${infer Rest}`
  ? ParamKey<Component> | ParamKeys<Rest>
  : ParamKey<TPath>

export type ParamKeyToRecord<T extends string> = T extends `${infer R}?`
  ? Record<R, string | undefined>
  : { [K in T]: string }

export type AddParam<TInput, TPath extends string> = ParamKeys<TPath> extends never
  ? TInput
  : TInput extends { param: infer _ }
  ? TInput
  : TInput & { param: UnionToIntersection<ParamKeyToRecord<ParamKeys<TPath>>> }

export type ExtractInput<TInput extends Input | Input['in']> = TInput extends Input
  ? unknown extends TInput['in']
  ? {}
  : TInput['in']
  : TInput

export type ToSchema<
  TMethod extends string,
  TPath extends string,
  TInput extends Input | Input['in'],
  RorO // Response or Output
> = Simplify<{
  [K in TPath]: {
    [K2 in TMethod as PrefixWith$<K2>]: Simplify<
      {
        input: AddParam<ExtractInput<TInput>, TPath>
      } & (IsAny<RorO> extends true
        ? {
          output: {}
          outputFormat: ResponseFormat
          status: StatusCode
        }
        : RorO extends TypedResponse<infer T, infer U, infer F>
        ? {
          output: unknown extends T ? {} : T
          outputFormat: TInput extends { outputFormat: string } ? TInput['outputFormat'] : F
          status: U
        }
        : {
          output: unknown extends RorO ? {} : RorO
          outputFormat: unknown extends RorO
          ? 'json'
          : TInput extends { outputFormat: string }
          ? TInput['outputFormat']
          : 'json'
          status: StatusCode
        })
    >
  }
}>
