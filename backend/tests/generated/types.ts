export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Must and only use for input */
  RelayId: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserLoginPayload;
  signup: UserSignupPayload;
};


export type MutationLoginArgs = {
  input: UserLoginInput;
};


export type MutationSignupArgs = {
  input: UserSignupInput;
};

export type Node = {
  /** Relay ID */
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  node?: Maybe<Node>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type User = Node & {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  /** Relay ID */
  id: Scalars['ID'];
  lastName: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserLoginPayload = {
  __typename?: 'UserLoginPayload';
  jwt: Scalars['String'];
  user: User;
};

export type UserSignupInput = {
  avatar?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type UserSignupPayload = {
  __typename?: 'UserSignupPayload';
  jwt: Scalars['String'];
  user: User;
};

export type MeNoJwtQueryVariables = Exact<{ [key: string]: never; }>;


export type MeNoJwtQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string } | null | undefined };

export type MeInvalidJwtQueryVariables = Exact<{ [key: string]: never; }>;


export type MeInvalidJwtQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string } | null | undefined };

export type MeFakeUserJwtQueryVariables = Exact<{ [key: string]: never; }>;


export type MeFakeUserJwtQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string } | null | undefined };

export type MeValidUserJwtQueryVariables = Exact<{ [key: string]: never; }>;


export type MeValidUserJwtQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string } | null | undefined };

export type NonExistedEmailLoginMutationVariables = Exact<{
  input: UserLoginInput;
}>;


export type NonExistedEmailLoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserLoginPayload', jwt: string, user: { __typename?: 'User', id: string } } };

export type WrongPassLoginMutationVariables = Exact<{
  input: UserLoginInput;
}>;


export type WrongPassLoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserLoginPayload', jwt: string, user: { __typename?: 'User', id: string } } };

export type LoginSuccessMutationVariables = Exact<{
  input: UserLoginInput;
}>;


export type LoginSuccessMutation = { __typename?: 'Mutation', login: { __typename?: 'UserLoginPayload', jwt: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, avatar?: string | null | undefined } } };

export type UserNodeQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserNodeQuery = { __typename?: 'Query', node?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, avatar?: string | null | undefined } | null | undefined };

export type UserSignupMutationVariables = Exact<{
  input: UserSignupInput;
}>;


export type UserSignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'UserSignupPayload', jwt: string, user: { __typename?: 'User', email: string } } };

export type UserSuccessSignupMutationVariables = Exact<{
  input: UserSignupInput;
}>;


export type UserSuccessSignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'UserSignupPayload', jwt: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, avatar?: string | null | undefined } } };
