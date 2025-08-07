import React from 'react';
import { students } from '../data/students';

function StudentTable() {
  return (
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
        {students.map((student) => (
          <tr key={student.id}>
            <td style={tdStyle}>{student.fullName}</td>
            <td style={tdStyle}>{student.id}</td>
            <td style={tdStyle}>{student.email}</td>
            <td style={tdStyle}>{student.semester}</td>
            <td style={tdStyle}>{student.courses.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
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
