/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";

import { FragmentRefs } from "relay-runtime";
export type NavbarFragment_user = {
    readonly firstName: string;
    readonly avatar: string | null;
    readonly " $refType": "NavbarFragment_user";
};
export type NavbarFragment_user$data = NavbarFragment_user;
export type NavbarFragment_user$key = {
    readonly " $data"?: NavbarFragment_user$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"NavbarFragment_user">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavbarFragment_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatar",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '9e82acc16b6b448ac90d4ad093e9b5cf';
export default node;
