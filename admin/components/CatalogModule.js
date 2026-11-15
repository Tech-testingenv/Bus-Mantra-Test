"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Search, Save, Trash2, X } from "lucide-react";
import Image from "next/image";
import ImageUploadField from "./ImageUploadField";

const SETTINGS = {
  destinations: {
    title: "Destinations",
    description: "Manage destination pages and the places shown on each page.",
    key: "slug",
    blank: { slug: "", name: "", badge: "", route: "", description: "", gallery: [], popular_places: [], content: {} },
    fields: ["slug", "name", "badge", "route", "description", "gallery", "popular_places", "content"],
  },
  services: {
    title: "Services",
    description: "Manage service cards and the content shown on service detail pages.",
    key: "slug",
    blank: { slug: "", id: "", title: "", description: "", image: "", content: {} },
    fields: ["slug", "id", "title", "description", "image", "content"],
  },
};

const inputClass = "mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none focus:border-orange-500";
const textClass = "mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-normal outline-none focus:border-orange-500";

function splitLines(value) {
  return (Array.isArray(value) ? value : String(value || "").split(/\r?\n/))
    .map((item) => String(item).trim()).filter(Boolean);
}

function lineValue(value) {
  return Array.isArray(value) ? value.join("\n") : String(value || "");
}

function normalizeRecord(collection, record) {
  if (!record) return { ...SETTINGS[collection].blank };
  if (collection === "destinations") {
    return { ...record, gallery: record.gallery || [], popular_places: record.popular_places || [], content: record.content || {} };
  }
  return { ...record, content: record.content || {} };
}

function apiRequest(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: { ...(options.body ? { "Content-Type": "application/json" } : {}), ...options.headers },
  }).then(async (response) => {
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "Request failed.");
    return result;
  });
}

function Field({ label, children }) {
  return <label className="block text-xs font-bold text-slate-600">{label}{children}</label>;
}

function ListEditor({ title, items, onChange, fields, createItem, renderExtra }) {
  function update(index, key, value) {
    onChange(items.map((item, i) => i === index ? { ...item, [key]: value } : item));
  }
  function move(index, offset) {
    const next = [...items];
    const target = index + offset;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }
  return (
    <section className="space-y-3 rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold">{title}</h3>
        <button type="button" onClick={() => onChange([...items, createItem()])} className="rounded-lg bg-orange-50 px-3 py-2 text-xs font-bold text-orange-700">Add</button>
      </div>
      {items.map((item, index) => (
        <div key={index} className="space-y-3 rounded-lg border border-slate-100 p-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="mr-auto">{index + 1}</span>
            <button type="button" disabled={index === 0} onClick={() => move(index, -1)} className="disabled:opacity-30">Up</button>
            <button type="button" disabled={index === items.length - 1} onClick={() => move(index, 1)} className="disabled:opacity-30">Down</button>
            <button type="button" onClick={() => onChange(items.filter((_, i) => i !== index))} className="text-red-600">Remove</button>
          </div>
          {fields.map(({ key, label, multiline, lines }) => (
            <Field key={key} label={label}>
              {multiline
                ? <textarea rows={3} value={lines ? lineValue(item[key]) : item[key] || ""} onChange={(e) => update(index, key, e.target.value)} className={textClass} />
                : <input value={item[key] || ""} onChange={(e) => update(index, key, e.target.value)} className={inputClass} />}
            </Field>
          ))}
          {renderExtra?.(item, (key, value) => update(index, key, value))}
        </div>
      ))}
    </section>
  );
}

function objectItems(items, key) {
  return Array.isArray(items) ? items.map((item) => typeof item === "string" ? { [key]: item } : item) : [];
}

