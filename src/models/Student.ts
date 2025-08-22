export type Student = {
  id: string;
  fullName: string;
  email: string;
  nationalId: string;
  semester: number;
  courseIds: string[];  // <— this is the correct field
};
