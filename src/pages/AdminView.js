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

  return (
    <div style={styles.pageLayout}>
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.sidebarHeader}>
            <h2 style={styles.sidebarTitle}>Sewa Admin Panel</h2>
          </div>
          <nav style={styles.navMenu}>
            <button 
              style={activeTab === 'floors' ? styles.navBtnActive : styles.navBtn} 
              onClick={() => setActiveTab('floors')}
            >
              Category Price Floors
            </button>
            <button 
              style={activeTab === 'workers' ? styles.navBtnActive : styles.navBtn} 
              onClick={() => setActiveTab('workers')}
            >
              Workers & Payments
            </button>
            <button 
              style={activeTab === 'disputes' ? styles.navBtnActive : styles.navBtn} 
              onClick={() => setActiveTab('disputes')}
            >
              Anti-Bypass Monitor ({disputes.length})
            </button>
            <button 
              style={activeTab === 'complaints' ? styles.navBtnActive : styles.navBtn} 
              onClick={() => setActiveTab('complaints')}
            >
              Client Complaints ({clientComplaints.filter(c => c.status === 'Pending').length})
            </button>
          </nav>
        </div>

        <div style={styles.sidebarFooter}>
          <Link to="/" style={styles.backLink}>← Back to Home</Link>
        </div>
      </aside>

      <main style={styles.contentArea}>
        {activeTab === 'floors' && (
          <section style={styles.section}>
            <div style={styles.headerFlex}>
              <div>
                <h2>Category Price Floor Management</h2>
                <p style={styles.subtext}>Set minimum bidding budget thresholds (NRS). Click <strong>Update</strong> to confirm changes.</p>
              </div>
              
              <div style={styles.searchWrapper}>
                <input
                  type="text"
                  placeholder="Search category..."
                  value={floorSearchQuery}
                  onChange={(e) => setFloorSearchQuery(e.target.value)}
                  style={styles.searchInput}
                />
              </div>
            </div>

            <div style={styles.grid}>
              {filteredCategories.length > 0 ? (
                filteredCategories.map(([category, price]) => {
                  const isModified = price !== floors[category];
                  return (
                    <div key={category} style={styles.card}>
                      <label style={styles.label}><strong>{category} Floor</strong></label>
                      <div style={styles.inputGroup}>
                        <span>NRS</span>
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
                <p style={{ color: '#888', gridColumn: '1 / -1' }}>No matching trade categories found.</p>
              )}
            </div>
          </section>
        )}

        {activeTab === 'workers' && (
          <section style={styles.section}>
            <h2>Worker Verification & Credit Payment Monitor</h2>
            <h3 style={styles.subHeading}>Active Technicians</h3>
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
            <h2>Anti-Bypass & Security Monitor</h2>
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
            <h2>Client Complaints Center</h2>
            <p style={styles.subtext}>Manage customer complaints and verify reported issues by calling clients directly.</p>
            
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
  navMenu: { display: 'flex', flexDirection: 'column', gap: '10px' },
  navBtn: { padding: '12px 15px', backgroundColor: 'transparent', color: '#bdc3c7', border: 'none', textAlign: 'left', borderRadius: '6px', cursor: 'pointer', fontSize: '15px' },
  navBtnActive: { padding: '12px 15px', backgroundColor: '#34495e', color: '#fff', borderLeft: '4px solid #1abc9c', textAlign: 'left', borderRadius: '4px', cursor: 'pointer', fontSize: '15px', fontWeight: 'bold' },
  contentArea: { flex: 1, padding: '30px', backgroundColor: '#f4f6f7' },
  section: { backgroundColor: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #e1e8ed' },
  headerFlex: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  subtext: { color: '#666', fontSize: '14px', marginTop: '4px' },
  searchWrapper: { width: '250px' },
  searchInput: { width: '100%', padding: '8px 12px', fontSize: '14px', borderRadius: '6px', border: '1px solid #ccc' },
  subHeading: { marginTop: '20px', marginBottom: '10px', fontSize: '18px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginTop: '15px' },
  card: { backgroundColor: '#fafafa', padding: '15px', borderRadius: '6px', border: '1px solid #ddd', display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { display: 'block' },
  inputGroup: { display: 'flex', alignItems: 'center', gap: '5px' },
  input: { width: '100%', padding: '6px', fontSize: '16px' },
  btnUpdate: { backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  btnDisabled: { backgroundColor: '#ccc', color: '#666', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'not-allowed' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '10px', backgroundColor: '#fff' },
  th: { borderBottom: '2px solid #ddd', padding: '10px', textAlign: 'left' },
  td: { borderBottom: '1px solid #ddd', padding: '10px' },
  docLink: { color: '#0066cc', textDecoration: 'underline', fontSize: '14px', cursor: 'pointer' },
  badgeSuccess: { backgroundColor: '#d4edda', color: '#155724', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  badgeWarning: { backgroundColor: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  btnSuccess: { backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' },
  btnDanger: { backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
  btnSecondary: { backgroundColor: '#6c757d', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' },
  btnCall: { backgroundColor: '#17a2b8', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer', fontWeight: 'bold' },
  revealedPhone: { marginTop: '4px', fontSize: '12px', fontWeight: 'bold' },
  btnChecked: { backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
  btnUnchecked: { backgroundColor: '#e2e6ea', color: '#333', border: '1px solid #ccc', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
  paymentContainer: { display: 'flex', flexDirection: 'column', gap: '10px' },
  paymentCard: { backgroundColor: '#fff', padding: '12px', borderRadius: '6px', border: '1px solid #ddd' },
  paymentCardAlert: { backgroundColor: '#fff8f8', padding: '12px', borderRadius: '6px', border: '1px solid #d9534f' },
  logContainer: { display: 'flex', flexDirection: 'column', gap: '15px' },
  logCard: { backgroundColor: '#fff', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #ffc107', border: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logHeader: { display: 'flex', gap: '15px', fontWeight: 'bold', marginBottom: '5px' },
  logType: { color: '#856404' },
  severity: { color: '#d9534f', fontSize: '12px' },
  logDetail: { margin: '4px 0', color: '#555' },
  actionRow: { display: 'flex', gap: '8px', alignItems: 'center' }
};