export default function CatalogModule({ collection, permissions, notify }) {
  const config = SETTINGS[collection];
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(config.blank);
  const [saving, setSaving] = useState(false);
  const [uploads, setUploads] = useState(0);
  const [loadError, setLoadError] = useState("");

  const reload = useCallback(async () => {
    const result = await apiRequest(`/api/admin/catalog?collection=${collection}`);
    setRecords(result.records);
  }, [collection]);

  useEffect(() => {
    let active = true;
    apiRequest(`/api/admin/catalog?collection=${collection}`)
      .then((result) => { if (active) setRecords(result.records); })
      .catch((error) => { if (active) setLoadError(error.message); });
    return () => { active = false; };
  }, [collection]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return term ? records.filter((row) => JSON.stringify(row).toLowerCase().includes(term)) : records;
  }, [records, search]);

  const canCreate = permissions?.create === true;
  const canEdit = permissions?.edit === true;
  const canDelete = permissions?.delete === true;

  function openEditor(record) {
    setEditing(record ? { keyValue: record[config.key], isNew: false } : { keyValue: null, isNew: true });
    setForm(normalizeRecord(collection, record));
  }

  function setField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateContent(key, value) {
    setForm((current) => ({ ...current, content: { ...current.content, [key]: value } }));
  }

  function uploadResult(key, value, multiple = false) {
    setForm((current) => ({
      ...current,
      [key]: multiple ? [...(Array.isArray(current[key]) ? current[key] : splitLines(current[key])), value] : value,
    }));
  }

  async function save(event) {
    event.preventDefault();
    setSaving(true);
    try {
      const data = collection === "destinations"
        ? {
            ...form,
            slug: form.slug.trim(),
            name: form.name.trim(),
            description: form.description.trim(),
            gallery: splitLines(form.gallery),
            popular_places: objectItems(form.popular_places, "name").map((place) => ({ ...place, highlights: splitLines(place.highlights) })),
          }
        : {
            ...form,
            slug: form.slug.trim(),
            id: form.id.trim(),
            title: form.title.trim(),
            description: form.description.trim(),
            content: {
              ...form.content,
              intro: { ...form.content.intro },
              highlights: objectItems(form.content.highlights, "title"),
              suitableFor: splitLines(form.content.suitableFor),
              benefits: objectItems(form.content.benefits, "title"),
              gallery: splitLines(form.content.gallery),
            },
          };
      const endpoint = `/api/admin/catalog?collection=${collection}`;
      await apiRequest(endpoint, {
        method: editing.isNew ? "POST" : "PATCH",
        body: JSON.stringify(editing.isNew ? data : { keyValue: editing.keyValue, data }),
      });
      setEditing(null);
      notify(editing.isNew ? `${config.title.slice(0, -1)} added.` : `${config.title.slice(0, -1)} updated.`);
      await reload();
    } catch (error) {
      notify(error.message, "error");
    } finally {
      setSaving(false);
    }
  }

  async function remove(record) {
    const label = record.name || record.title || record.slug;
    if (!window.confirm(`Delete "${label}"?`)) return;
    try {
      await apiRequest(`/api/admin/catalog?collection=${collection}&key=${encodeURIComponent(record[config.key])}`, { method: "DELETE" });
      notify("Catalog item deleted.");
      await reload();
    } catch (error) {
      notify(error.message, "error");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-medium text-slate-500">{config.description}</p><h1 className="mt-1 text-3xl font-black tracking-tight">{config.title}</h1></div>
        {canCreate && <button onClick={() => openEditor(null)} className="flex h-11 items-center gap-2 rounded-xl bg-orange-500 px-4 text-sm font-bold text-white hover:bg-orange-600"><Plus size={17} /> Add {config.title.slice(0, -1)}</button>}
      </div>
      <div className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <Search size={16} className="absolute left-7 top-7 text-slate-400" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${config.title.toLowerCase()}...`} className="h-10 w-full rounded-xl border border-slate-200 pl-9 pr-3 text-sm outline-none focus:border-orange-500" />
      </div>
      {loadError && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{loadError}</p>}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="divide-y divide-slate-100">
          {filtered.map((record) => (
            <div key={record[config.key]} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4">
              <div className="flex min-w-0 items-center gap-3">
                {record.image && <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg"><Image src={record.image} alt="" fill sizes="64px" unoptimized className="object-cover" /></div>}
                <div className="min-w-0"><p className="font-semibold text-slate-800">{record.name || record.title}</p><p className="mt-1 max-w-xl truncate text-xs text-slate-400">{record.slug} · {record.description}</p></div>
              </div>
              <div className="flex gap-2">
                {canEdit && <button onClick={() => openEditor(record)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:border-orange-300 hover:text-orange-700">Edit</button>}
                {canDelete && <button onClick={() => remove(record)} aria-label={`Delete ${record.name || record.title}`} className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"><Trash2 size={15} /></button>}
              </div>
            </div>
          ))}
          {!filtered.length && <p className="px-5 py-12 text-center text-sm text-slate-400">No {config.title.toLowerCase()} found.</p>}
        </div>
      </section>

      {editing && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
        <form onSubmit={save} className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="font-bold">{editing.isNew ? `Add ${config.title.slice(0, -1)}` : `Edit ${config.title.slice(0, -1)}`}</h2><p className="mt-1 text-xs text-slate-400">Changes publish to the website catalog.</p></div><button type="button" onClick={() => setEditing(null)} aria-label="Close" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><X size={18} /></button></div>
          <div className="space-y-4 overflow-y-auto p-5">
            {collection === "destinations" ? <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Destination name"><input required value={form.name} onChange={(e) => setField("name", e.target.value)} className={inputClass} /></Field>
                <Field label="URL slug"><input required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" value={form.slug} onChange={(e) => setField("slug", e.target.value)} className={inputClass} placeholder="jaipur" /></Field>
                <Field label="Badge"><input value={form.badge || ""} onChange={(e) => setField("badge", e.target.value)} className={inputClass} /></Field>
                <Field label="Route"><input value={form.route || ""} onChange={(e) => setField("route", e.target.value)} className={inputClass} placeholder="Delhi to Jaipur" /></Field>
              </div>
              <Field label="One liner"><input value={form.content.oneLiner || ""} onChange={(e) => updateContent("oneLiner", e.target.value)} className={inputClass} /></Field>
              <Field label="Description"><textarea required rows={3} value={form.description} onChange={(e) => setField("description", e.target.value)} className={textClass} /></Field>
              <Field label="Hero image path"><input value={form.content.heroImage || ""} onChange={(e) => updateContent("heroImage", e.target.value)} className={inputClass} /></Field>
              <ImageUploadField label="Destination hero image" value={form.content.heroImage} onUploaded={(value) => updateContent("heroImage", value)} onUploadingChange={(change) => setUploads((count) => count + change)} />
              <Field label="Explore heading"><input value={form.content.placesHeading || ""} onChange={(e) => updateContent("placesHeading", e.target.value)} className={inputClass} /></Field>
              <Field label="Explore description"><textarea rows={3} value={form.content.placesDescription || ""} onChange={(e) => updateContent("placesDescription", e.target.value)} className={textClass} /></Field>
              <ListEditor title="Popular place cards" items={objectItems(form.popular_places, "name")} onChange={(items) => setField("popular_places", items)} createItem={() => ({ name: "", image: "", description: "", highlights: [] })} fields={[
                { key: "name", label: "Place name" },
                { key: "image", label: "Image path" },
                { key: "description", label: "Description", multiline: true },
                { key: "highlights", label: "Pointers (one per line)", multiline: true, lines: true },
              ]} renderExtra={(item, update) => <ImageUploadField label="Place image" value={item.image} onUploaded={(value) => update("image", value)} onUploadingChange={(change) => setUploads((count) => count + change)} />} />
              <Field label="Gallery image paths (one per line)"><textarea rows={3} value={lineValue(form.gallery)} onChange={(e) => setField("gallery", e.target.value)} className={textClass} /></Field>
              <ImageUploadField label="Destination gallery" multiple onUploaded={(value) => uploadResult("gallery", value, true)} onUploadingChange={(change) => setUploads((count) => count + change)} />
            </> : <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Service title"><input required value={form.title} onChange={(e) => setField("title", e.target.value)} className={inputClass} /></Field>
                <Field label="URL slug"><input required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" value={form.slug} onChange={(e) => setField("slug", e.target.value)} className={inputClass} placeholder="airport-transfers" /></Field>
                <Field label="Service ID"><input required value={form.id} onChange={(e) => setField("id", e.target.value)} className={inputClass} placeholder="airport-transfer" /></Field>
                <Field label="Eyebrow"><input value={form.content.eyebrow || ""} onChange={(e) => updateContent("eyebrow", e.target.value)} className={inputClass} /></Field>
              </div>
              <Field label="Description"><textarea required rows={3} value={form.description} onChange={(e) => setField("description", e.target.value)} className={textClass} /></Field>
              <Field label="Intro heading"><input value={form.content.intro?.heading || ""} onChange={(e) => setForm((current) => ({ ...current, content: { ...current.content, intro: { ...current.content.intro, heading: e.target.value } } }))} className={inputClass} /></Field>
              <Field label="Service highlights heading"><input value={form.content.highlightsHeading || ""} onChange={(e) => updateContent("highlightsHeading", e.target.value)} className={inputClass} /></Field>
              <Field label="Service highlights description"><textarea rows={3} value={form.content.highlightsDescription || ""} onChange={(e) => updateContent("highlightsDescription", e.target.value)} className={textClass} /></Field>
              <ListEditor title="Service highlights" items={objectItems(form.content.highlights, "title")} onChange={(items) => updateContent("highlights", items)} createItem={() => ({ title: "", description: "" })} fields={[{ key: "title", label: "Title" }, { key: "description", label: "Description", multiline: true }]} />
              <Field label="Suitable for heading"><input value={form.content.suitableForHeading || ""} onChange={(e) => updateContent("suitableForHeading", e.target.value)} className={inputClass} /></Field>
              <Field label="Suitable for pointers (one per line)"><textarea rows={4} value={lineValue(form.content.suitableFor)} onChange={(e) => updateContent("suitableFor", e.target.value)} className={textClass} /></Field>
              <Field label="Why Bus Mantra heading (blank uses default)"><input value={form.content.benefitsHeading || ""} onChange={(e) => updateContent("benefitsHeading", e.target.value)} className={inputClass} /></Field>
              <ListEditor title="Why Bus Mantra pointers (empty uses default)" items={objectItems(form.content.benefits, "title")} onChange={(items) => updateContent("benefits", items)} createItem={() => ({ title: "", description: "" })} fields={[{ key: "title", label: "Title" }, { key: "description", label: "Description", multiline: true }]} />
              <Field label="Detail gallery paths (one per line)"><textarea rows={4} value={lineValue(form.content.gallery)} onChange={(e) => updateContent("gallery", e.target.value)} className={textClass} /></Field>
              <Field label="Card / hero image path"><input value={form.image || ""} onChange={(e) => setField("image", e.target.value)} className={inputClass} /></Field>
              <ImageUploadField label="Service image" value={form.image} onUploaded={(value) => uploadResult("image", value)} onUploadingChange={(change) => setUploads((count) => count + change)} />
              <ImageUploadField label="Service gallery" value={lineValue(form.content.gallery)} multiple onUploaded={(value) => setForm((current) => ({ ...current, content: { ...current.content, gallery: [...splitLines(current.content.gallery), value] } }))} onUploadingChange={(change) => setUploads((count) => count + change)} />
            </>}
            <ListEditor title="FAQs (empty uses default)" items={form.content.faqs || []} onChange={(items) => updateContent("faqs", items)} createItem={() => ({ question: "", answer: "" })} fields={[{ key: "question", label: "Question" }, { key: "answer", label: "Answer", multiline: true }]} />
          </div>
          <div className="flex justify-end gap-2 border-t border-slate-100 p-4"><button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold">Cancel</button><button disabled={saving || uploads > 0} className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"><Save size={16} /> {uploads ? "Uploading…" : saving ? "Saving…" : "Save changes"}</button></div>
        </form>
      </div>}
    </div>
  );
}
