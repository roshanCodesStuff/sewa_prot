import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClientView from './pages/ClientView';
import WorkerView from './pages/WorkerView';
import AdminView from './pages/AdminView';

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>prototype view sewa</h1>
      <p style={styles.subtitle}>Select a user role view to start the interactive workflow:</p>
      
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <Link to="/admin" style={styles.link}>
            Go to Admin View (Category Floor Management & Worker Approval)
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/worker" style={styles.link}>
            Go to Worker View (Visual Feed, Inspection & Counter-Bidding)
          </Link>
        </li>
        <li style={styles.listItem}>
          <Link to="/client" style={styles.link}>
            Go to Client View (Job Posting, Bid Selection & Work Verification)
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/worker" element={<WorkerView />} />
        <Route path="/client" element={<ClientView />} />
      </Routes>
    </Router>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '40px',
    maxWidth: '800px'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  subtitle: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '20px'
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '20px'
  },
  listItem: {
    marginBottom: '15px'
  },
  link: {
    color: '#0000EE',
    fontSize: '18px',
    textDecoration: 'underline'
  }
};