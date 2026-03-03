import { doc, setDoc, getDoc, addDoc, getDocs, collection, query, where } from "firebase/firestore"
import { database } from "./Firebase"


// Create document (auto ID)
export async function createDocument(collectionName, data) {
  const docRef = await addDoc(collection(database, collectionName), data);
  return docRef.id;
}
//Usage: const id = await createDocument("users", { name: "Bob", age: 22 });

// Create / overwrite document with custom ID
export async function setDocument(collectionName, docId, data) {
  await setDoc(doc(database, collectionName, docId), data);
  return docId;
}
//Usage: await setDocument("users", "user123", { name: "Bob" });



// Get document
export async function getDocument(collectionName, docId) {
  const snap = await getDoc(doc(database, collectionName, docId));
  return snap.exists() ? snap.data() : null;
}
//Usage: const user = await getDocument("users", "user123");

// Delete document
export async function deleteDocument(collectionName, docId) {
  await deleteDoc(doc(database, collectionName, docId));
}
//await deleteDocument("users", "user123");
