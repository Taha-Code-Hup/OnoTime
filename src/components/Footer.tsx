import React from 'react';

function Footer() {
  return (
    <footer style={{ padding: '1rem', textAlign: 'center', borderTop: '1px solid #eee', background: '#fff' }}>
      © {new Date().getFullYear()} Academic Info System
    </footer>
  );
}

export default Footer;
