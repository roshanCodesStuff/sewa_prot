import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminView() {
  const [activeTab, setActiveTab] = useState('floors');
  const [floorSearchQuery, setFloorSearchQuery] = useState('');

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
  });

  const [draftFloors, setDraftFloors] = useState({ ...floors });

  const [workers, setWorkers] = useState([
    { id: 101, name: "Ramesh Sharma", phone: "+9779801234567", trade: "Plumbing", status: "Approved", doc: "Citizenship_ID_101.jpg", credits: 10 },
    { id: 102, name: "Sita Thapa", phone: "+9779812345678", trade: "Electrical", status: "Pending", doc: "Citizenship_ID_102.jpg", credits: 0 },
    { id: 103, name: "Hari Poudel", phone: "+9779823456789", trade: "Masonry", status: "Pending", doc: "Trade_Cert_103.jpg", credits: 0 },
  ]);

  const [paymentLogs, setPaymentLogs] = useState([
    { id: "TXN_9921", workerId: 101, amount: "NRS 500", credits: 10, gateway: "eSewa", status: "Auto-Approved", hasComplaint: false },
    { id: "TXN_9922", workerId: 102, amount: "NRS 200", credits: 4, gateway: "Khalti", status: "Payment Disputed", hasComplaint: true, note: "Worker states money deducted but credits not added." }
  ]);

  const [disputes, setDisputes] = useState([
    { id: 1, targetName: "Sita Thapa", targetPhone: "+9779812345678", type: "Invalid Phone Number", detail: "Attempted to post phone number '9801234567' in job comment.", severity: "High", called: false },
    { id: 2, targetName: "Ram Shrestha", targetPhone: "+9779841122334", type: "Floor Bypass Attempt", detail: "Submitted NRS 200 budget for Electrical (Floor: NRS 800). System blocked.", severity: "Medium", called: false }
  ]);

  const [clientComplaints, setClientComplaints] = useState([
    { id: "CMP-301", clientName: "Aarav Sharma", clientPhone: "+9779841987654", workerId: 101, workerName: "Ramesh Sharma", jobCategory: "Plumbing", issue: "Technician arrived 2 hours late and requested extra cash.", status: "Pending", phoneRevealed: false },
    { id: "CMP-302", clientName: "Binita Giri", clientPhone: "+9779801122334", workerId: 102, workerName: "Sita Thapa", jobCategory: "Electrical", issue: "Unfinished DB Box wiring work. Left without resolving circuit failure.", status: "Pending", phoneRevealed: false }
  ]);

  const handleSaveFloor = (category) => {
    const newValue = draftFloors[category];
    if (window.confirm(`Are you sure you want to change the ${category} price floor from NRS ${floors[category]} to NRS ${newValue}?`)) {
      const updatedFloors = { ...floors, [category]: Number(newValue) };
      setFloors(updatedFloors);
      setDraftFloors(updatedFloors);
      alert(`${category} floor updated successfully.`);
    } else {
      setDraftFloors({ ...draftFloors, [category]: floors[category] });
    }
  };

  const resolvePayment = (txnId, approve) => {
    const txn = paymentLogs.find(p => p.id === txnId);
    if (approve) {
      setWorkers(workers.map(w => w.id === txn.workerId ? { ...w, credits: w.credits + txn.credits } : w));
      setPaymentLogs(paymentLogs.map(p => p.id === txnId ? { ...p, status: "Resolved & Credited", hasComplaint: false } : p));
      alert(`Transaction ${txnId} approved. Added ${txn.credits} credits to Worker #${txn.workerId}.`);
    } else {
      setPaymentLogs(paymentLogs.map(p => p.id === txnId ? { ...p, status: "Rejected", hasComplaint: false } : p));
      alert(`Transaction ${txnId} rejected.`);
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

  const NavIcon = ({ type }) => {
    const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' };

    switch (type) {
      case 'floors':
        return (
          <svg {...common}>
            <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z" />
            <path d="M8 5v14" />
            <path d="M16 5v14" />
            <path d="M4 9h16" />
          </svg>
        );
      case 'workers':
        return (
          <svg {...common}>
            <path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" />
            <circle cx="10" cy="7" r="3" />
            <path d="M20 19v-1a3 3 0 0 0-2.3-2.9" />
            <path d="M16 4.5a3 3 0 0 1 0 5.8" />
          </svg>
        );
      case 'disputes':
        return (
          <svg {...common}>
            <path d="M12 3 5 6v6c0 4.4 2.9 8.4 7 9 4.1-.6 7-4.6 7-9V6l-7-3Z" />
            <path d="M12 8v4" />
            <circle cx="12" cy="15.5" r="0.8" fill="currentColor" stroke="none" />
          </svg>
        );
      case 'complaints':
        return (
          <svg {...common}>
            <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v6A2.5 2.5 0 0 1 16.5 16H10l-5 4v-4.5A2.5 2.5 0 0 1 5 13.5v-6Z" />
            <path d="M8 9h8" />
            <path d="M8 12h5" />
          </svg>
        );
      default:
        return null;
    }
  };

  const CategoryIcon = ({ category }) => {
    const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' };

    switch (category) {
      case 'Plumbing':
        return (
          <svg {...common}>
            <path d="M12 3c2.5 2.5 4 4.7 4 6.5A4 4 0 0 1 8 9.5C8 7.7 9.5 5.5 12 3Z" />
            <path d="M12 10v9" />
          </svg>
        );
      case 'Electrical':
        return (
          <svg {...common}>
            <path d="M13 2 7 13h4l-1 9 8-12h-4l2-8Z" />
          </svg>
        );
      case 'Carpentry':
        return (
          <svg {...common}>
            <path d="M4 17.5V6.5h8.5A2.5 2.5 0 0 1 15 9v8.5" />
            <path d="M6 17.5h8.5" />
            <path d="M14.5 9.5 19 5" />
            <path d="M17 6.5h2v2" />
          </svg>
        );
      case 'Masonry':
        return (
          <svg {...common}>
            <path d="M4 18h16" />
            <path d="M7 18V7l3-3h4l3 3v11" />
            <path d="M9 12h6" />
          </svg>
        );
      case 'Painting':
        return (
          <svg {...common}>
            <path d="M5 16h12" />
            <path d="M6 16V9.5A1.5 1.5 0 0 1 7.5 8H15a2 2 0 0 1 2 2v6" />
            <path d="M8 8V5.5A1.5 1.5 0 0 1 9.5 4H15" />
            <path d="M8 12h6" />
          </svg>
        );
      case 'Pest Control':
        return (
          <svg {...common}>
            <path d="M9 7a3 3 0 0 1 6 0" />
            <path d="M8 10c1-1 2.2-1.5 4-1.5s3 .5 4 1.5" />
            <path d="M7 13c1.2 1.5 2.6 2.2 5 2.2s3.8-.7 5-2.2" />
            <path d="M12 15v4" />
          </svg>
        );
      case 'Water Tank Cleaning':
        return (
          <svg {...common}>
            <path d="M8 4h8v3.5A4.5 4.5 0 0 1 12 12a4.5 4.5 0 0 1-4-4.5V4Z" />
            <path d="M8 7h8" />
            <path d="M9 18c0 1.7 1.3 3 3 3s3-1.3 3-3v-4H9v4Z" />
          </svg>
        );
      case 'AC Repair & Service':
        return (
          <svg {...common}>
            <path d="M6 13h12" />
            <path d="M8 13V9a4 4 0 0 1 8 0v4" />
            <path d="M9 18h6" />
            <path d="M12 18v2" />
          </svg>
        );
      case 'Washing Machine Repair':
        return (
          <svg {...common}>
            <rect x="5" y="4" width="14" height="16" rx="2" />
            <circle cx="12" cy="12" r="3" />
            <path d="M8 8h2" />
          </svg>
        );
      case 'Refrigerator Service':
        return (
          <svg {...common}>
            <rect x="7" y="3" width="10" height="18" rx="2" />
            <path d="M10 8h4" />
            <path d="M10 12h4" />
            <path d="M10 16h4" />
          </svg>
        );
      case 'Microwave Repair':
        return (
          <svg {...common}>
            <rect x="4" y="6" width="16" height="12" rx="2" />
            <path d="M8 10h8" />
            <path d="M8 14h4" />
            <circle cx="16.5" cy="12.5" r="1.5" />
          </svg>
        );
      case 'Salon at Home (Women)':
        return (
          <svg {...common}>
            <path d="M12 20s-7-4.4-7-9.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 2.5C19 15.6 12 20 12 20Z" />
            <path d="M9 12h6" />
          </svg>
        );
      case "Men's Haircut & Grooming":
        return (
          <svg {...common}>
            <path d="M5 16 8 8h8l3 8" />
            <path d="M8 8V5" />
            <path d="M16 8V5" />
            <path d="M9 16h6" />
          </svg>
        );
      case 'Full Body Massage':
        return (
          <svg {...common}>
            <path d="M7 15c1-2 2.5-3 5-3s4 1 5 3" />
            <path d="M9 10.5V8a3 3 0 0 1 6 0v2.5" />
            <path d="M12 5V3" />
            <path d="M8 18c0 2 2 3 4 3s4-1 4-3" />
          </svg>
        );
      case 'Deep Home Cleaning':
      case 'Sofa & Carpet Cleaning':
      default:
        return (
          <svg {...common}>
            <path d="M6 14V8.5A2.5 2.5 0 0 1 8.5 6h7A2.5 2.5 0 0 1 18 8.5V14" />
            <path d="M4 14h16v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3Z" />
            <path d="M9 10h6" />
          </svg>
        );
    }
  };

  const summaryCards = [
    { label: 'Active Categories', value: Object.keys(floors).length, accent: '#3b82f6', delta: '+12%', deltaText: 'AI insight: Optimal coverage' },
    { label: 'Approved Workers', value: workers.filter(w => w.status === 'Approved').length, accent: '#10b981', delta: 'Stable', deltaText: 'AI insight: Verification pending' },
    { label: 'Pending Complaints', value: clientComplaints.filter(c => c.status === 'Pending').length, accent: '#f59e0b', delta: '+1 new', deltaText: 'AI insight: High priority detected' },
    { label: 'Open Security Flags', value: disputes.length, accent: '#ef4444', delta: '-50%', deltaText: 'AI insight: Risk level moderate' }
  ];

  return (
    <div style={styles.pageLayout}>
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.sidebarHeader}>
            <div style={styles.brandPill}>Admin</div>
            <h2 style={styles.sidebarTitle}>Sewa Admin Panel</h2>
            <div style={styles.operationsLabel}>Operations</div>
          </div>
          <nav style={styles.navMenu}>
            <button 
              style={activeTab === 'floors' ? styles.navBtnActive : styles.navBtn} 
              onClick={() => setActiveTab('floors')}
            >
              <span style={styles.navIcon}><NavIcon type="floors" /></span>
              Category Price Floors
            </button>
            <button 
              style={activeTab === 'workers' ? styles.navBtnActive : styles.navBtn} 
              onClick={() => setActiveTab('workers')}
            >
              <span style={styles.navIcon}><NavIcon type="workers" /></span>
              Workers & Payments
            </button>
            <button 
              style={activeTab === 'disputes' ? styles.navBtnActive : styles.navBtn} 
              onClick={() => setActiveTab('disputes')}
            >
              <span style={styles.navIcon}><NavIcon type="disputes" /></span>
              Anti-Bypass Monitor ({disputes.length})
            </button>
            <button 
              style={activeTab === 'complaints' ? styles.navBtnActive : styles.navBtn} 
              onClick={() => setActiveTab('complaints')}
            >
              <span style={styles.navIcon}><NavIcon type="complaints" /></span>
              Client Complaints ({clientComplaints.filter(c => c.status === 'Pending').length})
            </button>
          </nav>
        </div>

        <div style={styles.sidebarFooter}>
          <Link to="/" style={styles.backLink}>← Back to Home</Link>
        </div>
      </aside>

      <main style={styles.contentArea}>
        <div style={styles.topBar}>
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}>⌕</span>
            <input
              type="text"
              placeholder="Search category..."
              value={floorSearchQuery}
              onChange={(e) => setFloorSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            <span style={styles.shortcut}>⌘K</span>
          </div>

          <div style={styles.topActions}>
            <button style={styles.iconButton} aria-label="Notifications">◔</button>
            <button style={styles.iconButton} aria-label="Settings">⚙</button>
            <button style={styles.iconButton} aria-label="Help">?</button>
            <div style={styles.avatar}>A</div>
          </div>
        </div>

        <div style={styles.summaryGrid}>
          {summaryCards.map((card) => (
            <div key={card.label} style={{ ...styles.summaryCard, borderColor: card.accent, boxShadow: `inset 0 0 0 1px ${card.accent}55` }}>
              <div style={{ ...styles.summaryLabel, color: card.accent }}>{card.label}</div>
              <div style={styles.summaryRow}>
                <strong style={styles.summaryValue}>{card.value}</strong>
                <span style={{ ...styles.summaryDelta, color: card.accent }}>{card.delta}</span>
              </div>
              <div style={styles.summaryHint}>{card.deltaText}</div>
            </div>
          ))}
        </div>

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
                        <label style={styles.label}><strong>{category} Floor</strong></label>
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

        {activeTab === 'workers' && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Worker Verification & Credit Payment Monitor</h2>
            <h3 style={styles.subHeading}>Active Technicians</h3>
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
                        <span style={worker.status === "Approved" ? styles.badgeSuccess : styles.badgeWarning}>
                          {worker.status}
                        </span>
                      </td>
                      <td style={styles.td}><strong>{worker.credits}</strong> Bids</td>
                      <td style={styles.td}>
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 style={styles.subHeading}>Credit Purchases & Payment Complaints</h3>
            <div style={styles.paymentContainer}>
              {paymentLogs.map((log) => (
                <div key={log.id} style={log.hasComplaint ? styles.paymentCardAlert : styles.paymentCard}>
                  <div>
                    <strong>Txn ID:</strong> {log.id} | <strong>Worker:</strong> #{log.workerId} | <strong>Amount:</strong> {log.amount} (+{log.credits} Credits) via <strong>{log.gateway}</strong>
                    <br />
                    <span style={{ fontSize: '13px', color: log.hasComplaint ? '#d9534f' : '#28a745' }}>
                      Status: <strong>{log.status}</strong> {log.note && `- ${log.note}`}
                    </span>
                  </div>
                  {log.hasComplaint && (
                    <div style={{ marginTop: '8px' }}>
                      <button onClick={() => resolvePayment(log.id, true)} style={styles.btnSuccess}>Verify & Add Credits</button>
                      <button onClick={() => resolvePayment(log.id, false)} style={{ ...styles.btnDanger, marginLeft: '8px' }}>Reject Complaint</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'disputes' && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Anti-Bypass & Security Monitor</h2>
            <div style={styles.logContainer}>
              {disputes.length === 0 ? <p>No active disputes or flags.</p> : disputes.map((dispute) => (
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
                    <button 
                      onClick={() => toggleCallStatus(dispute.id)} 
                      style={dispute.called ? styles.btnChecked : styles.btnUnchecked}
                    >
                      {dispute.called ? "Called" : "Mark as Called"}
                    </button>
                    <button onClick={() => handleResolveDispute(dispute.id, 'dismiss')} style={styles.btnSecondary}>Dismiss</button>
                    <button onClick={() => handleResolveDispute(dispute.id, 'suspend')} style={styles.btnDanger}>Suspend Account</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'complaints' && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Client Complaints Center</h2>
            <p style={styles.subtext}>Manage customer complaints and verify reported issues by calling clients directly.</p>

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
                        <span style={cmp.status === "Pending" ? styles.badgeWarning : styles.badgeSuccess}>
                          {cmp.status}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <button 
                            onClick={() => toggleComplaintPhone(cmp.id)} 
                            style={styles.btnCall}
                          >
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
          </section>
        )}
      </main>
    </div>
  );
}

const styles = {
  pageLayout: { display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#eef2f7' },
  sidebar: { width: '320px', background: 'linear-gradient(180deg, #1f2a3d 0%, #1a2435 100%)', color: '#fff', padding: '26px 18px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '2px 0 18px rgba(15, 23, 42, 0.12)' },
  sidebarHeader: { marginBottom: '22px' },
  brandPill: { display: 'inline-block', padding: '7px 12px', borderRadius: '999px', backgroundColor: 'rgba(148, 163, 184, 0.17)', color: '#dbeafe', fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' },
  operationsLabel: { marginTop: '14px', color: '#d1d9e6', fontSize: '18px', opacity: 0.9 },
  sidebarFooter: { paddingTop: '18px', borderTop: '1px solid rgba(148, 163, 184, 0.18)' },
  backLink: { color: '#cbe4ff', textDecoration: 'none', fontSize: '14px', fontWeight: '700' },
  sidebarTitle: { fontSize: '52px', margin: '0', color: '#f8fafc', lineHeight: '0.96', fontWeight: '700' },
  navMenu: { display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '22px' },
  navBtn: { padding: '16px 16px', backgroundColor: 'transparent', color: '#e2e8f0', border: '1px solid transparent', textAlign: 'left', borderRadius: '12px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s ease', fontWeight: '500' },
  navBtnActive: { padding: '16px 16px', backgroundColor: '#3e536d', color: '#f8fafc', border: '1px solid rgba(148, 163, 184, 0.18)', textAlign: 'left', borderRadius: '12px', cursor: 'pointer', fontSize: '18px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: 'inset 0 0 0 1px rgba(191, 219, 254, 0.12)' },
  navIcon: { fontSize: '20px', width: '22px', textAlign: 'center', display: 'inline-block' },
  contentArea: { flex: 1, padding: '26px 24px 24px', backgroundColor: '#f4f5f7' },
  topBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '18px', marginBottom: '18px' },
  searchWrapper: { flex: 1, display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', border: '1px solid #dfe4eb', borderRadius: '14px', padding: '8px 16px', boxShadow: '0 2px 10px rgba(15,23,42,0.02)' },
  searchIcon: { fontSize: '22px', color: '#64748b', marginRight: '12px' },
  searchInput: { flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '18px', color: '#0f172a' },
  shortcut: { fontSize: '14px', color: '#64748b', backgroundColor: '#edf2f7', border: '1px solid #dfe7ef', borderRadius: '8px', padding: '4px 8px', fontWeight: '700' },
  topActions: { display: 'flex', alignItems: 'center', gap: '12px' },
  iconButton: { width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #dfe4eb', backgroundColor: '#f8fafc', color: '#475569', fontSize: '18px', cursor: 'pointer' },
  avatar: { width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, #f9c784 0%, #f08a5d 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '16px' },
  summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, minmax(190px, 1fr))', gap: '18px', marginBottom: '18px', maxWidth: '980px' },
  summaryCard: { backgroundColor: '#f8fafc', padding: '18px 22px 16px', borderRadius: '18px', border: '2px solid', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.03)' },
  summaryLabel: { display: 'block', fontSize: '16px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' },
  summaryRow: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '10px' },
  summaryValue: { fontSize: '52px', color: '#0f172a', lineHeight: '0.9', fontWeight: '600' },
  summaryDelta: { fontSize: '16px', fontWeight: '700' },
  summaryHint: { marginTop: '10px', color: '#64748b', fontSize: '14px' },
  section: { backgroundColor: '#f7f8fa', padding: '0', borderRadius: '18px', border: '1px solid #dfe5ec', boxShadow: '0 4px 10px rgba(15, 23, 42, 0.02)' },
  sectionTitle: { margin: '0 0 4px', fontSize: '36px', color: '#0f172a', fontWeight: '700' },
  headerFlex: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '20px', backgroundColor: '#f7f8fa', padding: '18px 24px 14px', borderRadius: '18px 18px 0 0' },
  subtext: { color: '#475569', fontSize: '18px', marginTop: '4px', marginBottom: '0' },
  subHeading: { marginTop: '20px', marginBottom: '12px', fontSize: '18px', color: '#0f172a' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '18px' },
  card: { background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', padding: '18px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 8px 18px rgba(15, 23, 42, 0.03)' },
  labelRow: { display: 'flex', alignItems: 'center', gap: '10px', minHeight: '24px' },
  label: { display: 'block', fontSize: '15px', color: '#0f172a' },
  cardIcon: { width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', backgroundColor: '#eef4ff', color: '#3b82f6' },
  inputGroup: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f8fafc', border: '1px solid #dbe3ef', borderRadius: '10px', padding: '8px 10px' },
  currencyText: { fontWeight: '700', color: '#475569' },
  input: { width: '100%', padding: '7px 4px', fontSize: '16px', border: 'none', background: 'transparent', color: '#0f172a', outline: 'none' },
  btnUpdate: { background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', color: '#fff', border: 'none', padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', boxShadow: '0 6px 16px rgba(37, 99, 235, 0.2)' },
  btnDisabled: { backgroundColor: '#e2e8f0', color: '#64748b', border: 'none', padding: '10px 12px', borderRadius: '10px', cursor: 'not-allowed' },
  tableWrapper: { overflowX: 'auto', marginTop: '8px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px', backgroundColor: '#fff', minWidth: '760px' },
  th: { borderBottom: '2px solid #e2e8f0', padding: '12px 10px', textAlign: 'left', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#475569' },
  td: { borderBottom: '1px solid #e2e8f0', padding: '12px 10px', color: '#0f172a', verticalAlign: 'top' },
  docLink: { color: '#2563eb', textDecoration: 'underline', fontSize: '14px', cursor: 'pointer' },
  badgeSuccess: { backgroundColor: '#dcfce7', color: '#166534', padding: '5px 9px', borderRadius: '999px', fontSize: '12px', fontWeight: '700' },
  badgeWarning: { backgroundColor: '#fef3c7', color: '#92400e', padding: '5px 9px', borderRadius: '999px', fontSize: '12px', fontWeight: '700' },
  btnSuccess: { background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', color: '#fff', border: 'none', padding: '7px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700' },
  btnDanger: { background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: '#fff', border: 'none', padding: '7px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700' },
  btnSecondary: { backgroundColor: '#64748b', color: '#fff', border: 'none', padding: '7px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '700' },
  btnCall: { backgroundColor: '#0ea5e9', color: '#fff', border: 'none', padding: '7px 10px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: '700' },
  revealedPhone: { marginTop: '4px', fontSize: '12px', fontWeight: '700' },
  btnChecked: { backgroundColor: '#16a34a', color: '#fff', border: 'none', padding: '7px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' },
  btnUnchecked: { backgroundColor: '#e2e8f0', color: '#334155', border: '1px solid #cbd5e1', padding: '7px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '700' },
  paymentContainer: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' },
  paymentCard: { backgroundColor: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' },
  paymentCardAlert: { backgroundColor: '#fff7ed', padding: '14px', borderRadius: '12px', border: '1px solid #fdba74', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' },
  logContainer: { display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '12px' },
  logCard: { backgroundColor: '#fff', padding: '16px', borderRadius: '12px', borderLeft: '4px solid #f59e0b', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' },
  logHeader: { display: 'flex', gap: '15px', fontWeight: '700', marginBottom: '6px', flexWrap: 'wrap' },
  logType: { color: '#92400e' },
  severity: { color: '#b91c1c', fontSize: '12px' },
  logDetail: { margin: '4px 0', color: '#475569' },
  actionRow: { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }
};