-- =============================================================
-- Seoul Craft Moment — database schema
-- Run this in Supabase → SQL Editor → New query → Run.
-- =============================================================

-- 1) Craft programs (workshops shown on the landing page) -------
create table if not exists public.programs (
  id          bigint generated always as identity primary key,
  title       text    not null,
  material    text    not null,
  description text    not null,
  duration    text    not null,
  price       text    not null,
  level       text    not null default 'All levels',
  image_url   text,
  featured    boolean not null default false,
  sort_order  int     not null default 0,
  created_at  timestamptz not null default now()
);

-- 2) Reservations / inquiries submitted from the site ----------
create table if not exists public.reservations (
  id             bigint generated always as identity primary key,
  name           text not null,
  email          text not null,
  program        text,
  party_size     int  not null default 2,
  preferred_date date,
  message        text,
  status         text not null default 'new'
                 check (status in ('new', 'confirmed', 'cancelled')),
  created_at     timestamptz not null default now()
);

-- Upgrade path for databases created before the admin page existed
-- (add column if not exists cannot attach the check, so add it separately).
alter table public.reservations
  add column if not exists status text not null default 'new';

do $$ begin
  alter table public.reservations
    add constraint reservations_status_check
    check (status in ('new', 'confirmed', 'cancelled'));
exception
  when duplicate_object then null;
end $$;

-- 3) Row Level Security ----------------------------------------
alter table public.programs     enable row level security;
alter table public.reservations enable row level security;

-- Anyone may READ the public programs list.
drop policy if exists "programs are public" on public.programs;
create policy "programs are public"
  on public.programs for select
  using (true);

-- Anyone may CREATE a reservation (public booking form),
-- but nobody can read them back with the anon key.
drop policy if exists "anyone can create a reservation" on public.reservations;
create policy "anyone can create a reservation"
  on public.reservations for insert
  with check (true);

-- Signed-in users (= admins; there is no public sign-up) may READ
-- and UPDATE reservations from the admin page (#admin).
-- If regular user accounts are ever added, narrow these policies
-- to an explicit admin role instead of `authenticated`.
drop policy if exists "authenticated can read reservations" on public.reservations;
create policy "authenticated can read reservations"
  on public.reservations for select
  to authenticated
  using (true);

drop policy if exists "authenticated can update reservations" on public.reservations;
create policy "authenticated can update reservations"
  on public.reservations for update
  to authenticated
  using (true)
  with check (true);

-- 4) Seed the four workshops -----------------------------------
insert into public.programs
  (title, material, description, duration, price, level, image_url, featured, sort_order)
values
  ('Hanji Object Making', 'Hanji',
   'Create a small object using the texture and softness of Korean paper.',
   '2 hr', '₩68,000', 'All levels',
   'https://images.unsplash.com/photo-1605627079912-97c3810a11a4?auto=format&fit=crop&w=800&q=70',
   true, 1),
  ('Ceramic Texture Session', 'Ceramic',
   'Experience the calm form and surface of Korean clay by hand.',
   '2.5 hr', '₩82,000', 'All levels',
   'https://images.unsplash.com/photo-1594138352322-731eff042041?auto=format&fit=crop&w=800&q=70',
   false, 2),
  ('Mother-of-Pearl Detail', 'Mother-of-Pearl',
   'Work with subtle light, pattern, and traditional Korean decorative material.',
   '3 hr', '₩95,000', 'Beginner friendly',
   'https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&w=800&q=70',
   false, 3),
  ('Knot & Textile Moment', 'Knot & Textile',
   'Make a small ornament using Korean knots and soft textile details.',
   '1.5 hr', '₩54,000', 'All levels',
   'https://images.unsplash.com/photo-1598616068517-c75ad397a436?auto=format&fit=crop&w=800&q=70',
   false, 4)
on conflict do nothing;
