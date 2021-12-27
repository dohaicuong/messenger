/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type RoomItem_room = {
    readonly id: string;
    readonly name: string | null;
    readonly " $refType": "RoomItem_room";
};
export type RoomItem_room$data = RoomItem_room;
export type RoomItem_room$key = {
    readonly " $data"?: RoomItem_room$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"RoomItem_room">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RoomItem_room",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Room",
  "abstractKey": null
};
(node as any).hash = '09b7d21ced3397bb51a599bffc599ef1';
export default node;
