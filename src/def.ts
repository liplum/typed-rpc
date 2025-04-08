import { IRpcRefHandler } from "./handler.js"
import { JSONValue } from "./json.js"
import { StatusCode } from "./status-code.js"
import { mergePath } from "./utils/request.js"
import { IsAny, MergePath, MergeSchemaPath, PrefixWith$, Simplify, UnionToIntersection } from "./utils/typing.js"

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

export type MiddlewareNode<
  TPath extends string = string,
  TInput extends Input = {}
> = (_: TPath | TInput | undefined) => void

export type TerminalNode<
  TPath extends string = any,
  TInput extends Input = BlankInput,
  TRes extends HandlerResponse<any> = any
> = (_: TPath | TInput | undefined) => TRes

export type IRefNode<
  TPath extends string = any,
  TInput extends Input = BlankInput,
  TRes extends HandlerResponse<any> = any
> = MiddlewareNode<TPath, TInput> | TerminalNode<TPath, TInput, TRes>

export const defineRpc = <
  TSchema extends Schema = BlankSchema,
  TBasePath extends string = "/",
>() => new RpcNode<TSchema, TBasePath>()
/**
 * Interface representing a router.
 *
 * @template T - The type of the handler.
 */
export interface Router<T> {
  /**
   * The name of the router.
   */
  name: string

  /**
   * Adds a route to the router.
   *
   * @param method - The HTTP method (e.g., 'get', 'post').
   * @param path - The path for the route.
   * @param handler - The handler for the route.
   */
  add(method: string, path: string, handler: T): void
}
export interface RouterRoute {
  path: string
  method: string
  handler: IRefNode
}
export class RpcNode<
  TSchema extends Schema = BlankSchema,
  TBasePath extends string = "/",
> {
  private _basePath: string = '/'
  routes: RouterRoute[] = []

  get!: IRpcRefHandler<'get', TSchema, TBasePath>
  post!: IRpcRefHandler<'post', TSchema, TBasePath>
  put!: IRpcRefHandler<'put', TSchema, TBasePath>
  delete!: IRpcRefHandler<'delete', TSchema, TBasePath>
  options!: IRpcRefHandler<'options', TSchema, TBasePath>
  patch!: IRpcRefHandler<'patch', TSchema, TBasePath>

  route<
    TSubPath extends string,
    TSubSchema extends Schema,
    TSubBasePath extends string
  >(
    path: TSubPath,
    app: RpcNode<TSubSchema, TSubBasePath>
  ): RpcNode<MergeSchemaPath<TSubSchema, MergePath<TBasePath, TSubPath>> | TSchema, TBasePath> {
    const subApp = this.basePath(path)
    app.routes.map((r) => {
      subApp.addRoute(r.method, r.path, r.handler)
    })
    return this
  }

  private addRoute(method: string, path: string, handler: IRefNode) {
    method = method.toUpperCase()
    path = mergePath(this._basePath, path)
    const r: RouterRoute = { path, method, handler }
    this.routes.push(r)
  }

  /**
 * `.basePath()` allows base paths to be specified.
 *
 * @see {@link https://hono.dev/docs/api/routing#base-path}
 *
 * @param {string} path - base Path
 * @returns {Hono} changed Hono instance
 *
 * @example
 * ```ts
 * const api = new Hono().basePath('/api')
 * ```
 */
  basePath<TSubPath extends string>(path: TSubPath): RpcNode<TSchema, MergePath<TBasePath, TSubPath>> {
    const subApp = this.clone()
    subApp._basePath = mergePath(this._basePath, path)
    return subApp
  }

  private clone(): RpcNode<TSchema, TBasePath> {
    const clone = new RpcNode<TSchema, TBasePath>()
    clone.routes = this.routes
    return clone
  }
}

export type MergeTypedResponse<T> = T extends Promise<infer T2>
  ? T2 extends TypedResponse
  ? T2
  : TypedResponse
  : T extends TypedResponse
  ? T
  : TypedResponse

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
