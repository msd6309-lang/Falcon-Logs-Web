/* Falcon Logs scan relay (Cloudflare Worker).
   Keeps the Claude API key off the public app. The app sends page pictures here;
   this adds the key and forwards them to the Claude Messages API.

   Settings (Worker > Settings > Variables and Secrets):
     ANTHROPIC_API_KEY  Secret  your Claude API key
     APP_KEY            Secret  a passcode you make up; enter the same one in the app's Scan setup
     ALLOWED_ORIGINS    Text    your app's address, e.g. https://yourname.github.io  (comma-separate several)
     MODEL              Text    optional, default claude-sonnet-5-5
     EFFORT             Text    optional: low, medium (default), high, or "default" to leave it to the model */
export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim().replace(/\/+$/, "")).filter(Boolean);
    const originOk = !allowed.length || allowed.includes(origin);
    const cors = {
      "Access-Control-Allow-Origin": originOk && origin ? origin : (allowed[0] || "*"),
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, X-App-Key",
      "Access-Control-Max-Age": "86400",
      "Vary": "Origin"
    };
    const reply = (obj, status = 200) => new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (!originOk) return reply({ error: { message: "This site isn't allowed to use the scan relay. Check ALLOWED_ORIGINS." } }, 403);
    if (!env.ANTHROPIC_API_KEY) return reply({ error: { message: "ANTHROPIC_API_KEY isn't set on the relay." } }, 500);
    if (env.APP_KEY && request.headers.get("X-App-Key") !== env.APP_KEY) return reply({ error: { message: "Wrong scan passcode." } }, 401);

    const model = env.MODEL || "claude-sonnet-5-5";
    if (request.method === "GET") return reply({ ok: true, model });
    if (request.method !== "POST") return reply({ error: { message: "Use POST." } }, 405);

    let body;
    try { body = await request.json(); } catch { return reply({ error: { message: "Bad request body." } }, 400); }
    const content = Array.isArray(body.content) ? body.content.filter(c => c && ["text", "image", "document"].includes(c.type)) : [];
    if (!content.length) return reply({ error: { message: "Nothing to read." } }, 400);

    const req = {
      model,
      max_tokens: Math.min(Math.max(Number(body.max_tokens) || 16000, 1000), 32000),
      system: String(body.system || ""),
      messages: [{ role: "user", content }],
      output_config: {}
    };
    if (body.schema && typeof body.schema === "object") req.output_config.format = { type: "json_schema", schema: body.schema };
    const effort = env.EFFORT || "medium";
    if (effort !== "default") req.output_config.effort = effort;

    const call = r => fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify(r)
    });
    let res = await call(req);
    if (res.status === 400 && req.output_config.effort) {
      const t = await res.clone().text();
      if (/effort/i.test(t)) { delete req.output_config.effort; res = await call(req); }
    }
    return new Response(res.body, { status: res.status, headers: { ...cors, "Content-Type": "application/json" } });
  }
};
