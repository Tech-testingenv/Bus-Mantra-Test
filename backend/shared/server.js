import http from "node:http";
import { parseCookieHeader, requestContext } from "./cookies.js";

const MAX_BODY_BYTES = 12 * 1024 * 1024;

function compileRoute(pattern) {
  const names = [];
  const source = pattern
    .split("/")
    .map((segment) => {
      if (segment.startsWith(":")) {
        names.push(segment.slice(1));
        return "([^/]+)";
      }
      return segment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("/");
  return { regex: new RegExp(`^${source}/?$`), names };
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error("Request body too large."), { status: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers);
  res.end(body);
}

function sendJson(res, status, payload, headers = {}) {
  send(res, status, JSON.stringify(payload), { "Content-Type": "application/json", ...headers });
}

// Runs Web-standard Request/Response route handlers on a plain Node HTTP server.
export function startServer({ name, port, host = "127.0.0.1", routes }) {
  const table = routes.map(([pattern, handlers]) => ({ ...compileRoute(pattern), handlers }));

  const server = http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, `http://${req.headers.host || `${host}:${port}`}`);

      if (url.pathname === "/health") return sendJson(res, 200, { status: "ok", service: name });

      let match = null;
      for (const route of table) {
        const found = route.regex.exec(url.pathname);
        if (found) {
          match = { route, found };
          break;
        }
      }
      if (!match) return sendJson(res, 404, { error: "Not found." });

      const method = (req.method || "GET").toUpperCase();
      const handler = match.route.handlers[method];
      if (!handler) {
        const allow = Object.keys(match.route.handlers).filter((key) => /^[A-Z]+$/.test(key)).join(", ");
        return sendJson(res, 405, { error: "Method not allowed." }, { Allow: allow });
      }

      const params = {};
      match.route.names.forEach((key, index) => {
        params[key] = decodeURIComponent(match.found[index + 1]);
      });

      const hasBody = !["GET", "HEAD"].includes(method);
      const body = hasBody ? await readBody(req) : undefined;
      const headers = new Headers();
      for (const [key, value] of Object.entries(req.headers)) {
        if (value === undefined) continue;
        headers.set(key, Array.isArray(value) ? value.join(", ") : value);
      }
      const request = new Request(url, { method, headers, body: body?.length ? body : undefined });

      const context = { incoming: parseCookieHeader(req.headers.cookie), outgoing: [] };
      const response = await requestContext.run(context, () => handler(request, { params: Promise.resolve(params) }));

      const responseHeaders = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
      if (context.outgoing.length) responseHeaders["set-cookie"] = context.outgoing;
      send(res, response.status, Buffer.from(await response.arrayBuffer()), responseHeaders);
    } catch (error) {
      if (error?.status === 413) return sendJson(res, 413, { error: "Request body too large." });
      console.error(`[${name}] Unhandled error:`, error);
      if (!res.headersSent) sendJson(res, 500, { error: "Internal server error." });
    }
  });

  server.listen(port, host, () => console.log(`[${name}] listening on http://${host}:${port}`));
  return server;
}
