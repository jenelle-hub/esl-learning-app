import { useEffect } from "react";
import { supabase } from "./lib/supabase";

export default function AuthCallback() {
  useEffect(() => {
    const run = async () => {
      const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);
      if (error) {
        console.error("exchangeCodeForSession error:", error);
        alert(error.message);
      } else {
        // success: go home (or wherever)
        window.location.replace("/");
      }
    };
    run();
  }, []);
  return <div style={{ padding: 24 }}>Signing you in…</div>;
}
