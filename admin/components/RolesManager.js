"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Save, ShieldCheck, Trash2, X } from "lucide-react";

const ACTIONS = ["view", "create", "edit", "delete"];
const LABELS = {
  dashboard: "Overview",
  fleet: "Fleet",
  services: "Services",
  destinations: "Destinations",
  sales: "Sales",
  roles: "Roles",
  admins: "Admin accounts",
};

const EMPTY_PERMISSIONS = Object.fromEntries(
  Object.keys(LABELS).map((module) => [module, Object.fromEntries(ACTIONS.map((action) => [action, false]))])
);

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Request failed.");
  return result;
}

export default function RolesManager({ notify }) {
  const [roles, setRoles] = useState([]);
  const [modules, setModules] = useState(Object.keys(LABELS));
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", permissions: EMPTY_PERMISSIONS });
  const [busy, setBusy] = useState(false);

  const reload = useCallback(async () => {
    const result = await request("/api/admin/roles");
    setRoles(result.roles);
    setModules(result.modules);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      reload().catch((error) => notify(error.message, "error"));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [reload, notify]);

  function openEditor(role = null) {
    setEditing(role ? { id: role.id, isNew: false } : { id: null, isNew: true });
    setForm({
      name: role?.name || "",
      description: role?.description || "",
      permissions: {
        ...EMPTY_PERMISSIONS,
        ...(role?.permissions || {}),
      },
    });
  }

  function togglePermission(module, action) {
    setForm((current) => ({
      ...current,
      permissions: {
        ...current.permissions,
        [module]: {
          ...current.permissions[module],
          [action]: !current.permissions[module]?.[action],
        },
      },
    }));
  }

  async function save(event) {
    event.preventDefault();
    setBusy(true);
    try {
      await request("/api/admin/roles", {
        method: editing.isNew ? "POST" : "PATCH",
        body: JSON.stringify({ ...form, id: editing.id }),
      });
      setEditing(null);
      notify(editing.isNew ? "Role created." : "Role updated.");
      await reload();
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setBusy(false);
    }
  }

  async function remove(role) {
    if (!window.confirm(`Delete the "${role.name}" role?`)) return;
    try {
      await request(`/api/admin/roles?id=${encodeURIComponent(role.id)}`, { method: "DELETE" });
      notify("Role deleted.");
      await reload();
    } catch (error) {
      notify(error.message, "error");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-medium text-slate-500">Control which modules each admin can access.</p><h1 className="mt-1 text-3xl font-black tracking-tight">Roles &amp; permissions</h1></div>
        <button onClick={() => openEditor()} className="flex h-11 items-center gap-2 rounded-xl bg-orange-500 px-4 text-sm font-bold text-white hover:bg-orange-600"><Plus size={17} /> Create role</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((role) => (
          <section key={role.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div><div className="flex items-center gap-2"><ShieldCheck size={17} className="text-orange-500" /><h2 className="font-bold">{role.name}</h2></div><p className="mt-2 text-sm text-slate-500">{role.description || "No description"}</p><p className="mt-2 text-xs text-slate-400">{role.admin_count} assigned admin{role.admin_count === 1 ? "" : "s"}</p></div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase text-slate-500">{role.is_system ? "System" : "Custom"}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {Object.entries(role.permissions || {}).filter(([, permission]) => permission.view).map(([module]) => <span key={module} className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-semibold capitalize text-orange-700">{LABELS[module] || module}</span>)}
            </div>
            {!role.is_system && <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
              <button onClick={() => openEditor(role)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:border-orange-300 hover:text-orange-700">Edit permissions</button>
              <button onClick={() => remove(role)} aria-label={`Delete ${role.name}`} className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"><Trash2 size={15} /></button>
            </div>}
          </section>
        ))}
      </div>
      {editing && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
        <form onSubmit={save} className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="font-bold">{editing.isNew ? "Create role" : "Edit role"}</h2><p className="mt-1 text-xs text-slate-400">Permissions are checked by the backend on every request.</p></div><button type="button" onClick={() => setEditing(null)} aria-label="Close" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={18} /></button></div>
          <div className="space-y-4 overflow-auto p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-bold text-slate-600">Role name<input required maxLength={80} value={form.name} onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-orange-500" /></label>
              <label className="text-xs font-bold text-slate-600">Description<input maxLength={500} value={form.description} onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))} className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-orange-500" /></label>
            </div>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Module</th>{ACTIONS.map((action) => <th key={action} className="px-3 py-3 text-center capitalize">{action}</th>)}</tr></thead>
                <tbody className="divide-y divide-slate-100">{modules.map((module) => <tr key={module}>
                  <th className="px-4 py-3 font-semibold">{LABELS[module] || module}</th>
                  {ACTIONS.map((action) => <td key={action} className="px-3 py-3 text-center"><input type="checkbox" checked={form.permissions[module]?.[action] === true} onChange={() => togglePermission(module, action)} aria-label={`${action} ${LABELS[module] || module}`} className="h-4 w-4 accent-orange-500" /></td>)}
                </tr>)}</tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t border-slate-100 p-4"><button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold">Cancel</button><button disabled={busy} className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"><Save size={16} /> {busy ? "Saving…" : "Save role"}</button></div>
        </form>
      </div>}
    </div>
  );
}
