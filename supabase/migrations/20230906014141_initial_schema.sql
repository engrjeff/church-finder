create table "public"."churches" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "address" text not null,
    "created_at" timestamp with time zone default now()
);


alter table "public"."churches" enable row level security;

create table "public"."profiles" (
    "id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "name" text not null default ''::text,
    "avatar_url" text not null default ''::text
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX churches_pkey ON public.churches USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

alter table "public"."churches" add constraint "churches_pkey" PRIMARY KEY using index "churches_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";


