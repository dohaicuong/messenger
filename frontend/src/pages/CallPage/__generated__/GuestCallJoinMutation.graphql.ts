/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CallJoinInput = {
    answer: string;
    iceCandidates: Array<string>;
    roomId: unknown;
};
export type GuestCallJoinMutationVariables = {
    input: CallJoinInput;
};
export type GuestCallJoinMutationResponse = {
    readonly callJoin: {
        readonly callRoom: {
            readonly id: string;
        } | null;
    } | null;
};
export type GuestCallJoinMutation = {
    readonly response: GuestCallJoinMutationResponse;
    readonly variables: GuestCallJoinMutationVariables;
};



/*
mutation GuestCallJoinMutation(
  $input: CallJoinInput!
) {
  callJoin(input: $input) {
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
    "concreteType": "CallJoinPayload",
    "kind": "LinkedField",
    "name": "callJoin",
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
    "name": "GuestCallJoinMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GuestCallJoinMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6d4d9002e1fc86c3635fa1a46abf08fd",
    "id": null,
    "metadata": {},
    "name": "GuestCallJoinMutation",
    "operationKind": "mutation",
    "text": "mutation GuestCallJoinMutation(\n  $input: CallJoinInput!\n) {\n  callJoin(input: $input) {\n    callRoom {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2820f50737d6fb632c3a846c9df9ac28';
export default node;
