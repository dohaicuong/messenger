/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type UserRoomConnectionWhere = {
    name?: string | null | undefined;
};
export type RoomListPaginationQueryVariables = {
    count: number;
    cursor?: string | null | undefined;
    where?: UserRoomConnectionWhere | null | undefined;
    id: string;
};
export type RoomListPaginationQueryResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"RoomList_me">;
    } | null;
};
export type RoomListPaginationQuery = {
    readonly response: RoomListPaginationQueryResponse;
    readonly variables: RoomListPaginationQueryVariables;
};



/*
query RoomListPaginationQuery(
  $count: Int! = 10
  $cursor: String
  $where: UserRoomConnectionWhere
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...RoomList_me_mjR8k
    id
  }
}

fragment RoomItem_room on Room {
  id
  name
}

fragment RoomList_me_mjR8k on User {
  rooms(first: $count, after: $cursor, where: $where) {
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
var v0 = {
  "defaultValue": 10,
  "kind": "LocalArgument",
  "name": "count"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "cursor"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "where"
},
v4 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v5 = {
  "kind": "Variable",
  "name": "where",
  "variableName": "where"
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RoomListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              },
              (v5/*: any*/)
            ],
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "RoomListPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v6/*: any*/),
          (v7/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v8/*: any*/),
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
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          },
                          (v6/*: any*/)
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
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v8/*: any*/),
                "filters": [
                  "where"
                ],
                "handle": "connection",
                "key": "RoomList_me_rooms",
                "kind": "LinkedHandle",
                "name": "rooms"
              }
            ],
            "type": "User",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c6a8a0571146f8cb60418c5d12ed3f11",
    "id": null,
    "metadata": {},
    "name": "RoomListPaginationQuery",
    "operationKind": "query",
    "text": "query RoomListPaginationQuery(\n  $count: Int! = 10\n  $cursor: String\n  $where: UserRoomConnectionWhere\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...RoomList_me_mjR8k\n    id\n  }\n}\n\nfragment RoomItem_room on Room {\n  id\n  name\n}\n\nfragment RoomList_me_mjR8k on User {\n  rooms(first: $count, after: $cursor, where: $where) {\n    edges {\n      node {\n        id\n        ...RoomItem_room\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n"
  }
};
})();
(node as any).hash = '4cdb829e80a41125b0f46199544aea1c';
export default node;
