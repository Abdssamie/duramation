
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Credential
 * 
 */
export type Credential = $Result.DefaultSelection<Prisma.$CredentialPayload>
/**
 * Model Workflow
 * 
 */
export type Workflow = $Result.DefaultSelection<Prisma.$WorkflowPayload>
/**
 * Model WorkflowCredential
 * 
 */
export type WorkflowCredential = $Result.DefaultSelection<Prisma.$WorkflowCredentialPayload>
/**
 * Model WorkflowRun
 * 
 */
export type WorkflowRun = $Result.DefaultSelection<Prisma.$WorkflowRunPayload>
/**
 * Model WorkflowTemplate
 * 
 */
export type WorkflowTemplate = $Result.DefaultSelection<Prisma.$WorkflowTemplatePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CredentialType: {
  OAUTH: 'OAUTH',
  API_KEY: 'API_KEY'
};

export type CredentialType = (typeof CredentialType)[keyof typeof CredentialType]


export const Provider: {
  GOOGLE: 'GOOGLE',
  SLACK: 'SLACK',
  HUBSPOT: 'HUBSPOT',
  FIRECRAWL: 'FIRECRAWL',
  CUSTOM: 'CUSTOM'
};

export type Provider = (typeof Provider)[keyof typeof Provider]


export const WorkflowStatus: {
  IDLE: 'IDLE',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

export type WorkflowStatus = (typeof WorkflowStatus)[keyof typeof WorkflowStatus]


export const RunStatus: {
  STARTED: 'STARTED',
  RUNNING: 'RUNNING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED'
};

export type RunStatus = (typeof RunStatus)[keyof typeof RunStatus]

}

export type CredentialType = $Enums.CredentialType

export const CredentialType: typeof $Enums.CredentialType

export type Provider = $Enums.Provider

export const Provider: typeof $Enums.Provider

export type WorkflowStatus = $Enums.WorkflowStatus

export const WorkflowStatus: typeof $Enums.WorkflowStatus

export type RunStatus = $Enums.RunStatus

