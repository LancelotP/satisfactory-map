export type Maybe<T> = T | undefined;

export interface DepositCreateInput {
  lat?: Maybe<number>;

  lng?: Maybe<number>;

  type?: Maybe<DepositType>;

  quality?: Maybe<DepositQuality>;
}

export enum DepositQuality {
  Impure = "IMPURE",
  Normal = "NORMAL",
  Pure = "PURE"
}

export enum DepositType {
  Iron = "IRON",
  Copper = "COPPER",
  Limestone = "LIMESTONE",
  Coal = "COAL",
  Oil = "OIL",
  Sulphur = "SULPHUR",
  Caterium = "CATERIUM",
  Sam = "SAM",
  Quartz = "QUARTZ",
  Beauxite = "BEAUXITE",
  Uranium = "URANIUM"
}

export enum OrderDirection {
  Asc = "ASC",
  Desc = "DESC"
}

/** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
export type DateTime = Date;

/** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */

/** A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
export type Time = Date;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Interfaces
// ====================================================

export interface Node {
  id: string;
}

export interface Connection {
  pageInfo: PageInfo;

  totalCount: number;
}

export interface Edge {
  cursor: string;
}

export interface IMarker {
  id: string;

  map: Map;

  lat: number;

  lng: number;

  createdAt: Date;

  updatedAt: Date;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  _empty?: Maybe<string>;

  item: Item;

  defaultMap: Map;

  viewer?: Maybe<User>;
}

export interface Item extends Node {
  id: string;

  name: string;
}

export interface Map extends Node {
  id: string;

  markers: MapMarkerConnection;
}

export interface MapMarkerConnection extends Connection {
  pageInfo: PageInfo;

  totalCount: number;

  edges: MapMarkerEdge[];
}

export interface PageInfo {
  endCursor?: Maybe<string>;

  hasNextPage: boolean;

  hasPreviousPage: boolean;

  startCursor?: Maybe<string>;
}

export interface MapMarkerEdge extends Edge {
  cursor: string;

  node: Marker;
}

export interface Deposit extends IMarker {
  id: string;

  map: Map;

  lat: number;

  lng: number;

  createdAt: Date;

  updatedAt: Date;

  quality: DepositQuality;

  type: DepositType;
}

export interface User extends Node {
  id: string;

  createdAt?: Maybe<Date>;
}

export interface Mutation {
  _empty?: Maybe<string>;

  depositCreate: Deposit;
}

export interface Subscription {
  _empty?: Maybe<string>;
}

// ====================================================
// Arguments
// ====================================================

export interface ItemQueryArgs {
  itemId: string;
}
export interface DepositCreateMutationArgs {
  input: DepositCreateInput;
}

// ====================================================
// Unions
// ====================================================

export type Marker = Deposit;

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

import { Deposit } from "./deposit/deposit.model";

import { Item } from "./item/item.model";

import { Map } from "./map/map.model";

import { User } from "./user/user.model";

export type Resolver<Result, Parent = {}, TContext = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, TContext, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: TContext,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  TContext = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, TContext, Args>)
  | ISubscriptionResolverObject<Result, Parent, TContext, Args>;

export type TypeResolveFn<Types, Parent = {}, TContext = {}> = (
  parent: Parent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface QueryResolvers<TContext = {}, TypeParent = {}> {
  _empty?: Query_EmptyResolver<Maybe<string>, TypeParent, TContext>;

  item?: QueryItemResolver<Item, TypeParent, TContext>;

  defaultMap?: QueryDefaultMapResolver<Map, TypeParent, TContext>;

  viewer?: QueryViewerResolver<Maybe<User>, TypeParent, TContext>;
}

export type Query_EmptyResolver<
  R = Maybe<string>,
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type QueryItemResolver<R = Item, Parent = {}, TContext = {}> = Resolver<
  R,
  Parent,
  TContext,
  QueryItemArgs
>;
export interface QueryItemArgs {
  itemId: string;
}

export type QueryDefaultMapResolver<
  R = Map,
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type QueryViewerResolver<
  R = Maybe<User>,
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext>;

export interface ItemResolvers<TContext = {}, TypeParent = Item> {
  id?: ItemIdResolver<string, TypeParent, TContext>;

  name?: ItemNameResolver<string, TypeParent, TContext>;
}

export type ItemIdResolver<R = string, Parent = Item, TContext = {}> = Resolver<
  R,
  Parent,
  TContext
>;
export type ItemNameResolver<
  R = string,
  Parent = Item,
  TContext = {}
> = Resolver<R, Parent, TContext>;

export interface MapResolvers<TContext = {}, TypeParent = Map> {
  id?: MapIdResolver<string, TypeParent, TContext>;

  markers?: MapMarkersResolver<MapMarkerConnection, TypeParent, TContext>;
}

export type MapIdResolver<R = string, Parent = Map, TContext = {}> = Resolver<
  R,
  Parent,
  TContext
>;
export type MapMarkersResolver<
  R = MapMarkerConnection,
  Parent = Map,
  TContext = {}
> = Resolver<R, Parent, TContext>;

export interface MapMarkerConnectionResolvers<
  TContext = {},
  TypeParent = MapMarkerConnection
> {
  pageInfo?: MapMarkerConnectionPageInfoResolver<
    PageInfo,
    TypeParent,
    TContext
  >;

  totalCount?: MapMarkerConnectionTotalCountResolver<
    number,
    TypeParent,
    TContext
  >;

  edges?: MapMarkerConnectionEdgesResolver<
    MapMarkerEdge[],
    TypeParent,
    TContext
  >;
}

export type MapMarkerConnectionPageInfoResolver<
  R = PageInfo,
  Parent = MapMarkerConnection,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type MapMarkerConnectionTotalCountResolver<
  R = number,
  Parent = MapMarkerConnection,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type MapMarkerConnectionEdgesResolver<
  R = MapMarkerEdge[],
  Parent = MapMarkerConnection,
  TContext = {}
> = Resolver<R, Parent, TContext>;

export interface PageInfoResolvers<TContext = {}, TypeParent = PageInfo> {
  endCursor?: PageInfoEndCursorResolver<Maybe<string>, TypeParent, TContext>;

  hasNextPage?: PageInfoHasNextPageResolver<boolean, TypeParent, TContext>;

  hasPreviousPage?: PageInfoHasPreviousPageResolver<
    boolean,
    TypeParent,
    TContext
  >;

  startCursor?: PageInfoStartCursorResolver<
    Maybe<string>,
    TypeParent,
    TContext
  >;
}

export type PageInfoEndCursorResolver<
  R = Maybe<string>,
  Parent = PageInfo,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type PageInfoHasNextPageResolver<
  R = boolean,
  Parent = PageInfo,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type PageInfoHasPreviousPageResolver<
  R = boolean,
  Parent = PageInfo,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type PageInfoStartCursorResolver<
  R = Maybe<string>,
  Parent = PageInfo,
  TContext = {}
> = Resolver<R, Parent, TContext>;

export interface MapMarkerEdgeResolvers<
  TContext = {},
  TypeParent = MapMarkerEdge
> {
  cursor?: MapMarkerEdgeCursorResolver<string, TypeParent, TContext>;

  node?: MapMarkerEdgeNodeResolver<Marker, TypeParent, TContext>;
}

export type MapMarkerEdgeCursorResolver<
  R = string,
  Parent = MapMarkerEdge,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type MapMarkerEdgeNodeResolver<
  R = Marker,
  Parent = MapMarkerEdge,
  TContext = {}
> = Resolver<R, Parent, TContext>;

export interface DepositResolvers<TContext = {}, TypeParent = Deposit> {
  id?: DepositIdResolver<string, TypeParent, TContext>;

  map?: DepositMapResolver<Map, TypeParent, TContext>;

  lat?: DepositLatResolver<number, TypeParent, TContext>;

  lng?: DepositLngResolver<number, TypeParent, TContext>;

  createdAt?: DepositCreatedAtResolver<Date, TypeParent, TContext>;

  updatedAt?: DepositUpdatedAtResolver<Date, TypeParent, TContext>;

  quality?: DepositQualityResolver<DepositQuality, TypeParent, TContext>;

  type?: DepositTypeResolver<DepositType, TypeParent, TContext>;
}

export type DepositIdResolver<
  R = string,
  Parent = Deposit,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type DepositMapResolver<
  R = Map,
  Parent = Deposit,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type DepositLatResolver<
  R = number,
  Parent = Deposit,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type DepositLngResolver<
  R = number,
  Parent = Deposit,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type DepositCreatedAtResolver<
  R = Date,
  Parent = Deposit,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type DepositUpdatedAtResolver<
  R = Date,
  Parent = Deposit,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type DepositQualityResolver<
  R = DepositQuality,
  Parent = Deposit,
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type DepositTypeResolver<
  R = DepositType,
  Parent = Deposit,
  TContext = {}
> = Resolver<R, Parent, TContext>;

export interface UserResolvers<TContext = {}, TypeParent = User> {
  id?: UserIdResolver<string, TypeParent, TContext>;

  createdAt?: UserCreatedAtResolver<Maybe<Date>, TypeParent, TContext>;
}

export type UserIdResolver<R = string, Parent = User, TContext = {}> = Resolver<
  R,
  Parent,
  TContext
>;
export type UserCreatedAtResolver<
  R = Maybe<Date>,
  Parent = User,
  TContext = {}
> = Resolver<R, Parent, TContext>;

export interface MutationResolvers<TContext = {}, TypeParent = {}> {
  _empty?: Mutation_EmptyResolver<Maybe<string>, TypeParent, TContext>;

  depositCreate?: MutationDepositCreateResolver<Deposit, TypeParent, TContext>;
}

export type Mutation_EmptyResolver<
  R = Maybe<string>,
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext>;
export type MutationDepositCreateResolver<
  R = Deposit,
  Parent = {},
  TContext = {}
> = Resolver<R, Parent, TContext, MutationDepositCreateArgs>;
export interface MutationDepositCreateArgs {
  input: DepositCreateInput;
}

export interface SubscriptionResolvers<TContext = {}, TypeParent = {}> {
  _empty?: Subscription_EmptyResolver<Maybe<string>, TypeParent, TContext>;
}

export type Subscription_EmptyResolver<
  R = Maybe<string>,
  Parent = {},
  TContext = {}
> = SubscriptionResolver<R, Parent, TContext>;

export interface NodeResolvers {
  __resolveType: NodeResolveType;
}
export type NodeResolveType<
  R = "Item" | "Map" | "User",
  Parent = Item | Map | User,
  TContext = {}
> = TypeResolveFn<R, Parent, TContext>;

export interface ConnectionResolvers {
  __resolveType: ConnectionResolveType;
}
export type ConnectionResolveType<
  R = "MapMarkerConnection",
  Parent = MapMarkerConnection,
  TContext = {}
> = TypeResolveFn<R, Parent, TContext>;

export interface EdgeResolvers {
  __resolveType: EdgeResolveType;
}
export type EdgeResolveType<
  R = "MapMarkerEdge",
  Parent = MapMarkerEdge,
  TContext = {}
> = TypeResolveFn<R, Parent, TContext>;

export interface IMarkerResolvers {
  __resolveType: IMarkerResolveType;
}
export type IMarkerResolveType<
  R = "Deposit",
  Parent = Deposit,
  TContext = {}
> = TypeResolveFn<R, Parent, TContext>;

export interface MarkerResolvers {
  __resolveType: MarkerResolveType;
}
export type MarkerResolveType<
  R = "Deposit",
  Parent = Deposit,
  TContext = {}
> = TypeResolveFn<R, Parent, TContext>;

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<DateTime, any> {
  name: "DateTime";
}
export interface DateScalarConfig extends GraphQLScalarTypeConfig<Date, any> {
  name: "Date";
}
export interface TimeScalarConfig extends GraphQLScalarTypeConfig<Time, any> {
  name: "Time";
}

export interface IResolvers<TContext = {}> {
  Query?: QueryResolvers<TContext>;
  Item?: ItemResolvers<TContext>;
  Map?: MapResolvers<TContext>;
  MapMarkerConnection?: MapMarkerConnectionResolvers<TContext>;
  PageInfo?: PageInfoResolvers<TContext>;
  MapMarkerEdge?: MapMarkerEdgeResolvers<TContext>;
  Deposit?: DepositResolvers<TContext>;
  User?: UserResolvers<TContext>;
  Mutation?: MutationResolvers<TContext>;
  Subscription?: SubscriptionResolvers<TContext>;
  Node?: NodeResolvers;
  Connection?: ConnectionResolvers;
  Edge?: EdgeResolvers;
  IMarker?: IMarkerResolvers;
  Marker?: MarkerResolvers;
  DateTime?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  Time?: GraphQLScalarType;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
