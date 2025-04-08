import { RpcHandler, RpcNode, ToSchema } from "../rpc.js"
import { ExtractStringKey } from "./utils.js"
import { RpcResponse, MergeTypedResponse } from "../response.js"
import { BlankInput, BlankSchema, Input, MergePath, Schema } from "./rpc.js"

export interface RpcHandlerFunc<
  TMethod extends string = string,
  TSchema extends Schema = BlankSchema,
  TBasePath extends string = "/"
> {
  // app.get(handler)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    handler: RpcHandler<TPath, TInput, TRes>
  ): RpcNode<TSchema & ToSchema<TMethod, TPath, TInput, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(path, handler)
  <
    TPath extends string,
    MergedPath extends MergePath<TBasePath, TPath> = MergePath<TBasePath, TPath>,
    TInput extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    path: TPath,
    handler: RpcHandler<MergedPath, TInput, TRes>
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInput, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(handler x2)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInputLast extends Input = TInput,
    TRes extends RpcResponse<any> = any,
  >(
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, TPath, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(path, handler x2)
  <
    TPath extends string,
    MergedPath extends MergePath<TBasePath, TPath> = MergePath<TBasePath, TPath>,
    TInput extends Input = BlankInput,
    TInputLast extends Input = TInput,
    TRes extends RpcResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      RpcHandler<MergedPath, TInput, TRes>,
      RpcHandler<MergedPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(handler x3)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = TInput,
    TInputLast extends Input = TInput & TInput2,
    TRes extends RpcResponse<any> = any,
  >(
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInput2, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, TPath, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(path, handler x3)
  <
    TPath extends string,
    MergedPath extends MergePath<TBasePath, TPath> = MergePath<TBasePath, TPath>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = TInput,
    TInputLast extends Input = TInput & TInput2,
    TRes extends RpcResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      RpcHandler<MergedPath, TInput, TRes>,
      RpcHandler<MergedPath, TInput2, TRes>,
      RpcHandler<MergedPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInputLast, MergeTypedResponse<TRes>>, TBasePath>
}