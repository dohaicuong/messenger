/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import RoomMessageListPaginationQuery from "./RoomMessageListPaginationQuery.graphql";
import { FragmentRefs } from "relay-runtime";
export type RoomMessageList_room = {
    readonly id: string;
    readonly messages: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly author: {
                    readonly id: string;
                };
                readonly content: string;
                readonly " $fragmentRefs": FragmentRefs<"RoomMessageItem_message">;
            } | null;
        } | null> | null;
    };
    readonly " $refType": "RoomMessageList_room";
};
export type RoomMessageList_room$data = RoomMessageList_room;
export type RoomMessageList_room$key = {
    readonly " $data"?: RoomMessageList_room$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"RoomMessageList_room">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "messages"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": 10,
      "kind": "LocalArgument",
      "name": "count"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "cursor"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "count",
        "cursor": "cursor",
        "direction": "backward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": null,
        "backward": {
          "count": "count",
          "cursor": "cursor"
        },
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [
        "node"
      ],
      "operation": RoomMessageListPaginationQuery,
      "identifierField": "id"
    }
  },
  "name": "RoomMessageList_room",
  "selections": [
    (v1/*: any*/),
    {
      "alias": "messages",
      "args": null,
      "concreteType": "MessageConnection",
      "kind": "LinkedField",
      "name": "__RoomMessageList_room_messages_connection",
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
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "User",
                  "kind": "LinkedField",
                  "name": "author",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/)
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
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "RoomMessageItem_message"
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
      "storageKey": null
    }
  ],
  "type": "Room",
  "abstractKey": null
};
})();
(node as any).hash = '121417ecd098f0319aefe25f53bdc290';
export default node;
