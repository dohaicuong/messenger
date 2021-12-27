/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type NewRoomPageQueryVariables = {};
export type NewRoomPageQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"UserSearchingInput_me">;
    } | null;
};
export type NewRoomPageQuery = {
    readonly response: NewRoomPageQueryResponse;
    readonly variables: NewRoomPageQueryVariables;
};



/*
query NewRoomPageQuery {
  me {
    ...UserSearchingInput_me
    id
  }
}

fragment UserSearchingInput_me on User {
  id
  others(first: 10, where: {}) {
    edges {
      node {
        id
        name
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "where",
    "value": {}
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "NewRoomPageQuery",
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
            "name": "UserSearchingInput_me"
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
    "name": "NewRoomPageQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "UserConnection",
            "kind": "LinkedField",
            "name": "others",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "UserEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v0/*: any*/),
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
            "storageKey": "others(first:10,where:{})"
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "filters": [
              "where"
            ],
            "handle": "connection",
            "key": "UserSearchingInput_me_others",
            "kind": "LinkedHandle",
            "name": "others"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f26926fdd07a7d4b65c30cff6076693d",
    "id": null,
    "metadata": {},
    "name": "NewRoomPageQuery",
    "operationKind": "query",
    "text": "query NewRoomPageQuery {\n  me {\n    ...UserSearchingInput_me\n    id\n  }\n}\n\nfragment UserSearchingInput_me on User {\n  id\n  others(first: 10, where: {}) {\n    edges {\n      node {\n        id\n        name\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ee4f9ffa6a5be967db62ba776dce3738';
export default node;
