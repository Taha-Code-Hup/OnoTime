// src/pages/AllLecturers.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { lecturerProfiles } from '../models/Lecturer';
import Button from '@mui/material/Button';

const styles = {
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 24,
  },
};

export default function AllLecturers() {
  const navigate = useNavigate();

  return (
    <main style={{ padding: 20, maxWidth: 1100, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>כל המרצים — פרופילים מלאים</h1>
        <p style={{ margin: 0, color: '#666' }}>לחצו על מרצה כדי לצפות ב״פרטים נוספים״</p>
      </header>

      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 16
      }}>
        {lecturerProfiles.map((p) => (
          <article key={p.id} style={{
            background: '#fff',
            borderRadius: 10,
            padding: 14,
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: 160
          }}>
            <div>
              <h3 style={{ margin: '0 0 6px 0' }}>{p.name}</h3>
              <div style={{ color: '#555', fontSize: 14, marginBottom: 8 }}>{p.title ?? p.specialization}</div>

              <div style={{ fontSize: 13, color: '#444' }}>
                <strong>נושאים בולטים:</strong>
                <div style={{ marginTop: 6 }}>
                  {(p.subjects && p.subjects.length > 0) ? p.subjects.slice(0, 3).map((s, idx) => (
                    <span key={s + idx} style={{ display: 'inline-block', marginRight: 8, marginBottom: 6, padding: '4px 8px', border: '1px solid #ddd', borderRadius: 16, fontSize: 12 }}>
                      {s}
                    </span>
                  )) : <span style={{ color: '#888' }}>אין נושאים רשומים</span>}
                </div>
              </div>

              <p style={{ marginTop: 10, fontSize: 13, color: '#333' }}>
                {p.experience ? (p.experience.length > 140 ? p.experience.slice(0, 140) + '…' : p.experience) : 'אין תקציר ניסיון זמין'}
              </p>
            </div>

            <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                onClick={() => navigate(`/lecturers/${encodeURIComponent(p.id)}`)}
                style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#007bff', color: '#fff', cursor: 'pointer' }}
              >
                פרטים
              </button>

              <button
                onClick={() => {
                  // quick contact action (opens mail client)
                  if (p.email) window.location.href = `mailto:${p.email}`;
                }}
                style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
              >
                שלח אימייל
              </button>

              <div style={{ marginLeft: 'auto', color: '#666', fontSize: 12 }}>
                {p.office ? <div>{p.office}</div> : <div style={{ color: '#aaa' }}>מיקום משרדי חסר</div>}
              </div>
            </div>
          </article>
        ))}
      </section>

      <footer style={{ marginTop: 28, textAlign: 'center', color: '#666' }}>
        עמוד מציג את כל המרצים הקבועים. לחיצה על "פרטים" פותחת את העמוד המפורט של המרצה.
      </footer>

         <div style={styles.buttonContainer}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate("/home")}
        >
          חזרה לעמוד הבית
        </Button>
      </div>
    </main>
  );
}
