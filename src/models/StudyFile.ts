export type StudyFile = {
  id: string;
  name: string;
  description: string;
  type: 'pdf' | 'ppt' | 'doc' | 'link' | 'other';
  fileUrl: string;
  courseId: string;  // linked course
  status: 'pending' | 'approved' | 'rejected';
  uploaderId: string; // student or lecturer id
};
