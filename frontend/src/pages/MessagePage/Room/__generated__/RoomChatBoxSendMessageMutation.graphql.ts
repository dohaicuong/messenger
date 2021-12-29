/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type MessageSendInput = {
    content: string;
    roomId: unknown;
};
export type RoomChatBoxSendMessageMutationVariables = {
    input: MessageSendInput;
    connections: Array<string>;
};
export type RoomChatBoxSendMessageMutationResponse = {
    readonly messageSend: {
        readonly message: {
            readonly " $fragmentRefs": FragmentRefs<"RoomMessageItem_message">;
        } | null;
    } | null;
};
export type RoomChatBoxSendMessageMutation = {
    readonly response: RoomChatBoxSendMessageMutationResponse;
    readonly variables: RoomChatBoxSendMessageMutationVariables;
};



/*
mutation RoomChatBoxSendMessageMutation(
  $input: MessageSendInput!
) {
  messageSend(input: $input) {
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
    "name": "RoomChatBoxSendMessageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "MessageSendPayload",
        "kind": "LinkedField",
        "name": "messageSend",
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
    "name": "RoomChatBoxSendMessageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "MessageSendPayload",
        "kind": "LinkedField",
        "name": "messageSend",
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
    "cacheID": "aa62efff3185520cf220fd2363dc3cb8",
    "id": null,
    "metadata": {},
    "name": "RoomChatBoxSendMessageMutation",
    "operationKind": "mutation",
    "text": "mutation RoomChatBoxSendMessageMutation(\n  $input: MessageSendInput!\n) {\n  messageSend(input: $input) {\n    message {\n      ...RoomMessageItem_message\n      id\n    }\n  }\n}\n\nfragment RoomMessageItem_message on Message {\n  id\n  content\n  author {\n    id\n    avatar\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a74ec10f2b6e05c9ed496e4745df1976';
export default node;