export const RunStatus: typeof $Enums.RunStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.credential`: Exposes CRUD operations for the **Credential** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Credentials
    * const credentials = await prisma.credential.findMany()
    * ```
    */
  get credential(): Prisma.CredentialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workflow`: Exposes CRUD operations for the **Workflow** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workflows
    * const workflows = await prisma.workflow.findMany()
    * ```
    */
  get workflow(): Prisma.WorkflowDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workflowCredential`: Exposes CRUD operations for the **WorkflowCredential** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkflowCredentials
    * const workflowCredentials = await prisma.workflowCredential.findMany()
    * ```
    */
  get workflowCredential(): Prisma.WorkflowCredentialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workflowRun`: Exposes CRUD operations for the **WorkflowRun** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkflowRuns
    * const workflowRuns = await prisma.workflowRun.findMany()
    * ```
    */
  get workflowRun(): Prisma.WorkflowRunDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.workflowTemplate`: Exposes CRUD operations for the **WorkflowTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkflowTemplates
    * const workflowTemplates = await prisma.workflowTemplate.findMany()
    * ```
    */
  get workflowTemplate(): Prisma.WorkflowTemplateDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
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
    User: 'User',
    Credential: 'Credential',
    Workflow: 'Workflow',
    WorkflowCredential: 'WorkflowCredential',
    WorkflowRun: 'WorkflowRun',
    WorkflowTemplate: 'WorkflowTemplate'
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
      modelProps: "user" | "credential" | "workflow" | "workflowCredential" | "workflowRun" | "workflowTemplate"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Credential: {
        payload: Prisma.$CredentialPayload<ExtArgs>
        fields: Prisma.CredentialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CredentialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CredentialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>
          }
          findFirst: {
            args: Prisma.CredentialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CredentialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>
          }
          findMany: {
            args: Prisma.CredentialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>[]
          }
          create: {
            args: Prisma.CredentialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>
          }
          createMany: {
            args: Prisma.CredentialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CredentialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>[]
          }
          delete: {
            args: Prisma.CredentialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>
          }
          update: {
            args: Prisma.CredentialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>
          }
          deleteMany: {
            args: Prisma.CredentialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CredentialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CredentialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>[]
          }
          upsert: {
            args: Prisma.CredentialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredentialPayload>
          }
          aggregate: {
            args: Prisma.CredentialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCredential>
          }
          groupBy: {
            args: Prisma.CredentialGroupByArgs<ExtArgs>
            result: $Utils.Optional<CredentialGroupByOutputType>[]
          }
          count: {
            args: Prisma.CredentialCountArgs<ExtArgs>
            result: $Utils.Optional<CredentialCountAggregateOutputType> | number
          }
        }
      }
      Workflow: {
        payload: Prisma.$WorkflowPayload<ExtArgs>
        fields: Prisma.WorkflowFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          findFirst: {
            args: Prisma.WorkflowFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          findMany: {
            args: Prisma.WorkflowFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>[]
          }
          create: {
            args: Prisma.WorkflowCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          createMany: {
            args: Prisma.WorkflowCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>[]
          }
          delete: {
            args: Prisma.WorkflowDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          update: {
            args: Prisma.WorkflowUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          deleteMany: {
            args: Prisma.WorkflowDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkflowUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>[]
          }
          upsert: {
            args: Prisma.WorkflowUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowPayload>
          }
          aggregate: {
            args: Prisma.WorkflowAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflow>
          }
          groupBy: {
            args: Prisma.WorkflowGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowCountAggregateOutputType> | number
          }
        }
      }
      WorkflowCredential: {
        payload: Prisma.$WorkflowCredentialPayload<ExtArgs>
        fields: Prisma.WorkflowCredentialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowCredentialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCredentialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowCredentialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCredentialPayload>
          }
          findFirst: {
            args: Prisma.WorkflowCredentialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCredentialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowCredentialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCredentialPayload>
          }
          findMany: {
            args: Prisma.WorkflowCredentialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCredentialPayload>[]
          }
          create: {
            args: Prisma.WorkflowCredentialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCredentialPayload>
          }
          createMany: {
            args: Prisma.WorkflowCredentialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowCredentialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCredentialPayload>[]
          }
          delete: {
            args: Prisma.WorkflowCredentialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCredentialPayload>
          }
          update: {
            args: Prisma.WorkflowCredentialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCredentialPayload>
          }
          deleteMany: {
            args: Prisma.WorkflowCredentialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowCredentialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkflowCredentialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCredentialPayload>[]
          }
          upsert: {
            args: Prisma.WorkflowCredentialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowCredentialPayload>
          }
          aggregate: {
            args: Prisma.WorkflowCredentialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflowCredential>
          }
          groupBy: {
            args: Prisma.WorkflowCredentialGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowCredentialGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowCredentialCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowCredentialCountAggregateOutputType> | number
          }
        }
      }
      WorkflowRun: {
        payload: Prisma.$WorkflowRunPayload<ExtArgs>
        fields: Prisma.WorkflowRunFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowRunFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowRunFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>
          }
          findFirst: {
            args: Prisma.WorkflowRunFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowRunFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>
          }
          findMany: {
            args: Prisma.WorkflowRunFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>[]
          }
          create: {
            args: Prisma.WorkflowRunCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>
          }
          createMany: {
            args: Prisma.WorkflowRunCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowRunCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>[]
          }
          delete: {
            args: Prisma.WorkflowRunDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>
          }
          update: {
            args: Prisma.WorkflowRunUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>
          }
          deleteMany: {
            args: Prisma.WorkflowRunDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowRunUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkflowRunUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>[]
          }
          upsert: {
            args: Prisma.WorkflowRunUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowRunPayload>
          }
          aggregate: {
            args: Prisma.WorkflowRunAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflowRun>
          }
          groupBy: {
            args: Prisma.WorkflowRunGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowRunGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowRunCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowRunCountAggregateOutputType> | number
          }
        }
      }
      WorkflowTemplate: {
        payload: Prisma.$WorkflowTemplatePayload<ExtArgs>
        fields: Prisma.WorkflowTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkflowTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkflowTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTemplatePayload>
          }
          findFirst: {
            args: Prisma.WorkflowTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkflowTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTemplatePayload>
          }
          findMany: {
            args: Prisma.WorkflowTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTemplatePayload>[]
          }
          create: {
            args: Prisma.WorkflowTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTemplatePayload>
          }
          createMany: {
            args: Prisma.WorkflowTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkflowTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTemplatePayload>[]
          }
          delete: {
            args: Prisma.WorkflowTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTemplatePayload>
          }
          update: {
            args: Prisma.WorkflowTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTemplatePayload>
          }
          deleteMany: {
            args: Prisma.WorkflowTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkflowTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WorkflowTemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTemplatePayload>[]
          }
          upsert: {
            args: Prisma.WorkflowTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkflowTemplatePayload>
          }
          aggregate: {
            args: Prisma.WorkflowTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkflowTemplate>
          }
          groupBy: {
            args: Prisma.WorkflowTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkflowTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkflowTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<WorkflowTemplateCountAggregateOutputType> | number
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
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
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
    user?: UserOmit
    credential?: CredentialOmit
    workflow?: WorkflowOmit
    workflowCredential?: WorkflowCredentialOmit
    workflowRun?: WorkflowRunOmit
    workflowTemplate?: WorkflowTemplateOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    workflows: number
    credentials: number
    workflowRuns: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflows?: boolean | UserCountOutputTypeCountWorkflowsArgs
    credentials?: boolean | UserCountOutputTypeCountCredentialsArgs
    workflowRuns?: boolean | UserCountOutputTypeCountWorkflowRunsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkflowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCredentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CredentialWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkflowRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowRunWhereInput
  }


  /**
   * Count Type CredentialCountOutputType
   */

  export type CredentialCountOutputType = {
    workflowCredentials: number
  }

  export type CredentialCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflowCredentials?: boolean | CredentialCountOutputTypeCountWorkflowCredentialsArgs
  }

  // Custom InputTypes
  /**
   * CredentialCountOutputType without action
   */
  export type CredentialCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CredentialCountOutputType
     */
    select?: CredentialCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CredentialCountOutputType without action
   */
  export type CredentialCountOutputTypeCountWorkflowCredentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowCredentialWhereInput
  }


  /**
   * Count Type WorkflowCountOutputType
   */

  export type WorkflowCountOutputType = {
    workflowCredentials: number
    workflowRuns: number
  }

  export type WorkflowCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflowCredentials?: boolean | WorkflowCountOutputTypeCountWorkflowCredentialsArgs
    workflowRuns?: boolean | WorkflowCountOutputTypeCountWorkflowRunsArgs
  }

  // Custom InputTypes
  /**
   * WorkflowCountOutputType without action
   */
  export type WorkflowCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCountOutputType
     */
    select?: WorkflowCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkflowCountOutputType without action
   */
  export type WorkflowCountOutputTypeCountWorkflowCredentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowCredentialWhereInput
  }

  /**
   * WorkflowCountOutputType without action
   */
  export type WorkflowCountOutputTypeCountWorkflowRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowRunWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    clerk_id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    phone_number: string | null
    role: string | null
    language: string | null
    is_active: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    clerk_id: string | null
    email: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
    phone_number: string | null
    role: string | null
    language: string | null
    is_active: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    clerk_id: number
    email: number
    name: number
    createdAt: number
    updatedAt: number
    phone_number: number
    role: number
    language: number
    is_active: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    clerk_id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    phone_number?: true
    role?: true
    language?: true
    is_active?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    clerk_id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    phone_number?: true
    role?: true
    language?: true
    is_active?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    clerk_id?: true
    email?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    phone_number?: true
    role?: true
    language?: true
    is_active?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    clerk_id: string
    email: string
    name: string | null
    createdAt: Date
    updatedAt: Date
    phone_number: string | null
    role: string
    language: string
    is_active: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerk_id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    phone_number?: boolean
    role?: boolean
    language?: boolean
    is_active?: boolean
    workflows?: boolean | User$workflowsArgs<ExtArgs>
    credentials?: boolean | User$credentialsArgs<ExtArgs>
    workflowRuns?: boolean | User$workflowRunsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerk_id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    phone_number?: boolean
    role?: boolean
    language?: boolean
    is_active?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerk_id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    phone_number?: boolean
    role?: boolean
    language?: boolean
    is_active?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    clerk_id?: boolean
    email?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    phone_number?: boolean
    role?: boolean
    language?: boolean
    is_active?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clerk_id" | "email" | "name" | "createdAt" | "updatedAt" | "phone_number" | "role" | "language" | "is_active", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflows?: boolean | User$workflowsArgs<ExtArgs>
    credentials?: boolean | User$credentialsArgs<ExtArgs>
    workflowRuns?: boolean | User$workflowRunsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      workflows: Prisma.$WorkflowPayload<ExtArgs>[]
      credentials: Prisma.$CredentialPayload<ExtArgs>[]
      workflowRuns: Prisma.$WorkflowRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clerk_id: string
      email: string
      name: string | null
      createdAt: Date
      updatedAt: Date
      /**
       * @encrypted
       */
      phone_number: string | null
      role: string
      language: string
      is_active: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workflows<T extends User$workflowsArgs<ExtArgs> = {}>(args?: Subset<T, User$workflowsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    credentials<T extends User$credentialsArgs<ExtArgs> = {}>(args?: Subset<T, User$credentialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workflowRuns<T extends User$workflowRunsArgs<ExtArgs> = {}>(args?: Subset<T, User$workflowRunsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly clerk_id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly phone_number: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly language: FieldRef<"User", 'String'>
    readonly is_active: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.workflows
   */
  export type User$workflowsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    where?: WorkflowWhereInput
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    cursor?: WorkflowWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowScalarFieldEnum | WorkflowScalarFieldEnum[]
  }

  /**
   * User.credentials
   */
  export type User$credentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credential
     */
    omit?: CredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    where?: CredentialWhereInput
    orderBy?: CredentialOrderByWithRelationInput | CredentialOrderByWithRelationInput[]
    cursor?: CredentialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CredentialScalarFieldEnum | CredentialScalarFieldEnum[]
  }

  /**
   * User.workflowRuns
   */
  export type User$workflowRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    where?: WorkflowRunWhereInput
    orderBy?: WorkflowRunOrderByWithRelationInput | WorkflowRunOrderByWithRelationInput[]
    cursor?: WorkflowRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowRunScalarFieldEnum | WorkflowRunScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Credential
   */

  export type AggregateCredential = {
    _count: CredentialCountAggregateOutputType | null
    _min: CredentialMinAggregateOutputType | null
    _max: CredentialMaxAggregateOutputType | null
  }

  export type CredentialMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.CredentialType | null
    provider: $Enums.Provider | null
    secret: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CredentialMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.CredentialType | null
    provider: $Enums.Provider | null
    secret: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CredentialCountAggregateOutputType = {
    id: number
    name: number
    type: number
    provider: number
    secret: number
    config: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CredentialMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    provider?: true
    secret?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CredentialMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    provider?: true
    secret?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CredentialCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    provider?: true
    secret?: true
    config?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CredentialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Credential to aggregate.
     */
    where?: CredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Credentials to fetch.
     */
    orderBy?: CredentialOrderByWithRelationInput | CredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Credentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Credentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Credentials
    **/
    _count?: true | CredentialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CredentialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CredentialMaxAggregateInputType
  }

  export type GetCredentialAggregateType<T extends CredentialAggregateArgs> = {
        [P in keyof T & keyof AggregateCredential]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCredential[P]>
      : GetScalarType<T[P], AggregateCredential[P]>
  }




  export type CredentialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CredentialWhereInput
    orderBy?: CredentialOrderByWithAggregationInput | CredentialOrderByWithAggregationInput[]
    by: CredentialScalarFieldEnum[] | CredentialScalarFieldEnum
    having?: CredentialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CredentialCountAggregateInputType | true
    _min?: CredentialMinAggregateInputType
    _max?: CredentialMaxAggregateInputType
  }

  export type CredentialGroupByOutputType = {
    id: string
    name: string
    type: $Enums.CredentialType
    provider: $Enums.Provider
    secret: string
    config: JsonValue | null
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: CredentialCountAggregateOutputType | null
    _min: CredentialMinAggregateOutputType | null
    _max: CredentialMaxAggregateOutputType | null
  }

  type GetCredentialGroupByPayload<T extends CredentialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CredentialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CredentialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CredentialGroupByOutputType[P]>
            : GetScalarType<T[P], CredentialGroupByOutputType[P]>
        }
      >
    >


  export type CredentialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    provider?: boolean
    secret?: boolean
    config?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    workflowCredentials?: boolean | Credential$workflowCredentialsArgs<ExtArgs>
    _count?: boolean | CredentialCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credential"]>

  export type CredentialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    provider?: boolean
    secret?: boolean
    config?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credential"]>

  export type CredentialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    provider?: boolean
    secret?: boolean
    config?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credential"]>

  export type CredentialSelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    provider?: boolean
    secret?: boolean
    config?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CredentialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "provider" | "secret" | "config" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["credential"]>
  export type CredentialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    workflowCredentials?: boolean | Credential$workflowCredentialsArgs<ExtArgs>
    _count?: boolean | CredentialCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CredentialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CredentialIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CredentialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Credential"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      workflowCredentials: Prisma.$WorkflowCredentialPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: $Enums.CredentialType
      provider: $Enums.Provider
      /**
       * @encrypted
       */
      secret: string
      config: Prisma.JsonValue | null
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["credential"]>
    composites: {}
  }

  type CredentialGetPayload<S extends boolean | null | undefined | CredentialDefaultArgs> = $Result.GetResult<Prisma.$CredentialPayload, S>

  type CredentialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CredentialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CredentialCountAggregateInputType | true
    }

  export interface CredentialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Credential'], meta: { name: 'Credential' } }
    /**
     * Find zero or one Credential that matches the filter.
     * @param {CredentialFindUniqueArgs} args - Arguments to find a Credential
     * @example
     * // Get one Credential
     * const credential = await prisma.credential.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CredentialFindUniqueArgs>(args: SelectSubset<T, CredentialFindUniqueArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Credential that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CredentialFindUniqueOrThrowArgs} args - Arguments to find a Credential
     * @example
     * // Get one Credential
     * const credential = await prisma.credential.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CredentialFindUniqueOrThrowArgs>(args: SelectSubset<T, CredentialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Credential that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialFindFirstArgs} args - Arguments to find a Credential
     * @example
     * // Get one Credential
     * const credential = await prisma.credential.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CredentialFindFirstArgs>(args?: SelectSubset<T, CredentialFindFirstArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Credential that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialFindFirstOrThrowArgs} args - Arguments to find a Credential
     * @example
     * // Get one Credential
     * const credential = await prisma.credential.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CredentialFindFirstOrThrowArgs>(args?: SelectSubset<T, CredentialFindFirstOrThrowArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Credentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Credentials
     * const credentials = await prisma.credential.findMany()
     * 
     * // Get first 10 Credentials
     * const credentials = await prisma.credential.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const credentialWithIdOnly = await prisma.credential.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CredentialFindManyArgs>(args?: SelectSubset<T, CredentialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Credential.
     * @param {CredentialCreateArgs} args - Arguments to create a Credential.
     * @example
     * // Create one Credential
     * const Credential = await prisma.credential.create({
     *   data: {
     *     // ... data to create a Credential
     *   }
     * })
     * 
     */
    create<T extends CredentialCreateArgs>(args: SelectSubset<T, CredentialCreateArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Credentials.
     * @param {CredentialCreateManyArgs} args - Arguments to create many Credentials.
     * @example
     * // Create many Credentials
     * const credential = await prisma.credential.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CredentialCreateManyArgs>(args?: SelectSubset<T, CredentialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Credentials and returns the data saved in the database.
     * @param {CredentialCreateManyAndReturnArgs} args - Arguments to create many Credentials.
     * @example
     * // Create many Credentials
     * const credential = await prisma.credential.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Credentials and only return the `id`
     * const credentialWithIdOnly = await prisma.credential.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CredentialCreateManyAndReturnArgs>(args?: SelectSubset<T, CredentialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Credential.
     * @param {CredentialDeleteArgs} args - Arguments to delete one Credential.
     * @example
     * // Delete one Credential
     * const Credential = await prisma.credential.delete({
     *   where: {
     *     // ... filter to delete one Credential
     *   }
     * })
     * 
     */
    delete<T extends CredentialDeleteArgs>(args: SelectSubset<T, CredentialDeleteArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Credential.
     * @param {CredentialUpdateArgs} args - Arguments to update one Credential.
     * @example
     * // Update one Credential
     * const credential = await prisma.credential.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CredentialUpdateArgs>(args: SelectSubset<T, CredentialUpdateArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Credentials.
     * @param {CredentialDeleteManyArgs} args - Arguments to filter Credentials to delete.
     * @example
     * // Delete a few Credentials
     * const { count } = await prisma.credential.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CredentialDeleteManyArgs>(args?: SelectSubset<T, CredentialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Credentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Credentials
     * const credential = await prisma.credential.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CredentialUpdateManyArgs>(args: SelectSubset<T, CredentialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Credentials and returns the data updated in the database.
     * @param {CredentialUpdateManyAndReturnArgs} args - Arguments to update many Credentials.
     * @example
     * // Update many Credentials
     * const credential = await prisma.credential.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Credentials and only return the `id`
     * const credentialWithIdOnly = await prisma.credential.updateManyAndReturn({
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
    updateManyAndReturn<T extends CredentialUpdateManyAndReturnArgs>(args: SelectSubset<T, CredentialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Credential.
     * @param {CredentialUpsertArgs} args - Arguments to update or create a Credential.
     * @example
     * // Update or create a Credential
     * const credential = await prisma.credential.upsert({
     *   create: {
     *     // ... data to create a Credential
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Credential we want to update
     *   }
     * })
     */
    upsert<T extends CredentialUpsertArgs>(args: SelectSubset<T, CredentialUpsertArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Credentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialCountArgs} args - Arguments to filter Credentials to count.
     * @example
     * // Count the number of Credentials
     * const count = await prisma.credential.count({
     *   where: {
     *     // ... the filter for the Credentials we want to count
     *   }
     * })
    **/
    count<T extends CredentialCountArgs>(
      args?: Subset<T, CredentialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CredentialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Credential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CredentialAggregateArgs>(args: Subset<T, CredentialAggregateArgs>): Prisma.PrismaPromise<GetCredentialAggregateType<T>>

    /**
     * Group by Credential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredentialGroupByArgs} args - Group by arguments.
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
      T extends CredentialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CredentialGroupByArgs['orderBy'] }
        : { orderBy?: CredentialGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CredentialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCredentialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Credential model
   */
  readonly fields: CredentialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Credential.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CredentialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workflowCredentials<T extends Credential$workflowCredentialsArgs<ExtArgs> = {}>(args?: Subset<T, Credential$workflowCredentialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowCredentialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Credential model
   */
  interface CredentialFieldRefs {
    readonly id: FieldRef<"Credential", 'String'>
    readonly name: FieldRef<"Credential", 'String'>
    readonly type: FieldRef<"Credential", 'CredentialType'>
    readonly provider: FieldRef<"Credential", 'Provider'>
    readonly secret: FieldRef<"Credential", 'String'>
    readonly config: FieldRef<"Credential", 'Json'>
    readonly userId: FieldRef<"Credential", 'String'>
    readonly createdAt: FieldRef<"Credential", 'DateTime'>
    readonly updatedAt: FieldRef<"Credential", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Credential findUnique
   */
  export type CredentialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credential
     */
    omit?: CredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * Filter, which Credential to fetch.
     */
    where: CredentialWhereUniqueInput
  }

  /**
   * Credential findUniqueOrThrow
   */
  export type CredentialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credential
     */
    omit?: CredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * Filter, which Credential to fetch.
     */
    where: CredentialWhereUniqueInput
  }

  /**
   * Credential findFirst
   */
  export type CredentialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credential
     */
    omit?: CredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * Filter, which Credential to fetch.
     */
    where?: CredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Credentials to fetch.
     */
    orderBy?: CredentialOrderByWithRelationInput | CredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Credentials.
     */
    cursor?: CredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Credentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Credentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Credentials.
     */
    distinct?: CredentialScalarFieldEnum | CredentialScalarFieldEnum[]
  }

  /**
   * Credential findFirstOrThrow
   */
  export type CredentialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credential
     */
    omit?: CredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * Filter, which Credential to fetch.
     */
    where?: CredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Credentials to fetch.
     */
    orderBy?: CredentialOrderByWithRelationInput | CredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Credentials.
     */
    cursor?: CredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Credentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Credentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Credentials.
     */
    distinct?: CredentialScalarFieldEnum | CredentialScalarFieldEnum[]
  }

  /**
   * Credential findMany
   */
  export type CredentialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credential
     */
    omit?: CredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * Filter, which Credentials to fetch.
     */
    where?: CredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Credentials to fetch.
     */
    orderBy?: CredentialOrderByWithRelationInput | CredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Credentials.
     */
    cursor?: CredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Credentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Credentials.
     */
    skip?: number
    distinct?: CredentialScalarFieldEnum | CredentialScalarFieldEnum[]
  }

  /**
   * Credential create
   */
  export type CredentialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credential
     */
    omit?: CredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * The data needed to create a Credential.
     */
    data: XOR<CredentialCreateInput, CredentialUncheckedCreateInput>
  }

  /**
   * Credential createMany
   */
  export type CredentialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Credentials.
     */
    data: CredentialCreateManyInput | CredentialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Credential createManyAndReturn
   */
  export type CredentialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Credential
     */
    omit?: CredentialOmit<ExtArgs> | null
    /**
     * The data used to create many Credentials.
     */
    data: CredentialCreateManyInput | CredentialCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Credential update
   */
  export type CredentialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credential
     */
    omit?: CredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * The data needed to update a Credential.
     */
    data: XOR<CredentialUpdateInput, CredentialUncheckedUpdateInput>
    /**
     * Choose, which Credential to update.
     */
    where: CredentialWhereUniqueInput
  }

  /**
   * Credential updateMany
   */
  export type CredentialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Credentials.
     */
    data: XOR<CredentialUpdateManyMutationInput, CredentialUncheckedUpdateManyInput>
    /**
     * Filter which Credentials to update
     */
    where?: CredentialWhereInput
    /**
     * Limit how many Credentials to update.
     */
    limit?: number
  }

  /**
   * Credential updateManyAndReturn
   */
  export type CredentialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Credential
     */
    omit?: CredentialOmit<ExtArgs> | null
    /**
     * The data used to update Credentials.
     */
    data: XOR<CredentialUpdateManyMutationInput, CredentialUncheckedUpdateManyInput>
    /**
     * Filter which Credentials to update
     */
    where?: CredentialWhereInput
    /**
     * Limit how many Credentials to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Credential upsert
   */
  export type CredentialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credential
     */
    omit?: CredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * The filter to search for the Credential to update in case it exists.
     */
    where: CredentialWhereUniqueInput
    /**
     * In case the Credential found by the `where` argument doesn't exist, create a new Credential with this data.
     */
    create: XOR<CredentialCreateInput, CredentialUncheckedCreateInput>
    /**
     * In case the Credential was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CredentialUpdateInput, CredentialUncheckedUpdateInput>
  }

  /**
   * Credential delete
   */
  export type CredentialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credential
     */
    omit?: CredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
    /**
     * Filter which Credential to delete.
     */
    where: CredentialWhereUniqueInput
  }

  /**
   * Credential deleteMany
   */
  export type CredentialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Credentials to delete
     */
    where?: CredentialWhereInput
    /**
     * Limit how many Credentials to delete.
     */
    limit?: number
  }

  /**
   * Credential.workflowCredentials
   */
  export type Credential$workflowCredentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCredential
     */
    select?: WorkflowCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCredential
     */
    omit?: WorkflowCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCredentialInclude<ExtArgs> | null
    where?: WorkflowCredentialWhereInput
    orderBy?: WorkflowCredentialOrderByWithRelationInput | WorkflowCredentialOrderByWithRelationInput[]
    cursor?: WorkflowCredentialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowCredentialScalarFieldEnum | WorkflowCredentialScalarFieldEnum[]
  }

  /**
   * Credential without action
   */
  export type CredentialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credential
     */
    select?: CredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credential
     */
    omit?: CredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredentialInclude<ExtArgs> | null
  }


  /**
   * Model Workflow
   */

  export type AggregateWorkflow = {
    _count: WorkflowCountAggregateOutputType | null
    _min: WorkflowMinAggregateOutputType | null
    _max: WorkflowMaxAggregateOutputType | null
  }

  export type WorkflowMinAggregateOutputType = {
    id: string | null
    name: string | null
    templateId: string | null
    description: string | null
    available: boolean | null
    status: $Enums.WorkflowStatus | null
    canBeScheduled: boolean | null
    idempotencyKey: string | null
    timezone: string | null
    lastRunAt: Date | null
    nextRunAt: Date | null
    eventName: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type WorkflowMaxAggregateOutputType = {
    id: string | null
    name: string | null
    templateId: string | null
    description: string | null
    available: boolean | null
    status: $Enums.WorkflowStatus | null
    canBeScheduled: boolean | null
    idempotencyKey: string | null
    timezone: string | null
    lastRunAt: Date | null
    nextRunAt: Date | null
    eventName: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type WorkflowCountAggregateOutputType = {
    id: number
    name: number
    templateId: number
    description: number
    available: number
    status: number
    canBeScheduled: number
    idempotencyKey: number
    cronExpressions: number
    timezone: number
    lastRunAt: number
    nextRunAt: number
    fields: number
    input: number
    eventName: number
    createdAt: number
    updatedAt: number
    userId: number
    requiredProviders: number
    config: number
    _all: number
  }


  export type WorkflowMinAggregateInputType = {
    id?: true
    name?: true
    templateId?: true
    description?: true
    available?: true
    status?: true
    canBeScheduled?: true
    idempotencyKey?: true
    timezone?: true
    lastRunAt?: true
    nextRunAt?: true
    eventName?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type WorkflowMaxAggregateInputType = {
    id?: true
    name?: true
    templateId?: true
    description?: true
    available?: true
    status?: true
    canBeScheduled?: true
    idempotencyKey?: true
    timezone?: true
    lastRunAt?: true
    nextRunAt?: true
    eventName?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type WorkflowCountAggregateInputType = {
    id?: true
    name?: true
    templateId?: true
    description?: true
    available?: true
    status?: true
    canBeScheduled?: true
    idempotencyKey?: true
    cronExpressions?: true
    timezone?: true
    lastRunAt?: true
    nextRunAt?: true
    fields?: true
    input?: true
    eventName?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    requiredProviders?: true
    config?: true
    _all?: true
  }

  export type WorkflowAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workflow to aggregate.
     */
    where?: WorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workflows to fetch.
     */
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Workflows
    **/
    _count?: true | WorkflowCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowMaxAggregateInputType
  }

  export type GetWorkflowAggregateType<T extends WorkflowAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflow]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflow[P]>
      : GetScalarType<T[P], AggregateWorkflow[P]>
  }




  export type WorkflowGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowWhereInput
    orderBy?: WorkflowOrderByWithAggregationInput | WorkflowOrderByWithAggregationInput[]
    by: WorkflowScalarFieldEnum[] | WorkflowScalarFieldEnum
    having?: WorkflowScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowCountAggregateInputType | true
    _min?: WorkflowMinAggregateInputType
    _max?: WorkflowMaxAggregateInputType
  }

  export type WorkflowGroupByOutputType = {
    id: string
    name: string
    templateId: string
    description: string | null
    available: boolean
    status: $Enums.WorkflowStatus
    canBeScheduled: boolean
    idempotencyKey: string | null
    cronExpressions: string[]
    timezone: string | null
    lastRunAt: Date | null
    nextRunAt: Date | null
    fields: JsonValue | null
    input: JsonValue | null
    eventName: string
    createdAt: Date
    updatedAt: Date
    userId: string
    requiredProviders: $Enums.Provider[]
    config: JsonValue | null
    _count: WorkflowCountAggregateOutputType | null
    _min: WorkflowMinAggregateOutputType | null
    _max: WorkflowMaxAggregateOutputType | null
  }

  type GetWorkflowGroupByPayload<T extends WorkflowGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    templateId?: boolean
    description?: boolean
    available?: boolean
    status?: boolean
    canBeScheduled?: boolean
    idempotencyKey?: boolean
    cronExpressions?: boolean
    timezone?: boolean
    lastRunAt?: boolean
    nextRunAt?: boolean
    fields?: boolean
    input?: boolean
    eventName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    requiredProviders?: boolean
    config?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    workflowCredentials?: boolean | Workflow$workflowCredentialsArgs<ExtArgs>
    workflowRuns?: boolean | Workflow$workflowRunsArgs<ExtArgs>
    _count?: boolean | WorkflowCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflow"]>

  export type WorkflowSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    templateId?: boolean
    description?: boolean
    available?: boolean
    status?: boolean
    canBeScheduled?: boolean
    idempotencyKey?: boolean
    cronExpressions?: boolean
    timezone?: boolean
    lastRunAt?: boolean
    nextRunAt?: boolean
    fields?: boolean
    input?: boolean
    eventName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    requiredProviders?: boolean
    config?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflow"]>

  export type WorkflowSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    templateId?: boolean
    description?: boolean
    available?: boolean
    status?: boolean
    canBeScheduled?: boolean
    idempotencyKey?: boolean
    cronExpressions?: boolean
    timezone?: boolean
    lastRunAt?: boolean
    nextRunAt?: boolean
    fields?: boolean
    input?: boolean
    eventName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    requiredProviders?: boolean
    config?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflow"]>

  export type WorkflowSelectScalar = {
    id?: boolean
    name?: boolean
    templateId?: boolean
    description?: boolean
    available?: boolean
    status?: boolean
    canBeScheduled?: boolean
    idempotencyKey?: boolean
    cronExpressions?: boolean
    timezone?: boolean
    lastRunAt?: boolean
    nextRunAt?: boolean
    fields?: boolean
    input?: boolean
    eventName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    requiredProviders?: boolean
    config?: boolean
  }

  export type WorkflowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "templateId" | "description" | "available" | "status" | "canBeScheduled" | "idempotencyKey" | "cronExpressions" | "timezone" | "lastRunAt" | "nextRunAt" | "fields" | "input" | "eventName" | "createdAt" | "updatedAt" | "userId" | "requiredProviders" | "config", ExtArgs["result"]["workflow"]>
  export type WorkflowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    workflowCredentials?: boolean | Workflow$workflowCredentialsArgs<ExtArgs>
    workflowRuns?: boolean | Workflow$workflowRunsArgs<ExtArgs>
    _count?: boolean | WorkflowCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkflowIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorkflowIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WorkflowPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Workflow"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      workflowCredentials: Prisma.$WorkflowCredentialPayload<ExtArgs>[]
      workflowRuns: Prisma.$WorkflowRunPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      templateId: string
      description: string | null
      available: boolean
      status: $Enums.WorkflowStatus
      canBeScheduled: boolean
      idempotencyKey: string | null
      cronExpressions: string[]
      timezone: string | null
      lastRunAt: Date | null
      nextRunAt: Date | null
      fields: Prisma.JsonValue | null
      input: Prisma.JsonValue | null
      eventName: string
      createdAt: Date
      updatedAt: Date
      userId: string
      requiredProviders: $Enums.Provider[]
      config: Prisma.JsonValue | null
    }, ExtArgs["result"]["workflow"]>
    composites: {}
  }

  type WorkflowGetPayload<S extends boolean | null | undefined | WorkflowDefaultArgs> = $Result.GetResult<Prisma.$WorkflowPayload, S>

  type WorkflowCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkflowFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkflowCountAggregateInputType | true
    }

  export interface WorkflowDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Workflow'], meta: { name: 'Workflow' } }
    /**
     * Find zero or one Workflow that matches the filter.
     * @param {WorkflowFindUniqueArgs} args - Arguments to find a Workflow
     * @example
     * // Get one Workflow
     * const workflow = await prisma.workflow.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowFindUniqueArgs>(args: SelectSubset<T, WorkflowFindUniqueArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Workflow that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkflowFindUniqueOrThrowArgs} args - Arguments to find a Workflow
     * @example
     * // Get one Workflow
     * const workflow = await prisma.workflow.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workflow that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowFindFirstArgs} args - Arguments to find a Workflow
     * @example
     * // Get one Workflow
     * const workflow = await prisma.workflow.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowFindFirstArgs>(args?: SelectSubset<T, WorkflowFindFirstArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Workflow that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowFindFirstOrThrowArgs} args - Arguments to find a Workflow
     * @example
     * // Get one Workflow
     * const workflow = await prisma.workflow.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Workflows that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workflows
     * const workflows = await prisma.workflow.findMany()
     * 
     * // Get first 10 Workflows
     * const workflows = await prisma.workflow.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowWithIdOnly = await prisma.workflow.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowFindManyArgs>(args?: SelectSubset<T, WorkflowFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Workflow.
     * @param {WorkflowCreateArgs} args - Arguments to create a Workflow.
     * @example
     * // Create one Workflow
     * const Workflow = await prisma.workflow.create({
     *   data: {
     *     // ... data to create a Workflow
     *   }
     * })
     * 
     */
    create<T extends WorkflowCreateArgs>(args: SelectSubset<T, WorkflowCreateArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Workflows.
     * @param {WorkflowCreateManyArgs} args - Arguments to create many Workflows.
     * @example
     * // Create many Workflows
     * const workflow = await prisma.workflow.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowCreateManyArgs>(args?: SelectSubset<T, WorkflowCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Workflows and returns the data saved in the database.
     * @param {WorkflowCreateManyAndReturnArgs} args - Arguments to create many Workflows.
     * @example
     * // Create many Workflows
     * const workflow = await prisma.workflow.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Workflows and only return the `id`
     * const workflowWithIdOnly = await prisma.workflow.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Workflow.
     * @param {WorkflowDeleteArgs} args - Arguments to delete one Workflow.
     * @example
     * // Delete one Workflow
     * const Workflow = await prisma.workflow.delete({
     *   where: {
     *     // ... filter to delete one Workflow
     *   }
     * })
     * 
     */
    delete<T extends WorkflowDeleteArgs>(args: SelectSubset<T, WorkflowDeleteArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Workflow.
     * @param {WorkflowUpdateArgs} args - Arguments to update one Workflow.
     * @example
     * // Update one Workflow
     * const workflow = await prisma.workflow.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowUpdateArgs>(args: SelectSubset<T, WorkflowUpdateArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Workflows.
     * @param {WorkflowDeleteManyArgs} args - Arguments to filter Workflows to delete.
     * @example
     * // Delete a few Workflows
     * const { count } = await prisma.workflow.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowDeleteManyArgs>(args?: SelectSubset<T, WorkflowDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workflows
     * const workflow = await prisma.workflow.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowUpdateManyArgs>(args: SelectSubset<T, WorkflowUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workflows and returns the data updated in the database.
     * @param {WorkflowUpdateManyAndReturnArgs} args - Arguments to update many Workflows.
     * @example
     * // Update many Workflows
     * const workflow = await prisma.workflow.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Workflows and only return the `id`
     * const workflowWithIdOnly = await prisma.workflow.updateManyAndReturn({
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
    updateManyAndReturn<T extends WorkflowUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkflowUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Workflow.
     * @param {WorkflowUpsertArgs} args - Arguments to update or create a Workflow.
     * @example
     * // Update or create a Workflow
     * const workflow = await prisma.workflow.upsert({
     *   create: {
     *     // ... data to create a Workflow
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workflow we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowUpsertArgs>(args: SelectSubset<T, WorkflowUpsertArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Workflows.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCountArgs} args - Arguments to filter Workflows to count.
     * @example
     * // Count the number of Workflows
     * const count = await prisma.workflow.count({
     *   where: {
     *     // ... the filter for the Workflows we want to count
     *   }
     * })
    **/
    count<T extends WorkflowCountArgs>(
      args?: Subset<T, WorkflowCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Workflow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkflowAggregateArgs>(args: Subset<T, WorkflowAggregateArgs>): Prisma.PrismaPromise<GetWorkflowAggregateType<T>>

    /**
     * Group by Workflow.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowGroupByArgs} args - Group by arguments.
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
      T extends WorkflowGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorkflowGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Workflow model
   */
  readonly fields: WorkflowFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Workflow.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    workflowCredentials<T extends Workflow$workflowCredentialsArgs<ExtArgs> = {}>(args?: Subset<T, Workflow$workflowCredentialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowCredentialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    workflowRuns<T extends Workflow$workflowRunsArgs<ExtArgs> = {}>(args?: Subset<T, Workflow$workflowRunsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Workflow model
   */
  interface WorkflowFieldRefs {
    readonly id: FieldRef<"Workflow", 'String'>
    readonly name: FieldRef<"Workflow", 'String'>
    readonly templateId: FieldRef<"Workflow", 'String'>
    readonly description: FieldRef<"Workflow", 'String'>
    readonly available: FieldRef<"Workflow", 'Boolean'>
    readonly status: FieldRef<"Workflow", 'WorkflowStatus'>
    readonly canBeScheduled: FieldRef<"Workflow", 'Boolean'>
    readonly idempotencyKey: FieldRef<"Workflow", 'String'>
    readonly cronExpressions: FieldRef<"Workflow", 'String[]'>
    readonly timezone: FieldRef<"Workflow", 'String'>
    readonly lastRunAt: FieldRef<"Workflow", 'DateTime'>
    readonly nextRunAt: FieldRef<"Workflow", 'DateTime'>
    readonly fields: FieldRef<"Workflow", 'Json'>
    readonly input: FieldRef<"Workflow", 'Json'>
    readonly eventName: FieldRef<"Workflow", 'String'>
    readonly createdAt: FieldRef<"Workflow", 'DateTime'>
    readonly updatedAt: FieldRef<"Workflow", 'DateTime'>
    readonly userId: FieldRef<"Workflow", 'String'>
    readonly requiredProviders: FieldRef<"Workflow", 'Provider[]'>
    readonly config: FieldRef<"Workflow", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Workflow findUnique
   */
  export type WorkflowFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflow to fetch.
     */
    where: WorkflowWhereUniqueInput
  }

  /**
   * Workflow findUniqueOrThrow
   */
  export type WorkflowFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflow to fetch.
     */
    where: WorkflowWhereUniqueInput
  }

  /**
   * Workflow findFirst
   */
  export type WorkflowFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflow to fetch.
     */
    where?: WorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workflows to fetch.
     */
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workflows.
     */
    cursor?: WorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workflows.
     */
    distinct?: WorkflowScalarFieldEnum | WorkflowScalarFieldEnum[]
  }

  /**
   * Workflow findFirstOrThrow
   */
  export type WorkflowFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflow to fetch.
     */
    where?: WorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workflows to fetch.
     */
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workflows.
     */
    cursor?: WorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workflows.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workflows.
     */
    distinct?: WorkflowScalarFieldEnum | WorkflowScalarFieldEnum[]
  }

  /**
   * Workflow findMany
   */
  export type WorkflowFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter, which Workflows to fetch.
     */
    where?: WorkflowWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workflows to fetch.
     */
    orderBy?: WorkflowOrderByWithRelationInput | WorkflowOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Workflows.
     */
    cursor?: WorkflowWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workflows from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workflows.
     */
    skip?: number
    distinct?: WorkflowScalarFieldEnum | WorkflowScalarFieldEnum[]
  }

  /**
   * Workflow create
   */
  export type WorkflowCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * The data needed to create a Workflow.
     */
    data: XOR<WorkflowCreateInput, WorkflowUncheckedCreateInput>
  }

  /**
   * Workflow createMany
   */
  export type WorkflowCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Workflows.
     */
    data: WorkflowCreateManyInput | WorkflowCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workflow createManyAndReturn
   */
  export type WorkflowCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * The data used to create many Workflows.
     */
    data: WorkflowCreateManyInput | WorkflowCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Workflow update
   */
  export type WorkflowUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * The data needed to update a Workflow.
     */
    data: XOR<WorkflowUpdateInput, WorkflowUncheckedUpdateInput>
    /**
     * Choose, which Workflow to update.
     */
    where: WorkflowWhereUniqueInput
  }

  /**
   * Workflow updateMany
   */
  export type WorkflowUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Workflows.
     */
    data: XOR<WorkflowUpdateManyMutationInput, WorkflowUncheckedUpdateManyInput>
    /**
     * Filter which Workflows to update
     */
    where?: WorkflowWhereInput
    /**
     * Limit how many Workflows to update.
     */
    limit?: number
  }

  /**
   * Workflow updateManyAndReturn
   */
  export type WorkflowUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * The data used to update Workflows.
     */
    data: XOR<WorkflowUpdateManyMutationInput, WorkflowUncheckedUpdateManyInput>
    /**
     * Filter which Workflows to update
     */
    where?: WorkflowWhereInput
    /**
     * Limit how many Workflows to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Workflow upsert
   */
  export type WorkflowUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * The filter to search for the Workflow to update in case it exists.
     */
    where: WorkflowWhereUniqueInput
    /**
     * In case the Workflow found by the `where` argument doesn't exist, create a new Workflow with this data.
     */
    create: XOR<WorkflowCreateInput, WorkflowUncheckedCreateInput>
    /**
     * In case the Workflow was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowUpdateInput, WorkflowUncheckedUpdateInput>
  }

  /**
   * Workflow delete
   */
  export type WorkflowDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
    /**
     * Filter which Workflow to delete.
     */
    where: WorkflowWhereUniqueInput
  }

  /**
   * Workflow deleteMany
   */
  export type WorkflowDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workflows to delete
     */
    where?: WorkflowWhereInput
    /**
     * Limit how many Workflows to delete.
     */
    limit?: number
  }

  /**
   * Workflow.workflowCredentials
   */
  export type Workflow$workflowCredentialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCredential
     */
    select?: WorkflowCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCredential
     */
    omit?: WorkflowCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCredentialInclude<ExtArgs> | null
    where?: WorkflowCredentialWhereInput
    orderBy?: WorkflowCredentialOrderByWithRelationInput | WorkflowCredentialOrderByWithRelationInput[]
    cursor?: WorkflowCredentialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowCredentialScalarFieldEnum | WorkflowCredentialScalarFieldEnum[]
  }

  /**
   * Workflow.workflowRuns
   */
  export type Workflow$workflowRunsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    where?: WorkflowRunWhereInput
    orderBy?: WorkflowRunOrderByWithRelationInput | WorkflowRunOrderByWithRelationInput[]
    cursor?: WorkflowRunWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkflowRunScalarFieldEnum | WorkflowRunScalarFieldEnum[]
  }

  /**
   * Workflow without action
   */
  export type WorkflowDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workflow
     */
    select?: WorkflowSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Workflow
     */
    omit?: WorkflowOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowInclude<ExtArgs> | null
  }


  /**
   * Model WorkflowCredential
   */

  export type AggregateWorkflowCredential = {
    _count: WorkflowCredentialCountAggregateOutputType | null
    _min: WorkflowCredentialMinAggregateOutputType | null
    _max: WorkflowCredentialMaxAggregateOutputType | null
  }

  export type WorkflowCredentialMinAggregateOutputType = {
    workflowId: string | null
    credentialId: string | null
  }

  export type WorkflowCredentialMaxAggregateOutputType = {
    workflowId: string | null
    credentialId: string | null
  }

  export type WorkflowCredentialCountAggregateOutputType = {
    workflowId: number
    credentialId: number
    _all: number
  }


  export type WorkflowCredentialMinAggregateInputType = {
    workflowId?: true
    credentialId?: true
  }

  export type WorkflowCredentialMaxAggregateInputType = {
    workflowId?: true
    credentialId?: true
  }

  export type WorkflowCredentialCountAggregateInputType = {
    workflowId?: true
    credentialId?: true
    _all?: true
  }

  export type WorkflowCredentialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowCredential to aggregate.
     */
    where?: WorkflowCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowCredentials to fetch.
     */
    orderBy?: WorkflowCredentialOrderByWithRelationInput | WorkflowCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkflowCredentials
    **/
    _count?: true | WorkflowCredentialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowCredentialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowCredentialMaxAggregateInputType
  }

  export type GetWorkflowCredentialAggregateType<T extends WorkflowCredentialAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflowCredential]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflowCredential[P]>
      : GetScalarType<T[P], AggregateWorkflowCredential[P]>
  }




  export type WorkflowCredentialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowCredentialWhereInput
    orderBy?: WorkflowCredentialOrderByWithAggregationInput | WorkflowCredentialOrderByWithAggregationInput[]
    by: WorkflowCredentialScalarFieldEnum[] | WorkflowCredentialScalarFieldEnum
    having?: WorkflowCredentialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowCredentialCountAggregateInputType | true
    _min?: WorkflowCredentialMinAggregateInputType
    _max?: WorkflowCredentialMaxAggregateInputType
  }

  export type WorkflowCredentialGroupByOutputType = {
    workflowId: string
    credentialId: string
    _count: WorkflowCredentialCountAggregateOutputType | null
    _min: WorkflowCredentialMinAggregateOutputType | null
    _max: WorkflowCredentialMaxAggregateOutputType | null
  }

  type GetWorkflowCredentialGroupByPayload<T extends WorkflowCredentialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowCredentialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowCredentialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowCredentialGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowCredentialGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowCredentialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    workflowId?: boolean
    credentialId?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
    credential?: boolean | CredentialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowCredential"]>

  export type WorkflowCredentialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    workflowId?: boolean
    credentialId?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
    credential?: boolean | CredentialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowCredential"]>

  export type WorkflowCredentialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    workflowId?: boolean
    credentialId?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
    credential?: boolean | CredentialDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowCredential"]>

  export type WorkflowCredentialSelectScalar = {
    workflowId?: boolean
    credentialId?: boolean
  }

  export type WorkflowCredentialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"workflowId" | "credentialId", ExtArgs["result"]["workflowCredential"]>
  export type WorkflowCredentialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
    credential?: boolean | CredentialDefaultArgs<ExtArgs>
  }
  export type WorkflowCredentialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
    credential?: boolean | CredentialDefaultArgs<ExtArgs>
  }
  export type WorkflowCredentialIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
    credential?: boolean | CredentialDefaultArgs<ExtArgs>
  }

  export type $WorkflowCredentialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkflowCredential"
    objects: {
      workflow: Prisma.$WorkflowPayload<ExtArgs>
      credential: Prisma.$CredentialPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      workflowId: string
      credentialId: string
    }, ExtArgs["result"]["workflowCredential"]>
    composites: {}
  }

  type WorkflowCredentialGetPayload<S extends boolean | null | undefined | WorkflowCredentialDefaultArgs> = $Result.GetResult<Prisma.$WorkflowCredentialPayload, S>

  type WorkflowCredentialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkflowCredentialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkflowCredentialCountAggregateInputType | true
    }

  export interface WorkflowCredentialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkflowCredential'], meta: { name: 'WorkflowCredential' } }
    /**
     * Find zero or one WorkflowCredential that matches the filter.
     * @param {WorkflowCredentialFindUniqueArgs} args - Arguments to find a WorkflowCredential
     * @example
     * // Get one WorkflowCredential
     * const workflowCredential = await prisma.workflowCredential.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowCredentialFindUniqueArgs>(args: SelectSubset<T, WorkflowCredentialFindUniqueArgs<ExtArgs>>): Prisma__WorkflowCredentialClient<$Result.GetResult<Prisma.$WorkflowCredentialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkflowCredential that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkflowCredentialFindUniqueOrThrowArgs} args - Arguments to find a WorkflowCredential
     * @example
     * // Get one WorkflowCredential
     * const workflowCredential = await prisma.workflowCredential.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowCredentialFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowCredentialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowCredentialClient<$Result.GetResult<Prisma.$WorkflowCredentialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowCredential that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCredentialFindFirstArgs} args - Arguments to find a WorkflowCredential
     * @example
     * // Get one WorkflowCredential
     * const workflowCredential = await prisma.workflowCredential.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowCredentialFindFirstArgs>(args?: SelectSubset<T, WorkflowCredentialFindFirstArgs<ExtArgs>>): Prisma__WorkflowCredentialClient<$Result.GetResult<Prisma.$WorkflowCredentialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowCredential that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCredentialFindFirstOrThrowArgs} args - Arguments to find a WorkflowCredential
     * @example
     * // Get one WorkflowCredential
     * const workflowCredential = await prisma.workflowCredential.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowCredentialFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowCredentialFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowCredentialClient<$Result.GetResult<Prisma.$WorkflowCredentialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkflowCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCredentialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkflowCredentials
     * const workflowCredentials = await prisma.workflowCredential.findMany()
     * 
     * // Get first 10 WorkflowCredentials
     * const workflowCredentials = await prisma.workflowCredential.findMany({ take: 10 })
     * 
     * // Only select the `workflowId`
     * const workflowCredentialWithWorkflowIdOnly = await prisma.workflowCredential.findMany({ select: { workflowId: true } })
     * 
     */
    findMany<T extends WorkflowCredentialFindManyArgs>(args?: SelectSubset<T, WorkflowCredentialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowCredentialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkflowCredential.
     * @param {WorkflowCredentialCreateArgs} args - Arguments to create a WorkflowCredential.
     * @example
     * // Create one WorkflowCredential
     * const WorkflowCredential = await prisma.workflowCredential.create({
     *   data: {
     *     // ... data to create a WorkflowCredential
     *   }
     * })
     * 
     */
    create<T extends WorkflowCredentialCreateArgs>(args: SelectSubset<T, WorkflowCredentialCreateArgs<ExtArgs>>): Prisma__WorkflowCredentialClient<$Result.GetResult<Prisma.$WorkflowCredentialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkflowCredentials.
     * @param {WorkflowCredentialCreateManyArgs} args - Arguments to create many WorkflowCredentials.
     * @example
     * // Create many WorkflowCredentials
     * const workflowCredential = await prisma.workflowCredential.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowCredentialCreateManyArgs>(args?: SelectSubset<T, WorkflowCredentialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkflowCredentials and returns the data saved in the database.
     * @param {WorkflowCredentialCreateManyAndReturnArgs} args - Arguments to create many WorkflowCredentials.
     * @example
     * // Create many WorkflowCredentials
     * const workflowCredential = await prisma.workflowCredential.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkflowCredentials and only return the `workflowId`
     * const workflowCredentialWithWorkflowIdOnly = await prisma.workflowCredential.createManyAndReturn({
     *   select: { workflowId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowCredentialCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowCredentialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowCredentialPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkflowCredential.
     * @param {WorkflowCredentialDeleteArgs} args - Arguments to delete one WorkflowCredential.
     * @example
     * // Delete one WorkflowCredential
     * const WorkflowCredential = await prisma.workflowCredential.delete({
     *   where: {
     *     // ... filter to delete one WorkflowCredential
     *   }
     * })
     * 
     */
    delete<T extends WorkflowCredentialDeleteArgs>(args: SelectSubset<T, WorkflowCredentialDeleteArgs<ExtArgs>>): Prisma__WorkflowCredentialClient<$Result.GetResult<Prisma.$WorkflowCredentialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkflowCredential.
     * @param {WorkflowCredentialUpdateArgs} args - Arguments to update one WorkflowCredential.
     * @example
     * // Update one WorkflowCredential
     * const workflowCredential = await prisma.workflowCredential.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowCredentialUpdateArgs>(args: SelectSubset<T, WorkflowCredentialUpdateArgs<ExtArgs>>): Prisma__WorkflowCredentialClient<$Result.GetResult<Prisma.$WorkflowCredentialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkflowCredentials.
     * @param {WorkflowCredentialDeleteManyArgs} args - Arguments to filter WorkflowCredentials to delete.
     * @example
     * // Delete a few WorkflowCredentials
     * const { count } = await prisma.workflowCredential.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowCredentialDeleteManyArgs>(args?: SelectSubset<T, WorkflowCredentialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCredentialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkflowCredentials
     * const workflowCredential = await prisma.workflowCredential.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowCredentialUpdateManyArgs>(args: SelectSubset<T, WorkflowCredentialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowCredentials and returns the data updated in the database.
     * @param {WorkflowCredentialUpdateManyAndReturnArgs} args - Arguments to update many WorkflowCredentials.
     * @example
     * // Update many WorkflowCredentials
     * const workflowCredential = await prisma.workflowCredential.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkflowCredentials and only return the `workflowId`
     * const workflowCredentialWithWorkflowIdOnly = await prisma.workflowCredential.updateManyAndReturn({
     *   select: { workflowId: true },
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
    updateManyAndReturn<T extends WorkflowCredentialUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkflowCredentialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowCredentialPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkflowCredential.
     * @param {WorkflowCredentialUpsertArgs} args - Arguments to update or create a WorkflowCredential.
     * @example
     * // Update or create a WorkflowCredential
     * const workflowCredential = await prisma.workflowCredential.upsert({
     *   create: {
     *     // ... data to create a WorkflowCredential
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkflowCredential we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowCredentialUpsertArgs>(args: SelectSubset<T, WorkflowCredentialUpsertArgs<ExtArgs>>): Prisma__WorkflowCredentialClient<$Result.GetResult<Prisma.$WorkflowCredentialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkflowCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCredentialCountArgs} args - Arguments to filter WorkflowCredentials to count.
     * @example
     * // Count the number of WorkflowCredentials
     * const count = await prisma.workflowCredential.count({
     *   where: {
     *     // ... the filter for the WorkflowCredentials we want to count
     *   }
     * })
    **/
    count<T extends WorkflowCredentialCountArgs>(
      args?: Subset<T, WorkflowCredentialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowCredentialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkflowCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCredentialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkflowCredentialAggregateArgs>(args: Subset<T, WorkflowCredentialAggregateArgs>): Prisma.PrismaPromise<GetWorkflowCredentialAggregateType<T>>

    /**
     * Group by WorkflowCredential.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowCredentialGroupByArgs} args - Group by arguments.
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
      T extends WorkflowCredentialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowCredentialGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowCredentialGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorkflowCredentialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowCredentialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkflowCredential model
   */
  readonly fields: WorkflowCredentialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkflowCredential.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowCredentialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workflow<T extends WorkflowDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowDefaultArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    credential<T extends CredentialDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CredentialDefaultArgs<ExtArgs>>): Prisma__CredentialClient<$Result.GetResult<Prisma.$CredentialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the WorkflowCredential model
   */
  interface WorkflowCredentialFieldRefs {
    readonly workflowId: FieldRef<"WorkflowCredential", 'String'>
    readonly credentialId: FieldRef<"WorkflowCredential", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WorkflowCredential findUnique
   */
  export type WorkflowCredentialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCredential
     */
    select?: WorkflowCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCredential
     */
    omit?: WorkflowCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCredentialInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowCredential to fetch.
     */
    where: WorkflowCredentialWhereUniqueInput
  }

  /**
   * WorkflowCredential findUniqueOrThrow
   */
  export type WorkflowCredentialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCredential
     */
    select?: WorkflowCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCredential
     */
    omit?: WorkflowCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCredentialInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowCredential to fetch.
     */
    where: WorkflowCredentialWhereUniqueInput
  }

  /**
   * WorkflowCredential findFirst
   */
  export type WorkflowCredentialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCredential
     */
    select?: WorkflowCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCredential
     */
    omit?: WorkflowCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCredentialInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowCredential to fetch.
     */
    where?: WorkflowCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowCredentials to fetch.
     */
    orderBy?: WorkflowCredentialOrderByWithRelationInput | WorkflowCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowCredentials.
     */
    cursor?: WorkflowCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowCredentials.
     */
    distinct?: WorkflowCredentialScalarFieldEnum | WorkflowCredentialScalarFieldEnum[]
  }

  /**
   * WorkflowCredential findFirstOrThrow
   */
  export type WorkflowCredentialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCredential
     */
    select?: WorkflowCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCredential
     */
    omit?: WorkflowCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCredentialInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowCredential to fetch.
     */
    where?: WorkflowCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowCredentials to fetch.
     */
    orderBy?: WorkflowCredentialOrderByWithRelationInput | WorkflowCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowCredentials.
     */
    cursor?: WorkflowCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowCredentials.
     */
    distinct?: WorkflowCredentialScalarFieldEnum | WorkflowCredentialScalarFieldEnum[]
  }

  /**
   * WorkflowCredential findMany
   */
  export type WorkflowCredentialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCredential
     */
    select?: WorkflowCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCredential
     */
    omit?: WorkflowCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCredentialInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowCredentials to fetch.
     */
    where?: WorkflowCredentialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowCredentials to fetch.
     */
    orderBy?: WorkflowCredentialOrderByWithRelationInput | WorkflowCredentialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkflowCredentials.
     */
    cursor?: WorkflowCredentialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowCredentials.
     */
    skip?: number
    distinct?: WorkflowCredentialScalarFieldEnum | WorkflowCredentialScalarFieldEnum[]
  }

  /**
   * WorkflowCredential create
   */
  export type WorkflowCredentialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCredential
     */
    select?: WorkflowCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCredential
     */
    omit?: WorkflowCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCredentialInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkflowCredential.
     */
    data: XOR<WorkflowCredentialCreateInput, WorkflowCredentialUncheckedCreateInput>
  }

  /**
   * WorkflowCredential createMany
   */
  export type WorkflowCredentialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkflowCredentials.
     */
    data: WorkflowCredentialCreateManyInput | WorkflowCredentialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkflowCredential createManyAndReturn
   */
  export type WorkflowCredentialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCredential
     */
    select?: WorkflowCredentialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCredential
     */
    omit?: WorkflowCredentialOmit<ExtArgs> | null
    /**
     * The data used to create many WorkflowCredentials.
     */
    data: WorkflowCredentialCreateManyInput | WorkflowCredentialCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCredentialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowCredential update
   */
  export type WorkflowCredentialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCredential
     */
    select?: WorkflowCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCredential
     */
    omit?: WorkflowCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCredentialInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkflowCredential.
     */
    data: XOR<WorkflowCredentialUpdateInput, WorkflowCredentialUncheckedUpdateInput>
    /**
     * Choose, which WorkflowCredential to update.
     */
    where: WorkflowCredentialWhereUniqueInput
  }

  /**
   * WorkflowCredential updateMany
   */
  export type WorkflowCredentialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkflowCredentials.
     */
    data: XOR<WorkflowCredentialUpdateManyMutationInput, WorkflowCredentialUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowCredentials to update
     */
    where?: WorkflowCredentialWhereInput
    /**
     * Limit how many WorkflowCredentials to update.
     */
    limit?: number
  }

  /**
   * WorkflowCredential updateManyAndReturn
   */
  export type WorkflowCredentialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCredential
     */
    select?: WorkflowCredentialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCredential
     */
    omit?: WorkflowCredentialOmit<ExtArgs> | null
    /**
     * The data used to update WorkflowCredentials.
     */
    data: XOR<WorkflowCredentialUpdateManyMutationInput, WorkflowCredentialUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowCredentials to update
     */
    where?: WorkflowCredentialWhereInput
    /**
     * Limit how many WorkflowCredentials to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCredentialIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowCredential upsert
   */
  export type WorkflowCredentialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCredential
     */
    select?: WorkflowCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCredential
     */
    omit?: WorkflowCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCredentialInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkflowCredential to update in case it exists.
     */
    where: WorkflowCredentialWhereUniqueInput
    /**
     * In case the WorkflowCredential found by the `where` argument doesn't exist, create a new WorkflowCredential with this data.
     */
    create: XOR<WorkflowCredentialCreateInput, WorkflowCredentialUncheckedCreateInput>
    /**
     * In case the WorkflowCredential was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowCredentialUpdateInput, WorkflowCredentialUncheckedUpdateInput>
  }

  /**
   * WorkflowCredential delete
   */
  export type WorkflowCredentialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCredential
     */
    select?: WorkflowCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCredential
     */
    omit?: WorkflowCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCredentialInclude<ExtArgs> | null
    /**
     * Filter which WorkflowCredential to delete.
     */
    where: WorkflowCredentialWhereUniqueInput
  }

  /**
   * WorkflowCredential deleteMany
   */
  export type WorkflowCredentialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowCredentials to delete
     */
    where?: WorkflowCredentialWhereInput
    /**
     * Limit how many WorkflowCredentials to delete.
     */
    limit?: number
  }

  /**
   * WorkflowCredential without action
   */
  export type WorkflowCredentialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowCredential
     */
    select?: WorkflowCredentialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowCredential
     */
    omit?: WorkflowCredentialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowCredentialInclude<ExtArgs> | null
  }


  /**
   * Model WorkflowRun
   */

  export type AggregateWorkflowRun = {
    _count: WorkflowRunCountAggregateOutputType | null
    _min: WorkflowRunMinAggregateOutputType | null
    _max: WorkflowRunMaxAggregateOutputType | null
  }

  export type WorkflowRunMinAggregateOutputType = {
    id: string | null
    inngestRunId: string | null
    idempotencyKey: string | null
    status: $Enums.RunStatus | null
    startedAt: Date | null
    completedAt: Date | null
    error: string | null
    workflowId: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkflowRunMaxAggregateOutputType = {
    id: string | null
    inngestRunId: string | null
    idempotencyKey: string | null
    status: $Enums.RunStatus | null
    startedAt: Date | null
    completedAt: Date | null
    error: string | null
    workflowId: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkflowRunCountAggregateOutputType = {
    id: number
    inngestRunId: number
    idempotencyKey: number
    status: number
    startedAt: number
    completedAt: number
    input: number
    output: number
    error: number
    realtimeData: number
    workflowId: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkflowRunMinAggregateInputType = {
    id?: true
    inngestRunId?: true
    idempotencyKey?: true
    status?: true
    startedAt?: true
    completedAt?: true
    error?: true
    workflowId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkflowRunMaxAggregateInputType = {
    id?: true
    inngestRunId?: true
    idempotencyKey?: true
    status?: true
    startedAt?: true
    completedAt?: true
    error?: true
    workflowId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkflowRunCountAggregateInputType = {
    id?: true
    inngestRunId?: true
    idempotencyKey?: true
    status?: true
    startedAt?: true
    completedAt?: true
    input?: true
    output?: true
    error?: true
    realtimeData?: true
    workflowId?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkflowRunAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowRun to aggregate.
     */
    where?: WorkflowRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowRuns to fetch.
     */
    orderBy?: WorkflowRunOrderByWithRelationInput | WorkflowRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkflowRuns
    **/
    _count?: true | WorkflowRunCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowRunMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowRunMaxAggregateInputType
  }

  export type GetWorkflowRunAggregateType<T extends WorkflowRunAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflowRun]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflowRun[P]>
      : GetScalarType<T[P], AggregateWorkflowRun[P]>
  }




  export type WorkflowRunGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowRunWhereInput
    orderBy?: WorkflowRunOrderByWithAggregationInput | WorkflowRunOrderByWithAggregationInput[]
    by: WorkflowRunScalarFieldEnum[] | WorkflowRunScalarFieldEnum
    having?: WorkflowRunScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowRunCountAggregateInputType | true
    _min?: WorkflowRunMinAggregateInputType
    _max?: WorkflowRunMaxAggregateInputType
  }

  export type WorkflowRunGroupByOutputType = {
    id: string
    inngestRunId: string
    idempotencyKey: string | null
    status: $Enums.RunStatus
    startedAt: Date
    completedAt: Date | null
    input: JsonValue | null
    output: JsonValue | null
    error: string | null
    realtimeData: JsonValue[]
    workflowId: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: WorkflowRunCountAggregateOutputType | null
    _min: WorkflowRunMinAggregateOutputType | null
    _max: WorkflowRunMaxAggregateOutputType | null
  }

  type GetWorkflowRunGroupByPayload<T extends WorkflowRunGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowRunGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowRunGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowRunGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowRunGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowRunSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inngestRunId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    input?: boolean
    output?: boolean
    error?: boolean
    realtimeData?: boolean
    workflowId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowRun"]>

  export type WorkflowRunSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inngestRunId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    input?: boolean
    output?: boolean
    error?: boolean
    realtimeData?: boolean
    workflowId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowRun"]>

  export type WorkflowRunSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inngestRunId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    input?: boolean
    output?: boolean
    error?: boolean
    realtimeData?: boolean
    workflowId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workflowRun"]>

  export type WorkflowRunSelectScalar = {
    id?: boolean
    inngestRunId?: boolean
    idempotencyKey?: boolean
    status?: boolean
    startedAt?: boolean
    completedAt?: boolean
    input?: boolean
    output?: boolean
    error?: boolean
    realtimeData?: boolean
    workflowId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkflowRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "inngestRunId" | "idempotencyKey" | "status" | "startedAt" | "completedAt" | "input" | "output" | "error" | "realtimeData" | "workflowId" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["workflowRun"]>
  export type WorkflowRunInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorkflowRunIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorkflowRunIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WorkflowRunPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkflowRun"
    objects: {
      workflow: Prisma.$WorkflowPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      inngestRunId: string
      idempotencyKey: string | null
      status: $Enums.RunStatus
      startedAt: Date
      completedAt: Date | null
      input: Prisma.JsonValue | null
      output: Prisma.JsonValue | null
      error: string | null
      realtimeData: Prisma.JsonValue[]
      workflowId: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workflowRun"]>
    composites: {}
  }

  type WorkflowRunGetPayload<S extends boolean | null | undefined | WorkflowRunDefaultArgs> = $Result.GetResult<Prisma.$WorkflowRunPayload, S>

  type WorkflowRunCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkflowRunFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkflowRunCountAggregateInputType | true
    }

  export interface WorkflowRunDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkflowRun'], meta: { name: 'WorkflowRun' } }
    /**
     * Find zero or one WorkflowRun that matches the filter.
     * @param {WorkflowRunFindUniqueArgs} args - Arguments to find a WorkflowRun
     * @example
     * // Get one WorkflowRun
     * const workflowRun = await prisma.workflowRun.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowRunFindUniqueArgs>(args: SelectSubset<T, WorkflowRunFindUniqueArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkflowRun that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkflowRunFindUniqueOrThrowArgs} args - Arguments to find a WorkflowRun
     * @example
     * // Get one WorkflowRun
     * const workflowRun = await prisma.workflowRun.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowRunFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowRunFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowRun that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowRunFindFirstArgs} args - Arguments to find a WorkflowRun
     * @example
     * // Get one WorkflowRun
     * const workflowRun = await prisma.workflowRun.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowRunFindFirstArgs>(args?: SelectSubset<T, WorkflowRunFindFirstArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowRun that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowRunFindFirstOrThrowArgs} args - Arguments to find a WorkflowRun
     * @example
     * // Get one WorkflowRun
     * const workflowRun = await prisma.workflowRun.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowRunFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowRunFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkflowRuns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowRunFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkflowRuns
     * const workflowRuns = await prisma.workflowRun.findMany()
     * 
     * // Get first 10 WorkflowRuns
     * const workflowRuns = await prisma.workflowRun.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowRunWithIdOnly = await prisma.workflowRun.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowRunFindManyArgs>(args?: SelectSubset<T, WorkflowRunFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkflowRun.
     * @param {WorkflowRunCreateArgs} args - Arguments to create a WorkflowRun.
     * @example
     * // Create one WorkflowRun
     * const WorkflowRun = await prisma.workflowRun.create({
     *   data: {
     *     // ... data to create a WorkflowRun
     *   }
     * })
     * 
     */
    create<T extends WorkflowRunCreateArgs>(args: SelectSubset<T, WorkflowRunCreateArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkflowRuns.
     * @param {WorkflowRunCreateManyArgs} args - Arguments to create many WorkflowRuns.
     * @example
     * // Create many WorkflowRuns
     * const workflowRun = await prisma.workflowRun.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowRunCreateManyArgs>(args?: SelectSubset<T, WorkflowRunCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkflowRuns and returns the data saved in the database.
     * @param {WorkflowRunCreateManyAndReturnArgs} args - Arguments to create many WorkflowRuns.
     * @example
     * // Create many WorkflowRuns
     * const workflowRun = await prisma.workflowRun.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkflowRuns and only return the `id`
     * const workflowRunWithIdOnly = await prisma.workflowRun.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowRunCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowRunCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkflowRun.
     * @param {WorkflowRunDeleteArgs} args - Arguments to delete one WorkflowRun.
     * @example
     * // Delete one WorkflowRun
     * const WorkflowRun = await prisma.workflowRun.delete({
     *   where: {
     *     // ... filter to delete one WorkflowRun
     *   }
     * })
     * 
     */
    delete<T extends WorkflowRunDeleteArgs>(args: SelectSubset<T, WorkflowRunDeleteArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkflowRun.
     * @param {WorkflowRunUpdateArgs} args - Arguments to update one WorkflowRun.
     * @example
     * // Update one WorkflowRun
     * const workflowRun = await prisma.workflowRun.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowRunUpdateArgs>(args: SelectSubset<T, WorkflowRunUpdateArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkflowRuns.
     * @param {WorkflowRunDeleteManyArgs} args - Arguments to filter WorkflowRuns to delete.
     * @example
     * // Delete a few WorkflowRuns
     * const { count } = await prisma.workflowRun.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowRunDeleteManyArgs>(args?: SelectSubset<T, WorkflowRunDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowRunUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkflowRuns
     * const workflowRun = await prisma.workflowRun.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowRunUpdateManyArgs>(args: SelectSubset<T, WorkflowRunUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowRuns and returns the data updated in the database.
     * @param {WorkflowRunUpdateManyAndReturnArgs} args - Arguments to update many WorkflowRuns.
     * @example
     * // Update many WorkflowRuns
     * const workflowRun = await prisma.workflowRun.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkflowRuns and only return the `id`
     * const workflowRunWithIdOnly = await prisma.workflowRun.updateManyAndReturn({
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
    updateManyAndReturn<T extends WorkflowRunUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkflowRunUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkflowRun.
     * @param {WorkflowRunUpsertArgs} args - Arguments to update or create a WorkflowRun.
     * @example
     * // Update or create a WorkflowRun
     * const workflowRun = await prisma.workflowRun.upsert({
     *   create: {
     *     // ... data to create a WorkflowRun
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkflowRun we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowRunUpsertArgs>(args: SelectSubset<T, WorkflowRunUpsertArgs<ExtArgs>>): Prisma__WorkflowRunClient<$Result.GetResult<Prisma.$WorkflowRunPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkflowRuns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowRunCountArgs} args - Arguments to filter WorkflowRuns to count.
     * @example
     * // Count the number of WorkflowRuns
     * const count = await prisma.workflowRun.count({
     *   where: {
     *     // ... the filter for the WorkflowRuns we want to count
     *   }
     * })
    **/
    count<T extends WorkflowRunCountArgs>(
      args?: Subset<T, WorkflowRunCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowRunCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkflowRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowRunAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkflowRunAggregateArgs>(args: Subset<T, WorkflowRunAggregateArgs>): Prisma.PrismaPromise<GetWorkflowRunAggregateType<T>>

    /**
     * Group by WorkflowRun.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowRunGroupByArgs} args - Group by arguments.
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
      T extends WorkflowRunGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowRunGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowRunGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorkflowRunGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowRunGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkflowRun model
   */
  readonly fields: WorkflowRunFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkflowRun.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowRunClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workflow<T extends WorkflowDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowDefaultArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the WorkflowRun model
   */
  interface WorkflowRunFieldRefs {
    readonly id: FieldRef<"WorkflowRun", 'String'>
    readonly inngestRunId: FieldRef<"WorkflowRun", 'String'>
    readonly idempotencyKey: FieldRef<"WorkflowRun", 'String'>
    readonly status: FieldRef<"WorkflowRun", 'RunStatus'>
    readonly startedAt: FieldRef<"WorkflowRun", 'DateTime'>
    readonly completedAt: FieldRef<"WorkflowRun", 'DateTime'>
    readonly input: FieldRef<"WorkflowRun", 'Json'>
    readonly output: FieldRef<"WorkflowRun", 'Json'>
    readonly error: FieldRef<"WorkflowRun", 'String'>
    readonly realtimeData: FieldRef<"WorkflowRun", 'Json[]'>
    readonly workflowId: FieldRef<"WorkflowRun", 'String'>
    readonly userId: FieldRef<"WorkflowRun", 'String'>
    readonly createdAt: FieldRef<"WorkflowRun", 'DateTime'>
    readonly updatedAt: FieldRef<"WorkflowRun", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkflowRun findUnique
   */
  export type WorkflowRunFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowRun to fetch.
     */
    where: WorkflowRunWhereUniqueInput
  }

  /**
   * WorkflowRun findUniqueOrThrow
   */
  export type WorkflowRunFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowRun to fetch.
     */
    where: WorkflowRunWhereUniqueInput
  }

  /**
   * WorkflowRun findFirst
   */
  export type WorkflowRunFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowRun to fetch.
     */
    where?: WorkflowRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowRuns to fetch.
     */
    orderBy?: WorkflowRunOrderByWithRelationInput | WorkflowRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowRuns.
     */
    cursor?: WorkflowRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowRuns.
     */
    distinct?: WorkflowRunScalarFieldEnum | WorkflowRunScalarFieldEnum[]
  }

  /**
   * WorkflowRun findFirstOrThrow
   */
  export type WorkflowRunFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowRun to fetch.
     */
    where?: WorkflowRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowRuns to fetch.
     */
    orderBy?: WorkflowRunOrderByWithRelationInput | WorkflowRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowRuns.
     */
    cursor?: WorkflowRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowRuns.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowRuns.
     */
    distinct?: WorkflowRunScalarFieldEnum | WorkflowRunScalarFieldEnum[]
  }

  /**
   * WorkflowRun findMany
   */
  export type WorkflowRunFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * Filter, which WorkflowRuns to fetch.
     */
    where?: WorkflowRunWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowRuns to fetch.
     */
    orderBy?: WorkflowRunOrderByWithRelationInput | WorkflowRunOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkflowRuns.
     */
    cursor?: WorkflowRunWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowRuns from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowRuns.
     */
    skip?: number
    distinct?: WorkflowRunScalarFieldEnum | WorkflowRunScalarFieldEnum[]
  }

  /**
   * WorkflowRun create
   */
  export type WorkflowRunCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkflowRun.
     */
    data: XOR<WorkflowRunCreateInput, WorkflowRunUncheckedCreateInput>
  }

  /**
   * WorkflowRun createMany
   */
  export type WorkflowRunCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkflowRuns.
     */
    data: WorkflowRunCreateManyInput | WorkflowRunCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkflowRun createManyAndReturn
   */
  export type WorkflowRunCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * The data used to create many WorkflowRuns.
     */
    data: WorkflowRunCreateManyInput | WorkflowRunCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowRun update
   */
  export type WorkflowRunUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkflowRun.
     */
    data: XOR<WorkflowRunUpdateInput, WorkflowRunUncheckedUpdateInput>
    /**
     * Choose, which WorkflowRun to update.
     */
    where: WorkflowRunWhereUniqueInput
  }

  /**
   * WorkflowRun updateMany
   */
  export type WorkflowRunUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkflowRuns.
     */
    data: XOR<WorkflowRunUpdateManyMutationInput, WorkflowRunUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowRuns to update
     */
    where?: WorkflowRunWhereInput
    /**
     * Limit how many WorkflowRuns to update.
     */
    limit?: number
  }

  /**
   * WorkflowRun updateManyAndReturn
   */
  export type WorkflowRunUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * The data used to update WorkflowRuns.
     */
    data: XOR<WorkflowRunUpdateManyMutationInput, WorkflowRunUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowRuns to update
     */
    where?: WorkflowRunWhereInput
    /**
     * Limit how many WorkflowRuns to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkflowRun upsert
   */
  export type WorkflowRunUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkflowRun to update in case it exists.
     */
    where: WorkflowRunWhereUniqueInput
    /**
     * In case the WorkflowRun found by the `where` argument doesn't exist, create a new WorkflowRun with this data.
     */
    create: XOR<WorkflowRunCreateInput, WorkflowRunUncheckedCreateInput>
    /**
     * In case the WorkflowRun was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowRunUpdateInput, WorkflowRunUncheckedUpdateInput>
  }

  /**
   * WorkflowRun delete
   */
  export type WorkflowRunDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
    /**
     * Filter which WorkflowRun to delete.
     */
    where: WorkflowRunWhereUniqueInput
  }

  /**
   * WorkflowRun deleteMany
   */
  export type WorkflowRunDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowRuns to delete
     */
    where?: WorkflowRunWhereInput
    /**
     * Limit how many WorkflowRuns to delete.
     */
    limit?: number
  }

  /**
   * WorkflowRun without action
   */
  export type WorkflowRunDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowRun
     */
    select?: WorkflowRunSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowRun
     */
    omit?: WorkflowRunOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkflowRunInclude<ExtArgs> | null
  }


  /**
   * Model WorkflowTemplate
   */

  export type AggregateWorkflowTemplate = {
    _count: WorkflowTemplateCountAggregateOutputType | null
    _min: WorkflowTemplateMinAggregateOutputType | null
    _max: WorkflowTemplateMaxAggregateOutputType | null
  }

  export type WorkflowTemplateMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    eventName: string | null
    canBeScheduled: boolean | null
    version: string | null
  }

  export type WorkflowTemplateMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    eventName: string | null
    canBeScheduled: boolean | null
    version: string | null
  }

  export type WorkflowTemplateCountAggregateOutputType = {
    id: number
    name: number
    description: number
    eventName: number
    canBeScheduled: number
    requiredProviders: number
    requiredScopes: number
    fields: number
    restrictedToUsers: number
    tags: number
    version: number
    _all: number
  }


  export type WorkflowTemplateMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    eventName?: true
    canBeScheduled?: true
    version?: true
  }

  export type WorkflowTemplateMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    eventName?: true
    canBeScheduled?: true
    version?: true
  }

  export type WorkflowTemplateCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    eventName?: true
    canBeScheduled?: true
    requiredProviders?: true
    requiredScopes?: true
    fields?: true
    restrictedToUsers?: true
    tags?: true
    version?: true
    _all?: true
  }

  export type WorkflowTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowTemplate to aggregate.
     */
    where?: WorkflowTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowTemplates to fetch.
     */
    orderBy?: WorkflowTemplateOrderByWithRelationInput | WorkflowTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkflowTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkflowTemplates
    **/
    _count?: true | WorkflowTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkflowTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkflowTemplateMaxAggregateInputType
  }

  export type GetWorkflowTemplateAggregateType<T extends WorkflowTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkflowTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkflowTemplate[P]>
      : GetScalarType<T[P], AggregateWorkflowTemplate[P]>
  }




  export type WorkflowTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkflowTemplateWhereInput
    orderBy?: WorkflowTemplateOrderByWithAggregationInput | WorkflowTemplateOrderByWithAggregationInput[]
    by: WorkflowTemplateScalarFieldEnum[] | WorkflowTemplateScalarFieldEnum
    having?: WorkflowTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkflowTemplateCountAggregateInputType | true
    _min?: WorkflowTemplateMinAggregateInputType
    _max?: WorkflowTemplateMaxAggregateInputType
  }

  export type WorkflowTemplateGroupByOutputType = {
    id: string
    name: string
    description: string
    eventName: string
    canBeScheduled: boolean
    requiredProviders: $Enums.Provider[]
    requiredScopes: JsonValue | null
    fields: JsonValue | null
    restrictedToUsers: string[]
    tags: string[]
    version: string
    _count: WorkflowTemplateCountAggregateOutputType | null
    _min: WorkflowTemplateMinAggregateOutputType | null
    _max: WorkflowTemplateMaxAggregateOutputType | null
  }

  type GetWorkflowTemplateGroupByPayload<T extends WorkflowTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkflowTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkflowTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkflowTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], WorkflowTemplateGroupByOutputType[P]>
        }
      >
    >


  export type WorkflowTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    eventName?: boolean
    canBeScheduled?: boolean
    requiredProviders?: boolean
    requiredScopes?: boolean
    fields?: boolean
    restrictedToUsers?: boolean
    tags?: boolean
    version?: boolean
  }, ExtArgs["result"]["workflowTemplate"]>

  export type WorkflowTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    eventName?: boolean
    canBeScheduled?: boolean
    requiredProviders?: boolean
    requiredScopes?: boolean
    fields?: boolean
    restrictedToUsers?: boolean
    tags?: boolean
    version?: boolean
  }, ExtArgs["result"]["workflowTemplate"]>

  export type WorkflowTemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    eventName?: boolean
    canBeScheduled?: boolean
    requiredProviders?: boolean
    requiredScopes?: boolean
    fields?: boolean
    restrictedToUsers?: boolean
    tags?: boolean
    version?: boolean
  }, ExtArgs["result"]["workflowTemplate"]>

  export type WorkflowTemplateSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    eventName?: boolean
    canBeScheduled?: boolean
    requiredProviders?: boolean
    requiredScopes?: boolean
    fields?: boolean
    restrictedToUsers?: boolean
    tags?: boolean
    version?: boolean
  }

  export type WorkflowTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "eventName" | "canBeScheduled" | "requiredProviders" | "requiredScopes" | "fields" | "restrictedToUsers" | "tags" | "version", ExtArgs["result"]["workflowTemplate"]>

  export type $WorkflowTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkflowTemplate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      eventName: string
      canBeScheduled: boolean
      requiredProviders: $Enums.Provider[]
      requiredScopes: Prisma.JsonValue | null
      fields: Prisma.JsonValue | null
      restrictedToUsers: string[]
      tags: string[]
      version: string
    }, ExtArgs["result"]["workflowTemplate"]>
    composites: {}
  }

  type WorkflowTemplateGetPayload<S extends boolean | null | undefined | WorkflowTemplateDefaultArgs> = $Result.GetResult<Prisma.$WorkflowTemplatePayload, S>

  type WorkflowTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WorkflowTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WorkflowTemplateCountAggregateInputType | true
    }

  export interface WorkflowTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkflowTemplate'], meta: { name: 'WorkflowTemplate' } }
    /**
     * Find zero or one WorkflowTemplate that matches the filter.
     * @param {WorkflowTemplateFindUniqueArgs} args - Arguments to find a WorkflowTemplate
     * @example
     * // Get one WorkflowTemplate
     * const workflowTemplate = await prisma.workflowTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkflowTemplateFindUniqueArgs>(args: SelectSubset<T, WorkflowTemplateFindUniqueArgs<ExtArgs>>): Prisma__WorkflowTemplateClient<$Result.GetResult<Prisma.$WorkflowTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WorkflowTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WorkflowTemplateFindUniqueOrThrowArgs} args - Arguments to find a WorkflowTemplate
     * @example
     * // Get one WorkflowTemplate
     * const workflowTemplate = await prisma.workflowTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkflowTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkflowTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkflowTemplateClient<$Result.GetResult<Prisma.$WorkflowTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowTemplateFindFirstArgs} args - Arguments to find a WorkflowTemplate
     * @example
     * // Get one WorkflowTemplate
     * const workflowTemplate = await prisma.workflowTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkflowTemplateFindFirstArgs>(args?: SelectSubset<T, WorkflowTemplateFindFirstArgs<ExtArgs>>): Prisma__WorkflowTemplateClient<$Result.GetResult<Prisma.$WorkflowTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WorkflowTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowTemplateFindFirstOrThrowArgs} args - Arguments to find a WorkflowTemplate
     * @example
     * // Get one WorkflowTemplate
     * const workflowTemplate = await prisma.workflowTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkflowTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkflowTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkflowTemplateClient<$Result.GetResult<Prisma.$WorkflowTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WorkflowTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkflowTemplates
     * const workflowTemplates = await prisma.workflowTemplate.findMany()
     * 
     * // Get first 10 WorkflowTemplates
     * const workflowTemplates = await prisma.workflowTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workflowTemplateWithIdOnly = await prisma.workflowTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkflowTemplateFindManyArgs>(args?: SelectSubset<T, WorkflowTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WorkflowTemplate.
     * @param {WorkflowTemplateCreateArgs} args - Arguments to create a WorkflowTemplate.
     * @example
     * // Create one WorkflowTemplate
     * const WorkflowTemplate = await prisma.workflowTemplate.create({
     *   data: {
     *     // ... data to create a WorkflowTemplate
     *   }
     * })
     * 
     */
    create<T extends WorkflowTemplateCreateArgs>(args: SelectSubset<T, WorkflowTemplateCreateArgs<ExtArgs>>): Prisma__WorkflowTemplateClient<$Result.GetResult<Prisma.$WorkflowTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WorkflowTemplates.
     * @param {WorkflowTemplateCreateManyArgs} args - Arguments to create many WorkflowTemplates.
     * @example
     * // Create many WorkflowTemplates
     * const workflowTemplate = await prisma.workflowTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkflowTemplateCreateManyArgs>(args?: SelectSubset<T, WorkflowTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkflowTemplates and returns the data saved in the database.
     * @param {WorkflowTemplateCreateManyAndReturnArgs} args - Arguments to create many WorkflowTemplates.
     * @example
     * // Create many WorkflowTemplates
     * const workflowTemplate = await prisma.workflowTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkflowTemplates and only return the `id`
     * const workflowTemplateWithIdOnly = await prisma.workflowTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkflowTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkflowTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WorkflowTemplate.
     * @param {WorkflowTemplateDeleteArgs} args - Arguments to delete one WorkflowTemplate.
     * @example
     * // Delete one WorkflowTemplate
     * const WorkflowTemplate = await prisma.workflowTemplate.delete({
     *   where: {
     *     // ... filter to delete one WorkflowTemplate
     *   }
     * })
     * 
     */
    delete<T extends WorkflowTemplateDeleteArgs>(args: SelectSubset<T, WorkflowTemplateDeleteArgs<ExtArgs>>): Prisma__WorkflowTemplateClient<$Result.GetResult<Prisma.$WorkflowTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WorkflowTemplate.
     * @param {WorkflowTemplateUpdateArgs} args - Arguments to update one WorkflowTemplate.
     * @example
     * // Update one WorkflowTemplate
     * const workflowTemplate = await prisma.workflowTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkflowTemplateUpdateArgs>(args: SelectSubset<T, WorkflowTemplateUpdateArgs<ExtArgs>>): Prisma__WorkflowTemplateClient<$Result.GetResult<Prisma.$WorkflowTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WorkflowTemplates.
     * @param {WorkflowTemplateDeleteManyArgs} args - Arguments to filter WorkflowTemplates to delete.
     * @example
     * // Delete a few WorkflowTemplates
     * const { count } = await prisma.workflowTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkflowTemplateDeleteManyArgs>(args?: SelectSubset<T, WorkflowTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkflowTemplates
     * const workflowTemplate = await prisma.workflowTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkflowTemplateUpdateManyArgs>(args: SelectSubset<T, WorkflowTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkflowTemplates and returns the data updated in the database.
     * @param {WorkflowTemplateUpdateManyAndReturnArgs} args - Arguments to update many WorkflowTemplates.
     * @example
     * // Update many WorkflowTemplates
     * const workflowTemplate = await prisma.workflowTemplate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WorkflowTemplates and only return the `id`
     * const workflowTemplateWithIdOnly = await prisma.workflowTemplate.updateManyAndReturn({
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
    updateManyAndReturn<T extends WorkflowTemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, WorkflowTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkflowTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WorkflowTemplate.
     * @param {WorkflowTemplateUpsertArgs} args - Arguments to update or create a WorkflowTemplate.
     * @example
     * // Update or create a WorkflowTemplate
     * const workflowTemplate = await prisma.workflowTemplate.upsert({
     *   create: {
     *     // ... data to create a WorkflowTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkflowTemplate we want to update
     *   }
     * })
     */
    upsert<T extends WorkflowTemplateUpsertArgs>(args: SelectSubset<T, WorkflowTemplateUpsertArgs<ExtArgs>>): Prisma__WorkflowTemplateClient<$Result.GetResult<Prisma.$WorkflowTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WorkflowTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowTemplateCountArgs} args - Arguments to filter WorkflowTemplates to count.
     * @example
     * // Count the number of WorkflowTemplates
     * const count = await prisma.workflowTemplate.count({
     *   where: {
     *     // ... the filter for the WorkflowTemplates we want to count
     *   }
     * })
    **/
    count<T extends WorkflowTemplateCountArgs>(
      args?: Subset<T, WorkflowTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkflowTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkflowTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkflowTemplateAggregateArgs>(args: Subset<T, WorkflowTemplateAggregateArgs>): Prisma.PrismaPromise<GetWorkflowTemplateAggregateType<T>>

    /**
     * Group by WorkflowTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkflowTemplateGroupByArgs} args - Group by arguments.
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
      T extends WorkflowTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkflowTemplateGroupByArgs['orderBy'] }
        : { orderBy?: WorkflowTemplateGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorkflowTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkflowTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkflowTemplate model
   */
  readonly fields: WorkflowTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkflowTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkflowTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the WorkflowTemplate model
   */
  interface WorkflowTemplateFieldRefs {
    readonly id: FieldRef<"WorkflowTemplate", 'String'>
    readonly name: FieldRef<"WorkflowTemplate", 'String'>
    readonly description: FieldRef<"WorkflowTemplate", 'String'>
    readonly eventName: FieldRef<"WorkflowTemplate", 'String'>
    readonly canBeScheduled: FieldRef<"WorkflowTemplate", 'Boolean'>
    readonly requiredProviders: FieldRef<"WorkflowTemplate", 'Provider[]'>
    readonly requiredScopes: FieldRef<"WorkflowTemplate", 'Json'>
    readonly fields: FieldRef<"WorkflowTemplate", 'Json'>
    readonly restrictedToUsers: FieldRef<"WorkflowTemplate", 'String[]'>
    readonly tags: FieldRef<"WorkflowTemplate", 'String[]'>
    readonly version: FieldRef<"WorkflowTemplate", 'String'>
  }
    

  // Custom InputTypes
  /**
   * WorkflowTemplate findUnique
   */
  export type WorkflowTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTemplate
     */
    select?: WorkflowTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTemplate
     */
    omit?: WorkflowTemplateOmit<ExtArgs> | null
    /**
     * Filter, which WorkflowTemplate to fetch.
     */
    where: WorkflowTemplateWhereUniqueInput
  }

  /**
   * WorkflowTemplate findUniqueOrThrow
   */
  export type WorkflowTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTemplate
     */
    select?: WorkflowTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTemplate
     */
    omit?: WorkflowTemplateOmit<ExtArgs> | null
    /**
     * Filter, which WorkflowTemplate to fetch.
     */
    where: WorkflowTemplateWhereUniqueInput
  }

  /**
   * WorkflowTemplate findFirst
   */
  export type WorkflowTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTemplate
     */
    select?: WorkflowTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTemplate
     */
    omit?: WorkflowTemplateOmit<ExtArgs> | null
    /**
     * Filter, which WorkflowTemplate to fetch.
     */
    where?: WorkflowTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowTemplates to fetch.
     */
    orderBy?: WorkflowTemplateOrderByWithRelationInput | WorkflowTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowTemplates.
     */
    cursor?: WorkflowTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowTemplates.
     */
    distinct?: WorkflowTemplateScalarFieldEnum | WorkflowTemplateScalarFieldEnum[]
  }

  /**
   * WorkflowTemplate findFirstOrThrow
   */
  export type WorkflowTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTemplate
     */
    select?: WorkflowTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTemplate
     */
    omit?: WorkflowTemplateOmit<ExtArgs> | null
    /**
     * Filter, which WorkflowTemplate to fetch.
     */
    where?: WorkflowTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowTemplates to fetch.
     */
    orderBy?: WorkflowTemplateOrderByWithRelationInput | WorkflowTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkflowTemplates.
     */
    cursor?: WorkflowTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkflowTemplates.
     */
    distinct?: WorkflowTemplateScalarFieldEnum | WorkflowTemplateScalarFieldEnum[]
  }

  /**
   * WorkflowTemplate findMany
   */
  export type WorkflowTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTemplate
     */
    select?: WorkflowTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTemplate
     */
    omit?: WorkflowTemplateOmit<ExtArgs> | null
    /**
     * Filter, which WorkflowTemplates to fetch.
     */
    where?: WorkflowTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkflowTemplates to fetch.
     */
    orderBy?: WorkflowTemplateOrderByWithRelationInput | WorkflowTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkflowTemplates.
     */
    cursor?: WorkflowTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkflowTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkflowTemplates.
     */
    skip?: number
    distinct?: WorkflowTemplateScalarFieldEnum | WorkflowTemplateScalarFieldEnum[]
  }

  /**
   * WorkflowTemplate create
   */
  export type WorkflowTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTemplate
     */
    select?: WorkflowTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTemplate
     */
    omit?: WorkflowTemplateOmit<ExtArgs> | null
    /**
     * The data needed to create a WorkflowTemplate.
     */
    data: XOR<WorkflowTemplateCreateInput, WorkflowTemplateUncheckedCreateInput>
  }

  /**
   * WorkflowTemplate createMany
   */
  export type WorkflowTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkflowTemplates.
     */
    data: WorkflowTemplateCreateManyInput | WorkflowTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkflowTemplate createManyAndReturn
   */
  export type WorkflowTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTemplate
     */
    select?: WorkflowTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTemplate
     */
    omit?: WorkflowTemplateOmit<ExtArgs> | null
    /**
     * The data used to create many WorkflowTemplates.
     */
    data: WorkflowTemplateCreateManyInput | WorkflowTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkflowTemplate update
   */
  export type WorkflowTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTemplate
     */
    select?: WorkflowTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTemplate
     */
    omit?: WorkflowTemplateOmit<ExtArgs> | null
    /**
     * The data needed to update a WorkflowTemplate.
     */
    data: XOR<WorkflowTemplateUpdateInput, WorkflowTemplateUncheckedUpdateInput>
    /**
     * Choose, which WorkflowTemplate to update.
     */
    where: WorkflowTemplateWhereUniqueInput
  }

  /**
   * WorkflowTemplate updateMany
   */
  export type WorkflowTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkflowTemplates.
     */
    data: XOR<WorkflowTemplateUpdateManyMutationInput, WorkflowTemplateUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowTemplates to update
     */
    where?: WorkflowTemplateWhereInput
    /**
     * Limit how many WorkflowTemplates to update.
     */
    limit?: number
  }

  /**
   * WorkflowTemplate updateManyAndReturn
   */
  export type WorkflowTemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTemplate
     */
    select?: WorkflowTemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTemplate
     */
    omit?: WorkflowTemplateOmit<ExtArgs> | null
    /**
     * The data used to update WorkflowTemplates.
     */
    data: XOR<WorkflowTemplateUpdateManyMutationInput, WorkflowTemplateUncheckedUpdateManyInput>
    /**
     * Filter which WorkflowTemplates to update
     */
    where?: WorkflowTemplateWhereInput
    /**
     * Limit how many WorkflowTemplates to update.
     */
    limit?: number
  }

  /**
   * WorkflowTemplate upsert
   */
  export type WorkflowTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTemplate
     */
    select?: WorkflowTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTemplate
     */
    omit?: WorkflowTemplateOmit<ExtArgs> | null
    /**
     * The filter to search for the WorkflowTemplate to update in case it exists.
     */
    where: WorkflowTemplateWhereUniqueInput
    /**
     * In case the WorkflowTemplate found by the `where` argument doesn't exist, create a new WorkflowTemplate with this data.
     */
    create: XOR<WorkflowTemplateCreateInput, WorkflowTemplateUncheckedCreateInput>
    /**
     * In case the WorkflowTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkflowTemplateUpdateInput, WorkflowTemplateUncheckedUpdateInput>
  }

  /**
   * WorkflowTemplate delete
   */
  export type WorkflowTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTemplate
     */
    select?: WorkflowTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTemplate
     */
    omit?: WorkflowTemplateOmit<ExtArgs> | null
    /**
     * Filter which WorkflowTemplate to delete.
     */
    where: WorkflowTemplateWhereUniqueInput
  }

  /**
   * WorkflowTemplate deleteMany
   */
  export type WorkflowTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkflowTemplates to delete
     */
    where?: WorkflowTemplateWhereInput
    /**
     * Limit how many WorkflowTemplates to delete.
     */
    limit?: number
  }

  /**
   * WorkflowTemplate without action
   */
  export type WorkflowTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkflowTemplate
     */
    select?: WorkflowTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WorkflowTemplate
     */
    omit?: WorkflowTemplateOmit<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    clerk_id: 'clerk_id',
    email: 'email',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    phone_number: 'phone_number',
    role: 'role',
    language: 'language',
    is_active: 'is_active'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CredentialScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    provider: 'provider',
    secret: 'secret',
    config: 'config',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CredentialScalarFieldEnum = (typeof CredentialScalarFieldEnum)[keyof typeof CredentialScalarFieldEnum]


  export const WorkflowScalarFieldEnum: {
    id: 'id',
    name: 'name',
    templateId: 'templateId',
    description: 'description',
    available: 'available',
    status: 'status',
    canBeScheduled: 'canBeScheduled',
    idempotencyKey: 'idempotencyKey',
    cronExpressions: 'cronExpressions',
    timezone: 'timezone',
    lastRunAt: 'lastRunAt',
    nextRunAt: 'nextRunAt',
    fields: 'fields',
    input: 'input',
    eventName: 'eventName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    requiredProviders: 'requiredProviders',
    config: 'config'
  };

  export type WorkflowScalarFieldEnum = (typeof WorkflowScalarFieldEnum)[keyof typeof WorkflowScalarFieldEnum]


  export const WorkflowCredentialScalarFieldEnum: {
    workflowId: 'workflowId',
    credentialId: 'credentialId'
  };

  export type WorkflowCredentialScalarFieldEnum = (typeof WorkflowCredentialScalarFieldEnum)[keyof typeof WorkflowCredentialScalarFieldEnum]


  export const WorkflowRunScalarFieldEnum: {
    id: 'id',
    inngestRunId: 'inngestRunId',
    idempotencyKey: 'idempotencyKey',
    status: 'status',
    startedAt: 'startedAt',
    completedAt: 'completedAt',
    input: 'input',
    output: 'output',
    error: 'error',
    realtimeData: 'realtimeData',
    workflowId: 'workflowId',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkflowRunScalarFieldEnum = (typeof WorkflowRunScalarFieldEnum)[keyof typeof WorkflowRunScalarFieldEnum]


  export const WorkflowTemplateScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    eventName: 'eventName',
    canBeScheduled: 'canBeScheduled',
    requiredProviders: 'requiredProviders',
    requiredScopes: 'requiredScopes',
    fields: 'fields',
    restrictedToUsers: 'restrictedToUsers',
    tags: 'tags',
    version: 'version'
  };

  export type WorkflowTemplateScalarFieldEnum = (typeof WorkflowTemplateScalarFieldEnum)[keyof typeof WorkflowTemplateScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


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


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'CredentialType'
   */
  export type EnumCredentialTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CredentialType'>
    


  /**
   * Reference to a field of type 'CredentialType[]'
   */
  export type ListEnumCredentialTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CredentialType[]'>
    


  /**
   * Reference to a field of type 'Provider'
   */
  export type EnumProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Provider'>
    


  /**
   * Reference to a field of type 'Provider[]'
   */
  export type ListEnumProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Provider[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'WorkflowStatus'
   */
  export type EnumWorkflowStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkflowStatus'>
    


  /**
   * Reference to a field of type 'WorkflowStatus[]'
   */
  export type ListEnumWorkflowStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkflowStatus[]'>
    


  /**
   * Reference to a field of type 'RunStatus'
   */
  export type EnumRunStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RunStatus'>
    


  /**
   * Reference to a field of type 'RunStatus[]'
   */
  export type ListEnumRunStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RunStatus[]'>
    


  /**
   * Reference to a field of type 'Json[]'
   */
  export type ListJsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json[]'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    clerk_id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    phone_number?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    language?: StringFilter<"User"> | string
    is_active?: BoolFilter<"User"> | boolean
    workflows?: WorkflowListRelationFilter
    credentials?: CredentialListRelationFilter
    workflowRuns?: WorkflowRunListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    clerk_id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    phone_number?: SortOrderInput | SortOrder
    role?: SortOrder
    language?: SortOrder
    is_active?: SortOrder
    workflows?: WorkflowOrderByRelationAggregateInput
    credentials?: CredentialOrderByRelationAggregateInput
    workflowRuns?: WorkflowRunOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clerk_id?: string
    email?: string
    name?: string
    phone_number?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    role?: StringFilter<"User"> | string
    language?: StringFilter<"User"> | string
    is_active?: BoolFilter<"User"> | boolean
    workflows?: WorkflowListRelationFilter
    credentials?: CredentialListRelationFilter
    workflowRuns?: WorkflowRunListRelationFilter
  }, "id" | "clerk_id" | "email" | "name" | "phone_number">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    clerk_id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    phone_number?: SortOrderInput | SortOrder
    role?: SortOrder
    language?: SortOrder
    is_active?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    clerk_id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    phone_number?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    language?: StringWithAggregatesFilter<"User"> | string
    is_active?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type CredentialWhereInput = {
    AND?: CredentialWhereInput | CredentialWhereInput[]
    OR?: CredentialWhereInput[]
    NOT?: CredentialWhereInput | CredentialWhereInput[]
    id?: StringFilter<"Credential"> | string
    name?: StringFilter<"Credential"> | string
    type?: EnumCredentialTypeFilter<"Credential"> | $Enums.CredentialType
    provider?: EnumProviderFilter<"Credential"> | $Enums.Provider
    secret?: StringFilter<"Credential"> | string
    config?: JsonNullableFilter<"Credential">
    userId?: StringFilter<"Credential"> | string
    createdAt?: DateTimeFilter<"Credential"> | Date | string
    updatedAt?: DateTimeFilter<"Credential"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    workflowCredentials?: WorkflowCredentialListRelationFilter
  }

  export type CredentialOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    secret?: SortOrder
    config?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    workflowCredentials?: WorkflowCredentialOrderByRelationAggregateInput
  }

  export type CredentialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_name?: CredentialUserIdNameCompoundUniqueInput
    AND?: CredentialWhereInput | CredentialWhereInput[]
    OR?: CredentialWhereInput[]
    NOT?: CredentialWhereInput | CredentialWhereInput[]
    name?: StringFilter<"Credential"> | string
    type?: EnumCredentialTypeFilter<"Credential"> | $Enums.CredentialType
    provider?: EnumProviderFilter<"Credential"> | $Enums.Provider
    secret?: StringFilter<"Credential"> | string
    config?: JsonNullableFilter<"Credential">
    userId?: StringFilter<"Credential"> | string
    createdAt?: DateTimeFilter<"Credential"> | Date | string
    updatedAt?: DateTimeFilter<"Credential"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    workflowCredentials?: WorkflowCredentialListRelationFilter
  }, "id" | "userId_name">

  export type CredentialOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    secret?: SortOrder
    config?: SortOrderInput | SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CredentialCountOrderByAggregateInput
    _max?: CredentialMaxOrderByAggregateInput
    _min?: CredentialMinOrderByAggregateInput
  }

  export type CredentialScalarWhereWithAggregatesInput = {
    AND?: CredentialScalarWhereWithAggregatesInput | CredentialScalarWhereWithAggregatesInput[]
    OR?: CredentialScalarWhereWithAggregatesInput[]
    NOT?: CredentialScalarWhereWithAggregatesInput | CredentialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Credential"> | string
    name?: StringWithAggregatesFilter<"Credential"> | string
    type?: EnumCredentialTypeWithAggregatesFilter<"Credential"> | $Enums.CredentialType
    provider?: EnumProviderWithAggregatesFilter<"Credential"> | $Enums.Provider
    secret?: StringWithAggregatesFilter<"Credential"> | string
    config?: JsonNullableWithAggregatesFilter<"Credential">
    userId?: StringWithAggregatesFilter<"Credential"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Credential"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Credential"> | Date | string
  }

  export type WorkflowWhereInput = {
    AND?: WorkflowWhereInput | WorkflowWhereInput[]
    OR?: WorkflowWhereInput[]
    NOT?: WorkflowWhereInput | WorkflowWhereInput[]
    id?: StringFilter<"Workflow"> | string
    name?: StringFilter<"Workflow"> | string
    templateId?: StringFilter<"Workflow"> | string
    description?: StringNullableFilter<"Workflow"> | string | null
    available?: BoolFilter<"Workflow"> | boolean
    status?: EnumWorkflowStatusFilter<"Workflow"> | $Enums.WorkflowStatus
    canBeScheduled?: BoolFilter<"Workflow"> | boolean
    idempotencyKey?: StringNullableFilter<"Workflow"> | string | null
    cronExpressions?: StringNullableListFilter<"Workflow">
    timezone?: StringNullableFilter<"Workflow"> | string | null
    lastRunAt?: DateTimeNullableFilter<"Workflow"> | Date | string | null
    nextRunAt?: DateTimeNullableFilter<"Workflow"> | Date | string | null
    fields?: JsonNullableFilter<"Workflow">
    input?: JsonNullableFilter<"Workflow">
    eventName?: StringFilter<"Workflow"> | string
    createdAt?: DateTimeFilter<"Workflow"> | Date | string
    updatedAt?: DateTimeFilter<"Workflow"> | Date | string
    userId?: StringFilter<"Workflow"> | string
    requiredProviders?: EnumProviderNullableListFilter<"Workflow">
    config?: JsonNullableFilter<"Workflow">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    workflowCredentials?: WorkflowCredentialListRelationFilter
    workflowRuns?: WorkflowRunListRelationFilter
  }

  export type WorkflowOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    templateId?: SortOrder
    description?: SortOrderInput | SortOrder
    available?: SortOrder
    status?: SortOrder
    canBeScheduled?: SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    cronExpressions?: SortOrder
    timezone?: SortOrderInput | SortOrder
    lastRunAt?: SortOrderInput | SortOrder
    nextRunAt?: SortOrderInput | SortOrder
    fields?: SortOrderInput | SortOrder
    input?: SortOrderInput | SortOrder
    eventName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    requiredProviders?: SortOrder
    config?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    workflowCredentials?: WorkflowCredentialOrderByRelationAggregateInput
    workflowRuns?: WorkflowRunOrderByRelationAggregateInput
  }

  export type WorkflowWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WorkflowWhereInput | WorkflowWhereInput[]
    OR?: WorkflowWhereInput[]
    NOT?: WorkflowWhereInput | WorkflowWhereInput[]
    name?: StringFilter<"Workflow"> | string
    templateId?: StringFilter<"Workflow"> | string
    description?: StringNullableFilter<"Workflow"> | string | null
    available?: BoolFilter<"Workflow"> | boolean
    status?: EnumWorkflowStatusFilter<"Workflow"> | $Enums.WorkflowStatus
    canBeScheduled?: BoolFilter<"Workflow"> | boolean
    idempotencyKey?: StringNullableFilter<"Workflow"> | string | null
    cronExpressions?: StringNullableListFilter<"Workflow">
    timezone?: StringNullableFilter<"Workflow"> | string | null
    lastRunAt?: DateTimeNullableFilter<"Workflow"> | Date | string | null
    nextRunAt?: DateTimeNullableFilter<"Workflow"> | Date | string | null
    fields?: JsonNullableFilter<"Workflow">
    input?: JsonNullableFilter<"Workflow">
    eventName?: StringFilter<"Workflow"> | string
    createdAt?: DateTimeFilter<"Workflow"> | Date | string
    updatedAt?: DateTimeFilter<"Workflow"> | Date | string
    userId?: StringFilter<"Workflow"> | string
    requiredProviders?: EnumProviderNullableListFilter<"Workflow">
    config?: JsonNullableFilter<"Workflow">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    workflowCredentials?: WorkflowCredentialListRelationFilter
    workflowRuns?: WorkflowRunListRelationFilter
  }, "id">

  export type WorkflowOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    templateId?: SortOrder
    description?: SortOrderInput | SortOrder
    available?: SortOrder
    status?: SortOrder
    canBeScheduled?: SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    cronExpressions?: SortOrder
    timezone?: SortOrderInput | SortOrder
    lastRunAt?: SortOrderInput | SortOrder
    nextRunAt?: SortOrderInput | SortOrder
    fields?: SortOrderInput | SortOrder
    input?: SortOrderInput | SortOrder
    eventName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    requiredProviders?: SortOrder
    config?: SortOrderInput | SortOrder
    _count?: WorkflowCountOrderByAggregateInput
    _max?: WorkflowMaxOrderByAggregateInput
    _min?: WorkflowMinOrderByAggregateInput
  }

  export type WorkflowScalarWhereWithAggregatesInput = {
    AND?: WorkflowScalarWhereWithAggregatesInput | WorkflowScalarWhereWithAggregatesInput[]
    OR?: WorkflowScalarWhereWithAggregatesInput[]
    NOT?: WorkflowScalarWhereWithAggregatesInput | WorkflowScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Workflow"> | string
    name?: StringWithAggregatesFilter<"Workflow"> | string
    templateId?: StringWithAggregatesFilter<"Workflow"> | string
    description?: StringNullableWithAggregatesFilter<"Workflow"> | string | null
    available?: BoolWithAggregatesFilter<"Workflow"> | boolean
    status?: EnumWorkflowStatusWithAggregatesFilter<"Workflow"> | $Enums.WorkflowStatus
    canBeScheduled?: BoolWithAggregatesFilter<"Workflow"> | boolean
    idempotencyKey?: StringNullableWithAggregatesFilter<"Workflow"> | string | null
    cronExpressions?: StringNullableListFilter<"Workflow">
    timezone?: StringNullableWithAggregatesFilter<"Workflow"> | string | null
    lastRunAt?: DateTimeNullableWithAggregatesFilter<"Workflow"> | Date | string | null
    nextRunAt?: DateTimeNullableWithAggregatesFilter<"Workflow"> | Date | string | null
    fields?: JsonNullableWithAggregatesFilter<"Workflow">
    input?: JsonNullableWithAggregatesFilter<"Workflow">
    eventName?: StringWithAggregatesFilter<"Workflow"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Workflow"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Workflow"> | Date | string
    userId?: StringWithAggregatesFilter<"Workflow"> | string
    requiredProviders?: EnumProviderNullableListFilter<"Workflow">
    config?: JsonNullableWithAggregatesFilter<"Workflow">
  }

  export type WorkflowCredentialWhereInput = {
    AND?: WorkflowCredentialWhereInput | WorkflowCredentialWhereInput[]
    OR?: WorkflowCredentialWhereInput[]
    NOT?: WorkflowCredentialWhereInput | WorkflowCredentialWhereInput[]
    workflowId?: StringFilter<"WorkflowCredential"> | string
    credentialId?: StringFilter<"WorkflowCredential"> | string
    workflow?: XOR<WorkflowScalarRelationFilter, WorkflowWhereInput>
    credential?: XOR<CredentialScalarRelationFilter, CredentialWhereInput>
  }

  export type WorkflowCredentialOrderByWithRelationInput = {
    workflowId?: SortOrder
    credentialId?: SortOrder
    workflow?: WorkflowOrderByWithRelationInput
    credential?: CredentialOrderByWithRelationInput
  }

  export type WorkflowCredentialWhereUniqueInput = Prisma.AtLeast<{
    workflowId_credentialId?: WorkflowCredentialWorkflowIdCredentialIdCompoundUniqueInput
    AND?: WorkflowCredentialWhereInput | WorkflowCredentialWhereInput[]
    OR?: WorkflowCredentialWhereInput[]
    NOT?: WorkflowCredentialWhereInput | WorkflowCredentialWhereInput[]
    workflowId?: StringFilter<"WorkflowCredential"> | string
    credentialId?: StringFilter<"WorkflowCredential"> | string
    workflow?: XOR<WorkflowScalarRelationFilter, WorkflowWhereInput>
    credential?: XOR<CredentialScalarRelationFilter, CredentialWhereInput>
  }, "workflowId_credentialId">

  export type WorkflowCredentialOrderByWithAggregationInput = {
    workflowId?: SortOrder
    credentialId?: SortOrder
    _count?: WorkflowCredentialCountOrderByAggregateInput
    _max?: WorkflowCredentialMaxOrderByAggregateInput
    _min?: WorkflowCredentialMinOrderByAggregateInput
  }

  export type WorkflowCredentialScalarWhereWithAggregatesInput = {
    AND?: WorkflowCredentialScalarWhereWithAggregatesInput | WorkflowCredentialScalarWhereWithAggregatesInput[]
    OR?: WorkflowCredentialScalarWhereWithAggregatesInput[]
    NOT?: WorkflowCredentialScalarWhereWithAggregatesInput | WorkflowCredentialScalarWhereWithAggregatesInput[]
    workflowId?: StringWithAggregatesFilter<"WorkflowCredential"> | string
    credentialId?: StringWithAggregatesFilter<"WorkflowCredential"> | string
  }

  export type WorkflowRunWhereInput = {
    AND?: WorkflowRunWhereInput | WorkflowRunWhereInput[]
    OR?: WorkflowRunWhereInput[]
    NOT?: WorkflowRunWhereInput | WorkflowRunWhereInput[]
    id?: StringFilter<"WorkflowRun"> | string
    inngestRunId?: StringFilter<"WorkflowRun"> | string
    idempotencyKey?: StringNullableFilter<"WorkflowRun"> | string | null
    status?: EnumRunStatusFilter<"WorkflowRun"> | $Enums.RunStatus
    startedAt?: DateTimeFilter<"WorkflowRun"> | Date | string
    completedAt?: DateTimeNullableFilter<"WorkflowRun"> | Date | string | null
    input?: JsonNullableFilter<"WorkflowRun">
    output?: JsonNullableFilter<"WorkflowRun">
    error?: StringNullableFilter<"WorkflowRun"> | string | null
    realtimeData?: JsonNullableListFilter<"WorkflowRun">
    workflowId?: StringFilter<"WorkflowRun"> | string
    userId?: StringFilter<"WorkflowRun"> | string
    createdAt?: DateTimeFilter<"WorkflowRun"> | Date | string
    updatedAt?: DateTimeFilter<"WorkflowRun"> | Date | string
    workflow?: XOR<WorkflowScalarRelationFilter, WorkflowWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WorkflowRunOrderByWithRelationInput = {
    id?: SortOrder
    inngestRunId?: SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    input?: SortOrderInput | SortOrder
    output?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    realtimeData?: SortOrder
    workflowId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workflow?: WorkflowOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type WorkflowRunWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    inngestRunId?: string
    idempotencyKey?: string
    AND?: WorkflowRunWhereInput | WorkflowRunWhereInput[]
    OR?: WorkflowRunWhereInput[]
    NOT?: WorkflowRunWhereInput | WorkflowRunWhereInput[]
    status?: EnumRunStatusFilter<"WorkflowRun"> | $Enums.RunStatus
    startedAt?: DateTimeFilter<"WorkflowRun"> | Date | string
    completedAt?: DateTimeNullableFilter<"WorkflowRun"> | Date | string | null
    input?: JsonNullableFilter<"WorkflowRun">
    output?: JsonNullableFilter<"WorkflowRun">
    error?: StringNullableFilter<"WorkflowRun"> | string | null
    realtimeData?: JsonNullableListFilter<"WorkflowRun">
    workflowId?: StringFilter<"WorkflowRun"> | string
    userId?: StringFilter<"WorkflowRun"> | string
    createdAt?: DateTimeFilter<"WorkflowRun"> | Date | string
    updatedAt?: DateTimeFilter<"WorkflowRun"> | Date | string
    workflow?: XOR<WorkflowScalarRelationFilter, WorkflowWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "inngestRunId" | "idempotencyKey">

  export type WorkflowRunOrderByWithAggregationInput = {
    id?: SortOrder
    inngestRunId?: SortOrder
    idempotencyKey?: SortOrderInput | SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    input?: SortOrderInput | SortOrder
    output?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    realtimeData?: SortOrder
    workflowId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkflowRunCountOrderByAggregateInput
    _max?: WorkflowRunMaxOrderByAggregateInput
    _min?: WorkflowRunMinOrderByAggregateInput
  }

  export type WorkflowRunScalarWhereWithAggregatesInput = {
    AND?: WorkflowRunScalarWhereWithAggregatesInput | WorkflowRunScalarWhereWithAggregatesInput[]
    OR?: WorkflowRunScalarWhereWithAggregatesInput[]
    NOT?: WorkflowRunScalarWhereWithAggregatesInput | WorkflowRunScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkflowRun"> | string
    inngestRunId?: StringWithAggregatesFilter<"WorkflowRun"> | string
    idempotencyKey?: StringNullableWithAggregatesFilter<"WorkflowRun"> | string | null
    status?: EnumRunStatusWithAggregatesFilter<"WorkflowRun"> | $Enums.RunStatus
    startedAt?: DateTimeWithAggregatesFilter<"WorkflowRun"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"WorkflowRun"> | Date | string | null
    input?: JsonNullableWithAggregatesFilter<"WorkflowRun">
    output?: JsonNullableWithAggregatesFilter<"WorkflowRun">
    error?: StringNullableWithAggregatesFilter<"WorkflowRun"> | string | null
    realtimeData?: JsonNullableListFilter<"WorkflowRun">
    workflowId?: StringWithAggregatesFilter<"WorkflowRun"> | string
    userId?: StringWithAggregatesFilter<"WorkflowRun"> | string
    createdAt?: DateTimeWithAggregatesFilter<"WorkflowRun"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WorkflowRun"> | Date | string
  }

  export type WorkflowTemplateWhereInput = {
    AND?: WorkflowTemplateWhereInput | WorkflowTemplateWhereInput[]
    OR?: WorkflowTemplateWhereInput[]
    NOT?: WorkflowTemplateWhereInput | WorkflowTemplateWhereInput[]
    id?: StringFilter<"WorkflowTemplate"> | string
    name?: StringFilter<"WorkflowTemplate"> | string
    description?: StringFilter<"WorkflowTemplate"> | string
    eventName?: StringFilter<"WorkflowTemplate"> | string
    canBeScheduled?: BoolFilter<"WorkflowTemplate"> | boolean
    requiredProviders?: EnumProviderNullableListFilter<"WorkflowTemplate">
    requiredScopes?: JsonNullableFilter<"WorkflowTemplate">
    fields?: JsonNullableFilter<"WorkflowTemplate">
    restrictedToUsers?: StringNullableListFilter<"WorkflowTemplate">
    tags?: StringNullableListFilter<"WorkflowTemplate">
    version?: StringFilter<"WorkflowTemplate"> | string
  }

  export type WorkflowTemplateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    eventName?: SortOrder
    canBeScheduled?: SortOrder
    requiredProviders?: SortOrder
    requiredScopes?: SortOrderInput | SortOrder
    fields?: SortOrderInput | SortOrder
    restrictedToUsers?: SortOrder
    tags?: SortOrder
    version?: SortOrder
  }

  export type WorkflowTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    eventName?: string
    AND?: WorkflowTemplateWhereInput | WorkflowTemplateWhereInput[]
    OR?: WorkflowTemplateWhereInput[]
    NOT?: WorkflowTemplateWhereInput | WorkflowTemplateWhereInput[]
    name?: StringFilter<"WorkflowTemplate"> | string
    description?: StringFilter<"WorkflowTemplate"> | string
    canBeScheduled?: BoolFilter<"WorkflowTemplate"> | boolean
    requiredProviders?: EnumProviderNullableListFilter<"WorkflowTemplate">
    requiredScopes?: JsonNullableFilter<"WorkflowTemplate">
    fields?: JsonNullableFilter<"WorkflowTemplate">
    restrictedToUsers?: StringNullableListFilter<"WorkflowTemplate">
    tags?: StringNullableListFilter<"WorkflowTemplate">
    version?: StringFilter<"WorkflowTemplate"> | string
  }, "id" | "eventName">

  export type WorkflowTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    eventName?: SortOrder
    canBeScheduled?: SortOrder
    requiredProviders?: SortOrder
    requiredScopes?: SortOrderInput | SortOrder
    fields?: SortOrderInput | SortOrder
    restrictedToUsers?: SortOrder
    tags?: SortOrder
    version?: SortOrder
    _count?: WorkflowTemplateCountOrderByAggregateInput
    _max?: WorkflowTemplateMaxOrderByAggregateInput
    _min?: WorkflowTemplateMinOrderByAggregateInput
  }

  export type WorkflowTemplateScalarWhereWithAggregatesInput = {
    AND?: WorkflowTemplateScalarWhereWithAggregatesInput | WorkflowTemplateScalarWhereWithAggregatesInput[]
    OR?: WorkflowTemplateScalarWhereWithAggregatesInput[]
    NOT?: WorkflowTemplateScalarWhereWithAggregatesInput | WorkflowTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkflowTemplate"> | string
    name?: StringWithAggregatesFilter<"WorkflowTemplate"> | string
    description?: StringWithAggregatesFilter<"WorkflowTemplate"> | string
    eventName?: StringWithAggregatesFilter<"WorkflowTemplate"> | string
    canBeScheduled?: BoolWithAggregatesFilter<"WorkflowTemplate"> | boolean
    requiredProviders?: EnumProviderNullableListFilter<"WorkflowTemplate">
    requiredScopes?: JsonNullableWithAggregatesFilter<"WorkflowTemplate">
    fields?: JsonNullableWithAggregatesFilter<"WorkflowTemplate">
    restrictedToUsers?: StringNullableListFilter<"WorkflowTemplate">
    tags?: StringNullableListFilter<"WorkflowTemplate">
    version?: StringWithAggregatesFilter<"WorkflowTemplate"> | string
  }

  export type UserCreateInput = {
    id?: string
    clerk_id: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    phone_number?: string | null
    role?: string
    language?: string
    is_active?: boolean
    workflows?: WorkflowCreateNestedManyWithoutUserInput
    credentials?: CredentialCreateNestedManyWithoutUserInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    clerk_id: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    phone_number?: string | null
    role?: string
    language?: string
    is_active?: boolean
    workflows?: WorkflowUncheckedCreateNestedManyWithoutUserInput
    credentials?: CredentialUncheckedCreateNestedManyWithoutUserInput
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerk_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    workflows?: WorkflowUpdateManyWithoutUserNestedInput
    credentials?: CredentialUpdateManyWithoutUserNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerk_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    workflows?: WorkflowUncheckedUpdateManyWithoutUserNestedInput
    credentials?: CredentialUncheckedUpdateManyWithoutUserNestedInput
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    clerk_id: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    phone_number?: string | null
    role?: string
    language?: string
    is_active?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerk_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerk_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CredentialCreateInput = {
    id?: string
    name: string
    type: $Enums.CredentialType
    provider: $Enums.Provider
    secret: string
    config?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCredentialsInput
    workflowCredentials?: WorkflowCredentialCreateNestedManyWithoutCredentialInput
  }

  export type CredentialUncheckedCreateInput = {
    id?: string
    name: string
    type: $Enums.CredentialType
    provider: $Enums.Provider
    secret: string
    config?: NullableJsonNullValueInput | InputJsonValue
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    workflowCredentials?: WorkflowCredentialUncheckedCreateNestedManyWithoutCredentialInput
  }

  export type CredentialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    secret?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCredentialsNestedInput
    workflowCredentials?: WorkflowCredentialUpdateManyWithoutCredentialNestedInput
  }

  export type CredentialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    secret?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workflowCredentials?: WorkflowCredentialUncheckedUpdateManyWithoutCredentialNestedInput
  }

  export type CredentialCreateManyInput = {
    id?: string
    name: string
    type: $Enums.CredentialType
    provider: $Enums.Provider
    secret: string
    config?: NullableJsonNullValueInput | InputJsonValue
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CredentialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    secret?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CredentialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    secret?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowCreateInput = {
    id?: string
    name: string
    templateId: string
    description?: string | null
    available?: boolean
    status?: $Enums.WorkflowStatus
    canBeScheduled?: boolean
    idempotencyKey?: string | null
    cronExpressions?: WorkflowCreatecronExpressionsInput | string[]
    timezone?: string | null
    lastRunAt?: Date | string | null
    nextRunAt?: Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    requiredProviders?: WorkflowCreaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutWorkflowsInput
    workflowCredentials?: WorkflowCredentialCreateNestedManyWithoutWorkflowInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowUncheckedCreateInput = {
    id?: string
    name: string
    templateId: string
    description?: string | null
    available?: boolean
    status?: $Enums.WorkflowStatus
    canBeScheduled?: boolean
    idempotencyKey?: string | null
    cronExpressions?: WorkflowCreatecronExpressionsInput | string[]
    timezone?: string | null
    lastRunAt?: Date | string | null
    nextRunAt?: Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    requiredProviders?: WorkflowCreaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialUncheckedCreateNestedManyWithoutWorkflowInput
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus
    canBeScheduled?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    cronExpressions?: WorkflowUpdatecronExpressionsInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requiredProviders?: WorkflowUpdaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutWorkflowsNestedInput
    workflowCredentials?: WorkflowCredentialUpdateManyWithoutWorkflowNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutWorkflowNestedInput
  }

  export type WorkflowUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus
    canBeScheduled?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    cronExpressions?: WorkflowUpdatecronExpressionsInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    requiredProviders?: WorkflowUpdaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialUncheckedUpdateManyWithoutWorkflowNestedInput
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutWorkflowNestedInput
  }

  export type WorkflowCreateManyInput = {
    id?: string
    name: string
    templateId: string
    description?: string | null
    available?: boolean
    status?: $Enums.WorkflowStatus
    canBeScheduled?: boolean
    idempotencyKey?: string | null
    cronExpressions?: WorkflowCreatecronExpressionsInput | string[]
    timezone?: string | null
    lastRunAt?: Date | string | null
    nextRunAt?: Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    requiredProviders?: WorkflowCreaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
  }

  export type WorkflowUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus
    canBeScheduled?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    cronExpressions?: WorkflowUpdatecronExpressionsInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requiredProviders?: WorkflowUpdaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
  }

  export type WorkflowUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus
    canBeScheduled?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    cronExpressions?: WorkflowUpdatecronExpressionsInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    requiredProviders?: WorkflowUpdaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
  }

  export type WorkflowCredentialCreateInput = {
    workflow: WorkflowCreateNestedOneWithoutWorkflowCredentialsInput
    credential: CredentialCreateNestedOneWithoutWorkflowCredentialsInput
  }

  export type WorkflowCredentialUncheckedCreateInput = {
    workflowId: string
    credentialId: string
  }

  export type WorkflowCredentialUpdateInput = {
    workflow?: WorkflowUpdateOneRequiredWithoutWorkflowCredentialsNestedInput
    credential?: CredentialUpdateOneRequiredWithoutWorkflowCredentialsNestedInput
  }

  export type WorkflowCredentialUncheckedUpdateInput = {
    workflowId?: StringFieldUpdateOperationsInput | string
    credentialId?: StringFieldUpdateOperationsInput | string
  }

  export type WorkflowCredentialCreateManyInput = {
    workflowId: string
    credentialId: string
  }

  export type WorkflowCredentialUpdateManyMutationInput = {

  }

  export type WorkflowCredentialUncheckedUpdateManyInput = {
    workflowId?: StringFieldUpdateOperationsInput | string
    credentialId?: StringFieldUpdateOperationsInput | string
  }

  export type WorkflowRunCreateInput = {
    id?: string
    inngestRunId: string
    idempotencyKey?: string | null
    status?: $Enums.RunStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    realtimeData?: WorkflowRunCreaterealtimeDataInput | InputJsonValue[]
    createdAt?: Date | string
    updatedAt?: Date | string
    workflow: WorkflowCreateNestedOneWithoutWorkflowRunsInput
    user: UserCreateNestedOneWithoutWorkflowRunsInput
  }

  export type WorkflowRunUncheckedCreateInput = {
    id?: string
    inngestRunId: string
    idempotencyKey?: string | null
    status?: $Enums.RunStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    realtimeData?: WorkflowRunCreaterealtimeDataInput | InputJsonValue[]
    workflowId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowRunUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inngestRunId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    realtimeData?: WorkflowRunUpdaterealtimeDataInput | InputJsonValue[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workflow?: WorkflowUpdateOneRequiredWithoutWorkflowRunsNestedInput
    user?: UserUpdateOneRequiredWithoutWorkflowRunsNestedInput
  }

  export type WorkflowRunUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inngestRunId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    realtimeData?: WorkflowRunUpdaterealtimeDataInput | InputJsonValue[]
    workflowId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowRunCreateManyInput = {
    id?: string
    inngestRunId: string
    idempotencyKey?: string | null
    status?: $Enums.RunStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    realtimeData?: WorkflowRunCreaterealtimeDataInput | InputJsonValue[]
    workflowId: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowRunUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    inngestRunId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    realtimeData?: WorkflowRunUpdaterealtimeDataInput | InputJsonValue[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowRunUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    inngestRunId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    realtimeData?: WorkflowRunUpdaterealtimeDataInput | InputJsonValue[]
    workflowId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowTemplateCreateInput = {
    id: string
    name: string
    description: string
    eventName: string
    canBeScheduled: boolean
    requiredProviders?: WorkflowTemplateCreaterequiredProvidersInput | $Enums.Provider[]
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    fields?: NullableJsonNullValueInput | InputJsonValue
    restrictedToUsers?: WorkflowTemplateCreaterestrictedToUsersInput | string[]
    tags?: WorkflowTemplateCreatetagsInput | string[]
    version: string
  }

  export type WorkflowTemplateUncheckedCreateInput = {
    id: string
    name: string
    description: string
    eventName: string
    canBeScheduled: boolean
    requiredProviders?: WorkflowTemplateCreaterequiredProvidersInput | $Enums.Provider[]
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    fields?: NullableJsonNullValueInput | InputJsonValue
    restrictedToUsers?: WorkflowTemplateCreaterestrictedToUsersInput | string[]
    tags?: WorkflowTemplateCreatetagsInput | string[]
    version: string
  }

  export type WorkflowTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    canBeScheduled?: BoolFieldUpdateOperationsInput | boolean
    requiredProviders?: WorkflowTemplateUpdaterequiredProvidersInput | $Enums.Provider[]
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    fields?: NullableJsonNullValueInput | InputJsonValue
    restrictedToUsers?: WorkflowTemplateUpdaterestrictedToUsersInput | string[]
    tags?: WorkflowTemplateUpdatetagsInput | string[]
    version?: StringFieldUpdateOperationsInput | string
  }

  export type WorkflowTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    canBeScheduled?: BoolFieldUpdateOperationsInput | boolean
    requiredProviders?: WorkflowTemplateUpdaterequiredProvidersInput | $Enums.Provider[]
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    fields?: NullableJsonNullValueInput | InputJsonValue
    restrictedToUsers?: WorkflowTemplateUpdaterestrictedToUsersInput | string[]
    tags?: WorkflowTemplateUpdatetagsInput | string[]
    version?: StringFieldUpdateOperationsInput | string
  }

  export type WorkflowTemplateCreateManyInput = {
    id: string
    name: string
    description: string
    eventName: string
    canBeScheduled: boolean
    requiredProviders?: WorkflowTemplateCreaterequiredProvidersInput | $Enums.Provider[]
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    fields?: NullableJsonNullValueInput | InputJsonValue
    restrictedToUsers?: WorkflowTemplateCreaterestrictedToUsersInput | string[]
    tags?: WorkflowTemplateCreatetagsInput | string[]
    version: string
  }

  export type WorkflowTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    canBeScheduled?: BoolFieldUpdateOperationsInput | boolean
    requiredProviders?: WorkflowTemplateUpdaterequiredProvidersInput | $Enums.Provider[]
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    fields?: NullableJsonNullValueInput | InputJsonValue
    restrictedToUsers?: WorkflowTemplateUpdaterestrictedToUsersInput | string[]
    tags?: WorkflowTemplateUpdatetagsInput | string[]
    version?: StringFieldUpdateOperationsInput | string
  }

  export type WorkflowTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    eventName?: StringFieldUpdateOperationsInput | string
    canBeScheduled?: BoolFieldUpdateOperationsInput | boolean
    requiredProviders?: WorkflowTemplateUpdaterequiredProvidersInput | $Enums.Provider[]
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    fields?: NullableJsonNullValueInput | InputJsonValue
    restrictedToUsers?: WorkflowTemplateUpdaterestrictedToUsersInput | string[]
    tags?: WorkflowTemplateUpdatetagsInput | string[]
    version?: StringFieldUpdateOperationsInput | string
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type WorkflowListRelationFilter = {
    every?: WorkflowWhereInput
    some?: WorkflowWhereInput
    none?: WorkflowWhereInput
  }

  export type CredentialListRelationFilter = {
    every?: CredentialWhereInput
    some?: CredentialWhereInput
    none?: CredentialWhereInput
  }

  export type WorkflowRunListRelationFilter = {
    every?: WorkflowRunWhereInput
    some?: WorkflowRunWhereInput
    none?: WorkflowRunWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WorkflowOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CredentialOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkflowRunOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    clerk_id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    phone_number?: SortOrder
    role?: SortOrder
    language?: SortOrder
    is_active?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    clerk_id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    phone_number?: SortOrder
    role?: SortOrder
    language?: SortOrder
    is_active?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    clerk_id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    phone_number?: SortOrder
    role?: SortOrder
    language?: SortOrder
    is_active?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumCredentialTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CredentialType | EnumCredentialTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CredentialType[] | ListEnumCredentialTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CredentialType[] | ListEnumCredentialTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCredentialTypeFilter<$PrismaModel> | $Enums.CredentialType
  }

  export type EnumProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderFilter<$PrismaModel> | $Enums.Provider
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type WorkflowCredentialListRelationFilter = {
    every?: WorkflowCredentialWhereInput
    some?: WorkflowCredentialWhereInput
    none?: WorkflowCredentialWhereInput
  }

  export type WorkflowCredentialOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CredentialUserIdNameCompoundUniqueInput = {
    userId: string
    name: string
  }

  export type CredentialCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    secret?: SortOrder
    config?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CredentialMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    secret?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CredentialMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    secret?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumCredentialTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CredentialType | EnumCredentialTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CredentialType[] | ListEnumCredentialTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CredentialType[] | ListEnumCredentialTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCredentialTypeWithAggregatesFilter<$PrismaModel> | $Enums.CredentialType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCredentialTypeFilter<$PrismaModel>
    _max?: NestedEnumCredentialTypeFilter<$PrismaModel>
  }

  export type EnumProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderWithAggregatesFilter<$PrismaModel> | $Enums.Provider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderFilter<$PrismaModel>
    _max?: NestedEnumProviderFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumWorkflowStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowStatus | EnumWorkflowStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowStatus[] | ListEnumWorkflowStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowStatus[] | ListEnumWorkflowStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowStatusFilter<$PrismaModel> | $Enums.WorkflowStatus
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumProviderNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel> | null
    has?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    hasSome?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type WorkflowCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    templateId?: SortOrder
    description?: SortOrder
    available?: SortOrder
    status?: SortOrder
    canBeScheduled?: SortOrder
    idempotencyKey?: SortOrder
    cronExpressions?: SortOrder
    timezone?: SortOrder
    lastRunAt?: SortOrder
    nextRunAt?: SortOrder
    fields?: SortOrder
    input?: SortOrder
    eventName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    requiredProviders?: SortOrder
    config?: SortOrder
  }

  export type WorkflowMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    templateId?: SortOrder
    description?: SortOrder
    available?: SortOrder
    status?: SortOrder
    canBeScheduled?: SortOrder
    idempotencyKey?: SortOrder
    timezone?: SortOrder
    lastRunAt?: SortOrder
    nextRunAt?: SortOrder
    eventName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type WorkflowMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    templateId?: SortOrder
    description?: SortOrder
    available?: SortOrder
    status?: SortOrder
    canBeScheduled?: SortOrder
    idempotencyKey?: SortOrder
    timezone?: SortOrder
    lastRunAt?: SortOrder
    nextRunAt?: SortOrder
    eventName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type EnumWorkflowStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowStatus | EnumWorkflowStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowStatus[] | ListEnumWorkflowStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowStatus[] | ListEnumWorkflowStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkflowStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWorkflowStatusFilter<$PrismaModel>
    _max?: NestedEnumWorkflowStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type WorkflowScalarRelationFilter = {
    is?: WorkflowWhereInput
    isNot?: WorkflowWhereInput
  }

  export type CredentialScalarRelationFilter = {
    is?: CredentialWhereInput
    isNot?: CredentialWhereInput
  }

  export type WorkflowCredentialWorkflowIdCredentialIdCompoundUniqueInput = {
    workflowId: string
    credentialId: string
  }

  export type WorkflowCredentialCountOrderByAggregateInput = {
    workflowId?: SortOrder
    credentialId?: SortOrder
  }

  export type WorkflowCredentialMaxOrderByAggregateInput = {
    workflowId?: SortOrder
    credentialId?: SortOrder
  }

  export type WorkflowCredentialMinOrderByAggregateInput = {
    workflowId?: SortOrder
    credentialId?: SortOrder
  }

  export type EnumRunStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RunStatus | EnumRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RunStatus[] | ListEnumRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RunStatus[] | ListEnumRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRunStatusFilter<$PrismaModel> | $Enums.RunStatus
  }
  export type JsonNullableListFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableListFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableListFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableListFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableListFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableListFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue[] | ListJsonFieldRefInput<$PrismaModel> | null
    has?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    hasEvery?: InputJsonValue[] | ListJsonFieldRefInput<$PrismaModel>
    hasSome?: InputJsonValue[] | ListJsonFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type WorkflowRunCountOrderByAggregateInput = {
    id?: SortOrder
    inngestRunId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    input?: SortOrder
    output?: SortOrder
    error?: SortOrder
    realtimeData?: SortOrder
    workflowId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkflowRunMaxOrderByAggregateInput = {
    id?: SortOrder
    inngestRunId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    error?: SortOrder
    workflowId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkflowRunMinOrderByAggregateInput = {
    id?: SortOrder
    inngestRunId?: SortOrder
    idempotencyKey?: SortOrder
    status?: SortOrder
    startedAt?: SortOrder
    completedAt?: SortOrder
    error?: SortOrder
    workflowId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRunStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RunStatus | EnumRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RunStatus[] | ListEnumRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RunStatus[] | ListEnumRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRunStatusWithAggregatesFilter<$PrismaModel> | $Enums.RunStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRunStatusFilter<$PrismaModel>
    _max?: NestedEnumRunStatusFilter<$PrismaModel>
  }

  export type WorkflowTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    eventName?: SortOrder
    canBeScheduled?: SortOrder
    requiredProviders?: SortOrder
    requiredScopes?: SortOrder
    fields?: SortOrder
    restrictedToUsers?: SortOrder
    tags?: SortOrder
    version?: SortOrder
  }

  export type WorkflowTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    eventName?: SortOrder
    canBeScheduled?: SortOrder
    version?: SortOrder
  }

  export type WorkflowTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    eventName?: SortOrder
    canBeScheduled?: SortOrder
    version?: SortOrder
  }

  export type WorkflowCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkflowCreateWithoutUserInput, WorkflowUncheckedCreateWithoutUserInput> | WorkflowCreateWithoutUserInput[] | WorkflowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkflowCreateOrConnectWithoutUserInput | WorkflowCreateOrConnectWithoutUserInput[]
    createMany?: WorkflowCreateManyUserInputEnvelope
    connect?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
  }

  export type CredentialCreateNestedManyWithoutUserInput = {
    create?: XOR<CredentialCreateWithoutUserInput, CredentialUncheckedCreateWithoutUserInput> | CredentialCreateWithoutUserInput[] | CredentialUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CredentialCreateOrConnectWithoutUserInput | CredentialCreateOrConnectWithoutUserInput[]
    createMany?: CredentialCreateManyUserInputEnvelope
    connect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
  }

  export type WorkflowRunCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkflowRunCreateWithoutUserInput, WorkflowRunUncheckedCreateWithoutUserInput> | WorkflowRunCreateWithoutUserInput[] | WorkflowRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutUserInput | WorkflowRunCreateOrConnectWithoutUserInput[]
    createMany?: WorkflowRunCreateManyUserInputEnvelope
    connect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
  }

  export type WorkflowUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkflowCreateWithoutUserInput, WorkflowUncheckedCreateWithoutUserInput> | WorkflowCreateWithoutUserInput[] | WorkflowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkflowCreateOrConnectWithoutUserInput | WorkflowCreateOrConnectWithoutUserInput[]
    createMany?: WorkflowCreateManyUserInputEnvelope
    connect?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
  }

  export type CredentialUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CredentialCreateWithoutUserInput, CredentialUncheckedCreateWithoutUserInput> | CredentialCreateWithoutUserInput[] | CredentialUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CredentialCreateOrConnectWithoutUserInput | CredentialCreateOrConnectWithoutUserInput[]
    createMany?: CredentialCreateManyUserInputEnvelope
    connect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
  }

  export type WorkflowRunUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkflowRunCreateWithoutUserInput, WorkflowRunUncheckedCreateWithoutUserInput> | WorkflowRunCreateWithoutUserInput[] | WorkflowRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutUserInput | WorkflowRunCreateOrConnectWithoutUserInput[]
    createMany?: WorkflowRunCreateManyUserInputEnvelope
    connect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type WorkflowUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkflowCreateWithoutUserInput, WorkflowUncheckedCreateWithoutUserInput> | WorkflowCreateWithoutUserInput[] | WorkflowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkflowCreateOrConnectWithoutUserInput | WorkflowCreateOrConnectWithoutUserInput[]
    upsert?: WorkflowUpsertWithWhereUniqueWithoutUserInput | WorkflowUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkflowCreateManyUserInputEnvelope
    set?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
    disconnect?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
    delete?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
    connect?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
    update?: WorkflowUpdateWithWhereUniqueWithoutUserInput | WorkflowUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkflowUpdateManyWithWhereWithoutUserInput | WorkflowUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkflowScalarWhereInput | WorkflowScalarWhereInput[]
  }

  export type CredentialUpdateManyWithoutUserNestedInput = {
    create?: XOR<CredentialCreateWithoutUserInput, CredentialUncheckedCreateWithoutUserInput> | CredentialCreateWithoutUserInput[] | CredentialUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CredentialCreateOrConnectWithoutUserInput | CredentialCreateOrConnectWithoutUserInput[]
    upsert?: CredentialUpsertWithWhereUniqueWithoutUserInput | CredentialUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CredentialCreateManyUserInputEnvelope
    set?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    disconnect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    delete?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    connect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    update?: CredentialUpdateWithWhereUniqueWithoutUserInput | CredentialUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CredentialUpdateManyWithWhereWithoutUserInput | CredentialUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CredentialScalarWhereInput | CredentialScalarWhereInput[]
  }

  export type WorkflowRunUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkflowRunCreateWithoutUserInput, WorkflowRunUncheckedCreateWithoutUserInput> | WorkflowRunCreateWithoutUserInput[] | WorkflowRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutUserInput | WorkflowRunCreateOrConnectWithoutUserInput[]
    upsert?: WorkflowRunUpsertWithWhereUniqueWithoutUserInput | WorkflowRunUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkflowRunCreateManyUserInputEnvelope
    set?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    disconnect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    delete?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    connect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    update?: WorkflowRunUpdateWithWhereUniqueWithoutUserInput | WorkflowRunUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkflowRunUpdateManyWithWhereWithoutUserInput | WorkflowRunUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkflowRunScalarWhereInput | WorkflowRunScalarWhereInput[]
  }

  export type WorkflowUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkflowCreateWithoutUserInput, WorkflowUncheckedCreateWithoutUserInput> | WorkflowCreateWithoutUserInput[] | WorkflowUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkflowCreateOrConnectWithoutUserInput | WorkflowCreateOrConnectWithoutUserInput[]
    upsert?: WorkflowUpsertWithWhereUniqueWithoutUserInput | WorkflowUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkflowCreateManyUserInputEnvelope
    set?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
    disconnect?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
    delete?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
    connect?: WorkflowWhereUniqueInput | WorkflowWhereUniqueInput[]
    update?: WorkflowUpdateWithWhereUniqueWithoutUserInput | WorkflowUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkflowUpdateManyWithWhereWithoutUserInput | WorkflowUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkflowScalarWhereInput | WorkflowScalarWhereInput[]
  }

  export type CredentialUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CredentialCreateWithoutUserInput, CredentialUncheckedCreateWithoutUserInput> | CredentialCreateWithoutUserInput[] | CredentialUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CredentialCreateOrConnectWithoutUserInput | CredentialCreateOrConnectWithoutUserInput[]
    upsert?: CredentialUpsertWithWhereUniqueWithoutUserInput | CredentialUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CredentialCreateManyUserInputEnvelope
    set?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    disconnect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    delete?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    connect?: CredentialWhereUniqueInput | CredentialWhereUniqueInput[]
    update?: CredentialUpdateWithWhereUniqueWithoutUserInput | CredentialUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CredentialUpdateManyWithWhereWithoutUserInput | CredentialUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CredentialScalarWhereInput | CredentialScalarWhereInput[]
  }

  export type WorkflowRunUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkflowRunCreateWithoutUserInput, WorkflowRunUncheckedCreateWithoutUserInput> | WorkflowRunCreateWithoutUserInput[] | WorkflowRunUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutUserInput | WorkflowRunCreateOrConnectWithoutUserInput[]
    upsert?: WorkflowRunUpsertWithWhereUniqueWithoutUserInput | WorkflowRunUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkflowRunCreateManyUserInputEnvelope
    set?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    disconnect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    delete?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    connect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    update?: WorkflowRunUpdateWithWhereUniqueWithoutUserInput | WorkflowRunUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkflowRunUpdateManyWithWhereWithoutUserInput | WorkflowRunUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkflowRunScalarWhereInput | WorkflowRunScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCredentialsInput = {
    create?: XOR<UserCreateWithoutCredentialsInput, UserUncheckedCreateWithoutCredentialsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCredentialsInput
    connect?: UserWhereUniqueInput
  }

  export type WorkflowCredentialCreateNestedManyWithoutCredentialInput = {
    create?: XOR<WorkflowCredentialCreateWithoutCredentialInput, WorkflowCredentialUncheckedCreateWithoutCredentialInput> | WorkflowCredentialCreateWithoutCredentialInput[] | WorkflowCredentialUncheckedCreateWithoutCredentialInput[]
    connectOrCreate?: WorkflowCredentialCreateOrConnectWithoutCredentialInput | WorkflowCredentialCreateOrConnectWithoutCredentialInput[]
    createMany?: WorkflowCredentialCreateManyCredentialInputEnvelope
    connect?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
  }

  export type WorkflowCredentialUncheckedCreateNestedManyWithoutCredentialInput = {
    create?: XOR<WorkflowCredentialCreateWithoutCredentialInput, WorkflowCredentialUncheckedCreateWithoutCredentialInput> | WorkflowCredentialCreateWithoutCredentialInput[] | WorkflowCredentialUncheckedCreateWithoutCredentialInput[]
    connectOrCreate?: WorkflowCredentialCreateOrConnectWithoutCredentialInput | WorkflowCredentialCreateOrConnectWithoutCredentialInput[]
    createMany?: WorkflowCredentialCreateManyCredentialInputEnvelope
    connect?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
  }

  export type EnumCredentialTypeFieldUpdateOperationsInput = {
    set?: $Enums.CredentialType
  }

  export type EnumProviderFieldUpdateOperationsInput = {
    set?: $Enums.Provider
  }

  export type UserUpdateOneRequiredWithoutCredentialsNestedInput = {
    create?: XOR<UserCreateWithoutCredentialsInput, UserUncheckedCreateWithoutCredentialsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCredentialsInput
    upsert?: UserUpsertWithoutCredentialsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCredentialsInput, UserUpdateWithoutCredentialsInput>, UserUncheckedUpdateWithoutCredentialsInput>
  }

  export type WorkflowCredentialUpdateManyWithoutCredentialNestedInput = {
    create?: XOR<WorkflowCredentialCreateWithoutCredentialInput, WorkflowCredentialUncheckedCreateWithoutCredentialInput> | WorkflowCredentialCreateWithoutCredentialInput[] | WorkflowCredentialUncheckedCreateWithoutCredentialInput[]
    connectOrCreate?: WorkflowCredentialCreateOrConnectWithoutCredentialInput | WorkflowCredentialCreateOrConnectWithoutCredentialInput[]
    upsert?: WorkflowCredentialUpsertWithWhereUniqueWithoutCredentialInput | WorkflowCredentialUpsertWithWhereUniqueWithoutCredentialInput[]
    createMany?: WorkflowCredentialCreateManyCredentialInputEnvelope
    set?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
    disconnect?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
    delete?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
    connect?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
    update?: WorkflowCredentialUpdateWithWhereUniqueWithoutCredentialInput | WorkflowCredentialUpdateWithWhereUniqueWithoutCredentialInput[]
    updateMany?: WorkflowCredentialUpdateManyWithWhereWithoutCredentialInput | WorkflowCredentialUpdateManyWithWhereWithoutCredentialInput[]
    deleteMany?: WorkflowCredentialScalarWhereInput | WorkflowCredentialScalarWhereInput[]
  }

  export type WorkflowCredentialUncheckedUpdateManyWithoutCredentialNestedInput = {
    create?: XOR<WorkflowCredentialCreateWithoutCredentialInput, WorkflowCredentialUncheckedCreateWithoutCredentialInput> | WorkflowCredentialCreateWithoutCredentialInput[] | WorkflowCredentialUncheckedCreateWithoutCredentialInput[]
    connectOrCreate?: WorkflowCredentialCreateOrConnectWithoutCredentialInput | WorkflowCredentialCreateOrConnectWithoutCredentialInput[]
    upsert?: WorkflowCredentialUpsertWithWhereUniqueWithoutCredentialInput | WorkflowCredentialUpsertWithWhereUniqueWithoutCredentialInput[]
    createMany?: WorkflowCredentialCreateManyCredentialInputEnvelope
    set?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
    disconnect?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
    delete?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
    connect?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
    update?: WorkflowCredentialUpdateWithWhereUniqueWithoutCredentialInput | WorkflowCredentialUpdateWithWhereUniqueWithoutCredentialInput[]
    updateMany?: WorkflowCredentialUpdateManyWithWhereWithoutCredentialInput | WorkflowCredentialUpdateManyWithWhereWithoutCredentialInput[]
    deleteMany?: WorkflowCredentialScalarWhereInput | WorkflowCredentialScalarWhereInput[]
  }

  export type WorkflowCreatecronExpressionsInput = {
    set: string[]
  }

  export type WorkflowCreaterequiredProvidersInput = {
    set: $Enums.Provider[]
  }

  export type UserCreateNestedOneWithoutWorkflowsInput = {
    create?: XOR<UserCreateWithoutWorkflowsInput, UserUncheckedCreateWithoutWorkflowsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkflowsInput
    connect?: UserWhereUniqueInput
  }

  export type WorkflowCredentialCreateNestedManyWithoutWorkflowInput = {
    create?: XOR<WorkflowCredentialCreateWithoutWorkflowInput, WorkflowCredentialUncheckedCreateWithoutWorkflowInput> | WorkflowCredentialCreateWithoutWorkflowInput[] | WorkflowCredentialUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowCredentialCreateOrConnectWithoutWorkflowInput | WorkflowCredentialCreateOrConnectWithoutWorkflowInput[]
    createMany?: WorkflowCredentialCreateManyWorkflowInputEnvelope
    connect?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
  }

  export type WorkflowRunCreateNestedManyWithoutWorkflowInput = {
    create?: XOR<WorkflowRunCreateWithoutWorkflowInput, WorkflowRunUncheckedCreateWithoutWorkflowInput> | WorkflowRunCreateWithoutWorkflowInput[] | WorkflowRunUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutWorkflowInput | WorkflowRunCreateOrConnectWithoutWorkflowInput[]
    createMany?: WorkflowRunCreateManyWorkflowInputEnvelope
    connect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
  }

  export type WorkflowCredentialUncheckedCreateNestedManyWithoutWorkflowInput = {
    create?: XOR<WorkflowCredentialCreateWithoutWorkflowInput, WorkflowCredentialUncheckedCreateWithoutWorkflowInput> | WorkflowCredentialCreateWithoutWorkflowInput[] | WorkflowCredentialUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowCredentialCreateOrConnectWithoutWorkflowInput | WorkflowCredentialCreateOrConnectWithoutWorkflowInput[]
    createMany?: WorkflowCredentialCreateManyWorkflowInputEnvelope
    connect?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
  }

  export type WorkflowRunUncheckedCreateNestedManyWithoutWorkflowInput = {
    create?: XOR<WorkflowRunCreateWithoutWorkflowInput, WorkflowRunUncheckedCreateWithoutWorkflowInput> | WorkflowRunCreateWithoutWorkflowInput[] | WorkflowRunUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutWorkflowInput | WorkflowRunCreateOrConnectWithoutWorkflowInput[]
    createMany?: WorkflowRunCreateManyWorkflowInputEnvelope
    connect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
  }

  export type EnumWorkflowStatusFieldUpdateOperationsInput = {
    set?: $Enums.WorkflowStatus
  }

  export type WorkflowUpdatecronExpressionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type WorkflowUpdaterequiredProvidersInput = {
    set?: $Enums.Provider[]
    push?: $Enums.Provider | $Enums.Provider[]
  }

  export type UserUpdateOneRequiredWithoutWorkflowsNestedInput = {
    create?: XOR<UserCreateWithoutWorkflowsInput, UserUncheckedCreateWithoutWorkflowsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkflowsInput
    upsert?: UserUpsertWithoutWorkflowsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkflowsInput, UserUpdateWithoutWorkflowsInput>, UserUncheckedUpdateWithoutWorkflowsInput>
  }

  export type WorkflowCredentialUpdateManyWithoutWorkflowNestedInput = {
    create?: XOR<WorkflowCredentialCreateWithoutWorkflowInput, WorkflowCredentialUncheckedCreateWithoutWorkflowInput> | WorkflowCredentialCreateWithoutWorkflowInput[] | WorkflowCredentialUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowCredentialCreateOrConnectWithoutWorkflowInput | WorkflowCredentialCreateOrConnectWithoutWorkflowInput[]
    upsert?: WorkflowCredentialUpsertWithWhereUniqueWithoutWorkflowInput | WorkflowCredentialUpsertWithWhereUniqueWithoutWorkflowInput[]
    createMany?: WorkflowCredentialCreateManyWorkflowInputEnvelope
    set?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
    disconnect?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
    delete?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
    connect?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
    update?: WorkflowCredentialUpdateWithWhereUniqueWithoutWorkflowInput | WorkflowCredentialUpdateWithWhereUniqueWithoutWorkflowInput[]
    updateMany?: WorkflowCredentialUpdateManyWithWhereWithoutWorkflowInput | WorkflowCredentialUpdateManyWithWhereWithoutWorkflowInput[]
    deleteMany?: WorkflowCredentialScalarWhereInput | WorkflowCredentialScalarWhereInput[]
  }

  export type WorkflowRunUpdateManyWithoutWorkflowNestedInput = {
    create?: XOR<WorkflowRunCreateWithoutWorkflowInput, WorkflowRunUncheckedCreateWithoutWorkflowInput> | WorkflowRunCreateWithoutWorkflowInput[] | WorkflowRunUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutWorkflowInput | WorkflowRunCreateOrConnectWithoutWorkflowInput[]
    upsert?: WorkflowRunUpsertWithWhereUniqueWithoutWorkflowInput | WorkflowRunUpsertWithWhereUniqueWithoutWorkflowInput[]
    createMany?: WorkflowRunCreateManyWorkflowInputEnvelope
    set?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    disconnect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    delete?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    connect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    update?: WorkflowRunUpdateWithWhereUniqueWithoutWorkflowInput | WorkflowRunUpdateWithWhereUniqueWithoutWorkflowInput[]
    updateMany?: WorkflowRunUpdateManyWithWhereWithoutWorkflowInput | WorkflowRunUpdateManyWithWhereWithoutWorkflowInput[]
    deleteMany?: WorkflowRunScalarWhereInput | WorkflowRunScalarWhereInput[]
  }

  export type WorkflowCredentialUncheckedUpdateManyWithoutWorkflowNestedInput = {
    create?: XOR<WorkflowCredentialCreateWithoutWorkflowInput, WorkflowCredentialUncheckedCreateWithoutWorkflowInput> | WorkflowCredentialCreateWithoutWorkflowInput[] | WorkflowCredentialUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowCredentialCreateOrConnectWithoutWorkflowInput | WorkflowCredentialCreateOrConnectWithoutWorkflowInput[]
    upsert?: WorkflowCredentialUpsertWithWhereUniqueWithoutWorkflowInput | WorkflowCredentialUpsertWithWhereUniqueWithoutWorkflowInput[]
    createMany?: WorkflowCredentialCreateManyWorkflowInputEnvelope
    set?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
    disconnect?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
    delete?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
    connect?: WorkflowCredentialWhereUniqueInput | WorkflowCredentialWhereUniqueInput[]
    update?: WorkflowCredentialUpdateWithWhereUniqueWithoutWorkflowInput | WorkflowCredentialUpdateWithWhereUniqueWithoutWorkflowInput[]
    updateMany?: WorkflowCredentialUpdateManyWithWhereWithoutWorkflowInput | WorkflowCredentialUpdateManyWithWhereWithoutWorkflowInput[]
    deleteMany?: WorkflowCredentialScalarWhereInput | WorkflowCredentialScalarWhereInput[]
  }

  export type WorkflowRunUncheckedUpdateManyWithoutWorkflowNestedInput = {
    create?: XOR<WorkflowRunCreateWithoutWorkflowInput, WorkflowRunUncheckedCreateWithoutWorkflowInput> | WorkflowRunCreateWithoutWorkflowInput[] | WorkflowRunUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: WorkflowRunCreateOrConnectWithoutWorkflowInput | WorkflowRunCreateOrConnectWithoutWorkflowInput[]
    upsert?: WorkflowRunUpsertWithWhereUniqueWithoutWorkflowInput | WorkflowRunUpsertWithWhereUniqueWithoutWorkflowInput[]
    createMany?: WorkflowRunCreateManyWorkflowInputEnvelope
    set?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    disconnect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    delete?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    connect?: WorkflowRunWhereUniqueInput | WorkflowRunWhereUniqueInput[]
    update?: WorkflowRunUpdateWithWhereUniqueWithoutWorkflowInput | WorkflowRunUpdateWithWhereUniqueWithoutWorkflowInput[]
    updateMany?: WorkflowRunUpdateManyWithWhereWithoutWorkflowInput | WorkflowRunUpdateManyWithWhereWithoutWorkflowInput[]
    deleteMany?: WorkflowRunScalarWhereInput | WorkflowRunScalarWhereInput[]
  }

  export type WorkflowCreateNestedOneWithoutWorkflowCredentialsInput = {
    create?: XOR<WorkflowCreateWithoutWorkflowCredentialsInput, WorkflowUncheckedCreateWithoutWorkflowCredentialsInput>
    connectOrCreate?: WorkflowCreateOrConnectWithoutWorkflowCredentialsInput
    connect?: WorkflowWhereUniqueInput
  }

  export type CredentialCreateNestedOneWithoutWorkflowCredentialsInput = {
    create?: XOR<CredentialCreateWithoutWorkflowCredentialsInput, CredentialUncheckedCreateWithoutWorkflowCredentialsInput>
    connectOrCreate?: CredentialCreateOrConnectWithoutWorkflowCredentialsInput
    connect?: CredentialWhereUniqueInput
  }

  export type WorkflowUpdateOneRequiredWithoutWorkflowCredentialsNestedInput = {
    create?: XOR<WorkflowCreateWithoutWorkflowCredentialsInput, WorkflowUncheckedCreateWithoutWorkflowCredentialsInput>
    connectOrCreate?: WorkflowCreateOrConnectWithoutWorkflowCredentialsInput
    upsert?: WorkflowUpsertWithoutWorkflowCredentialsInput
    connect?: WorkflowWhereUniqueInput
    update?: XOR<XOR<WorkflowUpdateToOneWithWhereWithoutWorkflowCredentialsInput, WorkflowUpdateWithoutWorkflowCredentialsInput>, WorkflowUncheckedUpdateWithoutWorkflowCredentialsInput>
  }

  export type CredentialUpdateOneRequiredWithoutWorkflowCredentialsNestedInput = {
    create?: XOR<CredentialCreateWithoutWorkflowCredentialsInput, CredentialUncheckedCreateWithoutWorkflowCredentialsInput>
    connectOrCreate?: CredentialCreateOrConnectWithoutWorkflowCredentialsInput
    upsert?: CredentialUpsertWithoutWorkflowCredentialsInput
    connect?: CredentialWhereUniqueInput
    update?: XOR<XOR<CredentialUpdateToOneWithWhereWithoutWorkflowCredentialsInput, CredentialUpdateWithoutWorkflowCredentialsInput>, CredentialUncheckedUpdateWithoutWorkflowCredentialsInput>
  }

  export type WorkflowRunCreaterealtimeDataInput = {
    set: InputJsonValue[]
  }

  export type WorkflowCreateNestedOneWithoutWorkflowRunsInput = {
    create?: XOR<WorkflowCreateWithoutWorkflowRunsInput, WorkflowUncheckedCreateWithoutWorkflowRunsInput>
    connectOrCreate?: WorkflowCreateOrConnectWithoutWorkflowRunsInput
    connect?: WorkflowWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutWorkflowRunsInput = {
    create?: XOR<UserCreateWithoutWorkflowRunsInput, UserUncheckedCreateWithoutWorkflowRunsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkflowRunsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumRunStatusFieldUpdateOperationsInput = {
    set?: $Enums.RunStatus
  }

  export type WorkflowRunUpdaterealtimeDataInput = {
    set?: InputJsonValue[]
    push?: InputJsonValue | InputJsonValue[]
  }

  export type WorkflowUpdateOneRequiredWithoutWorkflowRunsNestedInput = {
    create?: XOR<WorkflowCreateWithoutWorkflowRunsInput, WorkflowUncheckedCreateWithoutWorkflowRunsInput>
    connectOrCreate?: WorkflowCreateOrConnectWithoutWorkflowRunsInput
    upsert?: WorkflowUpsertWithoutWorkflowRunsInput
    connect?: WorkflowWhereUniqueInput
    update?: XOR<XOR<WorkflowUpdateToOneWithWhereWithoutWorkflowRunsInput, WorkflowUpdateWithoutWorkflowRunsInput>, WorkflowUncheckedUpdateWithoutWorkflowRunsInput>
  }

  export type UserUpdateOneRequiredWithoutWorkflowRunsNestedInput = {
    create?: XOR<UserCreateWithoutWorkflowRunsInput, UserUncheckedCreateWithoutWorkflowRunsInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkflowRunsInput
    upsert?: UserUpsertWithoutWorkflowRunsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkflowRunsInput, UserUpdateWithoutWorkflowRunsInput>, UserUncheckedUpdateWithoutWorkflowRunsInput>
  }

  export type WorkflowTemplateCreaterequiredProvidersInput = {
    set: $Enums.Provider[]
  }

  export type WorkflowTemplateCreaterestrictedToUsersInput = {
    set: string[]
  }

  export type WorkflowTemplateCreatetagsInput = {
    set: string[]
  }

  export type WorkflowTemplateUpdaterequiredProvidersInput = {
    set?: $Enums.Provider[]
    push?: $Enums.Provider | $Enums.Provider[]
  }

  export type WorkflowTemplateUpdaterestrictedToUsersInput = {
    set?: string[]
    push?: string | string[]
  }

  export type WorkflowTemplateUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumCredentialTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.CredentialType | EnumCredentialTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CredentialType[] | ListEnumCredentialTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CredentialType[] | ListEnumCredentialTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCredentialTypeFilter<$PrismaModel> | $Enums.CredentialType
  }

  export type NestedEnumProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderFilter<$PrismaModel> | $Enums.Provider
  }

  export type NestedEnumCredentialTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CredentialType | EnumCredentialTypeFieldRefInput<$PrismaModel>
    in?: $Enums.CredentialType[] | ListEnumCredentialTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CredentialType[] | ListEnumCredentialTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumCredentialTypeWithAggregatesFilter<$PrismaModel> | $Enums.CredentialType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCredentialTypeFilter<$PrismaModel>
    _max?: NestedEnumCredentialTypeFilter<$PrismaModel>
  }

  export type NestedEnumProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel>
    in?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumProviderWithAggregatesFilter<$PrismaModel> | $Enums.Provider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProviderFilter<$PrismaModel>
    _max?: NestedEnumProviderFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumWorkflowStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowStatus | EnumWorkflowStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowStatus[] | ListEnumWorkflowStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowStatus[] | ListEnumWorkflowStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowStatusFilter<$PrismaModel> | $Enums.WorkflowStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumWorkflowStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowStatus | EnumWorkflowStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowStatus[] | ListEnumWorkflowStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowStatus[] | ListEnumWorkflowStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkflowStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWorkflowStatusFilter<$PrismaModel>
    _max?: NestedEnumWorkflowStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumRunStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RunStatus | EnumRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RunStatus[] | ListEnumRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RunStatus[] | ListEnumRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRunStatusFilter<$PrismaModel> | $Enums.RunStatus
  }

  export type NestedEnumRunStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RunStatus | EnumRunStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RunStatus[] | ListEnumRunStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RunStatus[] | ListEnumRunStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRunStatusWithAggregatesFilter<$PrismaModel> | $Enums.RunStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRunStatusFilter<$PrismaModel>
    _max?: NestedEnumRunStatusFilter<$PrismaModel>
  }

  export type WorkflowCreateWithoutUserInput = {
    id?: string
    name: string
    templateId: string
    description?: string | null
    available?: boolean
    status?: $Enums.WorkflowStatus
    canBeScheduled?: boolean
    idempotencyKey?: string | null
    cronExpressions?: WorkflowCreatecronExpressionsInput | string[]
    timezone?: string | null
    lastRunAt?: Date | string | null
    nextRunAt?: Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    requiredProviders?: WorkflowCreaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialCreateNestedManyWithoutWorkflowInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    templateId: string
    description?: string | null
    available?: boolean
    status?: $Enums.WorkflowStatus
    canBeScheduled?: boolean
    idempotencyKey?: string | null
    cronExpressions?: WorkflowCreatecronExpressionsInput | string[]
    timezone?: string | null
    lastRunAt?: Date | string | null
    nextRunAt?: Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    requiredProviders?: WorkflowCreaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialUncheckedCreateNestedManyWithoutWorkflowInput
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowCreateOrConnectWithoutUserInput = {
    where: WorkflowWhereUniqueInput
    create: XOR<WorkflowCreateWithoutUserInput, WorkflowUncheckedCreateWithoutUserInput>
  }

  export type WorkflowCreateManyUserInputEnvelope = {
    data: WorkflowCreateManyUserInput | WorkflowCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CredentialCreateWithoutUserInput = {
    id?: string
    name: string
    type: $Enums.CredentialType
    provider: $Enums.Provider
    secret: string
    config?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    workflowCredentials?: WorkflowCredentialCreateNestedManyWithoutCredentialInput
  }

  export type CredentialUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    type: $Enums.CredentialType
    provider: $Enums.Provider
    secret: string
    config?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    workflowCredentials?: WorkflowCredentialUncheckedCreateNestedManyWithoutCredentialInput
  }

  export type CredentialCreateOrConnectWithoutUserInput = {
    where: CredentialWhereUniqueInput
    create: XOR<CredentialCreateWithoutUserInput, CredentialUncheckedCreateWithoutUserInput>
  }

  export type CredentialCreateManyUserInputEnvelope = {
    data: CredentialCreateManyUserInput | CredentialCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowRunCreateWithoutUserInput = {
    id?: string
    inngestRunId: string
    idempotencyKey?: string | null
    status?: $Enums.RunStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    realtimeData?: WorkflowRunCreaterealtimeDataInput | InputJsonValue[]
    createdAt?: Date | string
    updatedAt?: Date | string
    workflow: WorkflowCreateNestedOneWithoutWorkflowRunsInput
  }

  export type WorkflowRunUncheckedCreateWithoutUserInput = {
    id?: string
    inngestRunId: string
    idempotencyKey?: string | null
    status?: $Enums.RunStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    realtimeData?: WorkflowRunCreaterealtimeDataInput | InputJsonValue[]
    workflowId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowRunCreateOrConnectWithoutUserInput = {
    where: WorkflowRunWhereUniqueInput
    create: XOR<WorkflowRunCreateWithoutUserInput, WorkflowRunUncheckedCreateWithoutUserInput>
  }

  export type WorkflowRunCreateManyUserInputEnvelope = {
    data: WorkflowRunCreateManyUserInput | WorkflowRunCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowUpsertWithWhereUniqueWithoutUserInput = {
    where: WorkflowWhereUniqueInput
    update: XOR<WorkflowUpdateWithoutUserInput, WorkflowUncheckedUpdateWithoutUserInput>
    create: XOR<WorkflowCreateWithoutUserInput, WorkflowUncheckedCreateWithoutUserInput>
  }

  export type WorkflowUpdateWithWhereUniqueWithoutUserInput = {
    where: WorkflowWhereUniqueInput
    data: XOR<WorkflowUpdateWithoutUserInput, WorkflowUncheckedUpdateWithoutUserInput>
  }

  export type WorkflowUpdateManyWithWhereWithoutUserInput = {
    where: WorkflowScalarWhereInput
    data: XOR<WorkflowUpdateManyMutationInput, WorkflowUncheckedUpdateManyWithoutUserInput>
  }

  export type WorkflowScalarWhereInput = {
    AND?: WorkflowScalarWhereInput | WorkflowScalarWhereInput[]
    OR?: WorkflowScalarWhereInput[]
    NOT?: WorkflowScalarWhereInput | WorkflowScalarWhereInput[]
    id?: StringFilter<"Workflow"> | string
    name?: StringFilter<"Workflow"> | string
    templateId?: StringFilter<"Workflow"> | string
    description?: StringNullableFilter<"Workflow"> | string | null
    available?: BoolFilter<"Workflow"> | boolean
    status?: EnumWorkflowStatusFilter<"Workflow"> | $Enums.WorkflowStatus
    canBeScheduled?: BoolFilter<"Workflow"> | boolean
    idempotencyKey?: StringNullableFilter<"Workflow"> | string | null
    cronExpressions?: StringNullableListFilter<"Workflow">
    timezone?: StringNullableFilter<"Workflow"> | string | null
    lastRunAt?: DateTimeNullableFilter<"Workflow"> | Date | string | null
    nextRunAt?: DateTimeNullableFilter<"Workflow"> | Date | string | null
    fields?: JsonNullableFilter<"Workflow">
    input?: JsonNullableFilter<"Workflow">
    eventName?: StringFilter<"Workflow"> | string
    createdAt?: DateTimeFilter<"Workflow"> | Date | string
    updatedAt?: DateTimeFilter<"Workflow"> | Date | string
    userId?: StringFilter<"Workflow"> | string
    requiredProviders?: EnumProviderNullableListFilter<"Workflow">
    config?: JsonNullableFilter<"Workflow">
  }

  export type CredentialUpsertWithWhereUniqueWithoutUserInput = {
    where: CredentialWhereUniqueInput
    update: XOR<CredentialUpdateWithoutUserInput, CredentialUncheckedUpdateWithoutUserInput>
    create: XOR<CredentialCreateWithoutUserInput, CredentialUncheckedCreateWithoutUserInput>
  }

  export type CredentialUpdateWithWhereUniqueWithoutUserInput = {
    where: CredentialWhereUniqueInput
    data: XOR<CredentialUpdateWithoutUserInput, CredentialUncheckedUpdateWithoutUserInput>
  }

  export type CredentialUpdateManyWithWhereWithoutUserInput = {
    where: CredentialScalarWhereInput
    data: XOR<CredentialUpdateManyMutationInput, CredentialUncheckedUpdateManyWithoutUserInput>
  }

  export type CredentialScalarWhereInput = {
    AND?: CredentialScalarWhereInput | CredentialScalarWhereInput[]
    OR?: CredentialScalarWhereInput[]
    NOT?: CredentialScalarWhereInput | CredentialScalarWhereInput[]
    id?: StringFilter<"Credential"> | string
    name?: StringFilter<"Credential"> | string
    type?: EnumCredentialTypeFilter<"Credential"> | $Enums.CredentialType
    provider?: EnumProviderFilter<"Credential"> | $Enums.Provider
    secret?: StringFilter<"Credential"> | string
    config?: JsonNullableFilter<"Credential">
    userId?: StringFilter<"Credential"> | string
    createdAt?: DateTimeFilter<"Credential"> | Date | string
    updatedAt?: DateTimeFilter<"Credential"> | Date | string
  }

  export type WorkflowRunUpsertWithWhereUniqueWithoutUserInput = {
    where: WorkflowRunWhereUniqueInput
    update: XOR<WorkflowRunUpdateWithoutUserInput, WorkflowRunUncheckedUpdateWithoutUserInput>
    create: XOR<WorkflowRunCreateWithoutUserInput, WorkflowRunUncheckedCreateWithoutUserInput>
  }

  export type WorkflowRunUpdateWithWhereUniqueWithoutUserInput = {
    where: WorkflowRunWhereUniqueInput
    data: XOR<WorkflowRunUpdateWithoutUserInput, WorkflowRunUncheckedUpdateWithoutUserInput>
  }

  export type WorkflowRunUpdateManyWithWhereWithoutUserInput = {
    where: WorkflowRunScalarWhereInput
    data: XOR<WorkflowRunUpdateManyMutationInput, WorkflowRunUncheckedUpdateManyWithoutUserInput>
  }

  export type WorkflowRunScalarWhereInput = {
    AND?: WorkflowRunScalarWhereInput | WorkflowRunScalarWhereInput[]
    OR?: WorkflowRunScalarWhereInput[]
    NOT?: WorkflowRunScalarWhereInput | WorkflowRunScalarWhereInput[]
    id?: StringFilter<"WorkflowRun"> | string
    inngestRunId?: StringFilter<"WorkflowRun"> | string
    idempotencyKey?: StringNullableFilter<"WorkflowRun"> | string | null
    status?: EnumRunStatusFilter<"WorkflowRun"> | $Enums.RunStatus
    startedAt?: DateTimeFilter<"WorkflowRun"> | Date | string
    completedAt?: DateTimeNullableFilter<"WorkflowRun"> | Date | string | null
    input?: JsonNullableFilter<"WorkflowRun">
    output?: JsonNullableFilter<"WorkflowRun">
    error?: StringNullableFilter<"WorkflowRun"> | string | null
    realtimeData?: JsonNullableListFilter<"WorkflowRun">
    workflowId?: StringFilter<"WorkflowRun"> | string
    userId?: StringFilter<"WorkflowRun"> | string
    createdAt?: DateTimeFilter<"WorkflowRun"> | Date | string
    updatedAt?: DateTimeFilter<"WorkflowRun"> | Date | string
  }

  export type UserCreateWithoutCredentialsInput = {
    id?: string
    clerk_id: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    phone_number?: string | null
    role?: string
    language?: string
    is_active?: boolean
    workflows?: WorkflowCreateNestedManyWithoutUserInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCredentialsInput = {
    id?: string
    clerk_id: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    phone_number?: string | null
    role?: string
    language?: string
    is_active?: boolean
    workflows?: WorkflowUncheckedCreateNestedManyWithoutUserInput
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCredentialsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCredentialsInput, UserUncheckedCreateWithoutCredentialsInput>
  }

  export type WorkflowCredentialCreateWithoutCredentialInput = {
    workflow: WorkflowCreateNestedOneWithoutWorkflowCredentialsInput
  }

  export type WorkflowCredentialUncheckedCreateWithoutCredentialInput = {
    workflowId: string
  }

  export type WorkflowCredentialCreateOrConnectWithoutCredentialInput = {
    where: WorkflowCredentialWhereUniqueInput
    create: XOR<WorkflowCredentialCreateWithoutCredentialInput, WorkflowCredentialUncheckedCreateWithoutCredentialInput>
  }

  export type WorkflowCredentialCreateManyCredentialInputEnvelope = {
    data: WorkflowCredentialCreateManyCredentialInput | WorkflowCredentialCreateManyCredentialInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCredentialsInput = {
    update: XOR<UserUpdateWithoutCredentialsInput, UserUncheckedUpdateWithoutCredentialsInput>
    create: XOR<UserCreateWithoutCredentialsInput, UserUncheckedCreateWithoutCredentialsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCredentialsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCredentialsInput, UserUncheckedUpdateWithoutCredentialsInput>
  }

  export type UserUpdateWithoutCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerk_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    workflows?: WorkflowUpdateManyWithoutUserNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerk_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    workflows?: WorkflowUncheckedUpdateManyWithoutUserNestedInput
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WorkflowCredentialUpsertWithWhereUniqueWithoutCredentialInput = {
    where: WorkflowCredentialWhereUniqueInput
    update: XOR<WorkflowCredentialUpdateWithoutCredentialInput, WorkflowCredentialUncheckedUpdateWithoutCredentialInput>
    create: XOR<WorkflowCredentialCreateWithoutCredentialInput, WorkflowCredentialUncheckedCreateWithoutCredentialInput>
  }

  export type WorkflowCredentialUpdateWithWhereUniqueWithoutCredentialInput = {
    where: WorkflowCredentialWhereUniqueInput
    data: XOR<WorkflowCredentialUpdateWithoutCredentialInput, WorkflowCredentialUncheckedUpdateWithoutCredentialInput>
  }

  export type WorkflowCredentialUpdateManyWithWhereWithoutCredentialInput = {
    where: WorkflowCredentialScalarWhereInput
    data: XOR<WorkflowCredentialUpdateManyMutationInput, WorkflowCredentialUncheckedUpdateManyWithoutCredentialInput>
  }

  export type WorkflowCredentialScalarWhereInput = {
    AND?: WorkflowCredentialScalarWhereInput | WorkflowCredentialScalarWhereInput[]
    OR?: WorkflowCredentialScalarWhereInput[]
    NOT?: WorkflowCredentialScalarWhereInput | WorkflowCredentialScalarWhereInput[]
    workflowId?: StringFilter<"WorkflowCredential"> | string
    credentialId?: StringFilter<"WorkflowCredential"> | string
  }

  export type UserCreateWithoutWorkflowsInput = {
    id?: string
    clerk_id: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    phone_number?: string | null
    role?: string
    language?: string
    is_active?: boolean
    credentials?: CredentialCreateNestedManyWithoutUserInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWorkflowsInput = {
    id?: string
    clerk_id: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    phone_number?: string | null
    role?: string
    language?: string
    is_active?: boolean
    credentials?: CredentialUncheckedCreateNestedManyWithoutUserInput
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWorkflowsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkflowsInput, UserUncheckedCreateWithoutWorkflowsInput>
  }

  export type WorkflowCredentialCreateWithoutWorkflowInput = {
    credential: CredentialCreateNestedOneWithoutWorkflowCredentialsInput
  }

  export type WorkflowCredentialUncheckedCreateWithoutWorkflowInput = {
    credentialId: string
  }

  export type WorkflowCredentialCreateOrConnectWithoutWorkflowInput = {
    where: WorkflowCredentialWhereUniqueInput
    create: XOR<WorkflowCredentialCreateWithoutWorkflowInput, WorkflowCredentialUncheckedCreateWithoutWorkflowInput>
  }

  export type WorkflowCredentialCreateManyWorkflowInputEnvelope = {
    data: WorkflowCredentialCreateManyWorkflowInput | WorkflowCredentialCreateManyWorkflowInput[]
    skipDuplicates?: boolean
  }

  export type WorkflowRunCreateWithoutWorkflowInput = {
    id?: string
    inngestRunId: string
    idempotencyKey?: string | null
    status?: $Enums.RunStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    realtimeData?: WorkflowRunCreaterealtimeDataInput | InputJsonValue[]
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutWorkflowRunsInput
  }

  export type WorkflowRunUncheckedCreateWithoutWorkflowInput = {
    id?: string
    inngestRunId: string
    idempotencyKey?: string | null
    status?: $Enums.RunStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    realtimeData?: WorkflowRunCreaterealtimeDataInput | InputJsonValue[]
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowRunCreateOrConnectWithoutWorkflowInput = {
    where: WorkflowRunWhereUniqueInput
    create: XOR<WorkflowRunCreateWithoutWorkflowInput, WorkflowRunUncheckedCreateWithoutWorkflowInput>
  }

  export type WorkflowRunCreateManyWorkflowInputEnvelope = {
    data: WorkflowRunCreateManyWorkflowInput | WorkflowRunCreateManyWorkflowInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutWorkflowsInput = {
    update: XOR<UserUpdateWithoutWorkflowsInput, UserUncheckedUpdateWithoutWorkflowsInput>
    create: XOR<UserCreateWithoutWorkflowsInput, UserUncheckedCreateWithoutWorkflowsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkflowsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkflowsInput, UserUncheckedUpdateWithoutWorkflowsInput>
  }

  export type UserUpdateWithoutWorkflowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerk_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    credentials?: CredentialUpdateManyWithoutUserNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkflowsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerk_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    credentials?: CredentialUncheckedUpdateManyWithoutUserNestedInput
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WorkflowCredentialUpsertWithWhereUniqueWithoutWorkflowInput = {
    where: WorkflowCredentialWhereUniqueInput
    update: XOR<WorkflowCredentialUpdateWithoutWorkflowInput, WorkflowCredentialUncheckedUpdateWithoutWorkflowInput>
    create: XOR<WorkflowCredentialCreateWithoutWorkflowInput, WorkflowCredentialUncheckedCreateWithoutWorkflowInput>
  }

  export type WorkflowCredentialUpdateWithWhereUniqueWithoutWorkflowInput = {
    where: WorkflowCredentialWhereUniqueInput
    data: XOR<WorkflowCredentialUpdateWithoutWorkflowInput, WorkflowCredentialUncheckedUpdateWithoutWorkflowInput>
  }

  export type WorkflowCredentialUpdateManyWithWhereWithoutWorkflowInput = {
    where: WorkflowCredentialScalarWhereInput
    data: XOR<WorkflowCredentialUpdateManyMutationInput, WorkflowCredentialUncheckedUpdateManyWithoutWorkflowInput>
  }

  export type WorkflowRunUpsertWithWhereUniqueWithoutWorkflowInput = {
    where: WorkflowRunWhereUniqueInput
    update: XOR<WorkflowRunUpdateWithoutWorkflowInput, WorkflowRunUncheckedUpdateWithoutWorkflowInput>
    create: XOR<WorkflowRunCreateWithoutWorkflowInput, WorkflowRunUncheckedCreateWithoutWorkflowInput>
  }

  export type WorkflowRunUpdateWithWhereUniqueWithoutWorkflowInput = {
    where: WorkflowRunWhereUniqueInput
    data: XOR<WorkflowRunUpdateWithoutWorkflowInput, WorkflowRunUncheckedUpdateWithoutWorkflowInput>
  }

  export type WorkflowRunUpdateManyWithWhereWithoutWorkflowInput = {
    where: WorkflowRunScalarWhereInput
    data: XOR<WorkflowRunUpdateManyMutationInput, WorkflowRunUncheckedUpdateManyWithoutWorkflowInput>
  }

  export type WorkflowCreateWithoutWorkflowCredentialsInput = {
    id?: string
    name: string
    templateId: string
    description?: string | null
    available?: boolean
    status?: $Enums.WorkflowStatus
    canBeScheduled?: boolean
    idempotencyKey?: string | null
    cronExpressions?: WorkflowCreatecronExpressionsInput | string[]
    timezone?: string | null
    lastRunAt?: Date | string | null
    nextRunAt?: Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    requiredProviders?: WorkflowCreaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutWorkflowsInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowUncheckedCreateWithoutWorkflowCredentialsInput = {
    id?: string
    name: string
    templateId: string
    description?: string | null
    available?: boolean
    status?: $Enums.WorkflowStatus
    canBeScheduled?: boolean
    idempotencyKey?: string | null
    cronExpressions?: WorkflowCreatecronExpressionsInput | string[]
    timezone?: string | null
    lastRunAt?: Date | string | null
    nextRunAt?: Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    requiredProviders?: WorkflowCreaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowCreateOrConnectWithoutWorkflowCredentialsInput = {
    where: WorkflowWhereUniqueInput
    create: XOR<WorkflowCreateWithoutWorkflowCredentialsInput, WorkflowUncheckedCreateWithoutWorkflowCredentialsInput>
  }

  export type CredentialCreateWithoutWorkflowCredentialsInput = {
    id?: string
    name: string
    type: $Enums.CredentialType
    provider: $Enums.Provider
    secret: string
    config?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCredentialsInput
  }

  export type CredentialUncheckedCreateWithoutWorkflowCredentialsInput = {
    id?: string
    name: string
    type: $Enums.CredentialType
    provider: $Enums.Provider
    secret: string
    config?: NullableJsonNullValueInput | InputJsonValue
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CredentialCreateOrConnectWithoutWorkflowCredentialsInput = {
    where: CredentialWhereUniqueInput
    create: XOR<CredentialCreateWithoutWorkflowCredentialsInput, CredentialUncheckedCreateWithoutWorkflowCredentialsInput>
  }

  export type WorkflowUpsertWithoutWorkflowCredentialsInput = {
    update: XOR<WorkflowUpdateWithoutWorkflowCredentialsInput, WorkflowUncheckedUpdateWithoutWorkflowCredentialsInput>
    create: XOR<WorkflowCreateWithoutWorkflowCredentialsInput, WorkflowUncheckedCreateWithoutWorkflowCredentialsInput>
    where?: WorkflowWhereInput
  }

  export type WorkflowUpdateToOneWithWhereWithoutWorkflowCredentialsInput = {
    where?: WorkflowWhereInput
    data: XOR<WorkflowUpdateWithoutWorkflowCredentialsInput, WorkflowUncheckedUpdateWithoutWorkflowCredentialsInput>
  }

  export type WorkflowUpdateWithoutWorkflowCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus
    canBeScheduled?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    cronExpressions?: WorkflowUpdatecronExpressionsInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requiredProviders?: WorkflowUpdaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutWorkflowsNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutWorkflowNestedInput
  }

  export type WorkflowUncheckedUpdateWithoutWorkflowCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus
    canBeScheduled?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    cronExpressions?: WorkflowUpdatecronExpressionsInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    requiredProviders?: WorkflowUpdaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutWorkflowNestedInput
  }

  export type CredentialUpsertWithoutWorkflowCredentialsInput = {
    update: XOR<CredentialUpdateWithoutWorkflowCredentialsInput, CredentialUncheckedUpdateWithoutWorkflowCredentialsInput>
    create: XOR<CredentialCreateWithoutWorkflowCredentialsInput, CredentialUncheckedCreateWithoutWorkflowCredentialsInput>
    where?: CredentialWhereInput
  }

  export type CredentialUpdateToOneWithWhereWithoutWorkflowCredentialsInput = {
    where?: CredentialWhereInput
    data: XOR<CredentialUpdateWithoutWorkflowCredentialsInput, CredentialUncheckedUpdateWithoutWorkflowCredentialsInput>
  }

  export type CredentialUpdateWithoutWorkflowCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    secret?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCredentialsNestedInput
  }

  export type CredentialUncheckedUpdateWithoutWorkflowCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    secret?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowCreateWithoutWorkflowRunsInput = {
    id?: string
    name: string
    templateId: string
    description?: string | null
    available?: boolean
    status?: $Enums.WorkflowStatus
    canBeScheduled?: boolean
    idempotencyKey?: string | null
    cronExpressions?: WorkflowCreatecronExpressionsInput | string[]
    timezone?: string | null
    lastRunAt?: Date | string | null
    nextRunAt?: Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    requiredProviders?: WorkflowCreaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutWorkflowsInput
    workflowCredentials?: WorkflowCredentialCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowUncheckedCreateWithoutWorkflowRunsInput = {
    id?: string
    name: string
    templateId: string
    description?: string | null
    available?: boolean
    status?: $Enums.WorkflowStatus
    canBeScheduled?: boolean
    idempotencyKey?: string | null
    cronExpressions?: WorkflowCreatecronExpressionsInput | string[]
    timezone?: string | null
    lastRunAt?: Date | string | null
    nextRunAt?: Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    requiredProviders?: WorkflowCreaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialUncheckedCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowCreateOrConnectWithoutWorkflowRunsInput = {
    where: WorkflowWhereUniqueInput
    create: XOR<WorkflowCreateWithoutWorkflowRunsInput, WorkflowUncheckedCreateWithoutWorkflowRunsInput>
  }

  export type UserCreateWithoutWorkflowRunsInput = {
    id?: string
    clerk_id: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    phone_number?: string | null
    role?: string
    language?: string
    is_active?: boolean
    workflows?: WorkflowCreateNestedManyWithoutUserInput
    credentials?: CredentialCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWorkflowRunsInput = {
    id?: string
    clerk_id: string
    email: string
    name?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    phone_number?: string | null
    role?: string
    language?: string
    is_active?: boolean
    workflows?: WorkflowUncheckedCreateNestedManyWithoutUserInput
    credentials?: CredentialUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWorkflowRunsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkflowRunsInput, UserUncheckedCreateWithoutWorkflowRunsInput>
  }

  export type WorkflowUpsertWithoutWorkflowRunsInput = {
    update: XOR<WorkflowUpdateWithoutWorkflowRunsInput, WorkflowUncheckedUpdateWithoutWorkflowRunsInput>
    create: XOR<WorkflowCreateWithoutWorkflowRunsInput, WorkflowUncheckedCreateWithoutWorkflowRunsInput>
    where?: WorkflowWhereInput
  }

  export type WorkflowUpdateToOneWithWhereWithoutWorkflowRunsInput = {
    where?: WorkflowWhereInput
    data: XOR<WorkflowUpdateWithoutWorkflowRunsInput, WorkflowUncheckedUpdateWithoutWorkflowRunsInput>
  }

  export type WorkflowUpdateWithoutWorkflowRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus
    canBeScheduled?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    cronExpressions?: WorkflowUpdatecronExpressionsInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requiredProviders?: WorkflowUpdaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutWorkflowsNestedInput
    workflowCredentials?: WorkflowCredentialUpdateManyWithoutWorkflowNestedInput
  }

  export type WorkflowUncheckedUpdateWithoutWorkflowRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus
    canBeScheduled?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    cronExpressions?: WorkflowUpdatecronExpressionsInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    requiredProviders?: WorkflowUpdaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialUncheckedUpdateManyWithoutWorkflowNestedInput
  }

  export type UserUpsertWithoutWorkflowRunsInput = {
    update: XOR<UserUpdateWithoutWorkflowRunsInput, UserUncheckedUpdateWithoutWorkflowRunsInput>
    create: XOR<UserCreateWithoutWorkflowRunsInput, UserUncheckedCreateWithoutWorkflowRunsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkflowRunsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkflowRunsInput, UserUncheckedUpdateWithoutWorkflowRunsInput>
  }

  export type UserUpdateWithoutWorkflowRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerk_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    workflows?: WorkflowUpdateManyWithoutUserNestedInput
    credentials?: CredentialUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkflowRunsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerk_id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    phone_number?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    workflows?: WorkflowUncheckedUpdateManyWithoutUserNestedInput
    credentials?: CredentialUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WorkflowCreateManyUserInput = {
    id?: string
    name: string
    templateId: string
    description?: string | null
    available?: boolean
    status?: $Enums.WorkflowStatus
    canBeScheduled?: boolean
    idempotencyKey?: string | null
    cronExpressions?: WorkflowCreatecronExpressionsInput | string[]
    timezone?: string | null
    lastRunAt?: Date | string | null
    nextRunAt?: Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName: string
    createdAt?: Date | string
    updatedAt?: Date | string
    requiredProviders?: WorkflowCreaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
  }

  export type CredentialCreateManyUserInput = {
    id?: string
    name: string
    type: $Enums.CredentialType
    provider: $Enums.Provider
    secret: string
    config?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowRunCreateManyUserInput = {
    id?: string
    inngestRunId: string
    idempotencyKey?: string | null
    status?: $Enums.RunStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    realtimeData?: WorkflowRunCreaterealtimeDataInput | InputJsonValue[]
    workflowId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus
    canBeScheduled?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    cronExpressions?: WorkflowUpdatecronExpressionsInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requiredProviders?: WorkflowUpdaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialUpdateManyWithoutWorkflowNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutWorkflowNestedInput
  }

  export type WorkflowUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus
    canBeScheduled?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    cronExpressions?: WorkflowUpdatecronExpressionsInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requiredProviders?: WorkflowUpdaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialUncheckedUpdateManyWithoutWorkflowNestedInput
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutWorkflowNestedInput
  }

  export type WorkflowUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    available?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumWorkflowStatusFieldUpdateOperationsInput | $Enums.WorkflowStatus
    canBeScheduled?: BoolFieldUpdateOperationsInput | boolean
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    cronExpressions?: WorkflowUpdatecronExpressionsInput | string[]
    timezone?: NullableStringFieldUpdateOperationsInput | string | null
    lastRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextRunAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fields?: NullableJsonNullValueInput | InputJsonValue
    input?: NullableJsonNullValueInput | InputJsonValue
    eventName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    requiredProviders?: WorkflowUpdaterequiredProvidersInput | $Enums.Provider[]
    config?: NullableJsonNullValueInput | InputJsonValue
  }

  export type CredentialUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    secret?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workflowCredentials?: WorkflowCredentialUpdateManyWithoutCredentialNestedInput
  }

  export type CredentialUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    secret?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workflowCredentials?: WorkflowCredentialUncheckedUpdateManyWithoutCredentialNestedInput
  }

  export type CredentialUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    secret?: StringFieldUpdateOperationsInput | string
    config?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowRunUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    inngestRunId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    realtimeData?: WorkflowRunUpdaterealtimeDataInput | InputJsonValue[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workflow?: WorkflowUpdateOneRequiredWithoutWorkflowRunsNestedInput
  }

  export type WorkflowRunUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    inngestRunId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    realtimeData?: WorkflowRunUpdaterealtimeDataInput | InputJsonValue[]
    workflowId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowRunUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    inngestRunId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    realtimeData?: WorkflowRunUpdaterealtimeDataInput | InputJsonValue[]
    workflowId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowCredentialCreateManyCredentialInput = {
    workflowId: string
  }

  export type WorkflowCredentialUpdateWithoutCredentialInput = {
    workflow?: WorkflowUpdateOneRequiredWithoutWorkflowCredentialsNestedInput
  }

  export type WorkflowCredentialUncheckedUpdateWithoutCredentialInput = {
    workflowId?: StringFieldUpdateOperationsInput | string
  }

  export type WorkflowCredentialUncheckedUpdateManyWithoutCredentialInput = {
    workflowId?: StringFieldUpdateOperationsInput | string
  }

  export type WorkflowCredentialCreateManyWorkflowInput = {
    credentialId: string
  }

  export type WorkflowRunCreateManyWorkflowInput = {
    id?: string
    inngestRunId: string
    idempotencyKey?: string | null
    status?: $Enums.RunStatus
    startedAt?: Date | string
    completedAt?: Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: string | null
    realtimeData?: WorkflowRunCreaterealtimeDataInput | InputJsonValue[]
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkflowCredentialUpdateWithoutWorkflowInput = {
    credential?: CredentialUpdateOneRequiredWithoutWorkflowCredentialsNestedInput
  }

  export type WorkflowCredentialUncheckedUpdateWithoutWorkflowInput = {
    credentialId?: StringFieldUpdateOperationsInput | string
  }

  export type WorkflowCredentialUncheckedUpdateManyWithoutWorkflowInput = {
    credentialId?: StringFieldUpdateOperationsInput | string
  }

  export type WorkflowRunUpdateWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    inngestRunId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    realtimeData?: WorkflowRunUpdaterealtimeDataInput | InputJsonValue[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWorkflowRunsNestedInput
  }

  export type WorkflowRunUncheckedUpdateWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    inngestRunId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    realtimeData?: WorkflowRunUpdaterealtimeDataInput | InputJsonValue[]
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkflowRunUncheckedUpdateManyWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    inngestRunId?: StringFieldUpdateOperationsInput | string
    idempotencyKey?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumRunStatusFieldUpdateOperationsInput | $Enums.RunStatus
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    input?: NullableJsonNullValueInput | InputJsonValue
    output?: NullableJsonNullValueInput | InputJsonValue
    error?: NullableStringFieldUpdateOperationsInput | string | null
    realtimeData?: WorkflowRunUpdaterealtimeDataInput | InputJsonValue[]
    userId?: StringFieldUpdateOperationsInput | string
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