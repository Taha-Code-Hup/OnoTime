import React, { useState, useEffect } from 'react';
import type { Student } from '../models/Student';
import type { Course } from '../models/Course';
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidNationalId = (id: string) => /^\d{9}$/.test(id);

function StudentManagement() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [semester, setSemester] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  // NEW: editing state
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const savedStudents = localStorage.getItem('students');
    if (savedStudents) setStudents(JSON.parse(savedStudents));

    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) setCourses(JSON.parse(savedCourses));
  }, []);

  const saveToLocalStorage = (data: Student[]) => {
    localStorage.setItem('students', JSON.stringify(data));
  };

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const addStudent = (random = false) => {
    let name = fullName;
    let mail = email;
    let natId = nationalId;
    let sem = semester;
    let courseIds = selectedCourses;

    if (random) {
      name = `Student ${Math.floor(Math.random() * 100)}`;
      mail = `student${Math.floor(Math.random() * 100)}@example.com`;
      natId = Math.floor(100000000 + Math.random() * 900000000).toString();
      sem = Math.floor(Math.random() * 8) + 1;
      if (courses.length > 0) {
        const randomCount = Math.floor(Math.random() * courses.length) + 1;
        courseIds = courses
          .sort(() => 0.5 - Math.random())
          .slice(0, randomCount)
          .map((c) => c.id);
      } else {
        courseIds = [];
      }
    }

    if (!name || !mail || !natId) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!isValidEmail(mail)) {
      alert('Invalid email format.');
      return;
    }
    if (!isValidNationalId(natId)) {
      alert('National ID must be 9 digits.');
      return;
    }

    if (editingId) {
      // update student
      const updated = students.map((s) =>
        s.id === editingId ? { ...s, fullName: name, email: mail, nationalId: natId, semester: sem, courseIds } : s
      );
      setStudents(updated);
      saveToLocalStorage(updated);
      setEditingId(null);
    } else {
      // check duplicates only for new
      if (students.some((s) => s.nationalId === natId)) {
        alert('Student with this National ID already exists.');
        return;
      }

      const newStudent: Student = {
        id: uuidv4(),
        fullName: name,
        email: mail,
        nationalId: natId,
        semester: sem,
        courseIds: courseIds
      };

      const updated = [...students, newStudent];
      setStudents(updated);
      saveToLocalStorage(updated);
    }

    // reset form
    if (!random) {
      setFullName('');
      setEmail('');
      setNationalId('');
      setSemester(1);
      setSelectedCourses([]);
    }
  };

  // NEW: delete student
  const deleteStudent = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
    saveToLocalStorage(updated);
  };

  // NEW: edit student
  const startEdit = (student: Student) => {
    setEditingId(student.id);
    setFullName(student.fullName);
    setEmail(student.email);
    setNationalId(student.nationalId);
    setSemester(student.semester);
    setSelectedCourses(student.courseIds || []);
  };

  return (
    <div>
      <h2>Student Management</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="National ID" value={nationalId} onChange={(e) => setNationalId(e.target.value)} />
        <input type="number" placeholder="Semester" value={semester} onChange={(e) => setSemester(parseInt(e.target.value))} />

        <div style={{ marginTop: '0.5rem' }}>
          <strong>Assign to Courses:</strong>
          {courses.length === 0 && <p>No courses available. Add some first.</p>}
          
          {/* SCROLLABLE CONTAINER */}
          <div style={{
            maxHeight: '150px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            padding: '5px',
            marginTop: '5px',
            borderRadius: '5px',
            backgroundColor: '#fafafa'
          }}>
            {courses.map((course) => (
              <label key={course.id} style={{ display: 'block', marginBottom: '4px' }}>
                <input
                  type="checkbox"
                  checked={selectedCourses.includes(course.id)}
                  onChange={() => toggleCourseSelection(course.id)}
                />
                {course.name}
              </label>
            ))}
          </div>
        </div>

        <button onClick={() => addStudent(false)}>
          {editingId ? "Update Student" : "Add Student"}
        </button>
        <button onClick={() => addStudent(true)} style={{ marginLeft: '10px' }}>Generate Random</button>
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setFullName('');
              setEmail('');
              setNationalId('');
              setSemester(1);
              setSelectedCourses([]);
            }}
            style={{ marginLeft: '10px' }}
          >
            Cancel
          </button>
        )}
      </div>

      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>ID</th>
            <th>Semester</th>
            <th>Courses</th>
            <th>Actions</th> {/* NEW */}
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.fullName}</td>
              <td>{s.email}</td>
              <td>{s.nationalId}</td>
              <td>{s.semester}</td>
              <td>
                {(s.courseIds || [])
                  .map((cid) => courses.find((c) => c.id === cid)?.name || 'Unknown')
                  .join(', ')}
              </td>
              <td>
                <button onClick={() => startEdit(s)}>Edit</button>
                <button onClick={() => deleteStudent(s.id)} style={{ marginLeft: '5px', color: 'red' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: 30 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate("/")}
        >
          חזרה לעמוד הבית
        </Button>
      </div>
    </div>
  );
}

export default StudentManagement;
