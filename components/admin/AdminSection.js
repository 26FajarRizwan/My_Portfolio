"use client";
import { useState } from "react";
import { useFirestoreCrud } from "@/lib/useFirestoreCrud";
import AdminForm from "@/components/admin/AdminForm";
import AdminList from "@/components/admin/AdminList";

export default function AdminSection({ tab }) {
  const { items, addItem, updateItem, removeItem } = useFirestoreCrud(tab.collection);
  const [editingItem, setEditingItem] = useState(null);

  async function handleSubmit(data) {
    if (editingItem) {
      await updateItem(editingItem.id, data);
      setEditingItem(null);
    } else {
      await addItem(data);
    }
  }

  return (
    <>
      <AdminForm
        fields={tab.fields}
        checkbox={tab.checkbox}
        editingItem={editingItem}
        onSubmit={handleSubmit}
        onCancelEdit={() => setEditingItem(null)}
        label={tab.label}
      />

      <h3 style={{ marginBottom: 16 }}>Current {tab.label} ({items.length})</h3>
      <AdminList items={items} summary={tab.summary} onEdit={setEditingItem} onDelete={removeItem} />
    </>
  );
}
