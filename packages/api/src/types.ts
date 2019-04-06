export type Maybe<T> = T | undefined;

export enum ResourceNodeQuality {
  Impure = "IMPURE",
  Normal = "NORMAL",
  Pure = "PURE",
  Unknown = "UNKNOWN"
}

export enum ResourceNodeType {
  Iron = "IRON",
  Copper = "COPPER",
  Limestone = "LIMESTONE",
  Bauxite = "BAUXITE",
  Uranium = "URANIUM",
  Coal = "COAL",
  Oil = "OIL",
  Sulfur = "SULFUR",
  Quartz = "QUARTZ",
  Sam = "SAM",
  Caterium = "CATERIUM",
  Geyser = "GEYSER",
  Unknown = "UNKNOWN"
}

export enum SlugType {
  Purple = "PURPLE",
  Yellow = "YELLOW",
  Green = "GREEN"
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

export interface Connection {
  pageInfo: PageInfo;

  totalCount: number;
}

export interface Edge {
  cursor: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  markersConnection: MarkersConnection;

  viewer?: Maybe<User>;
}

export interface MarkersConnection extends Connection {
  totalCount: number;

  pageInfo: PageInfo;

  edges: MarkersConnectionEdge[];
}

export interface PageInfo {
  endCursor?: Maybe<string>;

  hasNextPage: boolean;

  hasPreviousPage: boolean;

  startCursor?: Maybe<string>;
}

export interface MarkersConnectionEdge extends Edge {
  cursor: string;

  node: Marker;
}

export interface Marker {
  id: string;

  lat: number;

  lng: number;

  alt?: Maybe<number>;

  target: MarkerTarget;

  obstructed: boolean;

  information?: Maybe<string>;

  createdAt: Date;

  updatedAt: Date;
}

export interface ResourceNode {
  id: string;

  quality: ResourceNodeQuality;

  type: ResourceNodeType;
}

export interface Slug {
  id: string;

  type: SlugType;
}

export interface DropPod {
  id: string;

  requirement?: Maybe<DropPodRequirement>;
}

export interface DropPodRequirement {
  itemName?: Maybe<string>;

  itemQuantity?: Maybe<number>;

  powerNeeded?: Maybe<number>;
}

export interface User {
  id: string;

  userName?: Maybe<string>;

  createdAt: Date;

  updatedAt: Date;
}

// ====================================================
// Arguments
// ====================================================

export interface MarkersConnectionQueryArgs {
  first?: Maybe<number>;

  last?: Maybe<number>;

  before?: Maybe<string>;

  after?: Maybe<string>;
}

// ====================================================
// Unions
// ====================================================

export type MarkerTarget = ResourceNode | Slug | DropPod;

import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig
} from "graphql";

import { DropPod } from "./dropPod/dropPod.model";

import { Marker } from "./marker/marker.model";

import { Slug } from "./slug/slug.model";

import { ResourceNode } from "./resourceNode/resourceNode.model";

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
  markersConnection?: QueryMarkersConnectionResolver<
    MarkersConnection,
    TypeParent,
    TContext
  >;

  viewer?: QueryViewerResolver<Maybe<User>, TypeParent, TContext>;
}

export type QueryMarkersConnectionResolver<
  R = MarkersConnection,
  Parent = {},
  TContext = GQLContext
> = Resolver<R, Parent, TContext, QueryMarkersConnectionArgs>;
export interface QueryMarkersConnectionArgs {
  first?: Maybe<number>;

  last?: Maybe<number>;

  before?: Maybe<string>;

  after?: Maybe<string>;
}

export type QueryViewerResolver<
  R = Maybe<User>,
  Parent = {},
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;

export interface MarkersConnectionResolvers<
  TContext = GQLContext,
  TypeParent = MarkersConnection
> {
  totalCount?: MarkersConnectionTotalCountResolver<
    number,
    TypeParent,
    TContext
  >;

  pageInfo?: MarkersConnectionPageInfoResolver<PageInfo, TypeParent, TContext>;

  edges?: MarkersConnectionEdgesResolver<
    MarkersConnectionEdge[],
    TypeParent,
    TContext
  >;
}

export type MarkersConnectionTotalCountResolver<
  R = number,
  Parent = MarkersConnection,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MarkersConnectionPageInfoResolver<
  R = PageInfo,
  Parent = MarkersConnection,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MarkersConnectionEdgesResolver<
  R = MarkersConnectionEdge[],
  Parent = MarkersConnection,
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

export interface MarkersConnectionEdgeResolvers<
  TContext = GQLContext,
  TypeParent = MarkersConnectionEdge
> {
  cursor?: MarkersConnectionEdgeCursorResolver<string, TypeParent, TContext>;

  node?: MarkersConnectionEdgeNodeResolver<Marker, TypeParent, TContext>;
}

export type MarkersConnectionEdgeCursorResolver<
  R = string,
  Parent = MarkersConnectionEdge,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MarkersConnectionEdgeNodeResolver<
  R = Marker,
  Parent = MarkersConnectionEdge,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;

export interface MarkerResolvers<TContext = GQLContext, TypeParent = Marker> {
  id?: MarkerIdResolver<string, TypeParent, TContext>;

  lat?: MarkerLatResolver<number, TypeParent, TContext>;

  lng?: MarkerLngResolver<number, TypeParent, TContext>;

  alt?: MarkerAltResolver<Maybe<number>, TypeParent, TContext>;

