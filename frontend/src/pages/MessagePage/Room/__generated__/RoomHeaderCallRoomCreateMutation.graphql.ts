/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CallRoomCreateInput = {
    guestId: unknown;
};
export type RoomHeaderCallRoomCreateMutationVariables = {
    input: CallRoomCreateInput;
};
export type RoomHeaderCallRoomCreateMutationResponse = {
    readonly callRoomCreate: {
        readonly callRoom: {
            readonly id: string;
        } | null;
    } | null;
};
export type RoomHeaderCallRoomCreateMutation = {
    readonly response: RoomHeaderCallRoomCreateMutationResponse;
    readonly variables: RoomHeaderCallRoomCreateMutationVariables;
};



/*
mutation RoomHeaderCallRoomCreateMutation(
  $input: CallRoomCreateInput!
) {
  callRoomCreate(input: $input) {
    callRoom {
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "CallRoomCreatePayload",
    "kind": "LinkedField",
    "name": "callRoomCreate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CallRoom",
        "kind": "LinkedField",
        "name": "callRoom",
        "plural": false,
        "selections": [
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RoomHeaderCallRoomCreateMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RoomHeaderCallRoomCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "30e3d948dda53d2d395449a3c7f8161a",
    "id": null,
    "metadata": {},
    "name": "RoomHeaderCallRoomCreateMutation",
    "operationKind": "mutation",
    "text": "mutation RoomHeaderCallRoomCreateMutation(\n  $input: CallRoomCreateInput!\n) {\n  callRoomCreate(input: $input) {\n    callRoom {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f906ad35f0768a7ebc5d089f5eb4473c';
export default node;
