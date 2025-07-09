import { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function OAuthRedirectHandler() {
  const [params] = useSearchParams();
  const redirectTo = params.get("redirect");
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (typeof window === "undefined") return; // 🛡️ prevent SSR error
    if (!auth || !auth.onGoogleLoginSuccess || !redirectTo) return;

    const token = window.google?.accounts?.id?.getCredential?.();
    if (!token) return;

    auth.onGoogleLoginSuccess({ credential: token, select_by: "user" });

    const timer = setTimeout(() => {
      window.location.href = redirectTo;
    }, 1500);

    return () => clearTimeout(timer);
  }, [auth, redirectTo]);

  return (
    <div className="text-white p-4">
      Logging in via OAuth2 redirect...
    </div>
  );
}
