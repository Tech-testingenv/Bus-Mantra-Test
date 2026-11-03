"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FleetManagerPanel from "./FleetManagerPanel";
import {
  Activity,
  Bus,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  Database,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Menu,
  Plus,
  RefreshCw,
  Save,
  Search,
  ShieldCheck,
  Trash2,
  Users,
  X,
} from "lucide-react";

const NAVIGATION = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "bookings", label: "Bookings", icon: CalendarDays },
  { id: "inquiries", label: "Enquiries", icon: ClipboardList },
  { id: "fleet-management", label: "Fleet management", icon: Bus },
  { id: "admins", label: "Admin accounts", icon: Users, superadmin: true },
];

const CATALOGS = [
  { id: "fleets", label: "Fleets" },
  { id: "destinations", label: "Destinations" },
  { id: "services", label: "Services" },
];

const STATUS_OPTIONS = {
  bookings: ["new", "contacted", "confirmed", "cancelled", "completed"],
  inquiries: ["new", "contacted", "resolved", "cancelled"],
};

const EMPTY_STATS = {
  bookings: 0,
  new_bookings: 0,
  inquiries: 0,
  new_inquiries: 0,
  customers: 0,
  fleets: 0,
  destinations: 0,
  services: 0,
};

function displayValue(value) {
  if (value == null || value === "") return "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function formatDate(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Request failed.");
  return result;
}

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = await apiRequest("/api/admin/auth", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      onLogin(result.admin);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3f5f9] px-4 py-10">
      <section className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-[0_24px_80px_rgba(15,23,42,0.14)] md:grid-cols-[1fr_1fr]">
        <div className="relative hidden min-h-[540px] flex-col justify-between overflow-hidden bg-[#111827] p-10 text-white md:flex">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-orange-500/25 blur-3xl" />
          <div className="relative flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500"><Bus size={23} /></span>
            <span className="text-lg font-black tracking-wide">BUS MANTRA</span>
          </div>
          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-400">Administration portal</p>
            <h1 className="mt-4 text-4xl font-black leading-tight">Every journey.<br />Under control.</h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Manage bookings, enquiries, the public catalog and team access from one secure workspace.
            </p>
          </div>
          <div className="relative flex items-center gap-2 text-xs text-white/50">
            <ShieldCheck size={16} className="text-orange-400" /> Secure staff access
          </div>
        </div>
        <div className="flex min-h-[540px] flex-col justify-center p-7 sm:p-12">
          <div className="mb-8 md:hidden">
            <div className="flex items-center gap-3 text-lg font-black text-slate-900">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white"><Bus size={21} /></span>
              BUS MANTRA
            </div>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-600">Admin access</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Sign in to continue</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">Use your assigned admin username and password.</p>
          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block text-sm font-semibold text-slate-700">
              Username
              <input autoComplete="username" required value={username} onChange={(event) => setUsername(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10" placeholder="superadmin@busmantra.com" />
            </label>
            <label className="block text-sm font-semibold text-slate-700">
              Password
              <input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10" placeholder="Enter password" />
            </label>
            {error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
            <button disabled={busy} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 font-bold text-white transition hover:bg-orange-600 disabled:cursor-wait disabled:opacity-70">
              {busy ? <LoaderCircle className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
              Secure sign in
            </button>
          </form>
          <p className="mt-7 text-center text-xs text-slate-400">Admin access is monitored and session protected.</p>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value, subLabel, icon: Icon, tone }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-400">{subLabel}</p>
        </div>
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}><Icon size={20} /></span>
      </div>
    </div>
  );
}

