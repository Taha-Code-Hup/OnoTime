export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  studentIds: string[];
  semester: number;
  lecturerId?: string | null;   // <-- FIX: allow unassigned lecturer
}
