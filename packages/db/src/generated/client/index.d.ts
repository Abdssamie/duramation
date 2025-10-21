
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
 * Model ClientBranding
 * 
 */
export type ClientBranding = $Result.DefaultSelection<Prisma.$ClientBrandingPayload>
/**
 * Model ServiceRequest
 * 
 */
export type ServiceRequest = $Result.DefaultSelection<Prisma.$ServiceRequestPayload>
/**
 * Model AutomationMetrics
 * 
 */
export type AutomationMetrics = $Result.DefaultSelection<Prisma.$AutomationMetricsPayload>
/**
 * Model ApiKey
 * 
 */
export type ApiKey = $Result.DefaultSelection<Prisma.$ApiKeyPayload>

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
  MICROSOFT: 'MICROSOFT',
  HUBSPOT: 'HUBSPOT',
  FIRECRAWL: 'FIRECRAWL',
  INSTAGRAM: 'INSTAGRAM',
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


export const RequestPriority: {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT'
};

export type RequestPriority = (typeof RequestPriority)[keyof typeof RequestPriority]


export const RequestStatus: {
  SUBMITTED: 'SUBMITTED',
  REVIEWED: 'REVIEWED',
  MEETING_SCHEDULED: 'MEETING_SCHEDULED',
  PROPOSAL_SENT: 'PROPOSAL_SENT',
  APPROVED: 'APPROVED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus]

}

export type CredentialType = $Enums.CredentialType

export const CredentialType: typeof $Enums.CredentialType

export type Provider = $Enums.Provider

export const Provider: typeof $Enums.Provider

export type WorkflowStatus = $Enums.WorkflowStatus

export const WorkflowStatus: typeof $Enums.WorkflowStatus

export type RunStatus = $Enums.RunStatus

export const RunStatus: typeof $Enums.RunStatus

export type RequestPriority = $Enums.RequestPriority

export const RequestPriority: typeof $Enums.RequestPriority

export type RequestStatus = $Enums.RequestStatus

