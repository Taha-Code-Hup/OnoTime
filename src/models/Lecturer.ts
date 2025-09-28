// src/models/Lecturer.ts
// Extended Lecturer model + permanentLecturers (unchanged) + richer lecturerProfiles for "פרטים נוספים"
// You can import { permanentLecturers } or { lecturerProfiles, getLecturerProfileById } elsewhere.

export interface Lecturer {
  id: string;
  name: string;
  email: string;
  specialization?: string;
  courses: string[]; // course IDs
  semesters: number[];
}

/*
  --- permanentLecturers (KEEP THIS EXACTLY AS YOUR ORIGINAL DATA) ---
  I preserved your original list and IDs. If you replace these later,
  update any storage/merging logic that relies on these IDs.
*/
export const permanentLecturers: Lecturer[] = [
  {
    id: "183483748",
    name: "ד\"ר יעל כהן",
    email: "yael.cohen@university.ac.il",
    specialization: "מדעי המחשב - אלגוריתמים",
    courses: [],
    semesters: [0],
  },
  {
    id: "349285839",
    name: "פרופ' דני לוי",
    email: "dani.levi@university.ac.il",
    specialization: "מדעי המחשב - בינה מלאכותית",
    courses: [],
    semesters: [0],
  },
  {
    id: "349115839",
    name: "ד\"ר רונית גבע",
    email: "ronit.geva@university.ac.il",
    specialization: "מדעי המחשב - מבני נתונים",
    courses: [],
    semesters: [0],
  },
  {
    id: "123285839",
    name: "פרופ' מיכאל אברהם",
    email: "michael.abraham@university.ac.il",
    specialization: "מדעי המחשב - מערכות הפעלה",
    courses: [],
    semesters: [0],
  },
  {
    id: "349285000",
    name: "ד\"ר נועה שפירא",
    email: "noa.shapira@university.ac.il",
    specialization: "מדעי המחשב - הנדסת תוכנה",
    courses: [],
    semesters: [0],
  },
  {
    id: "349000819",
    name: "פרופ' דוד רז",
    email: "david.raz@university.ac.il",
    specialization: "מדעי המחשב - רשתות תקשורת",
    courses: [],
    semesters: [0],
  },
  {
    id: "349243239",
    name: "ד\"ר מיכל בן-דוד",
    email: "michal.bendavid@university.ac.il",
    specialization: "מדעי המחשב - גרפיקה ממוחשבת",
    courses: [],
    semesters: [0],
  },
  {
    id: "123543989",
    name: "פרופ' שלמה קפלן",
    email: "shlomo.kaplan@university.ac.il",
    specialization: "מדעי המחשב - למידת מכונה",
    courses: [],
    semesters: [0],
  },
  {
    id: "321453554",
    name: "ד\"ר תמר ישראלי",
    email: "tamar.israeli@university.ac.il",
    specialization: "מדעי המחשב - אבטחת מידע",
    courses: [],
    semesters: [0],
  },
  {
    id: "123111321",
    name: "פרופ' רון ברק",
    email: "ron.barak@university.ac.il",
    specialization: "מדעי המחשב - עיבוד תמונה",
    courses: [],
    semesters: [0],
  },
  {
    id: "333213111",
    name: "ד\"ר מרים גולן",
    email: "miriam.golan@university.ac.il",
    specialization: "מדעי המחשב - כריית נתונים",
    courses: [],
    semesters: [0],
  },
  {
    id: "876433211",
    name: "פרופ' אמיר כהן",
    email: "amir.cohen@university.ac.il",
    specialization: "מדעי המחשב - בסיסי נתונים",
    courses: [],
    semesters: [0],
  },
  {
    id: "453234111",
    name: "ד\"ר ליאת פרידמן",
    email: "liat.friedman@university.ac.il",
    specialization: "מדעי המחשב - תכנות מקבילי",
    courses: [],
    semesters: [0],
  },
  {
    id: "111243232",
    name: "פרופ' אורי לוי",
    email: "uri.levi@university.ac.il",
    specialization: "מדעי המחשב - תורת החישוביות",
    courses: [],
    semesters: [0],
  },
  {
    id: "432111232",
    name: "ד\"ר שרית רגב",
    email: "sarit.regev@university.ac.il",
    specialization: "מדעי המחשב - רובוטיקה",
    courses: [],
    semesters: [0],
  },
];

