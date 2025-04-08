export type JSONPrimitive = string | boolean | number | null

export type JSONArray = (JSONPrimitive | JSONObject | JSONArray)[]

export type InvalidJSONValue = undefined | symbol | ((...args: unknown[]) => unknown)

export type JSONObject = {
  [key: string]: JSONPrimitive | JSONArray | JSONObject | object | InvalidJSONValue
}

export type JSONValue = JSONObject | JSONArray | JSONPrimitive