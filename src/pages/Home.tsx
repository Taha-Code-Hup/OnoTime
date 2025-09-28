import React, { useEffect, useState } from 'react';
import type { Course } from '../models/Course';
import type { StudyFile } from '../models/StudyFile';
import type { Student } from '../models/Student';
import type { Lecturer } from '../models/Lecturer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { loadJSON, saveJSON } from '../utils/storage';
import { generateId } from '../utils/id';
import { permanentLecturers } from '../models/Lecturer';
import { readKey, writeKey } from '../firestore/localStorageAdapter';

const COURSE_KEY = 'courses';
const LECT_KEY = 'lecturers';
const FILE_KEY = 'files';
const STUD_KEY = 'students';

//  Default courses 
const defaultCourses: Course[] = [
  {
    id: generateId("crs"),
    name: "מבוא למדעי המחשב",
    code: "CS101",
    description: "יסודות תכנות, מבנה מחשב ופתרון בעיות.",
    lecturerId: "",
    studentIds: [],
    semester: 1,
    views: 0,
  },
  {
    id: generateId("crs"),
    name: "אלגוריתמים",
    code: "CS201",
    description: "ניתוח אלגוריתמים, רשימות מקושרות, מחסניות, עצים וגרפים.",
    lecturerId: "",
    studentIds: [],
    semester: 2,
    views: 0,
  },
  {
    id: generateId("crs"),
    name: "ארכיטקטורת מחשבים",
    code: "CS301",
    description: "מערכות ספרתיות, מעבדים ותכנון מערכות מחשב.",
    lecturerId: "",
    studentIds: [],
    semester: 3,
    views: 0,
  },
  {
    id: generateId("crs"),
    name: "מערכות הפעלה",
    code: "CS302",
    description: "ניהול תהליכים, זיכרון, קבצים ותזמון.",
    lecturerId: "",
    studentIds: [],
    semester: 4,
    views: 0,
  },
  {
    id: generateId("crs"),
    name: "תכנות מונחה עצמים",
    code: "CS202",
    description: "עקרונות OOP: מחלקות, ירושה, פולימורפיזם ותבניות תכנון.",
    lecturerId: "",
    studentIds: [],
    semester: 2,
    views: 0,
  },
  {
    id: generateId("crs"),
    name: "בסיסי נתונים",
    code: "CS303",
    description: "SQL, תכנון בסיסי נתונים, נורמליזציה ומערכות ניהול DB.",
    lecturerId: "",
    studentIds: [],
    semester: 3,
    views: 0,
  },
  {
    id: generateId("crs"),
    name: "אבטחת מידע",
    code: "CS401",
    description: "קריפטוגרפיה, פרוטוקולי אבטחה, הגנה מפני תקיפות סייבר.",
    lecturerId: "",
    studentIds: [],
    semester: 4,
    views: 0,
  },
  {
    id: generateId("crs"),
    name: "רשתות מחשבים",
    code: "CS304",
    description: "מודל OSI, TCP/IP, פרוטוקולים ויישומי אינטרנט.",
    lecturerId: "",
    studentIds: [],
    semester: 3,
    views: 0,
  },
  {
    id: generateId("crs"),
    name: "בינה מלאכותית",
    code: "CS402",
    description: "יסודות AI, חיפוש, למידה חישובית ויישומים חכמים.",
    lecturerId: "",
    studentIds: [],
    semester: 4,
    views: 0,
  },
  {
    id: generateId("crs"),
    name: "פיתוח יישומי אינטרנט",
    code: "CS305",
    description: "פיתוח צד לקוח וצד שרת, טכנולוגיות Web מתקדמות.",
    lecturerId: "",
    studentIds: [],
    semester: 3,
    views: 0,
  },
];

