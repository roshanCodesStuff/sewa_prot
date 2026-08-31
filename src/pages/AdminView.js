import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminView() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [floorSearchQuery, setFloorSearchQuery] = useState('');
  const [paymentSearchQuery, setPaymentSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('All');

  // Expanded Category Price Floors (NRS)
  const [floors, setFloors] = useState({
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
    "CCTV Camera Installation": 1500,
    "Solar Water Heater Repair": 900,
    "Aluminum & Glass Fitting": 1100,
    "Tile & Marble Fitting": 850
  });

  const [draftFloors, setDraftFloors] = useState({ ...floors });

  // Expanded Worker Directory
  const [workers, setWorkers] = useState([
    { id: 101, name: "Ramesh Sharma", phone: "+9779801234567", trade: "Plumbing", status: "Approved", doc: "Citizenship_ID_101.jpg", credits: 18 },
    { id: 102, name: "Sita Thapa", phone: "+9779812345678", trade: "Electrical", status: "Pending", doc: "Citizenship_ID_102.jpg", credits: 0 },
    { id: 103, name: "Hari Poudel", phone: "+9779823456789", trade: "Masonry", status: "Pending", doc: "Trade_Cert_103.jpg", credits: 0 },
    { id: 104, name: "Bikram Shrestha", phone: "+9779841122334", trade: "AC Repair & Service", status: "Approved", doc: "License_104.pdf", credits: 25 },
    { id: 105, name: "Sunita Rai", phone: "+9779808877665", trade: "Salon at Home (Women)", status: "Approved", doc: "Cert_Beautician_105.jpg", credits: 12 },
    { id: 106, name: "Deepak Gurung", phone: "+9779860112233", trade: "Pest Control", status: "Pending", doc: "Citizenship_ID_106.jpg", credits: 0 },
    { id: 107, name: "Kiran Adhikari", phone: "+9779819988776", trade: "Carpentry", status: "Approved", doc: "Skill_Cert_107.pdf", credits: 5 },
    { id: 108, name: "Manish Joshi", phone: "+9779851098765", trade: "CCTV Camera Installation", status: "Pending", doc: "Voter_ID_108.jpg", credits: 0 }
  ]);

  // Expanded Payment Transaction Logs
  const [paymentLogs, setPaymentLogs] = useState([
    { id: "TXN_9921", workerId: 101, workerName: "Ramesh Sharma", amount: 500, credits: 10, gateway: "eSewa", status: "Auto-Approved", hasComplaint: false, date: "2026-08-30" },
    { id: "TXN_9922", workerId: 102, workerName: "Sita Thapa", amount: 200, credits: 4, gateway: "Khalti", status: "Payment Disputed", hasComplaint: true, note: "Worker states money deducted from bank but credits not credited.", date: "2026-08-31" },
    { id: "TXN_9923", workerId: 103, workerName: "Hari Poudel", amount: 1500, credits: 30, gateway: "ConnectIPS", status: "Auto-Approved", hasComplaint: false, date: "2026-08-31" },
    { id: "TXN_9924", workerId: 104, workerName: "Bikram Shrestha", amount: 1000, credits: 20, gateway: "eSewa", status: "Auto-Approved", hasComplaint: false, date: "2026-08-29" },
    { id: "TXN_9925", workerId: 105, workerName: "Sunita Rai", amount: 600, credits: 12, gateway: "Khalti", status: "Auto-Approved", hasComplaint: false, date: "2026-08-28" },
    { id: "TXN_9926", workerId: 107, workerName: "Kiran Adhikari", amount: 300, credits: 6, gateway: "ConnectIPS", status: "Payment Disputed", hasComplaint: true, note: "Gateway timeout during checkout.", date: "2026-08-31" },
    { id: "TXN_9927", workerId: 101, workerName: "Ramesh Sharma", amount: 400, credits: 8, gateway: "eSewa", status: "Auto-Approved", hasComplaint: false, date: "2026-08-27" }
  ]);

  // Expanded Security / Anti-Bypass Flagged Events
  const [disputes, setDisputes] = useState([
    { id: 1, targetName: "Sita Thapa", targetPhone: "+9779812345678", type: "Invalid Phone Number", detail: "Attempted to post direct contact '9801234567' in job proposal comment.", severity: "High", called: false },
    { id: 2, targetName: "Ram Shrestha", targetPhone: "+9779841122334", type: "Floor Bypass Attempt", detail: "Submitted NRS 200 budget for Electrical job (System Floor: NRS 800). Blocked by system engine.", severity: "Medium", called: true },
    { id: 3, targetName: "Anil Khadka", targetPhone: "+9779867001122", type: "External Link Sharing", detail: "Inserted WhatsApp chat URL into public job bid text.", severity: "High", called: false }
  ]);

  // Expanded Client Complaints Data
  const [clientComplaints, setClientComplaints] = useState([
    { id: "CMP-301", clientName: "Aarav Sharma", clientPhone: "+9779841987654", workerId: 101, workerName: "Ramesh Sharma", jobCategory: "Plumbing", issue: "Technician arrived 2 hours late and requested additional cash outside platform quote.", status: "Pending", phoneRevealed: false },
    { id: "CMP-302", clientName: "Binita Giri", clientPhone: "+9779801122334", workerId: 102, workerName: "Sita Thapa", jobCategory: "Electrical", issue: "Unfinished DB Box wiring work. Left site without restoring main breaker.", status: "Pending", phoneRevealed: false },
    { id: "CMP-303", clientName: "Prakash Maharjan", clientPhone: "+9779851223344", workerId: 104, workerName: "Bikram Shrestha", jobCategory: "AC Repair & Service", issue: "Cooling issue unresolved after service charge paid.", status: "Resolved", phoneRevealed: false }
  ]);

  // Financial Metric Calculations
  const totalGrossRevenue = paymentLogs.reduce((acc, curr) => curr.status !== "Rejected" ? acc + curr.amount : acc, 0);
  const totalCommission = Math.round(totalGrossRevenue * 0.10);
  const pendingPaymentsCount = paymentLogs.filter(p => p.hasComplaint).length;
  const pendingWorkersCount = workers.filter(w => w.status === 'Pending').length;
  const pendingComplaintsCount = clientComplaints.filter(c => c.status === 'Pending').length;

  const handleSaveFloor = (category) => {
    const newValue = draftFloors[category];
    if (window.confirm(`Update ${category} price floor from NRS ${floors[category]} to NRS ${newValue}?`)) {
      const updatedFloors = { ...floors, [category]: Number(newValue) };
      setFloors(updatedFloors);
      setDraftFloors(updatedFloors);
      alert(`${category} floor updated.`);
    } else {
      setDraftFloors({ ...draftFloors, [category]: floors[category] });
    }
  };

  const resolvePayment = (txnId, approve) => {
    const txn = paymentLogs.find(p => p.id === txnId);
    if (approve) {
      setWorkers(workers.map(w => w.id === txn.workerId ? { ...w, credits: w.credits + txn.credits } : w));
      setPaymentLogs(paymentLogs.map(p => p.id === txnId ? { ...p, status: "Resolved & Credited", hasComplaint: false } : p));
      alert(`Txn ${txnId} approved (+${txn.credits} credits to Worker #${txn.workerId}).`);
    } else {
      setPaymentLogs(paymentLogs.map(p => p.id === txnId ? { ...p, status: "Rejected", hasComplaint: false } : p));
      alert(`Txn ${txnId} rejected.`);
    }
  };

  const handleManualCreditAdjust = (workerId) => {
    const amountStr = prompt("Adjust bidding credits (positive to add, negative to deduct):", "5");
    if (amountStr !== null) {
      const amount = parseInt(amountStr, 10);
      if (!isNaN(amount)) {
        setWorkers(workers.map(w => w.id === workerId ? { ...w, credits: Math.max(0, w.credits + amount) } : w));
        alert(`Credits updated for Worker #${workerId}.`);
      }
    }
  };

  const toggleCallStatus = (id) => {
    setDisputes(disputes.map(d => d.id === id ? { ...d, called: !d.called } : d));
  };

  const handleResolveDispute = (id, action) => {
    if (action === "dismiss") {
      setDisputes(disputes.filter(d => d.id !== id));
    } else if (action === "suspend") {
      alert(`Account associated with Log #${id} suspended.`);
      setDisputes(disputes.filter(d => d.id !== id));
    }
  };

  const toggleComplaintPhone = (id) => {
    setClientComplaints(clientComplaints.map(cmp => 
      cmp.id === id ? { ...cmp, phoneRevealed: !cmp.phoneRevealed } : cmp
    ));
  };

  const handleResolveComplaint = (id, resolution) => {
    setClientComplaints(clientComplaints.map(cmp => 
      cmp.id === id ? { ...cmp, status: resolution } : cmp
    ));
    alert(`Complaint ${id} marked as ${resolution}.`);
  };

  const filteredCategories = Object.entries(draftFloors).filter(([category]) =>
    category.toLowerCase().includes(floorSearchQuery.toLowerCase())
  );

  const filteredPayments = paymentLogs.filter((p) => {
    const matchesQuery = p.id.toLowerCase().includes(paymentSearchQuery.toLowerCase()) || 
                         p.workerName.toLowerCase().includes(paymentSearchQuery.toLowerCase()) ||
                         String(p.workerId).includes(paymentSearchQuery);
    const matchesFilter = paymentFilter === 'All' ? true : 
                          paymentFilter === 'Disputed' ? p.hasComplaint : 
                          p.gateway === paymentFilter;
    return matchesQuery && matchesFilter;
  });

  const NavIcon = ({ type }) => {
    const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' };
    switch (type) {
      case 'dashboard':
        return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>;
      case 'floors':
        return <svg {...common}><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z" /><path d="M8 5v14" opacity="0.4" /><path d="M16 5v14" opacity="0.4" /><path d="M4 9h16" /></svg>;
      case 'payments':
        return <svg {...common}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>;
      case 'workers':
        return <svg {...common}><path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" /><circle cx="10" cy="7" r="3" /><path d="M20 19v-1a3 3 0 0 0-2.3-2.9" opacity="0.5" /><path d="M16 4.5a3 3 0 0 1 0 5.8" opacity="0.5" /></svg>;
      case 'disputes':
        return <svg {...common}><path d="M12 3 5 6v6c0 4.4 2.9 8.4 7 9 4.1-.6 7-4.6 7-9V6l-7-3Z" /><path d="M12 8v4" /><circle cx="12" cy="15.5" r="0.8" fill="currentColor" stroke="none" /></svg>;
      case 'complaints':
        return <svg {...common}><path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v6A2.5 2.5 0 0 1 16.5 16H10l-5 4v-4.5A2.5 2.5 0 0 1 5 13.5v-6Z" /></svg>;
      default:
        return null;
    }
  };

  const CategoryIcon = ({ category }) => {
    const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' };
    switch (category) {
      case 'Plumbing': return <svg {...common}><path d="M12 3c2.5 2.5 4 4.7 4 6.5A4 4 0 0 1 8 9.5C8 7.7 9.5 5.5 12 3Z" /><path d="M12 10v9" /></svg>;
      case 'Electrical': return <svg {...common}><path d="M13 2 7 13h4l-1 9 8-12h-4l2-8Z" /></svg>;
      default: return <svg {...common}><path d="M6 14V8.5A2.5 2.5 0 0 1 8.5 6h7A2.5 2.5 0 0 1 18 8.5V14" /><path d="M4 14h16v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3Z" /></svg>;
    }
  };

  return (
    <div style={styles.pageLayout}>
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.sidebarHeader}>  
            <h2 style={styles.sidebarTitle}>Sewa Admin</h2>
            <div style={styles.operationsLabel}>Operations Control Center</div>
          </div>
          <nav style={styles.navMenu}>
            <button style={activeTab === 'dashboard' ? styles.navBtnActive : styles.navBtn} onClick={() => setActiveTab('dashboard')}>
              <span style={styles.navIcon}><NavIcon type="dashboard" /></span> Executive Dashboard
            </button>
            <button style={activeTab === 'floors' ? styles.navBtnActive : styles.navBtn} onClick={() => setActiveTab('floors')}>
              <span style={styles.navIcon}><NavIcon type="floors" /></span> Price Floors ({Object.keys(floors).length})
            </button>
            <button style={activeTab === 'payments' ? styles.navBtnActive : styles.navBtn} onClick={() => setActiveTab('payments')}>
              <span style={styles.navIcon}><NavIcon type="payments" /></span> Payment Logs {pendingPaymentsCount > 0 && <span style={styles.badgeNavAlert}>{pendingPaymentsCount}</span>}
            </button>
            <button style={activeTab === 'workers' ? styles.navBtnActive : styles.navBtn} onClick={() => setActiveTab('workers')}>
              <span style={styles.navIcon}><NavIcon type="workers" /></span> Worker Approval {pendingWorkersCount > 0 && <span style={styles.badgeNavInfo}>{pendingWorkersCount}</span>}
            </button>
            <button style={activeTab === 'disputes' ? styles.navBtnActive : styles.navBtn} onClick={() => setActiveTab('disputes')}>
              <span style={styles.navIcon}><NavIcon type="disputes" /></span> Anti-Bypass ({disputes.length})
            </button>
            <button style={activeTab === 'complaints' ? styles.navBtnActive : styles.navBtn} onClick={() => setActiveTab('complaints')}>
              <span style={styles.navIcon}><NavIcon type="complaints" /></span> Complaints ({pendingComplaintsCount})
            </button>
          </nav>
        </div>

        <div style={styles.sidebarFooter}>
          {/* <div style={styles.adminProfile}>
            <div style={styles.avatar}>AD</div>
            <div>
              <div style={styles.adminName}>Admin Lead</div>
              <div style={styles.adminRole}>System Administrator</div>
            </div>
          </div> */}
          <Link to="/" style={styles.backLink}>← Exit Control Panel</Link>
        </div>
      </aside>

      <main style={styles.contentArea}>
        {activeTab === 'floors' && (
          <div style={styles.topBar}>
            <div style={styles.searchWrapper}>
              <span style={styles.searchIcon}>⌕</span>
              <input
                type="text"
                placeholder="Search category floor..."
                value={floorSearchQuery}
                onChange={(e) => setFloorSearchQuery(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div style={styles.dashboardContainer}>
            <div style={styles.kpiRow}>
              <div style={{ ...styles.kpiCard, borderLeftColor: '#2563eb' }}>
                <div style={styles.kpiHeader}>
                  <span style={styles.kpiTitle}>GROSS REVENUE</span>
                  <span style={styles.kpiTag}>+18.2% this week</span>
                </div>
                <div style={styles.kpiValue}>NRS {totalGrossRevenue}</div>
                <div style={styles.kpiSub}>7 Transactions processed across gateways</div>
              </div>

              <div style={{ ...styles.kpiCard, borderLeftColor: '#10b981' }}>
                <div style={styles.kpiHeader}>
                  <span style={styles.kpiTitle}>PLATFORM NET (10%)</span>
                  <span style={styles.kpiTagGreen}>System Profit</span>
                </div>
                <div style={styles.kpiValue}>NRS {totalCommission}</div>
                <div style={styles.kpiSub}>Retained from total credits package sales</div>
              </div>

              <div style={{ ...styles.kpiCard, borderLeftColor: '#f59e0b' }}>
                <div style={styles.kpiHeader}>
                  <span style={styles.kpiTitle}>PENDING ACTIONS</span>
                  <span style={styles.kpiTagAmber}>Requires Review</span>
                </div>
                <div style={styles.kpiValue}>{pendingPaymentsCount + pendingWorkersCount + pendingComplaintsCount}</div>
                <div style={styles.kpiSub}>{pendingPaymentsCount} Payments • {pendingWorkersCount} Workers • {pendingComplaintsCount} Complaints</div>
              </div>

              <div style={{ ...styles.kpiCard, borderLeftColor: '#8b5cf6' }}>
                <div style={styles.kpiHeader}>
                  <span style={styles.kpiTitle}>ACTIVE TECHNICIANS</span>
                  <span style={styles.kpiTagPurple}>Verified</span>
                </div>
                <div style={styles.kpiValue}>{workers.filter(w => w.status === 'Approved').length}</div>
                <div style={styles.kpiSub}>Out of {workers.length} total registered technicians</div>
              </div>
            </div>

            <div style={styles.dashGrid}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* <div style={styles.panelCard}>
                  <div style={styles.panelHeader}>
                    <div>
                      <h3 style={styles.panelTitle}>Weekly Revenue Volume</h3>
                      <p style={styles.panelSub}>Credit sales distribution across eSewa, Khalti, & ConnectIPS</p>
                    </div>
                    <span style={styles.badgeLive}>● Live Stream</span>
                  </div>
                  <div style={styles.chartArea}>
                    <svg viewBox="0 0 500 130" style={{ width: '100%', height: '140px' }}>
                      <path d="M 0 90 Q 70 30 150 75 T 300 25 T 500 45 L 500 130 L 0 130 Z" fill="rgba(37, 99, 235, 0.08)" />
                      <path d="M 0 90 Q 70 30 150 75 T 300 25 T 500 45" fill="none" stroke="#2563eb" strokeWidth="3" />
                      <circle cx="150" cy="75" r="4" fill="#2563eb" />
                      <circle cx="300" cy="25" r="4" fill="#2563eb" />
                      <circle cx="500" cy="45" r="4" fill="#2563eb" />
                    </svg>
                    <div style={styles.chartLabels}>
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun (Today)</span>
                    </div>
                  </div>
                </div> */}

                <div style={styles.splitGrid}>
                  <div style={styles.panelCard}>
                    <h4 style={styles.panelSubTitle}>Payment Gateways Share</h4>
                    <div style={styles.gatewayRow}>
                      <span style={{ fontWeight: '600', color: '#1e293b' }}>eSewa</span>
                      <span style={{ fontWeight: '700', color: '#0f172a' }}>NRS 1,900 (42%)</span>
                    </div>
                    <div style={styles.progressBar}><div style={{ width: '42%', height: '100%', backgroundColor: '#60a5fa', borderRadius: '4px' }}></div></div>
                    
                    <div style={{ ...styles.gatewayRow, marginTop: '12px' }}>
                      <span style={{ fontWeight: '600', color: '#1e293b' }}>Khalti</span>
                      <span style={{ fontWeight: '700', color: '#0f172a' }}>NRS 800 (18%)</span>
                    </div>
                    <div style={styles.progressBar}><div style={{ width: '18%', height: '100%', backgroundColor: '#a78bfa', borderRadius: '4px' }}></div></div>

                    <div style={{ ...styles.gatewayRow, marginTop: '12px' }}>
                      <span style={{ fontWeight: '600', color: '#1e293b' }}>ConnectIPS</span>
                      <span style={{ fontWeight: '700', color: '#0f172a' }}>NRS 1,800 (40%)</span>
                    </div>
                    <div style={styles.progressBar}><div style={{ width: '40%', height: '100%', backgroundColor: '#34d399', borderRadius: '4px' }}></div></div>
                  </div>

                  {/* <div style={styles.panelCard}>
                    <h4 style={styles.panelSubTitle}>System Operational Health</h4>
                    <div style={styles.healthItem}>
                      <span>API Gateways Status</span>
                      <span style={{ color: '#16a34a', fontWeight: '700', fontSize: '13px' }}>Operational</span>
                    </div>
                    <div style={styles.healthItem}>
                      <span>Automated Verification</span>
                      <span style={{ color: '#16a34a', fontWeight: '700', fontSize: '13px' }}>Active (98.6%)</span>
                    </div>
                    <div style={styles.healthItem}>
                      <span>Anti-Bypass Filter</span>
                      <span style={{ color: '#d97706', fontWeight: '700', fontSize: '13px' }}>3 Flagged Events</span>
                    </div>
                    <div style={styles.healthItem}>
                      <span>Database Latency</span>
                      <span style={{ color: '#16a34a', fontWeight: '700', fontSize: '13px' }}>12ms</span>
                    </div>
                  </div> */}
                </div>
              </div>

              <div style={styles.panelCard}>
                <div style={styles.panelHeader}>
                  <h3 style={styles.panelTitle}>Action Required Queue</h3>
                  <span style={styles.counterBadge}>{pendingPaymentsCount + pendingWorkersCount + pendingComplaintsCount} Pending</span>
                </div>
                <p style={styles.panelSub}>Priority items awaiting manual verification.</p>

                <div style={styles.queueList}>
                  {paymentLogs.filter(p => p.hasComplaint).map(log => (
                    <div key={log.id} style={styles.queueItemAlert}>
                      <div>
                        <div style={styles.queueTagRed}>DISPUTED PAYMENT</div>
                        <div style={styles.queueTitle}>{log.workerName} - NRS {log.amount}</div>
                        <div style={styles.queueDesc}>{log.note}</div>
                      </div>
                      <button onClick={() => setActiveTab('payments')} style={styles.btnActionSmall}>Review</button>
                    </div>
                  ))}

                  {workers.filter(w => w.status === 'Pending').map(w => (
                    <div key={w.id} style={styles.queueItemWarning}>
                      <div>
                        <div style={styles.queueTagAmber}>PENDING WORKER VERIFICATION</div>
                        <div style={styles.queueTitle}>{w.name} ({w.trade})</div>
                        <div style={styles.queueDesc}>Document: {w.doc}</div>
                      </div>
                      <button onClick={() => setActiveTab('workers')} style={styles.btnActionSmall}>Verify</button>
                    </div>
                  ))}

                  {clientComplaints.filter(c => c.status === 'Pending').map(c => (
                    <div key={c.id} style={styles.queueItemBlue}>
                      <div>
                        <div style={styles.queueTagBlue}>CLIENT COMPLAINT</div>
                        <div style={styles.queueTitle}>{c.clientName} re: {c.workerName}</div>
                        <div style={styles.queueDesc}>{c.issue}</div>
                      </div>
                      <button onClick={() => setActiveTab('complaints')} style={styles.btnActionSmall}>Resolve</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'floors' && (
          <section style={styles.section}>
            <div style={styles.headerFlex}>
              <div>
                <h2 style={styles.sectionTitle}>Category Price Floor Management</h2>
                <p style={styles.subtext}>Set minimum bidding budget thresholds (NRS). Click <strong>Update</strong> to confirm changes.</p>
              </div>
            </div>

            <div style={styles.grid}>
              {filteredCategories.length > 0 ? (
                filteredCategories.map(([category, price]) => {
                  const isModified = price !== floors[category];
                  return (
                    <div key={category} style={styles.card}>
                      <div style={styles.labelRow}>
                        <span style={styles.cardIcon}><CategoryIcon category={category} /></span>
                        <label style={styles.label}><strong>{category}</strong></label>
                      </div>
                      <div style={styles.inputGroup}>
                        <span style={styles.currencyText}>NRS</span>
                        <input
                          type="number"
                          value={price}
                          onChange={(e) => setDraftFloors({ ...draftFloors, [category]: e.target.value })}
                          style={styles.input}
                        />
                      </div>
                      <button 
                        onClick={() => handleSaveFloor(category)}
                        disabled={!isModified}
                        style={isModified ? styles.btnUpdate : styles.btnDisabled}
                      >
                        Update
                      </button>
                    </div>
                  );
                })
              ) : (
                <p style={{ color: '#888', gridColumn: '1 / -1', margin: '12px 0 0' }}>No matching trade categories found.</p>
              )}
            </div>
          </section>
        )}

        {activeTab === 'payments' && (
          <section style={styles.section}>
            <div style={styles.sectionPadding}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 style={styles.sectionTitle}>Financial Oversight & Payment Logs</h2>
                  <p style={styles.subtext}>Audit credit purchases, resolve disputed transactions, and track revenue gateways.</p>
                </div>
                <button onClick={() => alert("Exporting financial report (CSV)...")} style={styles.btnSecondary}>📥 Export Statements</button>
              </div>

              <div style={styles.filterBar}>
                <input
                  type="text"
                  placeholder="Search Txn ID or Worker Name..."
                  value={paymentSearchQuery}
                  onChange={(e) => setPaymentSearchQuery(e.target.value)}
                  style={styles.filterInput}
                />
                <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} style={styles.filterSelect}>
                  <option value="All">All Gateways & Statuses</option>
                  <option value="Disputed">Disputed Payments Only</option>
                  <option value="eSewa">eSewa</option>
                  <option value="Khalti">Khalti</option>
                  <option value="ConnectIPS">ConnectIPS</option>
                </select>
              </div>

              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>Txn ID</th>
                      <th style={styles.th}>Date</th>
                      <th style={styles.th}>Worker</th>
                      <th style={styles.th}>Amount</th>
                      <th style={styles.th}>Credits Purchased</th>
                      <th style={styles.th}>Gateway</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPayments.map((log) => (
                      <tr key={log.id} style={log.hasComplaint ? { backgroundColor: '#fff7ed' } : {}}>
                        <td style={styles.td}><strong>{log.id}</strong></td>
                        <td style={styles.td}>{log.date}</td>
                        <td style={styles.td}>{log.workerName} (#{log.workerId})</td>
                        <td style={styles.td}><strong>NRS {log.amount}</strong></td>
                        <td style={styles.td}>+{log.credits} Bids</td>
                        <td style={styles.td}>{log.gateway}</td>
                        <td style={styles.td}>
                          <span style={log.hasComplaint ? styles.badgeWarning : styles.badgeSuccess}>{log.status}</span>
                          {log.note && <div style={{ fontSize: '12px', color: '#b91c1c', marginTop: '4px' }}>{log.note}</div>}
                        </td>
                        <td style={styles.td}>
                          {log.hasComplaint ? (
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <button onClick={() => resolvePayment(log.id, true)} style={styles.btnSuccess}>Approve</button>
                              <button onClick={() => resolvePayment(log.id, false)} style={styles.btnDanger}>Reject</button>
                            </div>
                          ) : (
                            <span style={{ color: '#64748b', fontSize: '13px' }}>Verified</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'workers' && (
          <section style={styles.section}>
            <div style={styles.sectionPadding}>
              <h2 style={styles.sectionTitle}>Worker Verification & Credit Management</h2>
              <p style={styles.subtext}>Approve active technicians and manage bidding credit balances.</p>
              
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>Name</th>
                      <th style={styles.th}>Trade</th>
                      <th style={styles.th}>Document</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Credits</th>
                      <th style={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workers.map((worker) => (
                      <tr key={worker.id}>
                        <td style={styles.td}>#{worker.id}</td>
                        <td style={styles.td}>{worker.name}</td>
                        <td style={styles.td}>{worker.trade}</td>
                        <td style={styles.td}><span style={styles.docLink}>{worker.doc}</span></td>
                        <td style={styles.td}>
                          <span style={worker.status === "Approved" ? styles.badgeSuccess : styles.badgeWarning}>{worker.status}</span>
                        </td>
                        <td style={styles.td}><strong>{worker.credits}</strong> Bids</td>
                        <td style={styles.td}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button 
                              onClick={() => {
                                if (window.confirm(`Change approval status for ${worker.name}?`)) {
                                  setWorkers(workers.map(w => w.id === worker.id ? { ...w, status: w.status === "Approved" ? "Pending" : "Approved" } : w));
                                }
                              }}
                              style={worker.status === "Approved" ? styles.btnDanger : styles.btnSuccess}
                            >
                              {worker.status === "Approved" ? "Revoke" : "Approve"}
                            </button>
                            <button onClick={() => handleManualCreditAdjust(worker.id)} style={styles.btnSecondary}>Adjust Credits</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'disputes' && (
          <section style={styles.section}>
            <div style={styles.sectionPadding}>
              <h2 style={styles.sectionTitle}>Anti-Bypass & Security Monitor</h2>
              <div style={styles.logContainer}>
                {disputes.length === 0 ? <p>No active disputes or security flags.</p> : disputes.map((dispute) => (
                  <div key={dispute.id} style={styles.logCard}>
                    <div>
                      <div style={styles.logHeader}>
                        <span style={styles.logType}>{dispute.type}</span>
                        <span style={styles.severity}>Severity: {dispute.severity}</span>
                      </div>
                      <p style={styles.logDetail}><strong>Target User:</strong> {dispute.targetName} ({dispute.targetPhone})</p>
                      <p style={styles.logDetail}>{dispute.detail}</p>
                    </div>
                    <div style={styles.actionRow}>
                      <button onClick={() => toggleCallStatus(dispute.id)} style={dispute.called ? styles.btnChecked : styles.btnUnchecked}>
                        {dispute.called ? "Called" : "Mark as Called"}
                      </button>
                      <button onClick={() => handleResolveDispute(dispute.id, 'dismiss')} style={styles.btnSecondary}>Dismiss</button>
                      <button onClick={() => handleResolveDispute(dispute.id, 'suspend')} style={styles.btnDanger}>Suspend Account</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'complaints' && (
          <section style={styles.section}>
            <div style={styles.sectionPadding}>
              <h2 style={styles.sectionTitle}>Client Complaints Center</h2>
              <p style={styles.subtext}>Manage customer complaints and verify reported issues by contacting clients directly.</p>

              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.th}>ID</th>
                      <th style={styles.th}>Client</th>
                      <th style={styles.th}>Reported Worker</th>
                      <th style={styles.th}>Trade</th>
                      <th style={styles.th}>Issue Description</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Actions & Verification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientComplaints.map((cmp) => (
                      <tr key={cmp.id}>
                        <td style={styles.td}><strong>{cmp.id}</strong></td>
                        <td style={styles.td}>
                          {cmp.clientName}
                          {cmp.phoneRevealed && (
                            <div style={styles.revealedPhone}>
                              <a href={`tel:${cmp.clientPhone}`} style={{ color: '#0066cc' }}>{cmp.clientPhone}</a>
                            </div>
                          )}
                        </td>
                        <td style={styles.td}>{cmp.workerName} (#{cmp.workerId})</td>
                        <td style={styles.td}>{cmp.jobCategory}</td>
                        <td style={{ ...styles.td, maxWidth: '250px' }}>{cmp.issue}</td>
                        <td style={styles.td}>
                          <span style={cmp.status === "Pending" ? styles.badgeWarning : styles.badgeSuccess}>{cmp.status}</span>
                        </td>
                        <td style={styles.td}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <button onClick={() => toggleComplaintPhone(cmp.id)} style={styles.btnCall}>
                              {cmp.phoneRevealed ? "Hide Number" : "Call / Reveal Number"}
                            </button>
                            {cmp.status === "Pending" && (
                              <div style={{ display: 'flex', gap: '5px' }}>
                                <button onClick={() => handleResolveComplaint(cmp.id, 'Resolved')} style={styles.btnSuccess}>Resolve</button>
                                <button onClick={() => handleResolveComplaint(cmp.id, 'Dismissed')} style={styles.btnSecondary}>Dismiss</button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

const styles = {
  pageLayout: { display: 'flex', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', backgroundColor: '#f1f5f9' },
  sidebar: { width: '280px', height: '100vh', position: 'fixed', top: 0, left: 0, background: '#0f172a', color: '#fff', padding: '24px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '4px 0 24px rgba(0,0,0,0.06)', overflowY: 'auto', boxSizing: 'border-box', zIndex: 10 },
  sidebarHeader: { marginBottom: '20px', paddingLeft: '8px' },
  operationsLabel: { marginTop: '4px', color: '#94a3b8', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' },
  sidebarFooter: { paddingTop: '16px', borderTop: '1px solid #1e293b' },
  adminProfile: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', paddingLeft: '4px' },
  avatar: { width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#2563eb', color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' },
  adminName: { fontSize: '14px', fontWeight: '600', color: '#f8fafc' },
  adminRole: { fontSize: '11px', color: '#64748b' },
  backLink: { color: '#94a3b8', textDecoration: 'none', fontSize: '13px', fontWeight: '500', display: 'block', paddingLeft: '4px' },
  sidebarTitle: { fontSize: '24px', margin: '0', color: '#f8fafc', fontWeight: '700' },
  navMenu: { display: 'flex', flexDirection: 'column', gap: '6px' },
  navBtn: { padding: '12px 14px', backgroundColor: 'transparent', color: '#94a3b8', border: 'none', textAlign: 'left', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.15s ease', fontWeight: '500' },
  navBtnActive: { padding: '12px 14px', backgroundColor: '#1e293b', color: '#38bdf8', border: 'none', textAlign: 'left', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' },
  navIcon: { display: 'flex', alignItems: 'center' },
  badgeNavAlert: { backgroundColor: '#ef4444', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '2px 6px', borderRadius: '99px', marginLeft: 'auto' },
  badgeNavInfo: { backgroundColor: '#3b82f6', color: '#fff', fontSize: '11px', fontWeight: '700', padding: '2px 6px', borderRadius: '99px', marginLeft: 'auto' },
  contentArea: { flex: 1, marginLeft: '280px', padding: '28px', backgroundColor: '#f8fafc', minHeight: '100vh', boxSizing: 'border-box' },
  dashboardContainer: { display: 'flex', flexDirection: 'column', gap: '24px' },
  kpiRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' },
  kpiCard: { backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', borderLeft: '4px solid', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', borderTop: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' },
  kpiHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  kpiTitle: { fontSize: '12px', fontWeight: '700', color: '#64748b', letterSpacing: '0.05em' },
  kpiTag: { fontSize: '11px', color: '#2563eb', fontWeight: '600' },
  kpiTagGreen: { fontSize: '11px', color: '#10b981', fontWeight: '600' },
  kpiTagAmber: { fontSize: '11px', color: '#f59e0b', fontWeight: '600' },
  kpiTagPurple: { fontSize: '11px', color: '#8b5cf6', fontWeight: '600' },
  kpiValue: { fontSize: '28px', color: '#0f172a', fontWeight: '700', lineHeight: '1.2' },
  kpiSub: { fontSize: '12px', color: '#64748b', marginTop: '6px' },
  dashGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' },
  panelCard: { backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' },
  panelHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' },
  panelTitle: { margin: '0', fontSize: '16px', fontWeight: '700', color: '#0f172a' },
  panelSub: { margin: '4px 0 0', fontSize: '13px', color: '#64748b' },
  panelSubTitle: { margin: '0 0 12px', fontSize: '14px', fontWeight: '600', color: '#334155' },
  badgeLive: { backgroundColor: '#dcfce7', color: '#15803d', fontSize: '12px', fontWeight: '600', padding: '4px 8px', borderRadius: '6px' },
  counterBadge: { backgroundColor: '#fef3c7', color: '#b45309', fontSize: '12px', fontWeight: '700', padding: '4px 8px', borderRadius: '6px' },
  chartArea: { marginTop: '10px' },
  chartLabels: { display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '8px', padding: '0 4px' },
  splitGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' },
  gatewayRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px' },
  progressBar: { width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '4px', marginTop: '4px', overflow: 'hidden' },
  healthItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9', fontSize: '13px', color: '#475569' },
  queueList: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' },
  queueItemAlert: { padding: '12px', borderRadius: '8px', backgroundColor: '#fff5f5', border: '1px solid #fed7d7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  queueItemWarning: { padding: '12px', borderRadius: '8px', backgroundColor: '#fffbe6', border: '1px solid #ffe58f', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  queueItemBlue: { padding: '12px', borderRadius: '8px', backgroundColor: '#f0f9ff', border: '1px solid #bae6fd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  queueTagRed: { fontSize: '10px', fontWeight: '800', color: '#e53e3e', letterSpacing: '0.05em' },
  queueTagAmber: { fontSize: '10px', fontWeight: '800', color: '#d69e2e', letterSpacing: '0.05em' },
  queueTagBlue: { fontSize: '10px', fontWeight: '800', color: '#0284c7', letterSpacing: '0.05em' },
  queueTitle: { fontSize: '13px', fontWeight: '700', color: '#1a202c', marginTop: '2px' },
  queueDesc: { fontSize: '12px', color: '#4a5568', marginTop: '2px' },
  btnActionSmall: { padding: '6px 12px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
  topBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', marginBottom: '18px' },
  searchWrapper: { flex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '10px', padding: '8px 14px' },
  searchIcon: { fontSize: '18px', color: '#64748b', marginRight: '10px' },
  searchInput: { flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', color: '#0f172a' },
  filterBar: { display: 'flex', gap: '12px', marginTop: '16px', marginBottom: '8px', flexWrap: 'wrap' },
  filterInput: { flex: 1, minWidth: '240px', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' },
  filterSelect: { padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff', outline: 'none' },
  section: { backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden' },
  sectionPadding: { padding: '20px 24px' },
  sectionTitle: { margin: '0 0 4px', fontSize: '20px', color: '#0f172a', fontWeight: '700' },
  headerFlex: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '20px', backgroundColor: '#ffffff', padding: '20px 24px 0px' },
  subtext: { color: '#64748b', fontSize: '14px', marginTop: '2px', marginBottom: '0' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', padding: '20px 24px 24px' },
  card: { background: '#ffffff', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' },
  labelRow: { display: 'flex', alignItems: 'center', gap: '10px' },
  label: { display: 'block', fontSize: '14px', color: '#0f172a' },
  cardIcon: { width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', backgroundColor: '#eff6ff', color: '#2563eb' },
  inputGroup: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '6px 10px' },
  currencyText: { fontWeight: '700', color: '#64748b', fontSize: '13px' },
  input: { width: '100%', padding: '4px', fontSize: '15px', border: 'none', background: 'transparent', color: '#0f172a', outline: 'none' },
  btnUpdate: { backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' },
  btnDisabled: { backgroundColor: '#f1f5f9', color: '#94a3b8', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'not-allowed', fontSize: '13px' },
  tableWrapper: { overflowX: 'auto', marginTop: '12px' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', minWidth: '760px' },
  th: { borderBottom: '2px solid #e2e8f0', padding: '12px 10px', textAlign: 'left', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' },
  td: { borderBottom: '1px solid #e2e8f0', padding: '12px 10px', color: '#0f172a', fontSize: '14px', verticalAlign: 'top' },
  docLink: { color: '#2563eb', textDecoration: 'underline', fontSize: '13px', cursor: 'pointer' },
  badgeSuccess: { backgroundColor: '#dcfce7', color: '#15803d', padding: '4px 8px', borderRadius: '999px', fontSize: '12px', fontWeight: '600' },
  badgeWarning: { backgroundColor: '#fef3c7', color: '#b45309', padding: '4px 8px', borderRadius: '999px', fontSize: '12px', fontWeight: '600' },
  btnSuccess: { backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
  btnDanger: { backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
  btnSecondary: { backgroundColor: '#64748b', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' },
  btnCall: { backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', fontWeight: '600' },
  revealedPhone: { marginTop: '4px', fontSize: '12px', fontWeight: '600' },
  btnChecked: { backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' },
  btnUnchecked: { backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' },
  logContainer: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' },
  logCard: { backgroundColor: '#fff', padding: '16px', borderRadius: '10px', borderLeft: '4px solid #f59e0b', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' },
  logHeader: { display: 'flex', gap: '12px', fontWeight: '600', marginBottom: '4px', flexWrap: 'wrap' },
  logType: { color: '#b45309', fontSize: '14px' },
  severity: { color: '#dc2626', fontSize: '12px' },
  logDetail: { margin: '4px 0', color: '#475569', fontSize: '13px' },
  actionRow: { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }
};