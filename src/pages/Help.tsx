import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Help.tsx — expanded content for מדעי מחשב / מערכות מידע
// Updated: inline CourseDetail view so "פרטי קורס" shows real information without needing extra routes.

const styles = {
  container: {
    maxWidth: 950,
    margin: "28px auto",
    padding: 22,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    boxShadow: "0 6px 18px rgba(15,23,42,0.06)",
    color: "#0f172a",
    lineHeight: 1.6,
  },
  header: {
    color: "#0ea5e9",
    borderBottom: "3px solid #0ea5e9",
    paddingBottom: 10,
    marginBottom: 18,
    fontSize: 26,
  },
  sectionTitle: {
    color: "#075985",
    marginTop: 26,
    marginBottom: 12,
    borderBottom: "2px solid #38bdf8",
    paddingBottom: 6,
    fontSize: 18,
  },
  smallList: { paddingLeft: 18, margin: 0 },
  contactInfo: {
    backgroundColor: "#e0f2fe",
    padding: 16,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 28,
    textAlign: "center",
  },
  imageCard: {
    borderRadius: 10,
    overflow: 'hidden',
    border: '1px solid rgba(2,6,23,0.06)'
  },
  courseButton: {
    padding: '6px 10px',
    borderRadius: 8,
    border: '1px solid rgba(2,6,23,0.08)',
    background: 'white',
    cursor: 'pointer'
  },
  modalBackdrop: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(2,6,23,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  },
  modalCard: {
    width: 'min(880px, 96%)',
    maxHeight: '85vh',
    overflowY: 'auto' as const,
    background: 'white',
    borderRadius: 10,
    padding: 18,
    boxShadow: '0 12px 30px rgba(2,6,23,0.2)'
  }
};

