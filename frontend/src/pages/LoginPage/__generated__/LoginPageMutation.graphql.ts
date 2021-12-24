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
      firstName
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
  "name": "jwt",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LoginPageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserLoginPayload",
        "kind": "LinkedField",
        "name": "login",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v3/*: any*/)
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LoginPageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UserLoginPayload",
        "kind": "LinkedField",
        "name": "login",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
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
    "cacheID": "d78e59d4e5154d7a667fd635f93a2da5",
    "id": null,
    "metadata": {},
    "name": "LoginPageMutation",
    "operationKind": "mutation",
    "text": "mutation LoginPageMutation(\n  $input: UserLoginInput!\n) {\n  login(input: $input) {\n    jwt\n    user {\n      firstName\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '8d767909c3fcef140913b9f78e2a6e29';
export default node;
