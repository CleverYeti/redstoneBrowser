const sbUrl = "https://vziukvukxsawauzmjcgm.supabase.co"
const sbKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6aXVrdnVreHNhd2F1em1qY2dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAxMTYwNDMsImV4cCI6MjAzNTY5MjA0M30.88Tebw7lGef47rfWWCzGuNmWEeHX0WCqFIYEyeWcaN4";
const sb = supabase.createClient(sbUrl, sbKey)

function handleSBError(text, error) {
  if (error == null) return
  console.error("Supabase Error:", error)
  alert("Supabase Error: " + text + "\n" + JSON.stringify(error, null, 4))
}