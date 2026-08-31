import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function WorkerView() {
  const [activeTab, setActiveTab] = useState('availableJobs'); 
  const [selectedChatJobId, setSelectedChatJobId] = useState('JOB-065');
  const [inspectingJob, setInspectingJob] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Credit Shop States
  const [customCreditsInput, setCustomCreditsInput] = useState(25);
  const [transactionRef, setTransactionRef] = useState('');
  const creditPricePerUnit = 20;

  // Category Price Floors
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

  const [workerProfile, setWorkerProfile] = useState({
    id: 101,
    name: "Ramesh Sharma",
    category: "Plumbing",
    phone: "+977 9801234567",
    rating: 4.8,
    completedCount: 24,
    credits: 18,
    certifications: [
      { name: "Master Plumber Certification", issuer: "CTEVT Nepal", year: "2021" },
      { name: "Advanced Pipefitting & Safety", issuer: "Nepal Training Institute", year: "2023" }
    ],
    reviews: [
      { id: "REV-1", clientName: "Bishal Thapa", rating: 5, date: "2026-01-15", comment: "Quick response and fixed the pipe leak permanently." }
    ]
  });

  const [availableJobs] = useState([
    {
      id: "JOB-101",
      category: "Plumbing",
      title: "Leaking Kitchen Sink & Tap Drain",
      description: "Water leaking under the main sink pipe joint. Urgent fix needed.",
      budget: 450,
      clientName: "Aarav Sharma",
      location: "Kathmandu, Ward 3",
      postedDate: "2026-08-30",
      hasPhoto: true,
      hasVideo: true,
      photoUrl: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: "JOB-103",
      category: "Plumbing",
      title: "Bathroom Tap Replacement",
      description: "Need to replace an old brass tap with a modern single lever mixer tap.",
      budget: 500,
      clientName: "Suman Shrestha",
      location: "Lalitpur, Ward 5",
      postedDate: "2026-08-31",
      hasPhoto: true,
      hasVideo: true,
      photoUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
  ]);

  const [myBids, setMyBids] = useState([
    {
      id: "BID-1",
      jobId: "JOB-101",
      jobTitle: "Leaking Kitchen Sink & Tap Drain",
      category: "Plumbing",
      offeredAmount: 450,
      status: "Pending",
      submittedDate: "2026-08-30"
    },
    {
      id: "BID-98",
      jobId: "JOB-054",
      jobTitle: "Water Tank Leak Fixing",
      category: "Plumbing",
      offeredAmount: 1100,
      status: "Accepted",
      submittedDate: "2026-08-27",
      clientName: "Sunil Gurung",
      location: "Lalitpur, Ward 2"
    },
    {
      id: "BID-99",
      jobId: "JOB-065",
      jobTitle: "Bathroom Pipe Leak Repair",
      category: "Plumbing",
      offeredAmount: 500,
      status: "Accepted",
      submittedDate: "2026-08-28",
      clientName: "Rita Rai",
      location: "Kathmandu, Ward 10"
    }
  ]);

  const [creditTransactions, setCreditTransactions] = useState([
    { id: "TXN-9041", date: "2026-08-10", credits: 20, amount: 400, status: "Approved", ref: "EP-8849201" },
    { id: "TXN-8210", date: "2026-07-02", credits: 50, amount: 1000, status: "Approved", ref: "FP-1049283" }
  ]);

  const [chatThreads, setChatThreads] = useState([
    {
      jobId: "JOB-065",
      jobTitle: "Bathroom Pipe Leak Repair",
      clientName: "Rita Rai",
      messages: [
        { sender: "client", text: "Hello Ramesh, when can you visit for the repair?", time: "10:30 AM" },
        { sender: "worker", text: "Namaste! I can come today around 2:00 PM.", time: "10:32 AM" },
        { sender: "client", text: "Sounds good, please bring the necessary seal tape.", time: "10:35 AM" }
      ]
    },
    {
      jobId: "JOB-054",
      jobTitle: "Water Tank Leak Fixing",
      clientName: "Sunil Gurung",
      messages: [
        { sender: "client", text: "Hi, will you bring your own tools or do I need to prepare anything?", time: "08:15 AM" },
        { sender: "worker", text: "Good morning! I carry a complete plumbing kit.", time: "08:20 AM" }
      ]
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [bidInputs, setBidInputs] = useState({});

  const acceptedBids = myBids.filter(b => b.status === 'Accepted');
  
  // Keep active chat threads strictly synchronized with accepted jobs
  const activeChatThreads = chatThreads.filter(thread => 
    acceptedBids.some(acceptedJob => acceptedJob.jobId === thread.jobId)
  );

  const activeThread = activeChatThreads.find(thread => thread.jobId === selectedChatJobId);

  const containsContactInfo = (text) => {
    const phoneRegex = /(?:\+?977[- \s]?)?9[78]\d{8}|\b\d{10}\b/;
    return phoneRegex.test(text);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChatJobId) return;

    if (containsContactInfo(newMessage)) {
      alert("Anti-Bypass Alert: Contact numbers are restricted in chat messages.");
      return;
    }

    setChatThreads(chatThreads.map(thread => {
      if (thread.jobId === selectedChatJobId) {
        return {
          ...thread,
          messages: [
            ...thread.messages,
            { sender: "worker", text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
          ]
        };
      }
      return thread;
    }));
    setNewMessage("");
  };

  const handleBidInputChange = (jobId, amount) => {
    setBidInputs({ ...bidInputs, [jobId]: amount });
  };

  const handleSubmitBid = (job) => {
    const amount = Number(bidInputs[job.id] || job.budget);
    const minFloor = categoryFloors[job.category] || 0;

    if (workerProfile.credits <= 0) {
      alert("Insufficient Credits! Please purchase credits from the 'Buy Credits' section.");
      return;
    }

    if (amount < minFloor) {
      alert(`Bid Rejected: Offered price cannot be lower than the floor limit (NRS ${minFloor}) for ${job.category}.`);
      return;
    }

    if (myBids.some(b => b.jobId === job.id)) {
      alert("You have already submitted a bid for this job.");
      return;
    }

    const newBid = {
      id: `BID-${Date.now().toString().slice(-3)}`,
      jobId: job.id,
      jobTitle: job.title,
      category: job.category,
      offeredAmount: amount,
      status: "Pending",
      submittedDate: new Date().toISOString().split('T')[0]
    };

    setMyBids([newBid, ...myBids]);
    setWorkerProfile(prev => ({ ...prev, credits: prev.credits - 1 }));
    alert(`Bid of NRS ${amount} submitted successfully! 1 credit deducted.`);
  };

  const handlePurchaseCredits = (e) => {
    e.preventDefault();
    if (!transactionRef.trim()) {
      alert("Please enter your payment Transaction Reference / ID.");
      return;
    }

    const addedCredits = Number(customCreditsInput);
    const payableAmount = addedCredits * creditPricePerUnit;
    const newTxn = {
      id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      credits: addedCredits,
      amount: payableAmount,
      status: "Approved",
      ref: transactionRef
    };

    setCreditTransactions([newTxn, ...creditTransactions]);
    setWorkerProfile(prev => ({
      ...prev,
      credits: prev.credits + addedCredits
    }));
    setTransactionRef('');
    alert(`Success! Payment reference TXN #${transactionRef} processed. ${addedCredits} credits added to your account.`);
  };

  const filteredAvailableJobs = availableJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={styles.pageLayout}>
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.sidebarHeader}>
            <h2 style={styles.sidebarTitle}>Technician Portal</h2>
            <div style={styles.operationsLabel}>Sewa Professional Suite</div>
            
            <div style={styles.profileBadgeCard}>
              <div style={styles.profileAvatar}>{workerProfile.name.charAt(0)}</div>
              <div>
                <div style={styles.profileName}>{workerProfile.name}</div>
                <div style={styles.profileTrade}>{workerProfile.category} Specialist</div>
              </div>
            </div>
          </div>

          <nav style={styles.navMenu}>
            <button
              style={activeTab === 'availableJobs' ? styles.navBtnActive : styles.navBtn}
              onClick={() => setActiveTab('availableJobs')}
            >
              <span style={styles.navIcon}>⊞</span> Browse Jobs ({availableJobs.length})
            </button>
            <button
              style={activeTab === 'myBids' ? styles.navBtnActive : styles.navBtn}
              onClick={() => setActiveTab('myBids')}
            >
              <span style={styles.navIcon}>🏷</span> My Bids ({myBids.length})
            </button>
            <button
              style={activeTab === 'acceptedJobs' ? styles.navBtnActive : styles.navBtn}
              onClick={() => setActiveTab('acceptedJobs')}
            >
              <span style={styles.navIcon}>⚡</span> Active Jobs {acceptedBids.length > 0 && <span style={styles.badgeNavInfo}>{acceptedBids.length}</span>}
            </button>
            <button
              style={activeTab === 'buyCredits' ? styles.navBtnActive : styles.navBtn}
              onClick={() => setActiveTab('buyCredits')}
            >
              <span style={styles.navIcon}>💳</span> Buy Bidding Credits
            </button>
            <button
              style={activeTab === 'messages' ? styles.navBtnActive : styles.navBtn}
              onClick={() => setActiveTab('messages')}
            >
              <span style={styles.navIcon}>💬</span> Client Messages ({activeChatThreads.length})
            </button>
            <button
              style={activeTab === 'profile' ? styles.navBtnActive : styles.navBtn}
              onClick={() => setActiveTab('profile')}
            >
              <span style={styles.navIcon}>👤</span> Profile & Credentials
            </button>
          </nav>
        </div>

        <div style={styles.sidebarFooter}>
          <div style={styles.creditCounterBox}>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>Available Credits:</span>
            <span style={styles.creditValue}>{workerProfile.credits} Left</span>
          </div>
          <Link to="/" style={styles.backLink}>← Exit Technician View</Link>
        </div>
      </aside>

      <main style={styles.contentArea}>
        <div style={styles.kpiRow}>
          <div style={{ ...styles.kpiCard, borderLeftColor: '#0f172a' }}>
            <div style={styles.kpiTitle}>TOTAL COMPLETED</div>
            <div style={styles.kpiValue}>{workerProfile.completedCount} Jobs</div>
          </div>
          <div style={{ ...styles.kpiCard, borderLeftColor: '#334155' }}>
            <div style={styles.kpiTitle}>RATING OVERALL</div>
            <div style={styles.kpiValue}>{workerProfile.rating} / 5.0</div>
          </div>
          <div style={{ ...styles.kpiCard, borderLeftColor: '#475569' }}>
            <div style={styles.kpiTitle}>PENDING BIDS</div>
            <div style={styles.kpiValue}>{myBids.filter(b => b.status === 'Pending').length} Proposals</div>
          </div>
          <div style={{ ...styles.kpiCard, borderLeftColor: '#2563eb' }}>
            <div style={styles.kpiTitle}>CREDIT BALANCE</div>
            <div style={styles.kpiValue}>{workerProfile.credits} Credits</div>
          </div>
        </div>

        {activeTab === 'availableJobs' && (
          <section style={styles.section}>
            <div style={styles.topBarFlex}>
              <div>
                <h2 style={styles.sectionTitle}>Available Requests: {workerProfile.category}</h2>
                <p style={styles.subtext}>Inspect client requirement media and submit proposal quotes.</p>
              </div>
              <div style={styles.searchWrapper}>
                <input
                  type="text"
                  placeholder="Filter by title or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={styles.searchInput}
                />
              </div>
            </div>

            <div style={styles.jobCardsContainer}>
              {filteredAvailableJobs.map((job) => {
                const existingBid = myBids.find(b => b.jobId === job.id);
                const categoryFloor = categoryFloors[job.category] || 0;

                return (
                  <div key={job.id} style={styles.jobCard}>
                    <div style={styles.jobHeader}>
                      <div>
                        <strong style={{ fontSize: '15px', color: '#0f172a' }}>{job.title}</strong>
                        <span style={styles.jobIdBadge}>{job.id}</span>
                      </div>
                      <div style={styles.budgetBadge}>
                        Client Budget: <strong>NRS {job.budget}</strong>
                      </div>
                    </div>

                    <p style={styles.jobDesc}>{job.description}</p>

                    <div style={styles.jobMetaRow}>
                      <span>📍 {job.location}</span>
                      <span>👤 {job.clientName}</span>
                      <span>🗓 Posted: {job.postedDate}</span>
                      <span>🛡 Floor Limit: NRS {categoryFloor}</span>
                    </div>

                    <div style={styles.mediaPreviewStrip}>
                      <span style={styles.mediaTag}>📷 Photo Attached</span>
                      {job.hasVideo && <span style={styles.mediaTag}>🎥 Video Attached</span>}
                      <button 
                        onClick={() => setInspectingJob(job)} 
                        style={styles.btnSecondarySmall}
                      >
                        Inspect Media & Details
                      </button>
                    </div>

                    <div style={styles.bidActionBox}>
                      {existingBid ? (
                        <div style={styles.alreadyBidBox}>
                          Already Bidded: <strong>NRS {existingBid.offeredAmount}</strong> 
                          <span style={
                            existingBid.status === 'Accepted' ? styles.badgeSuccess :
                            existingBid.status === 'Rejected' ? styles.badgeDanger : styles.badgeWarning
                          }>
                            {existingBid.status}
                          </span>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                          <div style={styles.inputGroup}>
                            <span style={styles.currencyText}>NRS</span>
                            <input
                              type="number"
                              min={categoryFloor}
                              placeholder={`Min ${categoryFloor}`}
                              value={bidInputs[job.id] || job.budget}
                              onChange={(e) => handleBidInputChange(job.id, e.target.value)}
                              style={styles.bidInput}
                            />
                          </div>
                          <button
                            onClick={() => handleSubmitBid(job)}
                            style={styles.btnPrimary}
                          >
                            Submit Bid (1 Credit)
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

        {activeTab === 'buyCredits' && (
          <section style={styles.section}>
            <div style={styles.sectionPadding}>
              <div style={{ marginBottom: '20px' }}>
                <h2 style={styles.sectionTitle}>Purchase Bidding Credits</h2>
                <p style={styles.subtext}>Acquire bidding credits to apply for incoming service requests. Rates are standard NRS 20 / Credit.</p>
              </div>

              <div style={styles.creditShopGrid}>
                <div>
                  <h3 style={styles.subHeading}>1. Select Credit Tier</h3>
                  <div style={styles.tierContainer}>
                    {[10, 25, 50].map((tier) => (
                      <div
                        key={tier}
                        onClick={() => setCustomCreditsInput(tier)}
                        style={customCreditsInput === tier ? styles.tierCardActive : styles.tierCard}
                      >
                        <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>{tier} Credits</div>
                        <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>NRS {tier * creditPricePerUnit}</div>
                        <div style={styles.tierRateText}>NRS {creditPricePerUnit} / bid</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '20px' }}>
                    <label style={styles.formLabel}>Or enter custom credit count:</label>
                    <input
                      type="number"
                      min="1"
                      max="500"
                      value={customCreditsInput}
                      onChange={(e) => {
                        const val = Math.max(1, parseInt(e.target.value) || 1);
                        setCustomCreditsInput(val);
                      }}
                      style={styles.formInput}
                    />
                  </div>

                  <div style={styles.summaryBox}>
                    <div style={styles.summaryRow}>
                      <span>Selected Credits:</span>
                      <strong>{customCreditsInput} Bids</strong>
                    </div>
                    <div style={styles.summaryRow}>
                      <span>Rate per Credit:</span>
                      <span>NRS {creditPricePerUnit}</span>
                    </div>
                    <div style={{ ...styles.summaryRow, borderTop: '1px solid #cbd5e1', paddingTop: '8px', marginTop: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>Total Amount Payable:</span>
                      <span style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>NRS {customCreditsInput * creditPricePerUnit}</span>
                    </div>
                  </div>
                </div>

                <div style={styles.qrPanel}>
                  <h3 style={styles.subHeading}>2. Scan QR to Pay</h3>
                  <p style={{ fontSize: '12px', color: '#64748b', marginTop: '-6px', marginBottom: '16px' }}>Scan using eSewa, Mobile Banking, or Fonepay to pay exactly <strong>NRS {customCreditsInput * creditPricePerUnit}</strong>.</p>
                  
                  <div style={styles.qrContainer}>
                    <div style={styles.qrHeaderTag}>Fonepay / eSewa Merchant QR</div>
                    <svg width="150" height="150" viewBox="0 0 100 100" style={{ background: '#fff', padding: '6px' }}>
                      <path d="M0 0h30v30H0zM70 0h30v30H70zM0 70h30v30H0z" fill="#0f172a"/>
                      <path d="M5 5h20v20H5zM75 5h20v20H75zM5 75h20v20H5z" fill="#fff"/>
                      <path d="M10 10h10v10H10zM80 10h10v10H80zM10 80h10v10H10z" fill="#0f172a"/>
                      <path d="M35 5h10v15H35zM50 5h15v10H50zM35 25h25v10H35zM5 35h15v15H5zM25 40h10v25H25zM40 45h20v10H40zM70 35h25v15H70zM80 55h15v20H80zM40 65h15v30H40zM60 75h30v10H60zM75 90h20v10H75z" fill="#0f172a"/>
                    </svg>

                    <div style={styles.qrPayAmountBadge}>
                      PAYMENT AMOUNT: NRS {customCreditsInput * creditPricePerUnit}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '6px' }}>Merchant ID: SEWA-PROF-8092</div>
                  </div>

                  <form onSubmit={handlePurchaseCredits} style={{ marginTop: '20px' }}>
                    <label style={styles.formLabel}>3. Enter Payment Reference / TXN ID:</label>
                    <input
                      type="text"
                      placeholder="e.g. EP-90412849 or Ref No."
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      style={styles.formInput}
                      required
                    />
                    <button type="submit" style={{ ...styles.btnPrimary, width: '100%', marginTop: '12px' }}>
                      Submit & Redeem Credits
                    </button>
                  </form>
                </div>
              </div>

              <div style={styles.subSection}>
                <h3 style={styles.subHeading}>Credit Purchase Audit Trail</h3>
                <div style={styles.tableWrapper}>
                  <table style={styles.table}>
                    <thead>
                      <tr>
                        <th style={styles.th}>Txn ID</th>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Credits Purchased</th>
                        <th style={styles.th}>Total Paid</th>
                        <th style={styles.th}>Reference No.</th>
                        <th style={styles.th}>Verification Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {creditTransactions.map(txn => (
                        <tr key={txn.id}>
                          <td style={styles.td}><strong>{txn.id}</strong></td>
                          <td style={styles.td}>{txn.date}</td>
                          <td style={styles.td}>{txn.credits} Credits</td>
                          <td style={styles.td}>NRS {txn.amount}</td>
                          <td style={styles.td}><code>{txn.ref}</code></td>
                          <td style={styles.td}>
                            <span style={txn.status === 'Approved' ? styles.badgeSuccess : styles.badgeWarning}>
                              {txn.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'myBids' && (
          <section style={styles.section}>
            <div style={styles.sectionPadding}>
              <h2 style={styles.sectionTitle}>My Submitted Proposals</h2>
              <p style={styles.subtext}>Monitor active bids. Pending proposals can be cancelled prior to client acceptance.</p>

              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Bid ID</th>
                      <th style={styles.th}>Job ID</th>
                      <th style={styles.th}>Job Title</th>
                      <th style={styles.th}>Offered Price</th>
                      <th style={styles.th}>Date</th>
                      <th style={styles.th}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myBids.map((bid) => (
                      <tr key={bid.id}>
                        <td style={styles.td}><strong>{bid.id}</strong></td>
                        <td style={styles.td}>{bid.jobId}</td>
                        <td style={styles.td}>{bid.jobTitle}</td>
                        <td style={styles.td}><strong>NRS {bid.offeredAmount}</strong></td>
                        <td style={styles.td}>{bid.submittedDate}</td>
                        <td style={styles.td}>
                          <span style={
                            bid.status === 'Accepted' ? styles.badgeSuccess :
                            bid.status === 'Rejected' ? styles.badgeDanger : styles.badgeWarning
                          }>
                            {bid.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'acceptedJobs' && (
          <section style={styles.section}>
            <div style={styles.sectionPadding}>
              <h2 style={styles.sectionTitle}>Active Assigned Work</h2>
              <p style={styles.subtext}>Jobs accepted by clients. Coordinate logistics using client messaging.</p>
              <br />

              {acceptedBids.length === 0 ? (
                <div style={{ color: '#64748b', padding: '20px 0' }}>No active assignments currently in progress.</div>
              ) : (
                acceptedBids.map(job => (
                  <div key={job.jobId} style={styles.acceptedJobCard}>
                    <div style={styles.acceptedHeader}>
                      <div>
                        <h3 style={{ margin: '0 0 6px', color: '#0f172a' }}>{job.jobTitle} <span style={styles.badgeSuccess}>Assigned</span></h3>
                        <p style={{ margin: '4px 0', fontSize: '13px', color: '#475569' }}><strong>Client:</strong> {job.clientName} | <strong>Location:</strong> {job.location}</p>
                        <p style={{ margin: '4px 0', fontSize: '13px', color: '#475569' }}><strong>Agreed Rate:</strong> NRS {job.offeredAmount}</p>
                      </div>
                      <button 
                        style={styles.btnPrimary}
                        onClick={() => { setActiveTab('messages'); setSelectedChatJobId(job.jobId); }}
                      >
                        💬 Open Client Chat
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {activeTab === 'messages' && (
          <section style={styles.section}>
            <div style={styles.sectionPadding}>
              <h2 style={styles.sectionTitle}>Client Messaging Channel</h2>
              <p style={styles.subtext}>Secure portal for client interaction regarding active tasks.</p>

              <div style={styles.messagingPortal}>
                <div style={styles.threadsList}>
                  <div style={styles.threadsHeader}>Active Channels</div>
                  {activeChatThreads.map(thread => (
                    <div
                      key={thread.jobId}
                      onClick={() => setSelectedChatJobId(thread.jobId)}
                      style={selectedChatJobId === thread.jobId ? styles.threadItemActive : styles.threadItem}
                    >
                      <div style={{ fontWeight: '600', fontSize: '13px', color: '#0f172a' }}>{thread.clientName}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{thread.jobTitle}</div>
                    </div>
                  ))}
                </div>

                <div style={styles.chatWindow}>
                  {activeThread ? (
                    <>
                      <div style={styles.chatWindowHeader}>
                        <strong style={{ color: '#0f172a' }}>{activeThread.clientName}</strong>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>{activeThread.jobTitle} ({activeThread.jobId})</div>
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
                          placeholder="Type message..."
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
                      Select a chat thread to view communication log.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'profile' && (
          <section style={styles.section}>
            <div style={styles.sectionPadding}>
              <h2 style={styles.sectionTitle}>Technician Profile & Records</h2>
              <p style={styles.subtext}>Verified technician records, license details, and performance evaluations.</p>

              <div style={styles.profileCard}>
                <div style={styles.profileGrid}>
                  <div><strong>Full Name:</strong> {workerProfile.name}</div>
                  <div><strong>Primary Trade:</strong> {workerProfile.category}</div>
                  <div><strong>Phone Number:</strong> {workerProfile.phone}</div>
                  <div><strong>Overall Rating:</strong> {workerProfile.rating} / 5.0</div>
                  <div><strong>Completed Jobs:</strong> {workerProfile.completedCount}</div>
                  <div><strong>Verification Status:</strong> <span style={styles.badgeSuccess}>Verified Specialist</span></div>
                </div>
              </div>

              <div style={styles.subSection}>
                <h3 style={styles.subHeading}>Verified Professional Credentials</h3>
                <div style={styles.certGrid}>
                  {workerProfile.certifications.map((cert, index) => (
                    <div key={index} style={styles.certCard}>
                      <div style={{ fontWeight: '600', color: '#0f172a' }}>{cert.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>Issuer: {cert.issuer} ({cert.year})</div>
                      <span style={styles.badgeVerified}>✓ Validated</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {inspectingJob && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>Media Verification: {inspectingJob.title}</h3>
              <button onClick={() => setInspectingJob(null)} style={styles.btnCloseModal}>✕</button>
            </div>
            <div style={{ marginTop: '16px' }}>
              <p style={{ fontSize: '13px', color: '#475569' }}><strong>Description:</strong> {inspectingJob.description}</p>
              
              <div style={{ marginTop: '12px' }}>
                <strong style={{ fontSize: '12px', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
                  📷 Attached Photo Proof:
                </strong>
                {inspectingJob.hasPhoto && inspectingJob.photoUrl ? (
                  <img src={inspectingJob.photoUrl} alt="Inspection Attachment" style={styles.modalImagePreview} />
                ) : (
                  <div style={styles.mediaPlaceholder}>No Image Available</div>
                )}
              </div>

              <div style={{ marginTop: '12px' }}>
                <strong style={{ fontSize: '12px', color: '#0f172a', display: 'block', marginBottom: '4px' }}>
                  🎥 Attached Video Inspection:
                </strong>
                {inspectingJob.hasVideo && inspectingJob.videoUrl ? (
                  <video 
                    controls 
                    style={{ width: '100%', borderRadius: '6px', maxHeight: '180px', backgroundColor: '#000' }}
                  >
                    <source src={inspectingJob.videoUrl} type="video/mp4" />
                    Your browser does not support playing video media.
                  </video>
                ) : (
                  <div style={styles.mediaPlaceholder}>No Video Attached</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  pageLayout: { display: 'flex', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f8fafc' },
  sidebar: { width: '280px', height: '100vh', position: 'fixed', top: 0, left: 0, background: '#0f172a', color: '#fff', padding: '24px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '4px 0 24px rgba(0,0,0,0.06)', overflowY: 'auto', boxSizing: 'border-box', zIndex: 10 },
  sidebarHeader: { marginBottom: '16px', paddingLeft: '4px' },
  sidebarTitle: { fontSize: '20px', margin: '0', color: '#f8fafc', fontWeight: '700' },
  operationsLabel: { marginTop: '2px', color: '#94a3b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' },
  profileBadgeCard: { display: 'flex', alignItems: 'center', gap: '10px', marginTop: '16px', padding: '10px', backgroundColor: '#1e293b', borderRadius: '8px' },
  profileAvatar: { width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#334155', color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  profileName: { fontSize: '13px', fontWeight: '600', color: '#f8fafc' },
  profileTrade: { fontSize: '11px', color: '#94a3b8' },
  navMenu: { display: 'flex', flexDirection: 'column', gap: '4px' },
  navBtn: { padding: '11px 14px', backgroundColor: 'transparent', color: '#94a3b8', border: 'none', textAlign: 'left', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' },
  navBtnActive: { padding: '11px 14px', backgroundColor: '#1e293b', color: '#f8fafc', border: 'none', textAlign: 'left', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' },
  navIcon: { fontSize: '15px' },
  badgeNavInfo: { backgroundColor: '#3b82f6', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '2px 6px', borderRadius: '99px', marginLeft: 'auto' },
  sidebarFooter: { paddingTop: '16px', borderTop: '1px solid #1e293b' },
  creditCounterBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '8px 12px', borderRadius: '6px', marginBottom: '12px' },
  creditValue: { color: '#38bdf8', fontWeight: '700', fontSize: '13px' },
  backLink: { color: '#94a3b8', textDecoration: 'none', fontSize: '12px', fontWeight: '500', display: 'block', paddingLeft: '4px' },
  contentArea: { flex: 1, marginLeft: '280px', padding: '24px 28px', backgroundColor: '#f8fafc', minHeight: '100vh', boxSizing: 'border-box' },
  kpiRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' },
  kpiCard: { backgroundColor: '#ffffff', padding: '16px', borderRadius: '10px', borderLeft: '4px solid', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', borderTop: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' },
  kpiTitle: { fontSize: '11px', fontWeight: '700', color: '#64748b', letterSpacing: '0.05em' },
  kpiValue: { fontSize: '20px', color: '#0f172a', fontWeight: '700', marginTop: '4px' },
  section: { backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden' },
  sectionPadding: { padding: '24px' },
  topBarFlex: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 24px 16px', gap: '16px', flexWrap: 'wrap' },
  sectionTitle: { margin: '0 0 4px', fontSize: '18px', color: '#0f172a', fontWeight: '700' },
  subtext: { color: '#64748b', fontSize: '13px', marginTop: '2px', marginBottom: '0' },
  searchWrapper: { flex: 1, maxWidth: '300px' },
  searchInput: { width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' },
  jobCardsContainer: { display: 'flex', flexDirection: 'column', gap: '16px', padding: '0 24px 24px 24px' },
  jobCard: { padding: '18px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' },
  jobHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' },
  jobIdBadge: { fontSize: '11px', color: '#64748b', marginLeft: '8px', backgroundColor: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' },
  budgetBadge: { backgroundColor: '#f1f5f9', color: '#0f172a', padding: '4px 10px', borderRadius: '6px', fontSize: '12px' },
  jobDesc: { fontSize: '13px', color: '#334155', margin: '0 0 10px 0', lineHeight: '1.4' },
  jobMetaRow: { display: 'flex', gap: '14px', fontSize: '12px', color: '#64748b', marginBottom: '12px', flexWrap: 'wrap' },
  mediaPreviewStrip: { display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', backgroundColor: '#f8fafc', borderRadius: '6px', marginBottom: '12px', flexWrap: 'wrap' },
  mediaTag: { fontSize: '11px', fontWeight: '600', color: '#475569' },
  btnSecondarySmall: { marginLeft: 'auto', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', color: '#0f172a', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' },
  bidActionBox: { borderTop: '1px solid #f1f5f9', paddingTop: '12px' },
  alreadyBidBox: { display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: '#0f172a' },
  inputGroup: { display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px 8px' },
  currencyText: { fontWeight: '700', color: '#64748b', fontSize: '12px' },
  bidInput: { width: '90px', fontSize: '13px', border: 'none', background: 'transparent', color: '#0f172a', outline: 'none', fontWeight: '600' },
  btnPrimary: { backgroundColor: '#0f172a', color: '#fff', border: 'none', padding: '9px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' },
  creditShopGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '16px' },
  tierContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: '10px' },
  tierCard: { padding: '14px 10px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', backgroundColor: '#ffffff' },
  tierCardActive: { padding: '14px 10px', border: '2px solid #0f172a', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#f8fafc', textAlign: 'center' },
  tierRateText: { fontSize: '11px', color: '#94a3b8', marginTop: '4px' },
  formLabel: { fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '6px' },
  formInput: { width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none', boxSizing: 'border-box' },
  summaryBox: { marginTop: '16px', padding: '14px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#475569', marginBottom: '6px' },
  qrPanel: { backgroundColor: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' },
  qrContainer: { backgroundColor: '#ffffff', padding: '16px', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  qrHeaderTag: { fontSize: '11px', fontWeight: '700', color: '#64748b', marginBottom: '10px', textTransform: 'uppercase' },
  qrPayAmountBadge: { backgroundColor: '#0f172a', color: '#ffffff', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', marginTop: '10px', textAlign: 'center' },
  tableWrapper: { overflowX: 'auto', marginTop: '16px', width: '100%' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', minWidth: '600px' },
  th: { borderBottom: '2px solid #e2e8f0', padding: '10px 12px', textAlign: 'left', fontSize: '11px', textTransform: 'uppercase', color: '#64748b' },
  td: { borderBottom: '1px solid #e2e8f0', padding: '10px 12px', color: '#0f172a', fontSize: '13px' },
  badgeSuccess: { backgroundColor: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' },
  badgeWarning: { backgroundColor: '#fef3c7', color: '#b45309', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' },
  badgeDanger: { backgroundColor: '#fee2e2', color: '#991b1b', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '600' },
  badgeVerified: { backgroundColor: '#f1f5f9', color: '#0f172a', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: '600', display: 'inline-block', marginTop: '6px' },
  profileCard: { backgroundColor: '#f8fafc', padding: '18px', borderRadius: '8px', border: '1px solid #e2e8f0' },
  profileGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '13px', color: '#334155' },
  subSection: { marginTop: '24px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' },
  subHeading: { fontSize: '15px', color: '#0f172a', marginBottom: '12px', fontWeight: '700' },
  certGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' },
  certCard: { border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px', backgroundColor: '#ffffff' },
  acceptedJobCard: { border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '12px' },
  acceptedHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' },
  messagingPortal: { display: 'flex', border: '1px solid #e2e8f0', borderRadius: '8px', minHeight: '400px', backgroundColor: '#fff', overflow: 'hidden', marginTop: '16px', flexWrap: 'wrap' },
  threadsList: { width: '240px', minWidth: '200px', flexShrink: 0, borderRight: '1px solid #e2e8f0', backgroundColor: '#f8fafc' },
  threadsHeader: { padding: '12px', borderBottom: '1px solid #e2e8f0', fontWeight: '700', fontSize: '11px', textTransform: 'uppercase', color: '#64748b' },
  threadItem: { padding: '12px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer' },
  threadItemActive: { padding: '12px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', backgroundColor: '#ffffff', borderLeft: '3px solid #0f172a' },
  chatWindow: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: '280px' },
  chatWindowHeader: { padding: '12px 16px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff' },
  chatMessagesArea: { flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#f8fafc', minHeight: '200px' },
  msgWorker: { alignSelf: 'flex-end', backgroundColor: '#0f172a', color: '#fff', padding: '8px 12px', borderRadius: '8px 8px 0 8px', maxWidth: '70%', wordBreak: 'break-word' },
  msgClient: { alignSelf: 'flex-start', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', padding: '8px 12px', borderRadius: '8px 8px 8px 0', maxWidth: '70%', wordBreak: 'break-word' },
  msgText: { fontSize: '13px', lineHeight: '1.4' },
  msgTime: { fontSize: '10px', opacity: 0.7, textAlign: 'right', marginTop: '4px' },
  chatInputRow: { display: 'flex', gap: '10px', padding: '12px', borderTop: '1px solid #e2e8f0', backgroundColor: '#ffffff' },
  chatInput: { flex: 1, padding: '9px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px', outline: 'none' },
  emptyChatPlaceholder: { display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', color: '#94a3b8', fontSize: '13px', padding: '24px' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, padding: '16px' },
  modalContent: { backgroundColor: '#ffffff', borderRadius: '10px', padding: '20px', width: '100%', maxWidth: '450px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', boxSizing: 'border-box' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' },
  btnCloseModal: { background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#64748b' },
  modalImagePreview: { width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px', marginTop: '6px' },
  mediaPlaceholder: { padding: '10px', backgroundColor: '#f1f5f9', color: '#94a3b8', borderRadius: '6px', fontSize: '12px', marginTop: '6px' }
};