/* -------------------------------------------------------------------------- */
/* --- RICHER PROFILE (enhanced, non-breaking additions) -------------------- */
/* -------------------------------------------------------------------------- */

/**
 * LecturerProfile extends the original Lecturer shape with optional fields
 * used by the "פרטים נוספים" (More info) page.
 * All fields are optional to avoid breaking existing code that depends only on Lecturer.
 */
export interface LecturerProfile extends Lecturer {
  title?: string; // display title (e.g., 'מרצה בכיר')
  subjects?: string[]; // human-friendly subject/course names
  certifications?: string[]; // degrees / certificates / trainings
  education?: string[]; // formal education entries (BSc/MSc/PhD)
  experience?: string; // paragraph describing professional experience
  bio?: string; // short biography / elevator pitch
  phone?: string;
  office?: string; // optional office location
  officeHours?: string; // readable office hours (e.g., "יום ג' 14:00–16:00, בתיאום מראש")
  researchInterests?: string[];
  awards?: string[]; // notable awards / honors
  publications?: string[]; // selected publications (short citations)
  selectedProjects?: string[]; // important projects or industry collaborations
  teachingFocus?: string[]; // teaching strengths / pedagogical focus
  teachingPhilosophy?: string; // short paragraph about teaching approach
  languages?: string[]; // languages spoken / teaching languages
  linkedin?: string;
  webpage?: string;
  scholar?: string; // e.g. Google Scholar id or URL (optional)
  orcid?: string; // ORCID id (optional)
  teachingRating?: number; // optional aggregated rating (1..5)
  profileImageUrl?: string | null; // optional image url
}

