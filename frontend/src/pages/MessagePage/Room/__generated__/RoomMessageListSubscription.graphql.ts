/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type MessageSentInput = {
    roomId: unknown;
};
export type RoomMessageListSubscriptionVariables = {
    input: MessageSentInput;
    connections: Array<string>;
};
export type RoomMessageListSubscriptionResponse = {
    readonly messageSent: {
        readonly message: {
            readonly " $fragmentRefs": FragmentRefs<"RoomMessageItem_message">;
        } | null;
    } | null;
};
export type RoomMessageListSubscription = {
    readonly response: RoomMessageListSubscriptionResponse;
    readonly variables: RoomMessageListSubscriptionVariables;
};



/*
subscription RoomMessageListSubscription(
  $input: MessageSentInput!
) {
  messageSent(input: $input) {
    message {
      ...RoomMessageItem_message
      id
    }
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
    "name": "RoomMessageListSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "MessageSentPayload",
        "kind": "LinkedField",
        "name": "messageSent",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Message",
            "kind": "LinkedField",
            "name": "message",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "RoomMessageItem_message"
              }
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "RoomMessageListSubscription",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "MessageSentPayload",
        "kind": "LinkedField",
        "name": "messageSent",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Message",
            "kind": "LinkedField",
            "name": "message",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "content",
                "storageKey": null
              },
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
            "name": "message",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "MessageEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e73cd9d9281cef01825a5fd3084370fe",
    "id": null,
    "metadata": {},
    "name": "RoomMessageListSubscription",
    "operationKind": "subscription",
    "text": "subscription RoomMessageListSubscription(\n  $input: MessageSentInput!\n) {\n  messageSent(input: $input) {\n    message {\n      ...RoomMessageItem_message\n      id\n    }\n  }\n}\n\nfragment RoomMessageItem_message on Message {\n  id\n  content\n  author {\n    id\n    avatar\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c22345877b708d30f585ddbd6606d6f9';
export default node;
