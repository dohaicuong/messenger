/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type GuestCallRoomQueryVariables = {
    id: string;
};
export type GuestCallRoomQueryResponse = {
    readonly node: {
        readonly offer?: string | null | undefined;
        readonly hostIceCandidates?: ReadonlyArray<string> | undefined;
    } | null;
};
export type GuestCallRoomQuery = {
    readonly response: GuestCallRoomQueryResponse;
    readonly variables: GuestCallRoomQueryVariables;
};



/*
query GuestCallRoomQuery(
  $id: ID!
) {
  node(id: $id) {
    __typename
    ... on CallRoom {
      offer
      hostIceCandidates
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "offer",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "hostIceCandidates",
      "storageKey": null
    }
  ],
  "type": "CallRoom",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GuestCallRoomQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GuestCallRoomQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cef44b313df516d02b99fd09614d076b",
    "id": null,
    "metadata": {},
    "name": "GuestCallRoomQuery",
    "operationKind": "query",
    "text": "query GuestCallRoomQuery(\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ... on CallRoom {\n      offer\n      hostIceCandidates\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '1b555cd1066523bfdaf11730486189e3';
export default node;
