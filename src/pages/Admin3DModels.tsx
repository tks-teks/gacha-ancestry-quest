import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Object3DViewer } from "@/components/Object3DViewer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Upload,
  Settings2,
  Eye,
  Save,
  Trash2,
  Plus,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Loader2,
  Maximize2,
  Box,
} from "lucide-react";
import { toast } from "sonner";
import { heritageObjects } from "@/data/heritageObjects";
import { objectAnnotations, type Annotation3D } from "@/data/annotations3D";
import { extractSketchfabUrl } from "@/lib/sketchfab";
import { supabase } from "@/integrations/supabase/client";

interface HeritageModelRow {
  id?: string;
  object_id: string;
  model_glb_url: string | null;
  model_usdz_url: string | null;
  source_type: "url" | "storage" | "sketchfab" | null;
  ar_placement: string;
  ar_scale: string;
  shadow_intensity: number;
  shadow_softness: number;
  interpolation_decay: number;
  exposure: number;
  xr_environment: boolean;
  initial_scale: number;
  annotations: Annotation3D[];
}

const DEFAULT_ROW = (objectId: string): HeritageModelRow => ({
  object_id: objectId,
  model_glb_url: "",
  model_usdz_url: "",
  source_type: "url",
  ar_placement: "floor",
  ar_scale: "fixed",
  shadow_intensity: 1.5,
  shadow_softness: 1.0,
  interpolation_decay: 200,
  exposure: 1.0,
  xr_environment: true,
  initial_scale: 1.0,
  annotations: [],
});

const truncate = (s?: string | null, n = 40) =>
  !s ? "—" : s.length > n ? s.slice(0, n) + "…" : s;

