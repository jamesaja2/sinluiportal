import { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function OAuthRedirectHandler() {
  const [params] = useSearchParams();
  const redirectTo = params.get("redirect");
  const auth = useContext(AuthContext);

  useEffect(() => {
    // Ambil token dari One Tap jika sudah login otomatis
    const token = window.google?.accounts?.id?.getCredential?.();

    if (!token || !auth?.onGoogleLoginSuccess || !redirectTo) return;

    // Simulasikan struktur response CredentialResponse
    auth.onGoogleLoginSuccess({ credential: token, select_by: "user" });

    // Setelah beberapa saat, redirect
    const timer = setTimeout(() => {
      window.location.href = redirectTo;
    }, 1500);

    return () => clearTimeout(timer);
  }, [auth, redirectTo]);

  return <p>Logging in via OAuth2 redirect…</p>;
}
