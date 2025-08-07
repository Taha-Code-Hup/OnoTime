// טיפוס עבור סטודנט
export type Student = {
  id: string; // מספר זהות (9 ספרות)
  fullName: string;
  email: string;
  semester: number;
  courses: string[];
};

// מערך דוגמה של סטודנטים
export const students: Student[] = [
  {
    id: '123456789',
    fullName: 'Daniel Cohen',
    email: 'daniel@example.com',
    semester: 3,
    courses: ['React', 'Node.js'],
  },
  {
    id: '987654321',
    fullName: 'Lea Levi',
    email: 'lea@example.com',
    semester: 2,
    courses: ['Databases', 'Python'],
  },
  {
    id: '456789123',
    fullName: 'Maya Ben-David',
    email: 'maya@university.ac.il',
    semester: 1,
    courses: ['HTML', 'CSS', 'JavaScript'],
  },
];
