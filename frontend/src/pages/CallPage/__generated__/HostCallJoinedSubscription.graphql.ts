/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type CallJoinedInput = {
    callRoomId: unknown;
};
export type HostCallJoinedSubscriptionVariables = {
    input: CallJoinedInput;
};
export type HostCallJoinedSubscriptionResponse = {
    readonly callJoined: {
        readonly callRoom: {
            readonly answer: string | null;
            readonly guestIceCandidates: ReadonlyArray<string>;
        } | null;
    } | null;
};
export type HostCallJoinedSubscription = {
    readonly response: HostCallJoinedSubscriptionResponse;
    readonly variables: HostCallJoinedSubscriptionVariables;
};



/*
subscription HostCallJoinedSubscription(
  $input: CallJoinedInput!
) {
  callJoined(input: $input) {
    callRoom {
      answer
      guestIceCandidates
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "answer",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "guestIceCandidates",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HostCallJoinedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CallJoinedPayload",
        "kind": "LinkedField",
        "name": "callJoined",
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
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Subscription",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HostCallJoinedSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CallJoinedPayload",
        "kind": "LinkedField",
        "name": "callJoined",
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
              (v2/*: any*/),
              (v3/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "d46d29343eaba215ad3615875b4dd70e",
    "id": null,
    "metadata": {},
    "name": "HostCallJoinedSubscription",
    "operationKind": "subscription",
    "text": "subscription HostCallJoinedSubscription(\n  $input: CallJoinedInput!\n) {\n  callJoined(input: $input) {\n    callRoom {\n      answer\n      guestIceCandidates\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7df4cf508f48ed9052cba6afd9342c98';
export default node;
