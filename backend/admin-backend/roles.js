import { pool, query } from "../shared/db.js";
import { adminError, requireAdmin, requireSameOrigin } from "./security.js";

const MODULES = ["dashboard", "fleet", "services", "destinations", "sales", "roles", "admins"];
const ACTIONS = ["view", "create", "edit", "delete"];
const COLUMN_BY_ACTION = {
  view: "can_view",
  create: "can_create",
  edit: "can_edit",
  delete: "can_delete",
};

function normalizePermissions(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const permissions = [];
  for (const [module, actions] of Object.entries(input)) {
    if (!MODULES.includes(module) || !actions || typeof actions !== "object" || Array.isArray(actions)) return null;
    if (Object.keys(actions).some((action) => !ACTIONS.includes(action))) return null;
    permissions.push({
      module,
      ...Object.fromEntries(ACTIONS.map((action) => [action, actions[action] === true])),
    });
  }
  return permissions;
}

async function savePermissions(client, roleId, permissions) {
  await client.query("DELETE FROM admin_role_permissions WHERE role_id = $1", [roleId]);
  for (const permission of permissions) {
    await client.query(
      `INSERT INTO admin_role_permissions
       (role_id, module_key, can_view, can_create, can_edit, can_delete)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        roleId,
        permission.module,
        permission.view,
        permission.create,
        permission.edit,
        permission.delete,
      ]
    );
  }
}

export async function GET() {
  const access = await requireAdmin({ superadmin: true });
  if (access.response) return access.response;
  try {
    const [roles, permissions] = await Promise.all([
      query(
        `SELECT r.id, r.name, r.description, r.is_system, r.created_at,
          COUNT(a.id)::int AS admin_count
         FROM admin_roles r LEFT JOIN admin_users a ON a.role_id = r.id
         GROUP BY r.id ORDER BY r.is_system DESC, r.name`
      ),
      query(
        `SELECT role_id, module_key, can_view, can_create, can_edit, can_delete
         FROM admin_role_permissions ORDER BY module_key`
      ),
    ]);
    const byRole = new Map(roles.rows.map((role) => [role.id, { ...role, permissions: {} }]));
    for (const permission of permissions.rows) {
      byRole.get(permission.role_id)?.permissions && (byRole.get(permission.role_id).permissions[permission.module_key] = {
        view: permission.can_view,
        create: permission.can_create,
        edit: permission.can_edit,
        delete: permission.can_delete,
      });
    }
    return Response.json({ roles: [...byRole.values()], modules: MODULES, actions: ACTIONS });
  } catch (error) {
    return adminError(error, "Role list failed");
  }
}

export async function POST(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const access = await requireAdmin({ superadmin: true });
  if (access.response) return access.response;
  const client = await pool.connect();
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const permissions = normalizePermissions(body.permissions);
    if (!name || name.length > 80 || !permissions) {
      return Response.json({ error: "Enter a role name (up to 80 characters) and valid module permissions." }, { status: 400 });
    }
    await client.query("BEGIN");
    const result = await client.query(
      "INSERT INTO admin_roles (name, description) VALUES ($1, $2) RETURNING id, name, description, is_system, created_at",
      [name, typeof body.description === "string" ? body.description.trim().slice(0, 500) : ""]
    );
    await savePermissions(client, result.rows[0].id, permissions);
    await client.query("COMMIT");
    return Response.json({ role: { ...result.rows[0], permissions: Object.fromEntries(permissions.map(({ module, ...actions }) => [module, actions])) } }, { status: 201 });
  } catch (error) {
    await client.query("ROLLBACK");
    if (error.code === "23505") return Response.json({ error: "A role with that name already exists." }, { status: 409 });
    return adminError(error, "Role creation failed");
  } finally {
    client.release();
  }
}

export async function PATCH(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const access = await requireAdmin({ superadmin: true });
  if (access.response) return access.response;
  const client = await pool.connect();
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const permissions = normalizePermissions(body.permissions);
    if (!body.id || !name || name.length > 80 || !permissions) {
      return Response.json({ error: "Role ID, name (up to 80 characters) and valid module permissions are required." }, { status: 400 });
    }
    await client.query("BEGIN");
    const result = await client.query(
      `UPDATE admin_roles SET name = $1, description = $2
       WHERE id = $3 AND is_system = FALSE
       RETURNING id, name, description, is_system, created_at`,
      [name, typeof body.description === "string" ? body.description.trim().slice(0, 500) : "", body.id]
    );
    if (!result.rowCount) {
      await client.query("ROLLBACK");
      return Response.json({ error: "Role not found or protected." }, { status: 404 });
    }
    await savePermissions(client, body.id, permissions);
    await client.query("COMMIT");
    return Response.json({ role: { ...result.rows[0], permissions: Object.fromEntries(permissions.map(({ module, ...actions }) => [module, actions])) } });
  } catch (error) {
    await client.query("ROLLBACK");
    if (error.code === "23505") return Response.json({ error: "A role with that name already exists." }, { status: 409 });
    return adminError(error, "Role update failed");
  } finally {
    client.release();
  }
}

export async function DELETE(request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const access = await requireAdmin({ superadmin: true });
  if (access.response) return access.response;
  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return Response.json({ error: "Role ID is required." }, { status: 400 });
    const assigned = await query("SELECT 1 FROM admin_users WHERE role_id = $1 LIMIT 1", [id]);
    if (assigned.rowCount) return Response.json({ error: "Reassign admins before deleting this role." }, { status: 409 });
    const result = await query("DELETE FROM admin_roles WHERE id = $1 AND is_system = FALSE RETURNING id", [id]);
    if (!result.rowCount) return Response.json({ error: "Role not found or protected." }, { status: 404 });
    return Response.json({ success: true });
  } catch (error) {
    return adminError(error, "Role deletion failed");
  }
}