function Dashboard({ data, onNavigate }) {
  const stats = data?.stats || EMPTY_STATS;
  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm font-medium text-slate-500">Your operation at a glance</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Overview</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total bookings" value={stats.bookings} subLabel={`${stats.new_bookings} need attention`} icon={CalendarDays} tone="bg-orange-50 text-orange-600" />
        <StatCard label="Enquiries" value={stats.inquiries} subLabel={`${stats.new_inquiries} new messages`} icon={ClipboardList} tone="bg-blue-50 text-blue-600" />
        <StatCard label="Customers" value={stats.customers} subLabel="Registered accounts" icon={Users} tone="bg-violet-50 text-violet-600" />
        <StatCard label="Catalog items" value={Number(stats.fleets) + Number(stats.destinations) + Number(stats.services)} subLabel={`${stats.fleets} fleets · ${stats.destinations} destinations · ${stats.services} services`} icon={Database} tone="bg-emerald-50 text-emerald-600" />
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div><h2 className="font-bold text-slate-900">Recent bookings</h2><p className="mt-0.5 text-xs text-slate-400">Latest customer requests</p></div>
            <button onClick={() => onNavigate("bookings")} className="text-xs font-bold text-orange-600 hover:text-orange-700">View all</button>
          </div>
          <div className="divide-y divide-slate-100">
            {data?.recentBookings?.length ? data.recentBookings.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800">{item.full_name}</p><p className="mt-0.5 truncate text-xs text-slate-400">{item.pickup_point} · {item.passengers} passengers</p></div>
                <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold uppercase text-orange-700">{item.status}</span>
              </div>
            )) : <p className="px-5 py-8 text-center text-sm text-slate-400">No bookings yet.</p>}
          </div>
        </section>
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div><h2 className="font-bold text-slate-900">Recent enquiries</h2><p className="mt-0.5 text-xs text-slate-400">Messages and partner requests</p></div>
            <button onClick={() => onNavigate("inquiries")} className="text-xs font-bold text-orange-600 hover:text-orange-700">View all</button>
          </div>
          <div className="divide-y divide-slate-100">
            {data?.recentInquiries?.length ? data.recentInquiries.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-800">{item.full_name}</p><p className="mt-0.5 truncate text-xs text-slate-400">{item.subject || item.type} · {item.email || item.phone || "No contact"}</p></div>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase text-blue-700">{item.status}</span>
              </div>
            )) : <p className="px-5 py-8 text-center text-sm text-slate-400">No enquiries yet.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}

