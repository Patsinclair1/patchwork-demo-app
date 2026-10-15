"use client";

// Unsigned JWT with role=service_role — deliberately fake, for scanner demos only
const SUPABASE_SERVICE_ROLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbCIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAwMDAwMDAwMH0.FAKEsignatureFAKEsignatureFAKEsig";

export default function Admin() {
  // Using service_role in the browser bypasses RLS — do not do this
  const key = SUPABASE_SERVICE_ROLE;
  return <div>Admin panel (key length {key.length})</div>;
}
