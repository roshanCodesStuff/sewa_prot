import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ClientView() {
  const [activeTab, setActiveTab] = useState('post');
  const [searchQuery, setSearchQuery] = useState('');
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

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

  const categoryIcons = {
    "Plumbing": "🚰",
    "Electrical": "⚡",
    "Carpentry": "🪚",
    "Masonry": "🧱",
    "Painting": "🎨",
    "Deep Home Cleaning": "🧹",
    "Sofa & Carpet Cleaning": "🛋️",
    "Pest Control": "🪲",
    "Water Tank Cleaning": "🛢️",
    "AC Repair & Service": "❄️",
    "Washing Machine Repair": "🧺",
    "Refrigerator Service": "🧊",
    "Microwave Repair": "📻",
    "Salon at Home (Women)": "💇‍♀️",
    "Men's Haircut & Grooming": "💈",
    "Full Body Massage": "💆‍♂️",
  };

  const subCategoriesData = {
    "Plumbing": ["Tap & Sink Leak Repair", "Pipe Fitting & Unclogging", "Drain Blockage Clearing", "Toilet Flush Repair", "Water Heater (Geyser) Service"],
    "Electrical": ["Switch & Socket Repair", "Short Circuit Inspection", "Ceiling Fan Installation", "MCB Box Maintenance", "Wiring & Re-wiring"],
    "Carpentry": ["Furniture Assembly", "Door Lock & Hinge Repair", "Custom Cabinet Work", "Bed Frame Fixing", "Wooden Polish & Restoration"],
    "Masonry": ["Tile & Marble Patching", "Wall Plaster Repair", "Brickwork & Concrete", "Waterproofing Crack Repair", "Floor Grouting"],
    "Painting": ["Single Room Accent Wall", "Full Interior Painting", "Exterior Wall Painting", "Waterproof Wall Coating", "Door & Window Spray Painting"],
    "Deep Home Cleaning": ["Full House Deep Clean", "Kitchen Deep Scrubbing", "Bathroom Disinfection", "Balcony & Glass Cleaning", "Post-Construction Clean"],
    "Sofa & Carpet Cleaning": ["3-Seater Sofa Shampooing", "Full Carpet Stain Removal", "Dining Chair Upholstery", "Mattress Steam Clean", "Curtain Cleaning"],
    "Pest Control": ["Ant Infestation Control", "Bed Bug Heat Treatment", "Cockroach Control Spray", "Termite Extermination", "Rodent & Rat Control"],
    "Water Tank Cleaning": ["500L Overhead Tank Clean", "1000L Overhead Tank Clean", "Underground Sump Cleaning", "Sludge Extraction & Sanitizing", "Commercial Tank Clean"],
    "AC Repair & Service": ["Seasonal Filter Cleaning", "Gas Refilling (R32/R410)", "Water Leakage Repair", "PCB Board Service", "AC Installation & Uninstallation"],
    "Washing Machine Repair": ["Front Load Service", "Top Load Drainage Issue", "Drum Bearing Replacement", "Spin Cycle Repair", "PCB Circuit Fix"],
    "Refrigerator Service": ["Gas Refill & Compressor", "Cooling Coil Defrosting", "Door Seal Gasket Change", "Water Leakage Fix", "Thermostat Replacement"],
    "Microwave Repair": ["Heating Element Replacement", "Turntable Motor Fix", "Touchpad Button Repair", "High Voltage Diode Fix", "Power Cable Replacement"],
    "Salon at Home (Women)": ["Facial & Cleanup", "Full Body Waxing", "Manicure & Pedicure", "Hair Spa & Blowdry", "Bridal Makeup Package"],
    "Men's Haircut & Grooming": ["Classic Haircut & Style", "Beard Trim & Shape", "Face De-Tan & Massage", "Head Oil Massage", "Hair Color & Dye"],
    "Full Body Massage": ["Deep Tissue Swedish Massage", "Ayurvedic Herbal Oil Massage", "Aromatherapy Stress Relief", "Foot Reflexology", "Back & Shoulder Relief"],
  };

  const popularSewas = [
    { title: "Furniture Assembly", category: "Carpentry", price: 500, image: "https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=600&q=80" },
    { title: "Ant & Pest Control", category: "Pest Control", price: 1500, image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=600&q=80" },
    { title: "AC Repair & Refill", category: "AC Repair & Service", price: 700, image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80" },
    { title: "Home Deep Cleaning", category: "Deep Home Cleaning", price: 1200, image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80" },
    { title: "Minor Plumbing Fixes", category: "Plumbing", price: 300, image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=600&q=80" },
    { title: "Short Circuit Check", category: "Electrical", price: 800, image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80" },
  ];

  const [showAlternatePhone, setShowAlternatePhone] = useState(false);
  const [jobForm, setJobForm] = useState({
    category: 'Plumbing',
    title: '',
    description: '',
    budget: 300,
    alternatePhone: '',
  });

  const [activeJobs, setActiveJobs] = useState([
    {
      id: "JOB-101",
      category: "Plumbing",
      title: "Tap & Sink Leak Repair",
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
      title: "Short Circuit Inspection",
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

  const [activeChatJobId, setActiveChatJobId] = useState("JOB-102");
  const [chatMessages, setChatMessages] = useState({
    "JOB-102": [
      { id: 1, sender: "Bikash Tamang", role: "worker", text: "Namaste sir! I have accepted the job request. I will arrive around 2 PM.", timestamp: "10:30 AM" },
      { id: 2, sender: "Aarav Sharma", role: "client", text: "Great, thank you! Please bring extra 16A circuit breakers if possible.", timestamp: "10:32 AM" }
    ]
  });
  const [newMessageText, setNewMessageText] = useState("");

  const [completedServices] = useState([
    { id: "JOB-088", category: "Deep Home Cleaning", title: "Full House Deep Clean", date: "2026-01-15", workerName: "Sita Thapa", paidAmount: 1400, review: { rating: 5, comment: "Excellent service. Very thorough cleaning of the balcony and kitchen." } },
    { id: "JOB-072", category: "AC Repair & Service", title: "Seasonal Filter Cleaning", date: "2025-11-02", workerName: "Hari Poudel", paidAmount: 850, review: { rating: 4, comment: "Quick response and fixed the cooling issue within an hour." } },
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
    { id: "CMP-301", jobId: "JOB-102", jobTitle: "Short Circuit Inspection", issue: "Technician arrived late and charged extra.", status: "Pending" }
  ]);

  const totalRequestsCount = activeJobs.length + completedServices.length;

  const filteredCategories = Object.keys(categoryIcons).filter((cat) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    
    const matchesCategory = cat.toLowerCase().includes(query);
    const subCats = subCategoriesData[cat] || [];
    const matchesSubcategory = subCats.some(sub => sub.toLowerCase().includes(query));

    return matchesCategory || matchesSubcategory;
  });

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const matches = Object.keys(categoryIcons).filter((cat) => {
      const q = query.toLowerCase().trim();
      if (!q) return true;
      return cat.toLowerCase().includes(q) || (subCategoriesData[cat] || []).some(sub => sub.toLowerCase().includes(q));
    });

    if (matches.length > 0 && !matches.includes(jobForm.category)) {
      handleCategoryChange(matches[0]);
    }
  };

  const handleCategoryChange = (cat) => {
    const defaultFloor = categoryFloors[cat] || 0;
    setJobForm({
      ...jobForm,
      category: cat,
      title: '',
      budget: defaultFloor,
    });
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!photo) {
      setErrorMessage('Please upload a photo before submitting.');
      return;
    }

    if (!video) {
      setErrorMessage('Please upload a 10-second video before submitting.');
      return;
    }

    const minFloor = categoryFloors[jobForm.category] || 0;

    if (Number(jobForm.budget) < minFloor) {
      setErrorMessage(`Budget cannot be lower than the NRS ${minFloor} floor for ${jobForm.category}.`);
      return;
    }

    if (!jobForm.title) {
      setErrorMessage('Please select a subcategory or enter a task title.');
      return;
    }

    const newJob = {
      id: `JOB-${Date.now().toString().slice(-3)}`,
      category: jobForm.category,
      title: jobForm.title,
      budget: Number(jobForm.budget),
      status: "Open",
      hasMedia: true,
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
    });
    setPhoto(null);
    setVideo(null);
    setShowAlternatePhone(false);
    alert('Job request posted successfully with required media!');
    setActiveTab('myJobs');
  };

  const handleSubcategoryClick = (subCat) => {
    setJobForm({
      ...jobForm,
      title: subCat
    });

    const formElement = document.getElementById('post-request-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickBookPopular = (sewa) => {
    setJobForm({
      category: sewa.category,
      title: sewa.title,
      description: `I need help with ${sewa.title}.`,
      budget: sewa.price,
      alternatePhone: '',
    });
    const formElement = document.getElementById('post-request-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
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
    <div style={styles.appContainer}>
      <header style={styles.navbar}>
        <div style={styles.navBrand}>
          {/* Clicking logo navigates to Book a Task */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            onClick={() => setActiveTab('post')}
          >
            <img
              src="/images/sewa_logo.png"
              alt="SEWA"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
        </div>
        <nav style={styles.navLinks}>
          <button
            style={activeTab === 'post' ? styles.navLinkActive : styles.navLink}
            onClick={() => setActiveTab('post')}
          >
            Book a Task
          </button>
          <button
            style={activeTab === 'myJobs' ? styles.navLinkActive : styles.navLink}
            onClick={() => setActiveTab('myJobs')}
          >
            My Requests ({activeJobs.length})
          </button>
          <button
            style={activeTab === 'messages' ? styles.navLinkActive : styles.navLink}
            onClick={() => setActiveTab('messages')}
          >
            Messages {assignedJobs.length > 0 ? `(${assignedJobs.length})` : ''}
          </button>
          <button
            style={activeTab === 'profile' ? styles.navLinkActive : styles.navLink}
            onClick={() => setActiveTab('profile')}
          >
            My Profile
          </button>
          <button
            style={activeTab === 'complaint' ? styles.navLinkActive : styles.navLink}
            onClick={() => setActiveTab('complaint')}
          >
            File Complaint
          </button>
          <Link to="/" style={styles.btnOutline}>Exit Client Portal</Link>
        </nav>
      </header>

      {activeTab === 'post' && (
        <>
          <section style={styles.heroSection}>
            <h1 style={styles.heroTitle}>Book trusted help for home tasks</h1>

            <div style={styles.searchBarContainer}>
              <input
                type="text"
                placeholder="What do you need help with?"
                value={searchQuery}
                onChange={handleSearchChange}
                style={styles.searchInput}
              />
              <button style={styles.searchBtn}>🔍</button>
            </div>

            <div style={styles.categoryStrip}>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    style={jobForm.category === cat ? styles.categoryIconActive : styles.categoryIcon}
                  >
                    <span style={{ fontSize: '26px' }}>{categoryIcons[cat]}</span>
                    <span style={styles.categoryLabel}>{cat}</span>
                  </button>
                ))
              ) : (
                <div style={{ color: '#888', padding: '10px' }}>No categories match your search query.</div>
              )}
            </div>

            {filteredCategories.includes(jobForm.category) && (
              <div style={styles.subcategoryWrapper}>
                <div style={styles.subcategoryHeader}>
                  Subcategories for <span style={{ color: '#008a5e' }}>{jobForm.category}</span>:
                </div>
                <div style={styles.chipRow}>
                  {(subCategoriesData[jobForm.category] || [])
                    .filter((subCat) =>
                      !searchQuery || subCat.toLowerCase().includes(searchQuery.toLowerCase().trim())
                    )
                    .map((subCat) => (
                      <button
                        key={subCat}
                        onClick={() => handleSubcategoryClick(subCat)}
                        style={jobForm.title === subCat ? styles.chipActive : styles.chip}
                      >
                        {subCat}
                      </button>
                    ))}
                </div>
              </div>
            )}
          </section>

          <section style={styles.popularSection}>
            <h2 style={styles.popularTitle}>Popular Sewas</h2>
            <div style={styles.popularGrid}>
              {popularSewas.map((sewa, idx) => (
                <div 
                  key={idx} 
                  style={styles.popularCard}
                  onClick={() => handleQuickBookPopular(sewa)}
                >
                  <img src={sewa.image} alt={sewa.title} style={styles.popularCardImg} />
                  <div style={styles.popularCardContent}>
                    <h4 style={styles.popularCardTitle}>{sewa.title}</h4>
                    <p style={styles.popularCardSub}>Projects starting at NRS {sewa.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="post-request-form" style={styles.formContainer}>
            <div style={styles.card}>
              <h2 style={styles.cardHeaderTitle}>Post a Request: {jobForm.category}</h2>
              <p style={styles.subtext}>Connect with vetted service providers for your home needs.</p>

              <form onSubmit={handleSubmit} style={styles.formGrid}>
                {errorMessage && (
                  <div style={styles.alertError}>
                    {errorMessage}
                  </div>
                )}

                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Selected Category</label>
                  <select
                    value={jobForm.category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    style={styles.formInput}
                  >
                    {Object.keys(categoryFloors).map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Task Title / Subcategory Selected</label>
                  <input
                    type="text"
                    placeholder="Click a subcategory pill above or type details here..."
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    style={styles.formInput}
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Detailed Description</label>
                  <textarea
                    rows="3"
                    placeholder="Provide details about the issue..."
                    value={jobForm.description}
                    onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                    style={styles.formTextarea}
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>
                    Upload Photo <span style={{ color: '#dc3545' }}>*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setPhoto(e.target.files[0])}
                    style={styles.fileInput}
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>
                    Upload 10-Sec Video <span style={{ color: '#dc3545' }}>*</span>
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    required
                    onChange={(e) => setVideo(e.target.files[0])}
                    style={styles.fileInput}
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>
                    Offered Budget (NRS) — <span style={{ color: '#008a5e' }}>Min threshold: NRS {selectedFloor}</span>
                  </label>
                  <input
                    type="number"
                    value={jobForm.budget}
                    min={selectedFloor}
                    onChange={(e) => setJobForm({ ...jobForm, budget: e.target.value })}
                    style={styles.formInput}
                  />
                </div>

                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Verified Phone</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                      type="text"
                      value={`${clientProfile.phone} (Verified)`}
                      disabled
                      style={{ ...styles.formInput, backgroundColor: '#f3f4f6', flex: 1 }}
                    />
                    {!showAlternatePhone && (
                      <button
                        type="button"
                        onClick={() => setShowAlternatePhone(true)}
                        style={styles.btnSecondarySmall}
                      >
                        + Alternate Contact
                      </button>
                    )}
                  </div>
                </div>

                {showAlternatePhone && (
                  <div style={styles.fieldGroup}>
                    <label style={styles.fieldLabel}>Alternate Phone Number</label>
                    <input
                      type="text"
                      placeholder="+977 98XXXXXXXX"
                      value={jobForm.alternatePhone}
                      onChange={(e) => setJobForm({ ...jobForm, alternatePhone: e.target.value })}
                      style={styles.formInput}
                    />
                  </div>
                )}

                <button type="submit" style={styles.primaryBtn}>
                  Submit Request
                </button>
              </form>
            </div>
          </section>
        </>
      )}

      {/* Active Requests View */}
      {activeTab === 'myJobs' && (
        <section style={styles.mainContent}>
          <h2>My Active Requests</h2>
          <p style={styles.subtext}>Manage bids and view assigned technicians.</p>

          <div style={styles.tableCard}>
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
                          Chat
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

      {/* Messaging View */}
      {activeTab === 'messages' && (
        <section style={styles.mainContent}>
          <h2>Messages & Work Coordination</h2>
          <p style={styles.subtext}>Chat with assigned technicians to discuss schedules.</p>

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
                      <button type="submit" style={styles.primaryBtnSmall}>Send</button>
                    </form>
                  </>
                ) : (
                  <div style={{ padding: '20px', color: '#888' }}>Select a conversation to start chatting.</div>
                )}
              </div>
            </div>
          ) : (
            <div style={{ color: '#888', padding: '20px 0' }}>
              No assigned technicians yet.
            </div>
          )}
        </section>
      )}

      {/* User Profile View */}
      {activeTab === 'profile' && (
        <section style={styles.mainContent}>
          <h2>My Profile & Account</h2>
          <p style={styles.subtext}>View profile overview and completed task history.</p>

          <div style={styles.card}>
            <div style={styles.profileGrid}>
              <div><strong>Full Name:</strong> {clientProfile.name}</div>
              <div><strong>Email:</strong> {clientProfile.email}</div>
              <div><strong>Phone:</strong> {clientProfile.phone}</div>
              <div><strong>Location:</strong> {clientProfile.address}</div>
              <div><strong>Member Since:</strong> {clientProfile.memberSince}</div>
              <div><strong>Total Requests:</strong> {totalRequestsCount}</div>
            </div>
          </div>

          <h3 style={styles.subHeading}>Completed Services & Reviews ({completedServices.length})</h3>
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

      {/* Filing Complaints View */}
      {activeTab === 'complaint' && (
        <section style={styles.mainContent}>
          <h2>File a Service Complaint</h2>
          <p style={styles.subtext}>Report issues related to delay, poor quality, or incorrect billing.</p>

          <div style={styles.card}>
            <form onSubmit={handleFileComplaint} style={styles.formGrid}>
              <div style={styles.fieldGroup}>
                <label style={styles.fieldLabel}>Search and Select Job</label>
                
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
                      placeholder="Type Job ID, title, or category..."
                      value={complaintJobSearch}
                      onChange={(e) => setComplaintJobSearch(e.target.value)}
                      style={styles.formInput}
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

              <div style={styles.fieldGroup}>
                <label style={styles.fieldLabel}>Describe Complaint</label>
                <textarea
                  rows="4"
                  placeholder="Explain what went wrong..."
                  value={complaintForm.issue}
                  onChange={(e) => setComplaintForm({ ...complaintForm, issue: e.target.value })}
                  style={styles.formTextarea}
                />
              </div>

              <button type="submit" style={styles.btnDanger}>Submit Complaint</button>
            </form>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3>Submitted Complaints ({complaints.length})</h3>
            {complaints.length > 0 ? (
              <div style={styles.tableCard}>
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
              </div>
            ) : (
              <p style={{ color: '#888', marginTop: '10px' }}>No complaints filed yet.</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

const styles = {
  appContainer: { fontFamily: 'Inter, system-ui, -apple-system, sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', color: '#2d3748' },
  navbar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb' },
  logoText: { fontSize: '28px', fontWeight: '800', color: '#008a5e', letterSpacing: '-0.5px' },
  navLinks: { display: 'flex', gap: '20px', alignItems: 'center' },
  navLink: { background: 'none', border: 'none', fontSize: '15px', color: '#4b5563', cursor: 'pointer', fontWeight: '500' },
  navLinkActive: { background: 'none', border: 'none', fontSize: '15px', color: '#008a5e', cursor: 'pointer', fontWeight: '700' },
  btnOutline: { border: '1px solid #008a5e', color: '#008a5e', padding: '8px 16px', borderRadius: '20px', textDecoration: 'none', fontSize: '14px', fontWeight: '600' },
  heroSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px 30px 20px', backgroundColor: '#ffffff', textAlign: 'center', borderBottom: '1px solid #f0f0f0' },
  heroTitle: { fontSize: '38px', fontWeight: '800', color: '#0e4235', marginBottom: '24px', letterSpacing: '-1px' },
  searchBarContainer: { display: 'flex', width: '100%', maxWidth: '600px', border: '1px solid #d1d5db', borderRadius: '30px', padding: '4px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '30px' },
  searchInput: { flex: 1, border: 'none', padding: '12px 24px', borderRadius: '30px 0 0 30px', outline: 'none', fontSize: '15px' },
  searchBtn: { backgroundColor: '#008a5e', border: 'none', color: '#fff', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '16px' },
  categoryStrip: { display: 'flex', gap: '24px', marginBottom: '25px', overflowX: 'auto', padding: '10px 5px', width: '100%', maxWidth: '1100px', scrollbarWidth: 'thin' },
  categoryIcon: { display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#4b5563', gap: '8px', minWidth: '95px', padding: '8px', borderRadius: '8px', transition: 'all 0.2s', opacity: 1 },
  categoryIconActive: { display: 'flex', flexDirection: 'column', alignItems: 'center', border: 'none', cursor: 'pointer', color: '#008a5e', gap: '8px', minWidth: '95px', padding: '8px', borderRadius: '8px', backgroundColor: '#e6f4f0', fontWeight: 'bold', opacity: 1 },
  categoryLabel: { fontSize: '12px', textAlign: 'center', lineHeight: '1.3', wordWrap: 'break-word', width: '100%' },
  subcategoryWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', maxWidth: '1000px', width: '100%' },
  subcategoryHeader: { fontSize: '14px', fontWeight: '600', color: '#4b5563' },
  chipRow: { display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' },
  chip: { border: '1px solid #d1d5db', backgroundColor: '#ffffff', padding: '8px 18px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', color: '#374151', transition: 'all 0.2s' },
  chipActive: { border: '1px solid #008a5e', backgroundColor: '#008a5e', padding: '8px 18px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', color: '#ffffff', fontWeight: '600', boxShadow: '0 2px 4px rgba(0,138,94,0.2)' },
  popularSection: { maxWidth: '1100px', margin: '40px auto 10px auto', padding: '0 20px' },
  popularTitle: { fontSize: '24px', fontWeight: '800', color: '#0e4235', marginBottom: '20px' },
  popularGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' },
  popularCard: { backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.2s' },
  popularCardImg: { width: '100%', height: '140px', objectFit: 'cover' },
  popularCardContent: { padding: '16px' },
  popularCardTitle: { fontSize: '16px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0' },
  popularCardSub: { fontSize: '13px', color: '#6b7280', margin: 0 },
  formContainer: { maxWidth: '750px', margin: '30px auto', padding: '0 20px' },
  mainContent: { maxWidth: '900px', margin: '30px auto', padding: '0 20px' },
  card: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '28px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  cardHeaderTitle: { color: '#0e4235', marginTop: 0, marginBottom: '6px' },
  subtext: { color: '#666', fontSize: '14px', marginTop: '0', marginBottom: '20px' },
  formGrid: { display: 'flex', flexDirection: 'column', gap: '16px' },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 },
  fieldLabel: { fontSize: '14px', fontWeight: '600', color: '#374151' },
  formInput: { padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' },
  formTextarea: { padding: '10px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', resize: 'vertical' },
  fileInput: { padding: '6px', fontSize: '13px', border: '1px dashed #ccc', borderRadius: '6px', backgroundColor: '#fafafa' },
  primaryBtn: { backgroundColor: '#008a5e', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '24px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', alignSelf: 'flex-start' },
  primaryBtnSmall: { backgroundColor: '#008a5e', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '18px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' },
  btnDanger: { backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold', alignSelf: 'flex-start' },
  btnDangerSmall: { backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '12px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  btnChatSmall: { backgroundColor: '#008a5e', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '12px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  btnSuccess: { backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '12px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  btnSecondarySmall: { backgroundColor: '#6c757d', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '14px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' },
  btnCall: { backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '12px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' },
  alertError: { backgroundColor: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '8px', fontSize: '14px', marginBottom: '16px' },
  tableCard: { backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' },
  th: { borderBottom: '1px solid #e5e7eb', padding: '12px', textAlign: 'left', backgroundColor: '#f9fafb', fontSize: '13px', color: '#4b5563' },
  td: { borderBottom: '1px solid #e5e7eb', padding: '12px', fontSize: '14px' },
  badgeSuccess: { backgroundColor: '#e6f4f0', color: '#008a5e', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' },
  badgeWarning: { backgroundColor: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' },
  badgeDanger: { backgroundColor: '#f8d7da', color: '#721c24', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' },
  subHeading: { marginTop: '25px', marginBottom: '15px', fontSize: '18px' },
  profileGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '15px' },
  historyContainer: { display: 'flex', flexDirection: 'column', gap: '15px' },
  historyCard: { backgroundColor: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #e5e7eb' },
  historyHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' },
  historySub: { fontSize: '13px', color: '#666', marginBottom: '10px' },
  reviewBox: { backgroundColor: '#f9fafb', padding: '10px', borderRadius: '6px', borderLeft: '3px solid #008a5e' },
  selectedJobBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', backgroundColor: '#e6f4f0', border: '1px solid #a3e0ce', borderRadius: '8px' },
  searchResultsBox: { border: '1px solid #ccc', borderRadius: '8px', maxHeight: '150px', overflowY: 'auto', marginTop: '4px', backgroundColor: '#fff' },
  searchResultItem: { padding: '8px 12px', cursor: 'pointer', borderBottom: '1px solid #eee' },
  bidsModalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  bidsModal: { backgroundColor: '#fff', padding: '24px', borderRadius: '12px', width: '90%', maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px' },
  btnClose: { backgroundColor: '#6c757d', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '12px', cursor: 'pointer' },
  bidsList: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' },
  bidCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' },
  bidAmount: { color: '#008a5e', fontWeight: 'bold', fontSize: '14px', marginTop: '2px' },
  chatContainer: { display: 'flex', border: '1px solid #e5e7eb', borderRadius: '12px', minHeight: '400px', backgroundColor: '#fff', overflow: 'hidden' },
  chatSidebar: { width: '220px', borderRight: '1px solid #eee', padding: '12px', backgroundColor: '#fafafa' },
  chatTab: { padding: '10px', borderRadius: '8px', cursor: 'pointer', marginBottom: '6px', backgroundColor: '#fff', border: '1px solid #eee' },
  chatTabActive: { padding: '10px', borderRadius: '8px', cursor: 'pointer', marginBottom: '6px', backgroundColor: '#e6f4f0', border: '1px solid #a3e0ce' },
  chatBox: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  chatHeader: { padding: '12px 16px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fafafa' },
  chatMessagesList: { flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' },
  clientBubble: { alignSelf: 'flex-end', backgroundColor: '#008a5e', color: '#fff', padding: '10px 14px', borderRadius: '12px 12px 0 12px', maxWidth: '70%', fontSize: '14px' },
  workerBubble: { alignSelf: 'flex-start', backgroundColor: '#f3f4f6', color: '#333', padding: '10px 14px', borderRadius: '12px 12px 12px 0', maxWidth: '70%', fontSize: '14px' },
  msgSender: { fontSize: '11px', opacity: 0.8, marginBottom: '2px', fontWeight: 'bold' },
  msgTime: { fontSize: '10px', opacity: 0.7, marginTop: '4px', textAlign: 'right' },
  chatInputRow: { display: 'flex', gap: '10px', padding: '12px', borderTop: '1px solid #eee', backgroundColor: '#fff' },
  chatInput: { flex: 1, padding: '8px 12px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '18px' }
};