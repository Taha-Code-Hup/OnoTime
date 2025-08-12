import React, { useState, useEffect } from 'react';
import { Student } from '../models/Student';

// פונקציות ולידציה
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidId = (id: string) => /^\d{9}$/.test(id);

function StudentTable() {
  const [students, setStudents] = useState<Student[]>([]);

  // טעינת נתונים מ-localStorage בעת עליית הקומפוננטה
  useEffect(() => {
    const savedData = localStorage.getItem('students');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setStudents(parsed);
      } catch {
        console.error('Invalid data in localStorage');
      }
    }
  }, []);

  // הוספת סטודנט אקראי
  const addRandomStudent = () => {
    const randomId = Math.floor(Math.random() * 1_000_000_000)
      .toString()
      .padStart(9, '0');
    const randomName = `Student ${Math.floor(Math.random() * 100)}`;
    const randomEmail = `student${Math.floor(Math.random() * 100)}@example.com`;
    const randomSemester = Math.floor(Math.random() * 8) + 1;
    const courseOptions = ['React', 'Node.js', 'Python', 'Databases', 'CSS', 'HTML'];
    const randomCourse = courseOptions[Math.floor(Math.random() * courseOptions.length)];

    // ולידציות
    if (!isValidId(randomId)) {
      alert('Invalid ID generated');
      return;
    }
    if (!isValidEmail(randomEmail)) {
      alert('Invalid email generated');
      return;
    }

    // מניעת כפילויות
    if (students.some((s) => s.id === randomId)) {
      alert('Duplicate student ID generated. Try again.');
      return;
    }

    const newStudent = new Student(
      randomId,
      randomName,
      randomEmail,
      randomSemester,
      [randomCourse]
    );

    setStudents((prev) => [...prev, newStudent]);
  };

  // שמירה ל-localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem('students', JSON.stringify(students));
    alert('Students saved to localStorage!');
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={addRandomStudent}>➕ Add Random Student</button>
        <button onClick={saveToLocalStorage} style={{ marginLeft: '1rem' }}>
          💾 Save to LocalStorage
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>שם מלא</th>
            <th style={thStyle}>ת"ז</th>
            <th style={thStyle}>מייל</th>
            <th style={thStyle}>סמסטר</th>
            <th style={thStyle}>קורסים</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td style={tdStyle}>{s.fullName}</td>
              <td style={tdStyle}>{s.id}</td>
              <td style={tdStyle}>{s.email}</td>
              <td style={tdStyle}>{s.semester}</td>
              <td style={tdStyle}>{s.courses.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  padding: '8px',
  backgroundColor: '#f0f0f0',
};

const tdStyle: React.CSSProperties = {
  border: '1px solid #ccc',
  padding: '8px',
};

export default StudentTable;
