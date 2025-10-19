// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

// DEBUG logs (remove after)
console.log("VITE_SUPABASE_URL =", import.meta.env.VITE_SUPABASE_URL);
console.log(
  "VITE_SUPABASE_ANON_KEY starts with =",
  (import.meta.env.VITE_SUPABASE_ANON_KEY || "").slice(0, 8)
);

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  alert(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. " +
      "Put them in .env.local next to package.json and restart `npm run dev`."
  );
}

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
