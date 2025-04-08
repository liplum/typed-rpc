import { serialize } from "./utils/cookie.js";
import { RpcNode } from "./def.js";
import { Endpoint, FormValue, ResponseFormat, Schema, ValidationTargets } from "./typing/rpc.js";
import { StatusCode, SuccessStatusCode } from "./typing/status-code.js";
import { replaceUrlParam, buildSearchParams, replaceUrlProtocol, mergePath, deepMerge, removeIndexString } from "./utils/request.js";
import { HasRequiredKeys, UnionToIntersection } from "./typing/utils.js";

export type PathToChain<
  TPath extends string,
  TSchema extends Schema,
  Original extends string = TPath
> = TPath extends `/${infer P}`
  ? PathToChain<P, TSchema, TPath>
  : TPath extends `${infer P}/${infer R}`
  ? { [K in P]: PathToChain<R, TSchema, Original> }
  : {
    [K in TPath extends '' ? 'index' : TPath]: ClientRequest<
      TSchema extends Record<string, unknown> ? TSchema[Original] : never
    >
  }

export interface ClientResponse<
  T,
  TStatusCode extends number = StatusCode,
  F extends ResponseFormat = ResponseFormat
> extends globalThis.Response {
  readonly body: ReadableStream | null
  readonly bodyUsed: boolean
  ok: TStatusCode extends SuccessStatusCode
  ? true
  : TStatusCode extends Exclude<StatusCode, SuccessStatusCode>
  ? false
  : boolean
  status: TStatusCode
  statusText: string
  headers: Headers
  url: string
  redirect(url: string, status: number): Response
  clone(): Response
  json(): F extends 'text' ? Promise<never> : F extends 'json' ? Promise<T> : Promise<unknown>
  text(): F extends 'text' ? (T extends string ? Promise<T> : Promise<never>) : Promise<string>
  blob(): Promise<Blob>
  formData(): Promise<FormData>
  arrayBuffer(): Promise<ArrayBuffer>
}

type ClientResponseOfEndpoint<T extends Endpoint = Endpoint> = T extends {
  output: infer O
  outputFormat: infer F
  status: infer S
}
  ? ClientResponse<O, S extends number ? S : never, F extends ResponseFormat ? F : never>
  : never

export type ClientRequest<TSchema extends Schema> = {
  [M in keyof TSchema]: TSchema[M] extends Endpoint & { input: infer R }
  ? R extends object
  ? HasRequiredKeys<R> extends true
  ? (args: R, options?: ClientRequestOptions) => Promise<ClientResponseOfEndpoint<TSchema[M]>>
  : (args?: R, options?: ClientRequestOptions) => Promise<ClientResponseOfEndpoint<TSchema[M]>>
  : never
  : never
} & {
  $url: (
    arg?: TSchema[keyof TSchema] extends { input: infer R }
      ? R extends { param: infer P }
      ? R extends { query: infer Q }
      ? { param: P; query: Q }
      : { param: P }
      : R extends { query: infer Q }
      ? { query: Q }
      : {}
      : {}
  ) => URL
} & (TSchema['$get'] extends { outputFormat: 'ws' }
  ? TSchema['$get'] extends { input: infer I }
  ? {
    $ws: (args?: I) => WebSocket
  }
  : {}
  : {})

type RpcRequest = (
  input: RequestInfo | URL,
  requestInit?: RequestInit,
) => Response | Promise<Response>

export type ClientRequestOptions<T = unknown> = {
  fetch?: typeof fetch | RpcRequest
  webSocket?: (...args: ConstructorParameters<typeof WebSocket>) => WebSocket
  /**
   * Standard `RequestInit`, caution that this take highest priority
   * and could be used to overwrite things that DefineRPC sets for you, like `body | method | headers`.
   *
   * If you want to add some headers, use in `headers` instead of `init`
   */
  init?: RequestInit
} & (keyof T extends never
  ? {
    headers?:
    | Record<string, string>
    | (() => Record<string, string> | Promise<Record<string, string>>)
  }
  : {
    headers: T | (() => T | Promise<T>)
  })

export type Client<T> = T extends RpcNode<infer TSchema, any>
  ? TSchema extends Record<infer K, Schema>
  ? K extends string
  ? PathToChain<K, TSchema>
  : never
  : never
  : never

export type Callback = (opts: CallbackOptions) => unknown

interface CallbackOptions {
  path: string[]
  args: any[]
}

const createProxy = (callback: Callback, path: string[]) => {
  const proxy: unknown = new Proxy(() => { }, {
    get(_obj, key) {
      if (typeof key !== 'string' || key === 'then') {
        return undefined
      }
      return createProxy(callback, [...path, key])
    },
    apply(_1, _2, args) {
      return callback({
        path,
        args,
      })
    },
  })
  return proxy
}

