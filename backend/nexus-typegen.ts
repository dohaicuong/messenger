/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./api/context/index"
import type { core, connectionPluginCore } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * Must and only use for input
     */
    relayId<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "RelayId";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * Must and only use for input
     */
    relayId<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "RelayId";
    /**
     * Adds a Relay-style connection to the type, with numerous options for configuration
     *
     * @see https://nexusjs.org/docs/plugins/connection
     */
    connectionField<FieldName extends string>(
      fieldName: FieldName,
      config: connectionPluginCore.ConnectionFieldConfig<TypeName, FieldName>
    ): void
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  UserLoginInput: { // input type
    email: string; // String!
    password: string; // String!
  }
  UserSignupInput: { // input type
    avatar?: string | null; // String
    email: string; // String!
    firstName: string; // String!
    lastName: string; // String!
    password: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  RelayId: any
}

export interface NexusGenObjects {
  Mutation: {};
  Query: {};
  User: { // root type
    avatar?: string | null; // String
    email: string; // String!
    firstName: string; // String!
    lastName: string; // String!
  }
  UserLoginPayload: { // root type
    jwt: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  UserSignupPayload: { // root type
    jwt: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
}

export interface NexusGenInterfaces {
  Node: NexusGenRootTypes['User'];
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    login: NexusGenRootTypes['UserLoginPayload']; // UserLoginPayload!
    signup: NexusGenRootTypes['UserSignupPayload']; // UserSignupPayload!
  }
  Query: { // field return type
    node: NexusGenRootTypes['Node'] | null; // Node
  }
  User: { // field return type
    avatar: string | null; // String
    email: string; // String!
    firstName: string; // String!
    id: string; // ID!
    lastName: string; // String!
  }
  UserLoginPayload: { // field return type
    jwt: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  UserSignupPayload: { // field return type
    jwt: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Node: { // field return type
    id: string; // ID!
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    login: 'UserLoginPayload'
    signup: 'UserSignupPayload'
  }
  Query: { // field return type name
    node: 'Node'
  }
  User: { // field return type name
    avatar: 'String'
    email: 'String'
    firstName: 'String'
    id: 'ID'
    lastName: 'String'
  }
  UserLoginPayload: { // field return type name
    jwt: 'String'
    user: 'User'
  }
  UserSignupPayload: { // field return type name
    jwt: 'String'
    user: 'User'
  }
  Node: { // field return type name
    id: 'ID'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    login: { // args
      input: NexusGenInputs['UserLoginInput']; // UserLoginInput!
    }
    signup: { // args
      input: NexusGenInputs['UserSignupInput']; // UserSignupInput!
    }
  }
  Query: {
    node: { // args
      id: string; // ID!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  Node: "User"
}

export interface NexusGenTypeInterfaces {
  User: "Node"
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = "Node";

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}