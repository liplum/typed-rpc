import { RpcHandler, RpcNode, ToSchema } from "../rpc.js"
import { ExtractStringKey } from "./utils.js"
import { RpcResponse, MergeTypedResponse } from "../response.js"
import { BlankInput, BlankSchema, Input, MergePath, Schema } from "./rpc.js"

export interface IRpcRoute<
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
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    path: TPath,
    handler: RpcHandler<TPath, TInput, TRes>
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInput, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(handler x2)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, TPath, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(path, handler x2)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(handler x3)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
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
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInput2, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(handler x4)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInput3 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInput2, TRes>,
      RpcHandler<TPath, TInput3, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, TPath, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(path, handler x4)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInput3 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInput2, TRes>,
      RpcHandler<TPath, TInput3, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(handler x5)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInput3 extends Input = BlankInput,
    TInput4 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInput2, TRes>,
      RpcHandler<TPath, TInput3, TRes>,
      RpcHandler<TPath, TInput4, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, TPath, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(path, handler x5)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInput3 extends Input = BlankInput,
    TInput4 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInput2, TRes>,
      RpcHandler<TPath, TInput3, TRes>,
      RpcHandler<TPath, TInput4, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(handler x6)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInput3 extends Input = BlankInput,
    TInput4 extends Input = BlankInput,
    TInput5 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInput2, TRes>,
      RpcHandler<TPath, TInput3, TRes>,
      RpcHandler<TPath, TInput4, TRes>,
      RpcHandler<TPath, TInput5, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, TPath, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(path, handler x6)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInput3 extends Input = BlankInput,
    TInput4 extends Input = BlankInput,
    TInput5 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInput2, TRes>,
      RpcHandler<TPath, TInput3, TRes>,
      RpcHandler<TPath, TInput4, TRes>,
      RpcHandler<TPath, TInput5, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(handler x7)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInput3 extends Input = BlankInput,
    TInput4 extends Input = BlankInput,
    TInput5 extends Input = BlankInput,
    TInput6 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInput2, TRes>,
      RpcHandler<TPath, TInput3, TRes>,
      RpcHandler<TPath, TInput4, TRes>,
      RpcHandler<TPath, TInput5, TRes>,
      RpcHandler<TPath, TInput6, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, TPath, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(path, handler x7)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInput3 extends Input = BlankInput,
    TInput4 extends Input = BlankInput,
    TInput5 extends Input = BlankInput,
    TInput6 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInput2, TRes>,
      RpcHandler<TPath, TInput3, TRes>,
      RpcHandler<TPath, TInput4, TRes>,
      RpcHandler<TPath, TInput5, TRes>,
      RpcHandler<TPath, TInput6, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(handler x8)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInput3 extends Input = BlankInput,
    TInput4 extends Input = BlankInput,
    TInput5 extends Input = BlankInput,
    TInput6 extends Input = BlankInput,
    TInput7 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInput2, TRes>,
      RpcHandler<TPath, TInput3, TRes>,
      RpcHandler<TPath, TInput4, TRes>,
      RpcHandler<TPath, TInput5, TRes>,
      RpcHandler<TPath, TInput6, TRes>,
      RpcHandler<TPath, TInput7, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, TPath, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(path, handler x8)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInput3 extends Input = BlankInput,
    TInput4 extends Input = BlankInput,
    TInput5 extends Input = BlankInput,
    TInput6 extends Input = BlankInput,
    TInput7 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInput2, TRes>,
      RpcHandler<TPath, TInput3, TRes>,
      RpcHandler<TPath, TInput4, TRes>,
      RpcHandler<TPath, TInput5, TRes>,
      RpcHandler<TPath, TInput6, TRes>,
      RpcHandler<TPath, TInput7, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(handler x9)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInput3 extends Input = BlankInput,
    TInput4 extends Input = BlankInput,
    TInput5 extends Input = BlankInput,
    TInput6 extends Input = BlankInput,
    TInput7 extends Input = BlankInput,
    TInput8 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInput2, TRes>,
      RpcHandler<TPath, TInput3, TRes>,
      RpcHandler<TPath, TInput4, TRes>,
      RpcHandler<TPath, TInput5, TRes>,
      RpcHandler<TPath, TInput6, TRes>,
      RpcHandler<TPath, TInput7, TRes>,
      RpcHandler<TPath, TInput8, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, TPath, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(path, handler x9)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInput3 extends Input = BlankInput,
    TInput4 extends Input = BlankInput,
    TInput5 extends Input = BlankInput,
    TInput6 extends Input = BlankInput,
    TInput7 extends Input = BlankInput,
    TInput8 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInput2, TRes>,
      RpcHandler<TPath, TInput3, TRes>,
      RpcHandler<TPath, TInput4, TRes>,
      RpcHandler<TPath, TInput5, TRes>,
      RpcHandler<TPath, TInput6, TRes>,
      RpcHandler<TPath, TInput7, TRes>,
      RpcHandler<TPath, TInput8, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(handler x10)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInput3 extends Input = BlankInput,
    TInput4 extends Input = BlankInput,
    TInput5 extends Input = BlankInput,
    TInput6 extends Input = BlankInput,
    TInput7 extends Input = BlankInput,
    TInput8 extends Input = BlankInput,
    TInput9 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInput2, TRes>,
      RpcHandler<TPath, TInput3, TRes>,
      RpcHandler<TPath, TInput4, TRes>,
      RpcHandler<TPath, TInput5, TRes>,
      RpcHandler<TPath, TInput6, TRes>,
      RpcHandler<TPath, TInput7, TRes>,
      RpcHandler<TPath, TInput8, TRes>,
      RpcHandler<TPath, TInput9, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, TPath, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(path, handler x10)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInput3 extends Input = BlankInput,
    TInput4 extends Input = BlankInput,
    TInput5 extends Input = BlankInput,
    TInput6 extends Input = BlankInput,
    TInput7 extends Input = BlankInput,
    TInput8 extends Input = BlankInput,
    TInput9 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends RpcResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      RpcHandler<TPath, TInput, TRes>,
      RpcHandler<TPath, TInput2, TRes>,
      RpcHandler<TPath, TInput3, TRes>,
      RpcHandler<TPath, TInput4, TRes>,
      RpcHandler<TPath, TInput5, TRes>,
      RpcHandler<TPath, TInput6, TRes>,
      RpcHandler<TPath, TInput7, TRes>,
      RpcHandler<TPath, TInput8, TRes>,
      RpcHandler<TPath, TInput9, TRes>,
      RpcHandler<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInputLast, MergeTypedResponse<TRes>>, TBasePath>
}