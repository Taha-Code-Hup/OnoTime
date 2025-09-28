import type { StudyFile } from "./StudyFile";

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  studentIds: string[];
  semester: number;
  lecturerId?: string | null;   // <-- FIX: allow unassigned lecturer

  // Added for Popular page:
  views: number;              // number of times the course was viewed (set 0 if unknown)
  files?: StudyFile[];        // optional: include course files inline if you want to pass them to the Popular page
}
