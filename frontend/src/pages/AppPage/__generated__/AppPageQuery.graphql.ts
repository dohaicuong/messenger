/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type AppPageQueryVariables = {};
export type AppPageQueryResponse = {
    readonly me: {
        readonly id: string;
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
    id
    ...NavbarFragment_user
  }
}

fragment NavbarFragment_user on User {
  firstName
  avatar
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
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
          (v0/*: any*/),
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
          (v0/*: any*/),
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "95d80118ec07b3a81d165b7b992d5ac5",
    "id": null,
    "metadata": {},
    "name": "AppPageQuery",
    "operationKind": "query",
    "text": "query AppPageQuery {\n  me {\n    id\n    ...NavbarFragment_user\n  }\n}\n\nfragment NavbarFragment_user on User {\n  firstName\n  avatar\n}\n"
  }
};
})();
(node as any).hash = '23ab9fff5e439f1eb89fc2e3c4711885';
export default node;
