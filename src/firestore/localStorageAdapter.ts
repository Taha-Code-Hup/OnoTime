// Adapter to migrate localStorage usage to Firestore.
// readKey(key) - returns parsed value (array or object) for the key.
// writeKey(key, value) - writes value to Firestore collection (if key is plural like 'students'), and also sets localStorage for backward compatibility.

import { addDocument, getCollection, setDocument } from './services';

export async function readKey(key: string) {
  try {
    if (key.endsWith('s')) {
      const items = await getCollection(key);
      return JSON.stringify(items);
    } else {
      const val = localStorage.getItem(key);
      return val;
    }
  } catch (e) {
    console.error('readKey adapter error', e);
    return localStorage.getItem(key);
  }
}

export async function writeKey(key: string, value: any) {
  try {
    if (key.endsWith('s')) {
      let arr = typeof value === 'string' ? JSON.parse(value) : value;
      if (!Array.isArray(arr)) {
        arr = [arr];
      }
      for (const item of arr) {
        try {
          // If item has an 'id' field use setDocument to preserve id (predictable)
          if (item && (item.id || item._id)) {
            const id = item.id || item._id;
            await setDocument(key, id.toString(), item);
          } else {
            await addDocument(key, item);
          }
        } catch(e) {
          console.error('writeKey add/set error', e);
        }
      }
      localStorage.setItem(key, JSON.stringify(arr));
    } else {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    }
  } catch (e) {
    console.error('writeKey adapter error', e);
    try { localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value)); } catch {}
  }
}