function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [files, setFiles] = useState<StudyFile[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);

  useEffect(() => {
    // Bootstrap defaults if localStorage empty
    let savedCourses = loadJSON<Course[]>(COURSE_KEY, []);
    if (savedCourses.length === 0) {
      savedCourses = defaultCourses;
      saveJSON(COURSE_KEY, defaultCourses);
    }

    let savedLecturers = loadJSON<Lecturer[]>(LECT_KEY, []);
    if (savedLecturers.length === 0) {
      savedLecturers = permanentLecturers;
      saveJSON(LECT_KEY, permanentLecturers);
    }

    const savedFiles = loadJSON<StudyFile[]>(FILE_KEY, []);
    const savedStudents = loadJSON<Student[]>(STUD_KEY, []);

    setCourses(savedCourses);
    setFiles(savedFiles);
    setStudents(savedStudents);
    setLecturers(savedLecturers);
  }, []);

  const navigate = useNavigate();
  return (
    <div style={{
      background: 'linear-gradient(to bottom right, #3f87a6, #ebf8e1)',
      minHeight: '100vh',
      padding: '1rem'
    }}>
      <header style={{
        textAlign: 'center',
        padding: '2rem',
        background: '#004d66',
        color: 'white',
        borderRadius: '10px',
        marginBottom: '2rem'
      }}>
        <h1>🎓 ברוכים הבאים למכללה האקדמית</h1>
        <p>המערכת לניהול קורסים, מרצים, סטודנטים וחומרי לימוד</p>
      </header>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
  <h2 style={{ marginBottom: '0.5rem', fontWeight: 'normal' }}>
    רוצים להכיר את המרצים שלנו מקרוב
  </h2>
  <p style={{ marginBottom: '1.5rem', fontSize: '1rem', color: '#444' }}>
    לכל מרצה יש עמוד אישי המציג את תחומי ההתמחות, ההכשרות והניסיון שלו
  </p>
  <button
    onClick={() => navigate('/all-lecturers')}
    style={{
      padding: '12px 20px',
      borderRadius: '8px',
      background: '#00bfa5',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 600,
      transition: 'background 0.3s ease'
    }}
    onMouseOver={(e) => (e.currentTarget.style.background = '#009e86')}
    onMouseOut={(e) => (e.currentTarget.style.background = '#00bfa5')}
  >
    צפה בכל המרצים
  </button>
</div>

<div style={{ textAlign: 'center', marginTop: '2rem' }}>
  <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: 'normal' }}>
    📈 הקורסים והקבצים הפופולריים ביותר לסטודנטים שלנו
  </h2>
  <p style={{ fontSize: '1rem', color: '#444', marginBottom: '1rem' }}>
    רוצים לראות אילו קורסים וקבצים הכי נצפו? לחצו כאן
  </p>
  <Link to="/popular">
    <button
      style={{
        padding: '12px 24px',
        borderRadius: '8px',
        background: '#ff8c00',
        color: 'white',
        fontSize: '1rem',
        fontWeight: 600,
        border: 'none',
        cursor: 'pointer',
        transition: 'background 0.3s ease',
      }}
      onMouseOver={(e) => (e.currentTarget.style.background = '#e07b00')}
      onMouseOut={(e) => (e.currentTarget.style.background = '#ff8c00')}
    >
      צפו בקורסים וקבצים פופולריים
    </button>
  </Link>
</div>


      <h2 style={{ textAlign: 'center' }}>📚 קורסים זמינים</h2>
      {courses.length === 0 && (
        <p style={{ textAlign: 'center' }}>
          There are no courses available at the moment. Add from Courses Management page
        </p>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1rem',
        marginTop: '1rem'
      }}>
        {courses.map((course) => {
          const courseFiles = files.filter(f => f.courseId === course.id);
          const courseStudents = students.filter(s => s.courseIds?.includes(course.id));
          const lecturer = lecturers.find(l => l.id === course.lecturerId);

          return (
            <div
              key={course.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '1rem',
                background: 'white',
                boxShadow: '0px 4px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <h3>{course.name} ({course.code})</h3>
              <p><strong>מרצה:</strong> {lecturer ? lecturer.name : '—'}</p>
              <p><strong>סמסטר:</strong> {course.semester}</p>
              {course.description && <p>{course.description}</p>}
              <p>📄 קבצים: {courseFiles.length}</p>
              <p>👩‍🎓 סטודנטים: {courseStudents.length}</p>

              {/* ✅ route must match App.tsx => /courses/:id */}
              <Link to={`/courses/${course.id}`}>
                <button style={{
                  background: '#004d66',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}>
                  🔍 צפה בפרטים
                </button>
              </Link>
            </div>
          );
        })}
      </div>

      <section style={{
        marginTop: '3rem',
        background: 'rgba(255,255,255,0.8)',
        padding: '1rem',
        borderRadius: '10px'
      }}>
        <h3>ℹ️ אודות המכללה</h3>
        <p>
          המכללה האקדמית שלנו מציעה לסטודנטים סביבת לימודים מתקדמת,
          צוות מרצים מנוסה ותכניות לימודים עדכניות במגוון תחומים.
          כאן תוכלו לנהל את כל המידע האקדמי שלכם בצורה פשוטה ונוחה.
        </p>
      </section>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/help">
          <button style={{
            background: '#006699',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            🆘 עזרה
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
