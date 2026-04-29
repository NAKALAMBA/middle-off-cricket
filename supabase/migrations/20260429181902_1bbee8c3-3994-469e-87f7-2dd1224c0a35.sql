
-- Roles enum and user_roles table (separate from profiles for security)
create type public.app_role as enum ('admin', 'customer');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null default 'customer',
  created_at timestamptz not null default now(),
  unique(user_id, role)
);

alter table public.user_roles enable row level security;

-- Security definer function to check role (avoids RLS recursion)
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "Users can view their own roles"
  on public.user_roles for select
  to authenticated
  using (user_id = auth.uid());

create policy "Admins can view all roles"
  on public.user_roles for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can manage roles"
  on public.user_roles for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  shipping_address text,
  shipping_city text,
  shipping_state text,
  shipping_pincode text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (id = auth.uid());

create policy "Users can insert their own profile"
  on public.profiles for insert
  to authenticated
  with check (id = auth.uid());

create policy "Admins can view all profiles"
  on public.profiles for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Trigger: create profile + customer role on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));

  insert into public.user_roles (user_id, role)
  values (new.id, 'customer');

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Updated_at trigger helper
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- Products table
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  description text,
  price_inr integer not null check (price_inr >= 0),
  compare_at_inr integer check (compare_at_inr >= 0),
  image_url text,
  badge text,
  rating numeric(2,1) default 4.8,
  reviews_count integer default 0,
  stock integer not null default 0 check (stock >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "Anyone can view active products"
  on public.products for select
  using (is_active = true or public.has_role(auth.uid(), 'admin'));

create policy "Admins can insert products"
  on public.products for insert
  to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update products"
  on public.products for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete products"
  on public.products for delete
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create trigger products_touch_updated_at
  before update on public.products
  for each row execute function public.touch_updated_at();

-- Testimonials
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  author_name text not null,
  author_role text,
  initials text,
  quote text not null,
  rating integer not null default 5 check (rating between 1 and 5),
  product_name text,
  is_approved boolean not null default false,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

create policy "Anyone can view approved testimonials"
  on public.testimonials for select
  using (is_approved = true or public.has_role(auth.uid(), 'admin'));

create policy "Authenticated users can submit testimonials"
  on public.testimonials for insert
  to authenticated
  with check (user_id = auth.uid());

create policy "Admins can manage testimonials"
  on public.testimonials for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- Orders
create type public.order_status as enum ('pending', 'paid', 'shipped', 'delivered', 'cancelled');

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique default ('MO-' || to_char(now(), 'YYMMDD') || '-' || lpad((floor(random() * 10000))::text, 4, '0')),
  user_id uuid references auth.users(id) on delete set null,
  customer_email text not null,
  customer_name text not null,
  customer_phone text,
  shipping_address text not null,
  shipping_city text not null,
  shipping_state text not null,
  shipping_pincode text not null,
  subtotal_inr integer not null check (subtotal_inr >= 0),
  shipping_inr integer not null default 0 check (shipping_inr >= 0),
  total_inr integer not null check (total_inr >= 0),
  status public.order_status not null default 'pending',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Users can view their own orders"
  on public.orders for select
  to authenticated
  using (user_id = auth.uid());

create policy "Authenticated users can create orders"
  on public.orders for insert
  to authenticated
  with check (user_id = auth.uid() or user_id is null);

create policy "Admins can view all orders"
  on public.orders for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update orders"
  on public.orders for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create trigger orders_touch_updated_at
  before update on public.orders
  for each row execute function public.touch_updated_at();

-- Order items
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  product_image text,
  unit_price_inr integer not null check (unit_price_inr >= 0),
  quantity integer not null check (quantity > 0),
  line_total_inr integer not null check (line_total_inr >= 0),
  created_at timestamptz not null default now()
);

alter table public.order_items enable row level security;

create policy "Users can view their own order items"
  on public.order_items for select
  to authenticated
  using (
    exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid())
  );

create policy "Users can insert order items for their own orders"
  on public.order_items for insert
  to authenticated
  with check (
    exists (select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or o.user_id is null))
  );

create policy "Admins can view all order items"
  on public.order_items for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can manage order items"
  on public.order_items for all
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create index on public.order_items(order_id);
create index on public.products(category) where is_active = true;
create index on public.orders(user_id);
create index on public.orders(status);
