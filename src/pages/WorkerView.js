import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function WorkerView() {
  // Navigation Tabs: availableJobs, myBids, acceptedJobs, messages, profile
  const [activeTab, setActiveTab] = useState('availableJobs'); 
  const [selectedChatJobId, setSelectedChatJobId] = useState('JOB-065');

  const [workerProfile] = useState({
    name: "Ramesh Sharma",
    category: "Plumbing",
    phone: "+977 9801234567",
    rating: 4.8,
    completedCount: 24,
    certifications: [
      { name: "Master Plumber Certification", issuer: "CTEVT Nepal", year: "2021" },
      { name: "Advanced Pipefitting & Safety", issuer: "Nepal Training Institute", year: "2023" }
    ],
    reviews: [
      { id: "REV-1", clientName: "Bishal Thapa", rating: 5, date: "2026-01-15", comment: "Quick response and fixed the pipe leak permanently. Very professional." },
      { id: "REV-2", clientName: "Pooja Karki", rating: 4.5, date: "2025-11-20", comment: "Good work installing the water heater. Cleaned up after finishing." }
    ]
  });

  const [availableJobs] = useState([
    {
      id: "JOB-101",
      category: "Plumbing",
      title: "Leaking Kitchen Sink",
      description: "Water leaking under the sink pipe near the main joint.",
      budget: 450,
      clientName: "Aarav Sharma",
      location: "Kathmandu, Ward 3"
    },
    {
      id: "JOB-103",
      category: "Plumbing",
      title: "Bathroom Tap Replacement",
      description: "Need to replace an old brass tap with a modern single lever tap.",
      budget: 500,
      clientName: "Suman Shrestha",
      location: "Lalitpur, Ward 5"
    }
  ]);

  const [myBids, setMyBids] = useState([
    {
      id: "BID-1",
      jobId: "JOB-101",
      jobTitle: "Leaking Kitchen Sink",
      category: "Plumbing",
      offeredAmount: 450,
      status: "Pending",
      submittedDate: "2026-02-18"
    },
    {
      id: "BID-99",
      jobId: "JOB-065",
      jobTitle: "Bathroom Pipe Leak Repair",
      category: "Plumbing",
      offeredAmount: 500,
      status: "Accepted",
      submittedDate: "2026-02-10",
      clientName: "Rita Rai",
      location: "Kathmandu, Ward 10",
      jobStatus: "In Progress"
    },
    {
      id: "BID-88",
      jobId: "JOB-062",
      jobTitle: "Water Tank Outlet Repair",
      category: "Plumbing",
      offeredAmount: 600,
      status: "Rejected",
      submittedDate: "2025-09-12"
    }
  ]);

  const [completedJobsList] = useState([
    { id: "JOB-044", title: "Main Line Valve Replacement", clientName: "Kiran Adhikari", date: "2026-01-12", finalPrice: 1200, rating: 5.0 },
    { id: "JOB-031", title: "Drainage Unclogging", clientName: "Deepak Giri", date: "2025-12-05", finalPrice: 800, rating: 4.5 }
  ]);

  // Centralized Messaging State grouped by Job ID
  const [chatThreads, setChatThreads] = useState([
    {
      jobId: "JOB-065",
      jobTitle: "Bathroom Pipe Leak Repair",
      clientName: "Rita Rai",
      unread: true,
      messages: [
        { sender: "client", text: "Hello Ramesh, when can you visit for the repair?", time: "10:30 AM" },
        { sender: "worker", text: "Namaste! I can come today around 2:00 PM.", time: "10:32 AM" },
        { sender: "client", text: "That works for me. Please bring a 1/2 inch valve replace kit.", time: "10:35 AM" }
      ]
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [bidInputs, setBidInputs] = useState({});

  const activeThread = chatThreads.find(thread => thread.jobId === selectedChatJobId);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChatJobId) return;

    const updatedThreads = chatThreads.map(thread => {
      if (thread.jobId === selectedChatJobId) {
        return {
          ...thread,
          messages: [
            ...thread.messages,
            {
              sender: "worker",
              text: newMessage,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      }
      return thread;
    });

    setChatThreads(updatedThreads);
    setNewMessage("");
  };

  const handleBidInputChange = (jobId, amount) => {
    setBidInputs({ ...bidInputs, [jobId]: amount });
  };

  const handleSubmitBid = (job) => {
    const amount = bidInputs[job.id] || job.budget;
    const existingBid = myBids.find(b => b.jobId === job.id);
    if (existingBid) {
      alert("You have already submitted a bid for this job.");
      return;
    }

    const newBid = {
      id: `BID-${Date.now().toString().slice(-3)}`,
      jobId: job.id,
      jobTitle: job.title,
      category: job.category,
      offeredAmount: Number(amount),
      status: "Pending",
      submittedDate: new Date().toISOString().split('T')[0]
    };

    setMyBids([newBid, ...myBids]);
    alert(`Bid of NRS ${amount} submitted successfully!`);
  };

  const handleDeleteBid = (bidId) => {
    const targetBid = myBids.find(b => b.id === bidId);
    if (targetBid && targetBid.status !== "Pending") {
      alert("Accepted or Rejected bids cannot be deleted.");
      return;
    }

    if (window.confirm("Are you sure you want to withdraw this bid?")) {
      setMyBids(myBids.filter(b => b.id !== bidId));
    }
  };

  const acceptedBids = myBids.filter(b => b.status === 'Accepted');

  return (
    <div style={styles.pageLayout}>
      {/* Sidebar Navigation */}
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.sidebarHeader}>
            <h2 style={styles.sidebarTitle}>Technician Portal</h2>
            <p style={styles.userBadge}>{workerProfile.name} ({workerProfile.category})</p>
          </div>
          <nav style={styles.navMenu}>
            <button
              style={activeTab === 'availableJobs' ? styles.navBtnActive : styles.navBtn}
              onClick={() => setActiveTab('availableJobs')}
            >
              Browse Jobs ({availableJobs.length})
            </button>
            <button
              style={activeTab === 'myBids' ? styles.navBtnActive : styles.navBtn}
              onClick={() => setActiveTab('myBids')}
            >
              My Bids ({myBids.length})
            </button>
            <button
              style={activeTab === 'acceptedJobs' ? styles.navBtnActive : styles.navBtn}
              onClick={() => setActiveTab('acceptedJobs')}
            >
              Active Jobs ({acceptedBids.length})
            </button>
            <button
              style={activeTab === 'messages' ? styles.navBtnActive : styles.navBtn}
              onClick={() => setActiveTab('messages')}
            >
              Messages ({chatThreads.length})
            </button>
            <button
              style={activeTab === 'profile' ? styles.navBtnActive : styles.navBtn}
              onClick={() => setActiveTab('profile')}
            >
              Profile & Reviews
            </button>
          </nav>
        </div>

        <div style={styles.sidebarFooter}>
          <Link to="/" style={styles.backLink}>← Back to Home</Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={styles.contentArea}>
        {/* Available Jobs Tab */}
        {activeTab === 'availableJobs' && (
          <section style={styles.section}>
            <h2>Available Jobs in {workerProfile.category}</h2>
            <p style={styles.subtext}>View open client requests and place your bid.</p>

            <div style={styles.jobCardsContainer}>
              {availableJobs.map((job) => {
                const existingBid = myBids.find(b => b.jobId === job.id);
                return (
                  <div key={job.id} style={styles.jobCard}>
                    <div style={styles.jobHeader}>
                      <div>
                        <strong style={{ fontSize: '16px' }}>{job.title}</strong>
                        <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>({job.id})</span>
                      </div>
                      <span style={styles.budgetBadge}>Client Budget: NRS {job.budget}</span>
                    </div>

                    <p style={styles.jobDesc}>{job.description}</p>
                    <div style={styles.jobMeta}>
                      <span><strong>Client:</strong> {job.clientName}</span> | 
                      <span> <strong>Location:</strong> {job.location}</span>
                    </div>

                    <div style={styles.bidActionBox}>
                      {existingBid ? (
                        <div style={styles.alreadyBidBox}>
                          Bid Submitted: <strong>NRS {existingBid.offeredAmount}</strong> 
                          <span style={
                            existingBid.status === 'Accepted' ? styles.badgeSuccess :
                            existingBid.status === 'Rejected' ? styles.badgeDanger : styles.badgeWarning
                          }>
                            {existingBid.status}
                          </span>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <input
                            type="number"
                            placeholder="Your Price"
                            value={bidInputs[job.id] || job.budget}
                            onChange={(e) => handleBidInputChange(job.id, e.target.value)}
                            style={styles.bidInput}
                          />
                          <button
                            onClick={() => handleSubmitBid(job)}
                            style={styles.btnPrimary}
                          >
                            Place Bid
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* My Bids Tab */}
        {activeTab === 'myBids' && (
          <section style={styles.section}>
            <h2>My Submitted Bids</h2>
            <p style={styles.subtext}>Track your bid status. Pending bids can be withdrawn.</p>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Bid ID</th>
                  <th style={styles.th}>Job ID</th>
                  <th style={styles.th}>Job Title</th>
                  <th style={styles.th}>Offered Price</th>
                  <th style={styles.th}>Date</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {myBids.map((bid) => (
                  <tr key={bid.id}>
                    <td style={styles.td}><strong>{bid.id}</strong></td>
                    <td style={styles.td}>{bid.jobId}</td>
                    <td style={styles.td}>{bid.jobTitle}</td>
                    <td style={styles.td}>NRS {bid.offeredAmount}</td>
                    <td style={styles.td}>{bid.submittedDate}</td>
                    <td style={styles.td}>
                      <span style={
                        bid.status === 'Accepted' ? styles.badgeSuccess :
                        bid.status === 'Rejected' ? styles.badgeDanger : styles.badgeWarning
                      }>
                        {bid.status === 'Accepted' ? 'Accepted (Assigned)' : bid.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {bid.status === 'Pending' ? (
                        <button
                          onClick={() => handleDeleteBid(bid.id)}
                          style={styles.btnDangerSmall}
                        >
                          Withdraw Bid
                        </button>
                      ) : bid.status === 'Accepted' ? (
                        <button 
                          onClick={() => { setActiveTab('messages'); setSelectedChatJobId(bid.jobId); }}
                          style={styles.btnSuccessSmall}
                        >
                          Message Client
                        </button>
                      ) : (
                        <span style={{ color: '#888', fontSize: '12px' }}>Locked</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {/* Active Accepted Jobs Tab */}
        {activeTab === 'acceptedJobs' && (
          <section style={styles.section}>
            <h2>Active Accepted Jobs</h2>
            <p style={styles.subtext}>Manage your active job assignments and jump straight to client chats.</p>

            {acceptedBids.length === 0 ? (
              <p>No accepted jobs currently active.</p>
            ) : (
              acceptedBids.map(job => (
                <div key={job.jobId} style={styles.acceptedJobCard}>
                  <div style={styles.acceptedHeader}>
                    <div>
                      <h3>{job.jobTitle} <span style={styles.badgeSuccess}>Assigned</span></h3>
                      <p style={{ margin: '4px 0', fontSize: '14px' }}><strong>Client:</strong> {job.clientName} | <strong>Location:</strong> {job.location}</p>
                      <p style={{ margin: '4px 0', fontSize: '14px' }}><strong>Agreed Price:</strong> NRS {job.offeredAmount}</p>
                    </div>
                    <button 
                      style={styles.btnPrimary}
                      onClick={() => { setActiveTab('messages'); setSelectedChatJobId(job.jobId); }}
                    >
                      💬 Message Client
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {/* Standalone Messaging Portal Tab */}
        {activeTab === 'messages' && (
          <section style={{ ...styles.section, maxWidth: '950px' }}>
            <h2>Client Messages</h2>
            <p style={styles.subtext}>Direct communication channel for active and accepted jobs.</p>

            <div style={styles.messagingPortal}>
              {/* Left Conversations Panel */}
              <div style={styles.threadsList}>
                <div style={styles.threadsHeader}>Active Chats</div>
                {chatThreads.map(thread => (
                  <div
                    key={thread.jobId}
                    onClick={() => setSelectedChatJobId(thread.jobId)}
                    style={selectedChatJobId === thread.jobId ? styles.threadItemActive : styles.threadItem}
                  >
                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{thread.clientName}</div>
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{thread.jobTitle}</div>
                    <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>Job ID: {thread.jobId}</div>
                  </div>
                ))}
              </div>

              {/* Right Active Messaging Window */}
              <div style={styles.chatWindow}>
                {activeThread ? (
                  <>
                    <div style={styles.chatWindowHeader}>
                      <div>
                        <strong>{activeThread.clientName}</strong>
                        <div style={{ fontSize: '12px', color: '#666' }}>{activeThread.jobTitle} ({activeThread.jobId})</div>
                      </div>
                    </div>

                    <div style={styles.chatMessagesArea}>
                      {activeThread.messages.map((msg, index) => (
                        <div
                          key={index}
                          style={msg.sender === 'worker' ? styles.msgWorker : styles.msgClient}
                        >
                          <div style={styles.msgText}>{msg.text}</div>
                          <div style={styles.msgTime}>{msg.time}</div>
                        </div>
                      ))}
                    </div>

                    <div style={styles.chatInputRow}>
                      <input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        style={styles.chatInput}
                      />
                      <button onClick={handleSendMessage} style={styles.btnPrimary}>
                        Send
                      </button>
                    </div>
                  </>
                ) : (
                  <div style={styles.emptyChatPlaceholder}>
                    Select a conversation from the left to start messaging.
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Worker Profile, Certifications & Reviews Tab */}
        {activeTab === 'profile' && (
          <section style={styles.section}>
            <h2>Technician Profile & Portfolio</h2>
            <p style={styles.subtext}>Your performance stats, certifications, and client feedback.</p>

            <div style={styles.profileCard}>
              <div style={styles.profileGrid}>
                <div><strong>Full Name:</strong> {workerProfile.name}</div>
                <div><strong>Category:</strong> {workerProfile.category}</div>
                <div><strong>Phone:</strong> {workerProfile.phone}</div>
                <div><strong>Rating:</strong> ⭐ {workerProfile.rating} / 5</div>
                <div><strong>Jobs Completed:</strong> {workerProfile.completedCount}</div>
              </div>
            </div>

            {/* Certifications Section */}
            <div style={styles.subSection}>
              <h3 style={styles.subHeading}>Verified Certifications</h3>
              <div style={styles.certGrid}>
                {workerProfile.certifications.map((cert, index) => (
                  <div key={index} style={styles.certCard}>
                    <div style={{ fontWeight: 'bold', color: '#2c3e50' }}>📜 {cert.name}</div>
                    <div style={{ fontSize: '13px', color: '#666' }}>Issuer: {cert.issuer} ({cert.year})</div>
                    <span style={styles.badgeVerified}>✓ Verified</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Work History */}
            <div style={styles.subSection}>
              <h3 style={styles.subHeading}>Recent Completed Works</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Job Title</th>
                    <th style={styles.th}>Client</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Amount</th>
                    <th style={styles.th}>Rating Given</th>
                  </tr>
                </thead>
                <tbody>
                  {completedJobsList.map(item => (
                    <tr key={item.id}>
                      <td style={styles.td}><strong>{item.title}</strong></td>
                      <td style={styles.td}>{item.clientName}</td>
                      <td style={styles.td}>{item.date}</td>
                      <td style={styles.td}>NRS {item.finalPrice}</td>
                      <td style={styles.td}>⭐ {item.rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Client Reviews Section */}
            <div style={styles.subSection}>
              <h3 style={styles.subHeading}>Client Reviews</h3>
              <div style={styles.reviewList}>
                {workerProfile.reviews.map(rev => (
                  <div key={rev.id} style={styles.reviewCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>{rev.clientName}</strong>
                      <span style={{ color: '#f39c12' }}>{"⭐".repeat(Math.round(rev.rating))} ({rev.rating})</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#444', margin: '6px 0' }}>"{rev.comment}"</p>
                    <span style={{ fontSize: '12px', color: '#888' }}>Date: {rev.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

const styles = {
  pageLayout: { display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' },
  sidebar: { width: '250px', backgroundColor: '#1b2a47', color: '#fff', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  sidebarHeader: { marginBottom: '20px' },
  sidebarFooter: { paddingTop: '20px', borderTop: '1px solid #2c3e50' },
  backLink: { color: '#1abc9c', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' },
  sidebarTitle: { fontSize: '20px', margin: '0', color: '#ecf0f1' },
  userBadge: { fontSize: '13px', color: '#1abc9c', margin: '4px 0 0 0', fontWeight: 'bold' },
  navMenu: { display: 'flex', flexDirection: 'column', gap: '10px' },
  navBtn: { padding: '12px 15px', backgroundColor: 'transparent', color: '#bdc3c7', border: 'none', textAlign: 'left', borderRadius: '6px', cursor: 'pointer', fontSize: '15px' },
  navBtnActive: { padding: '12px 15px', backgroundColor: '#2c3e50', color: '#fff', borderLeft: '4px solid #1abc9c', textAlign: 'left', borderRadius: '4px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' },
  contentArea: { flex: 1, padding: '30px', backgroundColor: '#f4f6f7' },
  section: { backgroundColor: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #e1e8ed', maxWidth: '850px' },
  subtext: { color: '#666', fontSize: '14px', marginTop: '4px', marginBottom: '20px' },
  subSection: { marginTop: '25px', borderTop: '1px solid #eee', paddingTop: '15px' },
  subHeading: { fontSize: '16px', color: '#2c3e50', marginBottom: '12px' },
  jobCardsContainer: { display: 'flex', flexDirection: 'column', gap: '15px' },
  jobCard: { padding: '16px', borderRadius: '6px', border: '1px solid #e1e8ed', backgroundColor: '#fafafa' },
  jobHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  budgetBadge: { backgroundColor: '#e3f2fd', color: '#0d47a1', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold', fontSize: '13px' },
  jobDesc: { fontSize: '14px', color: '#444', margin: '0 0 10px 0' },
  jobMeta: { fontSize: '13px', color: '#666', marginBottom: '12px' },
  bidActionBox: { borderTop: '1px solid #eee', paddingTop: '10px' },
  alreadyBidBox: { display: 'flex', gap: '10px', alignItems: 'center', fontSize: '14px', color: '#333' },
  bidInput: { padding: '6px 10px', fontSize: '14px', width: '120px', borderRadius: '4px', border: '1px solid #ccc' },
  btnPrimary: { backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' },
  btnDangerSmall: { backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  btnSuccessSmall: { backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px', backgroundColor: '#fff' },
  th: { borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left', fontSize: '14px' },
  td: { borderBottom: '1px solid #ddd', padding: '10px', fontSize: '14px' },
  badgeSuccess: { backgroundColor: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },
  badgeWarning: { backgroundColor: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },
  badgeDanger: { backgroundColor: '#f8d7da', color: '#721c24', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' },
  badgeVerified: { backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '2px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', display: 'inline-block', marginTop: '6px' },
  profileCard: { backgroundColor: '#fafafa', padding: '20px', borderRadius: '6px', border: '1px solid #e1e8ed' },
  profileGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '15px' },
  certGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  certCard: { border: '1px solid #e1e8ed', padding: '12px', borderRadius: '6px', backgroundColor: '#fafafa' },
  reviewList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  reviewCard: { border: '1px solid #e1e8ed', padding: '12px', borderRadius: '6px', backgroundColor: '#fff' },
  acceptedJobCard: { border: '1px solid #c3e6cb', backgroundColor: '#f8fff9', padding: '16px', borderRadius: '6px', marginBottom: '15px' },
  acceptedHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  
  // Dedicated Messaging Portal Styles
  messagingPortal: { display: 'flex', border: '1px solid #e1e8ed', borderRadius: '8px', minHeight: '420px', backgroundColor: '#fff', overflow: 'hidden' },
  threadsList: { width: '280px', borderRight: '1px solid #e1e8ed', backgroundColor: '#fafafa' },
  threadsHeader: { padding: '12px', borderBottom: '1px solid #e1e8ed', fontWeight: 'bold', fontSize: '14px', backgroundColor: '#f4f6f7' },
  threadItem: { padding: '12px', borderBottom: '1px solid #eee', cursor: 'pointer' },
  threadItemActive: { padding: '12px', borderBottom: '1px solid #eee', cursor: 'pointer', backgroundColor: '#e3f2fd', borderLeft: '4px solid #007bff' },
  chatWindow: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  chatWindowHeader: { padding: '12px 16px', borderBottom: '1px solid #e1e8ed', backgroundColor: '#fdfdfd' },
  chatMessagesArea: { flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '320px', backgroundColor: '#fafafa' },
  msgWorker: { alignSelf: 'flex-end', backgroundColor: '#dcf8c6', padding: '8px 12px', borderRadius: '8px', maxWidth: '70%' },
  msgClient: { alignSelf: 'flex-start', backgroundColor: '#fff', border: '1px solid #ddd', padding: '8px 12px', borderRadius: '8px', maxWidth: '70%' },
  msgText: { fontSize: '13px', color: '#333' },
  msgTime: { fontSize: '10px', color: '#888', textAlign: 'right', marginTop: '2px' },
  chatInputRow: { display: 'flex', gap: '8px', padding: '12px', borderTop: '1px solid #e1e8ed', backgroundColor: '#fff' },
  chatInput: { flex: 1, padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' },
  emptyChatPlaceholder: { display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', color: '#888', fontSize: '14px' }
};