export const rpcClient = <T extends RpcNode<any, any>>(
  baseUrl: string,
  options?: ClientRequestOptions
) =>
  createProxy(function proxyCallback(opts) {
    const parts = [...opts.path]
    const lastParts = parts.slice(-3).reverse()

    // allow calling .toString() and .valueOf() on the proxy
    if (lastParts[0] === 'toString') {
      if (lastParts[1] === 'name') {
        // e.g. hc().somePath.name.toString() -> "somePath"
        return lastParts[2] || ''
      }
      // e.g. hc().somePath.toString()
      return proxyCallback.toString()
    }

    if (lastParts[0] === 'valueOf') {
      if (lastParts[1] === 'name') {
        // e.g. hc().somePath.name.valueOf() -> "somePath"
        return lastParts[2] || ''
      }
      // e.g. hc().somePath.valueOf()
      return proxyCallback
    }

    let method = ''
    if (/^\$/.test(lastParts[0] as string)) {
      const last = parts.pop()
      if (last) {
        method = last.replace(/^\$/, '')
      }
    }

    const path = parts.join('/')
    const url = mergePath(baseUrl, path)
    if (method === 'url') {
      let result = url
      if (opts.args[0]) {
        if (opts.args[0].param) {
          result = replaceUrlParam(url, opts.args[0].param)
        }
        if (opts.args[0].query) {
          result = result + '?' + buildSearchParams(opts.args[0].query).toString()
        }
      }
      return new URL(result)
    }
    if (method === 'ws') {
      const webSocketUrl = replaceUrlProtocol(
        opts.args[0] && opts.args[0].param ? replaceUrlParam(url, opts.args[0].param) : url,
        'ws'
      )
      const targetUrl = new URL(webSocketUrl)

      const queryParams: Record<string, string | string[]> | undefined = opts.args[0]?.query
      if (queryParams) {
        Object.entries(queryParams).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach((item) => targetUrl.searchParams.append(key, item))
          } else {
            targetUrl.searchParams.set(key, value)
          }
        })
      }
      const establishWebSocket = (...args: ConstructorParameters<typeof WebSocket>) => {
        if (options?.webSocket !== undefined && typeof options.webSocket === 'function') {
          return options.webSocket(...args)
        }
        return new WebSocket(...args)
      }

      return establishWebSocket(targetUrl.toString())
    }

    const req = new ClientRequestImpl(url, method)
    if (method) {
      options ??= {}
      const args = deepMerge<ClientRequestOptions>(options, { ...opts.args[1] })
      return req.fetch(opts.args[0], args)
    }
    return req
  }, []) as UnionToIntersection<Client<T>>

class ClientRequestImpl {
  private url: string
  private method: string
  private queryParams: URLSearchParams | undefined = undefined
  private pathParams: Record<string, string> = {}
  private rBody: BodyInit | undefined
  private cType: string | undefined = undefined

  constructor(url: string, method: string) {
    this.url = url
    this.method = method
  }
  fetch = async (
    args?: ValidationTargets<FormValue> & {
      param?: Record<string, string>
    },
    opt?: ClientRequestOptions
  ) => {
    if (args) {
      if (args.query) {
        this.queryParams = buildSearchParams(args.query)
      }

      if (args.form) {
        const form = new FormData()
        for (const [k, v] of Object.entries(args.form)) {
          if (Array.isArray(v)) {
            for (const v2 of v) {
              form.append(k, v2)
            }
          } else {
            form.append(k, v)
          }
        }
        this.rBody = form
      }

      if (args.json) {
        this.rBody = JSON.stringify(args.json)
        this.cType = 'application/json'
      }

      if (args.param) {
        this.pathParams = args.param
      }
    }

    let methodUpperCase = this.method.toUpperCase()

    const headerValues: Record<string, string> = {
      ...args?.header,
      ...(typeof opt?.headers === 'function' ? await opt.headers() : opt?.headers),
    }

    if (args?.cookie) {
      const cookies: string[] = []
      for (const [key, value] of Object.entries(args.cookie)) {
        cookies.push(serialize(key, value, { path: '/' }))
      }
      headerValues['Cookie'] = cookies.join(',')
    }

    if (this.cType) {
      headerValues['Content-Type'] = this.cType
    }

    const headers = new Headers(headerValues ?? undefined)
    let url = this.url

    url = removeIndexString(url)
    url = replaceUrlParam(url, this.pathParams)

    if (this.queryParams) {
      url = url + '?' + this.queryParams.toString()
    }
    methodUpperCase = this.method.toUpperCase()
    const setBody = !(methodUpperCase === 'GET' || methodUpperCase === 'HEAD')

    // Pass URL string to 1st arg for testing with MSW and node-fetch
    return (opt?.fetch || fetch)(url, {
      body: setBody ? this.rBody : undefined,
      method: methodUpperCase,
      headers: headers,
      ...opt?.init,
    })
  }
}