export const RequestStatus: typeof $Enums.RequestStatus

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

  /**
   * `prisma.clientBranding`: Exposes CRUD operations for the **ClientBranding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClientBrandings
    * const clientBrandings = await prisma.clientBranding.findMany()
    * ```
    */
  get clientBranding(): Prisma.ClientBrandingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceRequest`: Exposes CRUD operations for the **ServiceRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceRequests
    * const serviceRequests = await prisma.serviceRequest.findMany()
    * ```
    */
  get serviceRequest(): Prisma.ServiceRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.automationMetrics`: Exposes CRUD operations for the **AutomationMetrics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AutomationMetrics
    * const automationMetrics = await prisma.automationMetrics.findMany()
    * ```
    */
  get automationMetrics(): Prisma.AutomationMetricsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.apiKey`: Exposes CRUD operations for the **ApiKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ApiKeys
    * const apiKeys = await prisma.apiKey.findMany()
    * ```
    */
  get apiKey(): Prisma.ApiKeyDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.17.1
   * Query Engine version: 272a37d34178c2894197e17273bf937f25acdeac
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
    WorkflowTemplate: 'WorkflowTemplate',
    ClientBranding: 'ClientBranding',
    ServiceRequest: 'ServiceRequest',
    AutomationMetrics: 'AutomationMetrics',
    ApiKey: 'ApiKey'
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
      modelProps: "user" | "credential" | "workflow" | "workflowCredential" | "workflowRun" | "workflowTemplate" | "clientBranding" | "serviceRequest" | "automationMetrics" | "apiKey"
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
      ClientBranding: {
        payload: Prisma.$ClientBrandingPayload<ExtArgs>
        fields: Prisma.ClientBrandingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientBrandingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientBrandingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientBrandingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientBrandingPayload>
          }
          findFirst: {
            args: Prisma.ClientBrandingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientBrandingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientBrandingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientBrandingPayload>
          }
          findMany: {
            args: Prisma.ClientBrandingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientBrandingPayload>[]
          }
          create: {
            args: Prisma.ClientBrandingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientBrandingPayload>
          }
          createMany: {
            args: Prisma.ClientBrandingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClientBrandingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientBrandingPayload>[]
          }
          delete: {
            args: Prisma.ClientBrandingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientBrandingPayload>
          }
          update: {
            args: Prisma.ClientBrandingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientBrandingPayload>
          }
          deleteMany: {
            args: Prisma.ClientBrandingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientBrandingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClientBrandingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientBrandingPayload>[]
          }
          upsert: {
            args: Prisma.ClientBrandingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientBrandingPayload>
          }
          aggregate: {
            args: Prisma.ClientBrandingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClientBranding>
          }
          groupBy: {
            args: Prisma.ClientBrandingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientBrandingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientBrandingCountArgs<ExtArgs>
            result: $Utils.Optional<ClientBrandingCountAggregateOutputType> | number
          }
        }
      }
      ServiceRequest: {
        payload: Prisma.$ServiceRequestPayload<ExtArgs>
        fields: Prisma.ServiceRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>
          }
          findFirst: {
            args: Prisma.ServiceRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>
          }
          findMany: {
            args: Prisma.ServiceRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>[]
          }
          create: {
            args: Prisma.ServiceRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>
          }
          createMany: {
            args: Prisma.ServiceRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>[]
          }
          delete: {
            args: Prisma.ServiceRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>
          }
          update: {
            args: Prisma.ServiceRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>
          }
          deleteMany: {
            args: Prisma.ServiceRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>[]
          }
          upsert: {
            args: Prisma.ServiceRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRequestPayload>
          }
          aggregate: {
            args: Prisma.ServiceRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceRequest>
          }
          groupBy: {
            args: Prisma.ServiceRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceRequestCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceRequestCountAggregateOutputType> | number
          }
        }
      }
      AutomationMetrics: {
        payload: Prisma.$AutomationMetricsPayload<ExtArgs>
        fields: Prisma.AutomationMetricsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AutomationMetricsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationMetricsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AutomationMetricsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationMetricsPayload>
          }
          findFirst: {
            args: Prisma.AutomationMetricsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationMetricsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AutomationMetricsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationMetricsPayload>
          }
          findMany: {
            args: Prisma.AutomationMetricsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationMetricsPayload>[]
          }
          create: {
            args: Prisma.AutomationMetricsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationMetricsPayload>
          }
          createMany: {
            args: Prisma.AutomationMetricsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AutomationMetricsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationMetricsPayload>[]
          }
          delete: {
            args: Prisma.AutomationMetricsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationMetricsPayload>
          }
          update: {
            args: Prisma.AutomationMetricsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationMetricsPayload>
          }
          deleteMany: {
            args: Prisma.AutomationMetricsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AutomationMetricsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AutomationMetricsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationMetricsPayload>[]
          }
          upsert: {
            args: Prisma.AutomationMetricsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AutomationMetricsPayload>
          }
          aggregate: {
            args: Prisma.AutomationMetricsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAutomationMetrics>
          }
          groupBy: {
            args: Prisma.AutomationMetricsGroupByArgs<ExtArgs>
            result: $Utils.Optional<AutomationMetricsGroupByOutputType>[]
          }
          count: {
            args: Prisma.AutomationMetricsCountArgs<ExtArgs>
            result: $Utils.Optional<AutomationMetricsCountAggregateOutputType> | number
          }
        }
      }
      ApiKey: {
        payload: Prisma.$ApiKeyPayload<ExtArgs>
        fields: Prisma.ApiKeyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApiKeyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApiKeyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findFirst: {
            args: Prisma.ApiKeyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApiKeyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          findMany: {
            args: Prisma.ApiKeyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          create: {
            args: Prisma.ApiKeyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          createMany: {
            args: Prisma.ApiKeyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ApiKeyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          delete: {
            args: Prisma.ApiKeyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          update: {
            args: Prisma.ApiKeyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          deleteMany: {
            args: Prisma.ApiKeyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApiKeyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ApiKeyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>[]
          }
          upsert: {
            args: Prisma.ApiKeyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApiKeyPayload>
          }
          aggregate: {
            args: Prisma.ApiKeyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApiKey>
          }
          groupBy: {
            args: Prisma.ApiKeyGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyGroupByOutputType>[]
          }
          count: {
            args: Prisma.ApiKeyCountArgs<ExtArgs>
            result: $Utils.Optional<ApiKeyCountAggregateOutputType> | number
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
    clientBranding?: ClientBrandingOmit
    serviceRequest?: ServiceRequestOmit
    automationMetrics?: AutomationMetricsOmit
    apiKey?: ApiKeyOmit
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
    serviceRequests: number
    apiKeys: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflows?: boolean | UserCountOutputTypeCountWorkflowsArgs
    credentials?: boolean | UserCountOutputTypeCountCredentialsArgs
    workflowRuns?: boolean | UserCountOutputTypeCountWorkflowRunsArgs
    serviceRequests?: boolean | UserCountOutputTypeCountServiceRequestsArgs
    apiKeys?: boolean | UserCountOutputTypeCountApiKeysArgs
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
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountServiceRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApiKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
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
    automationMetrics: number
  }

  export type WorkflowCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflowCredentials?: boolean | WorkflowCountOutputTypeCountWorkflowCredentialsArgs
    workflowRuns?: boolean | WorkflowCountOutputTypeCountWorkflowRunsArgs
    automationMetrics?: boolean | WorkflowCountOutputTypeCountAutomationMetricsArgs
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
   * WorkflowCountOutputType without action
   */
  export type WorkflowCountOutputTypeCountAutomationMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AutomationMetricsWhereInput
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
    clientBranding?: boolean | User$clientBrandingArgs<ExtArgs>
    serviceRequests?: boolean | User$serviceRequestsArgs<ExtArgs>
    apiKeys?: boolean | User$apiKeysArgs<ExtArgs>
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
    clientBranding?: boolean | User$clientBrandingArgs<ExtArgs>
    serviceRequests?: boolean | User$serviceRequestsArgs<ExtArgs>
    apiKeys?: boolean | User$apiKeysArgs<ExtArgs>
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
      clientBranding: Prisma.$ClientBrandingPayload<ExtArgs> | null
      serviceRequests: Prisma.$ServiceRequestPayload<ExtArgs>[]
      apiKeys: Prisma.$ApiKeyPayload<ExtArgs>[]
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
    clientBranding<T extends User$clientBrandingArgs<ExtArgs> = {}>(args?: Subset<T, User$clientBrandingArgs<ExtArgs>>): Prisma__ClientBrandingClient<$Result.GetResult<Prisma.$ClientBrandingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    serviceRequests<T extends User$serviceRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$serviceRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    apiKeys<T extends User$apiKeysArgs<ExtArgs> = {}>(args?: Subset<T, User$apiKeysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * User.clientBranding
   */
  export type User$clientBrandingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientBranding
     */
    select?: ClientBrandingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientBranding
     */
    omit?: ClientBrandingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientBrandingInclude<ExtArgs> | null
    where?: ClientBrandingWhereInput
  }

  /**
   * User.serviceRequests
   */
  export type User$serviceRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    where?: ServiceRequestWhereInput
    orderBy?: ServiceRequestOrderByWithRelationInput | ServiceRequestOrderByWithRelationInput[]
    cursor?: ServiceRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceRequestScalarFieldEnum | ServiceRequestScalarFieldEnum[]
  }

  /**
   * User.apiKeys
   */
  export type User$apiKeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    cursor?: ApiKeyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
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
    expiresIn: Date | null
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
    expiresIn: Date | null
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
    expiresIn: number
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
    expiresIn?: true
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
    expiresIn?: true
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
    expiresIn?: true
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
    secret: string | null
    config: JsonValue | null
    expiresIn: Date | null
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
    expiresIn?: boolean
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
    expiresIn?: boolean
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
    expiresIn?: boolean
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
    expiresIn?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CredentialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "provider" | "secret" | "config" | "expiresIn" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["credential"]>
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
       * @encrypted - Stored as encrypted JSON string
       */
      secret: string | null
      config: Prisma.JsonValue | null
      expiresIn: Date | null
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
    readonly expiresIn: FieldRef<"Credential", 'DateTime'>
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
    version: string | null
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
    version: string | null
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
    requiredScopes: number
    version: number
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
    version?: true
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
    version?: true
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
    requiredScopes?: true
    version?: true
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
    requiredScopes: JsonValue | null
    version: string | null
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
    requiredScopes?: boolean
    version?: boolean
    config?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    workflowCredentials?: boolean | Workflow$workflowCredentialsArgs<ExtArgs>
    workflowRuns?: boolean | Workflow$workflowRunsArgs<ExtArgs>
    automationMetrics?: boolean | Workflow$automationMetricsArgs<ExtArgs>
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
    requiredScopes?: boolean
    version?: boolean
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
    requiredScopes?: boolean
    version?: boolean
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
    requiredScopes?: boolean
    version?: boolean
    config?: boolean
  }

  export type WorkflowOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "templateId" | "description" | "available" | "status" | "canBeScheduled" | "idempotencyKey" | "cronExpressions" | "timezone" | "lastRunAt" | "nextRunAt" | "fields" | "input" | "eventName" | "createdAt" | "updatedAt" | "userId" | "requiredProviders" | "requiredScopes" | "version" | "config", ExtArgs["result"]["workflow"]>
  export type WorkflowInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    workflowCredentials?: boolean | Workflow$workflowCredentialsArgs<ExtArgs>
    workflowRuns?: boolean | Workflow$workflowRunsArgs<ExtArgs>
    automationMetrics?: boolean | Workflow$automationMetricsArgs<ExtArgs>
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
      automationMetrics: Prisma.$AutomationMetricsPayload<ExtArgs>[]
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
      requiredScopes: Prisma.JsonValue | null
      version: string | null
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
    automationMetrics<T extends Workflow$automationMetricsArgs<ExtArgs> = {}>(args?: Subset<T, Workflow$automationMetricsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AutomationMetricsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly requiredScopes: FieldRef<"Workflow", 'Json'>
    readonly version: FieldRef<"Workflow", 'String'>
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
   * Workflow.automationMetrics
   */
  export type Workflow$automationMetricsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationMetrics
     */
    select?: AutomationMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationMetrics
     */
    omit?: AutomationMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationMetricsInclude<ExtArgs> | null
    where?: AutomationMetricsWhereInput
    orderBy?: AutomationMetricsOrderByWithRelationInput | AutomationMetricsOrderByWithRelationInput[]
    cursor?: AutomationMetricsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AutomationMetricsScalarFieldEnum | AutomationMetricsScalarFieldEnum[]
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
    version: string | null
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
    version: string | null
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
    version: number
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
    version?: true
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
    version?: true
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
    version?: true
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
    version: string | null
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
    version?: boolean
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
    version?: boolean
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
    version?: boolean
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
    version?: boolean
    workflowId?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkflowRunOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "inngestRunId" | "idempotencyKey" | "status" | "startedAt" | "completedAt" | "input" | "output" | "error" | "realtimeData" | "version" | "workflowId" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["workflowRun"]>
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
      version: string | null
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
    readonly version: FieldRef<"WorkflowRun", 'String'>
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
   * Model ClientBranding
   */

  export type AggregateClientBranding = {
    _count: ClientBrandingCountAggregateOutputType | null
    _min: ClientBrandingMinAggregateOutputType | null
    _max: ClientBrandingMaxAggregateOutputType | null
  }

  export type ClientBrandingMinAggregateOutputType = {
    id: string | null
    userId: string | null
    companyName: string | null
    logoUrl: string | null
    primaryColor: string | null
    secondaryColor: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientBrandingMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    companyName: string | null
    logoUrl: string | null
    primaryColor: string | null
    secondaryColor: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClientBrandingCountAggregateOutputType = {
    id: number
    userId: number
    companyName: number
    logoUrl: number
    primaryColor: number
    secondaryColor: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClientBrandingMinAggregateInputType = {
    id?: true
    userId?: true
    companyName?: true
    logoUrl?: true
    primaryColor?: true
    secondaryColor?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientBrandingMaxAggregateInputType = {
    id?: true
    userId?: true
    companyName?: true
    logoUrl?: true
    primaryColor?: true
    secondaryColor?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClientBrandingCountAggregateInputType = {
    id?: true
    userId?: true
    companyName?: true
    logoUrl?: true
    primaryColor?: true
    secondaryColor?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClientBrandingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClientBranding to aggregate.
     */
    where?: ClientBrandingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientBrandings to fetch.
     */
    orderBy?: ClientBrandingOrderByWithRelationInput | ClientBrandingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientBrandingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientBrandings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientBrandings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClientBrandings
    **/
    _count?: true | ClientBrandingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientBrandingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientBrandingMaxAggregateInputType
  }

  export type GetClientBrandingAggregateType<T extends ClientBrandingAggregateArgs> = {
        [P in keyof T & keyof AggregateClientBranding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClientBranding[P]>
      : GetScalarType<T[P], AggregateClientBranding[P]>
  }




  export type ClientBrandingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientBrandingWhereInput
    orderBy?: ClientBrandingOrderByWithAggregationInput | ClientBrandingOrderByWithAggregationInput[]
    by: ClientBrandingScalarFieldEnum[] | ClientBrandingScalarFieldEnum
    having?: ClientBrandingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientBrandingCountAggregateInputType | true
    _min?: ClientBrandingMinAggregateInputType
    _max?: ClientBrandingMaxAggregateInputType
  }

  export type ClientBrandingGroupByOutputType = {
    id: string
    userId: string
    companyName: string
    logoUrl: string | null
    primaryColor: string | null
    secondaryColor: string | null
    createdAt: Date
    updatedAt: Date
    _count: ClientBrandingCountAggregateOutputType | null
    _min: ClientBrandingMinAggregateOutputType | null
    _max: ClientBrandingMaxAggregateOutputType | null
  }

  type GetClientBrandingGroupByPayload<T extends ClientBrandingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientBrandingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientBrandingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientBrandingGroupByOutputType[P]>
            : GetScalarType<T[P], ClientBrandingGroupByOutputType[P]>
        }
      >
    >


  export type ClientBrandingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    companyName?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    secondaryColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clientBranding"]>

  export type ClientBrandingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    companyName?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    secondaryColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clientBranding"]>

  export type ClientBrandingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    companyName?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    secondaryColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clientBranding"]>

  export type ClientBrandingSelectScalar = {
    id?: boolean
    userId?: boolean
    companyName?: boolean
    logoUrl?: boolean
    primaryColor?: boolean
    secondaryColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClientBrandingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "companyName" | "logoUrl" | "primaryColor" | "secondaryColor" | "createdAt" | "updatedAt", ExtArgs["result"]["clientBranding"]>
  export type ClientBrandingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ClientBrandingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ClientBrandingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ClientBrandingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClientBranding"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      companyName: string
      logoUrl: string | null
      primaryColor: string | null
      secondaryColor: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["clientBranding"]>
    composites: {}
  }

  type ClientBrandingGetPayload<S extends boolean | null | undefined | ClientBrandingDefaultArgs> = $Result.GetResult<Prisma.$ClientBrandingPayload, S>

  type ClientBrandingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientBrandingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientBrandingCountAggregateInputType | true
    }

  export interface ClientBrandingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClientBranding'], meta: { name: 'ClientBranding' } }
    /**
     * Find zero or one ClientBranding that matches the filter.
     * @param {ClientBrandingFindUniqueArgs} args - Arguments to find a ClientBranding
     * @example
     * // Get one ClientBranding
     * const clientBranding = await prisma.clientBranding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientBrandingFindUniqueArgs>(args: SelectSubset<T, ClientBrandingFindUniqueArgs<ExtArgs>>): Prisma__ClientBrandingClient<$Result.GetResult<Prisma.$ClientBrandingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClientBranding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientBrandingFindUniqueOrThrowArgs} args - Arguments to find a ClientBranding
     * @example
     * // Get one ClientBranding
     * const clientBranding = await prisma.clientBranding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientBrandingFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientBrandingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientBrandingClient<$Result.GetResult<Prisma.$ClientBrandingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClientBranding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientBrandingFindFirstArgs} args - Arguments to find a ClientBranding
     * @example
     * // Get one ClientBranding
     * const clientBranding = await prisma.clientBranding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientBrandingFindFirstArgs>(args?: SelectSubset<T, ClientBrandingFindFirstArgs<ExtArgs>>): Prisma__ClientBrandingClient<$Result.GetResult<Prisma.$ClientBrandingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClientBranding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientBrandingFindFirstOrThrowArgs} args - Arguments to find a ClientBranding
     * @example
     * // Get one ClientBranding
     * const clientBranding = await prisma.clientBranding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientBrandingFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientBrandingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientBrandingClient<$Result.GetResult<Prisma.$ClientBrandingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClientBrandings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientBrandingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClientBrandings
     * const clientBrandings = await prisma.clientBranding.findMany()
     * 
     * // Get first 10 ClientBrandings
     * const clientBrandings = await prisma.clientBranding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientBrandingWithIdOnly = await prisma.clientBranding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientBrandingFindManyArgs>(args?: SelectSubset<T, ClientBrandingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientBrandingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClientBranding.
     * @param {ClientBrandingCreateArgs} args - Arguments to create a ClientBranding.
     * @example
     * // Create one ClientBranding
     * const ClientBranding = await prisma.clientBranding.create({
     *   data: {
     *     // ... data to create a ClientBranding
     *   }
     * })
     * 
     */
    create<T extends ClientBrandingCreateArgs>(args: SelectSubset<T, ClientBrandingCreateArgs<ExtArgs>>): Prisma__ClientBrandingClient<$Result.GetResult<Prisma.$ClientBrandingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClientBrandings.
     * @param {ClientBrandingCreateManyArgs} args - Arguments to create many ClientBrandings.
     * @example
     * // Create many ClientBrandings
     * const clientBranding = await prisma.clientBranding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientBrandingCreateManyArgs>(args?: SelectSubset<T, ClientBrandingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClientBrandings and returns the data saved in the database.
     * @param {ClientBrandingCreateManyAndReturnArgs} args - Arguments to create many ClientBrandings.
     * @example
     * // Create many ClientBrandings
     * const clientBranding = await prisma.clientBranding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClientBrandings and only return the `id`
     * const clientBrandingWithIdOnly = await prisma.clientBranding.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClientBrandingCreateManyAndReturnArgs>(args?: SelectSubset<T, ClientBrandingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientBrandingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClientBranding.
     * @param {ClientBrandingDeleteArgs} args - Arguments to delete one ClientBranding.
     * @example
     * // Delete one ClientBranding
     * const ClientBranding = await prisma.clientBranding.delete({
     *   where: {
     *     // ... filter to delete one ClientBranding
     *   }
     * })
     * 
     */
    delete<T extends ClientBrandingDeleteArgs>(args: SelectSubset<T, ClientBrandingDeleteArgs<ExtArgs>>): Prisma__ClientBrandingClient<$Result.GetResult<Prisma.$ClientBrandingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClientBranding.
     * @param {ClientBrandingUpdateArgs} args - Arguments to update one ClientBranding.
     * @example
     * // Update one ClientBranding
     * const clientBranding = await prisma.clientBranding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientBrandingUpdateArgs>(args: SelectSubset<T, ClientBrandingUpdateArgs<ExtArgs>>): Prisma__ClientBrandingClient<$Result.GetResult<Prisma.$ClientBrandingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClientBrandings.
     * @param {ClientBrandingDeleteManyArgs} args - Arguments to filter ClientBrandings to delete.
     * @example
     * // Delete a few ClientBrandings
     * const { count } = await prisma.clientBranding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientBrandingDeleteManyArgs>(args?: SelectSubset<T, ClientBrandingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClientBrandings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientBrandingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClientBrandings
     * const clientBranding = await prisma.clientBranding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientBrandingUpdateManyArgs>(args: SelectSubset<T, ClientBrandingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClientBrandings and returns the data updated in the database.
     * @param {ClientBrandingUpdateManyAndReturnArgs} args - Arguments to update many ClientBrandings.
     * @example
     * // Update many ClientBrandings
     * const clientBranding = await prisma.clientBranding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClientBrandings and only return the `id`
     * const clientBrandingWithIdOnly = await prisma.clientBranding.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClientBrandingUpdateManyAndReturnArgs>(args: SelectSubset<T, ClientBrandingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientBrandingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClientBranding.
     * @param {ClientBrandingUpsertArgs} args - Arguments to update or create a ClientBranding.
     * @example
     * // Update or create a ClientBranding
     * const clientBranding = await prisma.clientBranding.upsert({
     *   create: {
     *     // ... data to create a ClientBranding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClientBranding we want to update
     *   }
     * })
     */
    upsert<T extends ClientBrandingUpsertArgs>(args: SelectSubset<T, ClientBrandingUpsertArgs<ExtArgs>>): Prisma__ClientBrandingClient<$Result.GetResult<Prisma.$ClientBrandingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClientBrandings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientBrandingCountArgs} args - Arguments to filter ClientBrandings to count.
     * @example
     * // Count the number of ClientBrandings
     * const count = await prisma.clientBranding.count({
     *   where: {
     *     // ... the filter for the ClientBrandings we want to count
     *   }
     * })
    **/
    count<T extends ClientBrandingCountArgs>(
      args?: Subset<T, ClientBrandingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientBrandingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClientBranding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientBrandingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClientBrandingAggregateArgs>(args: Subset<T, ClientBrandingAggregateArgs>): Prisma.PrismaPromise<GetClientBrandingAggregateType<T>>

    /**
     * Group by ClientBranding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientBrandingGroupByArgs} args - Group by arguments.
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
      T extends ClientBrandingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientBrandingGroupByArgs['orderBy'] }
        : { orderBy?: ClientBrandingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClientBrandingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientBrandingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClientBranding model
   */
  readonly fields: ClientBrandingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClientBranding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientBrandingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the ClientBranding model
   */
  interface ClientBrandingFieldRefs {
    readonly id: FieldRef<"ClientBranding", 'String'>
    readonly userId: FieldRef<"ClientBranding", 'String'>
    readonly companyName: FieldRef<"ClientBranding", 'String'>
    readonly logoUrl: FieldRef<"ClientBranding", 'String'>
    readonly primaryColor: FieldRef<"ClientBranding", 'String'>
    readonly secondaryColor: FieldRef<"ClientBranding", 'String'>
    readonly createdAt: FieldRef<"ClientBranding", 'DateTime'>
    readonly updatedAt: FieldRef<"ClientBranding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClientBranding findUnique
   */
  export type ClientBrandingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientBranding
     */
    select?: ClientBrandingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientBranding
     */
    omit?: ClientBrandingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientBrandingInclude<ExtArgs> | null
    /**
     * Filter, which ClientBranding to fetch.
     */
    where: ClientBrandingWhereUniqueInput
  }

  /**
   * ClientBranding findUniqueOrThrow
   */
  export type ClientBrandingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientBranding
     */
    select?: ClientBrandingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientBranding
     */
    omit?: ClientBrandingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientBrandingInclude<ExtArgs> | null
    /**
     * Filter, which ClientBranding to fetch.
     */
    where: ClientBrandingWhereUniqueInput
  }

  /**
   * ClientBranding findFirst
   */
  export type ClientBrandingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientBranding
     */
    select?: ClientBrandingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientBranding
     */
    omit?: ClientBrandingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientBrandingInclude<ExtArgs> | null
    /**
     * Filter, which ClientBranding to fetch.
     */
    where?: ClientBrandingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientBrandings to fetch.
     */
    orderBy?: ClientBrandingOrderByWithRelationInput | ClientBrandingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClientBrandings.
     */
    cursor?: ClientBrandingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientBrandings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientBrandings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClientBrandings.
     */
    distinct?: ClientBrandingScalarFieldEnum | ClientBrandingScalarFieldEnum[]
  }

  /**
   * ClientBranding findFirstOrThrow
   */
  export type ClientBrandingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientBranding
     */
    select?: ClientBrandingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientBranding
     */
    omit?: ClientBrandingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientBrandingInclude<ExtArgs> | null
    /**
     * Filter, which ClientBranding to fetch.
     */
    where?: ClientBrandingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientBrandings to fetch.
     */
    orderBy?: ClientBrandingOrderByWithRelationInput | ClientBrandingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClientBrandings.
     */
    cursor?: ClientBrandingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientBrandings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientBrandings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClientBrandings.
     */
    distinct?: ClientBrandingScalarFieldEnum | ClientBrandingScalarFieldEnum[]
  }

  /**
   * ClientBranding findMany
   */
  export type ClientBrandingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientBranding
     */
    select?: ClientBrandingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientBranding
     */
    omit?: ClientBrandingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientBrandingInclude<ExtArgs> | null
    /**
     * Filter, which ClientBrandings to fetch.
     */
    where?: ClientBrandingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClientBrandings to fetch.
     */
    orderBy?: ClientBrandingOrderByWithRelationInput | ClientBrandingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClientBrandings.
     */
    cursor?: ClientBrandingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClientBrandings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClientBrandings.
     */
    skip?: number
    distinct?: ClientBrandingScalarFieldEnum | ClientBrandingScalarFieldEnum[]
  }

  /**
   * ClientBranding create
   */
  export type ClientBrandingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientBranding
     */
    select?: ClientBrandingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientBranding
     */
    omit?: ClientBrandingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientBrandingInclude<ExtArgs> | null
    /**
     * The data needed to create a ClientBranding.
     */
    data: XOR<ClientBrandingCreateInput, ClientBrandingUncheckedCreateInput>
  }

  /**
   * ClientBranding createMany
   */
  export type ClientBrandingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClientBrandings.
     */
    data: ClientBrandingCreateManyInput | ClientBrandingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClientBranding createManyAndReturn
   */
  export type ClientBrandingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientBranding
     */
    select?: ClientBrandingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClientBranding
     */
    omit?: ClientBrandingOmit<ExtArgs> | null
    /**
     * The data used to create many ClientBrandings.
     */
    data: ClientBrandingCreateManyInput | ClientBrandingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientBrandingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClientBranding update
   */
  export type ClientBrandingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientBranding
     */
    select?: ClientBrandingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientBranding
     */
    omit?: ClientBrandingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientBrandingInclude<ExtArgs> | null
    /**
     * The data needed to update a ClientBranding.
     */
    data: XOR<ClientBrandingUpdateInput, ClientBrandingUncheckedUpdateInput>
    /**
     * Choose, which ClientBranding to update.
     */
    where: ClientBrandingWhereUniqueInput
  }

  /**
   * ClientBranding updateMany
   */
  export type ClientBrandingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClientBrandings.
     */
    data: XOR<ClientBrandingUpdateManyMutationInput, ClientBrandingUncheckedUpdateManyInput>
    /**
     * Filter which ClientBrandings to update
     */
    where?: ClientBrandingWhereInput
    /**
     * Limit how many ClientBrandings to update.
     */
    limit?: number
  }

  /**
   * ClientBranding updateManyAndReturn
   */
  export type ClientBrandingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientBranding
     */
    select?: ClientBrandingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClientBranding
     */
    omit?: ClientBrandingOmit<ExtArgs> | null
    /**
     * The data used to update ClientBrandings.
     */
    data: XOR<ClientBrandingUpdateManyMutationInput, ClientBrandingUncheckedUpdateManyInput>
    /**
     * Filter which ClientBrandings to update
     */
    where?: ClientBrandingWhereInput
    /**
     * Limit how many ClientBrandings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientBrandingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClientBranding upsert
   */
  export type ClientBrandingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientBranding
     */
    select?: ClientBrandingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientBranding
     */
    omit?: ClientBrandingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientBrandingInclude<ExtArgs> | null
    /**
     * The filter to search for the ClientBranding to update in case it exists.
     */
    where: ClientBrandingWhereUniqueInput
    /**
     * In case the ClientBranding found by the `where` argument doesn't exist, create a new ClientBranding with this data.
     */
    create: XOR<ClientBrandingCreateInput, ClientBrandingUncheckedCreateInput>
    /**
     * In case the ClientBranding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientBrandingUpdateInput, ClientBrandingUncheckedUpdateInput>
  }

  /**
   * ClientBranding delete
   */
  export type ClientBrandingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientBranding
     */
    select?: ClientBrandingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientBranding
     */
    omit?: ClientBrandingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientBrandingInclude<ExtArgs> | null
    /**
     * Filter which ClientBranding to delete.
     */
    where: ClientBrandingWhereUniqueInput
  }

  /**
   * ClientBranding deleteMany
   */
  export type ClientBrandingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClientBrandings to delete
     */
    where?: ClientBrandingWhereInput
    /**
     * Limit how many ClientBrandings to delete.
     */
    limit?: number
  }

  /**
   * ClientBranding without action
   */
  export type ClientBrandingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientBranding
     */
    select?: ClientBrandingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClientBranding
     */
    omit?: ClientBrandingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientBrandingInclude<ExtArgs> | null
  }


  /**
   * Model ServiceRequest
   */

  export type AggregateServiceRequest = {
    _count: ServiceRequestCountAggregateOutputType | null
    _avg: ServiceRequestAvgAggregateOutputType | null
    _sum: ServiceRequestSumAggregateOutputType | null
    _min: ServiceRequestMinAggregateOutputType | null
    _max: ServiceRequestMaxAggregateOutputType | null
  }

  export type ServiceRequestAvgAggregateOutputType = {
    estimatedHours: number | null
    quotedPrice: Decimal | null
  }

  export type ServiceRequestSumAggregateOutputType = {
    estimatedHours: number | null
    quotedPrice: Decimal | null
  }

  export type ServiceRequestMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    businessProcess: string | null
    desiredOutcome: string | null
    priority: $Enums.RequestPriority | null
    status: $Enums.RequestStatus | null
    meetingScheduled: boolean | null
    meetingUrl: string | null
    meetingDate: Date | null
    preferredMeetingDate: string | null
    availabilityNotes: string | null
    proposalSent: boolean | null
    proposalAccepted: boolean | null
    estimatedHours: number | null
    quotedPrice: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceRequestMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    businessProcess: string | null
    desiredOutcome: string | null
    priority: $Enums.RequestPriority | null
    status: $Enums.RequestStatus | null
    meetingScheduled: boolean | null
    meetingUrl: string | null
    meetingDate: Date | null
    preferredMeetingDate: string | null
    availabilityNotes: string | null
    proposalSent: boolean | null
    proposalAccepted: boolean | null
    estimatedHours: number | null
    quotedPrice: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceRequestCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    description: number
    businessProcess: number
    desiredOutcome: number
    priority: number
    status: number
    meetingScheduled: number
    meetingUrl: number
    meetingDate: number
    preferredMeetingDate: number
    availabilityNotes: number
    proposalSent: number
    proposalAccepted: number
    estimatedHours: number
    quotedPrice: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceRequestAvgAggregateInputType = {
    estimatedHours?: true
    quotedPrice?: true
  }

  export type ServiceRequestSumAggregateInputType = {
    estimatedHours?: true
    quotedPrice?: true
  }

  export type ServiceRequestMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    businessProcess?: true
    desiredOutcome?: true
    priority?: true
    status?: true
    meetingScheduled?: true
    meetingUrl?: true
    meetingDate?: true
    preferredMeetingDate?: true
    availabilityNotes?: true
    proposalSent?: true
    proposalAccepted?: true
    estimatedHours?: true
    quotedPrice?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceRequestMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    businessProcess?: true
    desiredOutcome?: true
    priority?: true
    status?: true
    meetingScheduled?: true
    meetingUrl?: true
    meetingDate?: true
    preferredMeetingDate?: true
    availabilityNotes?: true
    proposalSent?: true
    proposalAccepted?: true
    estimatedHours?: true
    quotedPrice?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceRequestCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    businessProcess?: true
    desiredOutcome?: true
    priority?: true
    status?: true
    meetingScheduled?: true
    meetingUrl?: true
    meetingDate?: true
    preferredMeetingDate?: true
    availabilityNotes?: true
    proposalSent?: true
    proposalAccepted?: true
    estimatedHours?: true
    quotedPrice?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceRequest to aggregate.
     */
    where?: ServiceRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceRequests to fetch.
     */
    orderBy?: ServiceRequestOrderByWithRelationInput | ServiceRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceRequests
    **/
    _count?: true | ServiceRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceRequestMaxAggregateInputType
  }

  export type GetServiceRequestAggregateType<T extends ServiceRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceRequest[P]>
      : GetScalarType<T[P], AggregateServiceRequest[P]>
  }




  export type ServiceRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceRequestWhereInput
    orderBy?: ServiceRequestOrderByWithAggregationInput | ServiceRequestOrderByWithAggregationInput[]
    by: ServiceRequestScalarFieldEnum[] | ServiceRequestScalarFieldEnum
    having?: ServiceRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceRequestCountAggregateInputType | true
    _avg?: ServiceRequestAvgAggregateInputType
    _sum?: ServiceRequestSumAggregateInputType
    _min?: ServiceRequestMinAggregateInputType
    _max?: ServiceRequestMaxAggregateInputType
  }

  export type ServiceRequestGroupByOutputType = {
    id: string
    userId: string
    title: string
    description: string
    businessProcess: string
    desiredOutcome: string
    priority: $Enums.RequestPriority
    status: $Enums.RequestStatus
    meetingScheduled: boolean
    meetingUrl: string | null
    meetingDate: Date | null
    preferredMeetingDate: string | null
    availabilityNotes: string | null
    proposalSent: boolean
    proposalAccepted: boolean | null
    estimatedHours: number | null
    quotedPrice: Decimal | null
    createdAt: Date
    updatedAt: Date
    _count: ServiceRequestCountAggregateOutputType | null
    _avg: ServiceRequestAvgAggregateOutputType | null
    _sum: ServiceRequestSumAggregateOutputType | null
    _min: ServiceRequestMinAggregateOutputType | null
    _max: ServiceRequestMaxAggregateOutputType | null
  }

  type GetServiceRequestGroupByPayload<T extends ServiceRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceRequestGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceRequestGroupByOutputType[P]>
        }
      >
    >


  export type ServiceRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    businessProcess?: boolean
    desiredOutcome?: boolean
    priority?: boolean
    status?: boolean
    meetingScheduled?: boolean
    meetingUrl?: boolean
    meetingDate?: boolean
    preferredMeetingDate?: boolean
    availabilityNotes?: boolean
    proposalSent?: boolean
    proposalAccepted?: boolean
    estimatedHours?: boolean
    quotedPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceRequest"]>

  export type ServiceRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    businessProcess?: boolean
    desiredOutcome?: boolean
    priority?: boolean
    status?: boolean
    meetingScheduled?: boolean
    meetingUrl?: boolean
    meetingDate?: boolean
    preferredMeetingDate?: boolean
    availabilityNotes?: boolean
    proposalSent?: boolean
    proposalAccepted?: boolean
    estimatedHours?: boolean
    quotedPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceRequest"]>

  export type ServiceRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    businessProcess?: boolean
    desiredOutcome?: boolean
    priority?: boolean
    status?: boolean
    meetingScheduled?: boolean
    meetingUrl?: boolean
    meetingDate?: boolean
    preferredMeetingDate?: boolean
    availabilityNotes?: boolean
    proposalSent?: boolean
    proposalAccepted?: boolean
    estimatedHours?: boolean
    quotedPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceRequest"]>

  export type ServiceRequestSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    businessProcess?: boolean
    desiredOutcome?: boolean
    priority?: boolean
    status?: boolean
    meetingScheduled?: boolean
    meetingUrl?: boolean
    meetingDate?: boolean
    preferredMeetingDate?: boolean
    availabilityNotes?: boolean
    proposalSent?: boolean
    proposalAccepted?: boolean
    estimatedHours?: boolean
    quotedPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "description" | "businessProcess" | "desiredOutcome" | "priority" | "status" | "meetingScheduled" | "meetingUrl" | "meetingDate" | "preferredMeetingDate" | "availabilityNotes" | "proposalSent" | "proposalAccepted" | "estimatedHours" | "quotedPrice" | "createdAt" | "updatedAt", ExtArgs["result"]["serviceRequest"]>
  export type ServiceRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ServiceRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ServiceRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ServiceRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceRequest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      description: string
      businessProcess: string
      desiredOutcome: string
      priority: $Enums.RequestPriority
      status: $Enums.RequestStatus
      meetingScheduled: boolean
      meetingUrl: string | null
      meetingDate: Date | null
      preferredMeetingDate: string | null
      availabilityNotes: string | null
      proposalSent: boolean
      proposalAccepted: boolean | null
      estimatedHours: number | null
      quotedPrice: Prisma.Decimal | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["serviceRequest"]>
    composites: {}
  }

  type ServiceRequestGetPayload<S extends boolean | null | undefined | ServiceRequestDefaultArgs> = $Result.GetResult<Prisma.$ServiceRequestPayload, S>

  type ServiceRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceRequestCountAggregateInputType | true
    }

  export interface ServiceRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceRequest'], meta: { name: 'ServiceRequest' } }
    /**
     * Find zero or one ServiceRequest that matches the filter.
     * @param {ServiceRequestFindUniqueArgs} args - Arguments to find a ServiceRequest
     * @example
     * // Get one ServiceRequest
     * const serviceRequest = await prisma.serviceRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceRequestFindUniqueArgs>(args: SelectSubset<T, ServiceRequestFindUniqueArgs<ExtArgs>>): Prisma__ServiceRequestClient<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceRequestFindUniqueOrThrowArgs} args - Arguments to find a ServiceRequest
     * @example
     * // Get one ServiceRequest
     * const serviceRequest = await prisma.serviceRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceRequestClient<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRequestFindFirstArgs} args - Arguments to find a ServiceRequest
     * @example
     * // Get one ServiceRequest
     * const serviceRequest = await prisma.serviceRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceRequestFindFirstArgs>(args?: SelectSubset<T, ServiceRequestFindFirstArgs<ExtArgs>>): Prisma__ServiceRequestClient<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRequestFindFirstOrThrowArgs} args - Arguments to find a ServiceRequest
     * @example
     * // Get one ServiceRequest
     * const serviceRequest = await prisma.serviceRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceRequestClient<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceRequests
     * const serviceRequests = await prisma.serviceRequest.findMany()
     * 
     * // Get first 10 ServiceRequests
     * const serviceRequests = await prisma.serviceRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceRequestWithIdOnly = await prisma.serviceRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceRequestFindManyArgs>(args?: SelectSubset<T, ServiceRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceRequest.
     * @param {ServiceRequestCreateArgs} args - Arguments to create a ServiceRequest.
     * @example
     * // Create one ServiceRequest
     * const ServiceRequest = await prisma.serviceRequest.create({
     *   data: {
     *     // ... data to create a ServiceRequest
     *   }
     * })
     * 
     */
    create<T extends ServiceRequestCreateArgs>(args: SelectSubset<T, ServiceRequestCreateArgs<ExtArgs>>): Prisma__ServiceRequestClient<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceRequests.
     * @param {ServiceRequestCreateManyArgs} args - Arguments to create many ServiceRequests.
     * @example
     * // Create many ServiceRequests
     * const serviceRequest = await prisma.serviceRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceRequestCreateManyArgs>(args?: SelectSubset<T, ServiceRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceRequests and returns the data saved in the database.
     * @param {ServiceRequestCreateManyAndReturnArgs} args - Arguments to create many ServiceRequests.
     * @example
     * // Create many ServiceRequests
     * const serviceRequest = await prisma.serviceRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceRequests and only return the `id`
     * const serviceRequestWithIdOnly = await prisma.serviceRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceRequest.
     * @param {ServiceRequestDeleteArgs} args - Arguments to delete one ServiceRequest.
     * @example
     * // Delete one ServiceRequest
     * const ServiceRequest = await prisma.serviceRequest.delete({
     *   where: {
     *     // ... filter to delete one ServiceRequest
     *   }
     * })
     * 
     */
    delete<T extends ServiceRequestDeleteArgs>(args: SelectSubset<T, ServiceRequestDeleteArgs<ExtArgs>>): Prisma__ServiceRequestClient<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceRequest.
     * @param {ServiceRequestUpdateArgs} args - Arguments to update one ServiceRequest.
     * @example
     * // Update one ServiceRequest
     * const serviceRequest = await prisma.serviceRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceRequestUpdateArgs>(args: SelectSubset<T, ServiceRequestUpdateArgs<ExtArgs>>): Prisma__ServiceRequestClient<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceRequests.
     * @param {ServiceRequestDeleteManyArgs} args - Arguments to filter ServiceRequests to delete.
     * @example
     * // Delete a few ServiceRequests
     * const { count } = await prisma.serviceRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceRequestDeleteManyArgs>(args?: SelectSubset<T, ServiceRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceRequests
     * const serviceRequest = await prisma.serviceRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceRequestUpdateManyArgs>(args: SelectSubset<T, ServiceRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceRequests and returns the data updated in the database.
     * @param {ServiceRequestUpdateManyAndReturnArgs} args - Arguments to update many ServiceRequests.
     * @example
     * // Update many ServiceRequests
     * const serviceRequest = await prisma.serviceRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceRequests and only return the `id`
     * const serviceRequestWithIdOnly = await prisma.serviceRequest.updateManyAndReturn({
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
    updateManyAndReturn<T extends ServiceRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceRequest.
     * @param {ServiceRequestUpsertArgs} args - Arguments to update or create a ServiceRequest.
     * @example
     * // Update or create a ServiceRequest
     * const serviceRequest = await prisma.serviceRequest.upsert({
     *   create: {
     *     // ... data to create a ServiceRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceRequest we want to update
     *   }
     * })
     */
    upsert<T extends ServiceRequestUpsertArgs>(args: SelectSubset<T, ServiceRequestUpsertArgs<ExtArgs>>): Prisma__ServiceRequestClient<$Result.GetResult<Prisma.$ServiceRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRequestCountArgs} args - Arguments to filter ServiceRequests to count.
     * @example
     * // Count the number of ServiceRequests
     * const count = await prisma.serviceRequest.count({
     *   where: {
     *     // ... the filter for the ServiceRequests we want to count
     *   }
     * })
    **/
    count<T extends ServiceRequestCountArgs>(
      args?: Subset<T, ServiceRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceRequestAggregateArgs>(args: Subset<T, ServiceRequestAggregateArgs>): Prisma.PrismaPromise<GetServiceRequestAggregateType<T>>

    /**
     * Group by ServiceRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRequestGroupByArgs} args - Group by arguments.
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
      T extends ServiceRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceRequestGroupByArgs['orderBy'] }
        : { orderBy?: ServiceRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceRequest model
   */
  readonly fields: ServiceRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the ServiceRequest model
   */
  interface ServiceRequestFieldRefs {
    readonly id: FieldRef<"ServiceRequest", 'String'>
    readonly userId: FieldRef<"ServiceRequest", 'String'>
    readonly title: FieldRef<"ServiceRequest", 'String'>
    readonly description: FieldRef<"ServiceRequest", 'String'>
    readonly businessProcess: FieldRef<"ServiceRequest", 'String'>
    readonly desiredOutcome: FieldRef<"ServiceRequest", 'String'>
    readonly priority: FieldRef<"ServiceRequest", 'RequestPriority'>
    readonly status: FieldRef<"ServiceRequest", 'RequestStatus'>
    readonly meetingScheduled: FieldRef<"ServiceRequest", 'Boolean'>
    readonly meetingUrl: FieldRef<"ServiceRequest", 'String'>
    readonly meetingDate: FieldRef<"ServiceRequest", 'DateTime'>
    readonly preferredMeetingDate: FieldRef<"ServiceRequest", 'String'>
    readonly availabilityNotes: FieldRef<"ServiceRequest", 'String'>
    readonly proposalSent: FieldRef<"ServiceRequest", 'Boolean'>
    readonly proposalAccepted: FieldRef<"ServiceRequest", 'Boolean'>
    readonly estimatedHours: FieldRef<"ServiceRequest", 'Int'>
    readonly quotedPrice: FieldRef<"ServiceRequest", 'Decimal'>
    readonly createdAt: FieldRef<"ServiceRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"ServiceRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServiceRequest findUnique
   */
  export type ServiceRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRequest to fetch.
     */
    where: ServiceRequestWhereUniqueInput
  }

  /**
   * ServiceRequest findUniqueOrThrow
   */
  export type ServiceRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRequest to fetch.
     */
    where: ServiceRequestWhereUniqueInput
  }

  /**
   * ServiceRequest findFirst
   */
  export type ServiceRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRequest to fetch.
     */
    where?: ServiceRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceRequests to fetch.
     */
    orderBy?: ServiceRequestOrderByWithRelationInput | ServiceRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceRequests.
     */
    cursor?: ServiceRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceRequests.
     */
    distinct?: ServiceRequestScalarFieldEnum | ServiceRequestScalarFieldEnum[]
  }

  /**
   * ServiceRequest findFirstOrThrow
   */
  export type ServiceRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRequest to fetch.
     */
    where?: ServiceRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceRequests to fetch.
     */
    orderBy?: ServiceRequestOrderByWithRelationInput | ServiceRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceRequests.
     */
    cursor?: ServiceRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceRequests.
     */
    distinct?: ServiceRequestScalarFieldEnum | ServiceRequestScalarFieldEnum[]
  }

  /**
   * ServiceRequest findMany
   */
  export type ServiceRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRequests to fetch.
     */
    where?: ServiceRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceRequests to fetch.
     */
    orderBy?: ServiceRequestOrderByWithRelationInput | ServiceRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceRequests.
     */
    cursor?: ServiceRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceRequests.
     */
    skip?: number
    distinct?: ServiceRequestScalarFieldEnum | ServiceRequestScalarFieldEnum[]
  }

  /**
   * ServiceRequest create
   */
  export type ServiceRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceRequest.
     */
    data: XOR<ServiceRequestCreateInput, ServiceRequestUncheckedCreateInput>
  }

  /**
   * ServiceRequest createMany
   */
  export type ServiceRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceRequests.
     */
    data: ServiceRequestCreateManyInput | ServiceRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceRequest createManyAndReturn
   */
  export type ServiceRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceRequests.
     */
    data: ServiceRequestCreateManyInput | ServiceRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceRequest update
   */
  export type ServiceRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceRequest.
     */
    data: XOR<ServiceRequestUpdateInput, ServiceRequestUncheckedUpdateInput>
    /**
     * Choose, which ServiceRequest to update.
     */
    where: ServiceRequestWhereUniqueInput
  }

  /**
   * ServiceRequest updateMany
   */
  export type ServiceRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceRequests.
     */
    data: XOR<ServiceRequestUpdateManyMutationInput, ServiceRequestUncheckedUpdateManyInput>
    /**
     * Filter which ServiceRequests to update
     */
    where?: ServiceRequestWhereInput
    /**
     * Limit how many ServiceRequests to update.
     */
    limit?: number
  }

  /**
   * ServiceRequest updateManyAndReturn
   */
  export type ServiceRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * The data used to update ServiceRequests.
     */
    data: XOR<ServiceRequestUpdateManyMutationInput, ServiceRequestUncheckedUpdateManyInput>
    /**
     * Filter which ServiceRequests to update
     */
    where?: ServiceRequestWhereInput
    /**
     * Limit how many ServiceRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceRequest upsert
   */
  export type ServiceRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceRequest to update in case it exists.
     */
    where: ServiceRequestWhereUniqueInput
    /**
     * In case the ServiceRequest found by the `where` argument doesn't exist, create a new ServiceRequest with this data.
     */
    create: XOR<ServiceRequestCreateInput, ServiceRequestUncheckedCreateInput>
    /**
     * In case the ServiceRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceRequestUpdateInput, ServiceRequestUncheckedUpdateInput>
  }

  /**
   * ServiceRequest delete
   */
  export type ServiceRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
    /**
     * Filter which ServiceRequest to delete.
     */
    where: ServiceRequestWhereUniqueInput
  }

  /**
   * ServiceRequest deleteMany
   */
  export type ServiceRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceRequests to delete
     */
    where?: ServiceRequestWhereInput
    /**
     * Limit how many ServiceRequests to delete.
     */
    limit?: number
  }

  /**
   * ServiceRequest without action
   */
  export type ServiceRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRequest
     */
    select?: ServiceRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRequest
     */
    omit?: ServiceRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRequestInclude<ExtArgs> | null
  }


  /**
   * Model AutomationMetrics
   */

  export type AggregateAutomationMetrics = {
    _count: AutomationMetricsCountAggregateOutputType | null
    _avg: AutomationMetricsAvgAggregateOutputType | null
    _sum: AutomationMetricsSumAggregateOutputType | null
    _min: AutomationMetricsMinAggregateOutputType | null
    _max: AutomationMetricsMaxAggregateOutputType | null
  }

  export type AutomationMetricsAvgAggregateOutputType = {
    runsCount: number | null
    successCount: number | null
    failureCount: number | null
    avgDuration: number | null
    timeSavedMinutes: number | null
    errorsPrevented: number | null
    costSavings: Decimal | null
  }

  export type AutomationMetricsSumAggregateOutputType = {
    runsCount: number | null
    successCount: number | null
    failureCount: number | null
    avgDuration: number | null
    timeSavedMinutes: number | null
    errorsPrevented: number | null
    costSavings: Decimal | null
  }

  export type AutomationMetricsMinAggregateOutputType = {
    id: string | null
    workflowId: string | null
    date: Date | null
    runsCount: number | null
    successCount: number | null
    failureCount: number | null
    avgDuration: number | null
    timeSavedMinutes: number | null
    errorsPrevented: number | null
    costSavings: Decimal | null
    createdAt: Date | null
  }

  export type AutomationMetricsMaxAggregateOutputType = {
    id: string | null
    workflowId: string | null
    date: Date | null
    runsCount: number | null
    successCount: number | null
    failureCount: number | null
    avgDuration: number | null
    timeSavedMinutes: number | null
    errorsPrevented: number | null
    costSavings: Decimal | null
    createdAt: Date | null
  }

  export type AutomationMetricsCountAggregateOutputType = {
    id: number
    workflowId: number
    date: number
    runsCount: number
    successCount: number
    failureCount: number
    avgDuration: number
    timeSavedMinutes: number
    errorsPrevented: number
    costSavings: number
    createdAt: number
    _all: number
  }


  export type AutomationMetricsAvgAggregateInputType = {
    runsCount?: true
    successCount?: true
    failureCount?: true
    avgDuration?: true
    timeSavedMinutes?: true
    errorsPrevented?: true
    costSavings?: true
  }

  export type AutomationMetricsSumAggregateInputType = {
    runsCount?: true
    successCount?: true
    failureCount?: true
    avgDuration?: true
    timeSavedMinutes?: true
    errorsPrevented?: true
    costSavings?: true
  }

  export type AutomationMetricsMinAggregateInputType = {
    id?: true
    workflowId?: true
    date?: true
    runsCount?: true
    successCount?: true
    failureCount?: true
    avgDuration?: true
    timeSavedMinutes?: true
    errorsPrevented?: true
    costSavings?: true
    createdAt?: true
  }

  export type AutomationMetricsMaxAggregateInputType = {
    id?: true
    workflowId?: true
    date?: true
    runsCount?: true
    successCount?: true
    failureCount?: true
    avgDuration?: true
    timeSavedMinutes?: true
    errorsPrevented?: true
    costSavings?: true
    createdAt?: true
  }

  export type AutomationMetricsCountAggregateInputType = {
    id?: true
    workflowId?: true
    date?: true
    runsCount?: true
    successCount?: true
    failureCount?: true
    avgDuration?: true
    timeSavedMinutes?: true
    errorsPrevented?: true
    costSavings?: true
    createdAt?: true
    _all?: true
  }

  export type AutomationMetricsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AutomationMetrics to aggregate.
     */
    where?: AutomationMetricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AutomationMetrics to fetch.
     */
    orderBy?: AutomationMetricsOrderByWithRelationInput | AutomationMetricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AutomationMetricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AutomationMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AutomationMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AutomationMetrics
    **/
    _count?: true | AutomationMetricsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AutomationMetricsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AutomationMetricsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AutomationMetricsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AutomationMetricsMaxAggregateInputType
  }

  export type GetAutomationMetricsAggregateType<T extends AutomationMetricsAggregateArgs> = {
        [P in keyof T & keyof AggregateAutomationMetrics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAutomationMetrics[P]>
      : GetScalarType<T[P], AggregateAutomationMetrics[P]>
  }




  export type AutomationMetricsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AutomationMetricsWhereInput
    orderBy?: AutomationMetricsOrderByWithAggregationInput | AutomationMetricsOrderByWithAggregationInput[]
    by: AutomationMetricsScalarFieldEnum[] | AutomationMetricsScalarFieldEnum
    having?: AutomationMetricsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AutomationMetricsCountAggregateInputType | true
    _avg?: AutomationMetricsAvgAggregateInputType
    _sum?: AutomationMetricsSumAggregateInputType
    _min?: AutomationMetricsMinAggregateInputType
    _max?: AutomationMetricsMaxAggregateInputType
  }

  export type AutomationMetricsGroupByOutputType = {
    id: string
    workflowId: string
    date: Date
    runsCount: number
    successCount: number
    failureCount: number
    avgDuration: number | null
    timeSavedMinutes: number | null
    errorsPrevented: number | null
    costSavings: Decimal | null
    createdAt: Date
    _count: AutomationMetricsCountAggregateOutputType | null
    _avg: AutomationMetricsAvgAggregateOutputType | null
    _sum: AutomationMetricsSumAggregateOutputType | null
    _min: AutomationMetricsMinAggregateOutputType | null
    _max: AutomationMetricsMaxAggregateOutputType | null
  }

  type GetAutomationMetricsGroupByPayload<T extends AutomationMetricsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AutomationMetricsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AutomationMetricsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AutomationMetricsGroupByOutputType[P]>
            : GetScalarType<T[P], AutomationMetricsGroupByOutputType[P]>
        }
      >
    >


  export type AutomationMetricsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workflowId?: boolean
    date?: boolean
    runsCount?: boolean
    successCount?: boolean
    failureCount?: boolean
    avgDuration?: boolean
    timeSavedMinutes?: boolean
    errorsPrevented?: boolean
    costSavings?: boolean
    createdAt?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["automationMetrics"]>

  export type AutomationMetricsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workflowId?: boolean
    date?: boolean
    runsCount?: boolean
    successCount?: boolean
    failureCount?: boolean
    avgDuration?: boolean
    timeSavedMinutes?: boolean
    errorsPrevented?: boolean
    costSavings?: boolean
    createdAt?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["automationMetrics"]>

  export type AutomationMetricsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workflowId?: boolean
    date?: boolean
    runsCount?: boolean
    successCount?: boolean
    failureCount?: boolean
    avgDuration?: boolean
    timeSavedMinutes?: boolean
    errorsPrevented?: boolean
    costSavings?: boolean
    createdAt?: boolean
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["automationMetrics"]>

  export type AutomationMetricsSelectScalar = {
    id?: boolean
    workflowId?: boolean
    date?: boolean
    runsCount?: boolean
    successCount?: boolean
    failureCount?: boolean
    avgDuration?: boolean
    timeSavedMinutes?: boolean
    errorsPrevented?: boolean
    costSavings?: boolean
    createdAt?: boolean
  }

  export type AutomationMetricsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "workflowId" | "date" | "runsCount" | "successCount" | "failureCount" | "avgDuration" | "timeSavedMinutes" | "errorsPrevented" | "costSavings" | "createdAt", ExtArgs["result"]["automationMetrics"]>
  export type AutomationMetricsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }
  export type AutomationMetricsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }
  export type AutomationMetricsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workflow?: boolean | WorkflowDefaultArgs<ExtArgs>
  }

  export type $AutomationMetricsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AutomationMetrics"
    objects: {
      workflow: Prisma.$WorkflowPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workflowId: string
      date: Date
      runsCount: number
      successCount: number
      failureCount: number
      avgDuration: number | null
      timeSavedMinutes: number | null
      errorsPrevented: number | null
      costSavings: Prisma.Decimal | null
      createdAt: Date
    }, ExtArgs["result"]["automationMetrics"]>
    composites: {}
  }

  type AutomationMetricsGetPayload<S extends boolean | null | undefined | AutomationMetricsDefaultArgs> = $Result.GetResult<Prisma.$AutomationMetricsPayload, S>

  type AutomationMetricsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AutomationMetricsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AutomationMetricsCountAggregateInputType | true
    }

  export interface AutomationMetricsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AutomationMetrics'], meta: { name: 'AutomationMetrics' } }
    /**
     * Find zero or one AutomationMetrics that matches the filter.
     * @param {AutomationMetricsFindUniqueArgs} args - Arguments to find a AutomationMetrics
     * @example
     * // Get one AutomationMetrics
     * const automationMetrics = await prisma.automationMetrics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AutomationMetricsFindUniqueArgs>(args: SelectSubset<T, AutomationMetricsFindUniqueArgs<ExtArgs>>): Prisma__AutomationMetricsClient<$Result.GetResult<Prisma.$AutomationMetricsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AutomationMetrics that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AutomationMetricsFindUniqueOrThrowArgs} args - Arguments to find a AutomationMetrics
     * @example
     * // Get one AutomationMetrics
     * const automationMetrics = await prisma.automationMetrics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AutomationMetricsFindUniqueOrThrowArgs>(args: SelectSubset<T, AutomationMetricsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AutomationMetricsClient<$Result.GetResult<Prisma.$AutomationMetricsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AutomationMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationMetricsFindFirstArgs} args - Arguments to find a AutomationMetrics
     * @example
     * // Get one AutomationMetrics
     * const automationMetrics = await prisma.automationMetrics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AutomationMetricsFindFirstArgs>(args?: SelectSubset<T, AutomationMetricsFindFirstArgs<ExtArgs>>): Prisma__AutomationMetricsClient<$Result.GetResult<Prisma.$AutomationMetricsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AutomationMetrics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationMetricsFindFirstOrThrowArgs} args - Arguments to find a AutomationMetrics
     * @example
     * // Get one AutomationMetrics
     * const automationMetrics = await prisma.automationMetrics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AutomationMetricsFindFirstOrThrowArgs>(args?: SelectSubset<T, AutomationMetricsFindFirstOrThrowArgs<ExtArgs>>): Prisma__AutomationMetricsClient<$Result.GetResult<Prisma.$AutomationMetricsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AutomationMetrics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationMetricsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AutomationMetrics
     * const automationMetrics = await prisma.automationMetrics.findMany()
     * 
     * // Get first 10 AutomationMetrics
     * const automationMetrics = await prisma.automationMetrics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const automationMetricsWithIdOnly = await prisma.automationMetrics.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AutomationMetricsFindManyArgs>(args?: SelectSubset<T, AutomationMetricsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AutomationMetricsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AutomationMetrics.
     * @param {AutomationMetricsCreateArgs} args - Arguments to create a AutomationMetrics.
     * @example
     * // Create one AutomationMetrics
     * const AutomationMetrics = await prisma.automationMetrics.create({
     *   data: {
     *     // ... data to create a AutomationMetrics
     *   }
     * })
     * 
     */
    create<T extends AutomationMetricsCreateArgs>(args: SelectSubset<T, AutomationMetricsCreateArgs<ExtArgs>>): Prisma__AutomationMetricsClient<$Result.GetResult<Prisma.$AutomationMetricsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AutomationMetrics.
     * @param {AutomationMetricsCreateManyArgs} args - Arguments to create many AutomationMetrics.
     * @example
     * // Create many AutomationMetrics
     * const automationMetrics = await prisma.automationMetrics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AutomationMetricsCreateManyArgs>(args?: SelectSubset<T, AutomationMetricsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AutomationMetrics and returns the data saved in the database.
     * @param {AutomationMetricsCreateManyAndReturnArgs} args - Arguments to create many AutomationMetrics.
     * @example
     * // Create many AutomationMetrics
     * const automationMetrics = await prisma.automationMetrics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AutomationMetrics and only return the `id`
     * const automationMetricsWithIdOnly = await prisma.automationMetrics.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AutomationMetricsCreateManyAndReturnArgs>(args?: SelectSubset<T, AutomationMetricsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AutomationMetricsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AutomationMetrics.
     * @param {AutomationMetricsDeleteArgs} args - Arguments to delete one AutomationMetrics.
     * @example
     * // Delete one AutomationMetrics
     * const AutomationMetrics = await prisma.automationMetrics.delete({
     *   where: {
     *     // ... filter to delete one AutomationMetrics
     *   }
     * })
     * 
     */
    delete<T extends AutomationMetricsDeleteArgs>(args: SelectSubset<T, AutomationMetricsDeleteArgs<ExtArgs>>): Prisma__AutomationMetricsClient<$Result.GetResult<Prisma.$AutomationMetricsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AutomationMetrics.
     * @param {AutomationMetricsUpdateArgs} args - Arguments to update one AutomationMetrics.
     * @example
     * // Update one AutomationMetrics
     * const automationMetrics = await prisma.automationMetrics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AutomationMetricsUpdateArgs>(args: SelectSubset<T, AutomationMetricsUpdateArgs<ExtArgs>>): Prisma__AutomationMetricsClient<$Result.GetResult<Prisma.$AutomationMetricsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AutomationMetrics.
     * @param {AutomationMetricsDeleteManyArgs} args - Arguments to filter AutomationMetrics to delete.
     * @example
     * // Delete a few AutomationMetrics
     * const { count } = await prisma.automationMetrics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AutomationMetricsDeleteManyArgs>(args?: SelectSubset<T, AutomationMetricsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AutomationMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationMetricsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AutomationMetrics
     * const automationMetrics = await prisma.automationMetrics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AutomationMetricsUpdateManyArgs>(args: SelectSubset<T, AutomationMetricsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AutomationMetrics and returns the data updated in the database.
     * @param {AutomationMetricsUpdateManyAndReturnArgs} args - Arguments to update many AutomationMetrics.
     * @example
     * // Update many AutomationMetrics
     * const automationMetrics = await prisma.automationMetrics.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AutomationMetrics and only return the `id`
     * const automationMetricsWithIdOnly = await prisma.automationMetrics.updateManyAndReturn({
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
    updateManyAndReturn<T extends AutomationMetricsUpdateManyAndReturnArgs>(args: SelectSubset<T, AutomationMetricsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AutomationMetricsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AutomationMetrics.
     * @param {AutomationMetricsUpsertArgs} args - Arguments to update or create a AutomationMetrics.
     * @example
     * // Update or create a AutomationMetrics
     * const automationMetrics = await prisma.automationMetrics.upsert({
     *   create: {
     *     // ... data to create a AutomationMetrics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AutomationMetrics we want to update
     *   }
     * })
     */
    upsert<T extends AutomationMetricsUpsertArgs>(args: SelectSubset<T, AutomationMetricsUpsertArgs<ExtArgs>>): Prisma__AutomationMetricsClient<$Result.GetResult<Prisma.$AutomationMetricsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AutomationMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationMetricsCountArgs} args - Arguments to filter AutomationMetrics to count.
     * @example
     * // Count the number of AutomationMetrics
     * const count = await prisma.automationMetrics.count({
     *   where: {
     *     // ... the filter for the AutomationMetrics we want to count
     *   }
     * })
    **/
    count<T extends AutomationMetricsCountArgs>(
      args?: Subset<T, AutomationMetricsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AutomationMetricsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AutomationMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationMetricsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AutomationMetricsAggregateArgs>(args: Subset<T, AutomationMetricsAggregateArgs>): Prisma.PrismaPromise<GetAutomationMetricsAggregateType<T>>

    /**
     * Group by AutomationMetrics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AutomationMetricsGroupByArgs} args - Group by arguments.
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
      T extends AutomationMetricsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AutomationMetricsGroupByArgs['orderBy'] }
        : { orderBy?: AutomationMetricsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AutomationMetricsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAutomationMetricsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AutomationMetrics model
   */
  readonly fields: AutomationMetricsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AutomationMetrics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AutomationMetricsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workflow<T extends WorkflowDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkflowDefaultArgs<ExtArgs>>): Prisma__WorkflowClient<$Result.GetResult<Prisma.$WorkflowPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the AutomationMetrics model
   */
  interface AutomationMetricsFieldRefs {
    readonly id: FieldRef<"AutomationMetrics", 'String'>
    readonly workflowId: FieldRef<"AutomationMetrics", 'String'>
    readonly date: FieldRef<"AutomationMetrics", 'DateTime'>
    readonly runsCount: FieldRef<"AutomationMetrics", 'Int'>
    readonly successCount: FieldRef<"AutomationMetrics", 'Int'>
    readonly failureCount: FieldRef<"AutomationMetrics", 'Int'>
    readonly avgDuration: FieldRef<"AutomationMetrics", 'Int'>
    readonly timeSavedMinutes: FieldRef<"AutomationMetrics", 'Int'>
    readonly errorsPrevented: FieldRef<"AutomationMetrics", 'Int'>
    readonly costSavings: FieldRef<"AutomationMetrics", 'Decimal'>
    readonly createdAt: FieldRef<"AutomationMetrics", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AutomationMetrics findUnique
   */
  export type AutomationMetricsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationMetrics
     */
    select?: AutomationMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationMetrics
     */
    omit?: AutomationMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationMetricsInclude<ExtArgs> | null
    /**
     * Filter, which AutomationMetrics to fetch.
     */
    where: AutomationMetricsWhereUniqueInput
  }

  /**
   * AutomationMetrics findUniqueOrThrow
   */
  export type AutomationMetricsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationMetrics
     */
    select?: AutomationMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationMetrics
     */
    omit?: AutomationMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationMetricsInclude<ExtArgs> | null
    /**
     * Filter, which AutomationMetrics to fetch.
     */
    where: AutomationMetricsWhereUniqueInput
  }

  /**
   * AutomationMetrics findFirst
   */
  export type AutomationMetricsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationMetrics
     */
    select?: AutomationMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationMetrics
     */
    omit?: AutomationMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationMetricsInclude<ExtArgs> | null
    /**
     * Filter, which AutomationMetrics to fetch.
     */
    where?: AutomationMetricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AutomationMetrics to fetch.
     */
    orderBy?: AutomationMetricsOrderByWithRelationInput | AutomationMetricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AutomationMetrics.
     */
    cursor?: AutomationMetricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AutomationMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AutomationMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AutomationMetrics.
     */
    distinct?: AutomationMetricsScalarFieldEnum | AutomationMetricsScalarFieldEnum[]
  }

  /**
   * AutomationMetrics findFirstOrThrow
   */
  export type AutomationMetricsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationMetrics
     */
    select?: AutomationMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationMetrics
     */
    omit?: AutomationMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationMetricsInclude<ExtArgs> | null
    /**
     * Filter, which AutomationMetrics to fetch.
     */
    where?: AutomationMetricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AutomationMetrics to fetch.
     */
    orderBy?: AutomationMetricsOrderByWithRelationInput | AutomationMetricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AutomationMetrics.
     */
    cursor?: AutomationMetricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AutomationMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AutomationMetrics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AutomationMetrics.
     */
    distinct?: AutomationMetricsScalarFieldEnum | AutomationMetricsScalarFieldEnum[]
  }

  /**
   * AutomationMetrics findMany
   */
  export type AutomationMetricsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationMetrics
     */
    select?: AutomationMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationMetrics
     */
    omit?: AutomationMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationMetricsInclude<ExtArgs> | null
    /**
     * Filter, which AutomationMetrics to fetch.
     */
    where?: AutomationMetricsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AutomationMetrics to fetch.
     */
    orderBy?: AutomationMetricsOrderByWithRelationInput | AutomationMetricsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AutomationMetrics.
     */
    cursor?: AutomationMetricsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AutomationMetrics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AutomationMetrics.
     */
    skip?: number
    distinct?: AutomationMetricsScalarFieldEnum | AutomationMetricsScalarFieldEnum[]
  }

  /**
   * AutomationMetrics create
   */
  export type AutomationMetricsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationMetrics
     */
    select?: AutomationMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationMetrics
     */
    omit?: AutomationMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationMetricsInclude<ExtArgs> | null
    /**
     * The data needed to create a AutomationMetrics.
     */
    data: XOR<AutomationMetricsCreateInput, AutomationMetricsUncheckedCreateInput>
  }

  /**
   * AutomationMetrics createMany
   */
  export type AutomationMetricsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AutomationMetrics.
     */
    data: AutomationMetricsCreateManyInput | AutomationMetricsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AutomationMetrics createManyAndReturn
   */
  export type AutomationMetricsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationMetrics
     */
    select?: AutomationMetricsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationMetrics
     */
    omit?: AutomationMetricsOmit<ExtArgs> | null
    /**
     * The data used to create many AutomationMetrics.
     */
    data: AutomationMetricsCreateManyInput | AutomationMetricsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationMetricsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AutomationMetrics update
   */
  export type AutomationMetricsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationMetrics
     */
    select?: AutomationMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationMetrics
     */
    omit?: AutomationMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationMetricsInclude<ExtArgs> | null
    /**
     * The data needed to update a AutomationMetrics.
     */
    data: XOR<AutomationMetricsUpdateInput, AutomationMetricsUncheckedUpdateInput>
    /**
     * Choose, which AutomationMetrics to update.
     */
    where: AutomationMetricsWhereUniqueInput
  }

  /**
   * AutomationMetrics updateMany
   */
  export type AutomationMetricsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AutomationMetrics.
     */
    data: XOR<AutomationMetricsUpdateManyMutationInput, AutomationMetricsUncheckedUpdateManyInput>
    /**
     * Filter which AutomationMetrics to update
     */
    where?: AutomationMetricsWhereInput
    /**
     * Limit how many AutomationMetrics to update.
     */
    limit?: number
  }

  /**
   * AutomationMetrics updateManyAndReturn
   */
  export type AutomationMetricsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationMetrics
     */
    select?: AutomationMetricsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationMetrics
     */
    omit?: AutomationMetricsOmit<ExtArgs> | null
    /**
     * The data used to update AutomationMetrics.
     */
    data: XOR<AutomationMetricsUpdateManyMutationInput, AutomationMetricsUncheckedUpdateManyInput>
    /**
     * Filter which AutomationMetrics to update
     */
    where?: AutomationMetricsWhereInput
    /**
     * Limit how many AutomationMetrics to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationMetricsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AutomationMetrics upsert
   */
  export type AutomationMetricsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationMetrics
     */
    select?: AutomationMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationMetrics
     */
    omit?: AutomationMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationMetricsInclude<ExtArgs> | null
    /**
     * The filter to search for the AutomationMetrics to update in case it exists.
     */
    where: AutomationMetricsWhereUniqueInput
    /**
     * In case the AutomationMetrics found by the `where` argument doesn't exist, create a new AutomationMetrics with this data.
     */
    create: XOR<AutomationMetricsCreateInput, AutomationMetricsUncheckedCreateInput>
    /**
     * In case the AutomationMetrics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AutomationMetricsUpdateInput, AutomationMetricsUncheckedUpdateInput>
  }

  /**
   * AutomationMetrics delete
   */
  export type AutomationMetricsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationMetrics
     */
    select?: AutomationMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationMetrics
     */
    omit?: AutomationMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationMetricsInclude<ExtArgs> | null
    /**
     * Filter which AutomationMetrics to delete.
     */
    where: AutomationMetricsWhereUniqueInput
  }

  /**
   * AutomationMetrics deleteMany
   */
  export type AutomationMetricsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AutomationMetrics to delete
     */
    where?: AutomationMetricsWhereInput
    /**
     * Limit how many AutomationMetrics to delete.
     */
    limit?: number
  }

  /**
   * AutomationMetrics without action
   */
  export type AutomationMetricsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AutomationMetrics
     */
    select?: AutomationMetricsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AutomationMetrics
     */
    omit?: AutomationMetricsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AutomationMetricsInclude<ExtArgs> | null
  }


  /**
   * Model ApiKey
   */

  export type AggregateApiKey = {
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  export type ApiKeyMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    key: string | null
    keyHash: string | null
    lastUsedAt: Date | null
    expiresAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApiKeyMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    key: string | null
    keyHash: string | null
    lastUsedAt: Date | null
    expiresAt: Date | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ApiKeyCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    key: number
    keyHash: number
    lastUsedAt: number
    expiresAt: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ApiKeyMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    key?: true
    keyHash?: true
    lastUsedAt?: true
    expiresAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApiKeyMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    key?: true
    keyHash?: true
    lastUsedAt?: true
    expiresAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ApiKeyCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    key?: true
    keyHash?: true
    lastUsedAt?: true
    expiresAt?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ApiKeyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKey to aggregate.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ApiKeys
    **/
    _count?: true | ApiKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApiKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApiKeyMaxAggregateInputType
  }

  export type GetApiKeyAggregateType<T extends ApiKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateApiKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApiKey[P]>
      : GetScalarType<T[P], AggregateApiKey[P]>
  }




  export type ApiKeyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApiKeyWhereInput
    orderBy?: ApiKeyOrderByWithAggregationInput | ApiKeyOrderByWithAggregationInput[]
    by: ApiKeyScalarFieldEnum[] | ApiKeyScalarFieldEnum
    having?: ApiKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApiKeyCountAggregateInputType | true
    _min?: ApiKeyMinAggregateInputType
    _max?: ApiKeyMaxAggregateInputType
  }

  export type ApiKeyGroupByOutputType = {
    id: string
    userId: string
    name: string
    key: string
    keyHash: string
    lastUsedAt: Date | null
    expiresAt: Date | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: ApiKeyCountAggregateOutputType | null
    _min: ApiKeyMinAggregateOutputType | null
    _max: ApiKeyMaxAggregateOutputType | null
  }

  type GetApiKeyGroupByPayload<T extends ApiKeyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApiKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApiKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
            : GetScalarType<T[P], ApiKeyGroupByOutputType[P]>
        }
      >
    >


  export type ApiKeySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    key?: boolean
    keyHash?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    key?: boolean
    keyHash?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    key?: boolean
    keyHash?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["apiKey"]>

  export type ApiKeySelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    key?: boolean
    keyHash?: boolean
    lastUsedAt?: boolean
    expiresAt?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ApiKeyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "key" | "keyHash" | "lastUsedAt" | "expiresAt" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["apiKey"]>
  export type ApiKeyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ApiKeyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ApiKeyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ApiKeyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ApiKey"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      /**
       * @encrypted - The actual API key (hashed)
       */
      key: string
      keyHash: string
      lastUsedAt: Date | null
      expiresAt: Date | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["apiKey"]>
    composites: {}
  }

  type ApiKeyGetPayload<S extends boolean | null | undefined | ApiKeyDefaultArgs> = $Result.GetResult<Prisma.$ApiKeyPayload, S>

  type ApiKeyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApiKeyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApiKeyCountAggregateInputType | true
    }

  export interface ApiKeyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ApiKey'], meta: { name: 'ApiKey' } }
    /**
     * Find zero or one ApiKey that matches the filter.
     * @param {ApiKeyFindUniqueArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApiKeyFindUniqueArgs>(args: SelectSubset<T, ApiKeyFindUniqueArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ApiKey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApiKeyFindUniqueOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApiKeyFindUniqueOrThrowArgs>(args: SelectSubset<T, ApiKeyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApiKeyFindFirstArgs>(args?: SelectSubset<T, ApiKeyFindFirstArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ApiKey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindFirstOrThrowArgs} args - Arguments to find a ApiKey
     * @example
     * // Get one ApiKey
     * const apiKey = await prisma.apiKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApiKeyFindFirstOrThrowArgs>(args?: SelectSubset<T, ApiKeyFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ApiKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ApiKeys
     * const apiKeys = await prisma.apiKey.findMany()
     * 
     * // Get first 10 ApiKeys
     * const apiKeys = await prisma.apiKey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApiKeyFindManyArgs>(args?: SelectSubset<T, ApiKeyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ApiKey.
     * @param {ApiKeyCreateArgs} args - Arguments to create a ApiKey.
     * @example
     * // Create one ApiKey
     * const ApiKey = await prisma.apiKey.create({
     *   data: {
     *     // ... data to create a ApiKey
     *   }
     * })
     * 
     */
    create<T extends ApiKeyCreateArgs>(args: SelectSubset<T, ApiKeyCreateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ApiKeys.
     * @param {ApiKeyCreateManyArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApiKeyCreateManyArgs>(args?: SelectSubset<T, ApiKeyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ApiKeys and returns the data saved in the database.
     * @param {ApiKeyCreateManyAndReturnArgs} args - Arguments to create many ApiKeys.
     * @example
     * // Create many ApiKeys
     * const apiKey = await prisma.apiKey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ApiKeyCreateManyAndReturnArgs>(args?: SelectSubset<T, ApiKeyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ApiKey.
     * @param {ApiKeyDeleteArgs} args - Arguments to delete one ApiKey.
     * @example
     * // Delete one ApiKey
     * const ApiKey = await prisma.apiKey.delete({
     *   where: {
     *     // ... filter to delete one ApiKey
     *   }
     * })
     * 
     */
    delete<T extends ApiKeyDeleteArgs>(args: SelectSubset<T, ApiKeyDeleteArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ApiKey.
     * @param {ApiKeyUpdateArgs} args - Arguments to update one ApiKey.
     * @example
     * // Update one ApiKey
     * const apiKey = await prisma.apiKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApiKeyUpdateArgs>(args: SelectSubset<T, ApiKeyUpdateArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ApiKeys.
     * @param {ApiKeyDeleteManyArgs} args - Arguments to filter ApiKeys to delete.
     * @example
     * // Delete a few ApiKeys
     * const { count } = await prisma.apiKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApiKeyDeleteManyArgs>(args?: SelectSubset<T, ApiKeyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApiKeyUpdateManyArgs>(args: SelectSubset<T, ApiKeyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ApiKeys and returns the data updated in the database.
     * @param {ApiKeyUpdateManyAndReturnArgs} args - Arguments to update many ApiKeys.
     * @example
     * // Update many ApiKeys
     * const apiKey = await prisma.apiKey.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ApiKeys and only return the `id`
     * const apiKeyWithIdOnly = await prisma.apiKey.updateManyAndReturn({
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
    updateManyAndReturn<T extends ApiKeyUpdateManyAndReturnArgs>(args: SelectSubset<T, ApiKeyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ApiKey.
     * @param {ApiKeyUpsertArgs} args - Arguments to update or create a ApiKey.
     * @example
     * // Update or create a ApiKey
     * const apiKey = await prisma.apiKey.upsert({
     *   create: {
     *     // ... data to create a ApiKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ApiKey we want to update
     *   }
     * })
     */
    upsert<T extends ApiKeyUpsertArgs>(args: SelectSubset<T, ApiKeyUpsertArgs<ExtArgs>>): Prisma__ApiKeyClient<$Result.GetResult<Prisma.$ApiKeyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ApiKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyCountArgs} args - Arguments to filter ApiKeys to count.
     * @example
     * // Count the number of ApiKeys
     * const count = await prisma.apiKey.count({
     *   where: {
     *     // ... the filter for the ApiKeys we want to count
     *   }
     * })
    **/
    count<T extends ApiKeyCountArgs>(
      args?: Subset<T, ApiKeyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApiKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ApiKeyAggregateArgs>(args: Subset<T, ApiKeyAggregateArgs>): Prisma.PrismaPromise<GetApiKeyAggregateType<T>>

    /**
     * Group by ApiKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApiKeyGroupByArgs} args - Group by arguments.
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
      T extends ApiKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApiKeyGroupByArgs['orderBy'] }
        : { orderBy?: ApiKeyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ApiKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApiKeyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ApiKey model
   */
  readonly fields: ApiKeyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ApiKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApiKeyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the ApiKey model
   */
  interface ApiKeyFieldRefs {
    readonly id: FieldRef<"ApiKey", 'String'>
    readonly userId: FieldRef<"ApiKey", 'String'>
    readonly name: FieldRef<"ApiKey", 'String'>
    readonly key: FieldRef<"ApiKey", 'String'>
    readonly keyHash: FieldRef<"ApiKey", 'String'>
    readonly lastUsedAt: FieldRef<"ApiKey", 'DateTime'>
    readonly expiresAt: FieldRef<"ApiKey", 'DateTime'>
    readonly isActive: FieldRef<"ApiKey", 'Boolean'>
    readonly createdAt: FieldRef<"ApiKey", 'DateTime'>
    readonly updatedAt: FieldRef<"ApiKey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ApiKey findUnique
   */
  export type ApiKeyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findUniqueOrThrow
   */
  export type ApiKeyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey findFirst
   */
  export type ApiKeyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findFirstOrThrow
   */
  export type ApiKeyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKey to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ApiKeys.
     */
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey findMany
   */
  export type ApiKeyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter, which ApiKeys to fetch.
     */
    where?: ApiKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ApiKeys to fetch.
     */
    orderBy?: ApiKeyOrderByWithRelationInput | ApiKeyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ApiKeys.
     */
    cursor?: ApiKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ApiKeys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ApiKeys.
     */
    skip?: number
    distinct?: ApiKeyScalarFieldEnum | ApiKeyScalarFieldEnum[]
  }

  /**
   * ApiKey create
   */
  export type ApiKeyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to create a ApiKey.
     */
    data: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
  }

  /**
   * ApiKey createMany
   */
  export type ApiKeyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ApiKey createManyAndReturn
   */
  export type ApiKeyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data used to create many ApiKeys.
     */
    data: ApiKeyCreateManyInput | ApiKeyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiKey update
   */
  export type ApiKeyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The data needed to update a ApiKey.
     */
    data: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
    /**
     * Choose, which ApiKey to update.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey updateMany
   */
  export type ApiKeyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
  }

  /**
   * ApiKey updateManyAndReturn
   */
  export type ApiKeyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * The data used to update ApiKeys.
     */
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyInput>
    /**
     * Filter which ApiKeys to update
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ApiKey upsert
   */
  export type ApiKeyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * The filter to search for the ApiKey to update in case it exists.
     */
    where: ApiKeyWhereUniqueInput
    /**
     * In case the ApiKey found by the `where` argument doesn't exist, create a new ApiKey with this data.
     */
    create: XOR<ApiKeyCreateInput, ApiKeyUncheckedCreateInput>
    /**
     * In case the ApiKey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApiKeyUpdateInput, ApiKeyUncheckedUpdateInput>
  }

  /**
   * ApiKey delete
   */
  export type ApiKeyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
    /**
     * Filter which ApiKey to delete.
     */
    where: ApiKeyWhereUniqueInput
  }

  /**
   * ApiKey deleteMany
   */
  export type ApiKeyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ApiKeys to delete
     */
    where?: ApiKeyWhereInput
    /**
     * Limit how many ApiKeys to delete.
     */
    limit?: number
  }

  /**
   * ApiKey without action
   */
  export type ApiKeyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ApiKey
     */
    select?: ApiKeySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ApiKey
     */
    omit?: ApiKeyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApiKeyInclude<ExtArgs> | null
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
    expiresIn: 'expiresIn',
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
    requiredScopes: 'requiredScopes',
    version: 'version',
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
    version: 'version',
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


  export const ClientBrandingScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    companyName: 'companyName',
    logoUrl: 'logoUrl',
    primaryColor: 'primaryColor',
    secondaryColor: 'secondaryColor',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClientBrandingScalarFieldEnum = (typeof ClientBrandingScalarFieldEnum)[keyof typeof ClientBrandingScalarFieldEnum]


  export const ServiceRequestScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    description: 'description',
    businessProcess: 'businessProcess',
    desiredOutcome: 'desiredOutcome',
    priority: 'priority',
    status: 'status',
    meetingScheduled: 'meetingScheduled',
    meetingUrl: 'meetingUrl',
    meetingDate: 'meetingDate',
    preferredMeetingDate: 'preferredMeetingDate',
    availabilityNotes: 'availabilityNotes',
    proposalSent: 'proposalSent',
    proposalAccepted: 'proposalAccepted',
    estimatedHours: 'estimatedHours',
    quotedPrice: 'quotedPrice',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceRequestScalarFieldEnum = (typeof ServiceRequestScalarFieldEnum)[keyof typeof ServiceRequestScalarFieldEnum]


  export const AutomationMetricsScalarFieldEnum: {
    id: 'id',
    workflowId: 'workflowId',
    date: 'date',
    runsCount: 'runsCount',
    successCount: 'successCount',
    failureCount: 'failureCount',
    avgDuration: 'avgDuration',
    timeSavedMinutes: 'timeSavedMinutes',
    errorsPrevented: 'errorsPrevented',
    costSavings: 'costSavings',
    createdAt: 'createdAt'
  };

  export type AutomationMetricsScalarFieldEnum = (typeof AutomationMetricsScalarFieldEnum)[keyof typeof AutomationMetricsScalarFieldEnum]


  export const ApiKeyScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    key: 'key',
    keyHash: 'keyHash',
    lastUsedAt: 'lastUsedAt',
    expiresAt: 'expiresAt',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ApiKeyScalarFieldEnum = (typeof ApiKeyScalarFieldEnum)[keyof typeof ApiKeyScalarFieldEnum]


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
   * Reference to a field of type 'RequestPriority'
   */
  export type EnumRequestPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestPriority'>
    


  /**
   * Reference to a field of type 'RequestPriority[]'
   */
  export type ListEnumRequestPriorityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestPriority[]'>
    


  /**
   * Reference to a field of type 'RequestStatus'
   */
  export type EnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus'>
    


  /**
   * Reference to a field of type 'RequestStatus[]'
   */
  export type ListEnumRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'RequestStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
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
    clientBranding?: XOR<ClientBrandingNullableScalarRelationFilter, ClientBrandingWhereInput> | null
    serviceRequests?: ServiceRequestListRelationFilter
    apiKeys?: ApiKeyListRelationFilter
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
    clientBranding?: ClientBrandingOrderByWithRelationInput
    serviceRequests?: ServiceRequestOrderByRelationAggregateInput
    apiKeys?: ApiKeyOrderByRelationAggregateInput
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
    clientBranding?: XOR<ClientBrandingNullableScalarRelationFilter, ClientBrandingWhereInput> | null
    serviceRequests?: ServiceRequestListRelationFilter
    apiKeys?: ApiKeyListRelationFilter
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
    secret?: StringNullableFilter<"Credential"> | string | null
    config?: JsonNullableFilter<"Credential">
    expiresIn?: DateTimeNullableFilter<"Credential"> | Date | string | null
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
    secret?: SortOrderInput | SortOrder
    config?: SortOrderInput | SortOrder
    expiresIn?: SortOrderInput | SortOrder
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
    secret?: StringNullableFilter<"Credential"> | string | null
    config?: JsonNullableFilter<"Credential">
    expiresIn?: DateTimeNullableFilter<"Credential"> | Date | string | null
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
    secret?: SortOrderInput | SortOrder
    config?: SortOrderInput | SortOrder
    expiresIn?: SortOrderInput | SortOrder
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
    secret?: StringNullableWithAggregatesFilter<"Credential"> | string | null
    config?: JsonNullableWithAggregatesFilter<"Credential">
    expiresIn?: DateTimeNullableWithAggregatesFilter<"Credential"> | Date | string | null
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
    requiredScopes?: JsonNullableFilter<"Workflow">
    version?: StringNullableFilter<"Workflow"> | string | null
    config?: JsonNullableFilter<"Workflow">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    workflowCredentials?: WorkflowCredentialListRelationFilter
    workflowRuns?: WorkflowRunListRelationFilter
    automationMetrics?: AutomationMetricsListRelationFilter
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
    requiredScopes?: SortOrderInput | SortOrder
    version?: SortOrderInput | SortOrder
    config?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    workflowCredentials?: WorkflowCredentialOrderByRelationAggregateInput
    workflowRuns?: WorkflowRunOrderByRelationAggregateInput
    automationMetrics?: AutomationMetricsOrderByRelationAggregateInput
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
    requiredScopes?: JsonNullableFilter<"Workflow">
    version?: StringNullableFilter<"Workflow"> | string | null
    config?: JsonNullableFilter<"Workflow">
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    workflowCredentials?: WorkflowCredentialListRelationFilter
    workflowRuns?: WorkflowRunListRelationFilter
    automationMetrics?: AutomationMetricsListRelationFilter
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
    requiredScopes?: SortOrderInput | SortOrder
    version?: SortOrderInput | SortOrder
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
    requiredScopes?: JsonNullableWithAggregatesFilter<"Workflow">
    version?: StringNullableWithAggregatesFilter<"Workflow"> | string | null
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
    version?: StringNullableFilter<"WorkflowRun"> | string | null
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
    version?: SortOrderInput | SortOrder
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
    version?: StringNullableFilter<"WorkflowRun"> | string | null
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
    version?: SortOrderInput | SortOrder
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
    version?: StringNullableWithAggregatesFilter<"WorkflowRun"> | string | null
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

  export type ClientBrandingWhereInput = {
    AND?: ClientBrandingWhereInput | ClientBrandingWhereInput[]
    OR?: ClientBrandingWhereInput[]
    NOT?: ClientBrandingWhereInput | ClientBrandingWhereInput[]
    id?: StringFilter<"ClientBranding"> | string
    userId?: StringFilter<"ClientBranding"> | string
    companyName?: StringFilter<"ClientBranding"> | string
    logoUrl?: StringNullableFilter<"ClientBranding"> | string | null
    primaryColor?: StringNullableFilter<"ClientBranding"> | string | null
    secondaryColor?: StringNullableFilter<"ClientBranding"> | string | null
    createdAt?: DateTimeFilter<"ClientBranding"> | Date | string
    updatedAt?: DateTimeFilter<"ClientBranding"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ClientBrandingOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    primaryColor?: SortOrderInput | SortOrder
    secondaryColor?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ClientBrandingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ClientBrandingWhereInput | ClientBrandingWhereInput[]
    OR?: ClientBrandingWhereInput[]
    NOT?: ClientBrandingWhereInput | ClientBrandingWhereInput[]
    companyName?: StringFilter<"ClientBranding"> | string
    logoUrl?: StringNullableFilter<"ClientBranding"> | string | null
    primaryColor?: StringNullableFilter<"ClientBranding"> | string | null
    secondaryColor?: StringNullableFilter<"ClientBranding"> | string | null
    createdAt?: DateTimeFilter<"ClientBranding"> | Date | string
    updatedAt?: DateTimeFilter<"ClientBranding"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type ClientBrandingOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    primaryColor?: SortOrderInput | SortOrder
    secondaryColor?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClientBrandingCountOrderByAggregateInput
    _max?: ClientBrandingMaxOrderByAggregateInput
    _min?: ClientBrandingMinOrderByAggregateInput
  }

  export type ClientBrandingScalarWhereWithAggregatesInput = {
    AND?: ClientBrandingScalarWhereWithAggregatesInput | ClientBrandingScalarWhereWithAggregatesInput[]
    OR?: ClientBrandingScalarWhereWithAggregatesInput[]
    NOT?: ClientBrandingScalarWhereWithAggregatesInput | ClientBrandingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ClientBranding"> | string
    userId?: StringWithAggregatesFilter<"ClientBranding"> | string
    companyName?: StringWithAggregatesFilter<"ClientBranding"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"ClientBranding"> | string | null
    primaryColor?: StringNullableWithAggregatesFilter<"ClientBranding"> | string | null
    secondaryColor?: StringNullableWithAggregatesFilter<"ClientBranding"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ClientBranding"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ClientBranding"> | Date | string
  }

  export type ServiceRequestWhereInput = {
    AND?: ServiceRequestWhereInput | ServiceRequestWhereInput[]
    OR?: ServiceRequestWhereInput[]
    NOT?: ServiceRequestWhereInput | ServiceRequestWhereInput[]
    id?: StringFilter<"ServiceRequest"> | string
    userId?: StringFilter<"ServiceRequest"> | string
    title?: StringFilter<"ServiceRequest"> | string
    description?: StringFilter<"ServiceRequest"> | string
    businessProcess?: StringFilter<"ServiceRequest"> | string
    desiredOutcome?: StringFilter<"ServiceRequest"> | string
    priority?: EnumRequestPriorityFilter<"ServiceRequest"> | $Enums.RequestPriority
    status?: EnumRequestStatusFilter<"ServiceRequest"> | $Enums.RequestStatus
    meetingScheduled?: BoolFilter<"ServiceRequest"> | boolean
    meetingUrl?: StringNullableFilter<"ServiceRequest"> | string | null
    meetingDate?: DateTimeNullableFilter<"ServiceRequest"> | Date | string | null
    preferredMeetingDate?: StringNullableFilter<"ServiceRequest"> | string | null
    availabilityNotes?: StringNullableFilter<"ServiceRequest"> | string | null
    proposalSent?: BoolFilter<"ServiceRequest"> | boolean
    proposalAccepted?: BoolNullableFilter<"ServiceRequest"> | boolean | null
    estimatedHours?: IntNullableFilter<"ServiceRequest"> | number | null
    quotedPrice?: DecimalNullableFilter<"ServiceRequest"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"ServiceRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceRequest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ServiceRequestOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    businessProcess?: SortOrder
    desiredOutcome?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    meetingScheduled?: SortOrder
    meetingUrl?: SortOrderInput | SortOrder
    meetingDate?: SortOrderInput | SortOrder
    preferredMeetingDate?: SortOrderInput | SortOrder
    availabilityNotes?: SortOrderInput | SortOrder
    proposalSent?: SortOrder
    proposalAccepted?: SortOrderInput | SortOrder
    estimatedHours?: SortOrderInput | SortOrder
    quotedPrice?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ServiceRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceRequestWhereInput | ServiceRequestWhereInput[]
    OR?: ServiceRequestWhereInput[]
    NOT?: ServiceRequestWhereInput | ServiceRequestWhereInput[]
    userId?: StringFilter<"ServiceRequest"> | string
    title?: StringFilter<"ServiceRequest"> | string
    description?: StringFilter<"ServiceRequest"> | string
    businessProcess?: StringFilter<"ServiceRequest"> | string
    desiredOutcome?: StringFilter<"ServiceRequest"> | string
    priority?: EnumRequestPriorityFilter<"ServiceRequest"> | $Enums.RequestPriority
    status?: EnumRequestStatusFilter<"ServiceRequest"> | $Enums.RequestStatus
    meetingScheduled?: BoolFilter<"ServiceRequest"> | boolean
    meetingUrl?: StringNullableFilter<"ServiceRequest"> | string | null
    meetingDate?: DateTimeNullableFilter<"ServiceRequest"> | Date | string | null
    preferredMeetingDate?: StringNullableFilter<"ServiceRequest"> | string | null
    availabilityNotes?: StringNullableFilter<"ServiceRequest"> | string | null
    proposalSent?: BoolFilter<"ServiceRequest"> | boolean
    proposalAccepted?: BoolNullableFilter<"ServiceRequest"> | boolean | null
    estimatedHours?: IntNullableFilter<"ServiceRequest"> | number | null
    quotedPrice?: DecimalNullableFilter<"ServiceRequest"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"ServiceRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceRequest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ServiceRequestOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    businessProcess?: SortOrder
    desiredOutcome?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    meetingScheduled?: SortOrder
    meetingUrl?: SortOrderInput | SortOrder
    meetingDate?: SortOrderInput | SortOrder
    preferredMeetingDate?: SortOrderInput | SortOrder
    availabilityNotes?: SortOrderInput | SortOrder
    proposalSent?: SortOrder
    proposalAccepted?: SortOrderInput | SortOrder
    estimatedHours?: SortOrderInput | SortOrder
    quotedPrice?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceRequestCountOrderByAggregateInput
    _avg?: ServiceRequestAvgOrderByAggregateInput
    _max?: ServiceRequestMaxOrderByAggregateInput
    _min?: ServiceRequestMinOrderByAggregateInput
    _sum?: ServiceRequestSumOrderByAggregateInput
  }

  export type ServiceRequestScalarWhereWithAggregatesInput = {
    AND?: ServiceRequestScalarWhereWithAggregatesInput | ServiceRequestScalarWhereWithAggregatesInput[]
    OR?: ServiceRequestScalarWhereWithAggregatesInput[]
    NOT?: ServiceRequestScalarWhereWithAggregatesInput | ServiceRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceRequest"> | string
    userId?: StringWithAggregatesFilter<"ServiceRequest"> | string
    title?: StringWithAggregatesFilter<"ServiceRequest"> | string
    description?: StringWithAggregatesFilter<"ServiceRequest"> | string
    businessProcess?: StringWithAggregatesFilter<"ServiceRequest"> | string
    desiredOutcome?: StringWithAggregatesFilter<"ServiceRequest"> | string
    priority?: EnumRequestPriorityWithAggregatesFilter<"ServiceRequest"> | $Enums.RequestPriority
    status?: EnumRequestStatusWithAggregatesFilter<"ServiceRequest"> | $Enums.RequestStatus
    meetingScheduled?: BoolWithAggregatesFilter<"ServiceRequest"> | boolean
    meetingUrl?: StringNullableWithAggregatesFilter<"ServiceRequest"> | string | null
    meetingDate?: DateTimeNullableWithAggregatesFilter<"ServiceRequest"> | Date | string | null
    preferredMeetingDate?: StringNullableWithAggregatesFilter<"ServiceRequest"> | string | null
    availabilityNotes?: StringNullableWithAggregatesFilter<"ServiceRequest"> | string | null
    proposalSent?: BoolWithAggregatesFilter<"ServiceRequest"> | boolean
    proposalAccepted?: BoolNullableWithAggregatesFilter<"ServiceRequest"> | boolean | null
    estimatedHours?: IntNullableWithAggregatesFilter<"ServiceRequest"> | number | null
    quotedPrice?: DecimalNullableWithAggregatesFilter<"ServiceRequest"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ServiceRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServiceRequest"> | Date | string
  }

  export type AutomationMetricsWhereInput = {
    AND?: AutomationMetricsWhereInput | AutomationMetricsWhereInput[]
    OR?: AutomationMetricsWhereInput[]
    NOT?: AutomationMetricsWhereInput | AutomationMetricsWhereInput[]
    id?: StringFilter<"AutomationMetrics"> | string
    workflowId?: StringFilter<"AutomationMetrics"> | string
    date?: DateTimeFilter<"AutomationMetrics"> | Date | string
    runsCount?: IntFilter<"AutomationMetrics"> | number
    successCount?: IntFilter<"AutomationMetrics"> | number
    failureCount?: IntFilter<"AutomationMetrics"> | number
    avgDuration?: IntNullableFilter<"AutomationMetrics"> | number | null
    timeSavedMinutes?: IntNullableFilter<"AutomationMetrics"> | number | null
    errorsPrevented?: IntNullableFilter<"AutomationMetrics"> | number | null
    costSavings?: DecimalNullableFilter<"AutomationMetrics"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"AutomationMetrics"> | Date | string
    workflow?: XOR<WorkflowScalarRelationFilter, WorkflowWhereInput>
  }

  export type AutomationMetricsOrderByWithRelationInput = {
    id?: SortOrder
    workflowId?: SortOrder
    date?: SortOrder
    runsCount?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    avgDuration?: SortOrderInput | SortOrder
    timeSavedMinutes?: SortOrderInput | SortOrder
    errorsPrevented?: SortOrderInput | SortOrder
    costSavings?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    workflow?: WorkflowOrderByWithRelationInput
  }

  export type AutomationMetricsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    workflowId_date?: AutomationMetricsWorkflowIdDateCompoundUniqueInput
    AND?: AutomationMetricsWhereInput | AutomationMetricsWhereInput[]
    OR?: AutomationMetricsWhereInput[]
    NOT?: AutomationMetricsWhereInput | AutomationMetricsWhereInput[]
    workflowId?: StringFilter<"AutomationMetrics"> | string
    date?: DateTimeFilter<"AutomationMetrics"> | Date | string
    runsCount?: IntFilter<"AutomationMetrics"> | number
    successCount?: IntFilter<"AutomationMetrics"> | number
    failureCount?: IntFilter<"AutomationMetrics"> | number
    avgDuration?: IntNullableFilter<"AutomationMetrics"> | number | null
    timeSavedMinutes?: IntNullableFilter<"AutomationMetrics"> | number | null
    errorsPrevented?: IntNullableFilter<"AutomationMetrics"> | number | null
    costSavings?: DecimalNullableFilter<"AutomationMetrics"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"AutomationMetrics"> | Date | string
    workflow?: XOR<WorkflowScalarRelationFilter, WorkflowWhereInput>
  }, "id" | "workflowId_date">

  export type AutomationMetricsOrderByWithAggregationInput = {
    id?: SortOrder
    workflowId?: SortOrder
    date?: SortOrder
    runsCount?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    avgDuration?: SortOrderInput | SortOrder
    timeSavedMinutes?: SortOrderInput | SortOrder
    errorsPrevented?: SortOrderInput | SortOrder
    costSavings?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AutomationMetricsCountOrderByAggregateInput
    _avg?: AutomationMetricsAvgOrderByAggregateInput
    _max?: AutomationMetricsMaxOrderByAggregateInput
    _min?: AutomationMetricsMinOrderByAggregateInput
    _sum?: AutomationMetricsSumOrderByAggregateInput
  }

  export type AutomationMetricsScalarWhereWithAggregatesInput = {
    AND?: AutomationMetricsScalarWhereWithAggregatesInput | AutomationMetricsScalarWhereWithAggregatesInput[]
    OR?: AutomationMetricsScalarWhereWithAggregatesInput[]
    NOT?: AutomationMetricsScalarWhereWithAggregatesInput | AutomationMetricsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AutomationMetrics"> | string
    workflowId?: StringWithAggregatesFilter<"AutomationMetrics"> | string
    date?: DateTimeWithAggregatesFilter<"AutomationMetrics"> | Date | string
    runsCount?: IntWithAggregatesFilter<"AutomationMetrics"> | number
    successCount?: IntWithAggregatesFilter<"AutomationMetrics"> | number
    failureCount?: IntWithAggregatesFilter<"AutomationMetrics"> | number
    avgDuration?: IntNullableWithAggregatesFilter<"AutomationMetrics"> | number | null
    timeSavedMinutes?: IntNullableWithAggregatesFilter<"AutomationMetrics"> | number | null
    errorsPrevented?: IntNullableWithAggregatesFilter<"AutomationMetrics"> | number | null
    costSavings?: DecimalNullableWithAggregatesFilter<"AutomationMetrics"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AutomationMetrics"> | Date | string
  }

  export type ApiKeyWhereInput = {
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    userId?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    key?: StringFilter<"ApiKey"> | string
    keyHash?: StringFilter<"ApiKey"> | string
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    isActive?: BoolFilter<"ApiKey"> | boolean
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ApiKeyOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    key?: SortOrder
    keyHash?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ApiKeyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    keyHash?: string
    AND?: ApiKeyWhereInput | ApiKeyWhereInput[]
    OR?: ApiKeyWhereInput[]
    NOT?: ApiKeyWhereInput | ApiKeyWhereInput[]
    userId?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    isActive?: BoolFilter<"ApiKey"> | boolean
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "key" | "keyHash">

  export type ApiKeyOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    key?: SortOrder
    keyHash?: SortOrder
    lastUsedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ApiKeyCountOrderByAggregateInput
    _max?: ApiKeyMaxOrderByAggregateInput
    _min?: ApiKeyMinOrderByAggregateInput
  }

  export type ApiKeyScalarWhereWithAggregatesInput = {
    AND?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    OR?: ApiKeyScalarWhereWithAggregatesInput[]
    NOT?: ApiKeyScalarWhereWithAggregatesInput | ApiKeyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ApiKey"> | string
    userId?: StringWithAggregatesFilter<"ApiKey"> | string
    name?: StringWithAggregatesFilter<"ApiKey"> | string
    key?: StringWithAggregatesFilter<"ApiKey"> | string
    keyHash?: StringWithAggregatesFilter<"ApiKey"> | string
    lastUsedAt?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"ApiKey"> | Date | string | null
    isActive?: BoolWithAggregatesFilter<"ApiKey"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ApiKey"> | Date | string
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
    clientBranding?: ClientBrandingCreateNestedOneWithoutUserInput
    serviceRequests?: ServiceRequestCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
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
    clientBranding?: ClientBrandingUncheckedCreateNestedOneWithoutUserInput
    serviceRequests?: ServiceRequestUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
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
    clientBranding?: ClientBrandingUpdateOneWithoutUserNestedInput
    serviceRequests?: ServiceRequestUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
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
    clientBranding?: ClientBrandingUncheckedUpdateOneWithoutUserNestedInput
    serviceRequests?: ServiceRequestUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
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
    secret?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: Date | string | null
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
    secret?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: Date | string | null
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
    secret?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    secret?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    secret?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: Date | string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CredentialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    secret?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CredentialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    secret?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutWorkflowsInput
    workflowCredentials?: WorkflowCredentialCreateNestedManyWithoutWorkflowInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutWorkflowInput
    automationMetrics?: AutomationMetricsCreateNestedManyWithoutWorkflowInput
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialUncheckedCreateNestedManyWithoutWorkflowInput
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutWorkflowInput
    automationMetrics?: AutomationMetricsUncheckedCreateNestedManyWithoutWorkflowInput
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutWorkflowsNestedInput
    workflowCredentials?: WorkflowCredentialUpdateManyWithoutWorkflowNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutWorkflowNestedInput
    automationMetrics?: AutomationMetricsUpdateManyWithoutWorkflowNestedInput
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialUncheckedUpdateManyWithoutWorkflowNestedInput
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutWorkflowNestedInput
    automationMetrics?: AutomationMetricsUncheckedUpdateManyWithoutWorkflowNestedInput
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: string | null
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: NullableStringFieldUpdateOperationsInput | string | null
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: NullableStringFieldUpdateOperationsInput | string | null
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
    version?: string | null
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
    version?: string | null
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
    version?: NullableStringFieldUpdateOperationsInput | string | null
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
    version?: NullableStringFieldUpdateOperationsInput | string | null
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
    version?: string | null
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
    version?: NullableStringFieldUpdateOperationsInput | string | null
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
    version?: NullableStringFieldUpdateOperationsInput | string | null
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

  export type ClientBrandingCreateInput = {
    id?: string
    companyName: string
    logoUrl?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutClientBrandingInput
  }

  export type ClientBrandingUncheckedCreateInput = {
    id?: string
    userId: string
    companyName: string
    logoUrl?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientBrandingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClientBrandingNestedInput
  }

  export type ClientBrandingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientBrandingCreateManyInput = {
    id?: string
    userId: string
    companyName: string
    logoUrl?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientBrandingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientBrandingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRequestCreateInput = {
    id?: string
    title: string
    description: string
    businessProcess: string
    desiredOutcome: string
    priority?: $Enums.RequestPriority
    status?: $Enums.RequestStatus
    meetingScheduled?: boolean
    meetingUrl?: string | null
    meetingDate?: Date | string | null
    preferredMeetingDate?: string | null
    availabilityNotes?: string | null
    proposalSent?: boolean
    proposalAccepted?: boolean | null
    estimatedHours?: number | null
    quotedPrice?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutServiceRequestsInput
  }

  export type ServiceRequestUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    description: string
    businessProcess: string
    desiredOutcome: string
    priority?: $Enums.RequestPriority
    status?: $Enums.RequestStatus
    meetingScheduled?: boolean
    meetingUrl?: string | null
    meetingDate?: Date | string | null
    preferredMeetingDate?: string | null
    availabilityNotes?: string | null
    proposalSent?: boolean
    proposalAccepted?: boolean | null
    estimatedHours?: number | null
    quotedPrice?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    businessProcess?: StringFieldUpdateOperationsInput | string
    desiredOutcome?: StringFieldUpdateOperationsInput | string
    priority?: EnumRequestPriorityFieldUpdateOperationsInput | $Enums.RequestPriority
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    meetingScheduled?: BoolFieldUpdateOperationsInput | boolean
    meetingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    meetingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferredMeetingDate?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    proposalSent?: BoolFieldUpdateOperationsInput | boolean
    proposalAccepted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    quotedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutServiceRequestsNestedInput
  }

  export type ServiceRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    businessProcess?: StringFieldUpdateOperationsInput | string
    desiredOutcome?: StringFieldUpdateOperationsInput | string
    priority?: EnumRequestPriorityFieldUpdateOperationsInput | $Enums.RequestPriority
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    meetingScheduled?: BoolFieldUpdateOperationsInput | boolean
    meetingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    meetingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferredMeetingDate?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    proposalSent?: BoolFieldUpdateOperationsInput | boolean
    proposalAccepted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    quotedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRequestCreateManyInput = {
    id?: string
    userId: string
    title: string
    description: string
    businessProcess: string
    desiredOutcome: string
    priority?: $Enums.RequestPriority
    status?: $Enums.RequestStatus
    meetingScheduled?: boolean
    meetingUrl?: string | null
    meetingDate?: Date | string | null
    preferredMeetingDate?: string | null
    availabilityNotes?: string | null
    proposalSent?: boolean
    proposalAccepted?: boolean | null
    estimatedHours?: number | null
    quotedPrice?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    businessProcess?: StringFieldUpdateOperationsInput | string
    desiredOutcome?: StringFieldUpdateOperationsInput | string
    priority?: EnumRequestPriorityFieldUpdateOperationsInput | $Enums.RequestPriority
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    meetingScheduled?: BoolFieldUpdateOperationsInput | boolean
    meetingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    meetingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferredMeetingDate?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    proposalSent?: BoolFieldUpdateOperationsInput | boolean
    proposalAccepted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    quotedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    businessProcess?: StringFieldUpdateOperationsInput | string
    desiredOutcome?: StringFieldUpdateOperationsInput | string
    priority?: EnumRequestPriorityFieldUpdateOperationsInput | $Enums.RequestPriority
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    meetingScheduled?: BoolFieldUpdateOperationsInput | boolean
    meetingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    meetingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferredMeetingDate?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    proposalSent?: BoolFieldUpdateOperationsInput | boolean
    proposalAccepted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    quotedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationMetricsCreateInput = {
    id?: string
    date: Date | string
    runsCount?: number
    successCount?: number
    failureCount?: number
    avgDuration?: number | null
    timeSavedMinutes?: number | null
    errorsPrevented?: number | null
    costSavings?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    workflow: WorkflowCreateNestedOneWithoutAutomationMetricsInput
  }

  export type AutomationMetricsUncheckedCreateInput = {
    id?: string
    workflowId: string
    date: Date | string
    runsCount?: number
    successCount?: number
    failureCount?: number
    avgDuration?: number | null
    timeSavedMinutes?: number | null
    errorsPrevented?: number | null
    costSavings?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
  }

  export type AutomationMetricsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    runsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    avgDuration?: NullableIntFieldUpdateOperationsInput | number | null
    timeSavedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    errorsPrevented?: NullableIntFieldUpdateOperationsInput | number | null
    costSavings?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workflow?: WorkflowUpdateOneRequiredWithoutAutomationMetricsNestedInput
  }

  export type AutomationMetricsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflowId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    runsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    avgDuration?: NullableIntFieldUpdateOperationsInput | number | null
    timeSavedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    errorsPrevented?: NullableIntFieldUpdateOperationsInput | number | null
    costSavings?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationMetricsCreateManyInput = {
    id?: string
    workflowId: string
    date: Date | string
    runsCount?: number
    successCount?: number
    failureCount?: number
    avgDuration?: number | null
    timeSavedMinutes?: number | null
    errorsPrevented?: number | null
    costSavings?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
  }

  export type AutomationMetricsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    runsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    avgDuration?: NullableIntFieldUpdateOperationsInput | number | null
    timeSavedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    errorsPrevented?: NullableIntFieldUpdateOperationsInput | number | null
    costSavings?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationMetricsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workflowId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    runsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    avgDuration?: NullableIntFieldUpdateOperationsInput | number | null
    timeSavedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    errorsPrevented?: NullableIntFieldUpdateOperationsInput | number | null
    costSavings?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyCreateInput = {
    id?: string
    name: string
    key: string
    keyHash: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutApiKeysInput
  }

  export type ApiKeyUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    key: string
    keyHash: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutApiKeysNestedInput
  }

  export type ApiKeyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyCreateManyInput = {
    id?: string
    userId: string
    name: string
    key: string
    keyHash: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
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

  export type ClientBrandingNullableScalarRelationFilter = {
    is?: ClientBrandingWhereInput | null
    isNot?: ClientBrandingWhereInput | null
  }

  export type ServiceRequestListRelationFilter = {
    every?: ServiceRequestWhereInput
    some?: ServiceRequestWhereInput
    none?: ServiceRequestWhereInput
  }

  export type ApiKeyListRelationFilter = {
    every?: ApiKeyWhereInput
    some?: ApiKeyWhereInput
    none?: ApiKeyWhereInput
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

  export type ServiceRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApiKeyOrderByRelationAggregateInput = {
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
    expiresIn?: SortOrder
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
    expiresIn?: SortOrder
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
    expiresIn?: SortOrder
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

  export type EnumProviderNullableListFilter<$PrismaModel = never> = {
    equals?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel> | null
    has?: $Enums.Provider | EnumProviderFieldRefInput<$PrismaModel> | null
    hasEvery?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    hasSome?: $Enums.Provider[] | ListEnumProviderFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type AutomationMetricsListRelationFilter = {
    every?: AutomationMetricsWhereInput
    some?: AutomationMetricsWhereInput
    none?: AutomationMetricsWhereInput
  }

  export type AutomationMetricsOrderByRelationAggregateInput = {
    _count?: SortOrder
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
    requiredScopes?: SortOrder
    version?: SortOrder
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
    version?: SortOrder
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
    version?: SortOrder
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
    version?: SortOrder
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
    version?: SortOrder
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
    version?: SortOrder
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

  export type ClientBrandingCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    logoUrl?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientBrandingMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    logoUrl?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClientBrandingMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    companyName?: SortOrder
    logoUrl?: SortOrder
    primaryColor?: SortOrder
    secondaryColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRequestPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestPriority | EnumRequestPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.RequestPriority[] | ListEnumRequestPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestPriority[] | ListEnumRequestPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestPriorityFilter<$PrismaModel> | $Enums.RequestPriority
  }

  export type EnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type ServiceRequestCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    businessProcess?: SortOrder
    desiredOutcome?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    meetingScheduled?: SortOrder
    meetingUrl?: SortOrder
    meetingDate?: SortOrder
    preferredMeetingDate?: SortOrder
    availabilityNotes?: SortOrder
    proposalSent?: SortOrder
    proposalAccepted?: SortOrder
    estimatedHours?: SortOrder
    quotedPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceRequestAvgOrderByAggregateInput = {
    estimatedHours?: SortOrder
    quotedPrice?: SortOrder
  }

  export type ServiceRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    businessProcess?: SortOrder
    desiredOutcome?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    meetingScheduled?: SortOrder
    meetingUrl?: SortOrder
    meetingDate?: SortOrder
    preferredMeetingDate?: SortOrder
    availabilityNotes?: SortOrder
    proposalSent?: SortOrder
    proposalAccepted?: SortOrder
    estimatedHours?: SortOrder
    quotedPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceRequestMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    businessProcess?: SortOrder
    desiredOutcome?: SortOrder
    priority?: SortOrder
    status?: SortOrder
    meetingScheduled?: SortOrder
    meetingUrl?: SortOrder
    meetingDate?: SortOrder
    preferredMeetingDate?: SortOrder
    availabilityNotes?: SortOrder
    proposalSent?: SortOrder
    proposalAccepted?: SortOrder
    estimatedHours?: SortOrder
    quotedPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceRequestSumOrderByAggregateInput = {
    estimatedHours?: SortOrder
    quotedPrice?: SortOrder
  }

  export type EnumRequestPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestPriority | EnumRequestPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.RequestPriority[] | ListEnumRequestPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestPriority[] | ListEnumRequestPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestPriorityWithAggregatesFilter<$PrismaModel> | $Enums.RequestPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestPriorityFilter<$PrismaModel>
    _max?: NestedEnumRequestPriorityFilter<$PrismaModel>
  }

  export type EnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type AutomationMetricsWorkflowIdDateCompoundUniqueInput = {
    workflowId: string
    date: Date | string
  }

  export type AutomationMetricsCountOrderByAggregateInput = {
    id?: SortOrder
    workflowId?: SortOrder
    date?: SortOrder
    runsCount?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    avgDuration?: SortOrder
    timeSavedMinutes?: SortOrder
    errorsPrevented?: SortOrder
    costSavings?: SortOrder
    createdAt?: SortOrder
  }

  export type AutomationMetricsAvgOrderByAggregateInput = {
    runsCount?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    avgDuration?: SortOrder
    timeSavedMinutes?: SortOrder
    errorsPrevented?: SortOrder
    costSavings?: SortOrder
  }

  export type AutomationMetricsMaxOrderByAggregateInput = {
    id?: SortOrder
    workflowId?: SortOrder
    date?: SortOrder
    runsCount?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    avgDuration?: SortOrder
    timeSavedMinutes?: SortOrder
    errorsPrevented?: SortOrder
    costSavings?: SortOrder
    createdAt?: SortOrder
  }

  export type AutomationMetricsMinOrderByAggregateInput = {
    id?: SortOrder
    workflowId?: SortOrder
    date?: SortOrder
    runsCount?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    avgDuration?: SortOrder
    timeSavedMinutes?: SortOrder
    errorsPrevented?: SortOrder
    costSavings?: SortOrder
    createdAt?: SortOrder
  }

  export type AutomationMetricsSumOrderByAggregateInput = {
    runsCount?: SortOrder
    successCount?: SortOrder
    failureCount?: SortOrder
    avgDuration?: SortOrder
    timeSavedMinutes?: SortOrder
    errorsPrevented?: SortOrder
    costSavings?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type ApiKeyCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    key?: SortOrder
    keyHash?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    key?: SortOrder
    keyHash?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApiKeyMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    key?: SortOrder
    keyHash?: SortOrder
    lastUsedAt?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type ClientBrandingCreateNestedOneWithoutUserInput = {
    create?: XOR<ClientBrandingCreateWithoutUserInput, ClientBrandingUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClientBrandingCreateOrConnectWithoutUserInput
    connect?: ClientBrandingWhereUniqueInput
  }

  export type ServiceRequestCreateNestedManyWithoutUserInput = {
    create?: XOR<ServiceRequestCreateWithoutUserInput, ServiceRequestUncheckedCreateWithoutUserInput> | ServiceRequestCreateWithoutUserInput[] | ServiceRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServiceRequestCreateOrConnectWithoutUserInput | ServiceRequestCreateOrConnectWithoutUserInput[]
    createMany?: ServiceRequestCreateManyUserInputEnvelope
    connect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
  }

  export type ApiKeyCreateNestedManyWithoutUserInput = {
    create?: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput> | ApiKeyCreateWithoutUserInput[] | ApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUserInput | ApiKeyCreateOrConnectWithoutUserInput[]
    createMany?: ApiKeyCreateManyUserInputEnvelope
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
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

  export type ClientBrandingUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ClientBrandingCreateWithoutUserInput, ClientBrandingUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClientBrandingCreateOrConnectWithoutUserInput
    connect?: ClientBrandingWhereUniqueInput
  }

  export type ServiceRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ServiceRequestCreateWithoutUserInput, ServiceRequestUncheckedCreateWithoutUserInput> | ServiceRequestCreateWithoutUserInput[] | ServiceRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServiceRequestCreateOrConnectWithoutUserInput | ServiceRequestCreateOrConnectWithoutUserInput[]
    createMany?: ServiceRequestCreateManyUserInputEnvelope
    connect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
  }

  export type ApiKeyUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput> | ApiKeyCreateWithoutUserInput[] | ApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUserInput | ApiKeyCreateOrConnectWithoutUserInput[]
    createMany?: ApiKeyCreateManyUserInputEnvelope
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
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

  export type ClientBrandingUpdateOneWithoutUserNestedInput = {
    create?: XOR<ClientBrandingCreateWithoutUserInput, ClientBrandingUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClientBrandingCreateOrConnectWithoutUserInput
    upsert?: ClientBrandingUpsertWithoutUserInput
    disconnect?: ClientBrandingWhereInput | boolean
    delete?: ClientBrandingWhereInput | boolean
    connect?: ClientBrandingWhereUniqueInput
    update?: XOR<XOR<ClientBrandingUpdateToOneWithWhereWithoutUserInput, ClientBrandingUpdateWithoutUserInput>, ClientBrandingUncheckedUpdateWithoutUserInput>
  }

  export type ServiceRequestUpdateManyWithoutUserNestedInput = {
    create?: XOR<ServiceRequestCreateWithoutUserInput, ServiceRequestUncheckedCreateWithoutUserInput> | ServiceRequestCreateWithoutUserInput[] | ServiceRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServiceRequestCreateOrConnectWithoutUserInput | ServiceRequestCreateOrConnectWithoutUserInput[]
    upsert?: ServiceRequestUpsertWithWhereUniqueWithoutUserInput | ServiceRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ServiceRequestCreateManyUserInputEnvelope
    set?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    disconnect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    delete?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    connect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    update?: ServiceRequestUpdateWithWhereUniqueWithoutUserInput | ServiceRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ServiceRequestUpdateManyWithWhereWithoutUserInput | ServiceRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ServiceRequestScalarWhereInput | ServiceRequestScalarWhereInput[]
  }

  export type ApiKeyUpdateManyWithoutUserNestedInput = {
    create?: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput> | ApiKeyCreateWithoutUserInput[] | ApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUserInput | ApiKeyCreateOrConnectWithoutUserInput[]
    upsert?: ApiKeyUpsertWithWhereUniqueWithoutUserInput | ApiKeyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ApiKeyCreateManyUserInputEnvelope
    set?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    disconnect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    delete?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    update?: ApiKeyUpdateWithWhereUniqueWithoutUserInput | ApiKeyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ApiKeyUpdateManyWithWhereWithoutUserInput | ApiKeyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
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

  export type ClientBrandingUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ClientBrandingCreateWithoutUserInput, ClientBrandingUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClientBrandingCreateOrConnectWithoutUserInput
    upsert?: ClientBrandingUpsertWithoutUserInput
    disconnect?: ClientBrandingWhereInput | boolean
    delete?: ClientBrandingWhereInput | boolean
    connect?: ClientBrandingWhereUniqueInput
    update?: XOR<XOR<ClientBrandingUpdateToOneWithWhereWithoutUserInput, ClientBrandingUpdateWithoutUserInput>, ClientBrandingUncheckedUpdateWithoutUserInput>
  }

  export type ServiceRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ServiceRequestCreateWithoutUserInput, ServiceRequestUncheckedCreateWithoutUserInput> | ServiceRequestCreateWithoutUserInput[] | ServiceRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ServiceRequestCreateOrConnectWithoutUserInput | ServiceRequestCreateOrConnectWithoutUserInput[]
    upsert?: ServiceRequestUpsertWithWhereUniqueWithoutUserInput | ServiceRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ServiceRequestCreateManyUserInputEnvelope
    set?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    disconnect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    delete?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    connect?: ServiceRequestWhereUniqueInput | ServiceRequestWhereUniqueInput[]
    update?: ServiceRequestUpdateWithWhereUniqueWithoutUserInput | ServiceRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ServiceRequestUpdateManyWithWhereWithoutUserInput | ServiceRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ServiceRequestScalarWhereInput | ServiceRequestScalarWhereInput[]
  }

  export type ApiKeyUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput> | ApiKeyCreateWithoutUserInput[] | ApiKeyUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApiKeyCreateOrConnectWithoutUserInput | ApiKeyCreateOrConnectWithoutUserInput[]
    upsert?: ApiKeyUpsertWithWhereUniqueWithoutUserInput | ApiKeyUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ApiKeyCreateManyUserInputEnvelope
    set?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    disconnect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    delete?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    connect?: ApiKeyWhereUniqueInput | ApiKeyWhereUniqueInput[]
    update?: ApiKeyUpdateWithWhereUniqueWithoutUserInput | ApiKeyUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ApiKeyUpdateManyWithWhereWithoutUserInput | ApiKeyUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
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

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
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

  export type AutomationMetricsCreateNestedManyWithoutWorkflowInput = {
    create?: XOR<AutomationMetricsCreateWithoutWorkflowInput, AutomationMetricsUncheckedCreateWithoutWorkflowInput> | AutomationMetricsCreateWithoutWorkflowInput[] | AutomationMetricsUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: AutomationMetricsCreateOrConnectWithoutWorkflowInput | AutomationMetricsCreateOrConnectWithoutWorkflowInput[]
    createMany?: AutomationMetricsCreateManyWorkflowInputEnvelope
    connect?: AutomationMetricsWhereUniqueInput | AutomationMetricsWhereUniqueInput[]
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

  export type AutomationMetricsUncheckedCreateNestedManyWithoutWorkflowInput = {
    create?: XOR<AutomationMetricsCreateWithoutWorkflowInput, AutomationMetricsUncheckedCreateWithoutWorkflowInput> | AutomationMetricsCreateWithoutWorkflowInput[] | AutomationMetricsUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: AutomationMetricsCreateOrConnectWithoutWorkflowInput | AutomationMetricsCreateOrConnectWithoutWorkflowInput[]
    createMany?: AutomationMetricsCreateManyWorkflowInputEnvelope
    connect?: AutomationMetricsWhereUniqueInput | AutomationMetricsWhereUniqueInput[]
  }

  export type EnumWorkflowStatusFieldUpdateOperationsInput = {
    set?: $Enums.WorkflowStatus
  }

  export type WorkflowUpdatecronExpressionsInput = {
    set?: string[]
    push?: string | string[]
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

  export type AutomationMetricsUpdateManyWithoutWorkflowNestedInput = {
    create?: XOR<AutomationMetricsCreateWithoutWorkflowInput, AutomationMetricsUncheckedCreateWithoutWorkflowInput> | AutomationMetricsCreateWithoutWorkflowInput[] | AutomationMetricsUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: AutomationMetricsCreateOrConnectWithoutWorkflowInput | AutomationMetricsCreateOrConnectWithoutWorkflowInput[]
    upsert?: AutomationMetricsUpsertWithWhereUniqueWithoutWorkflowInput | AutomationMetricsUpsertWithWhereUniqueWithoutWorkflowInput[]
    createMany?: AutomationMetricsCreateManyWorkflowInputEnvelope
    set?: AutomationMetricsWhereUniqueInput | AutomationMetricsWhereUniqueInput[]
    disconnect?: AutomationMetricsWhereUniqueInput | AutomationMetricsWhereUniqueInput[]
    delete?: AutomationMetricsWhereUniqueInput | AutomationMetricsWhereUniqueInput[]
    connect?: AutomationMetricsWhereUniqueInput | AutomationMetricsWhereUniqueInput[]
    update?: AutomationMetricsUpdateWithWhereUniqueWithoutWorkflowInput | AutomationMetricsUpdateWithWhereUniqueWithoutWorkflowInput[]
    updateMany?: AutomationMetricsUpdateManyWithWhereWithoutWorkflowInput | AutomationMetricsUpdateManyWithWhereWithoutWorkflowInput[]
    deleteMany?: AutomationMetricsScalarWhereInput | AutomationMetricsScalarWhereInput[]
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

  export type AutomationMetricsUncheckedUpdateManyWithoutWorkflowNestedInput = {
    create?: XOR<AutomationMetricsCreateWithoutWorkflowInput, AutomationMetricsUncheckedCreateWithoutWorkflowInput> | AutomationMetricsCreateWithoutWorkflowInput[] | AutomationMetricsUncheckedCreateWithoutWorkflowInput[]
    connectOrCreate?: AutomationMetricsCreateOrConnectWithoutWorkflowInput | AutomationMetricsCreateOrConnectWithoutWorkflowInput[]
    upsert?: AutomationMetricsUpsertWithWhereUniqueWithoutWorkflowInput | AutomationMetricsUpsertWithWhereUniqueWithoutWorkflowInput[]
    createMany?: AutomationMetricsCreateManyWorkflowInputEnvelope
    set?: AutomationMetricsWhereUniqueInput | AutomationMetricsWhereUniqueInput[]
    disconnect?: AutomationMetricsWhereUniqueInput | AutomationMetricsWhereUniqueInput[]
    delete?: AutomationMetricsWhereUniqueInput | AutomationMetricsWhereUniqueInput[]
    connect?: AutomationMetricsWhereUniqueInput | AutomationMetricsWhereUniqueInput[]
    update?: AutomationMetricsUpdateWithWhereUniqueWithoutWorkflowInput | AutomationMetricsUpdateWithWhereUniqueWithoutWorkflowInput[]
    updateMany?: AutomationMetricsUpdateManyWithWhereWithoutWorkflowInput | AutomationMetricsUpdateManyWithWhereWithoutWorkflowInput[]
    deleteMany?: AutomationMetricsScalarWhereInput | AutomationMetricsScalarWhereInput[]
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

  export type UserCreateNestedOneWithoutClientBrandingInput = {
    create?: XOR<UserCreateWithoutClientBrandingInput, UserUncheckedCreateWithoutClientBrandingInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientBrandingInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutClientBrandingNestedInput = {
    create?: XOR<UserCreateWithoutClientBrandingInput, UserUncheckedCreateWithoutClientBrandingInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientBrandingInput
    upsert?: UserUpsertWithoutClientBrandingInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClientBrandingInput, UserUpdateWithoutClientBrandingInput>, UserUncheckedUpdateWithoutClientBrandingInput>
  }

  export type UserCreateNestedOneWithoutServiceRequestsInput = {
    create?: XOR<UserCreateWithoutServiceRequestsInput, UserUncheckedCreateWithoutServiceRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutServiceRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumRequestPriorityFieldUpdateOperationsInput = {
    set?: $Enums.RequestPriority
  }

  export type EnumRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.RequestStatus
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutServiceRequestsNestedInput = {
    create?: XOR<UserCreateWithoutServiceRequestsInput, UserUncheckedCreateWithoutServiceRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutServiceRequestsInput
    upsert?: UserUpsertWithoutServiceRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutServiceRequestsInput, UserUpdateWithoutServiceRequestsInput>, UserUncheckedUpdateWithoutServiceRequestsInput>
  }

  export type WorkflowCreateNestedOneWithoutAutomationMetricsInput = {
    create?: XOR<WorkflowCreateWithoutAutomationMetricsInput, WorkflowUncheckedCreateWithoutAutomationMetricsInput>
    connectOrCreate?: WorkflowCreateOrConnectWithoutAutomationMetricsInput
    connect?: WorkflowWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type WorkflowUpdateOneRequiredWithoutAutomationMetricsNestedInput = {
    create?: XOR<WorkflowCreateWithoutAutomationMetricsInput, WorkflowUncheckedCreateWithoutAutomationMetricsInput>
    connectOrCreate?: WorkflowCreateOrConnectWithoutAutomationMetricsInput
    upsert?: WorkflowUpsertWithoutAutomationMetricsInput
    connect?: WorkflowWhereUniqueInput
    update?: XOR<XOR<WorkflowUpdateToOneWithWhereWithoutAutomationMetricsInput, WorkflowUpdateWithoutAutomationMetricsInput>, WorkflowUncheckedUpdateWithoutAutomationMetricsInput>
  }

  export type UserCreateNestedOneWithoutApiKeysInput = {
    create?: XOR<UserCreateWithoutApiKeysInput, UserUncheckedCreateWithoutApiKeysInput>
    connectOrCreate?: UserCreateOrConnectWithoutApiKeysInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutApiKeysNestedInput = {
    create?: XOR<UserCreateWithoutApiKeysInput, UserUncheckedCreateWithoutApiKeysInput>
    connectOrCreate?: UserCreateOrConnectWithoutApiKeysInput
    upsert?: UserUpsertWithoutApiKeysInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutApiKeysInput, UserUpdateWithoutApiKeysInput>, UserUncheckedUpdateWithoutApiKeysInput>
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

  export type NestedEnumWorkflowStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkflowStatus | EnumWorkflowStatusFieldRefInput<$PrismaModel>
    in?: $Enums.WorkflowStatus[] | ListEnumWorkflowStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkflowStatus[] | ListEnumWorkflowStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkflowStatusFilter<$PrismaModel> | $Enums.WorkflowStatus
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

  export type NestedEnumRequestPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestPriority | EnumRequestPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.RequestPriority[] | ListEnumRequestPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestPriority[] | ListEnumRequestPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestPriorityFilter<$PrismaModel> | $Enums.RequestPriority
  }

  export type NestedEnumRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusFilter<$PrismaModel> | $Enums.RequestStatus
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumRequestPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestPriority | EnumRequestPriorityFieldRefInput<$PrismaModel>
    in?: $Enums.RequestPriority[] | ListEnumRequestPriorityFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestPriority[] | ListEnumRequestPriorityFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestPriorityWithAggregatesFilter<$PrismaModel> | $Enums.RequestPriority
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestPriorityFilter<$PrismaModel>
    _max?: NestedEnumRequestPriorityFilter<$PrismaModel>
  }

  export type NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.RequestStatus | EnumRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.RequestStatus[] | ListEnumRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.RequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumRequestStatusFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialCreateNestedManyWithoutWorkflowInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutWorkflowInput
    automationMetrics?: AutomationMetricsCreateNestedManyWithoutWorkflowInput
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialUncheckedCreateNestedManyWithoutWorkflowInput
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutWorkflowInput
    automationMetrics?: AutomationMetricsUncheckedCreateNestedManyWithoutWorkflowInput
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
    secret?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workflowCredentials?: WorkflowCredentialCreateNestedManyWithoutCredentialInput
  }

  export type CredentialUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    type: $Enums.CredentialType
    provider: $Enums.Provider
    secret?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: Date | string | null
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
    version?: string | null
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
    version?: string | null
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

  export type ClientBrandingCreateWithoutUserInput = {
    id?: string
    companyName: string
    logoUrl?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientBrandingUncheckedCreateWithoutUserInput = {
    id?: string
    companyName: string
    logoUrl?: string | null
    primaryColor?: string | null
    secondaryColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClientBrandingCreateOrConnectWithoutUserInput = {
    where: ClientBrandingWhereUniqueInput
    create: XOR<ClientBrandingCreateWithoutUserInput, ClientBrandingUncheckedCreateWithoutUserInput>
  }

  export type ServiceRequestCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    businessProcess: string
    desiredOutcome: string
    priority?: $Enums.RequestPriority
    status?: $Enums.RequestStatus
    meetingScheduled?: boolean
    meetingUrl?: string | null
    meetingDate?: Date | string | null
    preferredMeetingDate?: string | null
    availabilityNotes?: string | null
    proposalSent?: boolean
    proposalAccepted?: boolean | null
    estimatedHours?: number | null
    quotedPrice?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceRequestUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    description: string
    businessProcess: string
    desiredOutcome: string
    priority?: $Enums.RequestPriority
    status?: $Enums.RequestStatus
    meetingScheduled?: boolean
    meetingUrl?: string | null
    meetingDate?: Date | string | null
    preferredMeetingDate?: string | null
    availabilityNotes?: string | null
    proposalSent?: boolean
    proposalAccepted?: boolean | null
    estimatedHours?: number | null
    quotedPrice?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceRequestCreateOrConnectWithoutUserInput = {
    where: ServiceRequestWhereUniqueInput
    create: XOR<ServiceRequestCreateWithoutUserInput, ServiceRequestUncheckedCreateWithoutUserInput>
  }

  export type ServiceRequestCreateManyUserInputEnvelope = {
    data: ServiceRequestCreateManyUserInput | ServiceRequestCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ApiKeyCreateWithoutUserInput = {
    id?: string
    name: string
    key: string
    keyHash: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    key: string
    keyHash: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyCreateOrConnectWithoutUserInput = {
    where: ApiKeyWhereUniqueInput
    create: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput>
  }

  export type ApiKeyCreateManyUserInputEnvelope = {
    data: ApiKeyCreateManyUserInput | ApiKeyCreateManyUserInput[]
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
    requiredScopes?: JsonNullableFilter<"Workflow">
    version?: StringNullableFilter<"Workflow"> | string | null
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
    secret?: StringNullableFilter<"Credential"> | string | null
    config?: JsonNullableFilter<"Credential">
    expiresIn?: DateTimeNullableFilter<"Credential"> | Date | string | null
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
    version?: StringNullableFilter<"WorkflowRun"> | string | null
    workflowId?: StringFilter<"WorkflowRun"> | string
    userId?: StringFilter<"WorkflowRun"> | string
    createdAt?: DateTimeFilter<"WorkflowRun"> | Date | string
    updatedAt?: DateTimeFilter<"WorkflowRun"> | Date | string
  }

  export type ClientBrandingUpsertWithoutUserInput = {
    update: XOR<ClientBrandingUpdateWithoutUserInput, ClientBrandingUncheckedUpdateWithoutUserInput>
    create: XOR<ClientBrandingCreateWithoutUserInput, ClientBrandingUncheckedCreateWithoutUserInput>
    where?: ClientBrandingWhereInput
  }

  export type ClientBrandingUpdateToOneWithWhereWithoutUserInput = {
    where?: ClientBrandingWhereInput
    data: XOR<ClientBrandingUpdateWithoutUserInput, ClientBrandingUncheckedUpdateWithoutUserInput>
  }

  export type ClientBrandingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientBrandingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyName?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    primaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    secondaryColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: ServiceRequestWhereUniqueInput
    update: XOR<ServiceRequestUpdateWithoutUserInput, ServiceRequestUncheckedUpdateWithoutUserInput>
    create: XOR<ServiceRequestCreateWithoutUserInput, ServiceRequestUncheckedCreateWithoutUserInput>
  }

  export type ServiceRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: ServiceRequestWhereUniqueInput
    data: XOR<ServiceRequestUpdateWithoutUserInput, ServiceRequestUncheckedUpdateWithoutUserInput>
  }

  export type ServiceRequestUpdateManyWithWhereWithoutUserInput = {
    where: ServiceRequestScalarWhereInput
    data: XOR<ServiceRequestUpdateManyMutationInput, ServiceRequestUncheckedUpdateManyWithoutUserInput>
  }

  export type ServiceRequestScalarWhereInput = {
    AND?: ServiceRequestScalarWhereInput | ServiceRequestScalarWhereInput[]
    OR?: ServiceRequestScalarWhereInput[]
    NOT?: ServiceRequestScalarWhereInput | ServiceRequestScalarWhereInput[]
    id?: StringFilter<"ServiceRequest"> | string
    userId?: StringFilter<"ServiceRequest"> | string
    title?: StringFilter<"ServiceRequest"> | string
    description?: StringFilter<"ServiceRequest"> | string
    businessProcess?: StringFilter<"ServiceRequest"> | string
    desiredOutcome?: StringFilter<"ServiceRequest"> | string
    priority?: EnumRequestPriorityFilter<"ServiceRequest"> | $Enums.RequestPriority
    status?: EnumRequestStatusFilter<"ServiceRequest"> | $Enums.RequestStatus
    meetingScheduled?: BoolFilter<"ServiceRequest"> | boolean
    meetingUrl?: StringNullableFilter<"ServiceRequest"> | string | null
    meetingDate?: DateTimeNullableFilter<"ServiceRequest"> | Date | string | null
    preferredMeetingDate?: StringNullableFilter<"ServiceRequest"> | string | null
    availabilityNotes?: StringNullableFilter<"ServiceRequest"> | string | null
    proposalSent?: BoolFilter<"ServiceRequest"> | boolean
    proposalAccepted?: BoolNullableFilter<"ServiceRequest"> | boolean | null
    estimatedHours?: IntNullableFilter<"ServiceRequest"> | number | null
    quotedPrice?: DecimalNullableFilter<"ServiceRequest"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"ServiceRequest"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceRequest"> | Date | string
  }

  export type ApiKeyUpsertWithWhereUniqueWithoutUserInput = {
    where: ApiKeyWhereUniqueInput
    update: XOR<ApiKeyUpdateWithoutUserInput, ApiKeyUncheckedUpdateWithoutUserInput>
    create: XOR<ApiKeyCreateWithoutUserInput, ApiKeyUncheckedCreateWithoutUserInput>
  }

  export type ApiKeyUpdateWithWhereUniqueWithoutUserInput = {
    where: ApiKeyWhereUniqueInput
    data: XOR<ApiKeyUpdateWithoutUserInput, ApiKeyUncheckedUpdateWithoutUserInput>
  }

  export type ApiKeyUpdateManyWithWhereWithoutUserInput = {
    where: ApiKeyScalarWhereInput
    data: XOR<ApiKeyUpdateManyMutationInput, ApiKeyUncheckedUpdateManyWithoutUserInput>
  }

  export type ApiKeyScalarWhereInput = {
    AND?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
    OR?: ApiKeyScalarWhereInput[]
    NOT?: ApiKeyScalarWhereInput | ApiKeyScalarWhereInput[]
    id?: StringFilter<"ApiKey"> | string
    userId?: StringFilter<"ApiKey"> | string
    name?: StringFilter<"ApiKey"> | string
    key?: StringFilter<"ApiKey"> | string
    keyHash?: StringFilter<"ApiKey"> | string
    lastUsedAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"ApiKey"> | Date | string | null
    isActive?: BoolFilter<"ApiKey"> | boolean
    createdAt?: DateTimeFilter<"ApiKey"> | Date | string
    updatedAt?: DateTimeFilter<"ApiKey"> | Date | string
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
    clientBranding?: ClientBrandingCreateNestedOneWithoutUserInput
    serviceRequests?: ServiceRequestCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
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
    clientBranding?: ClientBrandingUncheckedCreateNestedOneWithoutUserInput
    serviceRequests?: ServiceRequestUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
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
    clientBranding?: ClientBrandingUpdateOneWithoutUserNestedInput
    serviceRequests?: ServiceRequestUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
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
    clientBranding?: ClientBrandingUncheckedUpdateOneWithoutUserNestedInput
    serviceRequests?: ServiceRequestUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
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
    clientBranding?: ClientBrandingCreateNestedOneWithoutUserInput
    serviceRequests?: ServiceRequestCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
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
    clientBranding?: ClientBrandingUncheckedCreateNestedOneWithoutUserInput
    serviceRequests?: ServiceRequestUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
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
    version?: string | null
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
    version?: string | null
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

  export type AutomationMetricsCreateWithoutWorkflowInput = {
    id?: string
    date: Date | string
    runsCount?: number
    successCount?: number
    failureCount?: number
    avgDuration?: number | null
    timeSavedMinutes?: number | null
    errorsPrevented?: number | null
    costSavings?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
  }

  export type AutomationMetricsUncheckedCreateWithoutWorkflowInput = {
    id?: string
    date: Date | string
    runsCount?: number
    successCount?: number
    failureCount?: number
    avgDuration?: number | null
    timeSavedMinutes?: number | null
    errorsPrevented?: number | null
    costSavings?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
  }

  export type AutomationMetricsCreateOrConnectWithoutWorkflowInput = {
    where: AutomationMetricsWhereUniqueInput
    create: XOR<AutomationMetricsCreateWithoutWorkflowInput, AutomationMetricsUncheckedCreateWithoutWorkflowInput>
  }

  export type AutomationMetricsCreateManyWorkflowInputEnvelope = {
    data: AutomationMetricsCreateManyWorkflowInput | AutomationMetricsCreateManyWorkflowInput[]
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
    clientBranding?: ClientBrandingUpdateOneWithoutUserNestedInput
    serviceRequests?: ServiceRequestUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
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
    clientBranding?: ClientBrandingUncheckedUpdateOneWithoutUserNestedInput
    serviceRequests?: ServiceRequestUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
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

  export type AutomationMetricsUpsertWithWhereUniqueWithoutWorkflowInput = {
    where: AutomationMetricsWhereUniqueInput
    update: XOR<AutomationMetricsUpdateWithoutWorkflowInput, AutomationMetricsUncheckedUpdateWithoutWorkflowInput>
    create: XOR<AutomationMetricsCreateWithoutWorkflowInput, AutomationMetricsUncheckedCreateWithoutWorkflowInput>
  }

  export type AutomationMetricsUpdateWithWhereUniqueWithoutWorkflowInput = {
    where: AutomationMetricsWhereUniqueInput
    data: XOR<AutomationMetricsUpdateWithoutWorkflowInput, AutomationMetricsUncheckedUpdateWithoutWorkflowInput>
  }

  export type AutomationMetricsUpdateManyWithWhereWithoutWorkflowInput = {
    where: AutomationMetricsScalarWhereInput
    data: XOR<AutomationMetricsUpdateManyMutationInput, AutomationMetricsUncheckedUpdateManyWithoutWorkflowInput>
  }

  export type AutomationMetricsScalarWhereInput = {
    AND?: AutomationMetricsScalarWhereInput | AutomationMetricsScalarWhereInput[]
    OR?: AutomationMetricsScalarWhereInput[]
    NOT?: AutomationMetricsScalarWhereInput | AutomationMetricsScalarWhereInput[]
    id?: StringFilter<"AutomationMetrics"> | string
    workflowId?: StringFilter<"AutomationMetrics"> | string
    date?: DateTimeFilter<"AutomationMetrics"> | Date | string
    runsCount?: IntFilter<"AutomationMetrics"> | number
    successCount?: IntFilter<"AutomationMetrics"> | number
    failureCount?: IntFilter<"AutomationMetrics"> | number
    avgDuration?: IntNullableFilter<"AutomationMetrics"> | number | null
    timeSavedMinutes?: IntNullableFilter<"AutomationMetrics"> | number | null
    errorsPrevented?: IntNullableFilter<"AutomationMetrics"> | number | null
    costSavings?: DecimalNullableFilter<"AutomationMetrics"> | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFilter<"AutomationMetrics"> | Date | string
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutWorkflowsInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutWorkflowInput
    automationMetrics?: AutomationMetricsCreateNestedManyWithoutWorkflowInput
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutWorkflowInput
    automationMetrics?: AutomationMetricsUncheckedCreateNestedManyWithoutWorkflowInput
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
    secret?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutCredentialsInput
  }

  export type CredentialUncheckedCreateWithoutWorkflowCredentialsInput = {
    id?: string
    name: string
    type: $Enums.CredentialType
    provider: $Enums.Provider
    secret?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: Date | string | null
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutWorkflowsNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutWorkflowNestedInput
    automationMetrics?: AutomationMetricsUpdateManyWithoutWorkflowNestedInput
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutWorkflowNestedInput
    automationMetrics?: AutomationMetricsUncheckedUpdateManyWithoutWorkflowNestedInput
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
    secret?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCredentialsNestedInput
  }

  export type CredentialUncheckedUpdateWithoutWorkflowCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    secret?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutWorkflowsInput
    workflowCredentials?: WorkflowCredentialCreateNestedManyWithoutWorkflowInput
    automationMetrics?: AutomationMetricsCreateNestedManyWithoutWorkflowInput
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialUncheckedCreateNestedManyWithoutWorkflowInput
    automationMetrics?: AutomationMetricsUncheckedCreateNestedManyWithoutWorkflowInput
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
    clientBranding?: ClientBrandingCreateNestedOneWithoutUserInput
    serviceRequests?: ServiceRequestCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
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
    clientBranding?: ClientBrandingUncheckedCreateNestedOneWithoutUserInput
    serviceRequests?: ServiceRequestUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutWorkflowsNestedInput
    workflowCredentials?: WorkflowCredentialUpdateManyWithoutWorkflowNestedInput
    automationMetrics?: AutomationMetricsUpdateManyWithoutWorkflowNestedInput
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialUncheckedUpdateManyWithoutWorkflowNestedInput
    automationMetrics?: AutomationMetricsUncheckedUpdateManyWithoutWorkflowNestedInput
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
    clientBranding?: ClientBrandingUpdateOneWithoutUserNestedInput
    serviceRequests?: ServiceRequestUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
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
    clientBranding?: ClientBrandingUncheckedUpdateOneWithoutUserNestedInput
    serviceRequests?: ServiceRequestUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutClientBrandingInput = {
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
    serviceRequests?: ServiceRequestCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutClientBrandingInput = {
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
    serviceRequests?: ServiceRequestUncheckedCreateNestedManyWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutClientBrandingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClientBrandingInput, UserUncheckedCreateWithoutClientBrandingInput>
  }

  export type UserUpsertWithoutClientBrandingInput = {
    update: XOR<UserUpdateWithoutClientBrandingInput, UserUncheckedUpdateWithoutClientBrandingInput>
    create: XOR<UserCreateWithoutClientBrandingInput, UserUncheckedCreateWithoutClientBrandingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClientBrandingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClientBrandingInput, UserUncheckedUpdateWithoutClientBrandingInput>
  }

  export type UserUpdateWithoutClientBrandingInput = {
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
    serviceRequests?: ServiceRequestUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutClientBrandingInput = {
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
    serviceRequests?: ServiceRequestUncheckedUpdateManyWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutServiceRequestsInput = {
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
    clientBranding?: ClientBrandingCreateNestedOneWithoutUserInput
    apiKeys?: ApiKeyCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutServiceRequestsInput = {
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
    clientBranding?: ClientBrandingUncheckedCreateNestedOneWithoutUserInput
    apiKeys?: ApiKeyUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutServiceRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutServiceRequestsInput, UserUncheckedCreateWithoutServiceRequestsInput>
  }

  export type UserUpsertWithoutServiceRequestsInput = {
    update: XOR<UserUpdateWithoutServiceRequestsInput, UserUncheckedUpdateWithoutServiceRequestsInput>
    create: XOR<UserCreateWithoutServiceRequestsInput, UserUncheckedCreateWithoutServiceRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutServiceRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutServiceRequestsInput, UserUncheckedUpdateWithoutServiceRequestsInput>
  }

  export type UserUpdateWithoutServiceRequestsInput = {
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
    clientBranding?: ClientBrandingUpdateOneWithoutUserNestedInput
    apiKeys?: ApiKeyUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutServiceRequestsInput = {
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
    clientBranding?: ClientBrandingUncheckedUpdateOneWithoutUserNestedInput
    apiKeys?: ApiKeyUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WorkflowCreateWithoutAutomationMetricsInput = {
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutWorkflowsInput
    workflowCredentials?: WorkflowCredentialCreateNestedManyWithoutWorkflowInput
    workflowRuns?: WorkflowRunCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowUncheckedCreateWithoutAutomationMetricsInput = {
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialUncheckedCreateNestedManyWithoutWorkflowInput
    workflowRuns?: WorkflowRunUncheckedCreateNestedManyWithoutWorkflowInput
  }

  export type WorkflowCreateOrConnectWithoutAutomationMetricsInput = {
    where: WorkflowWhereUniqueInput
    create: XOR<WorkflowCreateWithoutAutomationMetricsInput, WorkflowUncheckedCreateWithoutAutomationMetricsInput>
  }

  export type WorkflowUpsertWithoutAutomationMetricsInput = {
    update: XOR<WorkflowUpdateWithoutAutomationMetricsInput, WorkflowUncheckedUpdateWithoutAutomationMetricsInput>
    create: XOR<WorkflowCreateWithoutAutomationMetricsInput, WorkflowUncheckedCreateWithoutAutomationMetricsInput>
    where?: WorkflowWhereInput
  }

  export type WorkflowUpdateToOneWithWhereWithoutAutomationMetricsInput = {
    where?: WorkflowWhereInput
    data: XOR<WorkflowUpdateWithoutAutomationMetricsInput, WorkflowUncheckedUpdateWithoutAutomationMetricsInput>
  }

  export type WorkflowUpdateWithoutAutomationMetricsInput = {
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutWorkflowsNestedInput
    workflowCredentials?: WorkflowCredentialUpdateManyWithoutWorkflowNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutWorkflowNestedInput
  }

  export type WorkflowUncheckedUpdateWithoutAutomationMetricsInput = {
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialUncheckedUpdateManyWithoutWorkflowNestedInput
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutWorkflowNestedInput
  }

  export type UserCreateWithoutApiKeysInput = {
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
    clientBranding?: ClientBrandingCreateNestedOneWithoutUserInput
    serviceRequests?: ServiceRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutApiKeysInput = {
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
    clientBranding?: ClientBrandingUncheckedCreateNestedOneWithoutUserInput
    serviceRequests?: ServiceRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutApiKeysInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutApiKeysInput, UserUncheckedCreateWithoutApiKeysInput>
  }

  export type UserUpsertWithoutApiKeysInput = {
    update: XOR<UserUpdateWithoutApiKeysInput, UserUncheckedUpdateWithoutApiKeysInput>
    create: XOR<UserCreateWithoutApiKeysInput, UserUncheckedCreateWithoutApiKeysInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutApiKeysInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutApiKeysInput, UserUncheckedUpdateWithoutApiKeysInput>
  }

  export type UserUpdateWithoutApiKeysInput = {
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
    clientBranding?: ClientBrandingUpdateOneWithoutUserNestedInput
    serviceRequests?: ServiceRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutApiKeysInput = {
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
    clientBranding?: ClientBrandingUncheckedUpdateOneWithoutUserNestedInput
    serviceRequests?: ServiceRequestUncheckedUpdateManyWithoutUserNestedInput
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
  }

  export type CredentialCreateManyUserInput = {
    id?: string
    name: string
    type: $Enums.CredentialType
    provider: $Enums.Provider
    secret?: string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: Date | string | null
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
    version?: string | null
    workflowId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceRequestCreateManyUserInput = {
    id?: string
    title: string
    description: string
    businessProcess: string
    desiredOutcome: string
    priority?: $Enums.RequestPriority
    status?: $Enums.RequestStatus
    meetingScheduled?: boolean
    meetingUrl?: string | null
    meetingDate?: Date | string | null
    preferredMeetingDate?: string | null
    availabilityNotes?: string | null
    proposalSent?: boolean
    proposalAccepted?: boolean | null
    estimatedHours?: number | null
    quotedPrice?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ApiKeyCreateManyUserInput = {
    id?: string
    name: string
    key: string
    keyHash: string
    lastUsedAt?: Date | string | null
    expiresAt?: Date | string | null
    isActive?: boolean
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialUpdateManyWithoutWorkflowNestedInput
    workflowRuns?: WorkflowRunUpdateManyWithoutWorkflowNestedInput
    automationMetrics?: AutomationMetricsUpdateManyWithoutWorkflowNestedInput
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    workflowCredentials?: WorkflowCredentialUncheckedUpdateManyWithoutWorkflowNestedInput
    workflowRuns?: WorkflowRunUncheckedUpdateManyWithoutWorkflowNestedInput
    automationMetrics?: AutomationMetricsUncheckedUpdateManyWithoutWorkflowNestedInput
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
    requiredScopes?: NullableJsonNullValueInput | InputJsonValue
    version?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
  }

  export type CredentialUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    secret?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workflowCredentials?: WorkflowCredentialUpdateManyWithoutCredentialNestedInput
  }

  export type CredentialUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    secret?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workflowCredentials?: WorkflowCredentialUncheckedUpdateManyWithoutCredentialNestedInput
  }

  export type CredentialUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumCredentialTypeFieldUpdateOperationsInput | $Enums.CredentialType
    provider?: EnumProviderFieldUpdateOperationsInput | $Enums.Provider
    secret?: NullableStringFieldUpdateOperationsInput | string | null
    config?: NullableJsonNullValueInput | InputJsonValue
    expiresIn?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    version?: NullableStringFieldUpdateOperationsInput | string | null
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
    version?: NullableStringFieldUpdateOperationsInput | string | null
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
    version?: NullableStringFieldUpdateOperationsInput | string | null
    workflowId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRequestUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    businessProcess?: StringFieldUpdateOperationsInput | string
    desiredOutcome?: StringFieldUpdateOperationsInput | string
    priority?: EnumRequestPriorityFieldUpdateOperationsInput | $Enums.RequestPriority
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    meetingScheduled?: BoolFieldUpdateOperationsInput | boolean
    meetingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    meetingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferredMeetingDate?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    proposalSent?: BoolFieldUpdateOperationsInput | boolean
    proposalAccepted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    quotedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRequestUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    businessProcess?: StringFieldUpdateOperationsInput | string
    desiredOutcome?: StringFieldUpdateOperationsInput | string
    priority?: EnumRequestPriorityFieldUpdateOperationsInput | $Enums.RequestPriority
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    meetingScheduled?: BoolFieldUpdateOperationsInput | boolean
    meetingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    meetingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferredMeetingDate?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    proposalSent?: BoolFieldUpdateOperationsInput | boolean
    proposalAccepted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    quotedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRequestUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    businessProcess?: StringFieldUpdateOperationsInput | string
    desiredOutcome?: StringFieldUpdateOperationsInput | string
    priority?: EnumRequestPriorityFieldUpdateOperationsInput | $Enums.RequestPriority
    status?: EnumRequestStatusFieldUpdateOperationsInput | $Enums.RequestStatus
    meetingScheduled?: BoolFieldUpdateOperationsInput | boolean
    meetingUrl?: NullableStringFieldUpdateOperationsInput | string | null
    meetingDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    preferredMeetingDate?: NullableStringFieldUpdateOperationsInput | string | null
    availabilityNotes?: NullableStringFieldUpdateOperationsInput | string | null
    proposalSent?: BoolFieldUpdateOperationsInput | boolean
    proposalAccepted?: NullableBoolFieldUpdateOperationsInput | boolean | null
    estimatedHours?: NullableIntFieldUpdateOperationsInput | number | null
    quotedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ApiKeyUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    keyHash?: StringFieldUpdateOperationsInput | string
    lastUsedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
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
    version?: string | null
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AutomationMetricsCreateManyWorkflowInput = {
    id?: string
    date: Date | string
    runsCount?: number
    successCount?: number
    failureCount?: number
    avgDuration?: number | null
    timeSavedMinutes?: number | null
    errorsPrevented?: number | null
    costSavings?: Decimal | DecimalJsLike | number | string | null
    createdAt?: Date | string
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
    version?: NullableStringFieldUpdateOperationsInput | string | null
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
    version?: NullableStringFieldUpdateOperationsInput | string | null
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
    version?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationMetricsUpdateWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    runsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    avgDuration?: NullableIntFieldUpdateOperationsInput | number | null
    timeSavedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    errorsPrevented?: NullableIntFieldUpdateOperationsInput | number | null
    costSavings?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationMetricsUncheckedUpdateWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    runsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    avgDuration?: NullableIntFieldUpdateOperationsInput | number | null
    timeSavedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    errorsPrevented?: NullableIntFieldUpdateOperationsInput | number | null
    costSavings?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AutomationMetricsUncheckedUpdateManyWithoutWorkflowInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    runsCount?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failureCount?: IntFieldUpdateOperationsInput | number
    avgDuration?: NullableIntFieldUpdateOperationsInput | number | null
    timeSavedMinutes?: NullableIntFieldUpdateOperationsInput | number | null
    errorsPrevented?: NullableIntFieldUpdateOperationsInput | number | null
    costSavings?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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