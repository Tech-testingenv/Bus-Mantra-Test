"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Bus, ChevronRight, LoaderCircle, Plus, Save, Star } from "lucide-react";
import ImageUploadField from "./ImageUploadField";

const LEGACY_ROUTES = { "mini-coach": "minicoach-edit", "premium-coach": "premiumcoach-edit", "luxury-coach": "luxurycoach-edit" };

const EMPTY_FLEET = {
  id: "", slug: "", coach_type: "", name: "", capacity: "", min_seats: 1,
  max_seats: 1, rate_per_km: 0, default_round_trip_km: "", default_estimated_fare: "",
  is_popular: false, image: "",
  gallery: [], description: "", amenities: [], features: {},
};

const inputClass = "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-normal text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10";
const textareaClass = "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-normal text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10";

async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || "The request could not be completed.");
  return result;
}

function slugify(value) {
  return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function categoryRoute(category) {
  return LEGACY_ROUTES[category] || category;
}

function Field({ label, children, className = "" }) {
  return <label className={`block text-sm font-semibold text-slate-700 ${className}`}>{label}{children}</label>;
}

function FleetOverview({ onNotice, permissions, categories, reload }) {
  const router = useRouter();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", capacity: "", description: "" });
  const [saving, setSaving] = useState(false);

  async function saveCategory(event) {
    event.preventDefault();
    setSaving(true);
    try {
      const id = editing === "new" ? slugify(form.name) : editing;
      await apiRequest("/api/admin/fleet-categories", { method: editing === "new" ? "POST" : "PATCH", body: JSON.stringify({ ...form, id }) });
      await reload();
      setEditing(null);
      onNotice("Category saved.");
    } catch (error) {
      onNotice(error.message, "error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteCategory(type) {
    if (!window.confirm(`Delete category "${type.name}"?`)) return;
    try {
      await apiRequest(`/api/admin/fleet-categories?id=${encodeURIComponent(type.id)}`, { method: "DELETE" });
      await reload();
      onNotice("Category deleted.");
    } catch (error) {
      onNotice(error.message, "error");
    }
  }

  return (
    <div className="space-y-7">
      <div>
        <p className="text-sm font-medium text-slate-500">Manage the vehicle options displayed on the website</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">Fleet management</h1>
      </div>
      {permissions?.create && <button type="button" onClick={() => { setForm({ name: "", capacity: "", description: "" }); setEditing("new"); }} className="rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white">Add category</button>}
      {editing && <form onSubmit={saveCategory} className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="font-bold">{editing === "new" ? "Add category" : "Edit category"}</h2>
        <Field label="Name"><input required value={form.name} onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))} className={inputClass} /></Field>
        <Field label="Capacity"><input required value={form.capacity} onChange={(e) => setForm((current) => ({ ...current, capacity: e.target.value }))} className={inputClass} /></Field>
        <Field label="One liner description"><input required value={form.description} onChange={(e) => setForm((current) => ({ ...current, description: e.target.value }))} className={inputClass} /></Field>
        <div className="flex gap-2"><button disabled={saving} className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold text-white">Save category</button><button type="button" onClick={() => setEditing(null)} className="rounded-lg border px-4 py-2 text-sm">Cancel</button></div>
      </form>}
      <div className="grid gap-5 xl:grid-cols-3">
        {categories.map((type) => (
          <div key={type.id} className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-700"><Bus size={23} /></span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">{type.count} coaches</span>
            </div>
            <h2 className="mt-6 text-xl font-black text-slate-900">{type.name}</h2>
            {type.capacity && <p className="mt-1 text-xs font-semibold text-slate-500">{type.capacity}</p>}
            <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{type.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button type="button" onClick={() => router.push(`/admin/fleet-management/${categoryRoute(type.id)}`)} className="inline-flex items-center gap-2 text-sm font-bold text-orange-600">Manage coaches <ArrowRight size={16} /></button>
              {permissions?.edit && <button type="button" onClick={() => { setForm({ name: type.name, capacity: type.capacity, description: type.description }); setEditing(type.id); }} className="text-xs font-bold text-slate-600">Edit</button>}
              {permissions?.delete && <button type="button" onClick={() => deleteCategory(type)} className="text-xs font-bold text-red-600">Delete</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FleetList({ category, permissions, categories }) {
  const router = useRouter();
  const type = categories.find((item) => item.id === category);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const route = categoryRoute(category);

  useEffect(() => {
    let active = true;
    apiRequest(`/api/admin/fleets?type=${category}`)
      .then((result) => { if (active) setCoaches(result.coaches); })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [category]);

  if (!type) return <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">This coach category does not exist.</p>;

  return (
    <div className="space-y-6">
      <button onClick={() => router.push("/admin/fleet-management")} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-orange-600"><ArrowLeft size={17} /> All fleet categories</button>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">Manage the coaches available in this category</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">{type.name}</h1>
          <p className="mt-2 text-sm text-slate-500">{loading ? "Loading coaches…" : `${coaches.length} ${coaches.length === 1 ? "coach" : "coaches"}`}</p>
        </div>
        {permissions?.create && <button onClick={() => router.push(`/admin/fleet-management/${route}/new`)} className="flex h-11 items-center gap-2 rounded-xl bg-orange-500 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"><Plus size={18} /> Add Coach</button>}
      </div>
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
              <tr><th className="px-5 py-4 font-bold">Coach</th><th className="px-5 py-4 font-bold">Capacity</th><th className="px-5 py-4 font-bold">Seat range</th><th className="px-5 py-4 font-bold">Rate / KM</th><th className="px-5 py-4 font-bold">Status</th><th className="px-5 py-4 text-right font-bold">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {coaches.map((coach) => (
                <tr key={coach.id} className="hover:bg-slate-50/70">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100"><Image src={coach.image} alt="" fill sizes="64px" className="object-cover" /></div>
                      <div><p className="font-bold text-slate-900">{coach.name}</p><p className="mt-1 text-xs text-slate-400">{coach.slug}</p></div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-700">{coach.capacity}</td>
                  <td className="px-5 py-4 text-sm text-slate-600">{coach.min_seats}–{coach.max_seats} seats</td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-700">₹{Number(coach.rate_per_km).toLocaleString("en-IN")}</td>
                  <td className="px-5 py-4">{coach.is_popular ? <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700"><Star size={12} fill="currentColor" /> Popular</span> : <span className="text-xs text-slate-400">Standard</span>}</td>
                  <td className="px-5 py-4 text-right">{permissions?.edit && <button onClick={() => router.push(`/admin/fleet-management/${route}/${encodeURIComponent(coach.id)}`)} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-orange-300 hover:text-orange-600">Edit <ChevronRight size={15} /></button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && coaches.length === 0 && <p className="py-12 text-center text-sm text-slate-400">No coaches in this category yet. Add your first coach below.</p>}
          {loading && <div className="flex justify-center py-12"><LoaderCircle className="animate-spin text-orange-500" size={24} /></div>}
        </div>
      </section>
      {permissions?.create && <div className="flex justify-center border-t border-slate-200 pt-6 pb-4">
        <button onClick={() => router.push(`/admin/fleet-management/${route}/new`)} className="flex items-center gap-2 rounded-xl border-2 border-dashed border-orange-300 px-7 py-3.5 text-sm font-bold text-orange-600 transition hover:border-orange-500 hover:bg-orange-50"><Plus size={18} /> Add Coach</button>
      </div>}
    </div>
  );
}

function FleetEditor({ category, coachId, onNotice, permissions, categories }) {
  const router = useRouter();
  const type = categories.find((item) => item.id === category);
  const isNew = coachId === "new";
  const canSave = isNew ? permissions?.create === true : permissions?.edit === true;
  const [form, setForm] = useState({ ...EMPTY_FLEET, coach_type: category });
  const [galleryText, setGalleryText] = useState("");
  const [amenitiesText, setAmenitiesText] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [detail, setDetail] = useState({ tag: "", specifications: [], features: "", inclusions: "", cabinAmenities: "", bookingInclusions: "" });
  const [busy, setBusy] = useState(!isNew);
  const [uploadsInProgress, setUploadsInProgress] = useState(0);
  const [error, setError] = useState("");
  const backUrl = `/admin/fleet-management/${categoryRoute(category)}`;

  useEffect(() => {
    if (isNew || !coachId) return undefined;
    let active = true;
    apiRequest(`/api/admin/fleets/${encodeURIComponent(coachId)}`)
      .then(({ coach }) => {
        if (!active) return;
        setForm(coach);
        setGalleryText((coach.gallery || []).join("\n"));
        setAmenitiesText((coach.amenities || []).join("\n"));
        setFeaturesText(Object.entries(coach.features || {}).map(([key, value]) => `${key} = ${value}`).join("\n"));
        setDetail({
          tag: coach.content?.tag || "",
          specifications: coach.content?.specifications || Object.entries(coach.features || {}).map(([label, value]) => ({ label, value: String(value), description: "" })),
          features: (coach.content?.features || []).join("\n"),
          inclusions: (coach.content?.inclusions || []).join("\n"),
          cabinAmenities: (coach.content?.cabinAmenities || coach.amenities || []).join("\n"),
          bookingInclusions: (coach.content?.bookingInclusions || []).join("\n"),
        });
      })
      .catch((requestError) => { if (active) setError(requestError.message); })
      .finally(() => { if (active) setBusy(false); });
    return () => { active = false; };
  }, [coachId, isNew]);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError("");
  }

  function updateName(value) {
    const generatedSlug = slugify(value);
    setForm((current) => ({
      ...current,
      name: value,
      ...(isNew ? {
        id: generatedSlug ? `${category}-${generatedSlug}` : "",
        slug: generatedSlug ? `${category}-${generatedSlug}` : "",
      } : {}),
    }));
    if (error) setError("");
  }

  async function save(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const features = {};
      const specificationLines = featuresText.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
      for (const [index, line] of specificationLines.entries()) {
        const match = line.match(/^(.+?)\s*(?:=|:|\u2013|\u2014|\s-\s)\s*(.+)$/);
        if (!match || !match[1].trim() || !match[2].trim()) {
          throw new Error(`Specification line ${index + 1} needs a name and value, e.g. “Luggage: 20 bags”.`);
        }
        features[match[1].trim()] = match[2].trim();
      }
      const data = {
        ...form,
        gallery: galleryText.split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
        amenities: amenitiesText.split(/\r?\n/).map((item) => item.trim()).filter(Boolean),
        features,
        content: {
          ...form.content,
          tag: detail.tag.trim(),
          specifications: detail.specifications.map((item) => ({ label: item.label.trim(), value: item.value.trim(), description: item.description.trim() })),
          ...Object.fromEntries(["features", "inclusions", "cabinAmenities", "bookingInclusions"].map((key) => [key, detail[key].split(/\r?\n/).map((item) => item.trim()).filter(Boolean)])),
        },
      };
      if (isNew) {
        await apiRequest("/api/admin/fleets", { method: "POST", body: JSON.stringify(data) });
      } else {
        await apiRequest(`/api/admin/fleets/${encodeURIComponent(coachId)}`, { method: "PATCH", body: JSON.stringify(data) });
      }
      onNotice(isNew ? "Coach added successfully." : "Coach details updated.");
      router.push(backUrl);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  if (!type) return <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">This coach category does not exist.</p>;
  if (busy && !isNew) return <div className="flex min-h-72 items-center justify-center"><LoaderCircle size={27} className="animate-spin text-orange-500" /></div>;

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <button type="button" onClick={() => router.push(backUrl)} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-orange-600"><ArrowLeft size={17} /> Back to {type.name}</button>
      <div><p className="text-sm font-medium text-slate-500">{type.name} · Fleet details</p><h1 className="mt-1 text-3xl font-black tracking-tight text-slate-900">{isNew ? "Add a coach" : "Edit coach"}</h1></div>
      <form onSubmit={save} className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-lg font-bold text-slate-900">Coach information</h2>
          <p className="mt-1 text-sm text-slate-500">These details appear on the public fleet pages.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Coach name"><input required value={form.name || ""} onChange={(event) => updateName(event.target.value)} className={inputClass} placeholder="e.g. Executive Mini Coach" /></Field>
            <Field label="Tag"><input value={detail.tag} onChange={(event) => setDetail((current) => ({ ...current, tag: event.target.value }))} className={inputClass} placeholder="e.g. Most popular" /></Field>
            <Field label="Displayed seat capacity"><input required value={form.capacity || ""} onChange={(event) => update("capacity", event.target.value)} className={inputClass} placeholder="e.g. 15–19 Seats" /></Field>
            {isNew && <Field label="Coach ID"><input required value={form.id || ""} onChange={(event) => update("id", slugify(event.target.value))} className={inputClass} placeholder="mini-coach-executive-mini-coach" /></Field>}
            <Field label="Minimum seats"><input required min="1" type="number" value={form.min_seats ?? ""} onChange={(event) => update("min_seats", event.target.value)} className={inputClass} /></Field>
            <Field label="Maximum seats"><input required min="1" type="number" value={form.max_seats ?? ""} onChange={(event) => update("max_seats", event.target.value)} className={inputClass} /></Field>
            <Field label="Price per kilometre (₹)"><input required min="0" step="0.01" type="number" value={form.rate_per_km ?? ""} onChange={(event) => update("rate_per_km", event.target.value)} className={inputClass} /></Field>
            <Field label="Default round-trip distance (KM)"><input min="1" step="1" type="number" value={form.default_round_trip_km ?? ""} onChange={(event) => update("default_round_trip_km", event.target.value)} className={inputClass} placeholder="e.g. 560" /><span className="mt-1 block text-xs font-normal text-slate-500">Optional; used until the customer selects a route.</span></Field>
            <Field label="Default estimated fare (₹)"><input min="0" step="0.01" type="number" value={form.default_estimated_fare ?? ""} onChange={(event) => update("default_estimated_fare", event.target.value)} className={inputClass} placeholder="e.g. 23520" /><span className="mt-1 block text-xs font-normal text-slate-500">Optional; otherwise fare is calculated from distance and rate.</span></Field>
            <Field label="Main image">
              <input required value={form.image || ""} onChange={(event) => update("image", event.target.value)} className={inputClass} placeholder="/fleet/mini-coach.jpg" />
              <ImageUploadField
                label="Main image"
                value={form.image}
                onUploaded={(image) => update("image", image)}
                onUploadingChange={(change) => setUploadsInProgress((count) => count + change)}
              />
            </Field>
            <label className="flex items-center gap-3 self-end rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 sm:col-span-2"><input type="checkbox" checked={Boolean(form.is_popular)} onChange={(event) => update("is_popular", event.target.checked)} className="h-4 w-4 accent-orange-500" />Mark this coach as a popular choice</label>
            <Field label="Description" className="sm:col-span-2"><textarea required rows={4} value={form.description || ""} onChange={(event) => update("description", event.target.value)} className={`${textareaClass} resize-y`} placeholder="Describe this coach and the journeys it is suited for." /></Field>
          </div>
        </section>
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h2 className="text-lg font-bold text-slate-900">Coach features</h2>
          <p className="mt-1 text-sm text-slate-500">Add one entry per line. Specifications accept “Name = Value”, “Name: Value”, or “Name - Value”.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Gallery image paths (one per line)">
              <textarea rows={5} value={galleryText} onChange={(event) => setGalleryText(event.target.value)} className={`${textareaClass} resize-y`} placeholder={"/fleet/mini-coach-1.jpg\n/fleet/mini-coach-2.jpg"} />
              <ImageUploadField
                label="gallery images"
                value={galleryText}
                multiple
                onUploaded={(image) => setGalleryText((current) => [...current.split(/\r?\n/), image].filter((item) => item.trim()).join("\n"))}
                onUploadingChange={(change) => setUploadsInProgress((count) => count + change)}
              />
            </Field>
            <Field label="Amenities (one per line)"><textarea rows={5} value={amenitiesText} onChange={(event) => setAmenitiesText(event.target.value)} className={`${textareaClass} resize-y`} placeholder={"Air conditioning\nReclining seats\nLuggage space"} /></Field>
            <Field label="Specifications (one per line)" className="sm:col-span-2"><textarea rows={4} value={featuresText} onChange={(event) => setFeaturesText(event.target.value)} className={`${textareaClass} resize-y`} placeholder={"Luggage: 20 standard bags\nEntertainment: Stereo audio"} /></Field>
          </div>
        </section>
        <section className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex items-center justify-between"><h2 className="text-lg font-bold">Vehicle specification cards</h2><button type="button" onClick={() => setDetail((current) => ({ ...current, specifications: [...current.specifications, { label: "", value: "", description: "" }] }))} className="rounded-lg bg-orange-50 px-3 py-2 text-sm font-bold text-orange-700">Add card</button></div>
          {detail.specifications.map((item, index) => <div key={index} className="grid gap-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-3">
            {["label", "value", "description"].map((key) => <Field key={key} label={key === "label" ? "Label" : key === "value" ? "Value" : "Description"}><input required={key !== "description"} value={item[key]} onChange={(event) => setDetail((current) => ({ ...current, specifications: current.specifications.map((card, i) => i === index ? { ...card, [key]: event.target.value } : card) }))} className={inputClass} /></Field>)}
            <button type="button" onClick={() => setDetail((current) => ({ ...current, specifications: current.specifications.filter((_, i) => i !== index) }))} className="text-left text-sm font-bold text-red-600">Remove card</button>
          </div>)}
          {[
            ["features", "Features"],
            ["inclusions", "Inclusions"],
            ["cabinAmenities", "Cabin features & amenities"],
            ["bookingInclusions", "Booking inclusions"],
          ].map(([key, label]) => <Field key={key} label={`${label} (one per line)`}><textarea rows={3} value={detail[key]} onChange={(event) => setDetail((current) => ({ ...current, [key]: event.target.value }))} className={textareaClass} /></Field>)}
        </section>
        {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
        <div className="flex flex-wrap justify-end gap-3 pb-8">
          <button type="button" onClick={() => router.push(backUrl)} className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button>
          {canSave && <button disabled={busy || uploadsInProgress > 0} className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600 disabled:opacity-60">{busy || uploadsInProgress > 0 ? <LoaderCircle className="animate-spin" size={17} /> : <Save size={17} />}{uploadsInProgress > 0 ? "Uploading images…" : isNew ? "Add coach" : "Save changes"}</button>}
        </div>
      </form>
    </div>
  );
}

export default function FleetManagerPanel({ category, coachId, onNotice, permissions }) {
  const [categories, setCategories] = useState(null);
  const [loadError, setLoadError] = useState("");
  async function reload() {
    const result = await apiRequest("/api/admin/fleet-categories");
    setCategories(result.categories);
  }
  useEffect(() => {
    let active = true;
    apiRequest("/api/admin/fleet-categories")
      .then((result) => { if (active) setCategories(result.categories); })
      .catch((error) => { if (active) setLoadError(error.message); });
    return () => { active = false; };
  }, []);
  if (loadError) return <p role="alert" className="rounded-xl bg-red-50 p-4 text-red-700">{loadError}</p>;
  if (!categories) return <p>Loading fleet categories...</p>;
  if (coachId) return <FleetEditor category={category} coachId={coachId} onNotice={onNotice} permissions={permissions} categories={categories} />;
  if (category) return <FleetList category={category} permissions={permissions} categories={categories} />;
  return <FleetOverview onNotice={onNotice} permissions={permissions} categories={categories} reload={reload} />;
}
