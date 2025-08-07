import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StudentTable from './components/StudentTable';

function App() {
  return (
    <div>
      <Header />
      <main style={{ padding: '1rem' }}>
        <h1>רשימת סטודנטים</h1>
        <StudentTable />
      </main>
      <Footer />
    </div>
  );
}

export default App;
