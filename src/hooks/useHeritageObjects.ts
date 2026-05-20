import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { heritageObjects as staticObjects, type HeritageObject } from "@/data/heritageObjects";
import caseObusMousgoumImage from "@/assets/case-obus-mousgoum.jpg";
import sculptureRecycleeImage from "@/assets/sculpture-recyclee.jpg";

const STATIC_IMAGE_MAP: Record<string, string> = {
  "case-obus-mousgoum": caseObusMousgoumImage,
  "sculpture-recyclee": sculptureRecycleeImage,
};

/** Resolve image: full URL/data URI -> as is, known key -> static asset, else placeholder */
export const resolveImage = (image?: string | null): string => {
  if (!image) return "/placeholder.svg";
  if (/^(https?:|data:|\/)/i.test(image)) return image;
  return STATIC_IMAGE_MAP[image] || "/placeholder.svg";
};

const rowToObject = (r: any): HeritageObject | null => {
  if (!r?.object_id) return null;
  const stat = staticObjects.find(o => o.id === r.object_id);
  return {
    id: r.object_id,
    title: r.title || stat?.title || r.object_id,
    subtitle: r.subtitle || stat?.subtitle || "",
    description: r.description || stat?.description || "",
    audioText: r.audio_text || stat?.audioText || "",
    image: r.image_url || stat?.image || r.object_id,
    ancestorName: r.ancestor_name || stat?.ancestorName || "Esprit Ancestral",
    ancestorGreeting: r.ancestor_greeting || stat?.ancestorGreeting || "",
    model3dUrl: r.model_glb_url || stat?.model3dUrl,
    iosModelUrl: r.model_usdz_url || stat?.iosModelUrl,
    extendedKnowledge: (r.extended_knowledge && Object.keys(r.extended_knowledge).length
      ? r.extended_knowledge
      : stat?.extendedKnowledge) as HeritageObject["extendedKnowledge"],
  };
};

export const useHeritageObjects = () => {
  const [objects, setObjects] = useState<HeritageObject[]>(staticObjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.from("heritage_models").select("*");
      if (!mounted) return;
      const map = new Map<string, HeritageObject>();
      staticObjects.forEach(o => map.set(o.id, o));
      (data || []).forEach((r: any) => {
        const obj = rowToObject(r);
        if (obj) map.set(obj.id, obj);
      });
      setObjects(Array.from(map.values()));
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  return { objects, loading };
};

export const useHeritageObject = (id?: string) => {
  const [object, setObject] = useState<HeritageObject | undefined>(
    staticObjects.find(o => o.id === id)
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) { setLoading(false); return; }
    let mounted = true;
    (async () => {
      const { data } = await supabase
        .from("heritage_models")
        .select("*")
        .eq("object_id", id)
        .maybeSingle();
      if (!mounted) return;
      const stat = staticObjects.find(o => o.id === id);
      if (data) {
        setObject(rowToObject(data) || stat);
      } else {
        setObject(stat);
      }
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, [id]);

  return { object, loading };
};
