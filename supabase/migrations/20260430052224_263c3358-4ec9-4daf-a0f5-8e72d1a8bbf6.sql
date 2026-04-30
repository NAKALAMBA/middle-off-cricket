COMMENT ON TABLE public.products IS 'Storefront products catalog';
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';