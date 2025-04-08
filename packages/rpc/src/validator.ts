import { RpcResponse } from "./response"
import { MiddlewareHandler } from "./rpc"
import { ValidationTargets } from "./typing/rpc"

type ValidationTargetKeysWithBody = 'form' | 'json'
type ValidationTargetByMethod<M> = M extends 'get' | 'head' // GET and HEAD request must not have a body content.
  ? Exclude<keyof ValidationTargets, ValidationTargetKeysWithBody>
  : keyof ValidationTargets

export type ValidationFunction<
  InputType,
  OutputType,
  _TPath extends string = string
> = (
  value: InputType,
) => OutputType | Response | Promise<OutputType> | Promise<Response>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExcludeResponseType<T> = T extends Response & RpcResponse<any> ? never : T

export const validator = <
  InputType,
  TPath extends string,
  TMethod extends string,
  U extends ValidationTargetByMethod<TMethod>,
  OutputType = ValidationTargets[U],
  OutputTypeExcludeResponseType = ExcludeResponseType<OutputType>,
  TPath2 extends string = TPath,
  V extends {
    in: {
      [K in U]: K extends 'json'
      ? unknown extends InputType
      ? OutputTypeExcludeResponseType
      : InputType
      : { [K2 in keyof OutputTypeExcludeResponseType]: ValidationTargets[K][K2] }
    }
    out: { [K in U]: OutputTypeExcludeResponseType }
  } = {
    in: {
      [K in U]: K extends 'json'
      ? unknown extends InputType
      ? OutputTypeExcludeResponseType
      : InputType
      : { [K2 in keyof OutputTypeExcludeResponseType]: ValidationTargets[K][K2] }
    }
    out: { [K in U]: OutputTypeExcludeResponseType }
  },
>(
  _: U,
  __: ValidationFunction<
    unknown extends InputType ? ValidationTargets[U] : InputType,
    OutputType,
    TPath2
  >
): MiddlewareHandler<TPath, V> => {
  return () => { }
}
