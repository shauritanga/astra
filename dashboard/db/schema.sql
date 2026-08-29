-- Astra Nova admin dashboard
create table if not exists admin_users (
  id bigint generated always as identity primary key,
  email text not null unique,
  name text not null,
  password_hash text not null,
  role text not null default 'Administrator',
  created_at timestamptz not null default now(),
  constraint admin_users_role_check check (role in ('Administrator', 'Operator'))
);

alter table admin_users add column if not exists role text not null default 'Administrator';

create table if not exists quote_requests (
  id bigint generated always as identity primary key,
  company_name text not null,
  contact_person text not null,
  phone text not null,
  email text not null,
  service_type text not null,
  details text not null,
  status text not null default 'new',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint quote_requests_status_check
    check (status in ('new', 'in_progress', 'closed'))
);

create index if not exists quote_requests_status_created_at_idx
  on quote_requests (status, created_at desc);

create table if not exists contact_messages (
  id bigint generated always as identity primary key,
  full_name text not null,
  company_name text not null,
  email text not null,
  phone text not null,
  subject text not null,
  message text not null,
  status text not null default 'new',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint contact_messages_status_check
    check (status in ('new', 'in_progress', 'closed'))
);

create index if not exists contact_messages_status_created_at_idx
  on contact_messages (status, created_at desc);

create table if not exists company_settings (
  id smallint primary key default 1,
  phone_display text not null,
  phone_tel text not null,
  email_info text not null,
  email_operations text not null,
  address_line1 text not null,
  address_line2 text not null,
  hours_weekday text not null,
  hours_saturday text not null,
  updated_at timestamptz not null default now(),
  constraint company_settings_singleton check (id = 1)
);

create table if not exists services (
  id bigint generated always as identity primary key,
  slug text not null unique,
  title text not null,
  summary text not null,
  body text not null,
  image_url text not null,
  icon_key text not null default 'truck',
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint services_icon_key_check
    check (icon_key in ('truck', 'globe', 'clipboard', 'hardhat'))
);

create index if not exists services_published_sort_idx
  on services (is_published, sort_order, id);

create table if not exists job_openings (
  id bigint generated always as identity primary key,
  title text not null,
  department text not null,
  location text not null,
  description text not null default '',
  is_open boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists job_openings_open_sort_idx
  on job_openings (is_open, sort_order, id);

create table if not exists social_links (
  id bigint generated always as identity primary key,
  network text not null unique,
  url text not null default '',
  sort_order integer not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now(),
  constraint social_links_network_check
    check (network in ('facebook', 'instagram', 'linkedin', 'x', 'tiktok'))
);
