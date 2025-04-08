export type JSONPrimitive = string | boolean | number | null

export type JSONArray = (JSONPrimitive | JSONObject | JSONArray)[]

export type InvalidJSONValue = undefined | symbol | ((...args: unknown[]) => unknown)

export type JSONObject = {
  [key: string]: JSONPrimitive | JSONArray | JSONObject | object | InvalidJSONValue
}

export type JSONValue = JSONObject | JSONArray | JSONPrimitive

/**
 * symbol keys are omitted through `JSON.stringify`
 */
type OmitSymbolKeys<T> = { [K in keyof T as K extends symbol ? never : K]: T[K] }

type InvalidToNull<T> = T extends InvalidJSONValue ? null : T

type IsInvalid<T> = T extends InvalidJSONValue ? true : false

// Non-JSON values such as `Date` implement `.toJSON()`, so they can be transformed to a value assignable to `JSONObject`:
export type JSONParsed<T> = T extends { toJSON(): infer J }
  ? (() => J) extends () => JSONPrimitive
    ? J
    : (() => J) extends () => { toJSON(): unknown }
    ? {}
    : JSONParsed<J>
  : T extends JSONPrimitive
  ? T
  : T extends InvalidJSONValue
  ? never
  : T extends ReadonlyArray<unknown>
  ? { [K in keyof T]: JSONParsed<InvalidToNull<T[K]>> }
  : T extends Set<unknown> | Map<unknown, unknown>
  ? {}
  : T extends object
  ? {
      [K in keyof OmitSymbolKeys<T> as IsInvalid<T[K]> extends true
        ? never
        : K]: boolean extends IsInvalid<T[K]> ? JSONParsed<T[K]> | undefined : JSONParsed<T[K]>
    }
  : never
