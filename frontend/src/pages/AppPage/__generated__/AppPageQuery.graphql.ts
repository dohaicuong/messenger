/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type AppPageQueryVariables = {};
export type AppPageQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"NavbarFragment_user">;
    } | null;
};
export type AppPageQuery = {
    readonly response: AppPageQueryResponse;
    readonly variables: AppPageQueryVariables;
};



/*
query AppPageQuery {
  me {
    ...NavbarFragment_user
    id
  }
}

fragment NavbarFragment_user on User {
  firstName
  avatar
}
*/

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NavbarFragment_user"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "firstName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatar",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9d649a4c382fe7380a892f6b2d07fda4",
    "id": null,
    "metadata": {},
    "name": "AppPageQuery",
    "operationKind": "query",
    "text": "query AppPageQuery {\n  me {\n    ...NavbarFragment_user\n    id\n  }\n}\n\nfragment NavbarFragment_user on User {\n  firstName\n  avatar\n}\n"
  }
};
(node as any).hash = 'f4e0c977c29c9ea3ea45f0be062ded7a';
export default node;
