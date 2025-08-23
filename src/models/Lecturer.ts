// src/models/Lecturer.ts

// Named export (not default) for consistency
export interface Lecturer {
  id: string;
  name: string;
  email: string;
  specialization?: string;
  courses: string[];
  semesters: number[];
}

// Permanent lecturers (15)
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
