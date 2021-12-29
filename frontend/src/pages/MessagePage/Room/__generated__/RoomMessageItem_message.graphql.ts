/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RoomMessageItem_message = {
    readonly id: string;
    readonly content: string;
    readonly author: {
        readonly id: string;
        readonly avatar: string | null;
    };
    readonly " $refType": "RoomMessageItem_message";
};
export type RoomMessageItem_message$data = RoomMessageItem_message;
export type RoomMessageItem_message$key = {
    readonly " $data"?: RoomMessageItem_message$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"RoomMessageItem_message">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RoomMessageItem_message",
  "selections": [
    (v0/*: any*/),
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
        (v0/*: any*/),
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
  "type": "Message",
  "abstractKey": null
};
})();
(node as any).hash = '1a3983e86db7cc26999ec7dad5e39715';
export default node;
