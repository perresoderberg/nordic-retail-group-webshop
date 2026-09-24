import { createClient } from "@supabase/supabase-js";

// Hämtar Supabase-konfiguration från miljövariabler
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Skapar Supabase-klienten som används för autentisering
export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);