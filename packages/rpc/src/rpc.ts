import { RpcHandlerFunc } from "./handler.js"
import { RpcResponseFactory, RpcResponse } from "./response.js"
import { StatusCode } from "./status-code.js"
import { mergePath } from "./request.js"
import { IsAny, PrefixWith$, Simplify, UnionToIntersection } from "./utils.js"
import { CustomHeader, RequestHeader } from "./headers.js"

export type Schema = {
  [Path: string]: {
    [Method: `$${Lowercase<string>}`]: Endpoint
  }
}

export type KnownResponseFormat = 'json' | 'text' | 'redirect'
export type ResponseFormat = KnownResponseFormat | string

export type Input = {
  in?: {}
  out?: {}
  outputFormat?: ResponseFormat
}

export type Endpoint = {
  input: any
  output: any
  outputFormat: ResponseFormat
  status: StatusCode
}

export type BlankSchema = {}
export type BlankInput = {}

export type MergePath<A extends string, B extends string> = B extends ''
  ? MergePath<A, '/'>
  : A extends ''
  ? B
  : A extends '/'
  ? B
  : A extends `${infer P}/`
  ? B extends `/${infer Q}`
  ? `${P}/${Q}`
  : `${P}/${B}`
  : B extends `/${infer Q}`
  ? Q extends ''
  ? A
  : `${A}/${Q}`
  : `${A}/${B}`


export type RemoveBlankRecord<T> = T extends Record<infer K, unknown>
  ? K extends string
  ? T
  : never
  : never

type FlattenIfIntersect<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

type MergeEndpointParamsWithPath<T extends Endpoint, SubPath extends string> = T extends unknown
  ? {
    input: T['input'] extends { param: infer _ }
    ? ExtractParams<SubPath> extends never
    ? T['input']
    : FlattenIfIntersect<
      T['input'] & {
        param: {
          // Maps extracted keys, stripping braces, to a string-typed record.
          [K in keyof ExtractParams<SubPath> as K extends `${infer Prefix}{${infer _}}`
          ? Prefix
          : K]: string
        }
      }
    >
    : RemoveBlankRecord<ExtractParams<SubPath>> extends never
    ? T['input']
    : T['input'] & {
      // Maps extracted keys, stripping braces, to a string-typed record.
      param: {
        [K in keyof ExtractParams<SubPath> as K extends `${infer Prefix}{${infer _}}`
        ? Prefix
        : K]: string
      }
    }
    output: T['output']
    outputFormat: T['outputFormat']
    status: T['status']
  }
  : never


export type MergeSchemaPath<OrigSchema extends Schema, SubPath extends string> = {
  [P in keyof OrigSchema as MergePath<SubPath, P & string>]: [OrigSchema[P]] extends [
    Record<string, Endpoint>
  ]
  ? { [M in keyof OrigSchema[P]]: MergeEndpointParamsWithPath<OrigSchema[P][M], SubPath> }
  : never
}

type ExtractParams<Path extends string> = string extends Path
  ? Record<string, string>
  : Path extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? { [K in Param | keyof ExtractParams<`/${Rest}`>]: string }
  : Path extends `${infer _Start}:${infer Param}`
  ? { [K in Param]: string }
  : never

export type FormValue = string | Blob
export type ParsedFormValue = string | File

export type ValidationTargets<T extends FormValue = ParsedFormValue, P extends string = string> = {
  json: any
  form: Record<string, T | T[]>
  query: Record<string, string | string[]>
  param: Record<P, P extends `${infer _}?` ? string | undefined : string>
  header: Record<RequestHeader | CustomHeader, string>
  cookie: Record<string, string>
}

export type MiddlewareHandler<
  _TPath extends string = string,
  _TInput extends Input = {}
> = () => void

export type TerminalHandler<
  _TPath extends string = any,
  _TInput extends Input = BlankInput,
  TRes extends RpcResponse<any> = any
> = (r: RpcResponseFactory) => TRes

export type RpcHandler<
  TPath extends string = any,
  TInput extends Input = BlankInput,
  TRes extends RpcResponse<any> = any
> = MiddlewareHandler<TPath, TInput> | TerminalHandler<TPath, TInput, TRes>

export const rpc = <
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
  handler: RpcHandler
}

/**
 * Array of supported HTTP methods.
 */
export const METHODS = ['get', 'post', 'put', 'delete', 'options', 'patch'] as const
/**
 * Constant representing all HTTP methods in lowercase.
 */
export const METHOD_NAME_ALL_LOWERCASE = 'all' as const

export class RpcNode<
  TSchema extends Schema = BlankSchema,
  TBasePath extends string = "/",
> {
  private _basePath: string = '/'
  private path: string = '/'
  routes: RouterRoute[] = []

  constructor() {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE]
    allMethods.forEach((method) => {
      this[method] = (args1: string | RpcHandler, ...args: RpcHandler[]) => {
        if (typeof args1 === 'string') {
          this.path = args1
        } else {
          this.addRoute(method, this.path, args1)
        }
        args.forEach((handler) => {
          this.addRoute(method, this.path, handler)
        })
        return this as any
      }
    })
  }

  get!: RpcHandlerFunc<'get', TSchema, TBasePath>
  post!: RpcHandlerFunc<'post', TSchema, TBasePath>
  put!: RpcHandlerFunc<'put', TSchema, TBasePath>
  delete!: RpcHandlerFunc<'delete', TSchema, TBasePath>
  options!: RpcHandlerFunc<'options', TSchema, TBasePath>
  patch!: RpcHandlerFunc<'patch', TSchema, TBasePath>
  all!: RpcHandlerFunc<'all', TSchema, TBasePath>

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

  private addRoute(method: string, path: string, handler: RpcHandler) {
    method = method.toUpperCase()
    path = mergePath(this._basePath, path)
    const r: RouterRoute = { path, method, handler }
    this.routes.push(r)
  }

  /**
 * `.basePath()` allows base paths to be specified.
 *
 * @param {string} path - base Path
 * @returns {RpcNode} changed RpcNode instance
 *
 * @example
 * ```ts
 * const api = rpc().basePath('/api')
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
        : RorO extends RpcResponse<infer T, infer U, infer F>
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
