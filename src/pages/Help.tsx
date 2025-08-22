import React from "react";
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const styles = {
  container: {
    maxWidth: 800,
    margin: "40px auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    color: "#1f2937",
    lineHeight: 1.6,
  },
  header: {
    color: "#2563eb",
    borderBottom: "3px solid #2563eb",
    paddingBottom: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#1e40af",
    marginTop: 30,
    marginBottom: 12,
    borderBottom: "2px solid #3b82f6",
    paddingBottom: 4,
  },
  list: {
    paddingLeft: 20,
    marginBottom: 15,
  },
  listItem: {
    marginBottom: 8,
  },
  contactInfo: {
    backgroundColor: "#e0f2fe",
    padding: 15,
    borderRadius: 6,
    marginTop: 10,
  },
  faqQuestion: {
    fontWeight: "600",
    marginTop: 15,
  },
  faqAnswer: {
    marginLeft: 15,
    marginTop: 4,
  },
  buttonContainer: {
  marginTop: 30,
  textAlign: "center" as const
}
};

export default function Help() {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>עמוד תמיכה ומידע לסטודנטים במערכות מידע</h1>
      <p>
        ברוכים הבאים לעמוד התמיכה הרשמי לסטודנטים במערכות מידע! עמוד זה נועד לסייע לכם בכל הנוגע ללימודים, שאלות טכניות, ומשאבים הקשורים לתכנית מערכות מידע.
      </p>

      <h2 style={styles.sectionTitle}>אודות האתר</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>מתן חומרי לימוד ומשאבים</li>
        <li style={styles.listItem}>הדרכה בנוגע למשימות ופרויקטים</li>
        <li style={styles.listItem}>עדכונים והודעות מהמרצים</li>
        <li style={styles.listItem}>גישה לכלים ומערכות אקדמיות</li>
        <li style={styles.listItem}>תמיכה בבעיות טכניות הקשורות לפלטפורמות הלימוד</li>
      </ul>

      <h2 style={styles.sectionTitle}>למי מיועד האתר</h2>
      <ul style={styles.list}>
        <li style={styles.listItem}>סטודנטים הלומדים במערכות מידע</li>
        <li style={styles.listItem}>סגל הוראה ומרצים בתכנית</li>
        <li style={styles.listItem}>מתעניינים ומועמדים פוטנציאליים ללימודים במערכות מידע</li>
      </ul>

      <h2 style={styles.sectionTitle}>מיקום ופרטי קשר</h2>
      <div style={styles.contactInfo}>
        <p>מחלקת מערכות מידע נמצאת בכתובת:</p>
        <p>בניין הפקולטה להנדסה, חדר 305<br />[שם המוסד]<br />[עיר, מדינה]</p>

        <p>לקבלת סיוע נוסף ניתן לפנות ל:</p>
        <ul style={styles.list}>
          <li>אימייל: <a href="mailto:support@university.edu">support@university.edu</a></li>
          <li>טלפון: +972-XX-XXXXXXX</li>
          <li>שעות קבלה: ראשון עד חמישי, 9:00 – 17:00</li>
        </ul>
      </div>

      <h2 style={styles.sectionTitle}>שאלות נפוצות (FAQ)</h2>
      <div>
        <p style={styles.faqQuestion}> ?איך ניתן לגשת לחומרי הלימוד</p>
        <p style={styles.faqAnswer}>התחברו לפורטל הסטודנטים בכתובת <a href="https://portal.university.edu" target="_blank" rel="noreferrer">portal.university.edu</a> עם פרטי הכניסה שלכם.</p>

        <p style={styles.faqQuestion}> ?למי לפנות במקרה של בעיות טכניות</p>
        <p style={styles.faqAnswer}> פנו לצוות התמיכה הטכנית בכתובת <a href="mailto:it-support@university.edu">it-support@university.edu</a>.</p>

        <p style={styles.faqQuestion}> ?איפה אפשר למצוא מידע על מועדי מבחנים</p>
        <p style={styles.faqAnswer}> .מועדי המבחנים מתפרסמים באזור ההודעות באתר זה ובפורטל הסטודנטים</p>
      </div>
      <div style={styles.buttonContainer}>
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

