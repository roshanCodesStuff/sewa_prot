import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ClientView() {
  const [activeTab, setActiveTab] = useState('post');

  const [clientProfile] = useState({
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+977 9841987654",
    address: "Kathmandu, Ward No. 3",
    memberSince: "Jan 2025",
  });

  const categoryFloors = {
    "Plumbing": 300,
    "Electrical": 800,
    "Carpentry": 500,
    "Masonry": 600,
    "Painting": 700,
    "Deep Home Cleaning": 1200,
    "Sofa & Carpet Cleaning": 800,
    "Pest Control": 1500,
    "Water Tank Cleaning": 1000,
    "AC Repair & Service": 700,
    "Washing Machine Repair": 600,
    "Refrigerator Service": 500,
    "Microwave Repair": 400,
    "Salon at Home (Women)": 500,
    "Men's Haircut & Grooming": 350,
    "Full Body Massage": 1200,
  };

  const [showAlternatePhone, setShowAlternatePhone] = useState(false);
  const [jobForm, setJobForm] = useState({
    category: 'Plumbing',
    title: '',
    description: '',
    budget: 300,
    alternatePhone: '',
    photo: null,
    video: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const [activeJobs, setActiveJobs] = useState([
    {
      id: "JOB-101",
      category: "Plumbing",
      title: "Leaking Kitchen Sink",
      budget: 450,
      status: "Open",
      hasMedia: true,
      assignedWorkerId: null,
      bids: [
        { id: "BID-1", workerName: "Ramesh Sharma", rating: 4.8, bidAmount: 450, phone: "+9779801234567", status: "Pending" },
        { id: "BID-2", workerName: "Hari Poudel", rating: 4.5, bidAmount: 400, phone: "+9779823456789", status: "Pending" }
      ]
    },
    {
      id: "JOB-102",
      category: "Electrical",
      title: "Short Circuit in Living Room",
      budget: 900,
      status: "Assigned",
      workerName: "Bikash Tamang",
      hasMedia: false,
      assignedWorkerId: "BID-3",
      bids: [
        { id: "BID-3", workerName: "Bikash Tamang", rating: 4.9, bidAmount: 850, phone: "+9779841122334", status: "Accepted" }
      ]
    }
  ]);

  const [selectedJobForBids, setSelectedJobForBids] = useState(null);

  // Messaging State
  const [activeChatJobId, setActiveChatJobId] = useState("JOB-102");
  const [chatMessages, setChatMessages] = useState({
    "JOB-102": [
      { id: 1, sender: "Bikash Tamang", role: "worker", text: "Namaste sir! I have accepted the job request. I will arrive around 2 PM.", timestamp: "10:30 AM" },
      { id: 2, sender: "Aarav Sharma", role: "client", text: "Great, thank you! Please bring extra 16A circuit breakers if possible.", timestamp: "10:32 AM" }
    ]
  });
  const [newMessageText, setNewMessageText] = useState("");

  const [completedServices] = useState([
    { id: "JOB-088", category: "Deep Home Cleaning", title: "Full Apartment Deep Clean", date: "2026-01-15", workerName: "Sita Thapa", paidAmount: 1400, review: { rating: 5, comment: "Excellent service. Very thorough cleaning of the balcony and kitchen." } },
    { id: "JOB-072", category: "AC Repair & Service", title: "Living Room AC Filter Change", date: "2025-11-02", workerName: "Hari Poudel", paidAmount: 850, review: { rating: 4, comment: "Quick response and fixed the cooling issue within an hour." } },
    { id: "JOB-065", category: "Plumbing", title: "Bathroom Pipe Leak Repair", date: "2025-10-18", workerName: "Ramesh Sharma", paidAmount: 500, review: { rating: 5, comment: "Fixed the leak quickly without any mess." } },
    { id: "JOB-054", category: "Electrical", title: "Ceiling Fan Installation", date: "2025-09-10", workerName: "Bikash Tamang", paidAmount: 900, review: { rating: 4, comment: "Good wiring work and clean installation." } },
    { id: "JOB-049", category: "Pest Control", title: "Cockroach Control Service", date: "2025-08-22", workerName: "Kiran Sunar", paidAmount: 1600, review: { rating: 5, comment: "Pest free ever since. Highly recommended." } },
    { id: "JOB-041", category: "Carpentry", title: "Door Hinge Replacement", date: "2025-07-05", workerName: "Manoj Rai", paidAmount: 600, review: { rating: 4, comment: "Smooth hinge repair." } },
    { id: "JOB-033", category: "Painting", title: "Bedroom Accent Wall Paint", date: "2025-06-14", workerName: "Rajesh Shrestha", paidAmount: 2500, review: { rating: 5, comment: "Beautiful finish and neat work." } },
    { id: "JOB-028", category: "Water Tank Cleaning", title: "1000L Overhead Tank Clean", date: "2025-05-30", workerName: "Dipendra Oli", paidAmount: 1100, review: { rating: 4, comment: "Thorough cleaning process." } },
    { id: "JOB-019", category: "Washing Machine Repair", title: "Drainage Pump Inspection", date: "2025-04-12", workerName: "Sanjay Joshi", paidAmount: 700, review: { rating: 3, comment: "Resolved issue but arrived late." } },
    { id: "JOB-012", category: "Sofa & Carpet Cleaning", title: "3-Seater Sofa Shampooing", date: "2025-03-01", workerName: "Anish Maharjan", paidAmount: 950, review: { rating: 5, comment: "Stains completely removed!" } }
  ]);

  const assignedJobs = activeJobs.filter(j => j.status === "Assigned");

  const allJobsForSelection = [
    ...activeJobs.map(j => ({ id: j.id, title: j.title, category: j.category, status: j.status })),
    ...completedServices.map(s => ({ id: s.id, title: s.title, category: s.category, status: "Completed" }))
  ];

  const [complaintJobSearch, setComplaintJobSearch] = useState('');
  const [selectedJobForComplaint, setSelectedJobForComplaint] = useState(null);
  const [complaintForm, setComplaintForm] = useState({ issue: '' });
  const [complaints, setComplaints] = useState([
    { id: "CMP-301", jobId: "JOB-102", jobTitle: "Short Circuit in Living Room", issue: "Technician arrived late and charged extra.", status: "Pending" }
  ]);
  const [errorMsg, setErrorMsg] = useState('');

  const totalRequestsCount = activeJobs.length + completedServices.length;

  const handleCategoryChange = (cat) => {
    const defaultFloor = categoryFloors[cat] || 0;
    setJobForm({
      ...jobForm,
      category: cat,
      budget: defaultFloor,
    });
    setErrorMsg('');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrorMsg('Please select a valid image file.');
        return;
      }
      setJobForm({ ...jobForm, photo: file });
      setPhotoPreview(URL.createObjectURL(file));
      setErrorMsg('');
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        setErrorMsg('Please select a valid video file.');
        return;
      }

      const tempVideo = document.createElement('video');
      tempVideo.preload = 'metadata';
      tempVideo.src = URL.createObjectURL(file);

      tempVideo.onloadedmetadata = () => {
        window.URL.revokeObjectURL(tempVideo.src);
        if (tempVideo.duration > 10.5) {
          setErrorMsg('Video duration must be 10 seconds or less.');
          setJobForm({ ...jobForm, video: null });
          setVideoPreview(null);
        } else {
          setJobForm({ ...jobForm, video: file });
          setVideoPreview(URL.createObjectURL(file));
          setErrorMsg('');
        }
      };
    }
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    const minFloor = categoryFloors[jobForm.category] || 0;

    if (Number(jobForm.budget) < minFloor) {
      setErrorMsg(`Budget cannot be lower than the NRS ${minFloor} floor for ${jobForm.category}.`);
      return;
    }

    if (!jobForm.title) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    const newJob = {
      id: `JOB-${Date.now().toString().slice(-3)}`,
      category: jobForm.category,
      title: jobForm.title,
      budget: Number(jobForm.budget),
      status: "Open",
      hasMedia: Boolean(jobForm.photo || jobForm.video),
      assignedWorkerId: null,
      bids: []
    };

    setActiveJobs([newJob, ...activeJobs]);
    setJobForm({
      category: 'Plumbing',
      title: '',
      description: '',
      budget: categoryFloors['Plumbing'],
      alternatePhone: '',
      photo: null,
      video: null,
    });
    setShowAlternatePhone(false);
    setPhotoPreview(null);
    setVideoPreview(null);
    setErrorMsg('');
    alert('Job request posted successfully.');
    setActiveTab('myJobs');
  };

  const handleDeleteJob = (jobId) => {
    const job = activeJobs.find(j => j.id === jobId);
    if (job && job.status === "Assigned") {
      alert("Assigned jobs cannot be deleted.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete job request ${jobId}?`)) {
      setActiveJobs(activeJobs.filter(j => j.id !== jobId));
      if (selectedJobForBids && selectedJobForBids.id === jobId) {
        setSelectedJobForBids(null);
      }
    }
  };

  const handleAcceptBid = (jobId, acceptedBid) => {
    if (window.confirm(`Accept bid from ${acceptedBid.workerName} for NRS ${acceptedBid.bidAmount}?`)) {
      const updatedJobs = activeJobs.map(job => {
        if (job.id === jobId) {
          const updatedBids = job.bids.map(b => {
            if (b.id === acceptedBid.id) {
              return { ...b, status: "Accepted" };
            }
            return { ...b, status: "Rejected" };
          });
          return {
            ...job,
            status: "Assigned",
            workerName: acceptedBid.workerName,
            assignedWorkerId: acceptedBid.id,
            bids: updatedBids,
          };
        }
        return job;
      });

      setActiveJobs(updatedJobs);
      const newlyUpdatedJob = updatedJobs.find(j => j.id === jobId);
      if (selectedJobForBids && selectedJobForBids.id === jobId) {
        setSelectedJobForBids(newlyUpdatedJob);
      }

      // Initialize system chat thread for accepted worker
      if (!chatMessages[jobId]) {
        setChatMessages(prev => ({
          ...prev,
          [jobId]: [
            {
              id: Date.now(),
              sender: acceptedBid.workerName,
              role: "worker",
              text: `Hello ${clientProfile.name}, thanks for accepting my bid! I will contact you shortly regarding the details.`,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]
        }));
      }

      setActiveChatJobId(jobId);
      alert(`Bid accepted! Technician ${acceptedBid.workerName} assigned. You can now chat with them directly.`);
    }
  };

  const handleRejectBid = (jobId, bidId) => {
    const updatedJobs = activeJobs.map(job => {
      if (job.id === jobId) {
        const updatedBids = job.bids.map(b => b.id === bidId ? { ...b, status: "Rejected" } : b);
        return { ...job, bids: updatedBids };
      }
      return job;
    });
    setActiveJobs(updatedJobs);
    const newlyUpdatedJob = updatedJobs.find(j => j.id === jobId);
    if (selectedJobForBids && selectedJobForBids.id === jobId) {
      setSelectedJobForBids(newlyUpdatedJob);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessageText.trim() || !activeChatJobId) return;

    const newMsg = {
      id: Date.now(),
      sender: clientProfile.name,
      role: "client",
      text: newMessageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => ({
      ...prev,
      [activeChatJobId]: [...(prev[activeChatJobId] || []), newMsg]
    }));

    setNewMessageText("");
  };

  const handleOpenChat = (jobId) => {
    setActiveChatJobId(jobId);
    setActiveTab('messages');
  };

  const handleFileComplaint = (e) => {
    e.preventDefault();
    if (!selectedJobForComplaint || !complaintForm.issue) {
      alert('Please search and select a job, and describe the issue.');
      return;
    }

    const newCmp = {
      id: `CMP-${Date.now().toString().slice(-3)}`,
      jobId: selectedJobForComplaint.id,
      jobTitle: selectedJobForComplaint.title,
      issue: complaintForm.issue,
      status: "Pending",
    };

    setComplaints([newCmp, ...complaints]);
    setSelectedJobForComplaint(null);
    setComplaintJobSearch('');
    setComplaintForm({ issue: '' });
    alert('Complaint submitted to admin support.');
  };

  const filteredJobsForComplaint = allJobsForSelection.filter(j =>
    j.id.toLowerCase().includes(complaintJobSearch.toLowerCase()) ||
    j.title.toLowerCase().includes(complaintJobSearch.toLowerCase()) ||
    j.category.toLowerCase().includes(complaintJobSearch.toLowerCase())
  );

  const selectedFloor = categoryFloors[jobForm.category] || 0;
  const activeChatJob = activeJobs.find(j => j.id === activeChatJobId);

  return (
    <div style={styles.pageLayout}>
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.sidebarHeader}>
            <h2 style={styles.sidebarTitle}>Client Portal</h2>
            <p style={styles.userBadge}>{clientProfile.name}</p>
          </div>
          <nav style={styles.navMenu}>
            <button
              style={activeTab === 'post' ? styles.navBtnActive : styles.navBtn}
              onClick={() => setActiveTab('post')}
            >
              Post a Request
            </button>
            <button
              style={activeTab === 'myJobs' ? styles.navBtnActive : styles.navBtn}
              onClick={() => setActiveTab('myJobs')}
            >
              My Requests ({activeJobs.length})
            </button>
            <button
              style={activeTab === 'messages' ? styles.navBtnActive : styles.navBtn}
              onClick={() => setActiveTab('messages')}
            >
              Messages {assignedJobs.length > 0 ? `(${assignedJobs.length})` : ''}
            </button>
            <button
              style={activeTab === 'profile' ? styles.navBtnActive : styles.navBtn}
              onClick={() => setActiveTab('profile')}
            >
              My Profile
            </button>
            <button
              style={activeTab === 'complaint' ? styles.navBtnActive : styles.navBtn}
              onClick={() => setActiveTab('complaint')}
            >
              File a Complaint
            </button>
          </nav>
        </div>

        <div style={styles.sidebarFooter}>
          <Link to="/" style={styles.backLink}>← Back to Home</Link>
        </div>
      </aside>

      <main style={styles.contentArea}>
        {activeTab === 'post' && (
          <section style={styles.section}>
            <h2>Post a Job Request</h2>
            <p style={styles.subtext}>Find reliable local technicians for your home repair or service needs.</p>

            {errorMsg && <div style={styles.alertError}>{errorMsg}</div>}

            <form onSubmit={handlePostJob} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Select Category</label>
                <select
                  value={jobForm.category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  style={styles.input}
                >
                  {Object.keys(categoryFloors).map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Job Title / Short Description</label>
                <input
                  type="text"
                  placeholder="e.g. Tap leak in main bathroom"
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Detailed Description</label>
                <textarea
                  rows="3"
                  placeholder="Provide details about the issue..."
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  style={styles.textarea}
                />
              </div>

              <div style={styles.mediaContainer}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Attach Photo of Issue</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={styles.fileInput}
                  />
                  {photoPreview && (
                    <div style={styles.previewBox}>
                      <img src={photoPreview} alt="Issue preview" style={styles.imagePreview} />
                    </div>
                  )}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Attach Short Video (Max 10s)</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    style={styles.fileInput}
                  />
                  {videoPreview && (
                    <div style={styles.previewBox}>
                      <video src={videoPreview} controls style={styles.videoPreview} />
                    </div>
                  )}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Offered Budget (NRS) - <small style={{ color: '#0066cc' }}>Minimum threshold: NRS {selectedFloor}</small>
                </label>
                <input
                  type="number"
                  value={jobForm.budget}
                  min={selectedFloor}
                  onChange={(e) => setJobForm({ ...jobForm, budget: e.target.value })}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Verified Contact Phone</label>
                <div style={styles.phoneLockRow}>
                  <input
                    type="text"
                    value={`${clientProfile.phone} (Verified)`}
                    disabled
                    style={styles.inputDisabled}
                  />
                  {!showAlternatePhone && (
                    <button
                      type="button"
                      onClick={() => setShowAlternatePhone(true)}
                      style={styles.btnSecondarySmall}
                    >
                      + Add Alternate Contact
                    </button>
                  )}
                </div>
              </div>

              {showAlternatePhone && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Alternate Phone Number</label>
                  <input
                    type="text"
                    placeholder="+977 98XXXXXXXX"
                    value={jobForm.alternatePhone}
                    onChange={(e) => setJobForm({ ...jobForm, alternatePhone: e.target.value })}
                    style={styles.input}
                  />
                </div>
              )}

              <button type="submit" style={styles.btnPrimary}>Submit Request</button>
            </form>
          </section>
        )}

        {activeTab === 'myJobs' && (
          <section style={styles.section}>
            <h2>My Active Requests</h2>
            <p style={styles.subtext}>Track received technician bids, manage offers, or chat with assigned workers.</p>

            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Job ID</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Budget</th>
                  <th style={styles.th}>Bids</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeJobs.map((job) => (
                  <tr key={job.id}>
                    <td style={styles.td}><strong>{job.id}</strong></td>
                    <td style={styles.td}>{job.category}</td>
                    <td style={styles.td}>{job.title}</td>
                    <td style={styles.td}>NRS {job.budget}</td>
                    <td style={styles.td}>
                      <button
                        onClick={() => setSelectedJobForBids(job)}
                        style={styles.btnCall}
                      >
                        View Bids ({job.bids ? job.bids.length : 0})
                      </button>
                    </td>
                    <td style={styles.td}>
                      <span style={job.status === 'Open' ? styles.badgeWarning : styles.badgeSuccess}>
                        {job.status} {job.workerName ? `(${job.workerName})` : ''}
                      </span>
                    </td>
                    <td style={styles.td}>
                      {job.status === 'Open' ? (
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          style={styles.btnDangerSmall}
                        >
                          Delete
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenChat(job.id)}
                          style={styles.btnChatSmall}
                        >
                          💬 Chat with Worker
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedJobForBids && (
              <div style={styles.bidsModalOverlay}>
                <div style={styles.bidsModal}>
                  <div style={styles.modalHeader}>
                    <h3>Bids for {selectedJobForBids.id}: {selectedJobForBids.title}</h3>
                    <button onClick={() => setSelectedJobForBids(null)} style={styles.btnClose}>Close</button>
                  </div>
                  {selectedJobForBids.bids && selectedJobForBids.bids.length > 0 ? (
                    <div style={styles.bidsList}>
                      {selectedJobForBids.bids.map((bid) => (
                        <div key={bid.id} style={styles.bidCard}>
                          <div>
                            <strong>{bid.workerName}</strong> (Rating: {bid.rating} / 5)
                            <div style={styles.bidAmount}>Offered Price: NRS {bid.bidAmount}</div>
                          </div>
                          <div>
                            {selectedJobForBids.status === "Assigned" ? (
                              bid.id === selectedJobForBids.assignedWorkerId || bid.status === "Accepted" ? (
                                <span style={styles.badgeSuccess}>Assigned (Accepted)</span>
                              ) : (
                                <span style={styles.badgeDanger}>Rejected</span>
                              )
                            ) : bid.status === "Rejected" ? (
                              <span style={styles.badgeDanger}>Rejected</span>
                            ) : (
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button onClick={() => handleAcceptBid(selectedJobForBids.id, bid)} style={styles.btnSuccess}>Accept</button>
                                <button onClick={() => handleRejectBid(selectedJobForBids.id, bid.id)} style={styles.btnDangerSmall}>Reject</button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#666', marginTop: '15px' }}>No bids received for this request yet.</p>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        {activeTab === 'messages' && (
          <section style={styles.section}>
            <h2>Messages & Work Coordination</h2>
            <p style={styles.subtext}>Chat with assigned technicians to discuss job schedules and requirements.</p>

            {assignedJobs.length > 0 ? (
              <div style={styles.chatContainer}>
                <div style={styles.chatSidebar}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#555' }}>Assigned Jobs</h4>
                  {assignedJobs.map(job => (
                    <div
                      key={job.id}
                      onClick={() => setActiveChatJobId(job.id)}
                      style={activeChatJobId === job.id ? styles.chatTabActive : styles.chatTab}
                    >
                      <strong>{job.workerName}</strong>
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>{job.title} ({job.id})</div>
                    </div>
                  ))}
                </div>

                <div style={styles.chatBox}>
                  {activeChatJob ? (
                    <>
                      <div style={styles.chatHeader}>
                        <strong>Technician: {activeChatJob.workerName}</strong>
                        <span style={{ fontSize: '12px', color: '#666' }}>Job: {activeChatJob.title}</span>
                      </div>

                      <div style={styles.chatMessagesList}>
                        {(chatMessages[activeChatJobId] || []).map(msg => (
                          <div
                            key={msg.id}
                            style={msg.role === 'client' ? styles.clientBubble : styles.workerBubble}
                          >
                            <div style={styles.msgSender}>{msg.sender}</div>
                            <div>{msg.text}</div>
                            <div style={styles.msgTime}>{msg.timestamp}</div>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleSendMessage} style={styles.chatInputRow}>
                        <input
                          type="text"
                          placeholder="Type your message here..."
                          value={newMessageText}
                          onChange={(e) => setNewMessageText(e.target.value)}
                          style={styles.chatInput}
                        />
                        <button type="submit" style={styles.btnPrimary}>Send</button>
                      </form>
                    </>
                  ) : (
                    <div style={{ padding: '20px', color: '#888' }}>Select a conversation from the left to start chatting.</div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ color: '#888', padding: '20px 0' }}>
                No assigned technicians yet. Once you accept a worker's bid, messaging will open here.
              </div>
            )}
          </section>
        )}

        {activeTab === 'profile' && (
          <section style={styles.section}>
            <h2>My Profile & Account Details</h2>
            <p style={styles.subtext}>Manage your personal information and view service history.</p>

            <div style={styles.profileCard}>
              <div style={styles.profileGrid}>
                <div><strong>Full Name:</strong> {clientProfile.name}</div>
                <div><strong>Email:</strong> {clientProfile.email}</div>
                <div><strong>Phone:</strong> {clientProfile.phone}</div>
                <div><strong>Location:</strong> {clientProfile.address}</div>
                <div><strong>Member Since:</strong> {clientProfile.memberSince}</div>
                <div><strong>Total Requests:</strong> {totalRequestsCount}</div>
              </div>
            </div>

            <h3 style={styles.subHeading}>Past Completed Services & Reviews ({completedServices.length})</h3>
            <div style={styles.historyContainer}>
              {completedServices.map((service) => (
                <div key={service.id} style={styles.historyCard}>
                  <div style={styles.historyHeader}>
                    <strong>{service.title} ({service.id})</strong>
                    <span style={styles.badgeSuccess}>Completed</span>
                  </div>
                  <div style={styles.historySub}>
                    <span>Category: {service.category}</span> | 
                    <span> Technician: {service.workerName}</span> | 
                    <span> Paid: NRS {service.paidAmount}</span> | 
                    <span> Date: {service.date}</span>
                  </div>
                  <div style={styles.reviewBox}>
                    <strong>Your Review ({service.review.rating} / 5 Stars):</strong>
                    <p style={{ margin: '4px 0 0 0', color: '#555' }}>"{service.review.comment}"</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'complaint' && (
          <section style={styles.section}>
            <h2>File a Service Complaint</h2>
            <p style={styles.subtext}>Search for a service request to report tardiness, quality issues, or extra fee demands.</p>

            <form onSubmit={handleFileComplaint} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Search and Select Job to Report</label>
                
                {selectedJobForComplaint ? (
                  <div style={styles.selectedJobBox}>
                    <div>
                      <strong>Selected:</strong> {selectedJobForComplaint.id} - {selectedJobForComplaint.title} ({selectedJobForComplaint.category})
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedJobForComplaint(null)}
                      style={styles.btnSecondarySmall}
                    >
                      Change Selection
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      placeholder="Type Job ID, title, or category to search..."
                      value={complaintJobSearch}
                      onChange={(e) => setComplaintJobSearch(e.target.value)}
                      style={styles.input}
                    />

                    {complaintJobSearch.trim() && (
                      <div style={styles.searchResultsBox}>
                        {filteredJobsForComplaint.length > 0 ? (
                          filteredJobsForComplaint.map((job) => (
                            <div
                              key={job.id}
                              onClick={() => {
                                setSelectedJobForComplaint(job);
                                setComplaintJobSearch('');
                              }}
                              style={styles.searchResultItem}
                            >
                              <strong>{job.id}</strong>: {job.title} <small>({job.category} - {job.status})</small>
                            </div>
                          ))
                        ) : (
                          <div style={{ padding: '8px', color: '#888' }}>No matching jobs found.</div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Describe Complaint</label>
                <textarea
                  rows="4"
                  placeholder="Explain what went wrong..."
                  value={complaintForm.issue}
                  onChange={(e) => setComplaintForm({ ...complaintForm, issue: e.target.value })}
                  style={styles.textarea}
                />
              </div>

              <button type="submit" style={styles.btnDanger}>Submit Complaint</button>
            </form>

            <div style={{ marginTop: '30px' }}>
              <h3>My Submitted Complaints ({complaints.length})</h3>
              {complaints.length > 0 ? (
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>Job ID</th>
                      <th style={styles.th}>Title</th>
                      <th style={styles.th}>Issue Description</th>
                      <th style={styles.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((c) => (
                      <tr key={c.id}>
                        <td style={styles.td}><strong>{c.id}</strong></td>
                        <td style={styles.td}>{c.jobId}</td>
                        <td style={styles.td}>{c.jobTitle}</td>
                        <td style={styles.td}>{c.issue}</td>
                        <td style={styles.td}>
                          <span style={styles.badgeWarning}>{c.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ color: '#888', marginTop: '10px' }}>No complaints filed yet.</p>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

const styles = {
  pageLayout: { display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' },
  sidebar: { width: '250px', backgroundColor: '#2c3e50', color: '#fff', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  sidebarHeader: { marginBottom: '20px' },
  sidebarFooter: { paddingTop: '20px', borderTop: '1px solid #34495e' },
  backLink: { color: '#1abc9c', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' },
  sidebarTitle: { fontSize: '22px', margin: '0', color: '#ecf0f1' },
  userBadge: { fontSize: '13px', color: '#1abc9c', margin: '4px 0 0 0', fontWeight: 'bold' },
  navMenu: { display: 'flex', flexDirection: 'column', gap: '10px' },
  navBtn: { padding: '12px 15px', backgroundColor: 'transparent', color: '#bdc3c7', border: 'none', textAlign: 'left', borderRadius: '6px', cursor: 'pointer', fontSize: '15px' },
  navBtnActive: { padding: '12px 15px', backgroundColor: '#34495e', color: '#fff', borderLeft: '4px solid #1abc9c', textAlign: 'left', borderRadius: '4px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' },
  contentArea: { flex: 1, padding: '30px', backgroundColor: '#f4f6f7' },
  section: { backgroundColor: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #e1e8ed', maxWidth: '850px' },
  subtext: { color: '#666', fontSize: '14px', marginTop: '4px', marginBottom: '20px' },
  subHeading: { marginTop: '25px', marginBottom: '15px', fontSize: '18px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 },
  mediaContainer: { display: 'flex', gap: '15px', flexWrap: 'wrap' },
  label: { fontWeight: 'bold', fontSize: '14px' },
  input: { padding: '8px 12px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' },
  inputDisabled: { padding: '8px 12px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ddd', backgroundColor: '#e9ecef', color: '#495057', flex: 1 },
  phoneLockRow: { display: 'flex', gap: '10px', alignItems: 'center' },
  fileInput: { padding: '6px', fontSize: '13px', border: '1px dashed #ccc', borderRadius: '4px', backgroundColor: '#fafafa' },
  previewBox: { marginTop: '8px' },
  imagePreview: { width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #ddd' },
  videoPreview: { width: '100%', maxHeight: '150px', borderRadius: '4px', backgroundColor: '#000' },
  textarea: { padding: '8px 12px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' },
  btnPrimary: { backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', alignSelf: 'flex-start' },
  btnDanger: { backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', alignSelf: 'flex-start' },
  btnDangerSmall: { backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  btnChatSmall: { backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  btnSuccess: { backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  btnSecondarySmall: { backgroundColor: '#6c757d', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  btnCall: { backgroundColor: '#17a2b8', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' },
  alertError: { backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '4px', marginBottom: '15px', border: '1px solid #f5c6cb' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px', backgroundColor: '#fff' },
  th: { borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' },
  td: { borderBottom: '1px solid #ddd', padding: '10px' },
  badgeSuccess: { backgroundColor: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  badgeWarning: { backgroundColor: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  badgeDanger: { backgroundColor: '#f8d7da', color: '#721c24', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  profileCard: { backgroundColor: '#fafafa', padding: '20px', borderRadius: '6px', border: '1px solid #e1e8ed', marginBottom: '20px' },
  profileGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '15px' },
  historyContainer: { display: 'flex', flexDirection: 'column', gap: '15px' },
  historyCard: { backgroundColor: '#fff', padding: '15px', borderRadius: '6px', border: '1px solid #e1e8ed' },
  historyHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' },
  historySub: { fontSize: '13px', color: '#666', marginBottom: '10px' },
  reviewBox: { backgroundColor: '#f9f9f9', padding: '10px', borderRadius: '4px', borderLeft: '3px solid #007bff' },
  selectedJobBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#e8f4fd', border: '1px solid #b6d4fe', borderRadius: '4px' },
  searchResultsBox: { border: '1px solid #ccc', borderRadius: '4px', maxHeight: '150px', overflowY: 'auto', marginTop: '4px', backgroundColor: '#fff' },
  searchResultItem: { padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #eee' },
  bidsModalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  bidsModal: { backgroundColor: '#fff', padding: '25px', borderRadius: '8px', width: '90%', maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' },
  btnClose: { backgroundColor: '#6c757d', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' },
  bidsList: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' },
  bidCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#f8f9fa', border: '1px solid #e9ecef', borderRadius: '6px' },
  bidAmount: { color: '#28a745', fontWeight: 'bold', fontSize: '14px', marginTop: '2px' },
  chatContainer: { display: 'flex', border: '1px solid #e1e8ed', borderRadius: '8px', minHeight: '400px', backgroundColor: '#fff' },
  chatSidebar: { width: '220px', borderRight: '1px solid #eee', padding: '12px', backgroundColor: '#fafafa' },
  chatTab: { padding: '10px', borderRadius: '6px', cursor: 'pointer', marginBottom: '6px', backgroundColor: '#fff', border: '1px solid #eee' },
  chatTabActive: { padding: '10px', borderRadius: '6px', cursor: 'pointer', marginBottom: '6px', backgroundColor: '#e8f4fd', border: '1px solid #b6d4fe' },
  chatBox: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  chatHeader: { padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fafafa' },
  chatMessagesList: { flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' },
  clientBubble: { alignSelf: 'flex-end', backgroundColor: '#007bff', color: '#fff', padding: '10px 14px', borderRadius: '12px 12px 0 12px', maxWidth: '70%', fontSize: '14px' },
  workerBubble: { alignSelf: 'flex-start', backgroundColor: '#e9ecef', color: '#333', padding: '10px 14px', borderRadius: '12px 12px 12px 0', maxWidth: '70%', fontSize: '14px' },
  msgSender: { fontSize: '11px', opacity: 0.8, marginBottom: '2px', fontWeight: 'bold' },
  msgTime: { fontSize: '10px', opacity: 0.7, marginTop: '4px', textAlign: 'right' },
  chatInputRow: { display: 'flex', gap: '10px', padding: '12px', borderTop: '1px solid #eee', backgroundColor: '#fff' },
  chatInput: { flex: 1, padding: '8px 12px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '4px' }
};