/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CallStartInput = {
    iceCandidates: Array<string>;
    offer: string;
    roomId: unknown;
};
export type HostCallStartMutationVariables = {
    input: CallStartInput;
};
export type HostCallStartMutationResponse = {
    readonly callStart: {
        readonly callRoom: {
            readonly id: string;
        } | null;
    } | null;
};
export type HostCallStartMutation = {
    readonly response: HostCallStartMutationResponse;
    readonly variables: HostCallStartMutationVariables;
};



/*
mutation HostCallStartMutation(
  $input: CallStartInput!
) {
  callStart(input: $input) {
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
    "concreteType": "CallStartPayload",
    "kind": "LinkedField",
    "name": "callStart",
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
    "name": "HostCallStartMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HostCallStartMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "be7c2d55cff9c171998b36476bca5d1d",
    "id": null,
    "metadata": {},
    "name": "HostCallStartMutation",
    "operationKind": "mutation",
    "text": "mutation HostCallStartMutation(\n  $input: CallStartInput!\n) {\n  callStart(input: $input) {\n    callRoom {\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bf0475a5d5bde38ff6a9d7d143796880';
export default node;