export default function Admin3DModels() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const preselectId = params.get("objectId");

  const [rows, setRows] = useState<Record<string, HeritageModelRow>>({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<HeritageModelRow | null>(null);
  const [previewing, setPreviewing] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("heritage_models")
      .select("*");
    if (error) {
      toast.error("Erreur de chargement: " + error.message);
    }
    const map: Record<string, HeritageModelRow> = {};
    (data || []).forEach((r: any) => {
      map[r.object_id] = { ...r, annotations: r.annotations || [] };
    });
    setRows(map);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    if (preselectId && !loading) {
      openEdit(preselectId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preselectId, loading]);

  const openEdit = (objectId: string) => {
    const existing = rows[objectId];
    if (existing) {
      setEditing({ ...existing, annotations: existing.annotations || [] });
    } else {
      // Pre-seed with current data from heritageObjects + annotations3D
      const obj = heritageObjects.find((o) => o.id === objectId);
      const anns =
        objectAnnotations.find((o) => o.objectId === objectId)?.annotations ||
        [];
      const seed = DEFAULT_ROW(objectId);
      seed.model_glb_url = obj?.model3dUrl || "";
      seed.model_usdz_url = obj?.iosModelUrl || "";
      seed.annotations = anns;
      setEditing(seed);
    }
  };

  const openNew = () => {
    // Empty mode: no object preselected, defaults
    setEditing(DEFAULT_ROW(""));
  };

  const hasAnyModel = Object.values(rows).some(
    (r) => r.model_glb_url || r.model_usdz_url,
  );

  const statusBadge = (objectId: string) => {
    const row = rows[objectId];
    const obj = heritageObjects.find((o) => o.id === objectId);
    const glb = row?.model_glb_url || obj?.model3dUrl;
    const usdz = row?.model_usdz_url || obj?.iosModelUrl;
    if (objectId === "sculpture-recyclee" && !glb) {
      return (
        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/40">
          ⚙️ Procédural R3F
        </Badge>
      );
    }
    if (glb && usdz)
      return (
        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/40">
          🍎 GLB + USDZ
        </Badge>
      );
    if (glb)
      return (
        <Badge className="bg-green-500/20 text-green-300 border-green-500/40">
          ✅ Modèle GLB
        </Badge>
      );
    return (
      <Badge className="bg-red-500/20 text-red-300 border-red-500/40">
        ❌ Aucun modèle
      </Badge>
    );
  };

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-6 pb-24">
        <Button
          variant="ghost"
          onClick={() => navigate("/a-propos")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour
        </Button>

        <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Gestion des Modèles 3D
            </h1>
            <p className="text-muted-foreground mt-2">
              Ajoutez et associez des modèles GLB/USDZ aux objets patrimoine
            </p>
          </div>
          <Button
            onClick={openNew}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 py-3 font-serif shadow-lg hover:shadow-primary/40 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 mr-2" /> Ajouter un modèle 3D
          </Button>
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {!hasAnyModel && (
              <Card className="bg-card/40 border-dashed border-primary/30 mb-6">
                <CardContent className="p-8 text-center space-y-3">
                  <Box className="w-20 h-20 mx-auto text-primary/40" />
                  <h3 className="font-serif text-xl text-foreground">
                    Aucun modèle 3D configuré
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Commencez par assigner un modèle GLB à un objet patrimoine
                    pour activer la réalité augmentée.
                  </p>
                  <Button
                    onClick={openNew}
                    className="bg-primary text-primary-foreground rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" /> Ajouter le premier modèle
                  </Button>
                </CardContent>
              </Card>
            )}
            <div className="grid gap-4 md:grid-cols-2">
            {heritageObjects.map((obj) => {
              const row = rows[obj.id];
              const glb = row?.model_glb_url || obj.model3dUrl;
              const hasModel = !!glb;
              return (
                <Card
                  key={obj.id}
                  className="bg-card/60 backdrop-blur border-border"
                >
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif font-semibold text-lg text-foreground">
                          {obj.title}
                        </h3>
                        <p className="text-xs font-mono text-muted-foreground">
                          {obj.id}
                        </p>
                      </div>
                      {statusBadge(obj.id)}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground bg-muted/30 rounded p-2 break-all">
                      {truncate(glb || "Aucune URL", 60)}
                    </div>
                    <div className="flex gap-2">
                      {hasModel ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(obj.id)}
                        >
                          <Settings2 className="w-4 h-4 mr-1" /> Modifier
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(obj.id)}
                          className="border-primary/50 text-primary hover:bg-primary/10"
                        >
                          <Box className="w-4 h-4 mr-1" /> Assigner un modèle
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setPreviewing(obj.id)}
                        disabled={!glb}
                      >
                        <Eye className="w-4 h-4 mr-1" /> Prévisualiser
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            </div>
          </>
        )}
      </div>

      {/* Edit Sheet */}
      <Sheet open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl overflow-y-auto"
        >
          {editing && (
            <ModelEditor
              row={editing}
              onChange={setEditing}
              onSaved={() => {
                setEditing(null);
                fetchAll();
              }}
              onClose={() => setEditing(null)}
            />
          )}
        </SheetContent>
      </Sheet>

      {/* Preview Dialog */}
      <Dialog
        open={!!previewing}
        onOpenChange={(o) => !o && setPreviewing(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Prévisualisation</DialogTitle>
          </DialogHeader>
          {previewing && (
            <PreviewBlock
              objectId={previewing}
              row={rows[previewing]}
            />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
}

function PreviewBlock({
  objectId,
  row,
}: {
  objectId: string;
  row?: HeritageModelRow;
}) {
  const obj = heritageObjects.find((o) => o.id === objectId);
  const glb = row?.model_glb_url || obj?.model3dUrl;
  const usdz = row?.model_usdz_url || obj?.iosModelUrl;
  return (
    <div className="h-[500px]">
      <Object3DViewer
        modelUrl={glb || undefined}
        iosModelUrl={usdz || undefined}
        alt={obj?.title || ""}
        showARButton={false}
      />
    </div>
  );
}

function ModelEditor({
  row,
  onChange,
  onSaved,
  onClose,
}: {
  row: HeritageModelRow;
  onChange: (r: HeritageModelRow) => void;
  onSaved: () => void;
  onClose: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sketchfabInput, setSketchfabInput] = useState("");
  const [previewStatus, setPreviewStatus] = useState<
    "idle" | "loading" | "ok" | "error"
  >("idle");
  const [debouncedUrl, setDebouncedUrl] = useState(row.model_glb_url || "");
  const [fullPreview, setFullPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Debounce URL changes for live preview
  useEffect(() => {
    const t = setTimeout(() => setDebouncedUrl(row.model_glb_url || ""), 800);
    return () => clearTimeout(t);
  }, [row.model_glb_url]);

  useEffect(() => {
    if (debouncedUrl) setPreviewStatus("loading");
    else setPreviewStatus("idle");
  }, [debouncedUrl]);

  const update = (patch: Partial<HeritageModelRow>) =>
    onChange({ ...row, ...patch });

  const updateAnnotation = (i: number, patch: Partial<Annotation3D>) => {
    const next = [...row.annotations];
    next[i] = { ...next[i], ...patch };
    update({ annotations: next });
  };

  const addAnnotation = () =>
    update({
      annotations: [
        ...row.annotations,
        {
          id: `ann-${Date.now()}`,
          title: "Nouvelle annotation",
          description: "",
          position: "0m 0m 0m",
          normal: "0m 1m 0m",
        },
      ],
    });

  const removeAnnotation = (i: number) =>
    update({ annotations: row.annotations.filter((_, idx) => idx !== i) });

  const handleFile = async (file: File) => {
    if (file.size > 50 * 1024 * 1024) {
      toast.error("Fichier trop volumineux (max 50 MB)");
      return;
    }
    if (!/\.(glb|gltf|usdz)$/i.test(file.name)) {
      toast.error("Format non supporté (.glb, .gltf, .usdz uniquement)");
      return;
    }
    setUploading(true);
    setProgress(10);
    try {
      const path = `public/${row.object_id}/${file.name}`;
      const { error } = await supabase.storage
        .from("modeles-3d")
        .upload(path, file, { cacheControl: "3600", upsert: true });
      setProgress(80);
      if (error) throw error;
      const { data: urlData } = supabase.storage
        .from("modeles-3d")
        .getPublicUrl(path);
      const publicUrl = urlData.publicUrl;
      if (/\.usdz$/i.test(file.name)) {
        update({ model_usdz_url: publicUrl, source_type: "storage" });
      } else {
        update({ model_glb_url: publicUrl, source_type: "storage" });
      }
      toast.success("Upload réussi");
      setProgress(100);
    } catch (e: any) {
      toast.error("Erreur d'upload: " + e.message);
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1500);
    }
  };

  const save = async () => {
    setSaving(true);
    const payload = {
      object_id: row.object_id,
      model_glb_url: row.model_glb_url || null,
      model_usdz_url: row.model_usdz_url || null,
      source_type: row.source_type,
      ar_placement: row.ar_placement,
      ar_scale: row.ar_scale,
      shadow_intensity: row.shadow_intensity,
      shadow_softness: row.shadow_softness,
      interpolation_decay: row.interpolation_decay,
      exposure: row.exposure,
      xr_environment: row.xr_environment,
      initial_scale: row.initial_scale,
      annotations: row.annotations as any,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase
      .from("heritage_models")
      .upsert(payload as any, { onConflict: "object_id" });
    setSaving(false);
    if (error) {
      toast.error("Erreur: " + error.message);
      return;
    }
    toast.success("Modèle sauvegardé");
    onSaved();
  };

  const removeModel = async () => {
    if (!confirm("Supprimer le modèle de cet objet ?")) return;
    const { error } = await supabase
      .from("heritage_models")
      .upsert(
        {
          object_id: row.object_id,
          model_glb_url: null,
          model_usdz_url: null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "object_id" },
      );
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Modèle supprimé");
    onSaved();
  };

  const tryExtractSketchfab = () => {
    const u = extractSketchfabUrl(sketchfabInput);
    if (u) {
      update({ model_glb_url: u, source_type: "sketchfab" });
      toast.success("URL extraite");
    } else {
      toast.error(
        "Sketchfab nécessite un téléchargement manuel — utilisez l'URL .glb directe",
      );
    }
  };

  const targetObj = heritageObjects.find((o) => o.id === row.object_id);
  const isNew = !row.object_id;

  return (
    <>
      <SheetHeader>
        <SheetTitle className="font-serif">
          {isNew ? "Ajouter un modèle 3D" : `Modifier — ${targetObj?.title || row.object_id}`}
        </SheetTitle>
        <SheetDescription>
          Configurez le modèle GLB/USDZ et les paramètres AR
        </SheetDescription>
      </SheetHeader>

      <div className="space-y-6 py-4">
        {/* Target object */}
        <div>
          <Label>Objet patrimoine cible</Label>
          <Select
            value={row.object_id}
            onValueChange={(v) => update({ object_id: v })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un objet..." />
            </SelectTrigger>
            <SelectContent>
              {heritageObjects.map((o) => (
                <SelectItem key={o.id} value={o.id}>
                  {o.id} — {o.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {targetObj && (
            <div className="mt-3 flex items-center gap-3 p-2 rounded-lg bg-muted/30 border border-border">
              <img
                src={targetObj.coverImage || targetObj.image}
                alt={targetObj.title}
                className="w-10 h-10 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{targetObj.title}</p>
                <p className="text-xs text-muted-foreground truncate">{targetObj.id}</p>
              </div>
              {statusBadgeFor(row)}
            </div>
          )}
        </div>

        {/* Type */}
        <div>
          <Label>Type de modèle</Label>
          <RadioGroup
            value={
              row.model_glb_url && row.model_usdz_url
                ? "both"
                : row.model_usdz_url
                  ? "usdz"
                  : "glb"
            }
            onValueChange={() => {}}
            className="flex flex-col gap-2 mt-2"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="glb" id="t-glb" />
              <Label htmlFor="t-glb">Fichier GLB/GLTF</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="usdz" id="t-usdz" />
              <Label htmlFor="t-usdz">Fichier USDZ (iOS)</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="both" id="t-both" />
              <Label htmlFor="t-both">Les deux (GLB + USDZ)</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Source tabs */}
        <Tabs defaultValue="url">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="url">URL</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="sketchfab">Sketchfab</TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="space-y-3 pt-3">
            <div>
              <Label>URL du modèle GLB</Label>
              <Input
                placeholder="https://example.com/model.glb"
                value={row.model_glb_url || ""}
                onChange={(e) =>
                  update({
                    model_glb_url: e.target.value,
                    source_type: "url",
                  })
                }
              />
            </div>
            <div>
              <Label>URL du modèle USDZ (optionnel)</Label>
              <Input
                placeholder="https://example.com/model.usdz"
                value={row.model_usdz_url || ""}
                onChange={(e) => update({ model_usdz_url: e.target.value })}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Le fichier doit être accessible publiquement (CORS ouvert).
            </p>
          </TabsContent>

          <TabsContent value="upload" className="space-y-3 pt-3">
            <div
              className="border-2 border-dashed border-primary/40 rounded-lg p-6 text-center cursor-pointer hover:bg-primary/5 transition"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const f = e.dataTransfer.files?.[0];
                if (f) handleFile(f);
              }}
            >
              <Upload className="w-8 h-8 mx-auto text-primary mb-2" />
              <p className="text-sm">
                Glissez-déposez un .glb / .gltf / .usdz (max 50 MB)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                ou cliquez pour sélectionner
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".glb,.gltf,.usdz"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
            </div>
            {uploading && <Progress value={progress} />}
          </TabsContent>

          <TabsContent value="sketchfab" className="space-y-3 pt-3">
            <div>
              <Label>URL Sketchfab</Label>
              <Input
                placeholder="https://sketchfab.com/3d-models/mon-modele-xxx"
                value={sketchfabInput}
                onChange={(e) => setSketchfabInput(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" onClick={tryExtractSketchfab}>
              Extraire l'URL GLB
            </Button>
            <p className="text-xs text-muted-foreground">
              Le modèle Sketchfab doit être en téléchargement libre (CC).
              Téléchargez le .glb manuellement puis collez l'URL directe.
            </p>
          </TabsContent>
        </Tabs>

        {/* Live preview */}
        <div className="border border-border rounded-lg p-3 bg-card/40">
          <div className="flex items-center justify-between mb-2">
            <Label className="text-xs">Prévisualisation en temps réel</Label>
            <div className="flex items-center gap-2">
              {previewStatus === "loading" && (
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              )}
              {previewStatus === "ok" && (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              )}
              {previewStatus === "error" && (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7"
                onClick={() => setFullPreview(true)}
                disabled={!debouncedUrl}
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {debouncedUrl ? (
            <div className="h-[260px]">
              {(() => {
                const MV: any = "model-viewer";
                return (
                  <MV
                    key={debouncedUrl}
                    src={debouncedUrl}
                    ios-src={row.model_usdz_url || undefined}
                    camera-controls
                    auto-rotate
                    shadow-intensity={String(row.shadow_intensity)}
                    shadow-softness={String(row.shadow_softness)}
                    exposure={String(row.exposure)}
                    interpolation-decay={String(row.interpolation_decay)}
                    ar-placement={row.ar_placement}
                    ar-scale={row.ar_scale}
                    {...(row.xr_environment ? { "xr-environment": "" } : {})}
                    scale={`${row.initial_scale} ${row.initial_scale} ${row.initial_scale}`}
                    style={{ width: "100%", height: "100%" }}
                    onLoad={() => setPreviewStatus("ok")}
                    onError={() => setPreviewStatus("error")}
                  />
                );
              })()}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground py-8 text-center">
              Saisissez une URL pour voir l'aperçu
            </p>
          )}
        </div>

        {/* Advanced AR */}
        <Accordion type="single" collapsible>
          <AccordionItem value="ar">
            <AccordionTrigger>Paramètres AR avancés</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>ar-placement</Label>
                  <Select
                    value={row.ar_placement}
                    onValueChange={(v) => update({ ar_placement: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="floor">floor</SelectItem>
                      <SelectItem value="wall">wall</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>ar-scale</Label>
                  <Select
                    value={row.ar_scale}
                    onValueChange={(v) => update({ ar_scale: v })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">fixed</SelectItem>
                      <SelectItem value="auto">auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <SliderRow
                label={`shadow-intensity (${row.shadow_intensity})`}
                value={row.shadow_intensity}
                min={0}
                max={2}
                step={0.1}
                onChange={(v) => update({ shadow_intensity: v })}
              />
              <SliderRow
                label={`shadow-softness (${row.shadow_softness})`}
                value={row.shadow_softness}
                min={0}
                max={1}
                step={0.1}
                onChange={(v) => update({ shadow_softness: v })}
              />
              <SliderRow
                label={`interpolation-decay (${row.interpolation_decay})`}
                value={row.interpolation_decay}
                min={50}
                max={400}
                step={50}
                onChange={(v) => update({ interpolation_decay: v })}
              />
              <SliderRow
                label={`exposure (${row.exposure})`}
                value={row.exposure}
                min={0.5}
                max={2}
                step={0.1}
                onChange={(v) => update({ exposure: v })}
              />
              <div className="flex items-center justify-between">
                <Label>xr-environment</Label>
                <Switch
                  checked={row.xr_environment}
                  onCheckedChange={(v) => update({ xr_environment: v })}
                />
              </div>
              <div>
                <Label>Échelle initiale</Label>
                <Input
                  type="number"
                  min={0.1}
                  max={10}
                  step={0.1}
                  value={row.initial_scale}
                  onChange={(e) =>
                    update({ initial_scale: parseFloat(e.target.value) || 1 })
                  }
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="annotations">
            <AccordionTrigger>
              Annotations 3D ({row.annotations.length})
            </AccordionTrigger>
            <AccordionContent className="space-y-3 pt-2">
              {row.annotations.map((a, i) => (
                <Card key={a.id} className="bg-muted/20">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <Input
                        value={a.title}
                        onChange={(e) =>
                          updateAnnotation(i, { title: e.target.value })
                        }
                        placeholder="Titre"
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeAnnotation(i)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                    <Textarea
                      value={a.description}
                      onChange={(e) =>
                        updateAnnotation(i, { description: e.target.value })
                      }
                      placeholder="Description"
                      rows={2}
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">position (x y z)</Label>
                        <Input
                          value={a.position}
                          onChange={(e) =>
                            updateAnnotation(i, { position: e.target.value })
                          }
                          placeholder="0m 0m 0m"
                          className="font-mono text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">normal (x y z)</Label>
                        <Input
                          value={a.normal}
                          onChange={(e) =>
                            updateAnnotation(i, { normal: e.target.value })
                          }
                          placeholder="0m 1m 0m"
                          className="font-mono text-xs"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="outline" size="sm" onClick={addAnnotation}>
                <Plus className="w-4 h-4 mr-1" /> Ajouter une annotation
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-4 border-t border-border">
          <Button onClick={save} disabled={saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Sauvegarder
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={removeModel}
              className="flex-1"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Supprimer
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={fullPreview} onOpenChange={setFullPreview}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Aperçu plein écran</DialogTitle>
          </DialogHeader>
          <div className="h-[600px]">
            {debouncedUrl && (
              <Object3DViewer
                modelUrl={debouncedUrl}
                iosModelUrl={row.model_usdz_url || undefined}
                alt={row.object_id}
                showARButton={false}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <Label className="text-xs">{label}</Label>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
        className="mt-2"
      />
    </div>
  );
}
