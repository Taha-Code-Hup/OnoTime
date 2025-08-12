export class Student {
  id: string;
  fullName: string;
  email: string;
  semester: number;
  courses: string[];

  constructor(
    id: string,
    fullName: string,
    email: string,
    semester: number,
    courses: string[]
  ) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.semester = semester;
    this.courses = courses;
  }
}
