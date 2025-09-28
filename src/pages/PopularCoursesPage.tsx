// src/pages/PopularCoursesPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { Course } from "../models/Course";
import type { StudyFile } from "../models/StudyFile";
import type { Lecturer } from "../models/Lecturer";
import { loadJSON } from "../utils/storage";
import { Button } from "@mui/material";

interface Props {
  initialCourses?: Course[];
  topN?: number;
}

type FileAggregate = {
  id: string;
  name: string;
  views: number;
  courseIds: string[];
  courseNames: string[];
};

export default function PopularCoursesPage({ initialCourses = [], topN = 10 }: Props) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [globalFiles, setGlobalFiles] = useState<StudyFile[]>([]);
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const COURSE_KEY = "courses";
  const FILE_KEY = "files";
  const LECT_KEY = "lecturers";

  useEffect(() => {
    setLoading(true);
    try {
      const storedCourses = (initialCourses && initialCourses.length > 0)
        ? initialCourses
        : loadJSON<Course[]>(COURSE_KEY, []);
      setCourses(normalizeCourses(storedCourses || []));

      const storedFiles = loadJSON<StudyFile[]>(FILE_KEY, []);
      setGlobalFiles(normalizeFiles(storedFiles || []));

      const storedLecturers = loadJSON<Lecturer[]>(LECT_KEY, []);
      setLecturers(storedLecturers || []);
    } catch (err: any) {
      console.error("PopularCoursesPage load error:", err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }, [initialCourses]);

  function normalizeCourses(raw: Course[]): Course[] {
    return (raw || []).map((c) => {
      const copy: any = { ...c };
      if (typeof copy.views !== "number") copy.views = 0;
      if (!Array.isArray(copy.studentIds)) copy.studentIds = [];
      if (Array.isArray(copy.files)) {
        copy.files = copy.files.map((f: any) => {
          const nf = { ...f };
          if (typeof nf.views !== "number") nf.views = 0;
          return nf;
        });
      }
      return copy as Course;
    });
  }

  function normalizeFiles(raw: StudyFile[]): StudyFile[] {
    return (raw || []).map((f: any) => {
      const nf = { ...f } as any;
      if (typeof nf.views !== "number") nf.views = 0;
      return nf as StudyFile;
    });
  }

  function lecturerDisplayName(l?: Lecturer | null) {
    if (!l) return "—";
    // common field names
    if ((l as any).fullName) return (l as any).fullName;
    if ((l as any).name) return (l as any).name;
    if ((l as any).firstName || (l as any).lastName) return `${(l as any).firstName ?? ""} ${(l as any).lastName ?? ""}`.trim();
    if ((l as any).email) return (l as any).email;
    return "—";
  }

  const lecturerMap = useMemo(() => {
    const m = new Map<string, Lecturer>();
    for (const l of lecturers) {
      if ((l as any).id) m.set((l as any).id, l);
      if ((l as any)._id) m.set((l as any)._id, l);
    }
    return m;
  }, [lecturers]);

  const topCourses = useMemo(() => {
    return [...courses].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, topN);
  }, [courses, topN]);

  const topFiles = useMemo<FileAggregate[]>(() => {
    const map = new Map<string, FileAggregate>();

    // Inline course files
    for (const course of courses) {
      if (!Array.isArray(course.files)) continue;
      for (const f of course.files) {
        const key = f.id ?? `${course.id}::${f.name}`;
        const entry = map.get(key);
        if (entry) {
          entry.views += (f.views ?? 0);
          if (!entry.courseIds.includes(course.id)) entry.courseIds.push(course.id);
          if (!entry.courseNames.includes(course.name)) entry.courseNames.push(course.name);
        } else {
          map.set(key, {
            id: f.id ?? key,
            name: f.name,
            views: f.views ?? 0,
            courseIds: [course.id],
            courseNames: [course.name],
          });
        }
      }
    }

    // Global files
    for (const f of globalFiles) {
      const key = f.id ?? `global::${f.name}`;
      const entry = map.get(key);
      const parentCourse = courses.find((c) => c.id === f.courseId);
      const parentName = parentCourse ? parentCourse.name : undefined;

      if (entry) {
        entry.views += (f.views ?? 0);
        if (f.courseId && !entry.courseIds.includes(f.courseId)) entry.courseIds.push(f.courseId);
        if (parentName && !entry.courseNames.includes(parentName)) entry.courseNames.push(parentName);
      } else {
        map.set(key, {
          id: f.id ?? key,
          name: f.name,
          views: f.views ?? 0,
          courseIds: f.courseId ? [f.courseId] : [],
          courseNames: parentName ? [parentName] : [],
        });
      }
    }

    return Array.from(map.values()).sort((a, b) => b.views - a.views).slice(0, topN);
  }, [courses, globalFiles, topN]);

  const styles = {
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: 24,
    },
  };

  return (
    <div style={{ padding: "1rem", maxWidth: 1100, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, marginBottom: 12 }}>Popular Courses &amp; Files</h1>

      {loading && <div style={{ marginBottom: 12 }}>טוען נתונים...</div>}
      {error && <div style={{ marginBottom: 12, color: "red" }}>שגיאה: {error}</div>}

      {/* Top courses */}
      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Top Courses by Views</h2>
        {topCourses.length === 0 ? (
          <div>אין נתוני קורסים זמינים.</div>
        ) : (
          <div>
            {topCourses.map((course, idx) => {
              const lecturer = lecturerMap.get(course.lecturerId ?? "");
              const filesCountInline = Array.isArray(course.files) ? course.files.length : 0;
              const filesCountGlobal = globalFiles.filter((f) => f.courseId === course.id).length;
              const filesCount = Math.max(filesCountInline, filesCountGlobal, 0);

              const studentsCount = Array.isArray((course as any).studentIds)
                ? (course as any).studentIds.length
                : 0;

              return (
                <div
                  key={course.id || idx}
                  style={{
                    border: "1px solid #e2e8f0",
                    padding: 12,
                    borderRadius: 8,
                    marginBottom: 10,
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ width: 40, fontSize: 16, fontWeight: 600 }}>{idx + 1}</div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{course.name}</div>
                    {course.description && (
                      <div style={{ marginTop: 6, color: "#555" }}>{course.description}</div>
                    )}

                    <div style={{ marginTop: 8, display: "flex", gap: 16, flexWrap: "wrap", color: "#333" }}>
                      <div>
                        <strong>מרצה:</strong> {lecturerDisplayName(lecturer)}
                      </div>
                      <div>
                        <strong>סמסטר:</strong> {course.semester ?? "—"}
                      </div>
                      <div>📄 קבצים: {filesCount}</div>
                      <div>👩‍🎓 סטודנטים: {studentsCount}</div>
                    </div>
                  </div>

                  <div style={{ width: 80, textAlign: "right" }}>
                    <div style={{ fontSize: 14, color: "#666" }}>Views</div>
                    <div style={{ fontWeight: 700, fontSize: 18 }}>{course.views ?? 0}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Top files */}
      <section style={{ marginBottom: 12 }}>
        <h2 style={{ fontSize: 18, marginBottom: 8 }}>Top Files by Views</h2>
        {topFiles.length === 0 ? (
          <div>אין נתוני קבצים זמינים.</div>
        ) : (
          <div style={{ overflowX: "auto", border: "1px solid #e2e8f0", borderRadius: 8 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  <th style={{ padding: 8, textAlign: "left" }}>#</th>
                  <th style={{ padding: 8, textAlign: "left" }}>קובץ</th>
                  <th style={{ padding: 8, textAlign: "left" }}>קורסים</th>
                  <th style={{ padding: 8, textAlign: "right" }}>Views</th>
                </tr>
              </thead>
              <tbody>
                {topFiles.map((f, i) => (
                  <tr key={f.id} style={{ borderTop: "1px solid #eef2f7" }}>
                    <td style={{ padding: 8 }}>{i + 1}</td>
                    <td style={{ padding: 8 }}>{f.name}</td>
                    <td style={{ padding: 8 }}>{f.courseNames.length ? f.courseNames.join(", ") : "N/A"}</td>
                    <td style={{ padding: 8, textAlign: "right" }}>{f.views}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <div style={styles.buttonContainer as React.CSSProperties}>
        <Button
          variant="contained"
          onClick={() => navigate("/home")}     >
          חזרה לעמוד הבית
        </Button>
      </div>
    </div>
  );
}
