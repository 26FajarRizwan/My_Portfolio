"use client";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * Generic Firestore CRUD hook with real-time sync (onSnapshot).
 *
 * IMPORTANT: this intentionally does NOT use a Firestore `orderBy("createdAt")`
 * query. Firestore's orderBy silently excludes any document that is missing
 * that field — so documents added manually (e.g. directly in the Firebase
 * Console) or from an earlier version of this admin panel would vanish from
 * every list and become impossible to Edit/Delete. Instead, every document
 * in the collection is fetched and sorted client-side, so nothing is ever
 * silently hidden.
 */
export function useFirestoreCrud(collectionName) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const colRef = collection(db, collectionName);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => {
          const at = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const bt = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return bt - at; // newest first; legacy docs without createdAt sink to the bottom
        });
        setItems(list);
        setLoading(false);
      },
      () => {
        setError(true);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [collectionName]);

  async function addItem(data) {
    await addDoc(collection(db, collectionName), { ...data, createdAt: serverTimestamp() });
  }

  async function updateItem(id, data) {
    await updateDoc(doc(db, collectionName, id), data);
  }

  async function removeItem(id) {
    await deleteDoc(doc(db, collectionName, id));
  }

  return { items, loading, error, addItem, updateItem, removeItem };
}

