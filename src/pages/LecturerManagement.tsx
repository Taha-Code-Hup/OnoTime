// src/pages/LecturerManagement.tsx
import React, { useEffect, useMemo, useState } from 'react';
import type { Lecturer } from "../models/Lecturer";   // type-only import
import { permanentLecturers } from "../models/Lecturer"; // value import
import type { Course } from '../models/Course';
import { loadJSON, saveJSON } from '../utils/storage';
import { isValidEmail } from '../utils/validation';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LECT_KEY = 'lecturers';
const COURSE_KEY = 'courses';


function generateLecturerId() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

function LecturerManagement() {
  const navigate = useNavigate();
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [semestersText, setSemestersText] = useState('');
  const [customId, setCustomId] = useState('');  // <-- Added state for manual ID input

  // track which lecturer is being edited
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const savedLecturers = loadJSON<Lecturer[]>(LECT_KEY, []);
    const savedCourses = loadJSON<Course[]>(COURSE_KEY, []);

    
    const normalizedPermanent = permanentLecturers.map(p => ({
      ...p,
      id: p.id.length === 9 ? p.id : generateLecturerId(),
    }));

    // Merge permanent lecturers with saved ones (updates override defaults)
    const mergedLecturers = [
      ...normalizedPermanent.map(p => {
        const found = savedLecturers.find(l => l.id === p.id);
        return found || p;
      }),
      ...savedLecturers.filter(l => !normalizedPermanent.some(p => p.id === l.id)),
    ];

    setLecturers(mergedLecturers);
    setCourses(savedCourses);
  }, []);

  const courseOptions = useMemo(() => courses.map(c => ({ id: c.id, name: c.name })), [courses]);

  // map and helpers for semesters
  const courseMapById = useMemo(() => {
    const m = new Map<string, Course>();
    courses.forEach(c => m.set(c.id, c));
    return m;
  }, [courses]);

  // All unique semesters existing in courses
  const allSemesterOptions = useMemo(() => {
    const sems = new Set<number>();
    courses.forEach(c => {
      const sem = (c as any).semester;
      if (typeof sem === 'number') sems.add(sem);
    });
    return Array.from(sems).sort((a, b) => a - b);
  }, [courses]);

  // Semesters allowed by currently selected courses 
  const allowedSemestersForForm = useMemo(() => {
    if (selectedCourses.length === 0) return allSemesterOptions;
    const sems = new Set<number>();
    selectedCourses.forEach(id => {
      const c = courseMapById.get(id);
      const sem = c ? (c as any).semester : undefined;
      if (typeof sem === 'number') sems.add(sem);
    });
    return Array.from(sems).sort((a, b) => a - b);
  }, [selectedCourses, allSemesterOptions, courseMapById]);

  // semesters allowed for a particular lecturer’s selected courses
  const getSemestersForCourses = (courseIds: string[]) => {
    if (!courseIds || courseIds.length === 0) return allSemesterOptions;
    const sems = new Set<number>();
    courseIds.forEach(id => {
      const c = courseMapById.get(id);
      const sem = c ? (c as any).semester : undefined;
      if (typeof sem === 'number') sems.add(sem);
    });
    return Array.from(sems).sort((a, b) => a - b);
  };

  const reset = () => {
    setName('');
    setEmail('');
    setSelectedCourses([]);
    setSemestersText('');
    setCustomId(''); // Added reset for manual ID
  };

  const saveAll = (lects: Lecturer[], crs: Course[]) => {
    setLecturers(lects);
    setCourses(crs);
    saveJSON(LECT_KEY, lects);
    saveJSON(COURSE_KEY, crs);
  };

  const addLecturer = (random = false) => {
    let lname = name, lemail = email, cidList: string[] = [], sems: number[] = [];

    if (random) {
      lname = `Lecturer ${Math.floor(Math.random() * 1000)}`;
      lemail = `lect${Math.floor(Math.random() * 1000)}@example.com`;
      if (courses.length) {
        const pick = (arr: Course[]) => arr[Math.floor(Math.random() * arr.length)].id;
        const set = new Set<string>([pick(courses)]);
        if (courses.length > 1 && Math.random() > 0.5) set.add(pick(courses));
        cidList = Array.from(set);
      }
      // semesters derived from selected courses (NOT random)
      const semSet = new Set<number>();
      cidList.forEach(id => {
        const c = courseMapById.get(id);
        const sem = c ? (c as any).semester : undefined;
        if (typeof sem === 'number') semSet.add(sem);
      });
      sems = Array.from(semSet).sort((a, b) => a - b);
    } else {
      cidList = selectedCourses;
      // only keep semesters that are allowed by the selected courses
      const allowed = new Set<number>(allowedSemestersForForm);
      sems = semestersText
        .split(',')
        .map(x => parseInt(x.trim()))
        .filter(n => !isNaN(n) && allowed.has(n));
    }

    if (!lname || !lemail) { alert('Name and Email are required.'); return; }
    if (!isValidEmail(lemail)) { alert('Invalid email.'); return; }

    const newLect: Lecturer = {
      id: customId.trim() !== '' ? customId.trim() : generateLecturerId(),  // Use manual ID if provided
      name: lname,
      email: lemail,
      courses: cidList,
      semesters: sems,
    };

    // update courses with lecturerId 
    const updatedCourses: Course[] = courses.map(c =>
      cidList.includes(c.id)
        ? { ...c, lecturerId: newLect.id }
        : c
    );

    const updatedLecturers = [...lecturers, newLect];
    saveAll(updatedLecturers, updatedCourses);

    if (!random) reset();
  };

  const deleteLecturer = (id: string) => {
    if (permanentLecturers.some(p => p.id === id)) {
      alert("Permanent lecturers cannot be deleted, only edited.");
      return;
    }
    const updatedLecturers = lecturers.filter(l => l.id !== id);
    const updatedCourses = courses.map(c =>
      c.lecturerId === id ? { ...c, lecturerId: "" } : c
    );
    saveAll(updatedLecturers, updatedCourses);
  };

  // editing also updates course assignments + keeps semesters valid
  const editLecturerField = (id: string, field: keyof Lecturer, value: any) => {
    let updatedLecturers = lecturers.map(l =>
      l.id === id
        ? { ...l, [field]: value }
        : l
    );

    let updatedCourses = courses;

    if (field === "courses") {
      const newCourses: string[] = value;
      
      updatedCourses = courses.map(c => {
        if (newCourses.includes(c.id)) {
          return { ...c, lecturerId: id };
        } else if (c.lecturerId === id) {
          return { ...c, lecturerId: "" };
        }
        return c;
      });

      // auto-update semesters from selected courses
      const courseSemesters = getSemestersForCourses(newCourses);
      updatedLecturers = updatedLecturers.map(l =>
        l.id === id ? { ...l, semesters: courseSemesters } : l
      );
    }

    if (field === "semesters") {
      //ensure semesters stay within allowed set for this lecturer courses
      const current = lecturers.find(l => l.id === id);
      const allowed = getSemestersForCourses(current ? current.courses : []);
      const allowedSet = new Set<number>(allowed);
      const filtered = (value as number[]).filter(s => allowedSet.has(s));
      updatedLecturers = updatedLecturers.map(l =>
        l.id === id ? { ...l, semesters: filtered } : l
      );
    }

    saveAll(updatedLecturers, updatedCourses);
  };

  // row checkboxes to keep semestersText valid
  const filterSemestersTextToAllowed = (allowedNums: number[]) => {
    const current = semestersText.split(',').map(s => s.trim()).filter(Boolean);
    const allowedSet = new Set(allowedNums.map(n => String(n)));
    const filtered = current.filter(s => allowedSet.has(s));
    if (filtered.join(',') !== current.join(',')) {
      setSemestersText(filtered.join(','));
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1000px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>👨‍🏫 Lecturer Management</h2>

      {/*Quick overview list at the top */}
      <div style={{
        padding: "10px 15px",
        background: "#f9f9f9",
        borderRadius: "8px",
        marginBottom: "20px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <h3>Academic Staff</h3>
        {lecturers.length === 0 ? (
          <p style={{ color: "#777" }}>No lecturers yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {lecturers.map(l => {
              const isPermanent = permanentLecturers.some(p => p.id === l.id);
              return (
                <li
                  key={l.id}
                  style={{
                    padding: "6px 10px",
                    marginBottom: "6px",
                    border: `2px solid ${isPermanent ? "red" : "blue"}`,
                    borderRadius: "6px",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <strong>{l.name}</strong> — <span style={{ color: "#555" }}>{l.email}</span>
                    {isPermanent && <span style={{ marginLeft: "8px", color: "red", fontSize: "0.9em" }}>(Permanent)</span>}
                  </div>

                  {/* ADD: quick More info button in the top list */}
                  <div>
                    <button onClick={() => navigate(`/lecturers/${encodeURIComponent(l.id)}`)} style={{ marginLeft: 8 }}>
                      פרטים
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Form section */}
      <div style={{
        background: "#fff",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        marginBottom: "20px"
      }}>
        <div className="form-row" style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
          <input placeholder="Lecturer ID" value={customId} onChange={e => setCustomId(e.target.value)} />
        </div>
        <div className="form-row" style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
          <input placeholder="Name *" value={name} onChange={e => setName(e.target.value)} />
          <input placeholder="Email *" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        {/*  courses selection to checkboxes (add form) */}
        <div className="form-row" style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
          <div
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              maxHeight: 160,
              overflow: "auto",
              minWidth: 220
            }}
          >
            {courseOptions.map(c => (
              <label key={c.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <input
                  type="checkbox"
                  value={c.id}
                  checked={selectedCourses.includes(c.id)}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...selectedCourses, c.id]
                      : selectedCourses.filter(id => id !== c.id);
                    setSelectedCourses(next);
                    // keep semestersText within allowed values
                    const allowed = (() => {
                      if (next.length === 0) return allSemesterOptions;
                      const sems = new Set<number>();
                      next.forEach(id => {
                        const cc = courseMapById.get(id);
                        const sem = cc ? (cc as any).semester : undefined;
                        if (typeof sem === 'number') sems.add(sem);
                      });
                      return Array.from(sems).sort((a, b) => a - b);
                    })();
                    filterSemestersTextToAllowed(allowed);
                  }}
                />
                {c.name}
              </label>
            ))}
          </div>

          {/* semesters select stays as is */}
          <select
            multiple
            value={semestersText.split(',').map(s => s.trim()).filter(Boolean)}
            onChange={e => {
              const selected = Array.from(e.target.selectedOptions, option => option.value);
              setSemestersText(selected.join(','));
            }}
          >
            {allowedSemestersForForm.map(num => (
              <option key={num} value={num.toString()}>
                Semester {num}
              </option>
            ))}
          </select>
        </div>
        {/* END change (add form)  */}

        <div className="actions" style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => addLecturer(false)} style={{ padding: "6px 12px" }}>Add Lecturer</button>
          <button onClick={() => addLecturer(true)} style={{ padding: "6px 12px", background: "#eee" }}>Generate Random</button>
        </div>
      </div>

      {/*  Table section */}
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
        <thead style={{ background: "#f0f0f0" }}>
          <tr>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>ID</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Email</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Courses</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Semesters</th>
            <th style={{ padding: "8px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {lecturers.map(l => {
            const isEditing = editingId === l.id;
            const isPermanent = permanentLecturers.some(p => p.id === l.id);
            const allowedForRow = getSemestersForCourses(l.courses);
            return (
              <tr
                key={l.id}
                style={{
                  border: `2px solid ${isPermanent ? "red" : "blue"}`
                }}
              >
                <td style={{ padding: "6px", border: "1px solid #ddd" }}>{l.id}</td>
                <td style={{ padding: "6px", border: "1px solid #ddd" }}>
                  {isEditing
                    ? <input value={l.name} onChange={e => editLecturerField(l.id, "name", e.target.value)} />
                    : l.name}
                </td>
                <td style={{ padding: "6px", border: "1px solid #ddd" }}>
                  {isEditing
                    ? <input value={l.email} onChange={e => editLecturerField(l.id, "email", e.target.value)} />
                    : l.email}
                </td>
                <td style={{ padding: "6px", border: "1px solid #ddd" }}>
                  {isEditing ? (
                    // CHANGED: courses selection to checkboxes 
                    <div style={{ padding: 6, border: "1px solid #ddd", borderRadius: 6, maxHeight: 140, overflow: "auto" }}>
                      {courseOptions.map(c => (
                        <label key={c.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                          <input
                            type="checkbox"
                            value={c.id}
                            checked={l.courses.includes(c.id)}
                            onChange={(e) => {
                              const next = e.target.checked
                                ? [...l.courses, c.id]
                                : l.courses.filter(id => id !== c.id);
                              editLecturerField(l.id, "courses", next);
                            }}
                          />
                          {c.name}
                        </label>
                      ))}
                    </div>
                    // END change (edit row) 
                  ) : (
                    l.courses.map(cid => {
                      const course = courses.find(c => c.id === cid);
                      return course ? course.name : cid;
                    }).join(', ')
                  )}
                </td>
                <td style={{ padding: "6px", border: "1px solid #ddd" }}>
                  {isEditing ? (
                    <select
                      multiple
                      value={l.semesters.map(s => s.toString())}
                      onChange={e => {
                        const selected = Array.from(e.target.selectedOptions, option => parseInt(option.value));
                        editLecturerField(l.id, "semesters", selected);
                      }}
                    >
                      {allowedForRow.map(num => (
                        <option key={num} value={num.toString()}>
                          Semester {num}
                        </option>
                      ))}
                    </select>
                  ) : (
                    l.semesters.join(', ')
                  )}
                </td>
                <td style={{ padding: "6px", border: "1px solid #ddd" }}>
                  {isEditing ? (
                    <>
                      <button onClick={() => setEditingId(null)}>Save</button>
                      <button onClick={() => deleteLecturer(l.id)} style={{ marginLeft: 6 }}>Delete</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setEditingId(l.id)}>Edit</button>

                      {/* NEW: More info button (navigates to detail page) */}
                      <button onClick={() => navigate(`/lecturers/${encodeURIComponent(l.id)}`)} style={{ marginLeft: 6 }}>
                        פרטים
                      </button>

                      <button onClick={() => deleteLecturer(l.id)} style={{ marginLeft: 6 }}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
          {lecturers.length === 0 && (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: "10px" }}>No data</td>
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

export default LecturerManagement;
