"use client";

import { createBrowserClient } from "../lib/supabase";

export default function Admin() {
  // Uses the public anon key only; privileged work goes through /api/*
  const supabase = createBrowserClient();
  return <div>Admin panel (signed-in users only — check session server-side)</div>;
}
