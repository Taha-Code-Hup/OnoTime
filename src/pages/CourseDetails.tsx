import React, { useEffect, useMemo, useState, useRef } from 'react';
import { readKey, writeKey } from '../firestore/localStorageAdapter';

import { useParams, Link } from 'react-router-dom';

import type { Course } from '../models/Course';
import type { Lecturer } from '../models/Lecturer';
import type { Student } from '../models/Student';
import type { StudyFile } from '../models/StudyFile';

// JSON loader with typing
function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed as T;
  } catch {
    return fallback;
  }
}
function saveJSON<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // ignore
  }
}


const card: React.CSSProperties = {
  background: 'white',
  borderRadius: 12,
  padding: '1.25rem',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  marginBottom: '1rem',
};

const statBox: React.CSSProperties = {
  background: '#f7fafc',
  borderRadius: 10,
  padding: '0.75rem',
};

function CourseDetails() {
  const { id } = useParams<{ id: string }>();

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [allLecturers, setAllLecturers] = useState<Lecturer[]>([]);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [allFiles, setAllFiles] = useState<StudyFile[]>([]);

  useEffect(() => {
    setAllCourses(loadJSON<Course[]>('courses', []));
    setAllLecturers(loadJSON<Lecturer[]>('lecturers', []));
    setAllStudents(loadJSON<Student[]>('students', []));
    setAllFiles(loadJSON<StudyFile[]>('files', []));
  }, []);

  // Find selected course
  const course: Course | null = useMemo(() => {
    if (!id) return null;
    return allCourses.find(c => String(c.id) === String(id)) || null;
  }, [allCourses, id]);

  // Resolve lecturer (optional)
  const lecturer: Lecturer | null = useMemo(() => {
    if (!course?.lecturerId) return null;
    return allLecturers.find(l => l.id === course.lecturerId) || null;
  }, [course, allLecturers]);

  // Ref to ensure we increment views only once per mount
const incrementedRef = useRef(false);

// Increment course views when this page is opened
useEffect(() => {
  if (!course || incrementedRef.current) return;
  try {
    const stored = loadJSON<Course[]>('courses', []);
    const updated = stored.map(c => {
      if (String(c.id) === String(course.id)) {
        const current = Number(c.views || 0);
        return { ...c, views: current + 1 };
      }
      return c;
    });
    saveJSON('courses', updated);
    setAllCourses(updated);
    incrementedRef.current = true;
  } catch (err) {
    console.warn('Failed to increment course views', err);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [course]);

// Increment file views (for global files and inline course files)
function incrementFileViews(fileId?: string, courseId?: string) {
  try {
    // update global files
    const gFiles = loadJSON<StudyFile[]>('files', []);
    const gfUpdated = (gFiles || []).map(f => {
      if (fileId && String(f.id) === String(fileId)) {
        return { ...f, views: (Number(f.views || 0) + 1) };
      }
      return f;
    });
    saveJSON('files', gfUpdated);
    setAllFiles(gfUpdated);

    // update inline files within courses
    const storedCourses = loadJSON<Course[]>('courses', []);
    const coursesUpdated = (storedCourses || []).map(c => {
      if (String(c.id) === String(courseId)) {
        if (!Array.isArray(c.files)) return c;
        const newFiles = c.files.map(f => {
          if (fileId && String(f.id) === String(fileId)) {
            return { ...f, views: (Number(f.views || 0) + 1) };
          }
          return f;
        });
        return { ...c, files: newFiles };
      }
      return c;
    });
    saveJSON('courses', coursesUpdated);
    setAllCourses(coursesUpdated);
  } catch (err) {
    console.warn('Failed to increment file views', err);
  }
}

// Resolve students
  const courseStudents: Student[] = useMemo(() => {
    if (!course) return [];
    const viaStudentCourseIds = allStudents.filter(s => Array.isArray(s.courseIds) && s.courseIds.includes(course.id));
    const viaCourseStudentIds = allStudents.filter(s => Array.isArray(course.studentIds) && course.studentIds.includes(s.id));
    const map = new Map<string, Student>();
    [...viaStudentCourseIds, ...viaCourseStudentIds].forEach(st => map.set(st.id, st));
    return Array.from(map.values());
  }, [course, allStudents]);

  // Resolve files
  const courseFiles: StudyFile[] = useMemo(() => {
    if (!course) return [];
    return allFiles.filter(f => f.courseId === course.id);
  }, [course, allFiles]);

  // Helper
  const extractNumericTail = (raw: string): string => {
    if (!raw || raw.trim() === '') return 'לא ידוע';
    const parts = raw.split('_');
    const tail = parts[parts.length - 1] || raw;
    const digitsOnly = tail.replace(/\D/g, '');
    return digitsOnly || tail;
  };

  const getUploaderName = (uploaderId: string): string => {
    const s = allStudents.find(st => st.id === uploaderId);
    if (s) return s.fullName;
    const l = allLecturers.find(le => le.id === uploaderId);
    if (l) return l.name;
    // 
    return extractNumericTail(uploaderId);
  };

  if (!id) {
    return <div style={{ padding: '2rem' }}>שגיאה: מזהה קורס חסר.</div>;
  }

  if (!course) {
    return (
      <div style={{ padding: '2rem' }}>
        <Link to="/home" style={{ textDecoration: 'none' }}>⬅ חזרה לעמוד הבית</Link>
        <h2 style={{ marginTop: '1rem' }}>הקורס לא נמצא</h2>
        <p> make sure it is valid file with url</p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom right, #ebf8e1, #ffffff)',
        minHeight: '100vh',
        padding: '1rem',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem' }}>
          <Link to="/home" style={{ textDecoration: 'none' }}>⬅ חזרה לדף הבית</Link>
        </div>

        {/* Course header */}
        <section style={card}>
          <h1 style={{ margin: 0 }}>
            {course.name} ({course.code})
          </h1>
          <p style={{ margin: '0.25rem 0 0.75rem' }}>
            <strong>סמסטר:</strong> {course.semester}
          </p>
          {course.description && <p style={{ marginTop: 0 }}>{course.description}</p>}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '0.75rem',
              marginTop: '0.5rem',
            }}
          >
            <div style={statBox}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>מרצה</div>
              <div>{lecturer ? lecturer.name : '—'}</div>
              {lecturer && (
                <div style={{ fontSize: 13, opacity: 0.8 }}>{lecturer.email}</div>
              )}
            </div>

            <div style={statBox}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>👩‍🎓 סטודנטים</div>
              <div>{courseStudents.length}</div>
            </div>

            <div style={statBox}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>📄 קבצים</div>
              <div>{courseFiles.length}</div>
            </div>
          </div>
        </section>

        {/* Students */}
        <section style={card}>
          <h2 style={{ marginTop: 0 }}>👩‍🎓 רשימת סטודנטים</h2>
          {courseStudents.length === 0 ? (
            <p>אין סטודנטים רשומים לקורס זה.</p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
              {courseStudents.map(st => (
                <li key={st.id} style={{ marginBottom: 6 }}>
                  <div><strong>{st.fullName}</strong></div>
                  <div style={{ fontSize: 13, opacity: 0.9 }}>{st.email}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    ת.ז: {st.nationalId} · סמסטר {st.semester}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Files */}
        <section style={card}>
          <h2 style={{ marginTop: 0 }}>📄 קבצי לימוד</h2>
          {courseFiles.length === 0 ? (
            <p>אין קבצים לקורס זה.</p>
          ) : (
            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
              {courseFiles.map(file => (
                <li key={file.id} style={{ marginBottom: 10 }}>
                  <div>
                    <strong>{file.name}</strong>{' '}
                    <span style={{ fontSize: 12, opacity: 0.75 }}>({file.type})</span>
                  </div>
                  {file.description && (
                    <div style={{ fontSize: 13, opacity: 0.9 }}>{file.description}</div>
                  )}
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    סטטוס: {file.status} · מעלה: {getUploaderName(file.uploaderId)}
                  </div>
                  {file.fileUrl && (
                    <div style={{ marginTop: 4 }}>
                      <a
                     href={file.fileUrl}
                   target="_blank"
                   rel="noreferrer"
                  onClick={() => incrementFileViews(file.id, course?.id)}
                   >
                   פתח קובץ
                   </a>

                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default CourseDetails;
