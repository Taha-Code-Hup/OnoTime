import { addDoc, collection } from "firebase/firestore";
import { firestoreApp } from "./config";
import type { Student } from "../models/Student";

export async function addStudent(student: Student) {
  try {
    const docRef = await addDoc(collection(firestoreApp, "students"), student);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
