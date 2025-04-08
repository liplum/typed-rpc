export type PrefixWith$<T extends string> = `$${Lowercase<T>}`

export type ExtractStringKey<S> = keyof S & string

/**
* Useful to flatten the type output to improve type hints shown in editors. And also to transform an interface into a type to aide with assignability.
* @copyright from sindresorhus/type-fest
*/
export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {}


export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never

export type IsAny<T> = boolean extends (T extends never ? true : false) ? true : false

export type RequiredKeysOf<BaseType extends object> = Exclude<
  {
    [Key in keyof BaseType]: BaseType extends Record<Key, BaseType[Key]> ? Key : never
  }[keyof BaseType],
  undefined
>

export type HasRequiredKeys<BaseType extends object> = RequiredKeysOf<BaseType> extends never
  ? false
  : true

/**
 * A simple extension of Simplify that will deeply traverse array elements.
 */
export type SimplifyDeepArray<T> = T extends any[]
  ? { [E in keyof T]: SimplifyDeepArray<T[E]> }
  : Simplify<T>
