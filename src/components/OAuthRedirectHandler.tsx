import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function OAuthRedirectHandler() {
  const auth = useContext(AuthContext);

  const rawUrl = typeof window !== "undefined" ? window.location.href : "";
  const redirectEncoded = rawUrl.split("redirect=")[1];
  const redirectTo = decodeURIComponent(redirectEncoded ?? "/");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!auth?.onGoogleLoginSuccess || !redirectTo) return;

    const token = window.google?.accounts?.id?.getCredential?.();
    if (!token) return;

    auth.onGoogleLoginSuccess({ credential: token, select_by: "user" });

    const timer = setTimeout(() => {
      window.location.href = redirectTo;
    }, 1500);

    return () => clearTimeout(timer);
  }, [auth, redirectTo]);

  return <div className="text-white p-4">Logging in via OAuth2 redirect...</div>;
}
