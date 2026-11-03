"use client";

import { useCallback, useEffect, useState } from "react";
import { Download, RefreshCw, TrendingUp } from "lucide-react";

const BOOKING_STATUSES = ["new", "contacted", "confirmed", "cancelled", "completed"];
const LEAD_STATUSES = ["new", "contacted", "resolved", "cancelled"];
const PAYMENT_STATUSES = ["unpaid", "deposit_paid", "paid", "refunded"];
const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
const dateValue = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "Request failed.");
  return result;
}

function FieldSelect({ value, options, onChange, label, disabled }) {
  return <select aria-label={label} disabled={disabled} value={value || ""} onChange={(event) => onChange(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-semibold capitalize text-slate-700 disabled:bg-slate-50 disabled:opacity-70">{options.map((option) => <option key={option.value ?? option} value={option.value ?? option}>{option.label ?? option}</option>)}</select>;
}

export default function SalesManager({ permissions, notify }) {
  const [from, setFrom] = useState(() => dateValue(new Date(new Date().getFullYear(), new Date().getMonth(), 1)));
  const [to, setTo] = useState(() => dateValue(new Date()));
  const [data, setData] = useState({ stats: {}, bookings: [], leads: [], admins: [] });
  const [loading, setLoading] = useState(false);
  const canEdit = permissions?.edit === true;

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      setData(await request(`/api/admin/sales?${params}`));
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setLoading(false);
    }
  }, [from, to, notify]);

  useEffect(() => {
    const timer = window.setTimeout(() => { reload(); }, 0);
    return () => window.clearTimeout(timer);
  }, [reload]);

  async function update(kind, id, fields) {
    try {
      await request(`/api/admin/records/${kind}`, { method: "PATCH", body: JSON.stringify({ id, ...fields }) });
      notify("Sales record updated.");
      await reload();
    } catch (error) {
      notify(error.message, "error");
    }
  }

  const stats = data.stats || {};
  const exportUrl = `/api/admin/sales?${new URLSearchParams({ from, to, format: "csv" })}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-medium text-slate-500">Bookings, revenue forecast, payment progress and sales leads.</p><h1 className="mt-1 text-3xl font-black tracking-tight">Sales</h1></div>
        <div className="flex flex-wrap items-end gap-2">
          <label className="text-[11px] font-bold text-slate-500">From<input type="date" value={from} onChange={(event) => setFrom(event.target.value)} className="mt-1 block h-10 rounded-lg border border-slate-200 px-2 text-sm text-slate-700" /></label>
          <label className="text-[11px] font-bold text-slate-500">To<input type="date" value={to} onChange={(event) => setTo(event.target.value)} className="mt-1 block h-10 rounded-lg border border-slate-200 px-2 text-sm text-slate-700" /></label>
          <a href={exportUrl} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 hover:border-orange-300 hover:text-orange-700"><Download size={15} /> Export CSV</a>
          <button onClick={reload} disabled={loading} className="flex h-10 items-center gap-2 rounded-xl bg-slate-900 px-3 text-xs font-bold text-white disabled:opacity-60"><RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh</button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Bookings", stats.booking_count, `${stats.confirmed_bookings || 0} confirmed · ${stats.completed_bookings || 0} completed`],
          ["Revenue forecast", money(stats.forecast_revenue), "Confirmed and completed booking estimates"],
          ["Paid revenue", money(stats.paid_revenue), `${stats.unpaid_bookings || 0} unpaid bookings`],
          ["New bookings", stats.new_bookings, "Need follow-up"],
        ].map(([label, value, note]) => <section key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-500">{label}</p><TrendingUp size={17} className="text-orange-500" /></div><p className="mt-3 text-3xl font-black">{value ?? 0}</p><p className="mt-1 text-xs text-slate-400">{note}</p></section>)}
      </div>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4"><h2 className="font-bold">Bookings pipeline</h2><p className="mt-1 text-xs text-slate-400">Add an estimated fare to track forecast and payment progress.</p></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[980px] text-left text-xs">
          <thead className="bg-slate-50 uppercase tracking-wide text-slate-400"><tr>{["Customer / route", "Created", "Status", "Estimated fare", "Payment", "Assigned to"].map((item) => <th key={item} className="px-4 py-3 font-bold">{item}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">{data.bookings.map((row) => <tr key={row.id} className="align-top">
            <td className="px-4 py-3"><p className="font-semibold text-slate-800">{row.full_name}</p><p className="mt-1 max-w-64 truncate text-slate-400">{row.pickup_point} → {(row.destinations || []).join(", ")}</p></td>
            <td className="whitespace-nowrap px-4 py-3 text-slate-500">{new Date(row.created_at).toLocaleDateString("en-IN")}</td>
            <td className="px-4 py-3"><FieldSelect label="Booking status" disabled={!canEdit} value={row.status} options={BOOKING_STATUSES} onChange={(status) => update("bookings", row.id, { status })} /></td>
            <td className="px-4 py-3"><input aria-label="Estimated fare" disabled={!canEdit} type="number" min="0" step="0.01" defaultValue={row.estimated_fare ?? ""} onBlur={(event) => { if (event.target.value !== String(row.estimated_fare ?? "")) update("bookings", row.id, { estimatedFare: event.target.value === "" ? null : Number(event.target.value) }); }} className="w-28 rounded-lg border border-slate-200 px-2 py-1.5 disabled:bg-slate-50" /></td>
            <td className="px-4 py-3"><FieldSelect label="Payment status" disabled={!canEdit} value={row.payment_status} options={PAYMENT_STATUSES} onChange={(paymentStatus) => update("bookings", row.id, { paymentStatus })} /></td>
            <td className="px-4 py-3"><FieldSelect label="Assign booking" disabled={!canEdit} value={row.assigned_to} options={[{ value: "", label: "Unassigned" }, ...data.admins.map((admin) => ({ value: admin.id, label: admin.username }))]} onChange={(assignedTo) => update("bookings", row.id, { assignedTo })} /></td>
          </tr>)}</tbody>
        </table>{!data.bookings.length && <p className="py-10 text-center text-sm text-slate-400">No bookings for this date range.</p>}</div>
      </section>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4"><h2 className="font-bold">Sales leads</h2><p className="mt-1 text-xs text-slate-400">Enquiries with an owner, expected value and follow-up status.</p></div>
        <div className="overflow-x-auto"><table className="w-full min-w-[1050px] text-left text-xs">
          <thead className="bg-slate-50 uppercase tracking-wide text-slate-400"><tr>{["Lead", "Created", "Status", "Expected value", "Follow-up", "Assigned to"].map((item) => <th key={item} className="px-4 py-3 font-bold">{item}</th>)}</tr></thead>
          <tbody className="divide-y divide-slate-100">{data.leads.map((row) => <tr key={row.id} className="align-top">
            <td className="px-4 py-3"><p className="font-semibold text-slate-800">{row.full_name}</p><p className="mt-1 text-slate-400">{row.subject || row.type} · {row.email || row.phone || "No contact"}</p></td>
            <td className="whitespace-nowrap px-4 py-3 text-slate-500">{new Date(row.created_at).toLocaleDateString("en-IN")}</td>
            <td className="px-4 py-3"><FieldSelect label="Lead status" disabled={!canEdit} value={row.status} options={LEAD_STATUSES} onChange={(status) => update("inquiries", row.id, { status })} /></td>
            <td className="px-4 py-3"><input aria-label="Expected lead value" disabled={!canEdit} type="number" min="0" step="0.01" defaultValue={row.expected_value ?? ""} onBlur={(event) => { if (event.target.value !== String(row.expected_value ?? "")) update("inquiries", row.id, { expectedValue: event.target.value === "" ? null : Number(event.target.value) }); }} className="w-28 rounded-lg border border-slate-200 px-2 py-1.5 disabled:bg-slate-50" /></td>
            <td className="px-4 py-3"><input aria-label="Follow-up date" disabled={!canEdit} type="datetime-local" defaultValue={row.follow_up_at ? new Date(row.follow_up_at).toISOString().slice(0, 16) : ""} onBlur={(event) => { if (event.target.value !== (row.follow_up_at ? new Date(row.follow_up_at).toISOString().slice(0, 16) : "")) update("inquiries", row.id, { followUpAt: event.target.value }); }} className="rounded-lg border border-slate-200 px-2 py-1.5 disabled:bg-slate-50" /></td>
            <td className="px-4 py-3"><FieldSelect label="Assign lead" disabled={!canEdit} value={row.assigned_to} options={[{ value: "", label: "Unassigned" }, ...data.admins.map((admin) => ({ value: admin.id, label: admin.username }))]} onChange={(assignedTo) => update("inquiries", row.id, { assignedTo })} /></td>
          </tr>)}</tbody>
        </table>{!data.leads.length && <p className="py-10 text-center text-sm text-slate-400">No leads for this date range.</p>}</div>
      </section>
    </div>
  );
}
