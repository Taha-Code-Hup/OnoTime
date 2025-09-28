// Bootstrapping helper: creates example collections/documents with predictable ids.
// Use only for dev/testing. It writes to Firestore using setDocument so documents are visible with given ids.
import { setDocument } from "./services";

export async function bootstrapTestData() {
  try {
    // Example students
    await setDocument("students", "student_1", { id: "student_1", name: "Alice Cohen", email: "alice@example.com", year: 2 });
    await setDocument("students", "student_2", { id: "student_2", name: "Bobby Levi", email: "bobby@example.com", year: 3 });

    // Example lecturers
    await setDocument("lecturers", "lecturer_1", { id: "lecturer_1", name: "Dr. Moshe Green", email: "moshe@example.com" });

    // Example courses
    await setDocument("courses", "course_1", { id: "course_1", name: "Intro to React", code: "REACT101", lecturerId: "lecturer_1", semester: "2025A" });

    console.log("Firestore bootstrap: test data written.");
  } catch (e) {
    console.error("Firestore bootstrap error:", e);
    throw e;
  }
}
export default bootstrapTestData;
