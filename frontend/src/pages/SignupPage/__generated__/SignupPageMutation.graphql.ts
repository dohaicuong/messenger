/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UserSignupInput = {
    avatar?: string | null | undefined;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
};
export type SignupPageMutationVariables = {
    input: UserSignupInput;
};
export type SignupPageMutationResponse = {
    readonly signup: {
        readonly jwt: string;
        readonly user: {
            readonly id: string;
            readonly firstName: string;
        };
    };
};
export type SignupPageMutation = {
    readonly response: SignupPageMutationResponse;
    readonly variables: SignupPageMutationVariables;
};



/*
mutation SignupPageMutation(
  $input: UserSignupInput!
) {
  signup(input: $input) {
    jwt
    user {
      id
      firstName
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
    "concreteType": "UserSignupPayload",
    "kind": "LinkedField",
    "name": "signup",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "jwt",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "user",
        "plural": false,
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
            "name": "firstName",
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
    "name": "SignupPageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SignupPageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ca24f440daca81215689dba97a6fc21a",
    "id": null,
    "metadata": {},
    "name": "SignupPageMutation",
    "operationKind": "mutation",
    "text": "mutation SignupPageMutation(\n  $input: UserSignupInput!\n) {\n  signup(input: $input) {\n    jwt\n    user {\n      id\n      firstName\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f450bfa3e1d4b4250148c7d950d4b7d5';
export default node;
