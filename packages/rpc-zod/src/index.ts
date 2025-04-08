import { } from "@liplum/rpc"
import { MiddlewareHandler } from "@liplum/rpc/dist/rpc";
import { Input, ValidationTargets } from "@liplum/rpc/dist/typing/rpc";
import { type ZodSchema, type z } from 'zod'

type HasUndefined<T> = undefined extends T ? true : false

export const zValidator = <
  TZod extends ZodSchema,
  TTarget extends keyof ValidationTargets,
  TPath extends string,
  In = z.input<TZod>,
  Out = z.output<TZod>,
  TInput extends Input = {
    in: HasUndefined<In> extends true
    ? {
      [K in TTarget]?: In extends ValidationTargets[K]
      ? In
      : { [K2 in keyof In]?: ValidationTargets[K][K2] }
    }
    : {
      [K in TTarget]: In extends ValidationTargets[K]
      ? In
      : { [K2 in keyof In]: ValidationTargets[K][K2] }
    }
    out: { [K in TTarget]: Out }
  },
  V extends TInput = TInput
>(
  _target: TTarget,
  _schema: TZod,
): MiddlewareHandler<TPath, V> => {
  return () => { }
}