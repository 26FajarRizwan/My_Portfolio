"use client";
import { useEffect, useState } from "react";

function buildEmptyForm(fields, checkbox) {
  const f = {};
  fields.forEach((field) => (f[field.key] = ""));
  if (checkbox) f[checkbox.key] = false;
  return f;
}

/**
 * Generic form for any admin section. Pass `editingItem` to switch it into
 * Edit mode (pre-fills the form and submits an update instead of a create).
 */
export default function AdminForm({ fields, checkbox, editingItem, onSubmit, onCancelEdit, label }) {
  const [form, setForm] = useState(buildEmptyForm(fields, checkbox));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingItem) {
      const f = {};
      fields.forEach((field) => (f[field.key] = editingItem[field.key] ?? ""));
      if (checkbox) f[checkbox.key] = !!editingItem[checkbox.key];
      setForm(f);
    } else {
      setForm(buildEmptyForm(fields, checkbox));
    }
  }, [editingItem, fields, checkbox]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form[fields[0].key]) return; // first field is always required
    setSaving(true);
    await onSubmit(form);
    if (!editingItem) setForm(buildEmptyForm(fields, checkbox));
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="chart-card" style={{ display: "grid", gap: 14, marginBottom: 40 }}>
      <h3 style={{ marginBottom: 4 }}>{editingItem ? `Edit ${label}` : `Add ${label}`}</h3>

      {fields.map((f) => (
        <input
          key={f.key}
          placeholder={f.label}
          value={form[f.key] ?? ""}
          onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
          style={{ padding: 12, borderRadius: 10, border: "1px solid var(--line)" }}
        />
      ))}

      {checkbox && (
        <label style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 600, fontSize: ".9rem" }}>
          <input
            type="checkbox"
            checked={!!form[checkbox.key]}
            onChange={(e) => setForm({ ...form, [checkbox.key]: e.target.checked })}
          />
          {checkbox.label}
        </label>
      )}

      <div style={{ display: "flex", gap: 10 }}>
        <button type="submit" disabled={saving} className="btn-primary" style={{ border: "none", cursor: "pointer" }}>
          {saving ? "Saving…" : editingItem ? "Update" : `Add ${label}`}
        </button>
        {editingItem && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="btn-ghost"
            style={{ cursor: "pointer", background: "none" }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
