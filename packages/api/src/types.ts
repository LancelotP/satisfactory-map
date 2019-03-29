export type Maybe<T> = T | undefined;

export interface MarkerCreateInput {
  type: MarkerType;

  lat: number;

  lng: number;

  deposit?: Maybe<MarkerCreateDepositInput>;

  slug?: Maybe<MarkerCreateSlugInput>;
}

export interface MarkerCreateDepositInput {
  type: DepositType;

  quality: DepositQuality;
}

export interface MarkerCreateSlugInput {
  type: SlugType;
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
  Bauxite = "BAUXITE",
  Uranium = "URANIUM",
  Geyser = "GEYSER"
}

export enum SlugType {
  Green = "GREEN",
  Yellow = "YELLOW",
  Purple = "PURPLE"
}

export enum MarkerType {
  Deposit = "DEPOSIT",
  Slug = "SLUG",
  DropPod = "DROP_POD"
}

export enum OrderDirection {
  Asc = "ASC",
  Desc = "DESC"
}

export type DateTime = Date;

export type Time = Date;

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Interfaces
// ====================================================

export interface Node {
  id: string;

  createdAt: Date;

  updatedAt: Date;
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
  item: Item;

  defaultMap: Map;

  viewer?: Maybe<User>;
}

export interface Item extends Node {
  id: string;

  createdAt: Date;

  updatedAt: Date;

  name: string;
}

export interface Map extends Node {
  id: string;

  createdAt: Date;

  updatedAt: Date;

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

  addedBy?: Maybe<User>;
}

export interface User extends Node {
  id: string;

  userName?: Maybe<string>;

  createdAt: Date;

  updatedAt: Date;
}

export interface Slug extends IMarker {
  id: string;

  map: Map;

  lat: number;

  lng: number;

  createdAt: Date;

  updatedAt: Date;

  type: SlugType;

  addedBy?: Maybe<User>;
}

export interface DropPod extends IMarker {
  id: string;

  map: Map;

  lat: number;

  lng: number;

  createdAt: Date;

  updatedAt: Date;

  addedBy?: Maybe<User>;
}

export interface Mutation {
  markerCreate: Marker;
}

// ====================================================
// Arguments
// ====================================================

export interface ItemQueryArgs {
  itemId: string;
}
export interface MarkerCreateMutationArgs {
  input: MarkerCreateInput;
}

// ====================================================
// Unions
// ====================================================

export type Marker = Deposit | Slug | DropPod;

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

import { Deposit } from "./deposit/deposit.model";

import { DropPod } from "./dropPod/dropPod.model";

import { Item } from "./item/item.model";

import { Map } from "./map/map.model";

import { Slug } from "./slug/slug.model";

import { User } from "./user/user.model";

import { GQLContext } from "./apollo";

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

export interface QueryResolvers<TContext = GQLContext, TypeParent = {}> {
  item?: QueryItemResolver<Item, TypeParent, TContext>;

  defaultMap?: QueryDefaultMapResolver<Map, TypeParent, TContext>;

  viewer?: QueryViewerResolver<Maybe<User>, TypeParent, TContext>;
}

export type QueryItemResolver<
  R = Item,
  Parent = {},
  TContext = GQLContext
> = Resolver<R, Parent, TContext, QueryItemArgs>;
export interface QueryItemArgs {
  itemId: string;
}

export type QueryDefaultMapResolver<
  R = Map,
  Parent = {},
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type QueryViewerResolver<
  R = Maybe<User>,
  Parent = {},
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;

export interface ItemResolvers<TContext = GQLContext, TypeParent = Item> {
  id?: ItemIdResolver<string, TypeParent, TContext>;

  createdAt?: ItemCreatedAtResolver<Date, TypeParent, TContext>;

  updatedAt?: ItemUpdatedAtResolver<Date, TypeParent, TContext>;

  name?: ItemNameResolver<string, TypeParent, TContext>;
}

export type ItemIdResolver<
  R = string,
  Parent = Item,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type ItemCreatedAtResolver<
  R = Date,
  Parent = Item,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type ItemUpdatedAtResolver<
  R = Date,
  Parent = Item,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type ItemNameResolver<
  R = string,
  Parent = Item,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;

export interface MapResolvers<TContext = GQLContext, TypeParent = Map> {
  id?: MapIdResolver<string, TypeParent, TContext>;

  createdAt?: MapCreatedAtResolver<Date, TypeParent, TContext>;

  updatedAt?: MapUpdatedAtResolver<Date, TypeParent, TContext>;

