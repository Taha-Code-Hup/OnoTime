import React, { useEffect, useMemo, useState } from 'react';  
import type { Course } from '../models/Course';
import type { Lecturer } from '../models/Lecturer';
import { loadJSON, saveJSON } from '../utils/storage';
import { generateId } from '../utils/id';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const COURSE_KEY = 'courses';
const LECT_KEY = 'lecturers';


function CourseManagement() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [lecturerId, setLecturerId] = useState('');
  const [semester, setSemester] = useState(1);

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    // Just load data (Home.tsx already seeded defaults if empty)
    const savedCourses = loadJSON<Course[]>(COURSE_KEY, []);
    setCourses(savedCourses);

    const savedLecturers = loadJSON<Lecturer[]>(LECT_KEY, []);
    setLecturers(savedLecturers);
  }, []);

  const lecturerOptions = useMemo(
    () => lecturers.map(l => ({ id: l.id, label: l.name })),
    [lecturers]
  );

  const reset = () => {
    setName('');
    setCode('');
    setDescription('');
    setLecturerId('');
    setSemester(1);
  };

  const saveAll = (updatedCourses: Course[], updatedLecturers: Lecturer[]) => {
    setCourses(updatedCourses);
    setLecturers(updatedLecturers);
    saveJSON(COURSE_KEY, updatedCourses);
    saveJSON(LECT_KEY, updatedLecturers);
  };

  const addCourse = (random = false) => {
    let cname = name,
      ccode = code,
      cdesc = description,
      lid = lecturerId,
      sem = semester;

    if (random) {
      cname = `Course ${Math.floor(Math.random() * 1000)}`;
      ccode = `C${Math.floor(Math.random() * 1000)}`;
      cdesc = 'קורס לדוגמה תיאור קצר.';
      sem = Math.floor(Math.random() * 8) + 1;
      if (lecturers.length) lid = lecturers[Math.floor(Math.random() * lecturers.length)].id;
    }

    if (!cname || !ccode) {
      alert('Name and Code are required.');
      return;
    }
    if (courses.some(c => c.code.toLowerCase() === ccode.toLowerCase())) {
      alert('Duplicate course code.');
      return;
    }

    const newCourse: Course = {
      id: generateId('crs'),
      name: cname,
      code: ccode,
      description: cdesc,
      lecturerId: lid || '',
      studentIds: [],
      semester: sem,
      views: 0
    };

    const updatedCourses = [...courses, newCourse];

    let updatedLecturers = lecturers.slice();
    if (newCourse.lecturerId) {
      updatedLecturers = lecturers.map(l =>
        l.id === newCourse.lecturerId
          ? { ...l, courses: Array.from(new Set([...(l.courses || []), newCourse.id])) }
          : l
      );
    }

    saveAll(updatedCourses, updatedLecturers);

    if (!random) reset();
  };

  const editCourseField = (id: string, field: keyof Course, value: any) => {
    let updatedCourses = courses.map(c =>
      c.id === id ? { ...c, [field]: value } : c
    );

    let updatedLecturers = lecturers;
    if (field === 'lecturerId') {
      const oldCourse = courses.find(c => c.id === id);
      if (oldCourse) {
        updatedLecturers = lecturers.map(l =>
          l.id === oldCourse.lecturerId
            ? { ...l, courses: (l.courses || []).filter(cid => cid !== id) }
            : l.id === value
            ? { ...l, courses: Array.from(new Set([...(l.courses || []), id])) }
            : l
        );
      }
    }

    saveAll(updatedCourses, updatedLecturers);
  };

  const deleteCourse = (id: string) => {
    const updatedCourses = courses.filter(c => c.id !== id);
    const updatedLecturers = lecturers.map(l => ({
      ...l,
      courses: (l.courses || []).filter(cid => cid !== id),
    }));
    saveAll(updatedCourses, updatedLecturers);
  };

  return (
    <div>
      <h2>Course Management</h2>

      <div className="form-row">
        <input
          placeholder="Course Name *"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          placeholder="Course Code *"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <select
          value={lecturerId}
          onChange={e => setLecturerId(e.target.value)}
        >
          <option value="">Select Lecturer</option>
          {lecturerOptions.map(o => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
        <input
          type="number"
          min={1}
          max={12}
          placeholder="Semester"
          value={semester}
          onChange={e => setSemester(parseInt(e.target.value || '1'))}
        />
      </div>
      <div className="actions">
        <button onClick={() => addCourse(false)}>Add Course</button>
        <button onClick={() => addCourse(true)} style={{ marginLeft: 8 }}>
          Generate Random
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>Lecturer</th>
            <th>Semester</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(c => {
            const l = lecturers.find(x => x.id === c.lecturerId);
            const isEditing = editingId === c.id;
            return (
              <tr key={c.id}>
                <td>
                  {isEditing ? (
                    <input
                      value={c.name}
                      onChange={e => editCourseField(c.id, 'name', e.target.value)}
                    />
                  ) : (
                    c.name
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      value={c.code}
                      onChange={e => editCourseField(c.id, 'code', e.target.value)}
                    />
                  ) : (
                    c.code
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <select
                      value={c.lecturerId ?? ''} /* coerce to string */
                      onChange={e => editCourseField(c.id, 'lecturerId', e.target.value)}
                    >
                      <option value="">—</option>
                      {lecturerOptions.map(o => (
                        <option key={o.id} value={o.id}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  ) : l ? (
                    l.name
                  ) : (
                    '—'
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      type="number"
                      min={1}
                      max={12}
                      value={c.semester}
                      onChange={e =>
                        editCourseField(c.id, 'semester', parseInt(e.target.value || '1'))
                      }
                    />
                  ) : (
                    c.semester
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <input
                      value={c.description || ''}
                      onChange={e =>
                        editCourseField(c.id, 'description', e.target.value)
                      }
                    />
                  ) : c.description ? (
                    c.description
                  ) : (
                    '—'
                  )}
                </td>
                <td>
                  {isEditing ? (
                    <button onClick={() => setEditingId(null)}>Save</button>
                  ) : (
                    <button onClick={() => setEditingId(c.id)}>Edit</button>
                  )}
                  <button onClick={() => deleteCourse(c.id)} style={{ marginLeft: 8 }}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
          {courses.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ textAlign: 'center', marginTop: 30 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate("/home")}
        >
          חזרה לעמוד הבית
        </Button>
      </div>
    </div>
  );
}

export default CourseManagement;
