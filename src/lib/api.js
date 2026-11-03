export function jsonError(message, status = 400) {
  return Response.json({ error: message }, { status });
}

export function requireFields(body, fields) {
  const missing = fields.filter((field) => !body?.[field]);
  if (missing.length) {
    const error = new Error(`Missing required fields: ${missing.join(", ")}`);
    error.status = 400;
    throw error;
  }
}
