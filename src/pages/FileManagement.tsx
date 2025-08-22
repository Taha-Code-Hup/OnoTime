import React, { useEffect, useMemo, useState } from 'react';
import type { StudyFile } from '../models/StudyFile';
import type { Course } from '../models/Course';
import { loadJSON, saveJSON } from '../utils/storage';
import { generateId } from '../utils/id';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FILE_KEY = 'files';
const COURSE_KEY = 'courses';

function FileManagement() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<StudyFile[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<StudyFile['type']>('pdf');
  const [fileUrl, setFileUrl] = useState('');
  const [courseId, setCourseId] = useState('');
  const [status, setStatus] = useState<StudyFile['status']>('pending');
  const [uploaderId, setUploaderId] = useState(''); // already here

  // Edit state
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    setFiles(loadJSON<StudyFile[]>(FILE_KEY, []));
    setCourses(loadJSON<Course[]>(COURSE_KEY, []));
  }, []);

  const courseOptions = useMemo(
    () => courses.map(c => ({ id: c.id, label: `${c.name} (${c.code})` })),
    [courses]
  );

  const reset = () => {
    setName('');
    setDescription('');
    setType('pdf');
    setFileUrl('');
    setCourseId('');
    setStatus('pending');
    setUploaderId('');
  };

  const addFile = (random = false) => {
    let fname = name,
      fdesc = description,
      ftype = type,
      furl = fileUrl,
      cid = courseId,
      fstatus = status,
      uid = uploaderId;

    if (random) {
      fname = `File ${Math.floor(Math.random() * 1000)}`;
      fdesc = 'קובץ לדוגמה';
      ftype = (['pdf', 'ppt', 'doc', 'link', 'other'] as StudyFile['type'][])[
        Math.floor(Math.random() * 5)
      ];
      furl =
        ftype === 'link'
          ? 'https://example.com'
          : 'https://example.com/sample.pdf';
      if (courses.length) cid = courses[Math.floor(Math.random() * courses.length)].id;
      fstatus = (['pending', 'approved', 'rejected'] as StudyFile['status'][] )[
        Math.floor(Math.random() * 3)
      ];
      uid = generateId('uploader');
    }

    if (!fname || !furl) {
      alert('Name and File URL are required.');
      return;
    }
    if (!cid) {
      alert('Please select a course for this file.');
      return;
    }

    const newFile: StudyFile = {
      id: generateId('file'),
      name: fname,
      description: fdesc,
      type: ftype,
      fileUrl: furl,
      courseId: cid,
      status: fstatus,
      uploaderId: uid, // already stored
    };

    const updated = [...files, newFile];
    setFiles(updated);
    saveJSON(FILE_KEY, updated);
    if (!random) reset();
  };

  const startEdit = (id: string) => setEditId(id);
  const cancelEdit = () => setEditId(null);

  const saveEdit = (id: string, updatedFile: StudyFile) => {
    const updated = files.map(f => (f.id === id ? updatedFile : f));
    setFiles(updated);
    saveJSON(FILE_KEY, updated);
    setEditId(null);
  };

  const deleteFile = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this file?')) return;
    const updated = files.filter(f => f.id !== id);
    setFiles(updated);
    saveJSON(FILE_KEY, updated);
  };

  // 🔧 Helper: show only the trailing numeric part for display (e.g., uploader_..._125331637 -> 125331637)
  const formatUploaderId = (raw: string): string => {
    if (!raw || raw.trim() === '') return '-';
    const parts = raw.split('_');
    const tail = parts[parts.length - 1] || raw;
    const digitsOnly = tail.replace(/\D/g, '');
    return digitsOnly || tail;
  };

  return (
    <div>
      <h2>File Management</h2>

      {/* Add Form */}
      <div className="form-row">
        <input placeholder="Name *" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <select value={type} onChange={e => setType(e.target.value as StudyFile['type'])}>
          <option value="pdf">PDF</option>
          <option value="ppt">PPT</option>
          <option value="doc">DOC</option>
          <option value="link">Link</option>
          <option value="other">Other</option>
        </select>
        <input placeholder="File URL *" value={fileUrl} onChange={e => setFileUrl(e.target.value)} />
        <select value={courseId} onChange={e => setCourseId(e.target.value)}>
          <option value="">Select Course *</option>
          {courseOptions.map(o => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
        <select value={status} onChange={e => setStatus(e.target.value as StudyFile['status'])}>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <input placeholder="Uploader ID" value={uploaderId} onChange={e => setUploaderId(e.target.value)} /> 
        {/* ADDED: Already here but ensure visible */}
      </div>
      <div className="actions">
        <button onClick={() => addFile(false)}>Add File</button>
        <button onClick={() => addFile(true)} style={{ marginLeft: 8 }}>
          Generate Random
        </button>
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Type</th><th>Description</th><th>Course</th><th>Status</th>
            <th>Uploader ID</th> {/* ADDED: New column */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map(f => {
            const c = courses.find(x => x.id === f.courseId);
            const isEditing = editId === f.id;

            return (
              <tr key={f.id}>
                {isEditing ? (
                  <>
                    <td><input value={f.name} onChange={e => saveEdit(f.id, { ...f, name: e.target.value })} /></td>
                    <td>
                      <select value={f.type} onChange={e => saveEdit(f.id, { ...f, type: e.target.value as StudyFile['type'] })}>
                        <option value="pdf">PDF</option><option value="ppt">PPT</option><option value="doc">DOC</option>
                        <option value="link">Link</option><option value="other">Other</option>
                      </select>
                    </td>
                    <td><input value={f.description} onChange={e => saveEdit(f.id, { ...f, description: e.target.value })} /></td>
                    <td>
                      <select value={f.courseId} onChange={e => saveEdit(f.id, { ...f, courseId: e.target.value })}>
                        {courseOptions.map(o => (
                          <option key={o.id} value={o.id}>{o.label}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select value={f.status} onChange={e => saveEdit(f.id, { ...f, status: e.target.value as StudyFile['status'] })}>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td>
                      <input value={f.uploaderId || ''} onChange={e => saveEdit(f.id, { ...f, uploaderId: e.target.value })} /> 
                      {/* ADDED: Editable uploader ID */}
                    </td>
                    <td>
                      <button onClick={cancelEdit}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{f.name}</td>
                    <td>{f.type}</td>
                    <td>{f.description}</td>
                    <td>{c ? `${c.name} (${c.code})` : f.courseId}</td>
                    <td>{f.status}</td>
                    <td>{formatUploaderId(f.uploaderId)}</td> {/* 🔧 show only trailing numeric part */}
                    <td>
                      <button onClick={() => startEdit(f.id)}>Edit</button>
                      <button onClick={() => deleteFile(f.id)} style={{ marginLeft: 8, color: 'red' }}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            );
          })}
          {files.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center' }}>No data</td> {/* updated colSpan */}
            </tr>
          )}
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

export default FileManagement;