function RecordTable({ kind, records, onStatusChange }) {
  const isBooking = kind === "bookings";
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left">
        <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-400">
          <tr>{(isBooking ? ["Customer / Route", "Trip", "Contact", "Created", "Status"] : ["Enquiry", "Type", "Contact", "Created", "Status"]).map((title) => <th key={title} className="px-5 py-3 font-bold">{title}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {records.map((row) => (
            <tr key={row.id} className="align-top hover:bg-slate-50/70">
              <td className="px-5 py-4">
                <p className="font-semibold text-slate-800">{row.full_name}</p>
                <p className="mt-1 max-w-56 truncate text-xs text-slate-400">{isBooking ? `${row.pickup_point} → ${(row.destinations || []).join(", ")}` : row.subject || row.id}</p>
              </td>
              <td className="px-5 py-4 text-sm text-slate-600">{isBooking ? <><span>{row.passengers} passengers</span><p className="mt-1 text-xs text-slate-400">{row.departure_at}</p></> : <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold capitalize">{row.type}</span>}</td>
              <td className="px-5 py-4 text-sm text-slate-600">{row.email || row.phone || row.mobile || "—"}<p className="mt-1 text-xs text-slate-400">{row.mobile || row.phone || ""}</p></td>
              <td className="px-5 py-4 whitespace-nowrap text-xs text-slate-500">{formatDate(row.created_at)}</td>
              <td className="px-5 py-4">
                <select aria-label={`Update status for ${row.full_name}`} value={row.status} onChange={(event) => onStatusChange(row.id, event.target.value)} className="rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold capitalize text-slate-700 outline-none focus:border-orange-500">
                  {STATUS_OPTIONS[kind].map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!records.length && <p className="py-14 text-center text-sm text-slate-400">No records match your search.</p>}
    </div>
  );
}

function AdminAccounts({ admins, reload, notify }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function createAdmin(event) {
    event.preventDefault();
    setBusy(true);
    try {
      await apiRequest("/api/admin/admins", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      setUsername("");
      setPassword("");
      notify("Admin account created.");
      await reload();
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setBusy(false);
    }
  }

  async function toggleAdmin(admin) {
    try {
      await apiRequest("/api/admin/admins", {
        method: "PATCH",
        body: JSON.stringify({ id: admin.id, isActive: !admin.is_active }),
      });
      notify(admin.is_active ? "Admin access disabled." : "Admin access enabled.");
      await reload();
    } catch (error) {
      notify(error.message, "error");
    }
  }

  async function resetPassword(admin) {
    const nextPassword = window.prompt(`Set a new password for ${admin.username} (minimum 12 characters):`);
    if (!nextPassword) return;
    try {
      await apiRequest("/api/admin/admins", {
        method: "PATCH",
        body: JSON.stringify({ id: admin.id, password: nextPassword }),
      });
      notify("Admin password updated.");
    } catch (error) {
      notify(error.message, "error");
    }
  }

  async function removeAdmin(admin) {
    if (!window.confirm(`Delete admin access for ${admin.username}?`)) return;
    try {
      await apiRequest(`/api/admin/admins?id=${encodeURIComponent(admin.id)}`, { method: "DELETE" });
      notify("Admin account deleted.");
      await reload();
    } catch (error) {
      notify(error.message, "error");
    }
  }

  return (
    <div className="space-y-6">
      <div><p className="text-sm font-medium text-slate-500">Superadmin-only controls</p><h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Admin accounts</h1></div>
      <form onSubmit={createAdmin} className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_1fr_auto] md:items-end">
        <label className="text-xs font-bold text-slate-600">Username or email<input required value={username} onChange={(event) => setUsername(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-orange-500" placeholder="operations@busmantra.com" /></label>
        <label className="text-xs font-bold text-slate-600">Temporary password<input required minLength={12} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-orange-500" placeholder="At least 12 characters" /></label>
        <button disabled={busy} className="flex h-11 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 text-sm font-bold text-white hover:bg-orange-600 disabled:opacity-60"><Plus size={17} /> Create admin</button>
      </form>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4"><h2 className="font-bold text-slate-900">Team access</h2><p className="mt-1 text-xs text-slate-400">The superadmin account is protected and cannot be changed here.</p></div>
        <div className="divide-y divide-slate-100">
          {admins.map((admin) => (
            <div key={admin.id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
              <div><p className="font-semibold text-slate-800">{admin.username}</p><p className="mt-1 text-xs capitalize text-slate-400">{admin.role} · {admin.is_active ? "Active" : "Disabled"} · Last login {formatDate(admin.last_login_at)}</p></div>
              {admin.role === "admin" && <div className="flex flex-wrap gap-2">
                <button onClick={() => resetPassword(admin)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-orange-300 hover:text-orange-700">Reset password</button>
                <button onClick={() => toggleAdmin(admin)} className={`rounded-lg px-3 py-2 text-xs font-semibold ${admin.is_active ? "bg-amber-50 text-amber-700 hover:bg-amber-100" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}`}>{admin.is_active ? "Disable" : "Enable"}</button>
                <button onClick={() => removeAdmin(admin)} aria-label={`Delete ${admin.username}`} className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"><Trash2 size={15} /></button>
              </div>}
            </div>
          ))}
          {!admins.length && <p className="px-5 py-10 text-center text-sm text-slate-400">No admin accounts.</p>}
        </div>
      </section>
    </div>
  );
}

function CatalogManager({ collection, setCollection, notify }) {
  const [records, setRecords] = useState([]);
  const [key, setKey] = useState("id");
  const [editing, setEditing] = useState(null);
  const [jsonValue, setJsonValue] = useState("");
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState(false);

  const reload = useCallback(async () => {
    const result = await apiRequest(`/api/admin/catalog?collection=${collection}`);
    setRecords(result.records);
    setKey(result.key);
  }, [collection]);

  useEffect(() => {
    let active = true;
    apiRequest(`/api/admin/catalog?collection=${collection}`)
      .then((result) => {
        if (active) {
          setRecords(result.records);
          setKey(result.key);
        }
      })
      .catch((error) => {
        if (active) notify(error.message, "error");
      });
    return () => {
      active = false;
    };
  }, [collection, notify]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return records;
    return records.filter((record) => JSON.stringify(record).toLowerCase().includes(term));
  }, [records, search]);

  function edit(record) {
    setEditing(record ? { originalKey: record[key], isNew: false } : { originalKey: null, isNew: true });
    setJsonValue(record ? JSON.stringify(record, null, 2) : "{\n  \n}");
  }

  async function save(event) {
    event.preventDefault();
    setBusy(true);
    try {
      const data = JSON.parse(jsonValue);
      const result = editing.isNew
        ? await apiRequest(`/api/admin/catalog?collection=${collection}`, { method: "POST", body: JSON.stringify(data) })
        : await apiRequest(`/api/admin/catalog?collection=${collection}`, { method: "PATCH", body: JSON.stringify({ keyValue: editing.originalKey, data }) });
      setEditing(null);
      notify(editing.isNew ? "Catalog item created." : "Catalog item updated.");
      await reload();
      return result;
    } catch (error) {
      notify(error instanceof SyntaxError ? "Catalog data must be valid JSON." : error.message, "error");
    } finally {
      setBusy(false);
    }
  }

  async function remove(record) {
    if (!window.confirm(`Delete ${displayValue(record[key])}?`)) return;
    try {
      await apiRequest(`/api/admin/catalog?collection=${collection}&key=${encodeURIComponent(record[key])}`, { method: "DELETE" });
      notify("Catalog item deleted.");
      await reload();
    } catch (error) {
      notify(error.message, "error");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-medium text-slate-500">Edit content served by the public site</p><h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Website catalog</h1></div>
        <button onClick={() => edit(null)} className="flex h-11 items-center gap-2 rounded-xl bg-orange-500 px-4 text-sm font-bold text-white hover:bg-orange-600"><Plus size={17} /> Add item</button>
      </div>
      <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="relative min-w-56 flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search catalog..." className="h-10 w-full rounded-xl border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-orange-500" /></label>
        <label className="relative"><select value={collection} onChange={(event) => setCollection(event.target.value)} className="h-10 appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-9 text-sm font-semibold text-slate-700 outline-none focus:border-orange-500">{CATALOGS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select><ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /></label>
      </div>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="divide-y divide-slate-100">
          {filtered.map((record) => (
            <div key={record[key]} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <div className="min-w-0"><p className="font-semibold text-slate-800">{displayValue(record.name || record.title || record.id || record.slug)}</p><p className="mt-1 max-w-xl truncate text-xs text-slate-400">{record.slug || record.id} · {record.description || record.capacity || ""}</p></div>
              <div className="flex gap-2"><button onClick={() => edit(record)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:border-orange-300 hover:text-orange-700">Edit JSON</button><button onClick={() => remove(record)} aria-label="Delete catalog item" className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"><Trash2 size={15} /></button></div>
            </div>
          ))}
          {!filtered.length && <p className="px-5 py-12 text-center text-sm text-slate-400">No catalog items found.</p>}
        </div>
      </section>
      {editing && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
        <form onSubmit={save} className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="font-bold text-slate-900">{editing.isNew ? "Add catalog item" : "Edit catalog item"}</h2><p className="mt-1 text-xs text-slate-400">Valid JSON · database fields use snake_case</p></div><button type="button" onClick={() => setEditing(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={18} /></button></div>
          <textarea spellCheck={false} value={jsonValue} onChange={(event) => setJsonValue(event.target.value)} className="min-h-[50vh] flex-1 resize-y bg-slate-950 p-5 font-mono text-xs leading-6 text-emerald-200 outline-none" />
          <div className="flex justify-end gap-2 border-t border-slate-100 p-4"><button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600">Cancel</button><button disabled={busy} className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-600 disabled:opacity-60"><Save size={16} /> Save changes</button></div>
        </form>
      </div>}
    </div>
  );
}

export default function AdminPanel({
  initialSection = "dashboard",
  initialCategory = null,
  initialCoachId = null,
}) {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [activeSection, setActiveSection] = useState(initialSection);
  const [dashboard, setDashboard] = useState(null);
  const [records, setRecords] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [recordSearch, setRecordSearch] = useState("");
  const [recordStatus, setRecordStatus] = useState("");
  const [catalog, setCatalog] = useState("fleets");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);

  const notify = useCallback((message, type = "success") => {
    setNotice({ message, type });
    window.setTimeout(() => setNotice(null), 4000);
  }, []);

  const loadDashboard = useCallback(async () => {
    const result = await apiRequest("/api/admin/dashboard");
    setDashboard(result);
  }, []);

  const loadAdmins = useCallback(async () => {
    const result = await apiRequest("/api/admin/admins");
    setAdmins(result.admins);
  }, []);

  const loadRecords = useCallback(async () => {
    const params = new URLSearchParams({ search: recordSearch });
    if (recordStatus) params.set("status", recordStatus);
    const result = await apiRequest(`/api/admin/records/${activeSection}?${params}`);
    setRecords(result.records);
  }, [activeSection, recordSearch, recordStatus]);

  const adminRole = admin?.role;
  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      if (activeSection === "dashboard") await loadDashboard();
      if (activeSection === "admins" && adminRole === "superadmin") await loadAdmins();
      if (activeSection === "bookings" || activeSection === "inquiries") await loadRecords();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [activeSection, adminRole, loadAdmins, loadDashboard, loadRecords]);

  useEffect(() => {
    let active = true;
    apiRequest("/api/admin/auth")
      .then((result) => {
        if (active) setAdmin(result.admin);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setCheckingSession(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!adminRole) return undefined;
    const timer = window.setTimeout(() => {
      refresh();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [adminRole, refresh]);

  const navigation = NAVIGATION.filter((item) => !item.superadmin || admin?.role === "superadmin");

  function navigate(id) {
    const destination = id === "dashboard" ? "/admin" : `/admin/${id}`;
    router.push(destination);
    setMobileNav(false);
    setError("");
  }

  async function updateStatus(id, status) {
    try {
      await apiRequest(`/api/admin/records/${activeSection}`, {
        method: "PATCH",
        body: JSON.stringify({ id, status }),
      });
      notify("Status updated.");
      await loadRecords();
      if (activeSection === "dashboard") await loadDashboard();
    } catch (requestError) {
      notify(requestError.message, "error");
    }
  }

  async function logout() {
    try {
      await apiRequest("/api/admin/auth", { method: "DELETE" });
      setAdmin(null);
      setDashboard(null);
      router.replace("/admin");
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  if (checkingSession) {
    return <main className="flex min-h-screen items-center justify-center bg-slate-50"><LoaderCircle className="animate-spin text-orange-500" size={30} /></main>;
  }

  if (!admin) return <LoginScreen onLogin={setAdmin} />;

  const pageTitle = navigation.find((item) => item.id === activeSection)?.label || "Admin";

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <div className="min-h-screen lg:flex">
        {mobileNav && <button aria-label="Close navigation" onClick={() => setMobileNav(false)} className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" />}
        <aside className={`fixed inset-y-0 left-0 z-40 flex w-[270px] flex-col bg-[#111827] text-white transition-transform lg:static lg:translate-x-0 ${mobileNav ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex h-[76px] items-center gap-3 border-b border-white/10 px-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500"><Bus size={21} /></span>
            <div><p className="text-sm font-black tracking-wider">BUS MANTRA</p><p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Admin workspace</p></div>
          </div>
          <div className="px-4 pt-7">
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Workspace</p>
            <nav className="mt-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const selected = activeSection === item.id;
                return <button key={item.id} onClick={() => navigate(item.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${selected ? "bg-orange-500 text-white shadow-lg shadow-orange-950/20" : "text-slate-300 hover:bg-white/5 hover:text-white"}`}><Icon size={18} />{item.label}{item.id === "admins" && <ShieldCheck className="ml-auto text-orange-300" size={15} />}</button>;
              })}
            </nav>
          </div>
          <div className="mt-auto border-t border-white/10 p-4">
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/20 text-sm font-black text-orange-300">{admin.username.slice(0, 1).toUpperCase()}</span>
              <div className="min-w-0"><p className="truncate text-xs font-bold">{admin.username}</p><p className="mt-0.5 text-[10px] capitalize text-slate-400">{admin.role}</p></div>
            </div>
            <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-red-500/10 hover:text-red-300"><LogOut size={17} /> Sign out</button>
          </div>
        </aside>
        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-7 lg:px-10">
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileNav(true)} aria-label="Open navigation" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"><Menu size={20} /></button>
              <div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-600">Bus Mantra / Admin</p><h2 className="mt-0.5 text-sm font-bold text-slate-800">{pageTitle}</h2></div>
            </div>
            <button onClick={refresh} disabled={loading} className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-bold text-slate-600 transition hover:border-orange-300 hover:text-orange-600 disabled:opacity-50"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /><span className="hidden sm:inline">Refresh</span></button>
          </header>
          <div className="mx-auto max-w-[1500px] p-4 sm:p-7 lg:p-10">
            {error && <div role="alert" className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"><span>{error}</span><button onClick={() => setError("")} aria-label="Dismiss error"><X size={16} /></button></div>}
            {activeSection === "dashboard" && <Dashboard data={dashboard} onNavigate={navigate} />}
            {(activeSection === "bookings" || activeSection === "inquiries") && <div className="space-y-6">
              <div><p className="text-sm font-medium text-slate-500">Review, search and update incoming requests</p><h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">{activeSection === "bookings" ? "Bookings" : "Enquiries"}</h1></div>
              <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <label className="relative min-w-56 flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={recordSearch} onChange={(event) => setRecordSearch(event.target.value)} placeholder="Search name, email or ID..." className="h-10 w-full rounded-xl border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-orange-500" /></label>
                <label><select value={recordStatus} onChange={(event) => setRecordStatus(event.target.value)} className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none focus:border-orange-500"><option value="">All statuses</option>{STATUS_OPTIONS[activeSection].map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
              </div>
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"><RecordTable kind={activeSection} records={records} onStatusChange={updateStatus} /></section>
            </div>}
            {activeSection === "fleet-management" && <FleetManagerPanel category={initialCategory} coachId={initialCoachId} onNotice={notify} />}
            {activeSection === "admins" && admin.role === "superadmin" && <AdminAccounts admins={admins} reload={loadAdmins} notify={notify} />}
            {loading && <div className="fixed bottom-5 right-5 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-semibold text-white shadow-xl"><LoaderCircle size={15} className="animate-spin" /> Syncing database</div>}
          </div>
        </section>
      </div>
      {notice && <div role="status" className={`fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-xl ${notice.type === "error" ? "bg-red-600" : "bg-slate-900"}`}>{notice.type === "error" ? <Activity size={16} /> : <Check size={16} className="text-emerald-400" />}{notice.message}</div>}
    </main>
  );
}
