alter table public.about
  add column if not exists hero_stats jsonb not null default '[
    {"value":"01","label":"Year of experience"},
    {"value":"20+","label":"Reusable components"},
    {"value":"50+","label":"APIs in one platform"},
    {"value":"80+","label":"Problems solved"}
  ]'::jsonb,
  add column if not exists tech_ticker jsonb not null default '[
    "Node.js",
    "AI workflows",
    "TypeScript",
    "Product thinking",
    "React",
    "Next.js"
  ]'::jsonb;
