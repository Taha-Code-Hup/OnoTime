import React, { useState } from 'react';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Help from './pages/Help';
import CourseDetails from './pages/CourseDetails';
import StudentManagement from './pages/StudentManagement';
import CourseManagement from './pages/CourseManagement';
import FileManagement from './pages/FileManagement';
import LecturerManagement from './pages/LecturerManagement';
import Login from './pages/Login';
import LecturerDetail from './pages/LecturerDetail';
import AllLecturers from './pages/AllLecturers';
import PopularCoursesPage from './pages/PopularCoursesPage';
import { loadJSON, saveJSON } from "./utils/storage";
import type { Course } from "./models/Course";
import { readKey, writeKey } from './firestore/localStorageAdapter';
import bootstrapTestData from "./firestore/bootstrap";



function App() {
  React.useEffect(() => {
    if (import.meta.env.DEV) {
      // attempt to bootstrap sample data in Firestore for easier inspection during development
      bootstrapTestData().catch(e => console.error('bootstrap failed', e));
    }
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const coursesForPopular = loadJSON<Course[]>("courses", []); // 'courses' is the key used in CourseManagement

// ✅ Normalize courses so each course and file has numeric `views`
  const normalizedCourses = (coursesForPopular || []).map((c) => {
    const newCourse = { ...c } as any;
    if (typeof newCourse.views !== "number") newCourse.views = 0;
    if (Array.isArray(newCourse.files)) {
      newCourse.files = newCourse.files.map((f: any) => {
        const nf = { ...f };
        if (typeof nf.views !== "number") nf.views = 0;
        return nf;
      });
    }
    return newCourse;
  });

  // ✅ Save back normalized version so localStorage always consistent
  try {
    saveJSON("courses", normalizedCourses);
  } catch (err) {
    console.warn("Could not persist normalized courses:", err);
  }


  return (
    <div>
      {/* Header with navigation links */}
      <Header onMenuClick={() => setDrawerOpen(true)} />

      
      <SideMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* Routed Pages */}
      <main style={{ padding: '1rem', minHeight: '70vh' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/students" element={<StudentManagement />} />
          <Route path="/courses" element={<CourseManagement />} />
          <Route path="/files" element={<FileManagement />} />
          <Route path="/lecturers" element={<LecturerManagement />} />
          <Route path="/login" element={<Login />} />
          <Route path="/lecturers/:id" element={<LecturerDetail />} />
          <Route path="/all-lecturers" element={<AllLecturers />} />
          <Route path="/popular" element={<PopularCoursesPage initialCourses={normalizedCourses} />} />
        </Routes>
      </main>

      
      <Footer />
    </div>
  );
}

export default App;
