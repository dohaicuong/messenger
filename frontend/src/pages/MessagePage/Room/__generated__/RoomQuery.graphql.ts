/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RoomQueryVariables = {
    id: string;
};
export type RoomQueryResponse = {
    readonly room: {
        readonly " $fragmentRefs": FragmentRefs<"RoomHeader_room" | "RoomMessageList_room">;
    } | null;
};
export type RoomQuery = {
    readonly response: RoomQueryResponse;
    readonly variables: RoomQueryVariables;
};



/*
query RoomQuery(
  $id: ID!
) {
  room: node(id: $id) {
    __typename
    ... on Room {
      ...RoomHeader_room
      ...RoomMessageList_room
    }
    id
  }
}

fragment RoomHeader_room on Room {
  name
  participants {
    id
  }
}

fragment RoomMessageItem_message on Message {
  id
  content
  author {
    id
    avatar
  }
}

fragment RoomMessageList_room on Room {
  id
  messages(last: 10) {
    edges {
      node {
        id
        author {
          id
        }
        content
        ...RoomMessageItem_message
        __typename
      }
      cursor
    }
    pageInfo {
      hasPreviousPage
      startCursor
    }
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "last",
    "value": 10
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RoomQuery",
    "selections": [
      {
        "alias": "room",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "RoomHeader_room"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "RoomMessageList_room"
              }
            ],
            "type": "Room",
            "abstractKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RoomQuery",
    "selections": [
      {
        "alias": "room",
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
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
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "participants",
                "plural": true,
                "selections": [
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "concreteType": "MessageConnection",
                "kind": "LinkedField",
                "name": "messages",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MessageEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Message",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "User",
                            "kind": "LinkedField",
                            "name": "author",
                            "plural": false,
                            "selections": [
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "avatar",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "content",
                            "storageKey": null
                          },
                          (v2/*: any*/)
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
                        "name": "hasPreviousPage",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "startCursor",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "messages(last:10)"
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "RoomMessageList_room_messages",
                "kind": "LinkedHandle",
                "name": "messages"
              }
            ],
            "type": "Room",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b19eaacb508103046228cc316a2e7e49",
    "id": null,
    "metadata": {},
    "name": "RoomQuery",
    "operationKind": "query",
    "text": "query RoomQuery(\n  $id: ID!\n) {\n  room: node(id: $id) {\n    __typename\n    ... on Room {\n      ...RoomHeader_room\n      ...RoomMessageList_room\n    }\n    id\n  }\n}\n\nfragment RoomHeader_room on Room {\n  name\n  participants {\n    id\n  }\n}\n\nfragment RoomMessageItem_message on Message {\n  id\n  content\n  author {\n    id\n    avatar\n  }\n}\n\nfragment RoomMessageList_room on Room {\n  id\n  messages(last: 10) {\n    edges {\n      node {\n        id\n        author {\n          id\n        }\n        content\n        ...RoomMessageItem_message\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '065bed770459e814df221b28f47f171b';
export default node;
