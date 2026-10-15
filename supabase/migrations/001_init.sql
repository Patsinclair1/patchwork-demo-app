create table profiles (id uuid primary key, email text);
alter table profiles enable row level security;
create policy "profiles_own" on profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create table notes (id uuid primary key, user_id uuid, body text);
alter table notes enable row level security;
create policy "notes_own" on notes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