  markers?: MapMarkersResolver<MapMarkerConnection, TypeParent, TContext>;
}

export type MapIdResolver<
  R = string,
  Parent = Map,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MapCreatedAtResolver<
  R = Date,
  Parent = Map,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MapUpdatedAtResolver<
  R = Date,
  Parent = Map,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MapMarkersResolver<
  R = MapMarkerConnection,
  Parent = Map,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;

export interface MapMarkerConnectionResolvers<
  TContext = GQLContext,
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
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MapMarkerConnectionTotalCountResolver<
  R = number,
  Parent = MapMarkerConnection,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MapMarkerConnectionEdgesResolver<
  R = MapMarkerEdge[],
  Parent = MapMarkerConnection,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;

export interface PageInfoResolvers<
  TContext = GQLContext,
  TypeParent = PageInfo
> {
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
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type PageInfoHasNextPageResolver<
  R = boolean,
  Parent = PageInfo,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type PageInfoHasPreviousPageResolver<
  R = boolean,
  Parent = PageInfo,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type PageInfoStartCursorResolver<
  R = Maybe<string>,
  Parent = PageInfo,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;

export interface MapMarkerEdgeResolvers<
  TContext = GQLContext,
  TypeParent = MapMarkerEdge
> {
  cursor?: MapMarkerEdgeCursorResolver<string, TypeParent, TContext>;

  node?: MapMarkerEdgeNodeResolver<Marker, TypeParent, TContext>;
}

export type MapMarkerEdgeCursorResolver<
  R = string,
  Parent = MapMarkerEdge,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MapMarkerEdgeNodeResolver<
  R = Marker,
  Parent = MapMarkerEdge,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;

export interface DepositResolvers<TContext = GQLContext, TypeParent = Deposit> {
  id?: DepositIdResolver<string, TypeParent, TContext>;

  map?: DepositMapResolver<Map, TypeParent, TContext>;

  lat?: DepositLatResolver<number, TypeParent, TContext>;

  lng?: DepositLngResolver<number, TypeParent, TContext>;

  createdAt?: DepositCreatedAtResolver<Date, TypeParent, TContext>;

  updatedAt?: DepositUpdatedAtResolver<Date, TypeParent, TContext>;

  quality?: DepositQualityResolver<DepositQuality, TypeParent, TContext>;

  type?: DepositTypeResolver<DepositType, TypeParent, TContext>;

  addedBy?: DepositAddedByResolver<Maybe<User>, TypeParent, TContext>;
}

export type DepositIdResolver<
  R = string,
  Parent = Deposit,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DepositMapResolver<
  R = Map,
  Parent = Deposit,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DepositLatResolver<
  R = number,
  Parent = Deposit,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DepositLngResolver<
  R = number,
  Parent = Deposit,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DepositCreatedAtResolver<
  R = Date,
  Parent = Deposit,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DepositUpdatedAtResolver<
  R = Date,
  Parent = Deposit,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DepositQualityResolver<
  R = DepositQuality,
  Parent = Deposit,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DepositTypeResolver<
  R = DepositType,
  Parent = Deposit,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DepositAddedByResolver<
  R = Maybe<User>,
  Parent = Deposit,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;

export interface UserResolvers<TContext = GQLContext, TypeParent = User> {
  id?: UserIdResolver<string, TypeParent, TContext>;

  userName?: UserUserNameResolver<Maybe<string>, TypeParent, TContext>;

  createdAt?: UserCreatedAtResolver<Date, TypeParent, TContext>;

  updatedAt?: UserUpdatedAtResolver<Date, TypeParent, TContext>;
}

export type UserIdResolver<
  R = string,
  Parent = User,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type UserUserNameResolver<
  R = Maybe<string>,
  Parent = User,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type UserCreatedAtResolver<
  R = Date,
  Parent = User,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type UserUpdatedAtResolver<
  R = Date,
  Parent = User,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;

export interface SlugResolvers<TContext = GQLContext, TypeParent = Slug> {
  id?: SlugIdResolver<string, TypeParent, TContext>;

  map?: SlugMapResolver<Map, TypeParent, TContext>;

  lat?: SlugLatResolver<number, TypeParent, TContext>;

  lng?: SlugLngResolver<number, TypeParent, TContext>;

  createdAt?: SlugCreatedAtResolver<Date, TypeParent, TContext>;

  updatedAt?: SlugUpdatedAtResolver<Date, TypeParent, TContext>;

  type?: SlugTypeResolver<SlugType, TypeParent, TContext>;

  addedBy?: SlugAddedByResolver<Maybe<User>, TypeParent, TContext>;
}

export type SlugIdResolver<
  R = string,
  Parent = Slug,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type SlugMapResolver<
  R = Map,
  Parent = Slug,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type SlugLatResolver<
  R = number,
  Parent = Slug,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type SlugLngResolver<
  R = number,
  Parent = Slug,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type SlugCreatedAtResolver<
  R = Date,
  Parent = Slug,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type SlugUpdatedAtResolver<
  R = Date,
  Parent = Slug,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type SlugTypeResolver<
  R = SlugType,
  Parent = Slug,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type SlugAddedByResolver<
  R = Maybe<User>,
  Parent = Slug,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;

export interface DropPodResolvers<TContext = GQLContext, TypeParent = DropPod> {
  id?: DropPodIdResolver<string, TypeParent, TContext>;

  map?: DropPodMapResolver<Map, TypeParent, TContext>;

  lat?: DropPodLatResolver<number, TypeParent, TContext>;

  lng?: DropPodLngResolver<number, TypeParent, TContext>;

  createdAt?: DropPodCreatedAtResolver<Date, TypeParent, TContext>;

  updatedAt?: DropPodUpdatedAtResolver<Date, TypeParent, TContext>;

  addedBy?: DropPodAddedByResolver<Maybe<User>, TypeParent, TContext>;
}

export type DropPodIdResolver<
  R = string,
  Parent = DropPod,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DropPodMapResolver<
  R = Map,
  Parent = DropPod,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DropPodLatResolver<
  R = number,
  Parent = DropPod,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DropPodLngResolver<
  R = number,
  Parent = DropPod,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DropPodCreatedAtResolver<
  R = Date,
  Parent = DropPod,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DropPodUpdatedAtResolver<
  R = Date,
  Parent = DropPod,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DropPodAddedByResolver<
  R = Maybe<User>,
  Parent = DropPod,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;

export interface MutationResolvers<TContext = GQLContext, TypeParent = {}> {
  markerCreate?: MutationMarkerCreateResolver<Marker, TypeParent, TContext>;
}

export type MutationMarkerCreateResolver<
  R = Marker,
  Parent = {},
  TContext = GQLContext
> = Resolver<R, Parent, TContext, MutationMarkerCreateArgs>;
export interface MutationMarkerCreateArgs {
  input: MarkerCreateInput;
}

export interface NodeResolvers {
  __resolveType: NodeResolveType;
}
export type NodeResolveType<
  R = "Item" | "Map" | "User",
  Parent = Item | Map | User,
  TContext = GQLContext
> = TypeResolveFn<R, Parent, TContext>;

export interface ConnectionResolvers {
  __resolveType: ConnectionResolveType;
}
export type ConnectionResolveType<
  R = "MapMarkerConnection",
  Parent = MapMarkerConnection,
  TContext = GQLContext
> = TypeResolveFn<R, Parent, TContext>;

export interface EdgeResolvers {
  __resolveType: EdgeResolveType;
}
export type EdgeResolveType<
  R = "MapMarkerEdge",
  Parent = MapMarkerEdge,
  TContext = GQLContext
> = TypeResolveFn<R, Parent, TContext>;

export interface IMarkerResolvers {
  __resolveType: IMarkerResolveType;
}
export type IMarkerResolveType<
  R = "Deposit" | "Slug" | "DropPod",
  Parent = Deposit | Slug | DropPod,
  TContext = GQLContext
> = TypeResolveFn<R, Parent, TContext>;

export interface MarkerResolvers {
  __resolveType: MarkerResolveType;
}
export type MarkerResolveType<
  R = "Deposit" | "Slug" | "DropPod",
  Parent = Deposit | Slug | DropPod,
  TContext = GQLContext
> = TypeResolveFn<R, Parent, TContext>;

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  GQLContext
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  GQLContext
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  GQLContext
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

export interface IResolvers<TContext = GQLContext> {
  Query?: QueryResolvers<TContext>;
  Item?: ItemResolvers<TContext>;
  Map?: MapResolvers<TContext>;
  MapMarkerConnection?: MapMarkerConnectionResolvers<TContext>;
  PageInfo?: PageInfoResolvers<TContext>;
  MapMarkerEdge?: MapMarkerEdgeResolvers<TContext>;
  Deposit?: DepositResolvers<TContext>;
  User?: UserResolvers<TContext>;
  Slug?: SlugResolvers<TContext>;
  DropPod?: DropPodResolvers<TContext>;
  Mutation?: MutationResolvers<TContext>;
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
