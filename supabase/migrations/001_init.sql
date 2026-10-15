create table profiles (id uuid primary key, email text);
create table notes (id uuid primary key, user_id uuid, body text);
alter table notes enable row level security;
alter table notes disable row level security;
