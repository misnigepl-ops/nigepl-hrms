import React, { useState } from 'react';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Login States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Dummy Feed & Data
  const [feed, setFeed] = useState([
    { id: 1, type: 'birthday', name: 'Umesh Sharma', msg: 'Happy Birthday Umesh Sir! 🎉' }
  ]);

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if(loginEmail.includes('@nigepl')) {
      let userRole = loginEmail.includes('admin') ? 'admin' : 'employee';
      setCurrentUser({
        id: 'NIGEPL004',
        name: loginEmail.split('@')[0].toUpperCase(),
        role: userRole,
        designation: userRole === 'admin' ? 'Sr. Manager' : 'Site Engineer',
        city: 'Noida',
        sites: ['Head Office', 'Site A'],
        dp: '/logo.png',
        doj: '01-04-2025',
        email: loginEmail,
        phone: '+91 9876543210'
      });
    } else {
      alert("Invalid NIGEPL Email or Password!");
    }
  };

  const handlePunchIn = () => {
    alert("📍 GPS Location Verified: Head Office\n✅ Punched In Successfully!");
  };

  // 1. LOGIN SCREEN
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex justify-center items-center opacity-10 pointer-events-none">
          <img src="/logo.png" alt="Watermark" className="w-96" />
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10 border-t-8 border-[#1a365d]">
          <div className="text-center mb-8">
            <img src="/logo.png" alt="NIGEPL Logo" className="h-16 mx-auto mb-4 object-contain" />
            <h1 className="text-2xl font-bold text-[#1a365d]">NIGEPL HRMS</h1>
            <p className="text-gray-500 text-sm">Employee Login Portal</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
              <input type="email" required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} placeholder="name@nigepl.com" className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-[#f97316]" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <input type="password" required value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} placeholder="••••••••" className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-[#f97316]" />
            </div>
            <button type="submit" className="w-full bg-[#1a365d] hover:bg-blue-900 text-white font-bold py-3 rounded transition-all">
              SECURE LOGIN
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. MAIN APP DASHBOARD
  return (
    <div className="min-h-screen bg-slate-50 font-sans relative overflow-hidden">
      <header className="bg-[#1a365d] text-white p-4 flex justify-between items-center relative z-10 shadow-md border-b-4 border-[#f97316]">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="NIGEPL Logo" className="h-10 w-10 bg-white p-1 rounded object-contain" />
          <h1 className="text-xl font-bold tracking-wide">NIGEPL HRMS</h1>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <img src={currentUser.dp} className="h-8 w-8 rounded-full border-2 border-[#f97316] bg-white object-contain" alt="DP" />
            <span className="hidden md:inline font-bold">{currentUser.name}</span>
          </div>
          <button onClick={() => setCurrentUser(null)} className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Logout</button>
        </div>
      </header>

      <div className="flex relative z-10">
        <nav className="w-64 bg-white shadow-xl min-h-[calc(100vh-76px)] flex flex-col p-4 gap-2">
          <button onClick={() => setActiveTab('dashboard')} className={`p-3 text-left rounded-lg font-semibold transition-all ${activeTab === 'dashboard' ? 'bg-[#1a365d] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>📊 Dashboard</button>
          <button onClick={() => setActiveTab('directory')} className={`p-3 text-left rounded-lg font-semibold transition-all ${activeTab === 'directory' ? 'bg-[#1a365d] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>👥 Directory & Profile</button>
          <button onClick={() => setActiveTab('leave')} className={`p-3 text-left rounded-lg font-semibold transition-all ${activeTab === 'leave' ? 'bg-[#1a365d] text-white' : 'text-gray-600 hover:bg-gray-100'}`}>🏖️ Leave Apply</button>
          
          {currentUser.role === 'admin' && (
            <button onClick={() => setActiveTab('admin')} className={`p-3 text-left rounded-lg font-semibold transition-all ${activeTab === 'admin' ? 'bg-[#f97316] text-white' : 'text-[#f97316] hover:bg-orange-50 mt-4 border border-[#f97316]'}`}>⚙️ Admin Control</button>
          )}
        </nav>

        <main className="flex-1 p-6 overflow-y-auto h-[calc(100vh-76px)]">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#1a365d]">Welcome back, {currentUser.name}!</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-[#f97316]">
                  <h3 className="text-lg font-bold text-[#1a365d] mb-4">📍 Smart Attendance</h3>
                  <div className="bg-blue-50 p-4 rounded-lg mb-4 text-sm text-[#1a365d]">
                    <strong>Assigned Sites:</strong> {currentUser.sites.join(', ')}
                  </div>
                  <button onClick={handlePunchIn} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-md transition-all text-lg">
                    🟢 PUNCH IN
                  </button>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-700 mb-4">🎉 Social Feed & Celebrations</h3>
                  {feed.map(post => (
                    <div key={post.id} className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex gap-4">
                      <div className="text-4xl">🎂</div>
                      <div className="w-full">
                        <h4 className="font-bold text-[#1a365d]">{post.name}'s Birthday!</h4>
                        <p className="text-sm text-gray-600 mb-2">Wish them a great year ahead.</p>
                        <div className="flex gap-2">
                          <input type="text" placeholder="Write a comment..." className="border p-2 text-sm rounded w-full outline-none" />
                          <button className="bg-[#f97316] text-white px-3 py-1 rounded text-sm font-bold">Post</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'directory' && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                <div className="bg-[#1a365d] h-32 relative">
                  <div className="absolute -bottom-12 left-8">
                    <img src={currentUser.dp} className="h-24 w-24 rounded-full border-4 border-white bg-white shadow-lg object-contain p-2" alt="Profile" />
                  </div>
                </div>
                <div className="pt-16 pb-8 px-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-bold text-[#1a365d]">{currentUser.name}</h2>
                      <p className="text-[#f97316] font-semibold text-lg">{currentUser.designation}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">{currentUser.id}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 mt-8">
                    <div><p className="text-gray-500 text-sm">Email</p><p className="font-medium">{currentUser.email}</p></div>
                    <div><p className="text-gray-500 text-sm">Phone</p><p className="font-medium">{currentUser.phone}</p></div>
                    <div><p className="text-gray-500 text-sm">City</p><p className="font-medium">{currentUser.city}</p></div>
                    <div><p className="text-gray-500 text-sm">Sites</p><p className="font-medium">{currentUser.sites.join(', ')}</p></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'admin' && currentUser.role === 'admin' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#f97316]">⚙️ Admin Control Panel</h2>
              <div className="bg-white p-6 rounded-2xl shadow border border-gray-200">
                <h3 className="text-lg font-bold text-[#1a365d] mb-4">➕ Add New Employee</h3>
                <form className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Full Name *" className="border p-2 rounded outline-none" required />
                  <input type="email" placeholder="Email Address *" className="border p-2 rounded outline-none" required />
                  <input type="text" placeholder="Designation *" className="border p-2 rounded outline-none" required />
                  <input type="text" placeholder="Geofence Location *" className="border p-2 rounded outline-none" required />
                  <input type="password" placeholder="Set Default Password *" className="border p-2 rounded outline-none" required />
                  <button type="submit" className="col-span-2 bg-[#1a365d] text-white font-bold py-2 rounded">Register Employee</button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}