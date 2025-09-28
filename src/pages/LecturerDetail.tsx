// src/pages/LecturerDetail.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { permanentLecturers, getLecturerProfileById } from '../models/Lecturer';
import type { Lecturer } from '../models/Lecturer';

export default function LecturerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // basic lecturer record (original structure)
  const basicLecturer: Lecturer | undefined = React.useMemo(
    () => permanentLecturers.find((x) => x.id === id),
    [id]
  );

  // richer profile (may be undefined if no profile)
  const profile = React.useMemo(() => (id ? getLecturerProfileById(id) : undefined), [id]);

  if (!basicLecturer && !profile) {
    return (
      <div className="p-6">
        <button onClick={() => navigate(-1)} className="mb-4 text-sm underline">
          ← חזור
        </button>
        <div className="text-red-600">מרצה לא נמצא.</div>
      </div>
    );
  }

  // prefer profile fields when available, otherwise fall back to basic lecturer
  const name = profile?.name ?? basicLecturer?.name ?? '—';
  const displayTitle = profile?.title ?? basicLecturer?.specialization ?? '';
  const displaySubjects: string[] =
    profile?.subjects && profile.subjects.length > 0
      ? profile.subjects
      : (basicLecturer?.courses ?? []);
  const certifications = profile?.certifications ?? [];
  const education = profile?.education ?? [];
  const experience = profile?.experience ?? '';
  const bio = profile?.bio ?? '';
  const phone = profile?.phone ?? '';
  const email = basicLecturer?.email ?? profile?.email ?? '';
  const office = profile?.office ?? '';
  const officeHours = profile?.officeHours ?? '';
  const researchInterests = profile?.researchInterests ?? [];
  const publications = profile?.publications ?? [];
  const selectedProjects = profile?.selectedProjects ?? [];
  const teachingFocus = profile?.teachingFocus ?? [];
  const awards = profile?.awards ?? [];
  const teachingPhilosophy = profile?.teachingPhilosophy ?? '';
  const languages = profile?.languages ?? [];
  const rating = typeof profile?.teachingRating === 'number' ? profile!.teachingRating : null;
  const profileImageUrl = profile?.profileImageUrl ?? null;

  return (
    <main style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #ddd',
            background: '#fff',
            cursor: 'pointer',
          }}
        >
          ← חזור לרשימת המרצים
        </button>

        {email && (
          <button
            onClick={() => (window.location.href = `mailto:${email}`)}
            style={{
              padding: '8px 12px',
              borderRadius: 8,
              border: 'none',
              background: '#007bff',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            שלח אימייל למרצה
          </button>
        )}

        <div style={{ marginLeft: 'auto', color: '#666', fontSize: 14 }}>
          {displayTitle && <div style={{ fontWeight: 600 }}>{displayTitle}</div>}
          {office && <div style={{ fontSize: 13 }}>{office}</div>}
        </div>
      </div>

      <article
        style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: 24,
          background: '#fff',
          padding: 20,
          borderRadius: 12,
          boxShadow: '0 8px 30px rgba(12,20,30,0.08)',
        }}
      >
        {/* LEFT COLUMN - PROFILE SUMMARY */}
        <aside style={{ borderRight: '1px solid #f0f0f0', paddingRight: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: 12,
                background: '#eef3f8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
                fontSize: 28,
              }}
            >
              {profileImageUrl ? (
                <img src={profileImageUrl} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: '#556', padding: 6 }}>{name.split(' ')[0]}</span>
              )}
            </div>

            <div>
              <h1 style={{ margin: 0, fontSize: 18 }}>{name}</h1>
              {displayTitle && <div style={{ color: '#555', marginTop: 4 }}>{displayTitle}</div>}
              {rating !== null && (
                <div style={{ marginTop: 8, color: '#1f7a59', fontWeight: 600 }}>{`דירוג הוראה: ${rating}/5`}</div>
              )}
            </div>
          </div>

          {/* Quick contact & logistics */}
          <div style={{ marginTop: 8 }}>
            <h4 style={{ margin: '8px 0', fontSize: 14 }}>פרטי קשר</h4>
            <div style={{ fontSize: 14, color: '#333' }}>
              <div>
                <strong>אימייל: </strong>
                {email ? (
                  <a href={`mailto:${email}`} style={{ color: '#0066cc', textDecoration: 'none' }}>
                    {email}
                  </a>
                ) : (
                  'לא זמין'
                )}
              </div>
              <div style={{ marginTop: 6 }}>
                <strong>טלפון: </strong>
                {phone || 'לא זמין'}
              </div>
              <div style={{ marginTop: 6 }}>
                <strong>משרד: </strong>
                {office || 'לא זמין'}
              </div>
              <div style={{ marginTop: 6 }}>
                <strong>שעות קבלה: </strong>
                {officeHours || 'בתיאום מראש'}
              </div>
            </div>
          </div>

          {/* Languages & teaching focus */}
          <div style={{ marginTop: 14 }}>
            <h4 style={{ margin: '8px 0', fontSize: 14 }}>שפות הוראה</h4>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {languages.length > 0 ? (
                languages.map((lg) => (
                  <span
                    key={lg}
                    style={{
                      padding: '6px 8px',
                      borderRadius: 999,
                      border: '1px solid #e6eef6',
                      background: '#f7fbff',
                      fontSize: 13,
                    }}
                  >
                    {lg}
                  </span>
                ))
              ) : (
                <span style={{ color: '#888' }}>לא צוינו שפות</span>
              )}
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <h4 style={{ margin: '8px 0', fontSize: 14 }}>תחומי הוראה עיקריים</h4>
            <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
              {teachingFocus.length > 0 ? (
                teachingFocus.map((t, i) => (
                  <div
                    key={t + i}
                    style={{
                      padding: '6px 8px',
                      borderRadius: 8,
                      background: '#fafafa',
                      border: '1px solid #f0f0f0',
                      fontSize: 13,
                    }}
                  >
                    {t}
                  </div>
                ))
              ) : (
                <div style={{ color: '#888' }}>לא צוינו</div>
              )}
            </div>
          </div>

          {/* Awards */}
          {awards.length > 0 && (
            <div style={{ marginTop: 14 }}>
              <h4 style={{ margin: '8px 0', fontSize: 14 }}>הוקרות ופרסים</h4>
              <ul style={{ paddingLeft: 16, marginTop: 8 }}>
                {awards.map((a, idx) => (
                  <li key={a + idx} style={{ fontSize: 13, color: '#333' }}>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* RIGHT COLUMN - DETAILED INFO */}
        <section>
          {/* Intro / Bio */}
          <div>
            <h3 style={{ marginBottom: 6, fontSize: 16 }}>תקציר מקצועי</h3>
            {bio ? (
              <p style={{ color: '#333', lineHeight: 1.6 }}>{bio}</p>
            ) : (
              <p style={{ color: '#666' }}>אין תקציר זמין — ניתן לפנות למרצה לפרטים נוספים.</p>
            )}
          </div>

          {/* Subjects & Courses */}
          <div style={{ marginTop: 16 }}>
            <h3 style={{ marginBottom: 8, fontSize: 16 }}>נושאים / קורסים</h3>
            {displaySubjects.length > 0 ? (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {displaySubjects.map((s, i) => (
                  <span
                    key={String(s) + i}
                    style={{
                      padding: '6px 10px',
                      borderRadius: 999,
                      background: '#eef7ff',
                      border: '1px solid #dbeffd',
                      fontSize: 13,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <p style={{ color: '#666' }}>לא צוינו נושאים</p>
            )}
          </div>

          {/* Education & Certifications */}
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <h4 style={{ marginBottom: 6, fontSize: 15 }}>השכלה</h4>
              {education.length > 0 ? (
                <ul style={{ paddingLeft: 16 }}>
                  {education.map((e, i) => (
                    <li key={e + i} style={{ color: '#333', fontSize: 13 }}>
                      {e}
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ color: '#666' }}>לא צוינה השכלה</div>
              )}
            </div>

            <div>
              <h4 style={{ marginBottom: 6, fontSize: 15 }}>תעודות והכשרות</h4>
              {certifications.length > 0 ? (
                <ul style={{ paddingLeft: 16 }}>
                  {certifications.map((c, i) => (
                    <li key={c + i} style={{ color: '#333', fontSize: 13 }}>
                      {c}
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ color: '#666' }}>לא צוינו</div>
              )}
            </div>
          </div>

          {/* Experience */}
          <div style={{ marginTop: 16 }}>
            <h3 style={{ marginBottom: 8, fontSize: 16 }}>ניסיון מקצועי</h3>
            {experience ? <p style={{ color: '#333', lineHeight: 1.6 }}>{experience}</p> : <div style={{ color: '#666' }}>לא צויין</div>}
          </div>

          {/* Research & Projects */}
          <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
            <div>
              <h4 style={{ marginBottom: 6, fontSize: 15 }}>תחומי מחקר</h4>
              {researchInterests.length > 0 ? (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {researchInterests.map((r, i) => (
                    <span
                      key={r + i}
                      style={{
                        padding: '6px 10px',
                        borderRadius: 999,
                        background: '#fff7ec',
                        border: '1px solid #fde6c8',
                        fontSize: 13,
                      }}
                    >
                      {r}
                    </span>
                  ))}
                </div>
              ) : (
                <div style={{ color: '#666' }}>לא צוינו</div>
              )}
            </div>

            <div>
              <h4 style={{ marginBottom: 6, fontSize: 15 }}>פרסומים (נבחרים) & פרויקטים</h4>
              {publications.length + selectedProjects.length > 0 ? (
                <>
                  {publications.length > 0 && (
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: 6 }}>פרסומים</div>
                      <ul style={{ paddingLeft: 16 }}>
                        {publications.map((p, i) => (
                          <li key={p + i} style={{ fontSize: 13, color: '#333' }}>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedProjects.length > 0 && (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ fontWeight: 600, marginBottom: 6 }}>פרויקטים נבחרים</div>
                      <ul style={{ paddingLeft: 16 }}>
                        {selectedProjects.map((pr, i) => (
                          <li key={pr + i} style={{ fontSize: 13, color: '#333' }}>
                            {pr}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div style={{ color: '#666' }}>אין פרסומים או פרויקטים רשומים</div>
              )}
            </div>
          </div>

          {/* Teaching philosophy */}
          {teachingPhilosophy && (
            <div style={{ marginTop: 16 }}>
              <h3 style={{ marginBottom: 8, fontSize: 16 }}>פילוסופיית הוראה</h3>
              <p style={{ color: '#333', lineHeight: 1.6 }}>{teachingPhilosophy}</p>
            </div>
          )}

          {/* Small footer note */}
          <div style={{ marginTop: 18, paddingTop: 12, borderTop: '1px solid #f0f0f0', color: '#666', fontSize: 13 }}>
            עמוד זה מיועד להציג את הניסיון, ההשכלה ותחומי העיסוק של המרצה. פרטים נוספים (שעות, פרויקטים ופרסומים) עשויים להתעדכן מעת לעת.
          </div>
        </section>
      </article>
    </main>
  );
}
