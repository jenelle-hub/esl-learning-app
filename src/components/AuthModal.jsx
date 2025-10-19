import React from "react";
import Button from "./shared/Button";
import { supabase } from "../lib/supabase";

// ---------- MAIN ----------
export default function AuthModal({ open, tab, onTab, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-[560px] max-w-[92vw] rounded-2xl bg-white shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center gap-2 mb-3">
          <img src="/logo.svg" className="h-7 w-7" alt="BrightLingo" />
          <div className="text-lg font-semibold">Welcome to BrightLingo</div>
        </div>

        <div className="grid grid-cols-2 rounded-full bg-slate-100 p-1 mb-5">
          <button
            onClick={() => onTab("signin")}
            className={`h-9 rounded-full text-sm ${
              tab === "signin" ? "bg-white shadow font-medium" : "text-slate-600"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => onTab("signup")}
            className={`h-9 rounded-full text-sm ${
              tab === "signup" ? "bg-white shadow font-medium" : "text-slate-600"
            }`}
          >
            Sign Up
          </button>
        </div>

        {tab === "signin" ? <Signin /> : <Signup />}

        <div className="mt-4 text-xs text-slate-500 text-center">
          We’ll email you a secure magic link to{" "}
          {tab === "signup" ? "create your account" : "sign in"}.
        </div>
      </div>
    </div>
  );
}

// ---------- GitHub OAuth ----------
async function signInWithGitHub() {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  } catch (err) {
    console.error("GitHub OAuth error:", err);
    alert(err?.message || "GitHub sign-in failed.");
  }
}

// ---------- Reusable Field ----------
function Field({ label, type = "text", placeholder, value, onChange }) {
  return (
    <label className="block">
      <div className="text-xs text-slate-600 mb-1">{label}</div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full h-11 rounded-lg border border-slate-300 px-3 focus:border-primary focus:ring-1 focus:ring-primary"
        value={value}
        onChange={onChange}
        required
      />
    </label>
  );
}

function OrDivider() {
  return (
    <div className="relative my-3">
      <div className="border-t" />
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xs text-slate-500">
        or
      </span>
    </div>
  );
}

function GitHubButton() {
  return (
    <button
      type="button"
      onClick={signInWithGitHub}
      className="w-full h-11 rounded-lg border flex items-center justify-center gap-2 hover:bg-slate-50"
      title="Continue with GitHub"
    >
      <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
        <path
          fill="currentColor"
          d="M8 .2A8 8 0 0 0 5.5 15.8c.4.1.6-.2.6-.4v-1.4c-2.2.5-2.7-1-2.7-1-.4-1-.9-1.3-.9-1.3-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.2 1.9.8 2.4.6.1-.5.3-.8.5-1-1.8-.2-3.6-.9-3.6-4a3.1 3.1 0 0 1 .8-2.1c-.1-.2-.3-1 .1-2 0 0 .7-.2 2.2.8a7.6 7.6 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.4 1 .2 1.8.1 2a3.1 3.1 0 0 1 .8 2.1c0 3.1-1.8 3.8-3.6 4 .3.2.6.7.6 1.5v2.2c0 .2.2.5.6.4A8 8 0 0 0 8 .2Z"
        />
      </svg>
      Continue with GitHub
    </button>
  );
}

// ---------- Sign In ----------
function Signin() {
  const [email, setEmail] = React.useState("");
  const [confirm, setConfirm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const handleConfirm = async () => {
    setLoading(true);
    setMsg("");
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setMsg("✅ Email sent! Check your inbox for the magic sign-in link.");
      setConfirm(false);
    } catch (err) {
      console.error("Magic link error (signin):", err);
      setMsg(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
      <Field
        label="Email"
        type="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {!confirm ? (
        <Button
          className="w-full bg-primaryDark"
          disabled={!email || loading}
          onClick={() => setConfirm(true)}
        >
          {loading ? "Sending..." : "Send Sign-In Link"}
        </Button>
      ) : (
        <div className="text-center space-y-3">
          <p className="text-sm text-slate-700">
            Send sign-in link to <span className="font-medium">{email}</span>?
          </p>
          <div className="flex gap-2 justify-center">
            {/* PLAIN BUTTON FOR CONFIRM */}
            <button
              type="button"
              onClick={handleConfirm}
              className="h-10 px-4 rounded-lg bg-[#1d4ed8] text-white font-medium hover:brightness-110 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Sending..." : "Confirm"}
            </button>
            <button
              type="button"
              className="h-10 px-4 rounded-lg border text-slate-700 hover:bg-slate-50 disabled:opacity-60"
              onClick={() => setConfirm(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <OrDivider />
      <GitHubButton />

      {msg && <div className="text-xs text-slate-500 text-center">{msg}</div>}
    </form>
  );
}

// ---------- Sign Up ----------
function Signup() {
  const [email, setEmail] = React.useState("");
  const [confirm, setConfirm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [msg, setMsg] = React.useState("");

  const handleConfirm = async () => {
    setLoading(true);
    setMsg("");
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setMsg("✅ Email sent! Check your inbox to complete sign-up.");
      setConfirm(false);
    } catch (err) {
      console.error("Magic link error (signup):", err);
      setMsg(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
      <Field
        label="Email"
        type="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {!confirm ? (
        <Button
          className="w-full bg-primaryDark"
          disabled={!email || loading}
          onClick={() => setConfirm(true)}
        >
          {loading ? "Sending..." : "Send Sign-Up Link"}
        </Button>
      ) : (
        <div className="text-center space-y-3">
          <p className="text-sm text-slate-700">
            Send sign-up link to <span className="font-medium">{email}</span>?
          </p>
          <div className="flex gap-2 justify-center">
            {/* PLAIN BUTTON FOR CONFIRM */}
            <button
              type="button"
              onClick={handleConfirm}
              className="h-10 px-4 rounded-lg bg-[#1d4ed8] text-white font-medium hover:brightness-110 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Sending..." : "Confirm"}
            </button>
            <button
              type="button"
              className="h-10 px-4 rounded-lg border text-slate-700 hover:bg-slate-50 disabled:opacity-60"
              onClick={() => setConfirm(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <OrDivider />
      <GitHubButton />

      {msg && <div className="text-xs text-slate-500 text-center">{msg}</div>}
    </form>
  );
}
