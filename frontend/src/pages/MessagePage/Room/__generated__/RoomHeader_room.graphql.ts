/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RoomHeader_room = {
    readonly name: string | null;
    readonly participants: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly " $refType": "RoomHeader_room";
};
export type RoomHeader_room$data = RoomHeader_room;
export type RoomHeader_room$key = {
    readonly " $data"?: RoomHeader_room$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"RoomHeader_room">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RoomHeader_room",
  "selections": [
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
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "participants",
      "plural": true,
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
  "type": "Room",
  "abstractKey": null
};
(node as any).hash = '8fd54a3fb7d81093d864163a62fe6d36';
export default node;
