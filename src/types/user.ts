import { InferResponseType } from "hono";
import { client } from "../utils/api";
import { CredentialResponse } from "@react-oauth/google";

export type UserInfo = InferResponseType<typeof client.api.private.user.$get>;

export interface AuthContextType {
  user: UserInfo | null;
  // login: () => void;
  onGoogleLoginSuccess: (credentialResponse: CredentialResponse) => void;
  logout: () => void;
}