/*
  lecturerProfiles: a fuller dataset for the detailed page.
  Each profile corresponds to one of your permanent lecturers (same IDs).
  Content is tailored to מדעי המחשב — more substantial, structured and ready for UI.
*/
export const lecturerProfiles: LecturerProfile[] = [
  {
    id: "183483748",
    name: "ד\"ר יעל כהן",
    email: "yael.cohen@university.ac.il",
    specialization: "מדעי המחשב - אלגוריתמים",
    courses: ["ALG101", "ALG201"],
    semesters: [1, 2],
    title: "מרצה בכיר וראש תחום אלגוריתמים",
    subjects: ["אלגוריתמים וניתוח סיבוכיות", "מבוא לתורת הגרפים", "אופטימיזציה קומבינטורית"],
    certifications: ["Ph.D. במדעי המחשב — אוניברסיטת תל-אביב"],
    education: ["B.Sc. מדעי המחשב — הטכניון", "M.Sc. מדעי המחשב — אוניברסיטת תל-אביב", "Ph.D. — אוניברסיטת תל-אביב"],
    experience:
      "15 שנות הוראה באקדמיה, הנחיית עבודות גמר ותזות, ושיתופי פעולה מחקריים בתעשייה בתחום אופטימיזציה ונתיבים.",
    bio:
      "חוקרת ופרקטיקאית בתחום האלגוריתמים; עבודתה משלבת בסיס תיאורטי חזק עם פרויקטים יישומיים. תיאוריה לפרקטיקה היא מרכז תכניתה.",
    phone: "+972-3-555-0101",
    office: "בניין מדעי המחשב, חדר 412",
    officeHours: "יום ד' 14:00–16:00 (בתיאום מראש)",
    researchInterests: ["אלגוריתמים מקבילים", "אופטימיזציה דיסקרטית", "תורת הגרפים"],
    awards: ["פרס הצטיינות הוראה 2018", "מענק מחקר 2019–2021"],
    publications: [
      "Y. Cohen et al., \"Efficient Parallel Graph Algorithms\", Journal of Algorithms, 2020.",
      "Y. Cohen, \"Optimization in Sparse Networks\", Proc. ISP, 2018."
    ],
    selectedProjects: ["מערכת תכנון מסלולים לתחבורה חכמה (שיתוף פעולה עם תעשייה)", "פרויקט הדמיה של רשתות תזרים"],
    teachingFocus: ["בניית בסיס תיאורטי יציב", "תרגולים מעשיים עם הדגמות קוד"],
    teachingPhilosophy:
      "לעודד הבנה אינטואיטיבית של רעיון מתמטי לצד תרגול יישומי — פרויקט קטן בכל סמסטר מחבר תיאוריה לפרקטיקה.",
    languages: ["עברית", "אנגלית"],
    linkedin: "https://linkedin.com/in/yael-cohen",
    webpage: "",
    scholar: "",
    orcid: "",
    teachingRating: 4.7,
    profileImageUrl: null,
  },

  {
    id: "349285839",
    name: "פרופ' דני לוי",
    email: "dani.levi@university.ac.il",
    specialization: "מדעי המחשב - בינה מלאכותית",
    courses: ["AI100", "AI240"],
    semesters: [1],
    title: "פרופסור וראש מעבדת AI",
    subjects: ["מבוא לבינה מלאכותית", "למידת מכונה מעשית", "למידה עמוקה להסבר"],
    certifications: ["Ph.D. באינטליגנציה מלאכותית — אוניברסיטת חיפה"],
    education: ["B.Sc. במתמטיקה ו-מחשב — אוניברסיטת חיפה", "Ph.D. — אוניברסיטת חיפה"],
    experience:
      "25 שנות הוראה ומחקר, הובלת קבוצות מחקר ופיתוח מוצר בחברות טכנולוגיה, ייעוץ לסטארטאפים בתחום ה-AI.",
    bio:
      "מתמחה ביישומי למידה עמוקה ובפיתוח פתרונות חיזוי לקבוצות תעשייתיות. חיבור בין מחקר לשימוש בתעשייה מהווה חוט המוביל בעבודתו.",
    phone: "+972-3-555-0202",
    office: "בניין מדעי המחשב, חדר 520",
    officeHours: "יום ב' 10:00–12:00",
    researchInterests: ["למידה עמוקה", "אינטרפרטביליות של מודלים", "יישומי ראיה ושפה"],
    awards: ["פרס מחקר אזורי 2019"],
    publications: [
      "D. Levi et al., \"Interpretable Deep Models\", ML Journal, 2021.",
      "D. Levi, \"Applied AI for Industry\", Conf. AI, 2019."
    ],
    selectedProjects: ["מערכת חיזוי לתחזוקת ציוד תעשייתי", "מיזם NLP לניתוח מסמכים ארגוניים"],
    teachingFocus: ["יישום תיאוריות בפתרון בעיות אמתיות", "סדנאות קוד מעשיות"],
    teachingPhilosophy:
      "למידה דרך פרויקטים מדגימה כיצד רעיון תאורטי מתורגם למערכת מעשית — אני מדגיש deliverables ומדדים ברורים להצלחה.",
    languages: ["עברית", "אנגלית"],
    linkedin: "https://linkedin.com/in/dani-levi",
    webpage: "",
    teachingRating: 4.8,
    profileImageUrl: null,
  },

  {
    id: "349115839",
    name: "ד\"ר רונית גבע",
    email: "ronit.geva@university.ac.il",
    specialization: "מדעי המחשב - מבני נתונים",
    courses: ["DS101", "DB200"],
    semesters: [2],
    title: "מרצה וחוקרת מבני נתונים",
    subjects: ["מבני נתונים מתקדמים", "אופטימיזציית שאילתות", "אינדקסים"],
    certifications: ["M.Sc. במדעי המחשב"],
    education: ["B.Sc. מדעי המחשב — אוניברסיטה מקומית", "M.Sc. — מדעי המחשב"],
    experience:
      "פיתוח מערכות אחסון, שדרוג ביצועים והטמעת אינדקסים לנתונים גדולים בתעשייה.",
    bio:
      "הייתה מובילת צוות פיתוח עבור פתרונות אחסון בחברות טכנולוגיה; כיום משקיעה בהוראה מעשית ובהנחיית פרויקטים לתעשייה.",
    phone: "+972-3-555-0303",
    office: "בניין מדעי המחשב, חדר 211",
    officeHours: "יום ה' 11:00–13:00",
    researchInterests: ["אחסון מבוזר", "אינדקסים", "אופטימיזציה לשאילתות"],
    awards: [],
    publications: ["R. Geva, \"Indexing for Large Datasets\", DataConf, 2017."],
    selectedProjects: ["שיפור ביצועים למסד נתונים ארגוני", "פרויקט תזה על אחסון מבוזר"],
    teachingFocus: ["תרגול מעשי", "ניתוח ביצועים"],
    teachingPhilosophy:
      "הדגש הוא על הבנה של trade-offs — למה לבחור מבנה נתונים מסוים ואיך הוא משפיע על ביצועים וקנה מידה.",
    languages: ["עברית", "אנגלית"],
    teachingRating: 4.5,
    profileImageUrl: null,
  },

  {
    id: "123285839",
    name: "פרופ' מיכאל אברהם",
    email: "michael.abraham@university.ac.il",
    specialization: "מדעי המחשב - מערכות הפעלה",
    courses: ["OS110"],
    semesters: [1, 2],
    title: "פרופסור למערכות ותשתיות",
    subjects: ["מערכות הפעלה", "ניהול זיכרון ותהליכים", "מערכות זמן-אמת"],
    certifications: ["Ph.D. — מערכות הפעלה"],
    education: ["Ph.D. — מערכות", "M.Sc. — מערכות מחשב"],
    experience:
      "מעל 20 שנות הוראה ומחקר; עבד על מערכות זמן-אמת ותשתיות קריטיות בסביבות מחקר ותעשייה.",
    bio:
      "מומחה בבניית מערכות יציבות, תכנון משאבים וניטור ביצועים. משלב סימולציות ועבודות מעבדה בקורסים.",
    phone: "+972-3-555-0404",
    office: "בניין מדעי המחשב, חדר 101",
    officeHours: "יום א' 15:00–16:30",
    researchInterests: ["מערכות זמן-אמת", "ניהול משאבים", "ניטור ביצועים"],
    awards: ["פרס מפעל חיים למחקר מערכות 2016"],
    publications: ["M. Abraham, \"Real-time OS Design\", SysConf, 2015."],
    selectedProjects: ["פיתוח מערכת בקרת משימות בזמן-אמת", "שיתוף פעולה עם מעבדות רובוטיקה"],
    teachingFocus: ["סימולציות מעשיות", "ניתוח מקרה תעשייתי"],
    teachingPhilosophy:
      "תלמידים לומדים הכי טוב כשהם בונים — הקורסים כוללים מטלות מעשיות ומשימות לביצוע בדיקות ביצועים.",
    languages: ["עברית", "אנגלית"],
    teachingRating: 4.6,
    profileImageUrl: null,
  },

  {
    id: "349285000",
    name: "ד\"ר נועה שפירא",
    email: "noa.shapira@university.ac.il",
    specialization: "מדעי המחשב - הנדסת תוכנה",
    courses: ["SW101", "TDD200"],
    semesters: [1],
    title: "מרצה להנדסת תוכנה ופרקטיקה",
    subjects: ["הנדסת תוכנה", "TDD ו־CI/CD", "ארכיטקטורת תוכנה"],
    certifications: ["B.Sc. בהנדסת תוכנה", "הסמכת Agile Practitioner"],
    education: ["B.Sc. — הנדסת תוכנה", "קורסים מקצועיים ב־DevOps"],
    experience:
      "הנחיית פרויקטים מעשיים ושיתוף פעולה עם תעשייה להטמעת שיטות עבודה מומלצות בפיתוח תוכנה.",
    bio:
      "מובילה סדנאות פרקטיות ומשלבת כלי אוטומציה בקורסים להנחית סטודנטים לשוק העבודה.",
    phone: "+972-3-555-0505",
    office: "בניין מדעי המחשב, חדר 305",
    officeHours: "יום ג' 10:00–11:30",
    researchInterests: ["בדיקות אוטומציה", "CI/CD", "איכות תוכנה"],
    awards: [],
    publications: [],
    selectedProjects: ["שיתוף פעולה ארגוני לפרקטיקות DevOps בקורס סטודנטים"],
    teachingFocus: ["פרקטיקה, השקעה בהעסקה של סטודנטים"],
    teachingPhilosophy:
      "פיתוח מיומנויות במקום — מטלות מעשיות ומשוב צמוד שמדמות סביבת עבודה אמיתית.",
    languages: ["עברית", "אנגלית"],
    teachingRating: 4.4,
    profileImageUrl: null,
  },

  {
    id: "349000819",
    name: "פרופ' דוד רז",
    email: "david.raz@university.ac.il",
    specialization: "מדעי המחשב - רשתות תקשורת",
    courses: ["NET101", "SEC200"],
    semesters: [2],
    title: "פרופסור לתקשורת ורשתות",
    subjects: ["רשתות מחשבים", "פרוטוקולי תקשורת", "אבטחת תשתיות"],
    certifications: ["CCNP"],
    education: ["B.Sc./M.Sc. — הנדסת מחשבים", "הכשרות מקצועיות ברשתות"],
    experience:
      "עבודה מקצועית בתכנון תשתיות וייעוץ ארגוני; הנחת קורסים שימושיים בעולמות הרשת והסייבר.",
    bio:
      "מנוסה בתכנון והרכבת תשתיות תקשורת; משלב תרגולים מעשיים עם פרויקטים ארגוניים בקורסים.",
    phone: "+972-3-555-0606",
    office: "בניין טכנולוגיות, חדר 22",
    officeHours: "יום ד' 09:00–11:00",
    researchInterests: ["רשתות מבוזרות", "ארכיטקטורת תקשורת", "אבטחת תשתיות"],
    awards: [],
    publications: ["D. Raz, \"Secure Network Architectures\", NetConf, 2018."],
    selectedProjects: ["הטמעת רשת אחודה בארגון גדול", "פרויקט חיבור תשתיות ענן-מקומי"],
    teachingFocus: ["פרקטיקה תפעולית", "הגנה מפני תקלות"],
    teachingPhilosophy:
      "הקניית הרגלי עבודה נכונים — סטודנטים לומדים להגדיר, לפרוס ולבדוק תשתיות בסביבה מבוקרת.",
    languages: ["עברית", "אנגלית"],
    teachingRating: 4.5,
    profileImageUrl: null,
  },

  {
    id: "349243239",
    name: "ד\"ר מיכל בן-דוד",
    email: "michal.bendavid@university.ac.il",
    specialization: "מדעי המחשב - גרפיקה ממוחשבת",
    courses: ["CG101", "CV210"],
    semesters: [1],
    title: "מרצה לגרפיקה ממוחשבת ומובילת מעבדה",
    subjects: ["גרפיקה ממוחשבת", "רנדרינג בזמן אמת", "מודלים תלת-ממדיים"],
    certifications: ["M.Sc. במדעי המחשב"],
    education: ["M.Sc. — גרפיקה ממוחשבת", "B.Sc. — מדעי המחשב"],
    experience:
      "פיתוח מנועי גרפיקה, עבודה על פרויקטי VR והנחיית פרויקטים יצירתיים לסטודנטים.",
    bio:
      "עוסקת ברנדרינג, הדמיות ויישומי מדיה אינטראקטיביים; הקניית מיומנויות כלים מקצועיים.",
    phone: "+972-3-555-0707",
    office: "מעבדת גרפיקה, בניין C",
    officeHours: "יום ה' 14:00–16:00",
    researchInterests: ["רנדרינג בזמן אמת", "ראיית מחשב", "אינטראקטיביות"],
    awards: [],
    publications: ["M. Bendavid, \"Real-time Rendering Techniques\", CG Journal, 2019."],
    selectedProjects: ["מנוע הדמיה חינוכי", "סדרת סדנאות VR לסטודנטים"],
    teachingFocus: ["עבודה פרויקטלית", "תיק עבודות מקצועי"],
    teachingPhilosophy:
      "פרקטיקה ועשייה: הקניית סט כלים מעשי ליצירת מוצר ויזואלי בעל ערך.",
    languages: ["עברית", "אנגלית"],
    teachingRating: 4.6,
    profileImageUrl: null,
  },

  {
    id: "123543989",
    name: "פרופ' שלמה קפלן",
    email: "shlomo.kaplan@university.ac.il",
    specialization: "מדעי המחשב - למידת מכונה",
    courses: ["ML100", "DL300"],
    semesters: [2],
    title: "פרופסור למידת מכונה",
    subjects: ["למידת מכונה", "למידה עמוקה", "אינטרפרטביליות"],
    certifications: ["Ph.D. בלמידת מכונה"],
    education: ["Ph.D. — למידת מכונה", "M.Sc. — סטטיסטיקה ואלגוריתמיקה"],
    experience:
      "מחקר רחב בהסבר מודלים וייצובם; הנחיית דוקטורנטים ופרויקטים מול התעשייה.",
    bio:
      "שותף לפרויקטים בין-אוניברסיטאיים בתחום הבינה המלאכותית ומוביל קבוצות מחקר.",
    phone: "+972-3-555-0808",
    office: "בניין מחקר, חדר 12",
    officeHours: "בתיאום מראש",
    researchInterests: ["למידה מפוקחת", "אינטרפרטביליות", "למידה יעילה"],
    awards: ["מענק ERC 2020–2023"],
    publications: ["S. Kaplan, \"Stabilizing Deep Networks\", DeepLearn, 2020."],
    selectedProjects: ["שיטות להסבר החלטות מודלים"], 
    teachingFocus: ["השוואת גישות", "הבנה תאורטית מעמיקה"],
    teachingPhilosophy:
      "לפתח מודלים שמוסברים וניתנים לפרשנות — מיומנות חשובה למחקר ולאתיקה בטכנולוגיה.",
    languages: ["עברית", "אנגלית"],
    teachingRating: 4.9,
    profileImageUrl: null,
  },

  {
    id: "321453554",
    name: "ד\"ר תמר ישראלי",
    email: "tamar.israeli@university.ac.il",
    specialization: "מדעי המחשב - אבטחת מידע",
    courses: ["SEC101", "CRYPTO200"],
    semesters: [1, 2],
    title: "מרצה ומנהלת מעבדה לסייבר",
    subjects: ["אבטחת מערכות מידע", "קריפטוגרפיה מעשית", "ניתוח פרצות"],
    certifications: ["CISSP"],
    education: ["M.Sc. — סייבר ואבטחה", "B.Sc. — מדעי המחשב"],
    experience:
      "עבודת סייבר מתקדם בתעשייה ופיתוח כלים לניתוח פרצות; הנחיית תרגולים ותרחישי תקיפה-הגנה.",
    bio:
      "מובילה תרגולים מעשיים ומקיימת שיתופי פעולה עם ערנות תפעולית בחברות סייבר.",
    phone: "+972-3-555-0909",
    office: "מרכז הסייבר, חדר 14",
    officeHours: "יום ג' 13:00–15:00",
    researchInterests: ["פרוטוקולי אבטחה", "הגנת תשתיות", "קריפטוגרפיה יישומית"],
    awards: [],
    publications: [],
    selectedProjects: ["בניית מערכת זיהוי פרצות לתאגידים"],
    teachingFocus: ["תרגול מעשי", "תרחישי תקיפה והגנה"],
    teachingPhilosophy:
      "להכין סטודנטים להתמודד עם אתגרים אמיתיים של אבטחה — המדמה תהליכים ארגוניים.",
    languages: ["עברית", "אנגלית"],
    teachingRating: 4.7,
    profileImageUrl: null,
  },

  {
    id: "123111321",
    name: "פרופ' רון ברק",
    email: "ron.barak@university.ac.il",
    specialization: "מדעי המחשב - עיבוד תמונה",
    courses: ["CV101", "IMG202"],
    semesters: [2],
    title: "פרופסור לעיבוד תמונה רפואית",
    subjects: ["עיבוד תמונה דיגיטלית", "ניתוח תמונה רפואית", "ראייה ממוחשבת"],
    certifications: ["Ph.D. במדעי המחשב"],
    education: ["Ph.D. — מדעי המחשב"],
    experience:
      "שיתופי פעולה עם בתי חולים ופרויקטים קליניים לניתוח תמונה; מחקר בתחום ראייה רפואית.",
    bio:
      "מיישם אלגוריתמים לניתוח תמונות רפואיות ומשלב עבודה קלינית במחקרו.",
    phone: "+972-3-555-1010",
    office: "מעבדת עיבוד תמונה, בניין D",
    officeHours: "בתיאום מראש",
    researchInterests: ["ראייה רפואית", "למידה מבוססת תמונה"],
    awards: [],
    publications: ["R. Barak, \"Medical Image Analysis Techniques\", MedVis, 2021."],
    selectedProjects: ["שיתוף פעולה עם מחלקת דימות בבתי חולים"],
    teachingFocus: ["יישום במחקר רפואי", "שיטות אנליזה מתקדם"],
    teachingPhilosophy:
      "הקניית שיטות מדעיות ולא רק נוסחאות — חשוב לי שלסטודנטים יהיה כלים ליישום קליני.",
    languages: ["עברית", "אנגלית"],
    teachingRating: 4.6,
    profileImageUrl: null,
  },

  {
    id: "333213111",
    name: "ד\"ר מרים גולן",
    email: "miriam.golan@university.ac.il",
    specialization: "מדעי המחשב - כריית נתונים",
    courses: ["DM100", "BI200"],
    semesters: [1],
    title: "מרצה בכריית נתונים ואנליטיקה",
    subjects: ["כריית נתונים", "אנליטיקה עסקית", "ETL ו־Big Data"],
    certifications: ["M.Sc. במדעי המידע"],
    education: ["M.Sc. — מדעי המידע", "B.Sc. — מדעי המחשב"],
    experience:
      "פרויקטים בתחום BI ותמיכה אנליטית בתעשייה; הנחיית תרגילים פרקטיים לעיבוד נתונים גדולים.",
    bio:
      "מדריכה פרויקטים עם דגש על שימוש בכלי ענן וטכנולוגיות לקנה מידה גדול.",
    phone: "+972-3-555-1111",
    office: "מרכז אנליטיקה, חדר 3",
    officeHours: "יום א' 10:00–12:00",
    researchInterests: ["כריית דפוסים", "נתונים גדולים"],
    awards: [],
    publications: [],
    selectedProjects: ["פרויקט אנליטיקה פיננסית", "ETL עבור מערכת נתונים ארגונית"],
    teachingFocus: ["טכנולוגיות ענן", "פרויקטים עסקיים"],
    teachingPhilosophy:
      "סטודנטים צריכים יכולת להפיק תובנות — הקורסים משולבים עם נתונים אמיתיים מהשוק.",
    languages: ["עברית", "אנגלית"],
    teachingRating: 4.5,
    profileImageUrl: null,
  },

  {
    id: "876433211",
    name: "פרופ' אמיר כהן",
    email: "amir.cohen@university.ac.il",
    specialization: "מדעי המחשב - בסיסי נתונים",
    courses: ["DB101", "DB300"],
    semesters: [1, 2],
    title: "פרופסור לבסיסי נתונים",
    subjects: ["תכנון מסדי נתונים", "אחסון ואיתור נתונים", "שימור מידע"],
    certifications: ["Ph.D. בבסיסי נתונים"],
    education: ["Ph.D. — בסיסי נתונים", "M.Sc. — מערכות מידע"],
    experience:
      "מעל 20 שנות מחקר והוראה; מומחה בארכיטקטורת אחסון ושימור נתונים בקנה מידה ארגוני.",
    bio:
      "עוסק בתכנון סכמות, מדיניות גיבוי ושחזור ופתרונות אחסון מבוזר.",
    phone: "+972-3-555-1212",
    office: "בניין מסדי נתונים, חדר 8",
    officeHours: "יום ה' 09:30–11:00",
    researchInterests: ["שימור מידע", "תכנון סכמות", "אחסון מבוזר"],
    awards: [],
    publications: ["A. Cohen, \"Scalable Storage Systems\", DataSys, 2016."],
    selectedProjects: ["הטמעת מחסן נתונים לארגון פיננסי"],
    teachingFocus: ["אדריכלות נתונים", "מדיניות אחסון"],
    teachingPhilosophy:
      "להעניק כלים ארכיטקטוניים — הבנה של מה קורה מתחת לפני השטח קריטית למנהלי מערכות.",
    languages: ["עברית", "אנגלית"],
    teachingRating: 4.6,
    profileImageUrl: null,
  },

  {
    id: "453234111",
    name: "ד\"ר ליאת פרידמן",
    email: "liat.friedman@university.ac.il",
    specialization: "מדעי המחשב - תכנות מקבילי",
    courses: ["PAR100", "CONC200"],
    semesters: [2],
    title: "מרצה לתכנות מקבילי וביצועים",
    subjects: ["תכנות מקבילי", "מודלים מקבילים", "GPU ותאום"],
    certifications: ["M.Sc. במדעי המחשב"],
    education: ["M.Sc. — מדעי המחשב"],
    experience:
      "מחקר ופיתוח אלגוריתמים מקבילים; הדרכת סדנאות ביצועים והאצת חישובים בעזרת GPU.",
    bio:
      "מתמקדת בשיפור ביצועים במערכות חישוב ומנחה עבודות תזה בנושא תאום ותזמון.",
    phone: "+972-3-555-1313",
    office: "בניין ביצועים, חדר 6",
    officeHours: "יום ג' 16:00–17:30",
    researchInterests: ["תאום מקבילי", "אצת חישובים ב־GPU"],
    awards: [],
    publications: [],
    selectedProjects: ["סדרת סדנאות GPU לסטודנטים"],
    teachingFocus: ["סימולציות ובדיקות ביצועים"],
    teachingPhilosophy:
      "למידה באמצעות ניסוי ובדיקה — ניתוח ביצועים הוא כלי מרכזי בשיעורים.",
    languages: ["עברית", "אנגלית"],
    teachingRating: 4.4,
    profileImageUrl: null,
  },

  {
    id: "111243232",
    name: "פרופ' אורי לוי",
    email: "uri.levi@university.ac.il",
    specialization: "מדעי המחשב - תורת החישוביות",
    courses: ["TH100", "COMP300"],
    semesters: [1],
    title: "פרופסור תיאורטיקן וראש סמינר",
    subjects: ["תורת החישוביות", "לוגיקה מתמטית", "מורכבות אלגוריתמית"],
    certifications: ["Ph.D. בתורת החישוביות"],
    education: ["Ph.D. — תורת החישוביות"],
    experience:
      "תרומות מחקריות משמעותיות בתחום התיאוריה; הנחיית סטודנטים מתקדמים וסדנары תיאורטיים.",
    bio:
      "מנחה עבודות מחקר ומוביל סמינרים תיאורטיים לשילוב בין מתמטיקה ומדעי המחשב.",
    phone: "+972-3-555-1414",
    office: "בניין תיאוריה, חדר 2",
    officeHours: "בתיאום מראש",
    researchInterests: ["מורכבות חישובית", "חישוב פרמטרי"],
    awards: [],
    publications: [],
    selectedProjects: [],
    teachingFocus: ["עומק תיאורטי", "חשיבה מתמטית"],
    teachingPhilosophy:
      "לחזק חשיבה מופשטת ולחבר בין בניית הוכחות להבנה אלגוריתמית — נדבך הכרחי למדעני מחשב חזקים.",
    languages: ["עברית", "אנגלית"],
    teachingRating: 4.7,
    profileImageUrl: null,
  },

  {
    id: "432111232",
    name: "ד\"ר שרית רגב",
    email: "sarit.regev@university.ac.il",
    specialization: "מדעי המחשב - רובוטיקה",
    courses: ["ROB101", "AUT200"],
    semesters: [2],
    title: "מרצה למחקר ופיתוח רובוטי",
    subjects: ["רובוטיקה בסיסית", "בקרת רובוטים", "אינטגרציית חיישנים"],
    certifications: ["M.Sc. בהנדסת מערכות רובוטיות"],
    education: ["M.Sc. — הנדסת מערכות רובוטיות"],
    experience:
      "פיתוח מערכות רובוטיות תעשייתיות וחינוכיות; שילוב מערכות חישה ובקרה.",
    bio:
      "עוסקת בבקרת תנועה ובאינטגרציה בין חיישנים לאקטואטורים; מובילה פרויקטים מעשיים במעבדה.",
    phone: "+972-3-555-1515",
    office: "מרכז רובוטיקה, חדר 7",
    officeHours: "יום ה' 10:00–12:00",
    researchInterests: ["בקרת תנועה", "אינטגרציית חיישנים לרובוט"],
    awards: [],
    publications: [],
    selectedProjects: ["מערכת רובוטית ללמידה הוראתית", "שיתוף פעולה תעשייתי בייצור רובוטי"],
    teachingFocus: ["פרויקטים מעשיים", "עבודה צוותית ותכנון מערכות"],
    teachingPhilosophy:
      "למידה מבוססת פרויקטים — התלמידים בונים ומנסים מערכות במעבדות שלב אחר שלב.",
    languages: ["עברית", "אנגלית"],
    teachingRating: 4.5,
    profileImageUrl: null,
  },
];

/* -------------------------------------------------------------------------- */
/* --- Helper exports (non-breaking) --------------------------------------- */
/* -------------------------------------------------------------------------- */

/**
 * Safe getter for a profile by lecturer id.
 * Returns LecturerProfile | undefined
 */
export function getLecturerProfileById(id: string): LecturerProfile | undefined {
  return lecturerProfiles.find((p) => p.id === id);
}

/** Return a shallow copy of all profiles */
export function getAllLecturerProfiles(): LecturerProfile[] {
  return lecturerProfiles.slice();
}

/**
 * Simple search helper (name or specialization contains term) — useful for UI filters.
 * Case-insensitive.
 */
export function searchLecturersByNameOrSpecialization(term: string): LecturerProfile[] {
  if (!term) return getAllLecturerProfiles();
  const q = term.trim().toLowerCase();
  return lecturerProfiles.filter(p =>
    (p.name && p.name.toLowerCase().includes(q)) ||
    (p.specialization && p.specialization.toLowerCase().includes(q)) ||
    (p.title && p.title.toLowerCase().includes(q))
  );
}
