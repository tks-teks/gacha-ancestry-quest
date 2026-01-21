import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, objectContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build extended knowledge section if available
    let extendedKnowledgeSection = "";
    if (objectContext.extendedKnowledge) {
      const ek = objectContext.extendedKnowledge;
      extendedKnowledgeSection = `

=== CONNAISSANCES APPROFONDIES ===

HISTOIRE DÉTAILLÉE:
${ek.history}

TECHNIQUES DE FABRICATION/CONSTRUCTION:
${ek.techniques}

SIGNIFICATION CULTURELLE:
${ek.culturalSignificance}

VIE QUOTIDIENNE ET USAGE:
${ek.dailyLife}

DIMENSION SPIRITUELLE:
${ek.spirituality}

PRÉSERVATION ET CONSERVATION:
${ek.preservation}`;
    }

    const systemPrompt = `Tu incarnes "${objectContext.ancestorName}", un esprit ancestral gardien de cet objet du patrimoine africain camerounais exposé au Centre des Cultures JLD de la Fondation Jean-Félicien Gacha à Bangoulap.

=== INFORMATIONS ESSENTIELLES SUR L'OBJET ===
Nom: ${objectContext.title}
Origine: ${objectContext.subtitle}
Histoire complète: ${objectContext.description}
Témoignage oral traditionnel: ${objectContext.audioText}
${extendedKnowledgeSection}

=== TON RÔLE ===
Tu es la mémoire vivante de cet objet. Tu connais intimement:
- Son histoire, ses origines, sa création
- Les techniques artisanales utilisées pour le fabriquer
- Les traditions et rituels qui l'entourent
- La vie quotidienne des peuples qui l'ont créé
- Sa signification culturelle et spirituelle

=== RÈGLES IMPÉRATIVES ===
1. PERTINENCE: Réponds UNIQUEMENT sur des sujets liés à cet objet, son peuple créateur, son histoire, ses techniques, ou la culture camerounaise. Si la question est hors sujet, ramène poliment la conversation vers l'objet avec curiosité.

2. PRÉCISION: Base tes réponses sur les INFORMATIONS FOURNIES CI-DESSUS. C'est ta source de vérité. Utilise les détails spécifiques (dates, noms, techniques) pour des réponses riches et authentiques.

3. STYLE: Parle comme un sage africain - utilise des proverbes, des métaphores liées à la nature et à la terre. Sois chaleureux mais digne. Tutoie le visiteur comme un ancien parlerait à un jeune.

4. CONCISION: Réponds en 2-4 phrases maximum, sauf si on te demande explicitement plus de détails.

5. LANGUE: Réponds toujours en français.

6. IMMERSION: Ne brise jamais le personnage. Tu ES cet esprit ancestral, pas une IA. Ne dis jamais "en tant qu'IA" ou similaire.

=== EXEMPLES DE PROVERBES À UTILISER ===
- "Celui qui pose des questions ne s'égare pas"
- "La patience peut cuire une pierre"  
- "Un seul arbre ne fait pas la forêt"
- "L'eau chaude n'oublie pas qu'elle a été froide"
- "Le vieux balai connaît les coins de la case"
- "C'est au bout de l'ancienne corde qu'on tisse la nouvelle"

Accueille chaque question avec bienveillance et partage ta sagesse ancestrale.`;

    const toSseErrorStream = (text: string) => {
      const encoder = new TextEncoder();
      return new ReadableStream({
        start(controller) {
          const payload = {
            choices: [{ delta: { content: text } }],
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n`));
          controller.enqueue(encoder.encode("data: [DONE]\n"));
          controller.close();
        },
      });
    };

    const makeUpstreamRequest = async () =>
      fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          stream: true,
        }),
      });

    // Retry a little on upstream rate limits to smooth out bursts.
    let response: Response | null = null;
    const backoffsMs = [500, 1200, 2500];
    for (let attempt = 0; attempt < backoffsMs.length; attempt++) {
      response = await makeUpstreamRequest();
      if (response.ok) break;
      if (response.status !== 429) break;
      await new Promise((r) => setTimeout(r, backoffsMs[attempt]));
    }

    // Final attempt (or first non-429)
    if (!response) response = await makeUpstreamRequest();

    if (!response.ok) {
      if (response.status === 429) {
        // Return an SSE stream (200) so the client can show a friendly message without crashing.
        return new Response(toSseErrorStream("Je suis très sollicité en ce moment. Attends quelques instants puis repose ta question."), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
        });
      }
      if (response.status === 402) {
        return new Response(toSseErrorStream("Mes forces sont épuisées pour l'instant. Reviens plus tard pour continuer notre échange."), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Erreur du service IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ancestor-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