export default function Help() {
  const navigate = useNavigate();
  type SectionKey = 'cs' | 'is';
  const [section, setSection] = React.useState<SectionKey>('cs');

  const WIKIMEDIA_ONO_960 = 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Ono_Academic_College%2C_Kiryat_Ono.jpg/960px-Ono_Academic_College%2C_Kiryat_Ono.jpg';

  const IMAGES_CS = [
    WIKIMEDIA_ONO_960,
    'https://source.unsplash.com/800x600/?computer-science,students',
    'https://source.unsplash.com/800x600/?programming,lecture',
    'https://source.unsplash.com/800x600/?lab,computers',
  ];

  const IMAGES_IS = [
    WIKIMEDIA_ONO_960,
    'https://source.unsplash.com/800x600/?information-systems,team',
    'https://source.unsplash.com/800x600/?database,server-room',
    'https://source.unsplash.com/800x600/?business,meeting',
  ];

  const [collageImages, setCollageImages] = React.useState<string[]>([]);
  React.useEffect(() => {
    const source = section === 'cs' ? IMAGES_CS : IMAGES_IS;
    setCollageImages(source.slice(0, 4));
  }, [section]);

  const [mainLoaded, setMainLoaded] = React.useState(false);

  const SVG_PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'>
      <rect width='100%' height='100%' fill='#e6eef6'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial, Helvetica, sans-serif' font-size='20' fill='#7b8794'>תמונה לא זמינה</text>
    </svg>
  `)}`;

  function imageFallback(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    const img = e.currentTarget as HTMLImageElement;
    img.onerror = null;
    img.src = collageImages && collageImages.length > 0 ? collageImages[0] : SVG_PLACEHOLDER;
  }

  // ======== Course data with details (used by "פרטי קורס" modal) ========
  type Course = {
    code: string;
    title: string;
    description: string;
    objectives: string[];
    credits?: number;
    syllabusPdf?: string;
  };

  const courseDetails: Record<string, Course> = {
    cs101: {
      code: 'CS101',
      title: 'מבוא למדעי המחשב: תכנות ופתרון בעיות',
      description: 'קורס מבוא המעניק בסיס בתכנות (פונקציות, לולאות, מבני נתונים בסיסיים) וחשיבה אלגוריתמית. דגש על פתרון בעיות, כתיבת קוד קריא ובדיקות.',
      objectives: [
        'לרכוש מיומנויות תכנות בסיסיות בפייתון/שפת C (להתאימם לפי תוכנית).',
        'להבין מבני נתונים פשוטים (מחרוזות, מערכים, רשימות) וליישמם.',
        'לרכוש כלים בסיסיים לניתוח סיבוכיות זמן וזיכרון.'
      ],
      credits: 4,
      syllabusPdf: '/assets/syllabi/cs101.pdf'
    },
    cs201: {
      code: 'CS201',
      title: 'מבני נתונים ואלגוריתמים',
      description: 'קורס על מבני נתונים מרכזיים ואלגוריתמים (עץ חיפוש, טורי עדיפות, טבלאות גיבוב, מיון וחיפוש). ניתוח סיבוכיות ודיון בפתרונות יעילים.',
      objectives: [
        'להכיר מבני נתונים מקובלים ולדעת לבחור את המתאים למשימה.',
        'להבין אלגוריתמים בסיסיים ולנתח אותם לגבי זמן/מקום.',
        'ליישם מבני נתונים במטלות מעשיות.'
      ],
      credits: 4,
      syllabusPdf: '/assets/syllabi/cs201.pdf'
    },
    cs301: {
      code: 'CS301',
      title: 'מערכות הפעלה',
      description: 'סקירה של מושגי יסוד במערכות הפעלה: ניהול זיכרון, קבצים, תזמון תהליכים וסנכרון, ותכנון מערכות הפעלה מודרניות.',
      objectives: [
        'להבין מודלים של תזמון תהליכים ואמצעי סנכרון.',
        'לחקור ניהול זיכרון ואחסון.',
        'להכיר מבני קבצים ומנגנוני I/O.'
      ],
      credits: 3,
      syllabusPdf: '/assets/syllabi/cs301.pdf'
    },
    cs351: {
      code: 'CS351',
      title: 'מבוא לבינה מלאכותית',
      description: 'יסודות בבינה מלאכותית: חיפוש, ייצוג ידע, למידה חישובית בסיסית, וסוכנים אינטראקטיביים. הקשר לאתיקה ויישומים מודרניים.',
      objectives: [
        'להבין שיטות חיפוש וביצוע חיפושים עם אילוצים.',
        'להכיר ייצוגי ידע ושיטות להסקת מסקנות.',
        'להבין עקרונות בסיסיים בלמידת מכונה ולהבחין בתחומי שימוש.'
      ],
      credits: 3,
      syllabusPdf: '/assets/syllabi/cs351.pdf'
    },
    cs370: {
      code: 'CS370',
      title: 'למידת מכונה – מבוא',
      description: 'הכרות עם אלגוריתמים של למידת מכונה: סיווג, רגרסיה, אילוץ יתר/תת-למידה, הערכת מודלים ועיבוד תכונות.',
      objectives: [
        'ללמוד שיטות סיווג ורגרסיה בסיסיות.',
        'להבין פרוצדורות לאימון והערכה של מודלים.',
        'להכיר כלים מעשיים בספריות נפוצות (scikit-learn וכו\' ).'
      ],
      credits: 4,
      syllabusPdf: '/assets/syllabi/cs370.pdf'
    },
    // IS examples (optional) — useful if you later add IS links
    is101: {
      code: 'IS101',
      title: 'מבוא למערכות מידע וארגונים',
      description: 'הכרות עם מושגי יסוד בתחום מערכות המידע והקשר שלהן לדרישות ארגוניות ותהליכים עסקיים.',
      objectives: ['להבין תפקיד מערכות מידע בארגון', 'לנתח תרחישי שימוש בסיסיים'],
      credits: 3,
      syllabusPdf: '/assets/syllabi/is101.pdf'
    }
  } as const;

  const content = {
    cs: {
      title: 'מדעי מחשב',
      subtitle: 'תיאוריה, אלגוריתמים, Systems ובינה מלאכותית',
      about: `מדעי המחשב משלב תיאוריה ומעשה: אלגוריתמיקה, מבני נתונים, מערכות הפעלה, רשתות, בינה מלאכותית ולמידת מכונה. מתאימים לסטודנטים שמעוניינים במחקר, תכנון מערכות או פיתוח תוכנה ברמה גבוהה.`,
      contactEmail: 'cs-support@university.edu',
      faqs: [
        {q: 'איך נרשמים לקורסים תיאורטיים?', a: 'רישום דרך הפורטל עם קוד הקורס; יש לבדוק דרישות קדם במערכת.'},
        {q: 'היכן למצוא מאמרים ומחקרים?', a: 'השתמשו ב-Google Scholar, arXiv ו-ACM Digital Library.'},
      ],
      coreCourses: [
        {code: 'CS101', title: 'מבוא למדעי המחשב: תכנות ופתרון בעיות'},
        {code: 'CS201', title: 'מבני נתונים ואלגוריתמים'},
        {code: 'CS301', title: 'מערכות הפעלה'},
        {code: 'CS351', title: 'מבוא לבינה מלאכותית'},
        {code: 'CS370', title: 'למידת מכונה – מבוא'},
      ],
      electives: [
        'למידת חיזוק', 'מדעי הנתונים', 'עיבוד שפה טבעית', 'גרפיקה ממוחשבת'
      ],
      resources: [
        {title: 'ACM (Association for Computing Machinery)', url: 'https://www.acm.org'},
        {title: 'arXiv — preprints', url: 'https://arxiv.org'},
        {title: 'Google Scholar', url: 'https://scholar.google.com'},
        {title: 'Coursera — AI/ML courses', url: 'https://www.coursera.org'},
        {title: 'Kaggle — datasets & competitions', url: 'https://www.kaggle.com'},
        {title: 'GitHub — example projects', url: 'https://github.com'},
      ],
      projects: [
        'מערכת המלצות למוזיקה (Collaborative Filtering)',
        'כלי ניתוח טקסט לשפה העברית (NLP)',
        'מיקרו-גריד מחשבים להדגמת מערכות מבוזרות'
      ]
    },
    is: {
      title: 'מערכות מידע',
      subtitle: 'יישום טכנולוגי בארגונים, ניתוח נתונים ותהליכים עסקיים',
      about: `תחום שמקשר בין עסק לטכנולוגיה: מודלים של נתונים, מיומנויות איסוף דרישות, ניתוח מערכות, אבטחת מידע ותכנון פתרונות ארגוניים. מתאים לסטודנטים שמחפשים תפקידים שמשלבים IT וניהול.` ,
      contactEmail: 'is-support@university.edu',
      faqs: [
        {q: 'איך לחבר מערכות חיצוניות?', a: 'השתמשו ב-API סטנדרטי (REST/SOAP) ותעדפו אבטחה ואימות.'},
        {q: 'מה כלול בפרויקט גמר?', a: 'ניתוח דרישות, מודל נתונים, ממשק משתמש והצגת השפעה עסקית.'},
      ],
      coreCourses: [
        {code: 'IS101', title: 'מבוא למערכות מידע וארגונים'},
        {code: 'IS220', title: 'בסיסי נתונים ומודלים'},
        {code: 'IS305', title: 'אינטגרציה בין מערכות ו-API'},
        {code: 'IS340', title: 'ניהול פרויקטי IT'},
      ],
      electives: [
        'ניתוח נתונים לעסקים', 'אבטחת מידע', 'UX/UI לאפליקציות ארגוניות'
      ],
      resources: [
        {title: 'IEEE Computer Society', url: 'https://www.computer.org'},
        {title: 'MDN Web Docs', url: 'https://developer.mozilla.org'},
        {title: 'edX — Business & IT courses', url: 'https://www.edx.org'},
        {title: 'Stack Overflow — community Q&A', url: 'https://stackoverflow.com'},
      ],
      projects: [
        'מערכת ניהול מלאי חכמה עם Dashboard',
        'אינטגרציה בין CRM ל-ERP באמצעות Middleware',
        'דשבורד אנליטי להצגת KPI עסקי בזמן אמת'
      ]
    }
  } as const;

  const sec = section === 'cs' ? content.cs : content.is;

  // selectedCourseKey — when set, the CourseDetail modal opens
  const [selectedCourseKey, setSelectedCourseKey] = React.useState<string | null>(null);

  function openCourse(code: string) {
    setSelectedCourseKey(code.toLowerCase());
    // scroll to top of modal area if needed — useful on small screens
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 60);
  }

  function closeCourse() {
    setSelectedCourseKey(null);
  }

  function CourseDetail({ courseKey, onClose }: { courseKey: string; onClose: () => void }) {
    const key = courseKey.toLowerCase();
    const course = (courseDetails as any)[key] as Course | undefined;
    if (!course) return null;

    return (
      <div style={styles.modalBackdrop} role="dialog" aria-modal="true">
        <div style={styles.modalCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div>
              <h2 style={{ margin: 0 }}>{course.code} — {course.title}</h2>
              <div style={{ color: '#475569', marginTop: 8 }}>{course.description}</div>
            </div>
            <div>
              <button onClick={onClose} style={{ background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer' }} aria-label="Close">✕</button>
            </div>
          </div>

          <section style={{ marginTop: 14 }}>
            <h4>מטרות הקורס</h4>
            <ul>
              {course.objectives.map((o, i) => <li key={i}>{o}</li>)}
            </ul>

            <div style={{ marginTop: 12 }}>
              <strong>נקודות זכות:</strong> {course.credits ?? '—'}
            </div>

            {course.syllabusPdf && (
              <div style={{ marginTop: 12 }}>
                <a href={course.syllabusPdf} target="_blank" rel="noreferrer">הורד סילבוס (PDF)</a>
              </div>
            )}

            <div style={{ marginTop: 18 }}>
              <h4>הערכת ידע</h4>
              <p>הערכת הסטודנטים יכולה לכלול: מטלות מעבדה, מבחנים תיאורטיים, פרויקט גמר ופעילות כיתתית — בהתאם לסילבוס הקורס.</p>
            </div>

            <div style={{ marginTop: 18 }}>
              <h4>הערות למרצה</h4>
              <p>ניתן להוסיף קישורים לרשימת קריאה, מערכי שיעור ודוגמת קודים בתוך קבצי ה-PDF של הסילבוס.</p>
            </div>

            <div style={{ marginTop: 18, textAlign: 'right' }}>
              <Button variant="contained" onClick={onClose}>סגור</Button>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 18 }}>
        <div style={{ flex: 1 }}>
          <h1 style={styles.header}>עמוד תמיכה ומידע — {sec.title}</h1>
          <p>{sec.subtitle}</p>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={() => setSection('cs')}
            style={{ padding: '8px 12px', borderRadius: 8, border: section === 'cs' ? '2px solid #0ea5e9' : '1px solid rgba(2,6,23,0.06)', background: section === 'cs' ? '#e6f6ff' : 'white' }}
          >
            מדעי מחשב
          </button>

          <button
            onClick={() => setSection('is')}
            style={{ padding: '8px 12px', borderRadius: 8, border: section === 'is' ? '2px solid #0ea5e9' : '1px solid rgba(2,6,23,0.06)', background: section === 'is' ? '#e6f6ff' : 'white' }}
          >
            מערכות מידע
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 18, marginTop: 14 }}>
        <div style={{ flex: 1 }}>
          <h2 style={styles.sectionTitle}>אודות</h2>
          <p>{sec.about}</p>

          <h2 style={styles.sectionTitle}>קורסים מרכזיים — תוכנית לדוגמא</h2>
          <ul style={styles.smallList}>
            {sec.coreCourses.map((c: any, i: number) => (
              <li key={i} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <strong>{c.code}</strong> — {c.title}
                <button style={styles.courseButton as React.CSSProperties} onClick={() => openCourse(c.code)}>
                  פרטי קורס
                </button>
              </li>
            ))}
          </ul>

          <h2 style={styles.sectionTitle}>הצעות לפרויקטים ופרקטיקום</h2>
          <ul style={styles.smallList}>
            {sec.projects.map((p: any, i: number) => (
              <li key={i} style={{ marginBottom: 6 }}>{p}</li>
            ))}
          </ul>

          <h2 style={styles.sectionTitle}>שאלות נפוצות (FAQ)</h2>
          <div>
            {sec.faqs.map((f, i) => (
              <div key={i}>
                <p style={{ fontWeight: 600, marginTop: 14 }}>{f.q}</p>
                <p style={{ marginLeft: 15, marginTop: 6 }}>{f.a}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 18 }}>
            <h3 style={{ marginBottom: 8 }}>קישורים מהירים ומשאבים חיצוניים</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 8 }}>
              {sec.resources.map((r: any, idx: number) => (
                <a key={idx} href={r.url} target="_blank" rel="noreferrer" style={{ padding: 8, borderRadius: 8, textDecoration: 'none', border: '1px solid rgba(2,6,23,0.04)', background: 'white' }}>
                  <div style={{ fontWeight: 600 }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>{r.url.replace(/^https?:\/\//, '')}</div>
                </a>
              ))}
            </div>

            <div style={{ marginTop: 12, fontSize: 13 }}>
              <em>רשימת קישורים זו היא המלצה בלבד — החליפו קישורים אמיתיים לפי מדיניות המוסד.</em>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <h3 style={{ marginBottom: 8 }}>מסלולים לקריירה — דוגמאות</h3>
            <ul style={styles.smallList}>
              <li>מהנדס תוכנה / מפתח Backend / Frontend</li>
              <li>מנתח מערכות / אדריכל פתרונות</li>
              <li>מדען נתונים / מומחה ML</li>
              <li>מפתח מערכות משובצות (Embedded)</li>
            </ul>
          </div>

        </div>

        <aside style={{ width: 320 }}>
          <div style={styles.imageCard as React.CSSProperties}>
            <div style={{ width: '100%', height: 160, backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
              <img
                src={WIKIMEDIA_ONO_960}
                alt={`${sec.title} - תמונת מוסד`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 400ms ease', opacity: mainLoaded ? 1 : 0, display: 'block' }}
                onError={(e) => imageFallback(e)}
                onLoad={() => setMainLoaded(true)}
                loading="lazy"
              />
              {!mainLoaded && (
                <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: 13 }}>
                  טוען תמונה...
                </div>
              )}
            </div>

            <div style={{ padding: 10 }}>
              <strong>{sec.title} — מידע ומקורות</strong>
              <div style={{ fontSize: 12, color: '#334155', marginTop: 6 }}>{sec.subtitle}</div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>
                תמונה: Ono Academic College (CC BY-SA 4.0) — יש לכלול קרדיט בעמוד ציבורי.
              </div>
            </div>
          </div>

          <div style={styles.contactInfo as React.CSSProperties}>
            <div style={{ fontWeight: 600 }}>פרטי קשר</div>
            <div style={{ marginTop: 6, fontSize: 14 }}>
              אימייל: <a href={`mailto:${sec.contactEmail}`}>{sec.contactEmail}</a><br />
              טלפון: +972-XX-XXXXXXX
            </div>

            <div style={{ marginTop: 10 }}>
              <a href="/assets/ono-brochure.pdf" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                הורד חוברת מידע (PDF)
              </a>
            </div>
          </div>

          <div style={{ marginTop: 12 }}>
            <h4 style={{ marginBottom: 8 }}>לוח אירועים</h4>
            <div style={{ fontSize: 13 }}>
              <strong>27/10/2025</strong> — יום חשיפה לתעשייה (הצגה של פרויקטי סטודנטים)<br />
              <strong>12/11/2025</strong> — סדנת בינה מלאכותית (מבוא מעשי)
            </div>
          </div>
        </aside>
      </div>

      <section style={{ marginTop: 18 }}>
        <h2 style={styles.sectionTitle}>מפה — מיקום מוסד</h2>
        <div style={{ width: '100%', height: 360, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(2,6,23,0.06)' }}>
          <iframe
            title="מפת Ono Academic College"
            src="https://maps.google.com/maps?q=Ono%20Academic%20College%20Kiryat%20Ono&t=&z=15&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            style={{ width: '100%', height: '100%', border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2 style={styles.sectionTitle}>גלריית מוסד — תמונות ({sec.title})</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
          {(collageImages.length ? collageImages : (section === 'cs' ? IMAGES_CS : IMAGES_IS)).map((src, idx) => (
            <div key={idx} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(2,6,23,0.06)', backgroundColor: '#f8fafc', minHeight: 120 }}>
              <img
                src={src}
                alt={`גלריה ${idx + 1}`}
                style={{ width: '100%', height: 120, objectFit: 'cover' }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).onerror = null; (e.currentTarget as HTMLImageElement).src = SVG_PLACEHOLDER; }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <div style={styles.buttonContainer as React.CSSProperties}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/home")}
        >
          חזרה לעמוד הבית
        </Button>
      </div>

      {/* Course detail modal (renders when selectedCourseKey is set) */}
      {selectedCourseKey && <CourseDetail courseKey={selectedCourseKey} onClose={closeCourse} />}

    </div>
  );
}
