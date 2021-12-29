/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";

export type UserLoginInput = {
    email: string;
    password: string;
};
export type LoginPageMutationVariables = {
    input: UserLoginInput;
};
export type LoginPageMutationResponse = {
    readonly login: {
        readonly jwt: string;
        readonly user: {
            readonly id: string;
            readonly firstName: string;
        };
    };
};
export type LoginPageMutation = {
    readonly response: LoginPageMutationResponse;
    readonly variables: LoginPageMutationVariables;
};



/*
mutation LoginPageMutation(
  $input: UserLoginInput!
) {
  login(input: $input) {
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
    "concreteType": "UserLoginPayload",
    "kind": "LinkedField",
    "name": "login",
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
    "name": "LoginPageMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginPageMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "783feff23531a16b720a20ee4c014c14",
    "id": null,
    "metadata": {},
    "name": "LoginPageMutation",
    "operationKind": "mutation",
    "text": "mutation LoginPageMutation(\n  $input: UserLoginInput!\n) {\n  login(input: $input) {\n    jwt\n    user {\n      id\n      firstName\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'fd24c0d871b52a47311c6aee825b406c';
export default node;
