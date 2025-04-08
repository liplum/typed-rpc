import { BlankInput, BlankSchema, HandlerResponse, Input, IRefNode, MergeTypedResponse, RpcNode, Schema, ToSchema } from "./def.js"
import { ExtractStringKey, MergePath } from "./utils/typing.js"

export interface IRpcRefHandler<
  TMethod extends string = string,
  TSchema extends Schema = BlankSchema,
  TBasePath extends string = "/"
> {
  // app.get(handler)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TRes extends HandlerResponse<any> = any,
  >(
    handler: IRefNode<TPath, TInput, TRes>
  ): RpcNode<TSchema & ToSchema<TMethod, TPath, TInput, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(path, handler)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TRes extends HandlerResponse<any> = any,
  >(
    path: TPath,
    handler: IRefNode<TPath, TInput, TRes>
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInput, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(handler x2)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends HandlerResponse<any> = any,
  >(
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, TPath, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(path, handler x2)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends HandlerResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(handler x3)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends HandlerResponse<any> = any,
  >(
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInput2, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, TPath, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(path, handler x3)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends HandlerResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInput2, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(handler x4)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInput3 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends HandlerResponse<any> = any,
  >(
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInput2, TRes>,
      IRefNode<TPath, TInput3, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, TPath, TInputLast, MergeTypedResponse<TRes>>, TBasePath>

  // app.get(path, handler x4)
  <
    TPath extends string = ExtractStringKey<TSchema> extends never ? TBasePath : ExtractStringKey<TSchema>,
    TInput extends Input = BlankInput,
    TInput2 extends Input = BlankInput,
    TInput3 extends Input = BlankInput,
    TInputLast extends Input = BlankInput,
    TRes extends HandlerResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInput2, TRes>,
      IRefNode<TPath, TInput3, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
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
    TRes extends HandlerResponse<any> = any,
  >(
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInput2, TRes>,
      IRefNode<TPath, TInput3, TRes>,
      IRefNode<TPath, TInput4, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
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
    TRes extends HandlerResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInput2, TRes>,
      IRefNode<TPath, TInput3, TRes>,
      IRefNode<TPath, TInput4, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
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
    TRes extends HandlerResponse<any> = any,
  >(
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInput2, TRes>,
      IRefNode<TPath, TInput3, TRes>,
      IRefNode<TPath, TInput4, TRes>,
      IRefNode<TPath, TInput5, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
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
    TRes extends HandlerResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInput2, TRes>,
      IRefNode<TPath, TInput3, TRes>,
      IRefNode<TPath, TInput4, TRes>,
      IRefNode<TPath, TInput5, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
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
    TRes extends HandlerResponse<any> = any,
  >(
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInput2, TRes>,
      IRefNode<TPath, TInput3, TRes>,
      IRefNode<TPath, TInput4, TRes>,
      IRefNode<TPath, TInput5, TRes>,
      IRefNode<TPath, TInput6, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
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
    TRes extends HandlerResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInput2, TRes>,
      IRefNode<TPath, TInput3, TRes>,
      IRefNode<TPath, TInput4, TRes>,
      IRefNode<TPath, TInput5, TRes>,
      IRefNode<TPath, TInput6, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
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
    TRes extends HandlerResponse<any> = any,
  >(
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInput2, TRes>,
      IRefNode<TPath, TInput3, TRes>,
      IRefNode<TPath, TInput4, TRes>,
      IRefNode<TPath, TInput5, TRes>,
      IRefNode<TPath, TInput6, TRes>,
      IRefNode<TPath, TInput7, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
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
    TRes extends HandlerResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInput2, TRes>,
      IRefNode<TPath, TInput3, TRes>,
      IRefNode<TPath, TInput4, TRes>,
      IRefNode<TPath, TInput5, TRes>,
      IRefNode<TPath, TInput6, TRes>,
      IRefNode<TPath, TInput7, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
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
    TRes extends HandlerResponse<any> = any,
  >(
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInput2, TRes>,
      IRefNode<TPath, TInput3, TRes>,
      IRefNode<TPath, TInput4, TRes>,
      IRefNode<TPath, TInput5, TRes>,
      IRefNode<TPath, TInput6, TRes>,
      IRefNode<TPath, TInput7, TRes>,
      IRefNode<TPath, TInput8, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
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
    TRes extends HandlerResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInput2, TRes>,
      IRefNode<TPath, TInput3, TRes>,
      IRefNode<TPath, TInput4, TRes>,
      IRefNode<TPath, TInput5, TRes>,
      IRefNode<TPath, TInput6, TRes>,
      IRefNode<TPath, TInput7, TRes>,
      IRefNode<TPath, TInput8, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
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
    TRes extends HandlerResponse<any> = any,
  >(
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInput2, TRes>,
      IRefNode<TPath, TInput3, TRes>,
      IRefNode<TPath, TInput4, TRes>,
      IRefNode<TPath, TInput5, TRes>,
      IRefNode<TPath, TInput6, TRes>,
      IRefNode<TPath, TInput7, TRes>,
      IRefNode<TPath, TInput8, TRes>,
      IRefNode<TPath, TInput9, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
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
    TRes extends HandlerResponse<any> = any,
  >(
    path: TPath,
    ...handlers: [
      IRefNode<TPath, TInput, TRes>,
      IRefNode<TPath, TInput2, TRes>,
      IRefNode<TPath, TInput3, TRes>,
      IRefNode<TPath, TInput4, TRes>,
      IRefNode<TPath, TInput5, TRes>,
      IRefNode<TPath, TInput6, TRes>,
      IRefNode<TPath, TInput7, TRes>,
      IRefNode<TPath, TInput8, TRes>,
      IRefNode<TPath, TInput9, TRes>,
      IRefNode<TPath, TInputLast, TRes>,
    ]
  ): RpcNode<TSchema & ToSchema<TMethod, MergePath<TBasePath, TPath>, TInputLast, MergeTypedResponse<TRes>>, TBasePath>
}