  target?: MarkerTargetResolver<MarkerTarget, TypeParent, TContext>;

  obstructed?: MarkerObstructedResolver<boolean, TypeParent, TContext>;

  information?: MarkerInformationResolver<Maybe<string>, TypeParent, TContext>;

  createdAt?: MarkerCreatedAtResolver<Date, TypeParent, TContext>;

  updatedAt?: MarkerUpdatedAtResolver<Date, TypeParent, TContext>;
}

export type MarkerIdResolver<
  R = string,
  Parent = Marker,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MarkerLatResolver<
  R = number,
  Parent = Marker,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MarkerLngResolver<
  R = number,
  Parent = Marker,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MarkerAltResolver<
  R = Maybe<number>,
  Parent = Marker,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MarkerTargetResolver<
  R = MarkerTarget,
  Parent = Marker,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MarkerObstructedResolver<
  R = boolean,
  Parent = Marker,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MarkerInformationResolver<
  R = Maybe<string>,
  Parent = Marker,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MarkerCreatedAtResolver<
  R = Date,
  Parent = Marker,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type MarkerUpdatedAtResolver<
  R = Date,
  Parent = Marker,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;

export interface ResourceNodeResolvers<
  TContext = GQLContext,
  TypeParent = ResourceNode
> {
  id?: ResourceNodeIdResolver<string, TypeParent, TContext>;

  quality?: ResourceNodeQualityResolver<
    ResourceNodeQuality,
    TypeParent,
    TContext
  >;

  type?: ResourceNodeTypeResolver<ResourceNodeType, TypeParent, TContext>;
}

export type ResourceNodeIdResolver<
  R = string,
  Parent = ResourceNode,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type ResourceNodeQualityResolver<
  R = ResourceNodeQuality,
  Parent = ResourceNode,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type ResourceNodeTypeResolver<
  R = ResourceNodeType,
  Parent = ResourceNode,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;

export interface SlugResolvers<TContext = GQLContext, TypeParent = Slug> {
  id?: SlugIdResolver<string, TypeParent, TContext>;

  type?: SlugTypeResolver<SlugType, TypeParent, TContext>;
}

export type SlugIdResolver<
  R = string,
  Parent = Slug,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type SlugTypeResolver<
  R = SlugType,
  Parent = Slug,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;

export interface DropPodResolvers<TContext = GQLContext, TypeParent = DropPod> {
  id?: DropPodIdResolver<string, TypeParent, TContext>;

  requirement?: DropPodRequirementResolver<
    Maybe<DropPodRequirement>,
    TypeParent,
    TContext
  >;
}

export type DropPodIdResolver<
  R = string,
  Parent = DropPod,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DropPodRequirementResolver<
  R = Maybe<DropPodRequirement>,
  Parent = DropPod,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;

export interface DropPodRequirementResolvers<
  TContext = GQLContext,
  TypeParent = DropPodRequirement
> {
  itemName?: DropPodRequirementItemNameResolver<
    Maybe<string>,
    TypeParent,
    TContext
  >;

  itemQuantity?: DropPodRequirementItemQuantityResolver<
    Maybe<number>,
    TypeParent,
    TContext
  >;

  powerNeeded?: DropPodRequirementPowerNeededResolver<
    Maybe<number>,
    TypeParent,
    TContext
  >;
}

export type DropPodRequirementItemNameResolver<
  R = Maybe<string>,
  Parent = DropPodRequirement,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DropPodRequirementItemQuantityResolver<
  R = Maybe<number>,
  Parent = DropPodRequirement,
  TContext = GQLContext
> = Resolver<R, Parent, TContext>;
export type DropPodRequirementPowerNeededResolver<
  R = Maybe<number>,
  Parent = DropPodRequirement,
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

export interface ConnectionResolvers {
  __resolveType: ConnectionResolveType;
}
export type ConnectionResolveType<
  R = "MarkersConnection",
  Parent = MarkersConnection,
  TContext = GQLContext
> = TypeResolveFn<R, Parent, TContext>;

export interface EdgeResolvers {
  __resolveType: EdgeResolveType;
}
export type EdgeResolveType<
  R = "MarkersConnectionEdge",
  Parent = MarkersConnectionEdge,
  TContext = GQLContext
> = TypeResolveFn<R, Parent, TContext>;

export interface MarkerTargetResolvers {
  __resolveType: MarkerTargetResolveType;
}
export type MarkerTargetResolveType<
  R = "ResourceNode" | "Slug" | "DropPod",
  Parent = ResourceNode | Slug | DropPod,
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
  MarkersConnection?: MarkersConnectionResolvers<TContext>;
  PageInfo?: PageInfoResolvers<TContext>;
  MarkersConnectionEdge?: MarkersConnectionEdgeResolvers<TContext>;
  Marker?: MarkerResolvers<TContext>;
  ResourceNode?: ResourceNodeResolvers<TContext>;
  Slug?: SlugResolvers<TContext>;
  DropPod?: DropPodResolvers<TContext>;
  DropPodRequirement?: DropPodRequirementResolvers<TContext>;
  User?: UserResolvers<TContext>;
  Connection?: ConnectionResolvers;
  Edge?: EdgeResolvers;
  MarkerTarget?: MarkerTargetResolvers;
  DateTime?: GraphQLScalarType;
  Date?: GraphQLScalarType;
  Time?: GraphQLScalarType;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
