
CREATE TABLE public.heritage_models (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  object_id       text NOT NULL UNIQUE,
  model_glb_url   text,
  model_usdz_url  text,
  source_type     text CHECK (source_type IN ('url','storage','sketchfab')),
  ar_placement    text DEFAULT 'floor',
  ar_scale        text DEFAULT 'fixed',
  shadow_intensity float DEFAULT 1.5,
  shadow_softness  float DEFAULT 1.0,
  interpolation_decay int DEFAULT 200,
  exposure        float DEFAULT 1.0,
  xr_environment  boolean DEFAULT true,
  initial_scale   float DEFAULT 1.0,
  annotations     jsonb DEFAULT '[]',
  updated_at      timestamptz DEFAULT now()
);

ALTER TABLE public.heritage_models ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read heritage_models"
  ON public.heritage_models FOR SELECT USING (true);

CREATE POLICY "Public insert heritage_models"
  ON public.heritage_models FOR INSERT WITH CHECK (true);

CREATE POLICY "Public update heritage_models"
  ON public.heritage_models FOR UPDATE USING (true);

CREATE POLICY "Public delete heritage_models"
  ON public.heritage_models FOR DELETE USING (true);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'modeles-3d',
  'modeles-3d',
  true,
  52428800,
  ARRAY['model/gltf-binary','model/gltf+json','application/octet-stream','model/vnd.usdz+zip']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY "Public read modeles-3d"
  ON storage.objects FOR SELECT USING (bucket_id = 'modeles-3d');

CREATE POLICY "Public upload modeles-3d"
  ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'modeles-3d');

CREATE POLICY "Public update modeles-3d"
  ON storage.objects FOR UPDATE USING (bucket_id = 'modeles-3d');

CREATE POLICY "Public delete modeles-3d"
  ON storage.objects FOR DELETE USING (bucket_id = 'modeles-3d');
