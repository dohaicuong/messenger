/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RoomCreateInput = {
    name?: string | null | undefined;
    participantIds: Array<unknown>;
};
export type UserSearchingInputRoomCreateMutationVariables = {
    input: RoomCreateInput;
    connections: Array<string>;
};
export type UserSearchingInputRoomCreateMutationResponse = {
    readonly roomCreate: {
        readonly room: {
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"RoomItem_room">;
        } | null;
    } | null;
};
export type UserSearchingInputRoomCreateMutation = {
    readonly response: UserSearchingInputRoomCreateMutationResponse;
    readonly variables: UserSearchingInputRoomCreateMutationVariables;
};



/*
mutation UserSearchingInputRoomCreateMutation(
  $input: RoomCreateInput!
) {
  roomCreate(input: $input) {
    room {
      id
      ...RoomItem_room
    }
  }
}

fragment RoomItem_room on Room {
  id
  name
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "UserSearchingInputRoomCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RoomCreatePayload",
        "kind": "LinkedField",
        "name": "roomCreate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Room",
            "kind": "LinkedField",
            "name": "room",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "RoomItem_room"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "UserSearchingInputRoomCreateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RoomCreatePayload",
        "kind": "LinkedField",
        "name": "roomCreate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Room",
            "kind": "LinkedField",
            "name": "room",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "appendNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "room",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "RoomEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e7c6fd512e6873d3f2a764791dfa24ef",
    "id": null,
    "metadata": {},
    "name": "UserSearchingInputRoomCreateMutation",
    "operationKind": "mutation",
    "text": "mutation UserSearchingInputRoomCreateMutation(\n  $input: RoomCreateInput!\n) {\n  roomCreate(input: $input) {\n    room {\n      id\n      ...RoomItem_room\n    }\n  }\n}\n\nfragment RoomItem_room on Room {\n  id\n  name\n}\n"
  }
};
})();
(node as any).hash = 'a3aafcded79bcfe7748818234a854564';
export default node;
