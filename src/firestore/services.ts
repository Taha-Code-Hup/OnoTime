// Auto-generated Firestore service wrappers
import { addDoc, collection, getDocs, doc, setDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { firestoreApp } from "./config";

export async function addDocument(collectionName: string, data: any) {
  try {
    const col = collection(firestoreApp, collectionName);
    const ref = await addDoc(col, data);
    return { id: ref.id };
  } catch (e) {
    console.error("Firestore addDocument error:", e);
    throw e;
  }
}

export async function getCollection(collectionName: string) {
  try {
    const col = collection(firestoreApp, collectionName);
    const snap = await getDocs(col);
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    return items;
  } catch (e) {
    console.error("Firestore getCollection error:", e);
    throw e;
  }
}

export async function setDocument(collectionName: string, id: string, data: any) {
  try {
    const d = doc(firestoreApp, collectionName, id);
    await setDoc(d, data);
  } catch (e) {
    console.error("Firestore setDocument error:", e);
    throw e;
  }
}

export async function updateDocument(collectionName: string, id: string, data: any) {
  try {
    const d = doc(firestoreApp, collectionName, id);
    await updateDoc(d, data);
  } catch (e) {
    console.error("Firestore updateDocument error:", e);
    throw e;
  }
}

export async function deleteDocument(collectionName: string, id: string) {
  try {
    const d = doc(firestoreApp, collectionName, id);
    await deleteDoc(d);
  } catch (e) {
    console.error("Firestore deleteDocument error:", e);
    throw e;
  }
}
