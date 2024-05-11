import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  // import.meta.env.SUPABASE_URL,
  // import.meta.env.SUPABASE_ANON_KEY,
  "https://wwzzoszfysebgreeduxf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3enpvc3pmeXNlYmdyZWVkdXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzNTEwMjQsImV4cCI6MjAzMDkyNzAyNH0.fUbsIdGptS0j-nZ1ng3LI8xPO5lUU_1gZr_PljGJzKU",
);

export default supabase;
