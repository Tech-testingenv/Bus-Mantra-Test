import { AsyncLocalStorage } from "node:async_hooks";

export const requestContext = new AsyncLocalStorage();

export function parseCookieHeader(header = "") {
  const jar = new Map();
  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index < 1) continue;
    const name = part.slice(0, index).trim();
    try {
      jar.set(name, decodeURIComponent(part.slice(index + 1).trim()));
    } catch {
      jar.set(name, part.slice(index + 1).trim());
    }
  }
  return jar;
}

function serializeCookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value)}`];
  parts.push(`Path=${options.path || "/"}`);
  if (options.maxAge !== undefined) {
    parts.push(`Max-Age=${options.maxAge}`);
    if (options.maxAge <= 0) parts.push("Expires=Thu, 01 Jan 1970 00:00:00 GMT");
  }
  if (options.httpOnly) parts.push("HttpOnly");
  if (options.secure) parts.push("Secure");
  if (options.sameSite) parts.push(`SameSite=${options.sameSite[0].toUpperCase()}${options.sameSite.slice(1)}`);
  return parts.join("; ");
}

// Same shape as the cookies() helper the handlers were written against.
export async function cookies() {
  const context = requestContext.getStore();
  if (!context) throw new Error("cookies() was called outside of a request.");
  return {
    get(name) {
      const value = context.incoming.get(name);
      return value === undefined ? undefined : { name, value };
    },
    set(name, value, options) {
      context.outgoing.push(serializeCookie(name, value, options));
    },
    delete(name) {
      context.outgoing.push(serializeCookie(name, "", { maxAge: 0 }));
    },
  };
}
