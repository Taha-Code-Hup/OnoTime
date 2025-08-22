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

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div>
      {/* ✅ Header with navigation links */}
      <Header onMenuClick={() => setDrawerOpen(true)} />

      {/* ✅ SideMenu stays the same */}
      <SideMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* ✅ Routed Pages */}
      <main style={{ padding: '1rem', minHeight: '70vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/help" element={<Help />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/students" element={<StudentManagement />} />
          <Route path="/courses" element={<CourseManagement />} />
          <Route path="/files" element={<FileManagement />} />
          <Route path="/lecturers" element={<LecturerManagement />} />
        </Routes>
      </main>

      {/* ✅ Keep your footer */}
      <Footer />
    </div>
  );
}

export default App;
