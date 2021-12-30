/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RoomListPageQueryVariables = {};
export type RoomListPageQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"RoomList_me">;
    } | null;
};
export type RoomListPageQuery = {
    readonly response: RoomListPageQueryResponse;
    readonly variables: RoomListPageQueryVariables;
};



/*
query RoomListPageQuery {
  me {
    ...RoomList_me
    id
  }
}

fragment RoomItem_room on Room {
  id
  name
}

fragment RoomList_me on User {
  rooms(first: 10) {
    edges {
      node {
        id
        ...RoomItem_room
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  id
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  }
],
v1 = {
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
    "name": "RoomListPageQuery",
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
            "name": "RoomList_me"
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
    "name": "RoomListPageQuery",
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
            "args": (v0/*: any*/),
            "concreteType": "RoomConnection",
            "kind": "LinkedField",
            "name": "rooms",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "RoomEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Room",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "rooms(first:10)"
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
            "filters": [
              "where"
            ],
            "handle": "connection",
            "key": "RoomList_me_rooms",
            "kind": "LinkedHandle",
            "name": "rooms"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3a6420697c062dd56f79da4d31e25ca7",
    "id": null,
    "metadata": {},
    "name": "RoomListPageQuery",
    "operationKind": "query",
    "text": "query RoomListPageQuery {\n  me {\n    ...RoomList_me\n    id\n  }\n}\n\nfragment RoomItem_room on Room {\n  id\n  name\n}\n\nfragment RoomList_me on User {\n  rooms(first: 10) {\n    edges {\n      node {\n        id\n        ...RoomItem_room\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n"
  }
};
})();
(node as any).hash = '7f84743e568360f6e04a8f94737cb7d4';
export default node;
