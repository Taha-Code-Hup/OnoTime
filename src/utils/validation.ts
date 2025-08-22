import type { Student } from '../models/Student';

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidNationalId = (id: string) =>
  /^\d{9}$/.test(id);

export const uniqueByNationalId = (students: Student[], nationalId: string) =>
  !students.some(s => s.nationalId === nationalId);
