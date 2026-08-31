import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ClientView from './pages/ClientView';
import WorkerView from './pages/WorkerView';
import AdminView from './pages/AdminView';
import './App.css';

function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Plumbing');

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans antialiased overflow-x-hidden">

      {/* Main Navigation */}
      <header className="container mx-auto px-6 py-4 flex justify-between items-center" data-purpose="main-navigation">
        <Link to="/" className="flex items-center space-x-2 group">
          <img
            src="/images/sewa_logo.png"
            alt="SEWA - On-Demand Services"
            className="h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>
      </header>

      {/* BEGIN: Hero Section */}
      <section className="container mx-auto px-6 pt-8 pb-20 relative" data-purpose="hero-section" id="services">
        {/* Background Decorative Blob */}
        <div className="absolute top-0 left-0 w-full lg:w-4/5 h-[580px] bg-sewa-light rounded-[100px] -z-10 -ml-8 mt-10 hidden lg:block opacity-70"></div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="max-w-xl relative z-10">

            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.15] text-gray-900 mb-6 tracking-tight">
              Reliable Repair<br />
              Services at<br />
              <span className="relative inline-block text-sewa">
                Your Doorstep
                <span className="absolute -bottom-2 left-0 w-28 h-1.5 bg-sewa rounded-full"></span>
              </span>
            </h1>

            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Your ultimate home maintenance companion. Connects you with verified professionals instantly with fair price floors and direct bidding.
            </p>
          </div>
          {/* Right Hero Content - Interactive Phone Mockup & Floating Cards */}
          <div className="relative h-[580px] w-full flex justify-center items-center floating-animation z-10">
            {/* Main Phone Mockup */}
            <div className="w-[300px] h-[540px] bg-white rounded-[44px] border-[9px] border-gray-900 shadow-2xl overflow-hidden relative flex flex-col">
              {/* Phone Speaker Notch */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-900 rounded-full z-30"></div>

              {/* App Header */}
              <div className="bg-sewa h-44 p-6 pt-8 text-white rounded-b-3xl relative overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 opacity-10 bg-radial-gradient"></div>
                <div className="relative z-10 flex justify-between items-center">
                  <div className="font-black text-lg tracking-wider">SEWA</div>
                  <div className="w-8 h-8 rounded-full bg-blue-400/50 border-2 border-white/80 flex items-center justify-center text-xs font-bold">
                    NP
                  </div>
                </div>
                <h2 className="relative z-10 mt-3 text-xl font-bold">Need a repair?</h2>
                <p className="relative z-10 text-[11px] text-blue-100">Find top verified pros near you</p>
              </div>

              {/* Search Bar Overlay */}
              <div className="mx-4 -mt-6 bg-white p-2.5 rounded-2xl shadow-lg flex items-center space-x-2 relative z-20 border border-gray-100">
                <svg className="w-4 h-4 text-sewa flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <input
                  type="text"
                  className="w-full text-xs border-none outline-none text-gray-700 bg-transparent"
                  placeholder="Search service e.g. Plumber..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* In-Phone Content Area */}
              <div className="p-4 flex-1 overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-xs text-gray-800">Popular Services</h3>
                  <Link to="/client" className="text-[11px] font-semibold text-sewa hover:underline">See all</Link>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('Plumbing')}
                    className={`p-2.5 rounded-xl text-center transition-all ${selectedCategory === 'Plumbing'
                      ? 'bg-blue-100 border border-blue-300 text-sewa font-semibold shadow-sm'
                      : 'bg-blue-50 text-gray-700 hover:bg-blue-100/70'
                      }`}
                  >
                    <div className="w-8 h-8 mx-auto bg-blue-200/80 rounded-full mb-1.5 flex items-center justify-center text-sewa">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <span className="text-[11px] font-medium block">Plumbing</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedCategory('Electrical')}
                    className={`p-2.5 rounded-xl text-center transition-all ${selectedCategory === 'Electrical'
                      ? 'bg-amber-100 border border-amber-300 text-amber-900 font-semibold shadow-sm'
                      : 'bg-amber-50 text-gray-700 hover:bg-amber-100/70'
                      }`}
                  >
                    <div className="w-8 h-8 mx-auto bg-amber-200/80 rounded-full mb-1.5 flex items-center justify-center text-amber-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="text-[11px] font-medium block">Electrical</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedCategory('Carpentry')}
                    className={`p-2.5 rounded-xl text-center transition-all ${selectedCategory === 'Carpentry'
                      ? 'bg-emerald-100 border border-emerald-300 text-emerald-900 font-semibold shadow-sm'
                      : 'bg-emerald-50 text-gray-700 hover:bg-emerald-100/70'
                      }`}
                  >
                    <div className="w-8 h-8 mx-auto bg-emerald-200/80 rounded-full mb-1.5 flex items-center justify-center text-emerald-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                      </svg>
                    </div>
                    <span className="text-[11px] font-medium block">Carpentry</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedCategory('Cleaning')}
                    className={`p-2.5 rounded-xl text-center transition-all ${selectedCategory === 'Cleaning'
                      ? 'bg-purple-100 border border-purple-300 text-purple-900 font-semibold shadow-sm'
                      : 'bg-purple-50 text-gray-700 hover:bg-purple-100/70'
                      }`}
                  >
                    <div className="w-8 h-8 mx-auto bg-purple-200/80 rounded-full mb-1.5 flex items-center justify-center text-purple-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </div>
                    <span className="text-[11px] font-medium block">Cleaning</span>
                  </button>
                </div>

                <Link
                  to="/client"
                  className="block w-full bg-sewa text-white text-center py-2 rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Create Instant Job Post
                </Link>
              </div>
            </div>

            {/* Floating Card 1: Quick Plumber Fix */}
            <div className="absolute top-28 -left-8 md:-left-16 bg-white p-3.5 rounded-2xl shadow-soft w-48 z-20 border border-gray-100 transition-transform hover:scale-105">
              <div className="h-24 bg-gray-100 rounded-xl mb-2.5 overflow-hidden">
                <img
                  alt="Plumbing Service"
                  className="w-full h-full object-cover"
                  src="/images/stitch/plumbing.jpg"
                  onError={(e) => {
                    e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjcwW7r3RVUUE7Xd1tXtWUmCSeqPk0DgQ5wtkqoyKFWvDFRbohEsItuEiyPR0StVKFNzHDiUDX5rl6B2gwxpM45lKDkqP3oOCduH5TAZ6nK2ffeCcvJ0ojgJ-K1Kof_BAprnWAkjIN3dRFY6lM5DVrfb3RgAs3lQy-IbYSfV6gAj_t7CEUUap7sg_BIQAsNKPVcknHr_YLbdQJnfR9LKMdFbaHWmfLMSOzY8yNLNlJnP7DXNCHLpMmg";
                  }}
                />
              </div>
              <h4 className="font-bold text-xs text-gray-900">Quick Plumber Fix</h4>
              <div className="flex items-center justify-between mt-2">
                <div className="flex -space-x-1.5">
                  <div className="w-5 h-5 rounded-full bg-blue-300 border border-white flex items-center justify-center text-[8px] font-bold text-white">R</div>
                  <div className="w-5 h-5 rounded-full bg-amber-300 border border-white flex items-center justify-center text-[8px] font-bold text-white">S</div>
                  <div className="w-5 h-5 rounded-full bg-emerald-300 border border-white flex items-center justify-center text-[8px] font-bold text-white">B</div>
                </div>
                <span className="text-[10px] text-sewa font-semibold">24 Pros Near</span>
              </div>
            </div>

            {/* Floating Card 2: Ram Thapa - Expert Electrician */}
            <div className="absolute bottom-16 -right-6 md:-right-12 bg-white p-3 rounded-2xl shadow-soft z-20 flex items-center space-x-3 border border-gray-100 transition-transform hover:scale-105">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex-shrink-0 overflow-hidden border-2 border-amber-300">
                <img
                  alt="Ram Thapa"
                  className="w-full h-full object-cover"
                  src="/images/stitch/ram_electrician.jpg"
                  onError={(e) => {
                    e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuBrD3VtAHQmbbp8dzfNz16sekHhRlwyOM860vtmtsGFHogyOdPMLuHRyuvsVxPqMrEiK6pjeZ6727ft7Ae4RakHofKIoUxRXj43h344yGU1FHV83gXY2QQS18s0FrpqdzRajXwQvN8hDXJ1uGd6hCqu8o5Pi4TE2ZFTOSh4o1VVRqbv2PKUlO41xxwokEyegBVxsuBog5wnyajYQV5QjRhY-_4Avb1HEznESd4y8Z2X73lbFbxbUel7nw";
                  }}
                />
              </div>
              <div>
                <div className="font-bold text-xs text-gray-900">Ram Thapa</div>
                <div className="text-[11px] text-gray-500">Expert Electrician</div>
                <div className="flex items-center text-[10px] text-amber-500 font-semibold mt-0.5">
                  <span>★ 4.9 (128 jobs)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <a href="#network" className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center animate-bounce border border-gray-100 text-gray-400 hover:text-sewa transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </a>
        </div>
      </section>
      {/* END: Hero Section */}

      {/* BEGIN: Prototype Role Launcher Cards */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 border-y border-gray-200/80" id="prototype-portals">
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">
              Live Working Prototype • 3 Interactive Portals
            </h3>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Experience the 3 SEWA Stakeholder Portals
            </h2>
            <p className="text-gray-600 text-sm md:text-base mt-3 leading-relaxed">
              SEWA fixes the fragmented home-repair market in Nepal with three interconnected live roles.
              Explore how transparent category price floors, photo/video inspections, counter-bidding, and escrow protections operate across each user role.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Card 1: Admin Console */}
            <div className="bg-white rounded-3xl p-7 shadow-md border-2 border-purple-100 hover:border-purple-500 hover:shadow-xl transition-all shadow-card-hover flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-28 h-28 bg-purple-50 rounded-bl-full -z-0 group-hover:bg-purple-100/70 transition-colors"></div>

              <div className="relative z-10">
                {/* Role Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center shadow-sm border border-purple-200">
                    <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full border border-purple-200">
                    Governance &amp; Ops
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-gray-900 mb-1">Admin Console</h3>
                <p className="text-xs font-semibold text-purple-700 mb-4 flex items-center space-x-1">
                  <span>Persona: Operations &amp; Compliance</span>
                  <span>• Superadmin</span>
                </p>

                <p className="text-gray-600 text-xs leading-relaxed mb-5">
                  Gives platform managers absolute control over wage floor regulation, worker identity verification, payment audits, and anti-bypass enforcement.
                </p>

                {/* Core Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-2.5 text-xs text-gray-700">
                    <svg className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">20 Category Floor Rates:</strong> Live adjustable minimum pricing engine across Nepal trades (Plumbing, Electrical, AC, Masonry).
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5 text-xs text-gray-700">
                    <svg className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2H9.17A3.001 3.001 0 0112 14z" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Worker KYC &amp; Cert Audits:</strong> Review Nepal Citizenship IDs, vocational trade licenses, and approve or reject profiles.
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5 text-xs text-gray-700">
                    <svg className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Payment Gateway Reconciliation:</strong> Track eSewa, Khalti &amp; ConnectIPS credit sales and resolve disputed transactions.
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5 text-xs text-gray-700">
                    <svg className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Anti-Bypass &amp; Dispute Resolver:</strong> Detect off-platform communication leaks and handle client escrow complaints.
                    </div>
                  </div>
                </div>

                {/* Preloaded Test State Box */}
                <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-3.5 mb-6 text-purple-950">
                  <div className="text-[11px] font-extrabold uppercase tracking-wide text-purple-800 mb-1 flex items-center justify-between">
                    <span>Live Test Data Included</span>
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  </div>
                  <ul className="text-[11px] space-y-1 text-purple-900">
                    <li>• <strong>Category Price Floors:</strong> 20 active service trade minimums</li>
                    <li>• <strong>Verification Queue:</strong> 8 worker profiles (4 Approved, 4 Pending)</li>
                    <li>• <strong>Dispute Logs:</strong> 7 multi-gateway transaction audits</li>
                  </ul>
                </div>
              </div>

              <div className="relative z-10 pt-2 border-t border-gray-100">
                <Link
                  to="/admin"
                  className="w-full text-center py-3 px-5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-xs tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Launch Admin Console (Superadmin)</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Card 2: Worker Portal */}
            <div className="bg-white rounded-3xl p-7 shadow-md border-2 border-amber-100 hover:border-amber-500 hover:shadow-xl transition-all shadow-card-hover flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-28 h-28 bg-amber-50 rounded-bl-full -z-0 group-hover:bg-amber-100/70 transition-colors"></div>

              <div className="relative z-10">
                {/* Role Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shadow-sm border border-amber-200">
                    <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v2a1 1 0 01-1 1h-1a7 7 0 01-14 0H3a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 11a5 5 0 00-4 0v6a2 2 0 002 2h0a2 2 0 002-2v-6z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200">
                    Supply Side
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-gray-900 mb-1">Worker Portal</h3>
                <p className="text-xs font-semibold text-amber-700 mb-4 flex items-center space-x-1">
                  <span>Persona: Ramesh Sharma</span>
                  <span>• CTEVT Master Plumber</span>
                </p>

                <p className="text-gray-600 text-xs leading-relaxed mb-5">
                  Provides verified tradespeople with visual request feeds, video inspections before travel, fair counter-bidding, and instant credit wallet management.
                </p>

                {/* Core Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-2.5 text-xs text-gray-700">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Interactive Job Feed:</strong> Discover local Kathmandu repairs with distance markers, budget tags, and urgency alerts.
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5 text-xs text-gray-700">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Pre-Job Video Inspection:</strong> Open client videos in modal to assess required parts before driving to site.
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5 text-xs text-gray-700">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Smart Counter-Bidding:</strong> Submit tailored price quotes and estimated completion times with direct negotiation notes.
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5 text-xs text-gray-700">
                    <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Bidding Credit Wallet:</strong> Spend 1 credit per bid, top up with simulated eSewa / Khalti checkout packs.
                    </div>
                  </div>
                </div>

                {/* Preloaded Test State Box */}
                <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5 mb-6 text-amber-950">
                  <div className="text-[11px] font-extrabold uppercase tracking-wide text-amber-800 mb-1 flex items-center justify-between">
                    <span>Live Test Data Included</span>
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  </div>
                  <ul className="text-[11px] space-y-1 text-amber-900">
                    <li>• <strong>Credit Balance:</strong> 18 Bidding Credits in wallet</li>
                    <li>• <strong>Feed Jobs:</strong> 6 local open jobs available to inspect &amp; bid</li>
                    <li>• <strong>Track Record:</strong> 24 completed jobs, ★ 4.8 Rating, CTEVT badge</li>
                  </ul>
                </div>
              </div>

              <div className="relative z-10 pt-2 border-t border-gray-100">
                <Link
                  to="/worker"
                  className="w-full text-center py-3 px-5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Launch Worker Portal (Ramesh)</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Card 3: Client Portal */}
            <div className="bg-white rounded-3xl p-7 shadow-md border-2 border-emerald-100 hover:border-emerald-500 hover:shadow-xl transition-all shadow-card-hover flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-50 rounded-bl-full -z-0 group-hover:bg-emerald-100/70 transition-colors"></div>

              <div className="relative z-10">
                {/* Role Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-sm border border-emerald-200">
                    <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
                    Demand Side
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-gray-900 mb-1">Client Portal</h3>
                <p className="text-xs font-semibold text-emerald-700 mb-4 flex items-center space-x-1">
                  <span>Persona: Aarav Sharma</span>
                  <span>• Kathmandu, Ward 3</span>
                </p>

                <p className="text-gray-600 text-xs leading-relaxed mb-5">
                  Empowers clients to post detailed fault tickets with video proof, receive fair competitive bids, and safely release payment after verifying quality.
                </p>

                {/* Core Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-2.5 text-xs text-gray-700">
                    <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Photo & Video Fault Upload:</strong> Attach live footage so technicians can diagnose issues before arriving.
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5 text-xs text-gray-700">
                    <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Price Floor Protection:</strong> Built-in minimum rate validation (e.g., Plumbing min NRS 300) prevents lowballing and guarantees worker compensation.
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5 text-xs text-gray-700">
                    <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Bid Comparison Matrix:</strong> Compare incoming offers, worker ratings (★ 4.8), CTEVT trade certifications, and arrival ETA.
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5 text-xs text-gray-700">
                    <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <div>
                      <strong className="text-gray-900">Escrow & Quality Verification:</strong> Review technician completion proof photo before releasing funds or opening a dispute.
                    </div>
                  </div>
                </div>

                {/* Preloaded Test State Box */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3.5 mb-6 text-emerald-950">
                  <div className="text-[11px] font-extrabold uppercase tracking-wide text-emerald-800 mb-1 flex items-center justify-between">
                    <span>Live Test Data Included</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <ul className="text-[11px] space-y-1 text-emerald-900">
                    <li>• <strong>Active Request:</strong> JOB-101 (Kitchen Sink Leak)</li>
                    <li>• <strong>Bids Received:</strong> 4 pros bidding NRS 450 - NRS 600</li>
                    <li>• <strong>Ongoing Jobs:</strong> 1 job in progress with milestone timer</li>
                  </ul>
                </div>
              </div>

              <div className="relative z-10 pt-2 border-t border-gray-100">
                <Link
                  to="/client"
                  className="w-full text-center py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
                >
                  <span>Launch Client Portal (Aarav)</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: Prototype Role Launcher Cards */}

      {/* BEGIN: Community & Network Section */}
      <section className="container mx-auto px-6 py-24 text-center relative overflow-hidden" data-purpose="community-section" id="network">
        <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Build up a network</h3>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 relative inline-block">
          Join Thousands of Skilled<br />Pros &amp; Satisfied Clients
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-sewa rounded-full"></span>
        </h2>

        <div className="relative w-full max-w-4xl mx-auto h-[440px] mt-12">
          {/* Subtle Network Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0f52ba_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* SVG Animated Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 800 400" preserveAspectRatio="none">
            <path
              d="M 160 100 Q 320 60 400 200 T 640 120"
              fill="none"
              stroke="#93c5fd"
              strokeDasharray="6,6"
              strokeWidth="2"
              className="opacity-70"
            />
            <path
              d="M 220 340 Q 340 300 400 200 T 580 320"
              fill="none"
              stroke="#fca5a5"
              strokeDasharray="6,6"
              strokeWidth="2"
              className="opacity-70"
            />
          </svg>

          {/* Central Featured Card */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sewa rounded-3xl p-1 z-20 shadow-soft w-52 hover:scale-105 transition-transform">
            <div className="bg-white rounded-[22px] overflow-hidden">
              <div className="h-28 bg-gray-200 overflow-hidden">
                <img
                  alt="Renovation Job"
                  className="w-full h-full object-cover"
                  src="/images/stitch/renovation.jpg"
                  onError={(e) => {
                    e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuCZZui1pW172pvUgSTcrElCNttSik0geL4IRNk2W1-g1sG68Pj5IgmcHfsvVgzUsJTt4e-OFoFq3Xzky3xgv1OaCNkZ1MEuSNx0Wag82qIYibX66WTfC6680Z9mQ-MHDb_pjNRrFCm-G9i-688W7PcsmCubXsEPU4FewYxg9i3dQGmIIYMPwSZXzj6ZliernxKadgn9gnpURxx5-Fgmpwz6IWwhq-oKjY9rns5qOdJXLyVQKO0bdK4U6A";
                  }}
                />
              </div>
              <div className="p-3 text-center">
                <div className="font-bold text-xs text-gray-900">Full Renovation</div>
                <div className="text-[10px] text-gray-500">Kathmandu Valley</div>
                <div className="flex justify-center -space-x-1.5 mt-2">
                  <div className="w-6 h-6 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-[9px] font-bold">R</div>
                  <div className="w-6 h-6 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center text-[9px] font-bold">S</div>
                  <div className="w-6 h-6 rounded-full bg-black text-white text-[9px] flex items-center justify-center border-2 border-white font-bold">+5</div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Avatar 1: Rajesh - Kathmandu */}
          <div className="absolute top-6 left-12 md:left-24 bg-white p-2.5 rounded-2xl shadow-md z-10 text-center w-28 border border-gray-100 transition-transform hover:scale-110">
            <div className="w-12 h-12 mx-auto rounded-full bg-yellow-100 overflow-hidden -mt-6 border-4 border-white shadow-sm">
              <img
                alt="Rajesh"
                className="w-full h-full object-cover"
                src="/images/stitch/rajesh.jpg"
                onError={(e) => {
                  e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuArPqRa7G74NEcafkCBJ3DKAahOhQanwL-bw_r2p2a0N9XGV19m2S2GYjQy4Px1cBMiZvFWbqquhIOpxoGcJm7IsEW7kQgg6tqgZVeJSzvui4UMrtff8smUQrOe1l9zCCrHozOG0K_jqwHaXj8SDu0HFuiXdugKDV-vYE1-0S11cvOvlGSN_AmlvEbYfeVEC_dBS-TiJ0UUcml0lmUgYZN61cyiM53fq92fO-iXU6Eq8dpVZZDk_fcMKQ";
                }}
              />
            </div>
            <div className="font-bold text-xs mt-1 text-gray-800">Rajesh</div>
            <div className="text-[10px] text-gray-500 font-medium">Kathmandu</div>
          </div>

          {/* Floating Avatar 2: Sunita - Lalitpur */}
          <div className="absolute bottom-6 left-16 md:left-32 bg-white p-2.5 rounded-2xl shadow-md z-10 text-center w-28 border border-gray-100 transition-transform hover:scale-110">
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 overflow-hidden -mt-6 border-4 border-white shadow-sm">
              <img
                alt="Sunita"
                className="w-full h-full object-cover"
                src="/images/stitch/sunita.jpg"
                onError={(e) => {
                  e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuA-nQPIHz5UZVviTqS2-Ctk8YcOGdmMafg83dnr44_C-ikwhl-BMSByLwq5ZOiT37BIjSY-RRELyno8512dxdjLBw6DdYPAaAIeqcbSP5bhiYDVe5guALJe12YfYJSttcdlu1IwFf88STprPIY-UjW0AvZSEF2LPGDTypvOjpy8mJmnVn3UsAyKW2XrtyyfGNOiSBl0FAf4fmWmHpaLMddkl5FDTARFNkMRhLbjz-Bs4B_OvPQhjwtksQ";
                }}
              />
            </div>
            <div className="font-bold text-xs mt-1 text-gray-800">Sunita</div>
            <div className="text-[10px] text-gray-500 font-medium">Lalitpur</div>
          </div>

          {/* Floating Avatar 3: Bikash - Bhaktapur */}
          <div className="absolute top-10 right-12 md:right-28 bg-white p-2.5 rounded-2xl shadow-md z-10 text-center w-28 border border-gray-100 transition-transform hover:scale-110">
            <div className="w-12 h-12 mx-auto rounded-full bg-green-100 overflow-hidden -mt-6 border-4 border-white shadow-sm">
              <img
                alt="Bikash"
                className="w-full h-full object-cover"
                src="/images/stitch/bikash.jpg"
                onError={(e) => {
                  e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuAvhFPe9MUHPNOPlAVTs3HyU2kyC0rz8SnEaG0gf9Yiu0BSnXK3XTdzF3qN_48T0F402iQfjUgbVg6qv-gpjsuNSfrFWJ34WB6GdczLpB6zoawZaWKXxdIc_P0B7QJANtZivCyOEg9w4cbQTBCGufjcbk4Iu0jX0TjeyX9iwx12x7PXbPzkBm4c1p1lN-jo9jC-t7P8gkSqeit7mPi2ptO0t_yxTVy27XI1G4j8ffOekbEO7E1JkS4s_w";
                }}
              />
            </div>
            <div className="font-bold text-xs mt-1 text-gray-800">Bikash</div>
            <div className="text-[10px] text-gray-500 font-medium">Bhaktapur</div>
          </div>

          {/* Floating Avatar 4: Anil - Pokhara */}
          <div className="absolute bottom-8 right-16 md:right-32 bg-white p-2.5 rounded-2xl shadow-md z-10 text-center w-28 border border-gray-100 transition-transform hover:scale-110">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-100 overflow-hidden -mt-6 border-4 border-white shadow-sm">
              <img
                alt="Anil"
                className="w-full h-full object-cover"
                src="/images/stitch/anil.jpg"
                onError={(e) => {
                  e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuAW6zKShWyVFd8XkoOQrMo3Tl8cFwqqFhA5ApUeItbufDi11iy5YPC_X3R0bKOLW6Sj5fsdIvGhBJQrJFFI4G7-nzZnjOuiHO9c3vouJdy1OyhBCzlbwIalPReueB3vOpvEsCG0XqKzn7pGV306zhIiYozrtWGN_JqYwJx7CG0JOzBO3PqXc0V-b8h3pUDftdcRe5dbSKR71z3PnqgtSqTUZok2rcElBdANFMvE02YIl7iYzUaoYsPCWg";
                }}
              />
            </div>
            <div className="font-bold text-xs mt-1 text-gray-800">Anil</div>
            <div className="text-[10px] text-gray-500 font-medium">Pokhara</div>
          </div>
        </div>
      </section>
      {/* END: Community & Network Section */}

      {/* BEGIN: Workflow Section ("Get Connected") */}
      <section className="container mx-auto px-6 py-20 relative" data-purpose="features-section" id="workflow">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side with Testimonial Overlay */}
          <div className="relative order-2 lg:order-1">
            <div className="absolute inset-0 bg-blue-50 rounded-[40px] transform rotate-3 -z-10 scale-105"></div>
            <img
              alt="Professional at work"
              className="rounded-[30px] shadow-lg w-full max-w-md mx-auto object-cover h-[480px]"
              src="/images/stitch/worker_repair.jpg"
              onError={(e) => {
                e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuAZv4BzZa-lv1C14_UqaR7REnwiv1HQ8AguJglOuEGL_ELC-nemb6IZrXqHlTA7pIeYtP8Jdg0hkpnjSeE67rm64a8LspFkB9gQZTaH9wXOfNOvLMihkajOOLFUx5Cp4Up7WVZguVmbCQcmvImFICU1VKC6Org3dKcVscQ1bbWaTmSRaNsP5dlyyyyDU0FQ2lzzZR_3eAYbsWqUJzbPEMASs_jbeSHdINnjcT1JkaUIBNJCSftJ3PN-4w";
              }}
            />
            {/* Testimonial Quote Card */}
            <div className="absolute -bottom-6 right-2 md:-right-4 bg-white p-5 rounded-2xl shadow-soft max-w-xs z-10 border border-gray-100">
              <p className="text-xs text-gray-700 italic leading-relaxed">
                "Every job is a new challenge, and you'll never be able to build trust if you don't provide quality service every time."
              </p>
              <div className="flex items-center mt-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-2.5 overflow-hidden border border-gray-300">
                  <img
                    alt="Kumar Pro"
                    className="w-full h-full object-cover"
                    src="/images/stitch/kumar_pro.jpg"
                    onError={(e) => {
                      e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuBNANUb4tGITknHfzarmhThNZ_JQZJ-fiCNZo_iC07rHz71lFsrDS3jXpdWRTcWHqF9p47CbKnRVzhhaeJbd9i4WOyn9SjlSZdyOZ6Akg64jD3tL2a8iwdQ1GKWYZQkogStvWC5EZRg6TKjprOHzePo-JLeqXZph3U29DAGoBQpRSLbHrnv8g3_0SZOyzbXG8muN8D3bfjmnGNKiWvhP7sl41lOx_P8l2Qa4UjWmis7lgYBZ89C6A2M9w";
                    }}
                  />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">Kumar Pro</div>
                  <div className="text-[10px] text-gray-500">Verified Contractor (4.9 ★)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Workflow Steps Content Side */}
          <div className="order-1 lg:order-2">
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Get Connected</h3>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 relative">
              Post Jobs, Track Progress,<br />and Manage Repairs
              <span className="absolute -bottom-3 left-0 w-14 h-1.5 bg-amber-400 rounded-full"></span>
            </h2>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0 mr-4 font-bold text-lg shadow-sm">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-base text-gray-900 mb-1">Sign Up</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Make an account and log in to keep yourself updated on fair rates, verified worker KYC profiles, and service guarantees.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start p-3 rounded-2xl hover:bg-blue-50/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-sewa flex items-center justify-center flex-shrink-0 mr-4 font-bold text-lg shadow-sm">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-base text-gray-900 mb-1">Post Jobs</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Create a job request with photo/video attachments to gather competitive bids from fellow verified professionals and hire the best match.
                  </p>
                  <Link to="/client" className="inline-block text-xs font-bold text-sewa hover:underline mt-1">
                    Try Job Posting View →
                  </Link>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start p-3 rounded-2xl hover:bg-red-50/50 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center flex-shrink-0 mr-4 font-bold text-lg shadow-sm">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-base text-gray-900 mb-1">Track Progress</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Manage and track your home repairs in real time with photo proof upon completion before releasing payment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: Workflow Section */}

      {/* BEGIN: Popular Professionals Section */}
      <section className="container mx-auto px-6 py-20 relative" data-purpose="pros-section" id="testimonials">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div>
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Popular Professionals</h3>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 relative">
              Know the pros you're<br />hiring for the job
              <span className="absolute -bottom-3 left-0 w-12 h-1.5 bg-red-500 rounded-full"></span>
            </h2>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Have a quick conversation anytime you need with the professional you're going to hire. Check certificates, ratings, and previous work portfolio.
            </p>

            <div className="flex items-center space-x-3 mb-6">
              <div className="flex -space-x-2.5">
                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white overflow-hidden shadow-sm">
                  <img className="w-full h-full object-cover" src="/images/stitch/rajesh.jpg" alt="Pro 1" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white overflow-hidden shadow-sm">
                  <img className="w-full h-full object-cover" src="/images/stitch/sunita.jpg" alt="Pro 2" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white overflow-hidden shadow-sm">
                  <img className="w-full h-full object-cover" src="/images/stitch/bikash.jpg" alt="Pro 3" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-white overflow-hidden shadow-sm">
                  <img className="w-full h-full object-cover" src="/images/stitch/anil.jpg" alt="Pro 4" />
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-black border-2 border-white shadow-sm">
                +450
              </div>
            </div>

            <p className="text-gray-500 text-xs max-w-sm">
              With one simple click you can check reviews, ratings, category badges, and past project photos of every pro.
            </p>
          </div>

          {/* Graphic Side: Interactive Pro Interface Mockup */}
          <div className="relative h-[500px] flex justify-center items-center">
            {/* Abstract Decorative Blobs */}
            <div className="absolute w-72 h-72 bg-red-400/80 rounded-full right-4 top-10 opacity-70 mix-blend-multiply blob-shape floating-slow"></div>
            <div className="absolute w-64 h-64 bg-blue-100 rounded-full left-8 bottom-4 -z-10"></div>

            {/* Phone Card Mockup */}
            <div className="w-72 bg-white rounded-3xl shadow-xl border-4 border-gray-100 relative z-10 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <span className="font-bold text-xs text-gray-900">Top Rated Pros</span>
                <span className="text-[10px] text-sewa font-semibold bg-blue-50 px-2 py-0.5 rounded-full">Kathmandu</span>
              </div>

              <div className="p-4 space-y-4">
                {/* Pro Item 1 */}
                <div className="flex space-x-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border border-gray-200">
                    <img
                      className="w-full h-full object-cover"
                      src="/images/stitch/hari_plumber.jpg"
                      alt="Hari K."
                      onError={(e) => {
                        e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuA7diZPC6ANJbBMxbau6aLdWfqHWAhQkGbjUiB8rxxxQyPNWgu6P7CR99mdbjHDY7zs_a04O1auhN5WVxZG96Myhjn0qjB8iVyf6jxiisaagkpbG-sftrMjLp_B7MTIferbQrnvbZpxjBIiGevX99CAG9pvixaFzfXVn2sdde1BTjLShyB6Aj3h1KgZjqVdJzYYYJORb_OuEvsDXZ7sbKnfSLxmP8HL3F__l4_i4UBOTb3zywlhuTW88g";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xs text-gray-900">Hari K.</div>
                    <div className="text-[10px] text-gray-500">Expert Plumber • Lalitpur</div>
                    <div className="text-[10px] text-amber-500 font-bold">★ 4.8 / 5.0 (94 reviews)</div>
                  </div>
                </div>

                {/* Pro Item 2 (Expanded with portfolio) */}
                <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                  <div className="flex space-x-3 mb-2 items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border border-gray-300">
                      <img
                        className="w-full h-full object-cover"
                        src="/images/stitch/shyam_electrician.jpg"
                        alt="Shyam S."
                        onError={(e) => {
                          e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuA0PcpG8uMBJi_UaiaJUskLu-pFt6bD_5HgJWXMQa2rvR9Gg99jZsTfKiF7lch-jLLbH9Q3Aencd_yr0ajDvyHw9lbrNAfbT5-Mkvwv44ib4uwCjeHui5rXghqfsmr7SOtujqVEisPRiTuXdULBiWnH909L2VL16LZow9VuOtLzc2AzOS11TjehYDMUxAX8eke9dtugp_tzYGj14LVtERLdsak3Aht9TX8y1jK7OK-wOF-SP1zisDXIsA";
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-gray-900">Shyam S.</div>
                      <div className="text-[10px] text-gray-500">Master Electrician • Ktm</div>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-600 mb-2.5 leading-relaxed">
                    Experienced electrician handling residential &amp; commercial wiring safely with safety certification.
                  </p>

                  <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                    <div className="h-14 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="/images/stitch/work_sample1.jpg"
                        alt="Work Sample 1"
                        onError={(e) => {
                          e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuAr0FYpJjG0QpQxX6g4hvp75SuWGg-MlP39eSWlWfJLIrL1u8cYNOCYse3HUnGojWpMRVyDnl6OQNsfbhV3sKD2cOzOiQqTYuWzznYTg8F5N4IdAFIHnoXzOe21uTGk5eT_LLhN25E3VSvbdKQ5zlh6I1JgejYnOsnahIro3dgTukhBfSA__R7J2293r6_l9oem-Ru9lqoUpWVI8CCXauJkiXoLK9nB8VGUBJmMiDAOGADtF8AG2AK8cQ";
                        }}
                      />
                    </div>
                    <div className="h-14 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src="/images/stitch/work_sample2.jpg"
                        alt="Work Sample 2"
                        onError={(e) => {
                          e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuDHfjcu9X__dkdGv6oNNLFm_XaNEo4KdSzbIxk-HfqbI0F5It7klUUuz1lERHp17jE9qt6buhDySCdGVnhqXErPHzqh1BwZHUdcXYfOYSmsNS2Rk-bo0rjz8xjRU9TfppfaohTS7XKDaIe-ydGuyZ2wyVb5jEFbMEBy3JhoybTzmmACbwqm1_MUyimm9dHHYFbwQPgSMRRNjLwqrLFcwXXDAeMjLFa9Kh9UkXKnKiEK0OG-0y08W-RyNg";
                        }}
                      />
                    </div>
                  </div>

                  <Link
                    to="/worker"
                    className="block w-full py-1.5 text-center text-xs text-sewa border border-sewa rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                  >
                    See Worker Feed
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: Popular Professionals Section */}

      {/* BEGIN: Footer */}
      <footer className="bg-white pt-16 pb-8 border-t border-gray-100" data-purpose="site-footer">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
            <div>
              <h4 className="font-bold mb-4 text-xs text-gray-900 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2.5 text-xs text-gray-500">
                <li><a className="hover:text-sewa transition-colors" href="#services">Careers</a></li>
                <li><a className="hover:text-sewa transition-colors" href="#services">About Us</a></li>
                <li><a className="hover:text-sewa transition-colors" href="#services">Blog</a></li>
                <li><a className="hover:text-sewa transition-colors" href="#services">Press Info</a></li>
                <li><a className="hover:text-sewa transition-colors" href="#services">Features</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-xs text-gray-900 uppercase tracking-wider">SEWA Portals</h4>
              <ul className="space-y-2.5 text-xs text-gray-500">
                <li><Link className="hover:text-sewa transition-colors font-medium text-emerald-700" to="/client">Client Postings</Link></li>
                <li><Link className="hover:text-sewa transition-colors font-medium text-amber-700" to="/worker">Worker Bidding</Link></li>
                <li><Link className="hover:text-sewa transition-colors font-medium text-purple-700" to="/admin">Admin KYC &amp; Floors</Link></li>
                <li><a className="hover:text-sewa transition-colors" href="#pricing">Pricing Plans</a></li>
                <li><a className="hover:text-sewa transition-colors" href="#network">Verified Network</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-xs text-gray-900 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2.5 text-xs text-gray-500">
                <li><a className="hover:text-sewa transition-colors" href="#services">Download Apps</a></li>
                <li><a className="hover:text-sewa transition-colors" href="#services">Help Center</a></li>
                <li><a className="hover:text-sewa transition-colors" href="#services">Price Guides</a></li>
                <li><a className="hover:text-sewa transition-colors" href="#services">Safety Standards</a></li>
                <li><a className="hover:text-sewa transition-colors" href="#services">Terms of Service</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-xs text-gray-900 uppercase tracking-wider">Extras</h4>
              <ul className="space-y-2.5 text-xs text-gray-500">
                <li><a className="hover:text-sewa transition-colors" href="#services">Podcast</a></li>
                <li><a className="hover:text-sewa transition-colors" href="#services">SEWA for Business</a></li>
                <li><a className="hover:text-sewa transition-colors" href="#services">Worker Training</a></li>
                <li><a className="hover:text-sewa transition-colors" href="#services">SEWA Fund</a></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="font-bold mb-4 text-xs text-gray-900 uppercase tracking-wider">Subscribe</h4>
              <div className="flex mb-4">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full px-3 py-2 border border-gray-200 rounded-l-lg text-xs focus:outline-none focus:border-sewa"
                />
                <button
                  type="button"
                  className="bg-orange-500 text-white px-3.5 py-2 rounded-r-lg hover:bg-orange-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center space-x-2 text-xs text-gray-600">
                <span className="font-bold text-gray-900">4.8 / 5.0</span>
                <span>Customer Rating</span>
              </div>
              <div className="flex text-amber-400 text-xs mt-1 mb-1">
                ★ ★ ★ ★ ★
              </div>
              <div className="text-[10px] text-gray-400 font-bold">Top Verified Service in Nepal</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-100">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img
                src="/images/sewa_logo.png"
                alt="SEWA Logo"
                className="h-9 w-auto object-contain"
              />
              <span className="text-xs font-normal text-gray-400">© 2026 SEWA. All rights reserved.</span>
            </div>

            <div className="flex space-x-6 text-xs text-gray-500 mb-4 md:mb-0">
              <a className="hover:text-sewa transition-colors" href="#services">Services</a>
              <a className="hover:text-sewa transition-colors" href="#network">Pros</a>
              <a className="hover:text-sewa transition-colors" href="#workflow">Workflow</a>
              <a className="hover:text-sewa transition-colors" href="#pricing">Pricing</a>
            </div>

            <div className="flex space-x-3 text-gray-400 text-xs">
              <span className="bg-gray-100 px-2.5 py-1 rounded-full">Kathmandu</span>
              <span className="bg-gray-100 px-2.5 py-1 rounded-full">Lalitpur</span>
              <span className="bg-gray-100 px-2.5 py-1 rounded-full">Bhaktapur</span>
              <span className="bg-gray-100 px-2.5 py-1 rounded-full">Pokhara</span>
            </div>
          </div>
        </div>
      </footer>
      {/* END: Footer */}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/worker" element={<WorkerView />} />
        <Route path="/client" element={<ClientView />} />
      </Routes>
    </Router>
  );
}