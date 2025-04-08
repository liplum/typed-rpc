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
}