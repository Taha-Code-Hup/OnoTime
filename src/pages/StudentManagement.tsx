import React, { useCallback, useEffect, useState, type JSX } from 'react';
import type { Student } from '../models/Student';
import type { Course } from '../models/Course';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { readKey, writeKey } from '../firestore/localStorageAdapter';

/* -------------------------
   Constants & Validators
   ------------------------- */
const STORAGE_KEY_STUDENTS = 'students';
const STORAGE_KEY_COURSES = 'courses';

const SEMESTER_MIN = 1;
const SEMESTER_MAX = 99;

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidNationalId = (id: string) => /^\d{9}$/.test(id);

/* -------------------------

   - Uses camelCase names, semantic form markup
   ------------------------- */

type StudentFormProps = {
  initial?: Partial<Student> | null;
  availableCourses: Course[];
  onCancel: () => void;
  onSave: (studentPartial: Omit<Student, 'id'> & { id?: string }) => void;
  onGenerateRandom: () => void;
};

function StudentForm({ initial = null, availableCourses, onCancel, onSave, onGenerateRandom }: StudentFormProps) {
  const [fullName, setFullName] = useState(initial?.fullName ?? '');
  const [email, setEmail] = useState(initial?.email ?? '');
  const [nationalId, setNationalId] = useState(initial?.nationalId ?? '');
  const [semester, setSemester] = useState<number>(initial?.semester ?? 1);
  const [selectedCourses, setSelectedCourses] = useState<string[]>(initial?.courseIds ?? []);

  useEffect(() => {
    // Sync when initial changes (editing a different student)
    setFullName(initial?.fullName ?? '');
    setEmail(initial?.email ?? '');
    setNationalId(initial?.nationalId ?? '');
    setSemester(initial?.semester ?? 1);
    setSelectedCourses(initial?.courseIds ?? []);
  }, [initial]);

  const toggleCourse = useCallback((courseId: string) => {
    setSelectedCourses((prev) => (prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]));
  }, []);

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      // Basic validation
      if (!fullName || !email || !nationalId) {
        alert('Please fill in all required fields.');
        return;
      }
      if (!isValidEmail(email)) {
        alert('Invalid email format.');
        return;
      }
      if (!isValidNationalId(nationalId)) {
        alert('National ID must be 9 digits.');
        return;
      }

      onSave({
        id: initial?.id,
        fullName: fullName.trim(),
        email: email.trim(),
        nationalId: nationalId.trim(),
        semester,
        courseIds: selectedCourses,
      });
    },
    [fullName, email, nationalId, semester, selectedCourses, onSave, initial?.id]
  );

  return (
    <form className="student-form" onSubmit={handleSubmit} aria-labelledby="student-form-heading">
      <h3 id="student-form-heading" className="sr-only">{initial?.id ? 'Edit Student' : 'Add Student'}</h3>

      <div className="form-row">
        <label htmlFor="fullName" className="visually-hidden">Full Name</label>
        <input
          id="fullName"
          name="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="input input--wide"
        />

        <label htmlFor="email" className="visually-hidden">Email</label>
        <input
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input--wide"
        />

        <label htmlFor="nationalId" className="visually-hidden">National ID</label>
        <input
          id="nationalId"
          name="nationalId"
          placeholder="National ID"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
          className="input input--small"
          inputMode="numeric"
          pattern="\d{9}"
        />

        <label htmlFor="semester" className="visually-hidden">Semester</label>
        <input
          id="semester"
          name="semester"
          type="number"
          placeholder="Semester"
          value={semester}
          onChange={(e) => {
            const v = parseInt(e.target.value || String(SEMESTER_MIN), 10);
            setSemester(Number.isNaN(v) ? SEMESTER_MIN : Math.max(SEMESTER_MIN, Math.min(SEMESTER_MAX, v)));
          }}
          className="input input--small"
        />
      </div>

      <div className="courses-section">
        <strong>Assign to Courses:</strong>
        {availableCourses.length === 0 && <p>No courses available. Add some first.</p>}

        <div className="courses-list" role="group" aria-label="courses">
          {availableCourses.map((course) => (
            <label key={course.id} className="course-label">
              <input
                type="checkbox"
                checked={selectedCourses.includes(course.id)}
                onChange={() => toggleCourse(course.id)}
                aria-checked={selectedCourses.includes(course.id)}
              />
              <span className="course-name">{course.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn--primary">{initial?.id ? 'Update Student' : 'Add Student'}</button>
        <button type="button" onClick={onGenerateRandom} className="btn btn--muted">Generate Random</button>
        <button
          type="button"
          onClick={() => {
            setFullName('');
            setEmail('');
            setNationalId('');
            setSemester(1);
            setSelectedCourses([]);
            onCancel();
          }}
          className="btn btn--link"
        >
          Cancel
        </button>
      </div>

      {/* Minimal internal styles to keep file self-contained while avoiding inline styles */}
      <style>{`
        .student-form { margin-bottom: 1rem; }
        .form-row { display: flex; gap: 1rem; flex-wrap: wrap; align-items: flex-start; }
        .input { padding: 0.5rem; }
        .input--wide { width: 40vw; min-width: 180px; }
        .input--small { width: 10vw; min-width: 90px; }
        .courses-section { margin-top: 0.5rem; }
        .courses-list { max-height: 12vh; overflow-y: auto; border: 1px solid #ccc; padding: 0.4rem; margin-top: 0.4rem; border-radius: 6px; background: #fafafa; }
        .course-label { display: block; margin-bottom: 0.25rem; }
        .form-actions { margin-top: 0.6rem; display: flex; gap: 0.6rem; }
        .btn { padding: 0.45rem 0.7rem; border-radius: 6px; border: 1px solid transparent; cursor: pointer; }
        .btn--primary { background: #1976d2; color: white; }
        .btn--muted { background: #e0e0e0; }
        .btn--link { background: transparent; color: #1976d2; border: none; }
        .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
      `}</style>
    </form>
  );
}

/* -------------------------
   StudentTable (subcomponent)
   ------------------------- */

type StudentTableProps = {
  students: Student[];
  courses: Course[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
};

function StudentTable({ students, courses, onEdit, onDelete }: StudentTableProps) {
  return (
    <table className="students-table" aria-label="Students table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>ID</th>
          <th>Semester</th>
          <th>Courses</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.length === 0 ? (
          <tr>
            <td colSpan={6} style={{ textAlign: 'center' }}>
              No students found
            </td>
          </tr>
        ) : (
          students.map((s) => (
            <tr key={s.id}>
              <td>{s.fullName}</td>
              <td>{s.email}</td>
              <td>{s.nationalId}</td>
              <td>{s.semester}</td>
              <td>{(s.courseIds || []).map((cid) => courses.find((c) => c.id === cid)?.name || 'Unknown').join(', ')}</td>
              <td>
                <button aria-label={`edit-${s.fullName}`} onClick={() => onEdit(s)} className="btn btn--small">Edit</button>
                <button aria-label={`delete-${s.fullName}`} onClick={() => onDelete(s.id)} className="btn btn--danger">Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>

      <style>{`
        .students-table { width: 100%; border-collapse: collapse; }
        .students-table th, .students-table td { border: 1px solid #ddd; padding: 0.5rem; }
        .btn--small { margin-right: 0.4rem; padding: 0.25rem 0.45rem; }
        .btn--danger { color: white; background: #d32f2f; border: none; }
      `}</style>
    </table>
  );
}

/* -------------------------
   Main page component
   ------------------------- */

export default function StudentManagement(): JSX.Element {
  const navigate = useNavigate();

  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Load initial data from localStorage on mount
  useEffect(() => {
    const savedStudents = localStorage.getItem(STORAGE_KEY_STUDENTS);
    if (savedStudents) {
      try {
        setStudents(JSON.parse(savedStudents));
      } catch {
        setStudents([]);
      }
    }

    const savedCourses = localStorage.getItem(STORAGE_KEY_COURSES);
    if (savedCourses) {
      try {
        setCourses(JSON.parse(savedCourses));
      } catch {
        setCourses([]);
      }
    } else {

      setCourses([
        { id: 'c_db', name: 'Databases' } as Course,
        { id: 'c_js', name: 'JavaScript' } as Course,
        { id: 'c_html', name: 'HTML' } as Course,
      ]);
    }
  }, []);

  // Helper to persist students and update state
  const persistStudents = useCallback((next: Student[]) => {
    setStudents(next);
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(next));
  }, []);

  // add or update student
  const handleSaveStudent = useCallback(
    (studentPartial: Omit<Student, 'id'> & { id?: string }) => {
      if (studentPartial.id) {
        // update existing
        const updated = students.map((s) => (s.id === studentPartial.id ? ({ ...s, ...studentPartial } as Student) : s));
        persistStudents(updated);
      } else {
        // check duplicates
        if (students.some((s) => s.nationalId === studentPartial.nationalId)) {
          alert('Student with this National ID already exists.');
          return;
        }

        const newStudent: Student = {
          id: uuidv4(),
          fullName: studentPartial.fullName,
          email: studentPartial.email,
          nationalId: studentPartial.nationalId,
          semester: studentPartial.semester,
          courseIds: studentPartial.courseIds ?? [],
        };
        persistStudents([...students, newStudent]);
      }
      setEditingStudent(null);
    },
    [students, persistStudents]
  );

  const handleEdit = useCallback((student: Student) => {
    setEditingStudent(student);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDelete = useCallback((id: string) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    const updated = students.filter((s) => s.id !== id);
    persistStudents(updated);
  }, [students, persistStudents]);

  const handleCancel = useCallback(() => {
    setEditingStudent(null);
  }, []);

  // generate random student with attempt limit
  const handleGenerateRandom = useCallback(() => {
    let attempts = 0;
    let natId = '';

    do {
      natId = (Math.floor(100000000 + Math.random() * 900000000)).toString();
      attempts += 1;
      if (attempts > 5) {
        console.warn('Could not generate unique National ID after 5 attempts');
        break;
      }
    } while (students.some((s) => s.nationalId === natId));

    const name = `Student ${Math.floor(Math.random() * 100)}`;
    const mail = `student${Math.floor(Math.random() * 100)}@example.com`;
    const sem = Math.floor(Math.random() * 8) + 1;
    let courseIds: string[] = [];
    if (courses.length > 0) {
      const shuffled = [...courses].sort(() => 0.5 - Math.random());
      const randomCount = Math.floor(Math.random() * shuffled.length) + 1;
      courseIds = shuffled.slice(0, randomCount).map((c) => c.id);
    }

    if (students.some((s) => s.nationalId === natId)) {

      alert('Could not generate a unique National ID for the random student. Try again.');
      return;
    }

    const newStudent: Student = { id: uuidv4(), fullName: name, email: mail, nationalId: natId, semester: sem, courseIds };
    persistStudents([...students, newStudent]);
  }, [courses, students, persistStudents]);

  return (
    <main className="page-root">
      <header className="page-header">
        <div className="header-inner">
          <h2>Student Management</h2>
          <nav>
            <Button variant="contained" color="primary" onClick={() => navigate('/')}>חזרה לעמוד הבית</Button>
          </nav>
        </div>
      </header>

      <section className="form-section" aria-labelledby="student-form-heading">
        <StudentForm
          initial={editingStudent ?? null}
          availableCourses={courses}
          onCancel={handleCancel}
          onSave={handleSaveStudent}
          onGenerateRandom={handleGenerateRandom}
        />
      </section>

      <section className="table-section" aria-label="students-list">
        <StudentTable students={students} courses={courses} onEdit={handleEdit} onDelete={handleDelete} />
      </section>

      <footer className="page-footer">
        <small>Integrated standards-applied single-file version</small>
      </footer>

      <style>{`
        .page-root { padding: 2vh; }
        .page-header .header-inner { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
        .form-section { margin-top: 1rem; }
        .table-section { margin-top: 1rem; }
        .page-footer { text-align: center; margin-top: 3vh; }
      `}</style>
    </main>
  );
}
