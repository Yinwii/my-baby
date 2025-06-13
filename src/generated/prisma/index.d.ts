
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Baby
 * 
 */
export type Baby = $Result.DefaultSelection<Prisma.$BabyPayload>
/**
 * Model GrowthRecord
 * 
 */
export type GrowthRecord = $Result.DefaultSelection<Prisma.$GrowthRecordPayload>
/**
 * Model Milestone
 * 
 */
export type Milestone = $Result.DefaultSelection<Prisma.$MilestonePayload>
/**
 * Model MediaItem
 * 
 */
export type MediaItem = $Result.DefaultSelection<Prisma.$MediaItemPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Babies
 * const babies = await prisma.baby.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Babies
   * const babies = await prisma.baby.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.baby`: Exposes CRUD operations for the **Baby** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Babies
    * const babies = await prisma.baby.findMany()
    * ```
    */
  get baby(): Prisma.BabyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.growthRecord`: Exposes CRUD operations for the **GrowthRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GrowthRecords
    * const growthRecords = await prisma.growthRecord.findMany()
    * ```
    */
  get growthRecord(): Prisma.GrowthRecordDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.milestone`: Exposes CRUD operations for the **Milestone** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Milestones
    * const milestones = await prisma.milestone.findMany()
    * ```
    */
  get milestone(): Prisma.MilestoneDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mediaItem`: Exposes CRUD operations for the **MediaItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MediaItems
    * const mediaItems = await prisma.mediaItem.findMany()
    * ```
    */
  get mediaItem(): Prisma.MediaItemDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Baby: 'Baby',
    GrowthRecord: 'GrowthRecord',
    Milestone: 'Milestone',
    MediaItem: 'MediaItem'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "baby" | "growthRecord" | "milestone" | "mediaItem"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Baby: {
        payload: Prisma.$BabyPayload<ExtArgs>
        fields: Prisma.BabyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BabyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BabyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>
          }
          findFirst: {
            args: Prisma.BabyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BabyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>
          }
          findMany: {
            args: Prisma.BabyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>[]
          }
          create: {
            args: Prisma.BabyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>
          }
          createMany: {
            args: Prisma.BabyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BabyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>[]
          }
          delete: {
            args: Prisma.BabyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>
          }
          update: {
            args: Prisma.BabyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>
          }
          deleteMany: {
            args: Prisma.BabyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BabyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BabyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>[]
          }
          upsert: {
            args: Prisma.BabyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BabyPayload>
          }
          aggregate: {
            args: Prisma.BabyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBaby>
          }
          groupBy: {
            args: Prisma.BabyGroupByArgs<ExtArgs>
            result: $Utils.Optional<BabyGroupByOutputType>[]
          }
          count: {
            args: Prisma.BabyCountArgs<ExtArgs>
            result: $Utils.Optional<BabyCountAggregateOutputType> | number
          }
        }
      }
      GrowthRecord: {
        payload: Prisma.$GrowthRecordPayload<ExtArgs>
        fields: Prisma.GrowthRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GrowthRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GrowthRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>
          }
          findFirst: {
            args: Prisma.GrowthRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GrowthRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>
          }
          findMany: {
            args: Prisma.GrowthRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>[]
          }
          create: {
            args: Prisma.GrowthRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>
          }
          createMany: {
            args: Prisma.GrowthRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GrowthRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>[]
          }
          delete: {
            args: Prisma.GrowthRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>
          }
          update: {
            args: Prisma.GrowthRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>
          }
          deleteMany: {
            args: Prisma.GrowthRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GrowthRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GrowthRecordUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>[]
          }
          upsert: {
            args: Prisma.GrowthRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GrowthRecordPayload>
          }
          aggregate: {
            args: Prisma.GrowthRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGrowthRecord>
          }
          groupBy: {
            args: Prisma.GrowthRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<GrowthRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.GrowthRecordCountArgs<ExtArgs>
            result: $Utils.Optional<GrowthRecordCountAggregateOutputType> | number
          }
        }
      }
      Milestone: {
        payload: Prisma.$MilestonePayload<ExtArgs>
        fields: Prisma.MilestoneFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MilestoneFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MilestoneFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          findFirst: {
            args: Prisma.MilestoneFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MilestoneFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          findMany: {
            args: Prisma.MilestoneFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>[]
          }
          create: {
            args: Prisma.MilestoneCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          createMany: {
            args: Prisma.MilestoneCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MilestoneCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>[]
          }
          delete: {
            args: Prisma.MilestoneDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          update: {
            args: Prisma.MilestoneUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          deleteMany: {
            args: Prisma.MilestoneDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MilestoneUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MilestoneUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>[]
          }
          upsert: {
            args: Prisma.MilestoneUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MilestonePayload>
          }
          aggregate: {
            args: Prisma.MilestoneAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMilestone>
          }
          groupBy: {
            args: Prisma.MilestoneGroupByArgs<ExtArgs>
            result: $Utils.Optional<MilestoneGroupByOutputType>[]
          }
          count: {
            args: Prisma.MilestoneCountArgs<ExtArgs>
            result: $Utils.Optional<MilestoneCountAggregateOutputType> | number
          }
        }
      }
      MediaItem: {
        payload: Prisma.$MediaItemPayload<ExtArgs>
        fields: Prisma.MediaItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaItemPayload>
          }
          findFirst: {
            args: Prisma.MediaItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaItemPayload>
          }
          findMany: {
            args: Prisma.MediaItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaItemPayload>[]
          }
          create: {
            args: Prisma.MediaItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaItemPayload>
          }
          createMany: {
            args: Prisma.MediaItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MediaItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaItemPayload>[]
          }
          delete: {
            args: Prisma.MediaItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaItemPayload>
          }
          update: {
            args: Prisma.MediaItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaItemPayload>
          }
          deleteMany: {
            args: Prisma.MediaItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MediaItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaItemPayload>[]
          }
          upsert: {
            args: Prisma.MediaItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaItemPayload>
          }
          aggregate: {
            args: Prisma.MediaItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMediaItem>
          }
          groupBy: {
            args: Prisma.MediaItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaItemCountArgs<ExtArgs>
            result: $Utils.Optional<MediaItemCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    baby?: BabyOmit
    growthRecord?: GrowthRecordOmit
    milestone?: MilestoneOmit
    mediaItem?: MediaItemOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type BabyCountOutputType
   */

  export type BabyCountOutputType = {
    growthRecords: number
    milestones: number
    mediaItems: number
  }

  export type BabyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    growthRecords?: boolean | BabyCountOutputTypeCountGrowthRecordsArgs
    milestones?: boolean | BabyCountOutputTypeCountMilestonesArgs
    mediaItems?: boolean | BabyCountOutputTypeCountMediaItemsArgs
  }

  // Custom InputTypes
  /**
   * BabyCountOutputType without action
   */
  export type BabyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BabyCountOutputType
     */
    select?: BabyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BabyCountOutputType without action
   */
  export type BabyCountOutputTypeCountGrowthRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GrowthRecordWhereInput
  }

  /**
   * BabyCountOutputType without action
   */
  export type BabyCountOutputTypeCountMilestonesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MilestoneWhereInput
  }

  /**
   * BabyCountOutputType without action
   */
  export type BabyCountOutputTypeCountMediaItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Baby
   */

  export type AggregateBaby = {
    _count: BabyCountAggregateOutputType | null
    _avg: BabyAvgAggregateOutputType | null
    _sum: BabySumAggregateOutputType | null
    _min: BabyMinAggregateOutputType | null
    _max: BabyMaxAggregateOutputType | null
  }

  export type BabyAvgAggregateOutputType = {
    birthWeight: number | null
    birthHeight: number | null
    birthHeadCircumference: number | null
  }

  export type BabySumAggregateOutputType = {
    birthWeight: number | null
    birthHeight: number | null
    birthHeadCircumference: number | null
  }

  export type BabyMinAggregateOutputType = {
    id: string | null
    name: string | null
    birthDate: Date | null
    birthTime: string | null
    gender: string | null
    birthWeight: number | null
    birthHeight: number | null
    birthHeadCircumference: number | null
    bloodType: string | null
    allergies: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BabyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    birthDate: Date | null
    birthTime: string | null
    gender: string | null
    birthWeight: number | null
    birthHeight: number | null
    birthHeadCircumference: number | null
    bloodType: string | null
    allergies: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BabyCountAggregateOutputType = {
    id: number
    name: number
    birthDate: number
    birthTime: number
    gender: number
    birthWeight: number
    birthHeight: number
    birthHeadCircumference: number
    bloodType: number
    allergies: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BabyAvgAggregateInputType = {
    birthWeight?: true
    birthHeight?: true
    birthHeadCircumference?: true
  }

  export type BabySumAggregateInputType = {
    birthWeight?: true
    birthHeight?: true
    birthHeadCircumference?: true
  }

  export type BabyMinAggregateInputType = {
    id?: true
    name?: true
    birthDate?: true
    birthTime?: true
    gender?: true
    birthWeight?: true
    birthHeight?: true
    birthHeadCircumference?: true
    bloodType?: true
    allergies?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BabyMaxAggregateInputType = {
    id?: true
    name?: true
    birthDate?: true
    birthTime?: true
    gender?: true
    birthWeight?: true
    birthHeight?: true
    birthHeadCircumference?: true
    bloodType?: true
    allergies?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BabyCountAggregateInputType = {
    id?: true
    name?: true
    birthDate?: true
    birthTime?: true
    gender?: true
    birthWeight?: true
    birthHeight?: true
    birthHeadCircumference?: true
    bloodType?: true
    allergies?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BabyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Baby to aggregate.
     */
    where?: BabyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Babies to fetch.
     */
    orderBy?: BabyOrderByWithRelationInput | BabyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BabyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Babies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Babies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Babies
    **/
    _count?: true | BabyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BabyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BabySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BabyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BabyMaxAggregateInputType
  }

  export type GetBabyAggregateType<T extends BabyAggregateArgs> = {
        [P in keyof T & keyof AggregateBaby]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBaby[P]>
      : GetScalarType<T[P], AggregateBaby[P]>
  }




  export type BabyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BabyWhereInput
    orderBy?: BabyOrderByWithAggregationInput | BabyOrderByWithAggregationInput[]
    by: BabyScalarFieldEnum[] | BabyScalarFieldEnum
    having?: BabyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BabyCountAggregateInputType | true
    _avg?: BabyAvgAggregateInputType
    _sum?: BabySumAggregateInputType
    _min?: BabyMinAggregateInputType
    _max?: BabyMaxAggregateInputType
  }

  export type BabyGroupByOutputType = {
    id: string
    name: string
    birthDate: Date
    birthTime: string | null
    gender: string
    birthWeight: number | null
    birthHeight: number | null
    birthHeadCircumference: number | null
    bloodType: string | null
    allergies: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: BabyCountAggregateOutputType | null
    _avg: BabyAvgAggregateOutputType | null
    _sum: BabySumAggregateOutputType | null
    _min: BabyMinAggregateOutputType | null
    _max: BabyMaxAggregateOutputType | null
  }

  type GetBabyGroupByPayload<T extends BabyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BabyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BabyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BabyGroupByOutputType[P]>
            : GetScalarType<T[P], BabyGroupByOutputType[P]>
        }
      >
    >


  export type BabySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthDate?: boolean
    birthTime?: boolean
    gender?: boolean
    birthWeight?: boolean
    birthHeight?: boolean
    birthHeadCircumference?: boolean
    bloodType?: boolean
    allergies?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    growthRecords?: boolean | Baby$growthRecordsArgs<ExtArgs>
    milestones?: boolean | Baby$milestonesArgs<ExtArgs>
    mediaItems?: boolean | Baby$mediaItemsArgs<ExtArgs>
    _count?: boolean | BabyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["baby"]>

  export type BabySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthDate?: boolean
    birthTime?: boolean
    gender?: boolean
    birthWeight?: boolean
    birthHeight?: boolean
    birthHeadCircumference?: boolean
    bloodType?: boolean
    allergies?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["baby"]>

  export type BabySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    birthDate?: boolean
    birthTime?: boolean
    gender?: boolean
    birthWeight?: boolean
    birthHeight?: boolean
    birthHeadCircumference?: boolean
    bloodType?: boolean
    allergies?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["baby"]>

  export type BabySelectScalar = {
    id?: boolean
    name?: boolean
    birthDate?: boolean
    birthTime?: boolean
    gender?: boolean
    birthWeight?: boolean
    birthHeight?: boolean
    birthHeadCircumference?: boolean
    bloodType?: boolean
    allergies?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BabyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "birthDate" | "birthTime" | "gender" | "birthWeight" | "birthHeight" | "birthHeadCircumference" | "bloodType" | "allergies" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["baby"]>
  export type BabyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    growthRecords?: boolean | Baby$growthRecordsArgs<ExtArgs>
    milestones?: boolean | Baby$milestonesArgs<ExtArgs>
    mediaItems?: boolean | Baby$mediaItemsArgs<ExtArgs>
    _count?: boolean | BabyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BabyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BabyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BabyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Baby"
    objects: {
      growthRecords: Prisma.$GrowthRecordPayload<ExtArgs>[]
      milestones: Prisma.$MilestonePayload<ExtArgs>[]
      mediaItems: Prisma.$MediaItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      birthDate: Date
      birthTime: string | null
      gender: string
      birthWeight: number | null
      birthHeight: number | null
      birthHeadCircumference: number | null
      bloodType: string | null
      allergies: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["baby"]>
    composites: {}
  }

  type BabyGetPayload<S extends boolean | null | undefined | BabyDefaultArgs> = $Result.GetResult<Prisma.$BabyPayload, S>

  type BabyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BabyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BabyCountAggregateInputType | true
    }

  export interface BabyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Baby'], meta: { name: 'Baby' } }
    /**
     * Find zero or one Baby that matches the filter.
     * @param {BabyFindUniqueArgs} args - Arguments to find a Baby
     * @example
     * // Get one Baby
     * const baby = await prisma.baby.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BabyFindUniqueArgs>(args: SelectSubset<T, BabyFindUniqueArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Baby that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BabyFindUniqueOrThrowArgs} args - Arguments to find a Baby
     * @example
     * // Get one Baby
     * const baby = await prisma.baby.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BabyFindUniqueOrThrowArgs>(args: SelectSubset<T, BabyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Baby that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BabyFindFirstArgs} args - Arguments to find a Baby
     * @example
     * // Get one Baby
     * const baby = await prisma.baby.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BabyFindFirstArgs>(args?: SelectSubset<T, BabyFindFirstArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Baby that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BabyFindFirstOrThrowArgs} args - Arguments to find a Baby
     * @example
     * // Get one Baby
     * const baby = await prisma.baby.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BabyFindFirstOrThrowArgs>(args?: SelectSubset<T, BabyFindFirstOrThrowArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Babies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BabyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Babies
     * const babies = await prisma.baby.findMany()
     * 
     * // Get first 10 Babies
     * const babies = await prisma.baby.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const babyWithIdOnly = await prisma.baby.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BabyFindManyArgs>(args?: SelectSubset<T, BabyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Baby.
     * @param {BabyCreateArgs} args - Arguments to create a Baby.
     * @example
     * // Create one Baby
     * const Baby = await prisma.baby.create({
     *   data: {
     *     // ... data to create a Baby
     *   }
     * })
     * 
     */
    create<T extends BabyCreateArgs>(args: SelectSubset<T, BabyCreateArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Babies.
     * @param {BabyCreateManyArgs} args - Arguments to create many Babies.
     * @example
     * // Create many Babies
     * const baby = await prisma.baby.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BabyCreateManyArgs>(args?: SelectSubset<T, BabyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Babies and returns the data saved in the database.
     * @param {BabyCreateManyAndReturnArgs} args - Arguments to create many Babies.
     * @example
     * // Create many Babies
     * const baby = await prisma.baby.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Babies and only return the `id`
     * const babyWithIdOnly = await prisma.baby.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BabyCreateManyAndReturnArgs>(args?: SelectSubset<T, BabyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Baby.
     * @param {BabyDeleteArgs} args - Arguments to delete one Baby.
     * @example
     * // Delete one Baby
     * const Baby = await prisma.baby.delete({
     *   where: {
     *     // ... filter to delete one Baby
     *   }
     * })
     * 
     */
    delete<T extends BabyDeleteArgs>(args: SelectSubset<T, BabyDeleteArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Baby.
     * @param {BabyUpdateArgs} args - Arguments to update one Baby.
     * @example
     * // Update one Baby
     * const baby = await prisma.baby.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BabyUpdateArgs>(args: SelectSubset<T, BabyUpdateArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Babies.
     * @param {BabyDeleteManyArgs} args - Arguments to filter Babies to delete.
     * @example
     * // Delete a few Babies
     * const { count } = await prisma.baby.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BabyDeleteManyArgs>(args?: SelectSubset<T, BabyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Babies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BabyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Babies
     * const baby = await prisma.baby.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BabyUpdateManyArgs>(args: SelectSubset<T, BabyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Babies and returns the data updated in the database.
     * @param {BabyUpdateManyAndReturnArgs} args - Arguments to update many Babies.
     * @example
     * // Update many Babies
     * const baby = await prisma.baby.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Babies and only return the `id`
     * const babyWithIdOnly = await prisma.baby.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BabyUpdateManyAndReturnArgs>(args: SelectSubset<T, BabyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Baby.
     * @param {BabyUpsertArgs} args - Arguments to update or create a Baby.
     * @example
     * // Update or create a Baby
     * const baby = await prisma.baby.upsert({
     *   create: {
     *     // ... data to create a Baby
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Baby we want to update
     *   }
     * })
     */
    upsert<T extends BabyUpsertArgs>(args: SelectSubset<T, BabyUpsertArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Babies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BabyCountArgs} args - Arguments to filter Babies to count.
     * @example
     * // Count the number of Babies
     * const count = await prisma.baby.count({
     *   where: {
     *     // ... the filter for the Babies we want to count
     *   }
     * })
    **/
    count<T extends BabyCountArgs>(
      args?: Subset<T, BabyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BabyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Baby.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BabyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BabyAggregateArgs>(args: Subset<T, BabyAggregateArgs>): Prisma.PrismaPromise<GetBabyAggregateType<T>>

    /**
     * Group by Baby.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BabyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BabyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BabyGroupByArgs['orderBy'] }
        : { orderBy?: BabyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BabyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBabyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Baby model
   */
  readonly fields: BabyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Baby.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BabyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    growthRecords<T extends Baby$growthRecordsArgs<ExtArgs> = {}>(args?: Subset<T, Baby$growthRecordsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    milestones<T extends Baby$milestonesArgs<ExtArgs> = {}>(args?: Subset<T, Baby$milestonesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    mediaItems<T extends Baby$mediaItemsArgs<ExtArgs> = {}>(args?: Subset<T, Baby$mediaItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Baby model
   */
  interface BabyFieldRefs {
    readonly id: FieldRef<"Baby", 'String'>
    readonly name: FieldRef<"Baby", 'String'>
    readonly birthDate: FieldRef<"Baby", 'DateTime'>
    readonly birthTime: FieldRef<"Baby", 'String'>
    readonly gender: FieldRef<"Baby", 'String'>
    readonly birthWeight: FieldRef<"Baby", 'Float'>
    readonly birthHeight: FieldRef<"Baby", 'Float'>
    readonly birthHeadCircumference: FieldRef<"Baby", 'Float'>
    readonly bloodType: FieldRef<"Baby", 'String'>
    readonly allergies: FieldRef<"Baby", 'String'>
    readonly notes: FieldRef<"Baby", 'String'>
    readonly createdAt: FieldRef<"Baby", 'DateTime'>
    readonly updatedAt: FieldRef<"Baby", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Baby findUnique
   */
  export type BabyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * Filter, which Baby to fetch.
     */
    where: BabyWhereUniqueInput
  }

  /**
   * Baby findUniqueOrThrow
   */
  export type BabyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * Filter, which Baby to fetch.
     */
    where: BabyWhereUniqueInput
  }

  /**
   * Baby findFirst
   */
  export type BabyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * Filter, which Baby to fetch.
     */
    where?: BabyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Babies to fetch.
     */
    orderBy?: BabyOrderByWithRelationInput | BabyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Babies.
     */
    cursor?: BabyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Babies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Babies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Babies.
     */
    distinct?: BabyScalarFieldEnum | BabyScalarFieldEnum[]
  }

  /**
   * Baby findFirstOrThrow
   */
  export type BabyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * Filter, which Baby to fetch.
     */
    where?: BabyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Babies to fetch.
     */
    orderBy?: BabyOrderByWithRelationInput | BabyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Babies.
     */
    cursor?: BabyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Babies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Babies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Babies.
     */
    distinct?: BabyScalarFieldEnum | BabyScalarFieldEnum[]
  }

  /**
   * Baby findMany
   */
  export type BabyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * Filter, which Babies to fetch.
     */
    where?: BabyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Babies to fetch.
     */
    orderBy?: BabyOrderByWithRelationInput | BabyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Babies.
     */
    cursor?: BabyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Babies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Babies.
     */
    skip?: number
    distinct?: BabyScalarFieldEnum | BabyScalarFieldEnum[]
  }

  /**
   * Baby create
   */
  export type BabyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * The data needed to create a Baby.
     */
    data: XOR<BabyCreateInput, BabyUncheckedCreateInput>
  }

  /**
   * Baby createMany
   */
  export type BabyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Babies.
     */
    data: BabyCreateManyInput | BabyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Baby createManyAndReturn
   */
  export type BabyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * The data used to create many Babies.
     */
    data: BabyCreateManyInput | BabyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Baby update
   */
  export type BabyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * The data needed to update a Baby.
     */
    data: XOR<BabyUpdateInput, BabyUncheckedUpdateInput>
    /**
     * Choose, which Baby to update.
     */
    where: BabyWhereUniqueInput
  }

  /**
   * Baby updateMany
   */
  export type BabyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Babies.
     */
    data: XOR<BabyUpdateManyMutationInput, BabyUncheckedUpdateManyInput>
    /**
     * Filter which Babies to update
     */
    where?: BabyWhereInput
    /**
     * Limit how many Babies to update.
     */
    limit?: number
  }

  /**
   * Baby updateManyAndReturn
   */
  export type BabyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * The data used to update Babies.
     */
    data: XOR<BabyUpdateManyMutationInput, BabyUncheckedUpdateManyInput>
    /**
     * Filter which Babies to update
     */
    where?: BabyWhereInput
    /**
     * Limit how many Babies to update.
     */
    limit?: number
  }

  /**
   * Baby upsert
   */
  export type BabyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * The filter to search for the Baby to update in case it exists.
     */
    where: BabyWhereUniqueInput
    /**
     * In case the Baby found by the `where` argument doesn't exist, create a new Baby with this data.
     */
    create: XOR<BabyCreateInput, BabyUncheckedCreateInput>
    /**
     * In case the Baby was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BabyUpdateInput, BabyUncheckedUpdateInput>
  }

  /**
   * Baby delete
   */
  export type BabyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
    /**
     * Filter which Baby to delete.
     */
    where: BabyWhereUniqueInput
  }

  /**
   * Baby deleteMany
   */
  export type BabyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Babies to delete
     */
    where?: BabyWhereInput
    /**
     * Limit how many Babies to delete.
     */
    limit?: number
  }

  /**
   * Baby.growthRecords
   */
  export type Baby$growthRecordsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrowthRecord
     */
    omit?: GrowthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    where?: GrowthRecordWhereInput
    orderBy?: GrowthRecordOrderByWithRelationInput | GrowthRecordOrderByWithRelationInput[]
    cursor?: GrowthRecordWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GrowthRecordScalarFieldEnum | GrowthRecordScalarFieldEnum[]
  }

  /**
   * Baby.milestones
   */
  export type Baby$milestonesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    where?: MilestoneWhereInput
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    cursor?: MilestoneWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Baby.mediaItems
   */
  export type Baby$mediaItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaItem
     */
    select?: MediaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaItem
     */
    omit?: MediaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaItemInclude<ExtArgs> | null
    where?: MediaItemWhereInput
    orderBy?: MediaItemOrderByWithRelationInput | MediaItemOrderByWithRelationInput[]
    cursor?: MediaItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaItemScalarFieldEnum | MediaItemScalarFieldEnum[]
  }

  /**
   * Baby without action
   */
  export type BabyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Baby
     */
    select?: BabySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Baby
     */
    omit?: BabyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BabyInclude<ExtArgs> | null
  }


  /**
   * Model GrowthRecord
   */

  export type AggregateGrowthRecord = {
    _count: GrowthRecordCountAggregateOutputType | null
    _avg: GrowthRecordAvgAggregateOutputType | null
    _sum: GrowthRecordSumAggregateOutputType | null
    _min: GrowthRecordMinAggregateOutputType | null
    _max: GrowthRecordMaxAggregateOutputType | null
  }

  export type GrowthRecordAvgAggregateOutputType = {
    weight: number | null
    height: number | null
    headCircumference: number | null
  }

  export type GrowthRecordSumAggregateOutputType = {
    weight: number | null
    height: number | null
    headCircumference: number | null
  }

  export type GrowthRecordMinAggregateOutputType = {
    id: string | null
    babyId: string | null
    date: Date | null
    weight: number | null
    height: number | null
    headCircumference: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GrowthRecordMaxAggregateOutputType = {
    id: string | null
    babyId: string | null
    date: Date | null
    weight: number | null
    height: number | null
    headCircumference: number | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GrowthRecordCountAggregateOutputType = {
    id: number
    babyId: number
    date: number
    weight: number
    height: number
    headCircumference: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GrowthRecordAvgAggregateInputType = {
    weight?: true
    height?: true
    headCircumference?: true
  }

  export type GrowthRecordSumAggregateInputType = {
    weight?: true
    height?: true
    headCircumference?: true
  }

  export type GrowthRecordMinAggregateInputType = {
    id?: true
    babyId?: true
    date?: true
    weight?: true
    height?: true
    headCircumference?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GrowthRecordMaxAggregateInputType = {
    id?: true
    babyId?: true
    date?: true
    weight?: true
    height?: true
    headCircumference?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GrowthRecordCountAggregateInputType = {
    id?: true
    babyId?: true
    date?: true
    weight?: true
    height?: true
    headCircumference?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GrowthRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GrowthRecord to aggregate.
     */
    where?: GrowthRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrowthRecords to fetch.
     */
    orderBy?: GrowthRecordOrderByWithRelationInput | GrowthRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GrowthRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrowthRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrowthRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GrowthRecords
    **/
    _count?: true | GrowthRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GrowthRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GrowthRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GrowthRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GrowthRecordMaxAggregateInputType
  }

  export type GetGrowthRecordAggregateType<T extends GrowthRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateGrowthRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGrowthRecord[P]>
      : GetScalarType<T[P], AggregateGrowthRecord[P]>
  }




  export type GrowthRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GrowthRecordWhereInput
    orderBy?: GrowthRecordOrderByWithAggregationInput | GrowthRecordOrderByWithAggregationInput[]
    by: GrowthRecordScalarFieldEnum[] | GrowthRecordScalarFieldEnum
    having?: GrowthRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GrowthRecordCountAggregateInputType | true
    _avg?: GrowthRecordAvgAggregateInputType
    _sum?: GrowthRecordSumAggregateInputType
    _min?: GrowthRecordMinAggregateInputType
    _max?: GrowthRecordMaxAggregateInputType
  }

  export type GrowthRecordGroupByOutputType = {
    id: string
    babyId: string
    date: Date
    weight: number | null
    height: number | null
    headCircumference: number | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: GrowthRecordCountAggregateOutputType | null
    _avg: GrowthRecordAvgAggregateOutputType | null
    _sum: GrowthRecordSumAggregateOutputType | null
    _min: GrowthRecordMinAggregateOutputType | null
    _max: GrowthRecordMaxAggregateOutputType | null
  }

  type GetGrowthRecordGroupByPayload<T extends GrowthRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GrowthRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GrowthRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GrowthRecordGroupByOutputType[P]>
            : GetScalarType<T[P], GrowthRecordGroupByOutputType[P]>
        }
      >
    >


  export type GrowthRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    date?: boolean
    weight?: boolean
    height?: boolean
    headCircumference?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["growthRecord"]>

  export type GrowthRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    date?: boolean
    weight?: boolean
    height?: boolean
    headCircumference?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["growthRecord"]>

  export type GrowthRecordSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    date?: boolean
    weight?: boolean
    height?: boolean
    headCircumference?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["growthRecord"]>

  export type GrowthRecordSelectScalar = {
    id?: boolean
    babyId?: boolean
    date?: boolean
    weight?: boolean
    height?: boolean
    headCircumference?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GrowthRecordOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "babyId" | "date" | "weight" | "height" | "headCircumference" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["growthRecord"]>
  export type GrowthRecordInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }
  export type GrowthRecordIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }
  export type GrowthRecordIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }

  export type $GrowthRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GrowthRecord"
    objects: {
      baby: Prisma.$BabyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      babyId: string
      date: Date
      weight: number | null
      height: number | null
      headCircumference: number | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["growthRecord"]>
    composites: {}
  }

  type GrowthRecordGetPayload<S extends boolean | null | undefined | GrowthRecordDefaultArgs> = $Result.GetResult<Prisma.$GrowthRecordPayload, S>

  type GrowthRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GrowthRecordFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GrowthRecordCountAggregateInputType | true
    }

  export interface GrowthRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GrowthRecord'], meta: { name: 'GrowthRecord' } }
    /**
     * Find zero or one GrowthRecord that matches the filter.
     * @param {GrowthRecordFindUniqueArgs} args - Arguments to find a GrowthRecord
     * @example
     * // Get one GrowthRecord
     * const growthRecord = await prisma.growthRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GrowthRecordFindUniqueArgs>(args: SelectSubset<T, GrowthRecordFindUniqueArgs<ExtArgs>>): Prisma__GrowthRecordClient<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GrowthRecord that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GrowthRecordFindUniqueOrThrowArgs} args - Arguments to find a GrowthRecord
     * @example
     * // Get one GrowthRecord
     * const growthRecord = await prisma.growthRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GrowthRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, GrowthRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GrowthRecordClient<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GrowthRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrowthRecordFindFirstArgs} args - Arguments to find a GrowthRecord
     * @example
     * // Get one GrowthRecord
     * const growthRecord = await prisma.growthRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GrowthRecordFindFirstArgs>(args?: SelectSubset<T, GrowthRecordFindFirstArgs<ExtArgs>>): Prisma__GrowthRecordClient<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GrowthRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrowthRecordFindFirstOrThrowArgs} args - Arguments to find a GrowthRecord
     * @example
     * // Get one GrowthRecord
     * const growthRecord = await prisma.growthRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GrowthRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, GrowthRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__GrowthRecordClient<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GrowthRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrowthRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GrowthRecords
     * const growthRecords = await prisma.growthRecord.findMany()
     * 
     * // Get first 10 GrowthRecords
     * const growthRecords = await prisma.growthRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const growthRecordWithIdOnly = await prisma.growthRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GrowthRecordFindManyArgs>(args?: SelectSubset<T, GrowthRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GrowthRecord.
     * @param {GrowthRecordCreateArgs} args - Arguments to create a GrowthRecord.
     * @example
     * // Create one GrowthRecord
     * const GrowthRecord = await prisma.growthRecord.create({
     *   data: {
     *     // ... data to create a GrowthRecord
     *   }
     * })
     * 
     */
    create<T extends GrowthRecordCreateArgs>(args: SelectSubset<T, GrowthRecordCreateArgs<ExtArgs>>): Prisma__GrowthRecordClient<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GrowthRecords.
     * @param {GrowthRecordCreateManyArgs} args - Arguments to create many GrowthRecords.
     * @example
     * // Create many GrowthRecords
     * const growthRecord = await prisma.growthRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GrowthRecordCreateManyArgs>(args?: SelectSubset<T, GrowthRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GrowthRecords and returns the data saved in the database.
     * @param {GrowthRecordCreateManyAndReturnArgs} args - Arguments to create many GrowthRecords.
     * @example
     * // Create many GrowthRecords
     * const growthRecord = await prisma.growthRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GrowthRecords and only return the `id`
     * const growthRecordWithIdOnly = await prisma.growthRecord.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GrowthRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, GrowthRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GrowthRecord.
     * @param {GrowthRecordDeleteArgs} args - Arguments to delete one GrowthRecord.
     * @example
     * // Delete one GrowthRecord
     * const GrowthRecord = await prisma.growthRecord.delete({
     *   where: {
     *     // ... filter to delete one GrowthRecord
     *   }
     * })
     * 
     */
    delete<T extends GrowthRecordDeleteArgs>(args: SelectSubset<T, GrowthRecordDeleteArgs<ExtArgs>>): Prisma__GrowthRecordClient<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GrowthRecord.
     * @param {GrowthRecordUpdateArgs} args - Arguments to update one GrowthRecord.
     * @example
     * // Update one GrowthRecord
     * const growthRecord = await prisma.growthRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GrowthRecordUpdateArgs>(args: SelectSubset<T, GrowthRecordUpdateArgs<ExtArgs>>): Prisma__GrowthRecordClient<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GrowthRecords.
     * @param {GrowthRecordDeleteManyArgs} args - Arguments to filter GrowthRecords to delete.
     * @example
     * // Delete a few GrowthRecords
     * const { count } = await prisma.growthRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GrowthRecordDeleteManyArgs>(args?: SelectSubset<T, GrowthRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GrowthRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrowthRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GrowthRecords
     * const growthRecord = await prisma.growthRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GrowthRecordUpdateManyArgs>(args: SelectSubset<T, GrowthRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GrowthRecords and returns the data updated in the database.
     * @param {GrowthRecordUpdateManyAndReturnArgs} args - Arguments to update many GrowthRecords.
     * @example
     * // Update many GrowthRecords
     * const growthRecord = await prisma.growthRecord.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GrowthRecords and only return the `id`
     * const growthRecordWithIdOnly = await prisma.growthRecord.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GrowthRecordUpdateManyAndReturnArgs>(args: SelectSubset<T, GrowthRecordUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GrowthRecord.
     * @param {GrowthRecordUpsertArgs} args - Arguments to update or create a GrowthRecord.
     * @example
     * // Update or create a GrowthRecord
     * const growthRecord = await prisma.growthRecord.upsert({
     *   create: {
     *     // ... data to create a GrowthRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GrowthRecord we want to update
     *   }
     * })
     */
    upsert<T extends GrowthRecordUpsertArgs>(args: SelectSubset<T, GrowthRecordUpsertArgs<ExtArgs>>): Prisma__GrowthRecordClient<$Result.GetResult<Prisma.$GrowthRecordPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GrowthRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrowthRecordCountArgs} args - Arguments to filter GrowthRecords to count.
     * @example
     * // Count the number of GrowthRecords
     * const count = await prisma.growthRecord.count({
     *   where: {
     *     // ... the filter for the GrowthRecords we want to count
     *   }
     * })
    **/
    count<T extends GrowthRecordCountArgs>(
      args?: Subset<T, GrowthRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GrowthRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GrowthRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrowthRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GrowthRecordAggregateArgs>(args: Subset<T, GrowthRecordAggregateArgs>): Prisma.PrismaPromise<GetGrowthRecordAggregateType<T>>

    /**
     * Group by GrowthRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GrowthRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GrowthRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GrowthRecordGroupByArgs['orderBy'] }
        : { orderBy?: GrowthRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GrowthRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGrowthRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GrowthRecord model
   */
  readonly fields: GrowthRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GrowthRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GrowthRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    baby<T extends BabyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BabyDefaultArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GrowthRecord model
   */
  interface GrowthRecordFieldRefs {
    readonly id: FieldRef<"GrowthRecord", 'String'>
    readonly babyId: FieldRef<"GrowthRecord", 'String'>
    readonly date: FieldRef<"GrowthRecord", 'DateTime'>
    readonly weight: FieldRef<"GrowthRecord", 'Float'>
    readonly height: FieldRef<"GrowthRecord", 'Float'>
    readonly headCircumference: FieldRef<"GrowthRecord", 'Float'>
    readonly notes: FieldRef<"GrowthRecord", 'String'>
    readonly createdAt: FieldRef<"GrowthRecord", 'DateTime'>
    readonly updatedAt: FieldRef<"GrowthRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GrowthRecord findUnique
   */
  export type GrowthRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrowthRecord
     */
    omit?: GrowthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * Filter, which GrowthRecord to fetch.
     */
    where: GrowthRecordWhereUniqueInput
  }

  /**
   * GrowthRecord findUniqueOrThrow
   */
  export type GrowthRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrowthRecord
     */
    omit?: GrowthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * Filter, which GrowthRecord to fetch.
     */
    where: GrowthRecordWhereUniqueInput
  }

  /**
   * GrowthRecord findFirst
   */
  export type GrowthRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrowthRecord
     */
    omit?: GrowthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * Filter, which GrowthRecord to fetch.
     */
    where?: GrowthRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrowthRecords to fetch.
     */
    orderBy?: GrowthRecordOrderByWithRelationInput | GrowthRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GrowthRecords.
     */
    cursor?: GrowthRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrowthRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrowthRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GrowthRecords.
     */
    distinct?: GrowthRecordScalarFieldEnum | GrowthRecordScalarFieldEnum[]
  }

  /**
   * GrowthRecord findFirstOrThrow
   */
  export type GrowthRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrowthRecord
     */
    omit?: GrowthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * Filter, which GrowthRecord to fetch.
     */
    where?: GrowthRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrowthRecords to fetch.
     */
    orderBy?: GrowthRecordOrderByWithRelationInput | GrowthRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GrowthRecords.
     */
    cursor?: GrowthRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrowthRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrowthRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GrowthRecords.
     */
    distinct?: GrowthRecordScalarFieldEnum | GrowthRecordScalarFieldEnum[]
  }

  /**
   * GrowthRecord findMany
   */
  export type GrowthRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrowthRecord
     */
    omit?: GrowthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * Filter, which GrowthRecords to fetch.
     */
    where?: GrowthRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GrowthRecords to fetch.
     */
    orderBy?: GrowthRecordOrderByWithRelationInput | GrowthRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GrowthRecords.
     */
    cursor?: GrowthRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GrowthRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GrowthRecords.
     */
    skip?: number
    distinct?: GrowthRecordScalarFieldEnum | GrowthRecordScalarFieldEnum[]
  }

  /**
   * GrowthRecord create
   */
  export type GrowthRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrowthRecord
     */
    omit?: GrowthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * The data needed to create a GrowthRecord.
     */
    data: XOR<GrowthRecordCreateInput, GrowthRecordUncheckedCreateInput>
  }

  /**
   * GrowthRecord createMany
   */
  export type GrowthRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GrowthRecords.
     */
    data: GrowthRecordCreateManyInput | GrowthRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GrowthRecord createManyAndReturn
   */
  export type GrowthRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GrowthRecord
     */
    omit?: GrowthRecordOmit<ExtArgs> | null
    /**
     * The data used to create many GrowthRecords.
     */
    data: GrowthRecordCreateManyInput | GrowthRecordCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GrowthRecord update
   */
  export type GrowthRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrowthRecord
     */
    omit?: GrowthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * The data needed to update a GrowthRecord.
     */
    data: XOR<GrowthRecordUpdateInput, GrowthRecordUncheckedUpdateInput>
    /**
     * Choose, which GrowthRecord to update.
     */
    where: GrowthRecordWhereUniqueInput
  }

  /**
   * GrowthRecord updateMany
   */
  export type GrowthRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GrowthRecords.
     */
    data: XOR<GrowthRecordUpdateManyMutationInput, GrowthRecordUncheckedUpdateManyInput>
    /**
     * Filter which GrowthRecords to update
     */
    where?: GrowthRecordWhereInput
    /**
     * Limit how many GrowthRecords to update.
     */
    limit?: number
  }

  /**
   * GrowthRecord updateManyAndReturn
   */
  export type GrowthRecordUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GrowthRecord
     */
    omit?: GrowthRecordOmit<ExtArgs> | null
    /**
     * The data used to update GrowthRecords.
     */
    data: XOR<GrowthRecordUpdateManyMutationInput, GrowthRecordUncheckedUpdateManyInput>
    /**
     * Filter which GrowthRecords to update
     */
    where?: GrowthRecordWhereInput
    /**
     * Limit how many GrowthRecords to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GrowthRecord upsert
   */
  export type GrowthRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrowthRecord
     */
    omit?: GrowthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * The filter to search for the GrowthRecord to update in case it exists.
     */
    where: GrowthRecordWhereUniqueInput
    /**
     * In case the GrowthRecord found by the `where` argument doesn't exist, create a new GrowthRecord with this data.
     */
    create: XOR<GrowthRecordCreateInput, GrowthRecordUncheckedCreateInput>
    /**
     * In case the GrowthRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GrowthRecordUpdateInput, GrowthRecordUncheckedUpdateInput>
  }

  /**
   * GrowthRecord delete
   */
  export type GrowthRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrowthRecord
     */
    omit?: GrowthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
    /**
     * Filter which GrowthRecord to delete.
     */
    where: GrowthRecordWhereUniqueInput
  }

  /**
   * GrowthRecord deleteMany
   */
  export type GrowthRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GrowthRecords to delete
     */
    where?: GrowthRecordWhereInput
    /**
     * Limit how many GrowthRecords to delete.
     */
    limit?: number
  }

  /**
   * GrowthRecord without action
   */
  export type GrowthRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GrowthRecord
     */
    select?: GrowthRecordSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GrowthRecord
     */
    omit?: GrowthRecordOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GrowthRecordInclude<ExtArgs> | null
  }


  /**
   * Model Milestone
   */

  export type AggregateMilestone = {
    _count: MilestoneCountAggregateOutputType | null
    _min: MilestoneMinAggregateOutputType | null
    _max: MilestoneMaxAggregateOutputType | null
  }

  export type MilestoneMinAggregateOutputType = {
    id: string | null
    babyId: string | null
    date: Date | null
    title: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MilestoneMaxAggregateOutputType = {
    id: string | null
    babyId: string | null
    date: Date | null
    title: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MilestoneCountAggregateOutputType = {
    id: number
    babyId: number
    date: number
    title: number
    description: number
    tags: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MilestoneMinAggregateInputType = {
    id?: true
    babyId?: true
    date?: true
    title?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MilestoneMaxAggregateInputType = {
    id?: true
    babyId?: true
    date?: true
    title?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MilestoneCountAggregateInputType = {
    id?: true
    babyId?: true
    date?: true
    title?: true
    description?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MilestoneAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Milestone to aggregate.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Milestones
    **/
    _count?: true | MilestoneCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MilestoneMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MilestoneMaxAggregateInputType
  }

  export type GetMilestoneAggregateType<T extends MilestoneAggregateArgs> = {
        [P in keyof T & keyof AggregateMilestone]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMilestone[P]>
      : GetScalarType<T[P], AggregateMilestone[P]>
  }




  export type MilestoneGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MilestoneWhereInput
    orderBy?: MilestoneOrderByWithAggregationInput | MilestoneOrderByWithAggregationInput[]
    by: MilestoneScalarFieldEnum[] | MilestoneScalarFieldEnum
    having?: MilestoneScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MilestoneCountAggregateInputType | true
    _min?: MilestoneMinAggregateInputType
    _max?: MilestoneMaxAggregateInputType
  }

  export type MilestoneGroupByOutputType = {
    id: string
    babyId: string
    date: Date
    title: string
    description: string
    tags: string[]
    createdAt: Date
    updatedAt: Date
    _count: MilestoneCountAggregateOutputType | null
    _min: MilestoneMinAggregateOutputType | null
    _max: MilestoneMaxAggregateOutputType | null
  }

  type GetMilestoneGroupByPayload<T extends MilestoneGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MilestoneGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MilestoneGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MilestoneGroupByOutputType[P]>
            : GetScalarType<T[P], MilestoneGroupByOutputType[P]>
        }
      >
    >


  export type MilestoneSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    date?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["milestone"]>

  export type MilestoneSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    date?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["milestone"]>

  export type MilestoneSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    date?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["milestone"]>

  export type MilestoneSelectScalar = {
    id?: boolean
    babyId?: boolean
    date?: boolean
    title?: boolean
    description?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MilestoneOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "babyId" | "date" | "title" | "description" | "tags" | "createdAt" | "updatedAt", ExtArgs["result"]["milestone"]>
  export type MilestoneInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }
  export type MilestoneIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }
  export type MilestoneIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }

  export type $MilestonePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Milestone"
    objects: {
      baby: Prisma.$BabyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      babyId: string
      date: Date
      title: string
      description: string
      tags: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["milestone"]>
    composites: {}
  }

  type MilestoneGetPayload<S extends boolean | null | undefined | MilestoneDefaultArgs> = $Result.GetResult<Prisma.$MilestonePayload, S>

  type MilestoneCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MilestoneFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MilestoneCountAggregateInputType | true
    }

  export interface MilestoneDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Milestone'], meta: { name: 'Milestone' } }
    /**
     * Find zero or one Milestone that matches the filter.
     * @param {MilestoneFindUniqueArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MilestoneFindUniqueArgs>(args: SelectSubset<T, MilestoneFindUniqueArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Milestone that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MilestoneFindUniqueOrThrowArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MilestoneFindUniqueOrThrowArgs>(args: SelectSubset<T, MilestoneFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Milestone that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneFindFirstArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MilestoneFindFirstArgs>(args?: SelectSubset<T, MilestoneFindFirstArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Milestone that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneFindFirstOrThrowArgs} args - Arguments to find a Milestone
     * @example
     * // Get one Milestone
     * const milestone = await prisma.milestone.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MilestoneFindFirstOrThrowArgs>(args?: SelectSubset<T, MilestoneFindFirstOrThrowArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Milestones that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Milestones
     * const milestones = await prisma.milestone.findMany()
     * 
     * // Get first 10 Milestones
     * const milestones = await prisma.milestone.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const milestoneWithIdOnly = await prisma.milestone.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MilestoneFindManyArgs>(args?: SelectSubset<T, MilestoneFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Milestone.
     * @param {MilestoneCreateArgs} args - Arguments to create a Milestone.
     * @example
     * // Create one Milestone
     * const Milestone = await prisma.milestone.create({
     *   data: {
     *     // ... data to create a Milestone
     *   }
     * })
     * 
     */
    create<T extends MilestoneCreateArgs>(args: SelectSubset<T, MilestoneCreateArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Milestones.
     * @param {MilestoneCreateManyArgs} args - Arguments to create many Milestones.
     * @example
     * // Create many Milestones
     * const milestone = await prisma.milestone.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MilestoneCreateManyArgs>(args?: SelectSubset<T, MilestoneCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Milestones and returns the data saved in the database.
     * @param {MilestoneCreateManyAndReturnArgs} args - Arguments to create many Milestones.
     * @example
     * // Create many Milestones
     * const milestone = await prisma.milestone.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Milestones and only return the `id`
     * const milestoneWithIdOnly = await prisma.milestone.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MilestoneCreateManyAndReturnArgs>(args?: SelectSubset<T, MilestoneCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Milestone.
     * @param {MilestoneDeleteArgs} args - Arguments to delete one Milestone.
     * @example
     * // Delete one Milestone
     * const Milestone = await prisma.milestone.delete({
     *   where: {
     *     // ... filter to delete one Milestone
     *   }
     * })
     * 
     */
    delete<T extends MilestoneDeleteArgs>(args: SelectSubset<T, MilestoneDeleteArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Milestone.
     * @param {MilestoneUpdateArgs} args - Arguments to update one Milestone.
     * @example
     * // Update one Milestone
     * const milestone = await prisma.milestone.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MilestoneUpdateArgs>(args: SelectSubset<T, MilestoneUpdateArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Milestones.
     * @param {MilestoneDeleteManyArgs} args - Arguments to filter Milestones to delete.
     * @example
     * // Delete a few Milestones
     * const { count } = await prisma.milestone.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MilestoneDeleteManyArgs>(args?: SelectSubset<T, MilestoneDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Milestones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Milestones
     * const milestone = await prisma.milestone.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MilestoneUpdateManyArgs>(args: SelectSubset<T, MilestoneUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Milestones and returns the data updated in the database.
     * @param {MilestoneUpdateManyAndReturnArgs} args - Arguments to update many Milestones.
     * @example
     * // Update many Milestones
     * const milestone = await prisma.milestone.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Milestones and only return the `id`
     * const milestoneWithIdOnly = await prisma.milestone.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MilestoneUpdateManyAndReturnArgs>(args: SelectSubset<T, MilestoneUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Milestone.
     * @param {MilestoneUpsertArgs} args - Arguments to update or create a Milestone.
     * @example
     * // Update or create a Milestone
     * const milestone = await prisma.milestone.upsert({
     *   create: {
     *     // ... data to create a Milestone
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Milestone we want to update
     *   }
     * })
     */
    upsert<T extends MilestoneUpsertArgs>(args: SelectSubset<T, MilestoneUpsertArgs<ExtArgs>>): Prisma__MilestoneClient<$Result.GetResult<Prisma.$MilestonePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Milestones.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneCountArgs} args - Arguments to filter Milestones to count.
     * @example
     * // Count the number of Milestones
     * const count = await prisma.milestone.count({
     *   where: {
     *     // ... the filter for the Milestones we want to count
     *   }
     * })
    **/
    count<T extends MilestoneCountArgs>(
      args?: Subset<T, MilestoneCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MilestoneCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Milestone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MilestoneAggregateArgs>(args: Subset<T, MilestoneAggregateArgs>): Prisma.PrismaPromise<GetMilestoneAggregateType<T>>

    /**
     * Group by Milestone.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MilestoneGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MilestoneGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MilestoneGroupByArgs['orderBy'] }
        : { orderBy?: MilestoneGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MilestoneGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMilestoneGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Milestone model
   */
  readonly fields: MilestoneFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Milestone.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MilestoneClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    baby<T extends BabyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BabyDefaultArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Milestone model
   */
  interface MilestoneFieldRefs {
    readonly id: FieldRef<"Milestone", 'String'>
    readonly babyId: FieldRef<"Milestone", 'String'>
    readonly date: FieldRef<"Milestone", 'DateTime'>
    readonly title: FieldRef<"Milestone", 'String'>
    readonly description: FieldRef<"Milestone", 'String'>
    readonly tags: FieldRef<"Milestone", 'String[]'>
    readonly createdAt: FieldRef<"Milestone", 'DateTime'>
    readonly updatedAt: FieldRef<"Milestone", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Milestone findUnique
   */
  export type MilestoneFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone findUniqueOrThrow
   */
  export type MilestoneFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone findFirst
   */
  export type MilestoneFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Milestones.
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Milestones.
     */
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Milestone findFirstOrThrow
   */
  export type MilestoneFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestone to fetch.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Milestones.
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Milestones.
     */
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Milestone findMany
   */
  export type MilestoneFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter, which Milestones to fetch.
     */
    where?: MilestoneWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Milestones to fetch.
     */
    orderBy?: MilestoneOrderByWithRelationInput | MilestoneOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Milestones.
     */
    cursor?: MilestoneWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Milestones from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Milestones.
     */
    skip?: number
    distinct?: MilestoneScalarFieldEnum | MilestoneScalarFieldEnum[]
  }

  /**
   * Milestone create
   */
  export type MilestoneCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * The data needed to create a Milestone.
     */
    data: XOR<MilestoneCreateInput, MilestoneUncheckedCreateInput>
  }

  /**
   * Milestone createMany
   */
  export type MilestoneCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Milestones.
     */
    data: MilestoneCreateManyInput | MilestoneCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Milestone createManyAndReturn
   */
  export type MilestoneCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * The data used to create many Milestones.
     */
    data: MilestoneCreateManyInput | MilestoneCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Milestone update
   */
  export type MilestoneUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * The data needed to update a Milestone.
     */
    data: XOR<MilestoneUpdateInput, MilestoneUncheckedUpdateInput>
    /**
     * Choose, which Milestone to update.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone updateMany
   */
  export type MilestoneUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Milestones.
     */
    data: XOR<MilestoneUpdateManyMutationInput, MilestoneUncheckedUpdateManyInput>
    /**
     * Filter which Milestones to update
     */
    where?: MilestoneWhereInput
    /**
     * Limit how many Milestones to update.
     */
    limit?: number
  }

  /**
   * Milestone updateManyAndReturn
   */
  export type MilestoneUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * The data used to update Milestones.
     */
    data: XOR<MilestoneUpdateManyMutationInput, MilestoneUncheckedUpdateManyInput>
    /**
     * Filter which Milestones to update
     */
    where?: MilestoneWhereInput
    /**
     * Limit how many Milestones to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Milestone upsert
   */
  export type MilestoneUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * The filter to search for the Milestone to update in case it exists.
     */
    where: MilestoneWhereUniqueInput
    /**
     * In case the Milestone found by the `where` argument doesn't exist, create a new Milestone with this data.
     */
    create: XOR<MilestoneCreateInput, MilestoneUncheckedCreateInput>
    /**
     * In case the Milestone was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MilestoneUpdateInput, MilestoneUncheckedUpdateInput>
  }

  /**
   * Milestone delete
   */
  export type MilestoneDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
    /**
     * Filter which Milestone to delete.
     */
    where: MilestoneWhereUniqueInput
  }

  /**
   * Milestone deleteMany
   */
  export type MilestoneDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Milestones to delete
     */
    where?: MilestoneWhereInput
    /**
     * Limit how many Milestones to delete.
     */
    limit?: number
  }

  /**
   * Milestone without action
   */
  export type MilestoneDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Milestone
     */
    select?: MilestoneSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Milestone
     */
    omit?: MilestoneOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MilestoneInclude<ExtArgs> | null
  }


  /**
   * Model MediaItem
   */

  export type AggregateMediaItem = {
    _count: MediaItemCountAggregateOutputType | null
    _avg: MediaItemAvgAggregateOutputType | null
    _sum: MediaItemSumAggregateOutputType | null
    _min: MediaItemMinAggregateOutputType | null
    _max: MediaItemMaxAggregateOutputType | null
  }

  export type MediaItemAvgAggregateOutputType = {
    duration: number | null
  }

  export type MediaItemSumAggregateOutputType = {
    duration: number | null
  }

  export type MediaItemMinAggregateOutputType = {
    id: string | null
    babyId: string | null
    date: Date | null
    title: string | null
    description: string | null
    url: string | null
    mediaType: string | null
    format: string | null
    thumbnailUrl: string | null
    duration: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MediaItemMaxAggregateOutputType = {
    id: string | null
    babyId: string | null
    date: Date | null
    title: string | null
    description: string | null
    url: string | null
    mediaType: string | null
    format: string | null
    thumbnailUrl: string | null
    duration: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MediaItemCountAggregateOutputType = {
    id: number
    babyId: number
    date: number
    title: number
    description: number
    url: number
    mediaType: number
    format: number
    thumbnailUrl: number
    duration: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MediaItemAvgAggregateInputType = {
    duration?: true
  }

  export type MediaItemSumAggregateInputType = {
    duration?: true
  }

  export type MediaItemMinAggregateInputType = {
    id?: true
    babyId?: true
    date?: true
    title?: true
    description?: true
    url?: true
    mediaType?: true
    format?: true
    thumbnailUrl?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MediaItemMaxAggregateInputType = {
    id?: true
    babyId?: true
    date?: true
    title?: true
    description?: true
    url?: true
    mediaType?: true
    format?: true
    thumbnailUrl?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MediaItemCountAggregateInputType = {
    id?: true
    babyId?: true
    date?: true
    title?: true
    description?: true
    url?: true
    mediaType?: true
    format?: true
    thumbnailUrl?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MediaItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaItem to aggregate.
     */
    where?: MediaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaItems to fetch.
     */
    orderBy?: MediaItemOrderByWithRelationInput | MediaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MediaItems
    **/
    _count?: true | MediaItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MediaItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MediaItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaItemMaxAggregateInputType
  }

  export type GetMediaItemAggregateType<T extends MediaItemAggregateArgs> = {
        [P in keyof T & keyof AggregateMediaItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMediaItem[P]>
      : GetScalarType<T[P], AggregateMediaItem[P]>
  }




  export type MediaItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaItemWhereInput
    orderBy?: MediaItemOrderByWithAggregationInput | MediaItemOrderByWithAggregationInput[]
    by: MediaItemScalarFieldEnum[] | MediaItemScalarFieldEnum
    having?: MediaItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaItemCountAggregateInputType | true
    _avg?: MediaItemAvgAggregateInputType
    _sum?: MediaItemSumAggregateInputType
    _min?: MediaItemMinAggregateInputType
    _max?: MediaItemMaxAggregateInputType
  }

  export type MediaItemGroupByOutputType = {
    id: string
    babyId: string
    date: Date
    title: string
    description: string | null
    url: string
    mediaType: string
    format: string | null
    thumbnailUrl: string | null
    duration: number | null
    createdAt: Date
    updatedAt: Date
    _count: MediaItemCountAggregateOutputType | null
    _avg: MediaItemAvgAggregateOutputType | null
    _sum: MediaItemSumAggregateOutputType | null
    _min: MediaItemMinAggregateOutputType | null
    _max: MediaItemMaxAggregateOutputType | null
  }

  type GetMediaItemGroupByPayload<T extends MediaItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaItemGroupByOutputType[P]>
            : GetScalarType<T[P], MediaItemGroupByOutputType[P]>
        }
      >
    >


  export type MediaItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    date?: boolean
    title?: boolean
    description?: boolean
    url?: boolean
    mediaType?: boolean
    format?: boolean
    thumbnailUrl?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mediaItem"]>

  export type MediaItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    date?: boolean
    title?: boolean
    description?: boolean
    url?: boolean
    mediaType?: boolean
    format?: boolean
    thumbnailUrl?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mediaItem"]>

  export type MediaItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    babyId?: boolean
    date?: boolean
    title?: boolean
    description?: boolean
    url?: boolean
    mediaType?: boolean
    format?: boolean
    thumbnailUrl?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mediaItem"]>

  export type MediaItemSelectScalar = {
    id?: boolean
    babyId?: boolean
    date?: boolean
    title?: boolean
    description?: boolean
    url?: boolean
    mediaType?: boolean
    format?: boolean
    thumbnailUrl?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MediaItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "babyId" | "date" | "title" | "description" | "url" | "mediaType" | "format" | "thumbnailUrl" | "duration" | "createdAt" | "updatedAt", ExtArgs["result"]["mediaItem"]>
  export type MediaItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }
  export type MediaItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }
  export type MediaItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    baby?: boolean | BabyDefaultArgs<ExtArgs>
  }

  export type $MediaItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MediaItem"
    objects: {
      baby: Prisma.$BabyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      babyId: string
      date: Date
      title: string
      description: string | null
      url: string
      mediaType: string
      format: string | null
      thumbnailUrl: string | null
      duration: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mediaItem"]>
    composites: {}
  }

  type MediaItemGetPayload<S extends boolean | null | undefined | MediaItemDefaultArgs> = $Result.GetResult<Prisma.$MediaItemPayload, S>

  type MediaItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MediaItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MediaItemCountAggregateInputType | true
    }

  export interface MediaItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MediaItem'], meta: { name: 'MediaItem' } }
    /**
     * Find zero or one MediaItem that matches the filter.
     * @param {MediaItemFindUniqueArgs} args - Arguments to find a MediaItem
     * @example
     * // Get one MediaItem
     * const mediaItem = await prisma.mediaItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaItemFindUniqueArgs>(args: SelectSubset<T, MediaItemFindUniqueArgs<ExtArgs>>): Prisma__MediaItemClient<$Result.GetResult<Prisma.$MediaItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MediaItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MediaItemFindUniqueOrThrowArgs} args - Arguments to find a MediaItem
     * @example
     * // Get one MediaItem
     * const mediaItem = await prisma.mediaItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaItemFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaItemClient<$Result.GetResult<Prisma.$MediaItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaItemFindFirstArgs} args - Arguments to find a MediaItem
     * @example
     * // Get one MediaItem
     * const mediaItem = await prisma.mediaItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaItemFindFirstArgs>(args?: SelectSubset<T, MediaItemFindFirstArgs<ExtArgs>>): Prisma__MediaItemClient<$Result.GetResult<Prisma.$MediaItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaItemFindFirstOrThrowArgs} args - Arguments to find a MediaItem
     * @example
     * // Get one MediaItem
     * const mediaItem = await prisma.mediaItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaItemFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaItemClient<$Result.GetResult<Prisma.$MediaItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MediaItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MediaItems
     * const mediaItems = await prisma.mediaItem.findMany()
     * 
     * // Get first 10 MediaItems
     * const mediaItems = await prisma.mediaItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaItemWithIdOnly = await prisma.mediaItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaItemFindManyArgs>(args?: SelectSubset<T, MediaItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MediaItem.
     * @param {MediaItemCreateArgs} args - Arguments to create a MediaItem.
     * @example
     * // Create one MediaItem
     * const MediaItem = await prisma.mediaItem.create({
     *   data: {
     *     // ... data to create a MediaItem
     *   }
     * })
     * 
     */
    create<T extends MediaItemCreateArgs>(args: SelectSubset<T, MediaItemCreateArgs<ExtArgs>>): Prisma__MediaItemClient<$Result.GetResult<Prisma.$MediaItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MediaItems.
     * @param {MediaItemCreateManyArgs} args - Arguments to create many MediaItems.
     * @example
     * // Create many MediaItems
     * const mediaItem = await prisma.mediaItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaItemCreateManyArgs>(args?: SelectSubset<T, MediaItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MediaItems and returns the data saved in the database.
     * @param {MediaItemCreateManyAndReturnArgs} args - Arguments to create many MediaItems.
     * @example
     * // Create many MediaItems
     * const mediaItem = await prisma.mediaItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MediaItems and only return the `id`
     * const mediaItemWithIdOnly = await prisma.mediaItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MediaItemCreateManyAndReturnArgs>(args?: SelectSubset<T, MediaItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MediaItem.
     * @param {MediaItemDeleteArgs} args - Arguments to delete one MediaItem.
     * @example
     * // Delete one MediaItem
     * const MediaItem = await prisma.mediaItem.delete({
     *   where: {
     *     // ... filter to delete one MediaItem
     *   }
     * })
     * 
     */
    delete<T extends MediaItemDeleteArgs>(args: SelectSubset<T, MediaItemDeleteArgs<ExtArgs>>): Prisma__MediaItemClient<$Result.GetResult<Prisma.$MediaItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MediaItem.
     * @param {MediaItemUpdateArgs} args - Arguments to update one MediaItem.
     * @example
     * // Update one MediaItem
     * const mediaItem = await prisma.mediaItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaItemUpdateArgs>(args: SelectSubset<T, MediaItemUpdateArgs<ExtArgs>>): Prisma__MediaItemClient<$Result.GetResult<Prisma.$MediaItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MediaItems.
     * @param {MediaItemDeleteManyArgs} args - Arguments to filter MediaItems to delete.
     * @example
     * // Delete a few MediaItems
     * const { count } = await prisma.mediaItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaItemDeleteManyArgs>(args?: SelectSubset<T, MediaItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MediaItems
     * const mediaItem = await prisma.mediaItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaItemUpdateManyArgs>(args: SelectSubset<T, MediaItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaItems and returns the data updated in the database.
     * @param {MediaItemUpdateManyAndReturnArgs} args - Arguments to update many MediaItems.
     * @example
     * // Update many MediaItems
     * const mediaItem = await prisma.mediaItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MediaItems and only return the `id`
     * const mediaItemWithIdOnly = await prisma.mediaItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MediaItemUpdateManyAndReturnArgs>(args: SelectSubset<T, MediaItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MediaItem.
     * @param {MediaItemUpsertArgs} args - Arguments to update or create a MediaItem.
     * @example
     * // Update or create a MediaItem
     * const mediaItem = await prisma.mediaItem.upsert({
     *   create: {
     *     // ... data to create a MediaItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MediaItem we want to update
     *   }
     * })
     */
    upsert<T extends MediaItemUpsertArgs>(args: SelectSubset<T, MediaItemUpsertArgs<ExtArgs>>): Prisma__MediaItemClient<$Result.GetResult<Prisma.$MediaItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MediaItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaItemCountArgs} args - Arguments to filter MediaItems to count.
     * @example
     * // Count the number of MediaItems
     * const count = await prisma.mediaItem.count({
     *   where: {
     *     // ... the filter for the MediaItems we want to count
     *   }
     * })
    **/
    count<T extends MediaItemCountArgs>(
      args?: Subset<T, MediaItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MediaItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediaItemAggregateArgs>(args: Subset<T, MediaItemAggregateArgs>): Prisma.PrismaPromise<GetMediaItemAggregateType<T>>

    /**
     * Group by MediaItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MediaItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaItemGroupByArgs['orderBy'] }
        : { orderBy?: MediaItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MediaItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MediaItem model
   */
  readonly fields: MediaItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MediaItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    baby<T extends BabyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BabyDefaultArgs<ExtArgs>>): Prisma__BabyClient<$Result.GetResult<Prisma.$BabyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MediaItem model
   */
  interface MediaItemFieldRefs {
    readonly id: FieldRef<"MediaItem", 'String'>
    readonly babyId: FieldRef<"MediaItem", 'String'>
    readonly date: FieldRef<"MediaItem", 'DateTime'>
    readonly title: FieldRef<"MediaItem", 'String'>
    readonly description: FieldRef<"MediaItem", 'String'>
    readonly url: FieldRef<"MediaItem", 'String'>
    readonly mediaType: FieldRef<"MediaItem", 'String'>
    readonly format: FieldRef<"MediaItem", 'String'>
    readonly thumbnailUrl: FieldRef<"MediaItem", 'String'>
    readonly duration: FieldRef<"MediaItem", 'Int'>
    readonly createdAt: FieldRef<"MediaItem", 'DateTime'>
    readonly updatedAt: FieldRef<"MediaItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MediaItem findUnique
   */
  export type MediaItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaItem
     */
    select?: MediaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaItem
     */
    omit?: MediaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaItemInclude<ExtArgs> | null
    /**
     * Filter, which MediaItem to fetch.
     */
    where: MediaItemWhereUniqueInput
  }

  /**
   * MediaItem findUniqueOrThrow
   */
  export type MediaItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaItem
     */
    select?: MediaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaItem
     */
    omit?: MediaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaItemInclude<ExtArgs> | null
    /**
     * Filter, which MediaItem to fetch.
     */
    where: MediaItemWhereUniqueInput
  }

  /**
   * MediaItem findFirst
   */
  export type MediaItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaItem
     */
    select?: MediaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaItem
     */
    omit?: MediaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaItemInclude<ExtArgs> | null
    /**
     * Filter, which MediaItem to fetch.
     */
    where?: MediaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaItems to fetch.
     */
    orderBy?: MediaItemOrderByWithRelationInput | MediaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaItems.
     */
    cursor?: MediaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaItems.
     */
    distinct?: MediaItemScalarFieldEnum | MediaItemScalarFieldEnum[]
  }

  /**
   * MediaItem findFirstOrThrow
   */
  export type MediaItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaItem
     */
    select?: MediaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaItem
     */
    omit?: MediaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaItemInclude<ExtArgs> | null
    /**
     * Filter, which MediaItem to fetch.
     */
    where?: MediaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaItems to fetch.
     */
    orderBy?: MediaItemOrderByWithRelationInput | MediaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaItems.
     */
    cursor?: MediaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaItems.
     */
    distinct?: MediaItemScalarFieldEnum | MediaItemScalarFieldEnum[]
  }

  /**
   * MediaItem findMany
   */
  export type MediaItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaItem
     */
    select?: MediaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaItem
     */
    omit?: MediaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaItemInclude<ExtArgs> | null
    /**
     * Filter, which MediaItems to fetch.
     */
    where?: MediaItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaItems to fetch.
     */
    orderBy?: MediaItemOrderByWithRelationInput | MediaItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MediaItems.
     */
    cursor?: MediaItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaItems.
     */
    skip?: number
    distinct?: MediaItemScalarFieldEnum | MediaItemScalarFieldEnum[]
  }

  /**
   * MediaItem create
   */
  export type MediaItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaItem
     */
    select?: MediaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaItem
     */
    omit?: MediaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaItemInclude<ExtArgs> | null
    /**
     * The data needed to create a MediaItem.
     */
    data: XOR<MediaItemCreateInput, MediaItemUncheckedCreateInput>
  }

  /**
   * MediaItem createMany
   */
  export type MediaItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MediaItems.
     */
    data: MediaItemCreateManyInput | MediaItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MediaItem createManyAndReturn
   */
  export type MediaItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaItem
     */
    select?: MediaItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaItem
     */
    omit?: MediaItemOmit<ExtArgs> | null
    /**
     * The data used to create many MediaItems.
     */
    data: MediaItemCreateManyInput | MediaItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MediaItem update
   */
  export type MediaItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaItem
     */
    select?: MediaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaItem
     */
    omit?: MediaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaItemInclude<ExtArgs> | null
    /**
     * The data needed to update a MediaItem.
     */
    data: XOR<MediaItemUpdateInput, MediaItemUncheckedUpdateInput>
    /**
     * Choose, which MediaItem to update.
     */
    where: MediaItemWhereUniqueInput
  }

  /**
   * MediaItem updateMany
   */
  export type MediaItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MediaItems.
     */
    data: XOR<MediaItemUpdateManyMutationInput, MediaItemUncheckedUpdateManyInput>
    /**
     * Filter which MediaItems to update
     */
    where?: MediaItemWhereInput
    /**
     * Limit how many MediaItems to update.
     */
    limit?: number
  }

  /**
   * MediaItem updateManyAndReturn
   */
  export type MediaItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaItem
     */
    select?: MediaItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaItem
     */
    omit?: MediaItemOmit<ExtArgs> | null
    /**
     * The data used to update MediaItems.
     */
    data: XOR<MediaItemUpdateManyMutationInput, MediaItemUncheckedUpdateManyInput>
    /**
     * Filter which MediaItems to update
     */
    where?: MediaItemWhereInput
    /**
     * Limit how many MediaItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MediaItem upsert
   */
  export type MediaItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaItem
     */
    select?: MediaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaItem
     */
    omit?: MediaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaItemInclude<ExtArgs> | null
    /**
     * The filter to search for the MediaItem to update in case it exists.
     */
    where: MediaItemWhereUniqueInput
    /**
     * In case the MediaItem found by the `where` argument doesn't exist, create a new MediaItem with this data.
     */
    create: XOR<MediaItemCreateInput, MediaItemUncheckedCreateInput>
    /**
     * In case the MediaItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaItemUpdateInput, MediaItemUncheckedUpdateInput>
  }

  /**
   * MediaItem delete
   */
  export type MediaItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaItem
     */
    select?: MediaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaItem
     */
    omit?: MediaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaItemInclude<ExtArgs> | null
    /**
     * Filter which MediaItem to delete.
     */
    where: MediaItemWhereUniqueInput
  }

  /**
   * MediaItem deleteMany
   */
  export type MediaItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaItems to delete
     */
    where?: MediaItemWhereInput
    /**
     * Limit how many MediaItems to delete.
     */
    limit?: number
  }

  /**
   * MediaItem without action
   */
  export type MediaItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaItem
     */
    select?: MediaItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaItem
     */
    omit?: MediaItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaItemInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BabyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    birthDate: 'birthDate',
    birthTime: 'birthTime',
    gender: 'gender',
    birthWeight: 'birthWeight',
    birthHeight: 'birthHeight',
    birthHeadCircumference: 'birthHeadCircumference',
    bloodType: 'bloodType',
    allergies: 'allergies',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BabyScalarFieldEnum = (typeof BabyScalarFieldEnum)[keyof typeof BabyScalarFieldEnum]


  export const GrowthRecordScalarFieldEnum: {
    id: 'id',
    babyId: 'babyId',
    date: 'date',
    weight: 'weight',
    height: 'height',
    headCircumference: 'headCircumference',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GrowthRecordScalarFieldEnum = (typeof GrowthRecordScalarFieldEnum)[keyof typeof GrowthRecordScalarFieldEnum]


  export const MilestoneScalarFieldEnum: {
    id: 'id',
    babyId: 'babyId',
    date: 'date',
    title: 'title',
    description: 'description',
    tags: 'tags',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MilestoneScalarFieldEnum = (typeof MilestoneScalarFieldEnum)[keyof typeof MilestoneScalarFieldEnum]


  export const MediaItemScalarFieldEnum: {
    id: 'id',
    babyId: 'babyId',
    date: 'date',
    title: 'title',
    description: 'description',
    url: 'url',
    mediaType: 'mediaType',
    format: 'format',
    thumbnailUrl: 'thumbnailUrl',
    duration: 'duration',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MediaItemScalarFieldEnum = (typeof MediaItemScalarFieldEnum)[keyof typeof MediaItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type BabyWhereInput = {
    AND?: BabyWhereInput | BabyWhereInput[]
    OR?: BabyWhereInput[]
    NOT?: BabyWhereInput | BabyWhereInput[]
    id?: StringFilter<"Baby"> | string
    name?: StringFilter<"Baby"> | string
    birthDate?: DateTimeFilter<"Baby"> | Date | string
    birthTime?: StringNullableFilter<"Baby"> | string | null
    gender?: StringFilter<"Baby"> | string
    birthWeight?: FloatNullableFilter<"Baby"> | number | null
    birthHeight?: FloatNullableFilter<"Baby"> | number | null
    birthHeadCircumference?: FloatNullableFilter<"Baby"> | number | null
    bloodType?: StringNullableFilter<"Baby"> | string | null
    allergies?: StringNullableFilter<"Baby"> | string | null
    notes?: StringNullableFilter<"Baby"> | string | null
    createdAt?: DateTimeFilter<"Baby"> | Date | string
    updatedAt?: DateTimeFilter<"Baby"> | Date | string
    growthRecords?: GrowthRecordListRelationFilter
    milestones?: MilestoneListRelationFilter
    mediaItems?: MediaItemListRelationFilter
  }

  export type BabyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    birthDate?: SortOrder
    birthTime?: SortOrderInput | SortOrder
    gender?: SortOrder
    birthWeight?: SortOrderInput | SortOrder
    birthHeight?: SortOrderInput | SortOrder
    birthHeadCircumference?: SortOrderInput | SortOrder
    bloodType?: SortOrderInput | SortOrder
    allergies?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    growthRecords?: GrowthRecordOrderByRelationAggregateInput
    milestones?: MilestoneOrderByRelationAggregateInput
    mediaItems?: MediaItemOrderByRelationAggregateInput
  }

  export type BabyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BabyWhereInput | BabyWhereInput[]
    OR?: BabyWhereInput[]
    NOT?: BabyWhereInput | BabyWhereInput[]
    name?: StringFilter<"Baby"> | string
    birthDate?: DateTimeFilter<"Baby"> | Date | string
    birthTime?: StringNullableFilter<"Baby"> | string | null
    gender?: StringFilter<"Baby"> | string
    birthWeight?: FloatNullableFilter<"Baby"> | number | null
    birthHeight?: FloatNullableFilter<"Baby"> | number | null
    birthHeadCircumference?: FloatNullableFilter<"Baby"> | number | null
    bloodType?: StringNullableFilter<"Baby"> | string | null
    allergies?: StringNullableFilter<"Baby"> | string | null
    notes?: StringNullableFilter<"Baby"> | string | null
    createdAt?: DateTimeFilter<"Baby"> | Date | string
    updatedAt?: DateTimeFilter<"Baby"> | Date | string
    growthRecords?: GrowthRecordListRelationFilter
    milestones?: MilestoneListRelationFilter
    mediaItems?: MediaItemListRelationFilter
  }, "id">

  export type BabyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    birthDate?: SortOrder
    birthTime?: SortOrderInput | SortOrder
    gender?: SortOrder
    birthWeight?: SortOrderInput | SortOrder
    birthHeight?: SortOrderInput | SortOrder
    birthHeadCircumference?: SortOrderInput | SortOrder
    bloodType?: SortOrderInput | SortOrder
    allergies?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BabyCountOrderByAggregateInput
    _avg?: BabyAvgOrderByAggregateInput
    _max?: BabyMaxOrderByAggregateInput
    _min?: BabyMinOrderByAggregateInput
    _sum?: BabySumOrderByAggregateInput
  }

  export type BabyScalarWhereWithAggregatesInput = {
    AND?: BabyScalarWhereWithAggregatesInput | BabyScalarWhereWithAggregatesInput[]
    OR?: BabyScalarWhereWithAggregatesInput[]
    NOT?: BabyScalarWhereWithAggregatesInput | BabyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Baby"> | string
    name?: StringWithAggregatesFilter<"Baby"> | string
    birthDate?: DateTimeWithAggregatesFilter<"Baby"> | Date | string
    birthTime?: StringNullableWithAggregatesFilter<"Baby"> | string | null
    gender?: StringWithAggregatesFilter<"Baby"> | string
    birthWeight?: FloatNullableWithAggregatesFilter<"Baby"> | number | null
    birthHeight?: FloatNullableWithAggregatesFilter<"Baby"> | number | null
    birthHeadCircumference?: FloatNullableWithAggregatesFilter<"Baby"> | number | null
    bloodType?: StringNullableWithAggregatesFilter<"Baby"> | string | null
    allergies?: StringNullableWithAggregatesFilter<"Baby"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Baby"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Baby"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Baby"> | Date | string
  }

  export type GrowthRecordWhereInput = {
    AND?: GrowthRecordWhereInput | GrowthRecordWhereInput[]
    OR?: GrowthRecordWhereInput[]
    NOT?: GrowthRecordWhereInput | GrowthRecordWhereInput[]
    id?: StringFilter<"GrowthRecord"> | string
    babyId?: StringFilter<"GrowthRecord"> | string
    date?: DateTimeFilter<"GrowthRecord"> | Date | string
    weight?: FloatNullableFilter<"GrowthRecord"> | number | null
    height?: FloatNullableFilter<"GrowthRecord"> | number | null
    headCircumference?: FloatNullableFilter<"GrowthRecord"> | number | null
    notes?: StringNullableFilter<"GrowthRecord"> | string | null
    createdAt?: DateTimeFilter<"GrowthRecord"> | Date | string
    updatedAt?: DateTimeFilter<"GrowthRecord"> | Date | string
    baby?: XOR<BabyScalarRelationFilter, BabyWhereInput>
  }

  export type GrowthRecordOrderByWithRelationInput = {
    id?: SortOrder
    babyId?: SortOrder
    date?: SortOrder
    weight?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    headCircumference?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    baby?: BabyOrderByWithRelationInput
  }

  export type GrowthRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GrowthRecordWhereInput | GrowthRecordWhereInput[]
    OR?: GrowthRecordWhereInput[]
    NOT?: GrowthRecordWhereInput | GrowthRecordWhereInput[]
    babyId?: StringFilter<"GrowthRecord"> | string
    date?: DateTimeFilter<"GrowthRecord"> | Date | string
    weight?: FloatNullableFilter<"GrowthRecord"> | number | null
    height?: FloatNullableFilter<"GrowthRecord"> | number | null
    headCircumference?: FloatNullableFilter<"GrowthRecord"> | number | null
    notes?: StringNullableFilter<"GrowthRecord"> | string | null
    createdAt?: DateTimeFilter<"GrowthRecord"> | Date | string
    updatedAt?: DateTimeFilter<"GrowthRecord"> | Date | string
    baby?: XOR<BabyScalarRelationFilter, BabyWhereInput>
  }, "id">

  export type GrowthRecordOrderByWithAggregationInput = {
    id?: SortOrder
    babyId?: SortOrder
    date?: SortOrder
    weight?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    headCircumference?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GrowthRecordCountOrderByAggregateInput
    _avg?: GrowthRecordAvgOrderByAggregateInput
    _max?: GrowthRecordMaxOrderByAggregateInput
    _min?: GrowthRecordMinOrderByAggregateInput
    _sum?: GrowthRecordSumOrderByAggregateInput
  }

  export type GrowthRecordScalarWhereWithAggregatesInput = {
    AND?: GrowthRecordScalarWhereWithAggregatesInput | GrowthRecordScalarWhereWithAggregatesInput[]
    OR?: GrowthRecordScalarWhereWithAggregatesInput[]
    NOT?: GrowthRecordScalarWhereWithAggregatesInput | GrowthRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GrowthRecord"> | string
    babyId?: StringWithAggregatesFilter<"GrowthRecord"> | string
    date?: DateTimeWithAggregatesFilter<"GrowthRecord"> | Date | string
    weight?: FloatNullableWithAggregatesFilter<"GrowthRecord"> | number | null
    height?: FloatNullableWithAggregatesFilter<"GrowthRecord"> | number | null
    headCircumference?: FloatNullableWithAggregatesFilter<"GrowthRecord"> | number | null
    notes?: StringNullableWithAggregatesFilter<"GrowthRecord"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GrowthRecord"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GrowthRecord"> | Date | string
  }

  export type MilestoneWhereInput = {
    AND?: MilestoneWhereInput | MilestoneWhereInput[]
    OR?: MilestoneWhereInput[]
    NOT?: MilestoneWhereInput | MilestoneWhereInput[]
    id?: StringFilter<"Milestone"> | string
    babyId?: StringFilter<"Milestone"> | string
    date?: DateTimeFilter<"Milestone"> | Date | string
    title?: StringFilter<"Milestone"> | string
    description?: StringFilter<"Milestone"> | string
    tags?: StringNullableListFilter<"Milestone">
    createdAt?: DateTimeFilter<"Milestone"> | Date | string
    updatedAt?: DateTimeFilter<"Milestone"> | Date | string
    baby?: XOR<BabyScalarRelationFilter, BabyWhereInput>
  }

  export type MilestoneOrderByWithRelationInput = {
    id?: SortOrder
    babyId?: SortOrder
    date?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    baby?: BabyOrderByWithRelationInput
  }

  export type MilestoneWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MilestoneWhereInput | MilestoneWhereInput[]
    OR?: MilestoneWhereInput[]
    NOT?: MilestoneWhereInput | MilestoneWhereInput[]
    babyId?: StringFilter<"Milestone"> | string
    date?: DateTimeFilter<"Milestone"> | Date | string
    title?: StringFilter<"Milestone"> | string
    description?: StringFilter<"Milestone"> | string
    tags?: StringNullableListFilter<"Milestone">
    createdAt?: DateTimeFilter<"Milestone"> | Date | string
    updatedAt?: DateTimeFilter<"Milestone"> | Date | string
    baby?: XOR<BabyScalarRelationFilter, BabyWhereInput>
  }, "id">

  export type MilestoneOrderByWithAggregationInput = {
    id?: SortOrder
    babyId?: SortOrder
    date?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MilestoneCountOrderByAggregateInput
    _max?: MilestoneMaxOrderByAggregateInput
    _min?: MilestoneMinOrderByAggregateInput
  }

  export type MilestoneScalarWhereWithAggregatesInput = {
    AND?: MilestoneScalarWhereWithAggregatesInput | MilestoneScalarWhereWithAggregatesInput[]
    OR?: MilestoneScalarWhereWithAggregatesInput[]
    NOT?: MilestoneScalarWhereWithAggregatesInput | MilestoneScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Milestone"> | string
    babyId?: StringWithAggregatesFilter<"Milestone"> | string
    date?: DateTimeWithAggregatesFilter<"Milestone"> | Date | string
    title?: StringWithAggregatesFilter<"Milestone"> | string
    description?: StringWithAggregatesFilter<"Milestone"> | string
    tags?: StringNullableListFilter<"Milestone">
    createdAt?: DateTimeWithAggregatesFilter<"Milestone"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Milestone"> | Date | string
  }

  export type MediaItemWhereInput = {
    AND?: MediaItemWhereInput | MediaItemWhereInput[]
    OR?: MediaItemWhereInput[]
    NOT?: MediaItemWhereInput | MediaItemWhereInput[]
    id?: StringFilter<"MediaItem"> | string
    babyId?: StringFilter<"MediaItem"> | string
    date?: DateTimeFilter<"MediaItem"> | Date | string
    title?: StringFilter<"MediaItem"> | string
    description?: StringNullableFilter<"MediaItem"> | string | null
    url?: StringFilter<"MediaItem"> | string
    mediaType?: StringFilter<"MediaItem"> | string
    format?: StringNullableFilter<"MediaItem"> | string | null
    thumbnailUrl?: StringNullableFilter<"MediaItem"> | string | null
    duration?: IntNullableFilter<"MediaItem"> | number | null
    createdAt?: DateTimeFilter<"MediaItem"> | Date | string
    updatedAt?: DateTimeFilter<"MediaItem"> | Date | string
    baby?: XOR<BabyScalarRelationFilter, BabyWhereInput>
  }

  export type MediaItemOrderByWithRelationInput = {
    id?: SortOrder
    babyId?: SortOrder
    date?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    url?: SortOrder
    mediaType?: SortOrder
    format?: SortOrderInput | SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    baby?: BabyOrderByWithRelationInput
  }

  export type MediaItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MediaItemWhereInput | MediaItemWhereInput[]
    OR?: MediaItemWhereInput[]
    NOT?: MediaItemWhereInput | MediaItemWhereInput[]
    babyId?: StringFilter<"MediaItem"> | string
    date?: DateTimeFilter<"MediaItem"> | Date | string
    title?: StringFilter<"MediaItem"> | string
    description?: StringNullableFilter<"MediaItem"> | string | null
    url?: StringFilter<"MediaItem"> | string
    mediaType?: StringFilter<"MediaItem"> | string
    format?: StringNullableFilter<"MediaItem"> | string | null
    thumbnailUrl?: StringNullableFilter<"MediaItem"> | string | null
    duration?: IntNullableFilter<"MediaItem"> | number | null
    createdAt?: DateTimeFilter<"MediaItem"> | Date | string
    updatedAt?: DateTimeFilter<"MediaItem"> | Date | string
    baby?: XOR<BabyScalarRelationFilter, BabyWhereInput>
  }, "id">

  export type MediaItemOrderByWithAggregationInput = {
    id?: SortOrder
    babyId?: SortOrder
    date?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    url?: SortOrder
    mediaType?: SortOrder
    format?: SortOrderInput | SortOrder
    thumbnailUrl?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MediaItemCountOrderByAggregateInput
    _avg?: MediaItemAvgOrderByAggregateInput
    _max?: MediaItemMaxOrderByAggregateInput
    _min?: MediaItemMinOrderByAggregateInput
    _sum?: MediaItemSumOrderByAggregateInput
  }

  export type MediaItemScalarWhereWithAggregatesInput = {
    AND?: MediaItemScalarWhereWithAggregatesInput | MediaItemScalarWhereWithAggregatesInput[]
    OR?: MediaItemScalarWhereWithAggregatesInput[]
    NOT?: MediaItemScalarWhereWithAggregatesInput | MediaItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MediaItem"> | string
    babyId?: StringWithAggregatesFilter<"MediaItem"> | string
    date?: DateTimeWithAggregatesFilter<"MediaItem"> | Date | string
    title?: StringWithAggregatesFilter<"MediaItem"> | string
    description?: StringNullableWithAggregatesFilter<"MediaItem"> | string | null
    url?: StringWithAggregatesFilter<"MediaItem"> | string
    mediaType?: StringWithAggregatesFilter<"MediaItem"> | string
    format?: StringNullableWithAggregatesFilter<"MediaItem"> | string | null
    thumbnailUrl?: StringNullableWithAggregatesFilter<"MediaItem"> | string | null
    duration?: IntNullableWithAggregatesFilter<"MediaItem"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"MediaItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MediaItem"> | Date | string
  }

  export type BabyCreateInput = {
    id?: string
    name: string
    birthDate: Date | string
    birthTime?: string | null
    gender: string
    birthWeight?: number | null
    birthHeight?: number | null
    birthHeadCircumference?: number | null
    bloodType?: string | null
    allergies?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    growthRecords?: GrowthRecordCreateNestedManyWithoutBabyInput
    milestones?: MilestoneCreateNestedManyWithoutBabyInput
    mediaItems?: MediaItemCreateNestedManyWithoutBabyInput
  }

  export type BabyUncheckedCreateInput = {
    id?: string
    name: string
    birthDate: Date | string
    birthTime?: string | null
    gender: string
    birthWeight?: number | null
    birthHeight?: number | null
    birthHeadCircumference?: number | null
    bloodType?: string | null
    allergies?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    growthRecords?: GrowthRecordUncheckedCreateNestedManyWithoutBabyInput
    milestones?: MilestoneUncheckedCreateNestedManyWithoutBabyInput
    mediaItems?: MediaItemUncheckedCreateNestedManyWithoutBabyInput
  }

  export type BabyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthTime?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    birthWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeadCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    growthRecords?: GrowthRecordUpdateManyWithoutBabyNestedInput
    milestones?: MilestoneUpdateManyWithoutBabyNestedInput
    mediaItems?: MediaItemUpdateManyWithoutBabyNestedInput
  }

  export type BabyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthTime?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    birthWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeadCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    growthRecords?: GrowthRecordUncheckedUpdateManyWithoutBabyNestedInput
    milestones?: MilestoneUncheckedUpdateManyWithoutBabyNestedInput
    mediaItems?: MediaItemUncheckedUpdateManyWithoutBabyNestedInput
  }

  export type BabyCreateManyInput = {
    id?: string
    name: string
    birthDate: Date | string
    birthTime?: string | null
    gender: string
    birthWeight?: number | null
    birthHeight?: number | null
    birthHeadCircumference?: number | null
    bloodType?: string | null
    allergies?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BabyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthTime?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    birthWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeadCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BabyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthTime?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    birthWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeadCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrowthRecordCreateInput = {
    id?: string
    date: Date | string
    weight?: number | null
    height?: number | null
    headCircumference?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    baby: BabyCreateNestedOneWithoutGrowthRecordsInput
  }

  export type GrowthRecordUncheckedCreateInput = {
    id?: string
    babyId: string
    date: Date | string
    weight?: number | null
    height?: number | null
    headCircumference?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GrowthRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    headCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baby?: BabyUpdateOneRequiredWithoutGrowthRecordsNestedInput
  }

  export type GrowthRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    headCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrowthRecordCreateManyInput = {
    id?: string
    babyId: string
    date: Date | string
    weight?: number | null
    height?: number | null
    headCircumference?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GrowthRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    headCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrowthRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    headCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneCreateInput = {
    id?: string
    date: Date | string
    title: string
    description: string
    tags?: MilestoneCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    baby: BabyCreateNestedOneWithoutMilestonesInput
  }

  export type MilestoneUncheckedCreateInput = {
    id?: string
    babyId: string
    date: Date | string
    title: string
    description: string
    tags?: MilestoneCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilestoneUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: MilestoneUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baby?: BabyUpdateOneRequiredWithoutMilestonesNestedInput
  }

  export type MilestoneUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: MilestoneUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneCreateManyInput = {
    id?: string
    babyId: string
    date: Date | string
    title: string
    description: string
    tags?: MilestoneCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilestoneUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: MilestoneUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: MilestoneUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaItemCreateInput = {
    id?: string
    date: Date | string
    title: string
    description?: string | null
    url: string
    mediaType: string
    format?: string | null
    thumbnailUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    baby: BabyCreateNestedOneWithoutMediaItemsInput
  }

  export type MediaItemUncheckedCreateInput = {
    id?: string
    babyId: string
    date: Date | string
    title: string
    description?: string | null
    url: string
    mediaType: string
    format?: string | null
    thumbnailUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    mediaType?: StringFieldUpdateOperationsInput | string
    format?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    baby?: BabyUpdateOneRequiredWithoutMediaItemsNestedInput
  }

  export type MediaItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    mediaType?: StringFieldUpdateOperationsInput | string
    format?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaItemCreateManyInput = {
    id?: string
    babyId: string
    date: Date | string
    title: string
    description?: string | null
    url: string
    mediaType: string
    format?: string | null
    thumbnailUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    mediaType?: StringFieldUpdateOperationsInput | string
    format?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    babyId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    mediaType?: StringFieldUpdateOperationsInput | string
    format?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type GrowthRecordListRelationFilter = {
    every?: GrowthRecordWhereInput
    some?: GrowthRecordWhereInput
    none?: GrowthRecordWhereInput
  }

  export type MilestoneListRelationFilter = {
    every?: MilestoneWhereInput
    some?: MilestoneWhereInput
    none?: MilestoneWhereInput
  }

  export type MediaItemListRelationFilter = {
    every?: MediaItemWhereInput
    some?: MediaItemWhereInput
    none?: MediaItemWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type GrowthRecordOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MilestoneOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MediaItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BabyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthDate?: SortOrder
    birthTime?: SortOrder
    gender?: SortOrder
    birthWeight?: SortOrder
    birthHeight?: SortOrder
    birthHeadCircumference?: SortOrder
    bloodType?: SortOrder
    allergies?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BabyAvgOrderByAggregateInput = {
    birthWeight?: SortOrder
    birthHeight?: SortOrder
    birthHeadCircumference?: SortOrder
  }

  export type BabyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthDate?: SortOrder
    birthTime?: SortOrder
    gender?: SortOrder
    birthWeight?: SortOrder
    birthHeight?: SortOrder
    birthHeadCircumference?: SortOrder
    bloodType?: SortOrder
    allergies?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BabyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    birthDate?: SortOrder
    birthTime?: SortOrder
    gender?: SortOrder
    birthWeight?: SortOrder
    birthHeight?: SortOrder
    birthHeadCircumference?: SortOrder
    bloodType?: SortOrder
    allergies?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BabySumOrderByAggregateInput = {
    birthWeight?: SortOrder
    birthHeight?: SortOrder
    birthHeadCircumference?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BabyScalarRelationFilter = {
    is?: BabyWhereInput
    isNot?: BabyWhereInput
  }

  export type GrowthRecordCountOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    date?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    headCircumference?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GrowthRecordAvgOrderByAggregateInput = {
    weight?: SortOrder
    height?: SortOrder
    headCircumference?: SortOrder
  }

  export type GrowthRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    date?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    headCircumference?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GrowthRecordMinOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    date?: SortOrder
    weight?: SortOrder
    height?: SortOrder
    headCircumference?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GrowthRecordSumOrderByAggregateInput = {
    weight?: SortOrder
    height?: SortOrder
    headCircumference?: SortOrder
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type MilestoneCountOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    date?: SortOrder
    title?: SortOrder
    description?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MilestoneMaxOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    date?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MilestoneMinOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    date?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MediaItemCountOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    date?: SortOrder
    title?: SortOrder
    description?: SortOrder
    url?: SortOrder
    mediaType?: SortOrder
    format?: SortOrder
    thumbnailUrl?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MediaItemAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type MediaItemMaxOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    date?: SortOrder
    title?: SortOrder
    description?: SortOrder
    url?: SortOrder
    mediaType?: SortOrder
    format?: SortOrder
    thumbnailUrl?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MediaItemMinOrderByAggregateInput = {
    id?: SortOrder
    babyId?: SortOrder
    date?: SortOrder
    title?: SortOrder
    description?: SortOrder
    url?: SortOrder
    mediaType?: SortOrder
    format?: SortOrder
    thumbnailUrl?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MediaItemSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type GrowthRecordCreateNestedManyWithoutBabyInput = {
    create?: XOR<GrowthRecordCreateWithoutBabyInput, GrowthRecordUncheckedCreateWithoutBabyInput> | GrowthRecordCreateWithoutBabyInput[] | GrowthRecordUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: GrowthRecordCreateOrConnectWithoutBabyInput | GrowthRecordCreateOrConnectWithoutBabyInput[]
    createMany?: GrowthRecordCreateManyBabyInputEnvelope
    connect?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
  }

  export type MilestoneCreateNestedManyWithoutBabyInput = {
    create?: XOR<MilestoneCreateWithoutBabyInput, MilestoneUncheckedCreateWithoutBabyInput> | MilestoneCreateWithoutBabyInput[] | MilestoneUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: MilestoneCreateOrConnectWithoutBabyInput | MilestoneCreateOrConnectWithoutBabyInput[]
    createMany?: MilestoneCreateManyBabyInputEnvelope
    connect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
  }

  export type MediaItemCreateNestedManyWithoutBabyInput = {
    create?: XOR<MediaItemCreateWithoutBabyInput, MediaItemUncheckedCreateWithoutBabyInput> | MediaItemCreateWithoutBabyInput[] | MediaItemUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: MediaItemCreateOrConnectWithoutBabyInput | MediaItemCreateOrConnectWithoutBabyInput[]
    createMany?: MediaItemCreateManyBabyInputEnvelope
    connect?: MediaItemWhereUniqueInput | MediaItemWhereUniqueInput[]
  }

  export type GrowthRecordUncheckedCreateNestedManyWithoutBabyInput = {
    create?: XOR<GrowthRecordCreateWithoutBabyInput, GrowthRecordUncheckedCreateWithoutBabyInput> | GrowthRecordCreateWithoutBabyInput[] | GrowthRecordUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: GrowthRecordCreateOrConnectWithoutBabyInput | GrowthRecordCreateOrConnectWithoutBabyInput[]
    createMany?: GrowthRecordCreateManyBabyInputEnvelope
    connect?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
  }

  export type MilestoneUncheckedCreateNestedManyWithoutBabyInput = {
    create?: XOR<MilestoneCreateWithoutBabyInput, MilestoneUncheckedCreateWithoutBabyInput> | MilestoneCreateWithoutBabyInput[] | MilestoneUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: MilestoneCreateOrConnectWithoutBabyInput | MilestoneCreateOrConnectWithoutBabyInput[]
    createMany?: MilestoneCreateManyBabyInputEnvelope
    connect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
  }

  export type MediaItemUncheckedCreateNestedManyWithoutBabyInput = {
    create?: XOR<MediaItemCreateWithoutBabyInput, MediaItemUncheckedCreateWithoutBabyInput> | MediaItemCreateWithoutBabyInput[] | MediaItemUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: MediaItemCreateOrConnectWithoutBabyInput | MediaItemCreateOrConnectWithoutBabyInput[]
    createMany?: MediaItemCreateManyBabyInputEnvelope
    connect?: MediaItemWhereUniqueInput | MediaItemWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type GrowthRecordUpdateManyWithoutBabyNestedInput = {
    create?: XOR<GrowthRecordCreateWithoutBabyInput, GrowthRecordUncheckedCreateWithoutBabyInput> | GrowthRecordCreateWithoutBabyInput[] | GrowthRecordUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: GrowthRecordCreateOrConnectWithoutBabyInput | GrowthRecordCreateOrConnectWithoutBabyInput[]
    upsert?: GrowthRecordUpsertWithWhereUniqueWithoutBabyInput | GrowthRecordUpsertWithWhereUniqueWithoutBabyInput[]
    createMany?: GrowthRecordCreateManyBabyInputEnvelope
    set?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
    disconnect?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
    delete?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
    connect?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
    update?: GrowthRecordUpdateWithWhereUniqueWithoutBabyInput | GrowthRecordUpdateWithWhereUniqueWithoutBabyInput[]
    updateMany?: GrowthRecordUpdateManyWithWhereWithoutBabyInput | GrowthRecordUpdateManyWithWhereWithoutBabyInput[]
    deleteMany?: GrowthRecordScalarWhereInput | GrowthRecordScalarWhereInput[]
  }

  export type MilestoneUpdateManyWithoutBabyNestedInput = {
    create?: XOR<MilestoneCreateWithoutBabyInput, MilestoneUncheckedCreateWithoutBabyInput> | MilestoneCreateWithoutBabyInput[] | MilestoneUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: MilestoneCreateOrConnectWithoutBabyInput | MilestoneCreateOrConnectWithoutBabyInput[]
    upsert?: MilestoneUpsertWithWhereUniqueWithoutBabyInput | MilestoneUpsertWithWhereUniqueWithoutBabyInput[]
    createMany?: MilestoneCreateManyBabyInputEnvelope
    set?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    disconnect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    delete?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    connect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    update?: MilestoneUpdateWithWhereUniqueWithoutBabyInput | MilestoneUpdateWithWhereUniqueWithoutBabyInput[]
    updateMany?: MilestoneUpdateManyWithWhereWithoutBabyInput | MilestoneUpdateManyWithWhereWithoutBabyInput[]
    deleteMany?: MilestoneScalarWhereInput | MilestoneScalarWhereInput[]
  }

  export type MediaItemUpdateManyWithoutBabyNestedInput = {
    create?: XOR<MediaItemCreateWithoutBabyInput, MediaItemUncheckedCreateWithoutBabyInput> | MediaItemCreateWithoutBabyInput[] | MediaItemUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: MediaItemCreateOrConnectWithoutBabyInput | MediaItemCreateOrConnectWithoutBabyInput[]
    upsert?: MediaItemUpsertWithWhereUniqueWithoutBabyInput | MediaItemUpsertWithWhereUniqueWithoutBabyInput[]
    createMany?: MediaItemCreateManyBabyInputEnvelope
    set?: MediaItemWhereUniqueInput | MediaItemWhereUniqueInput[]
    disconnect?: MediaItemWhereUniqueInput | MediaItemWhereUniqueInput[]
    delete?: MediaItemWhereUniqueInput | MediaItemWhereUniqueInput[]
    connect?: MediaItemWhereUniqueInput | MediaItemWhereUniqueInput[]
    update?: MediaItemUpdateWithWhereUniqueWithoutBabyInput | MediaItemUpdateWithWhereUniqueWithoutBabyInput[]
    updateMany?: MediaItemUpdateManyWithWhereWithoutBabyInput | MediaItemUpdateManyWithWhereWithoutBabyInput[]
    deleteMany?: MediaItemScalarWhereInput | MediaItemScalarWhereInput[]
  }

  export type GrowthRecordUncheckedUpdateManyWithoutBabyNestedInput = {
    create?: XOR<GrowthRecordCreateWithoutBabyInput, GrowthRecordUncheckedCreateWithoutBabyInput> | GrowthRecordCreateWithoutBabyInput[] | GrowthRecordUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: GrowthRecordCreateOrConnectWithoutBabyInput | GrowthRecordCreateOrConnectWithoutBabyInput[]
    upsert?: GrowthRecordUpsertWithWhereUniqueWithoutBabyInput | GrowthRecordUpsertWithWhereUniqueWithoutBabyInput[]
    createMany?: GrowthRecordCreateManyBabyInputEnvelope
    set?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
    disconnect?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
    delete?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
    connect?: GrowthRecordWhereUniqueInput | GrowthRecordWhereUniqueInput[]
    update?: GrowthRecordUpdateWithWhereUniqueWithoutBabyInput | GrowthRecordUpdateWithWhereUniqueWithoutBabyInput[]
    updateMany?: GrowthRecordUpdateManyWithWhereWithoutBabyInput | GrowthRecordUpdateManyWithWhereWithoutBabyInput[]
    deleteMany?: GrowthRecordScalarWhereInput | GrowthRecordScalarWhereInput[]
  }

  export type MilestoneUncheckedUpdateManyWithoutBabyNestedInput = {
    create?: XOR<MilestoneCreateWithoutBabyInput, MilestoneUncheckedCreateWithoutBabyInput> | MilestoneCreateWithoutBabyInput[] | MilestoneUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: MilestoneCreateOrConnectWithoutBabyInput | MilestoneCreateOrConnectWithoutBabyInput[]
    upsert?: MilestoneUpsertWithWhereUniqueWithoutBabyInput | MilestoneUpsertWithWhereUniqueWithoutBabyInput[]
    createMany?: MilestoneCreateManyBabyInputEnvelope
    set?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    disconnect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    delete?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    connect?: MilestoneWhereUniqueInput | MilestoneWhereUniqueInput[]
    update?: MilestoneUpdateWithWhereUniqueWithoutBabyInput | MilestoneUpdateWithWhereUniqueWithoutBabyInput[]
    updateMany?: MilestoneUpdateManyWithWhereWithoutBabyInput | MilestoneUpdateManyWithWhereWithoutBabyInput[]
    deleteMany?: MilestoneScalarWhereInput | MilestoneScalarWhereInput[]
  }

  export type MediaItemUncheckedUpdateManyWithoutBabyNestedInput = {
    create?: XOR<MediaItemCreateWithoutBabyInput, MediaItemUncheckedCreateWithoutBabyInput> | MediaItemCreateWithoutBabyInput[] | MediaItemUncheckedCreateWithoutBabyInput[]
    connectOrCreate?: MediaItemCreateOrConnectWithoutBabyInput | MediaItemCreateOrConnectWithoutBabyInput[]
    upsert?: MediaItemUpsertWithWhereUniqueWithoutBabyInput | MediaItemUpsertWithWhereUniqueWithoutBabyInput[]
    createMany?: MediaItemCreateManyBabyInputEnvelope
    set?: MediaItemWhereUniqueInput | MediaItemWhereUniqueInput[]
    disconnect?: MediaItemWhereUniqueInput | MediaItemWhereUniqueInput[]
    delete?: MediaItemWhereUniqueInput | MediaItemWhereUniqueInput[]
    connect?: MediaItemWhereUniqueInput | MediaItemWhereUniqueInput[]
    update?: MediaItemUpdateWithWhereUniqueWithoutBabyInput | MediaItemUpdateWithWhereUniqueWithoutBabyInput[]
    updateMany?: MediaItemUpdateManyWithWhereWithoutBabyInput | MediaItemUpdateManyWithWhereWithoutBabyInput[]
    deleteMany?: MediaItemScalarWhereInput | MediaItemScalarWhereInput[]
  }

  export type BabyCreateNestedOneWithoutGrowthRecordsInput = {
    create?: XOR<BabyCreateWithoutGrowthRecordsInput, BabyUncheckedCreateWithoutGrowthRecordsInput>
    connectOrCreate?: BabyCreateOrConnectWithoutGrowthRecordsInput
    connect?: BabyWhereUniqueInput
  }

  export type BabyUpdateOneRequiredWithoutGrowthRecordsNestedInput = {
    create?: XOR<BabyCreateWithoutGrowthRecordsInput, BabyUncheckedCreateWithoutGrowthRecordsInput>
    connectOrCreate?: BabyCreateOrConnectWithoutGrowthRecordsInput
    upsert?: BabyUpsertWithoutGrowthRecordsInput
    connect?: BabyWhereUniqueInput
    update?: XOR<XOR<BabyUpdateToOneWithWhereWithoutGrowthRecordsInput, BabyUpdateWithoutGrowthRecordsInput>, BabyUncheckedUpdateWithoutGrowthRecordsInput>
  }

  export type MilestoneCreatetagsInput = {
    set: string[]
  }

  export type BabyCreateNestedOneWithoutMilestonesInput = {
    create?: XOR<BabyCreateWithoutMilestonesInput, BabyUncheckedCreateWithoutMilestonesInput>
    connectOrCreate?: BabyCreateOrConnectWithoutMilestonesInput
    connect?: BabyWhereUniqueInput
  }

  export type MilestoneUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BabyUpdateOneRequiredWithoutMilestonesNestedInput = {
    create?: XOR<BabyCreateWithoutMilestonesInput, BabyUncheckedCreateWithoutMilestonesInput>
    connectOrCreate?: BabyCreateOrConnectWithoutMilestonesInput
    upsert?: BabyUpsertWithoutMilestonesInput
    connect?: BabyWhereUniqueInput
    update?: XOR<XOR<BabyUpdateToOneWithWhereWithoutMilestonesInput, BabyUpdateWithoutMilestonesInput>, BabyUncheckedUpdateWithoutMilestonesInput>
  }

  export type BabyCreateNestedOneWithoutMediaItemsInput = {
    create?: XOR<BabyCreateWithoutMediaItemsInput, BabyUncheckedCreateWithoutMediaItemsInput>
    connectOrCreate?: BabyCreateOrConnectWithoutMediaItemsInput
    connect?: BabyWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BabyUpdateOneRequiredWithoutMediaItemsNestedInput = {
    create?: XOR<BabyCreateWithoutMediaItemsInput, BabyUncheckedCreateWithoutMediaItemsInput>
    connectOrCreate?: BabyCreateOrConnectWithoutMediaItemsInput
    upsert?: BabyUpsertWithoutMediaItemsInput
    connect?: BabyWhereUniqueInput
    update?: XOR<XOR<BabyUpdateToOneWithWhereWithoutMediaItemsInput, BabyUpdateWithoutMediaItemsInput>, BabyUncheckedUpdateWithoutMediaItemsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type GrowthRecordCreateWithoutBabyInput = {
    id?: string
    date: Date | string
    weight?: number | null
    height?: number | null
    headCircumference?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GrowthRecordUncheckedCreateWithoutBabyInput = {
    id?: string
    date: Date | string
    weight?: number | null
    height?: number | null
    headCircumference?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GrowthRecordCreateOrConnectWithoutBabyInput = {
    where: GrowthRecordWhereUniqueInput
    create: XOR<GrowthRecordCreateWithoutBabyInput, GrowthRecordUncheckedCreateWithoutBabyInput>
  }

  export type GrowthRecordCreateManyBabyInputEnvelope = {
    data: GrowthRecordCreateManyBabyInput | GrowthRecordCreateManyBabyInput[]
    skipDuplicates?: boolean
  }

  export type MilestoneCreateWithoutBabyInput = {
    id?: string
    date: Date | string
    title: string
    description: string
    tags?: MilestoneCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilestoneUncheckedCreateWithoutBabyInput = {
    id?: string
    date: Date | string
    title: string
    description: string
    tags?: MilestoneCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilestoneCreateOrConnectWithoutBabyInput = {
    where: MilestoneWhereUniqueInput
    create: XOR<MilestoneCreateWithoutBabyInput, MilestoneUncheckedCreateWithoutBabyInput>
  }

  export type MilestoneCreateManyBabyInputEnvelope = {
    data: MilestoneCreateManyBabyInput | MilestoneCreateManyBabyInput[]
    skipDuplicates?: boolean
  }

  export type MediaItemCreateWithoutBabyInput = {
    id?: string
    date: Date | string
    title: string
    description?: string | null
    url: string
    mediaType: string
    format?: string | null
    thumbnailUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaItemUncheckedCreateWithoutBabyInput = {
    id?: string
    date: Date | string
    title: string
    description?: string | null
    url: string
    mediaType: string
    format?: string | null
    thumbnailUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaItemCreateOrConnectWithoutBabyInput = {
    where: MediaItemWhereUniqueInput
    create: XOR<MediaItemCreateWithoutBabyInput, MediaItemUncheckedCreateWithoutBabyInput>
  }

  export type MediaItemCreateManyBabyInputEnvelope = {
    data: MediaItemCreateManyBabyInput | MediaItemCreateManyBabyInput[]
    skipDuplicates?: boolean
  }

  export type GrowthRecordUpsertWithWhereUniqueWithoutBabyInput = {
    where: GrowthRecordWhereUniqueInput
    update: XOR<GrowthRecordUpdateWithoutBabyInput, GrowthRecordUncheckedUpdateWithoutBabyInput>
    create: XOR<GrowthRecordCreateWithoutBabyInput, GrowthRecordUncheckedCreateWithoutBabyInput>
  }

  export type GrowthRecordUpdateWithWhereUniqueWithoutBabyInput = {
    where: GrowthRecordWhereUniqueInput
    data: XOR<GrowthRecordUpdateWithoutBabyInput, GrowthRecordUncheckedUpdateWithoutBabyInput>
  }

  export type GrowthRecordUpdateManyWithWhereWithoutBabyInput = {
    where: GrowthRecordScalarWhereInput
    data: XOR<GrowthRecordUpdateManyMutationInput, GrowthRecordUncheckedUpdateManyWithoutBabyInput>
  }

  export type GrowthRecordScalarWhereInput = {
    AND?: GrowthRecordScalarWhereInput | GrowthRecordScalarWhereInput[]
    OR?: GrowthRecordScalarWhereInput[]
    NOT?: GrowthRecordScalarWhereInput | GrowthRecordScalarWhereInput[]
    id?: StringFilter<"GrowthRecord"> | string
    babyId?: StringFilter<"GrowthRecord"> | string
    date?: DateTimeFilter<"GrowthRecord"> | Date | string
    weight?: FloatNullableFilter<"GrowthRecord"> | number | null
    height?: FloatNullableFilter<"GrowthRecord"> | number | null
    headCircumference?: FloatNullableFilter<"GrowthRecord"> | number | null
    notes?: StringNullableFilter<"GrowthRecord"> | string | null
    createdAt?: DateTimeFilter<"GrowthRecord"> | Date | string
    updatedAt?: DateTimeFilter<"GrowthRecord"> | Date | string
  }

  export type MilestoneUpsertWithWhereUniqueWithoutBabyInput = {
    where: MilestoneWhereUniqueInput
    update: XOR<MilestoneUpdateWithoutBabyInput, MilestoneUncheckedUpdateWithoutBabyInput>
    create: XOR<MilestoneCreateWithoutBabyInput, MilestoneUncheckedCreateWithoutBabyInput>
  }

  export type MilestoneUpdateWithWhereUniqueWithoutBabyInput = {
    where: MilestoneWhereUniqueInput
    data: XOR<MilestoneUpdateWithoutBabyInput, MilestoneUncheckedUpdateWithoutBabyInput>
  }

  export type MilestoneUpdateManyWithWhereWithoutBabyInput = {
    where: MilestoneScalarWhereInput
    data: XOR<MilestoneUpdateManyMutationInput, MilestoneUncheckedUpdateManyWithoutBabyInput>
  }

  export type MilestoneScalarWhereInput = {
    AND?: MilestoneScalarWhereInput | MilestoneScalarWhereInput[]
    OR?: MilestoneScalarWhereInput[]
    NOT?: MilestoneScalarWhereInput | MilestoneScalarWhereInput[]
    id?: StringFilter<"Milestone"> | string
    babyId?: StringFilter<"Milestone"> | string
    date?: DateTimeFilter<"Milestone"> | Date | string
    title?: StringFilter<"Milestone"> | string
    description?: StringFilter<"Milestone"> | string
    tags?: StringNullableListFilter<"Milestone">
    createdAt?: DateTimeFilter<"Milestone"> | Date | string
    updatedAt?: DateTimeFilter<"Milestone"> | Date | string
  }

  export type MediaItemUpsertWithWhereUniqueWithoutBabyInput = {
    where: MediaItemWhereUniqueInput
    update: XOR<MediaItemUpdateWithoutBabyInput, MediaItemUncheckedUpdateWithoutBabyInput>
    create: XOR<MediaItemCreateWithoutBabyInput, MediaItemUncheckedCreateWithoutBabyInput>
  }

  export type MediaItemUpdateWithWhereUniqueWithoutBabyInput = {
    where: MediaItemWhereUniqueInput
    data: XOR<MediaItemUpdateWithoutBabyInput, MediaItemUncheckedUpdateWithoutBabyInput>
  }

  export type MediaItemUpdateManyWithWhereWithoutBabyInput = {
    where: MediaItemScalarWhereInput
    data: XOR<MediaItemUpdateManyMutationInput, MediaItemUncheckedUpdateManyWithoutBabyInput>
  }

  export type MediaItemScalarWhereInput = {
    AND?: MediaItemScalarWhereInput | MediaItemScalarWhereInput[]
    OR?: MediaItemScalarWhereInput[]
    NOT?: MediaItemScalarWhereInput | MediaItemScalarWhereInput[]
    id?: StringFilter<"MediaItem"> | string
    babyId?: StringFilter<"MediaItem"> | string
    date?: DateTimeFilter<"MediaItem"> | Date | string
    title?: StringFilter<"MediaItem"> | string
    description?: StringNullableFilter<"MediaItem"> | string | null
    url?: StringFilter<"MediaItem"> | string
    mediaType?: StringFilter<"MediaItem"> | string
    format?: StringNullableFilter<"MediaItem"> | string | null
    thumbnailUrl?: StringNullableFilter<"MediaItem"> | string | null
    duration?: IntNullableFilter<"MediaItem"> | number | null
    createdAt?: DateTimeFilter<"MediaItem"> | Date | string
    updatedAt?: DateTimeFilter<"MediaItem"> | Date | string
  }

  export type BabyCreateWithoutGrowthRecordsInput = {
    id?: string
    name: string
    birthDate: Date | string
    birthTime?: string | null
    gender: string
    birthWeight?: number | null
    birthHeight?: number | null
    birthHeadCircumference?: number | null
    bloodType?: string | null
    allergies?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    milestones?: MilestoneCreateNestedManyWithoutBabyInput
    mediaItems?: MediaItemCreateNestedManyWithoutBabyInput
  }

  export type BabyUncheckedCreateWithoutGrowthRecordsInput = {
    id?: string
    name: string
    birthDate: Date | string
    birthTime?: string | null
    gender: string
    birthWeight?: number | null
    birthHeight?: number | null
    birthHeadCircumference?: number | null
    bloodType?: string | null
    allergies?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    milestones?: MilestoneUncheckedCreateNestedManyWithoutBabyInput
    mediaItems?: MediaItemUncheckedCreateNestedManyWithoutBabyInput
  }

  export type BabyCreateOrConnectWithoutGrowthRecordsInput = {
    where: BabyWhereUniqueInput
    create: XOR<BabyCreateWithoutGrowthRecordsInput, BabyUncheckedCreateWithoutGrowthRecordsInput>
  }

  export type BabyUpsertWithoutGrowthRecordsInput = {
    update: XOR<BabyUpdateWithoutGrowthRecordsInput, BabyUncheckedUpdateWithoutGrowthRecordsInput>
    create: XOR<BabyCreateWithoutGrowthRecordsInput, BabyUncheckedCreateWithoutGrowthRecordsInput>
    where?: BabyWhereInput
  }

  export type BabyUpdateToOneWithWhereWithoutGrowthRecordsInput = {
    where?: BabyWhereInput
    data: XOR<BabyUpdateWithoutGrowthRecordsInput, BabyUncheckedUpdateWithoutGrowthRecordsInput>
  }

  export type BabyUpdateWithoutGrowthRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthTime?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    birthWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeadCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    milestones?: MilestoneUpdateManyWithoutBabyNestedInput
    mediaItems?: MediaItemUpdateManyWithoutBabyNestedInput
  }

  export type BabyUncheckedUpdateWithoutGrowthRecordsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthTime?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    birthWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeadCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    milestones?: MilestoneUncheckedUpdateManyWithoutBabyNestedInput
    mediaItems?: MediaItemUncheckedUpdateManyWithoutBabyNestedInput
  }

  export type BabyCreateWithoutMilestonesInput = {
    id?: string
    name: string
    birthDate: Date | string
    birthTime?: string | null
    gender: string
    birthWeight?: number | null
    birthHeight?: number | null
    birthHeadCircumference?: number | null
    bloodType?: string | null
    allergies?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    growthRecords?: GrowthRecordCreateNestedManyWithoutBabyInput
    mediaItems?: MediaItemCreateNestedManyWithoutBabyInput
  }

  export type BabyUncheckedCreateWithoutMilestonesInput = {
    id?: string
    name: string
    birthDate: Date | string
    birthTime?: string | null
    gender: string
    birthWeight?: number | null
    birthHeight?: number | null
    birthHeadCircumference?: number | null
    bloodType?: string | null
    allergies?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    growthRecords?: GrowthRecordUncheckedCreateNestedManyWithoutBabyInput
    mediaItems?: MediaItemUncheckedCreateNestedManyWithoutBabyInput
  }

  export type BabyCreateOrConnectWithoutMilestonesInput = {
    where: BabyWhereUniqueInput
    create: XOR<BabyCreateWithoutMilestonesInput, BabyUncheckedCreateWithoutMilestonesInput>
  }

  export type BabyUpsertWithoutMilestonesInput = {
    update: XOR<BabyUpdateWithoutMilestonesInput, BabyUncheckedUpdateWithoutMilestonesInput>
    create: XOR<BabyCreateWithoutMilestonesInput, BabyUncheckedCreateWithoutMilestonesInput>
    where?: BabyWhereInput
  }

  export type BabyUpdateToOneWithWhereWithoutMilestonesInput = {
    where?: BabyWhereInput
    data: XOR<BabyUpdateWithoutMilestonesInput, BabyUncheckedUpdateWithoutMilestonesInput>
  }

  export type BabyUpdateWithoutMilestonesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthTime?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    birthWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeadCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    growthRecords?: GrowthRecordUpdateManyWithoutBabyNestedInput
    mediaItems?: MediaItemUpdateManyWithoutBabyNestedInput
  }

  export type BabyUncheckedUpdateWithoutMilestonesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthTime?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    birthWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeadCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    growthRecords?: GrowthRecordUncheckedUpdateManyWithoutBabyNestedInput
    mediaItems?: MediaItemUncheckedUpdateManyWithoutBabyNestedInput
  }

  export type BabyCreateWithoutMediaItemsInput = {
    id?: string
    name: string
    birthDate: Date | string
    birthTime?: string | null
    gender: string
    birthWeight?: number | null
    birthHeight?: number | null
    birthHeadCircumference?: number | null
    bloodType?: string | null
    allergies?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    growthRecords?: GrowthRecordCreateNestedManyWithoutBabyInput
    milestones?: MilestoneCreateNestedManyWithoutBabyInput
  }

  export type BabyUncheckedCreateWithoutMediaItemsInput = {
    id?: string
    name: string
    birthDate: Date | string
    birthTime?: string | null
    gender: string
    birthWeight?: number | null
    birthHeight?: number | null
    birthHeadCircumference?: number | null
    bloodType?: string | null
    allergies?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    growthRecords?: GrowthRecordUncheckedCreateNestedManyWithoutBabyInput
    milestones?: MilestoneUncheckedCreateNestedManyWithoutBabyInput
  }

  export type BabyCreateOrConnectWithoutMediaItemsInput = {
    where: BabyWhereUniqueInput
    create: XOR<BabyCreateWithoutMediaItemsInput, BabyUncheckedCreateWithoutMediaItemsInput>
  }

  export type BabyUpsertWithoutMediaItemsInput = {
    update: XOR<BabyUpdateWithoutMediaItemsInput, BabyUncheckedUpdateWithoutMediaItemsInput>
    create: XOR<BabyCreateWithoutMediaItemsInput, BabyUncheckedCreateWithoutMediaItemsInput>
    where?: BabyWhereInput
  }

  export type BabyUpdateToOneWithWhereWithoutMediaItemsInput = {
    where?: BabyWhereInput
    data: XOR<BabyUpdateWithoutMediaItemsInput, BabyUncheckedUpdateWithoutMediaItemsInput>
  }

  export type BabyUpdateWithoutMediaItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthTime?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    birthWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeadCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    growthRecords?: GrowthRecordUpdateManyWithoutBabyNestedInput
    milestones?: MilestoneUpdateManyWithoutBabyNestedInput
  }

  export type BabyUncheckedUpdateWithoutMediaItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    birthTime?: NullableStringFieldUpdateOperationsInput | string | null
    gender?: StringFieldUpdateOperationsInput | string
    birthWeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeight?: NullableFloatFieldUpdateOperationsInput | number | null
    birthHeadCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    growthRecords?: GrowthRecordUncheckedUpdateManyWithoutBabyNestedInput
    milestones?: MilestoneUncheckedUpdateManyWithoutBabyNestedInput
  }

  export type GrowthRecordCreateManyBabyInput = {
    id?: string
    date: Date | string
    weight?: number | null
    height?: number | null
    headCircumference?: number | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MilestoneCreateManyBabyInput = {
    id?: string
    date: Date | string
    title: string
    description: string
    tags?: MilestoneCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaItemCreateManyBabyInput = {
    id?: string
    date: Date | string
    title: string
    description?: string | null
    url: string
    mediaType: string
    format?: string | null
    thumbnailUrl?: string | null
    duration?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GrowthRecordUpdateWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    headCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrowthRecordUncheckedUpdateWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    headCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GrowthRecordUncheckedUpdateManyWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    headCircumference?: NullableFloatFieldUpdateOperationsInput | number | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneUpdateWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: MilestoneUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneUncheckedUpdateWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: MilestoneUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MilestoneUncheckedUpdateManyWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    tags?: MilestoneUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaItemUpdateWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    mediaType?: StringFieldUpdateOperationsInput | string
    format?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaItemUncheckedUpdateWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    mediaType?: StringFieldUpdateOperationsInput | string
    format?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaItemUncheckedUpdateManyWithoutBabyInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    url?: StringFieldUpdateOperationsInput | string
    mediaType?: StringFieldUpdateOperationsInput | string
    format?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnailUrl?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}