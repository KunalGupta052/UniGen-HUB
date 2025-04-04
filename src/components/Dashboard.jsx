import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for dashboard
  const [stats, setStats] = useState({
    totalDocuments: 0,
    recentActivity: 0,
    usagePercent: 0,
    completedProjects: 0
  });
  
  const [recentDocuments, setRecentDocuments] = useState([]);
  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
    // Check if dark mode is enabled
    const prefersDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(prefersDark);
    
    // Add listener for dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setIsDarkMode(isDark);
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    // Simulate loading data
    setTimeout(() => {
      setStats({
        totalDocuments: 24,
        recentActivity: 7,
        usagePercent: 68,
        completedProjects: 12
      });
      
      setRecentDocuments([
        { id: 1, title: 'Project Proposal', type: 'Document', date: '2 days ago', progress: 100 },
        { id: 2, title: 'Marketing Campaign', type: 'Project', date: '4 days ago', progress: 85 },
        { id: 3, title: 'Product Description', type: 'Content', date: '1 week ago', progress: 100 },
        { id: 4, title: 'Blog Post Series', type: 'Content', date: '1 week ago', progress: 60 },
      ]);
      
      setActivities([
        { id: 1, action: 'Created', item: 'Marketing Proposal', time: '2 hours ago', user: 'You' },
        { id: 2, action: 'Edited', item: 'Q1 Report', time: '1 day ago', user: 'You' },
        { id: 3, action: 'Generated', item: 'Product Description', time: '2 days ago', user: 'Maria R.' },
        { id: 4, action: 'Shared', item: 'Project Outline', time: '3 days ago', user: 'You' },
        { id: 5, action: 'Commented', item: 'Blog Post Draft', time: '5 days ago', user: 'John S.' },
      ]);
      
      setIsLoading(false);
    }, 1000);
    
    return () => observer.disconnect();
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-dark-bg">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-neon-blue/20 border border-neon-blue/30 flex items-center justify-center mb-4">
            <div className="w-6 h-6 border-t-2 border-r-2 border-neon-blue rounded-full animate-spin"></div>
          </div>
          <div className="text-white">Loading your dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-8 px-4 md:px-8 ${isDarkMode ? 'bg-dark-bg text-white' : 'bg-light-bg text-gray-900'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's an overview of your activity.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Documents Card */}
          <div className={`p-6 rounded-xl border ${
            isDarkMode ? 'bg-dark-secondary border-dark-tertiary' : 'bg-white border-gray-200'
          } transition-all duration-300`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Documents</p>
                <h3 className="text-3xl font-bold mt-1">{stats.totalDocuments}</h3>
              </div>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-100'}`}>
                <svg className="w-6 h-6 text-neon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/documents" className="text-sm text-neon-blue hover:underline">View all documents</Link>
            </div>
          </div>
          
          {/* Activity Card */}
          <div className={`p-6 rounded-xl border ${
            isDarkMode ? 'bg-dark-secondary border-dark-tertiary' : 'bg-white border-gray-200'
          } transition-all duration-300`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Recent Activity</p>
                <h3 className="text-3xl font-bold mt-1">{stats.recentActivity}</h3>
                <p className="text-xs text-green-500 mt-1">+3 from last week</p>
              </div>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-green-500/10' : 'bg-green-100'}`}>
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/activity" className="text-sm text-green-500 hover:underline">View activity</Link>
            </div>
          </div>
          
          {/* Usage Card */}
          <div className={`p-6 rounded-xl border ${
            isDarkMode ? 'bg-dark-secondary border-dark-tertiary' : 'bg-white border-gray-200'
          } transition-all duration-300`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Storage Usage</p>
                <h3 className="text-3xl font-bold mt-1">{stats.usagePercent}%</h3>
              </div>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-purple-500/10' : 'bg-purple-100'}`}>
                <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-700 rounded-full h-2.5">
              <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${stats.usagePercent}%` }}></div>
            </div>
            <div className="mt-2">
              <span className="text-xs text-gray-500">6.8GB of 10GB used</span>
            </div>
          </div>
          
          {/* Projects Card */}
          <div className={`p-6 rounded-xl border ${
            isDarkMode ? 'bg-dark-secondary border-dark-tertiary' : 'bg-white border-gray-200'
          } transition-all duration-300`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completed Projects</p>
                <h3 className="text-3xl font-bold mt-1">{stats.completedProjects}</h3>
              </div>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-amber-500/10' : 'bg-amber-100'}`}>
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <Link to="/projects" className="text-sm text-amber-500 hover:underline">View all projects</Link>
            </div>
          </div>
        </div>
        
        {/* Recent Documents and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Documents */}
          <div className={`lg:col-span-2 rounded-xl border ${
            isDarkMode ? 'bg-dark-secondary border-dark-tertiary' : 'bg-white border-gray-200'
          } transition-all duration-300 overflow-hidden`}>
            <div className="p-6 border-b border-dark-tertiary">
              <h2 className="text-xl font-bold">Recent Documents</h2>
            </div>
            <div className="divide-y divide-dark-tertiary">
              {recentDocuments.map(doc => (
                <div key={doc.id} className="p-4 hover:bg-dark-tertiary/50 transition-colors duration-200">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-4 ${
                      doc.type === 'Document' ? 'bg-blue-500/10 text-blue-500' :
                      doc.type === 'Project' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-green-500/10 text-green-500'
                    }`}>
                      {doc.type === 'Document' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                      {doc.type === 'Project' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      )}
                      {doc.type === 'Content' && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{doc.title}</h3>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span>{doc.type}</span>
                        <span className="mx-2">•</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {doc.progress < 100 ? (
                        <div className="text-right">
                          <div className="text-xs text-gray-500 mb-1">{doc.progress}% complete</div>
                          <div className="w-20 bg-gray-700 rounded-full h-1.5">
                            <div 
                              className="bg-neon-blue h-1.5 rounded-full" 
                              style={{ width: `${doc.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-green-500 bg-green-500/10 rounded-full px-2 py-1 text-xs">
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 text-center">
              <Link to="/documents" className="text-neon-blue hover:underline text-sm">View all documents</Link>
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className={`rounded-xl border ${
            isDarkMode ? 'bg-dark-secondary border-dark-tertiary' : 'bg-white border-gray-200'
          } transition-all duration-300 overflow-hidden`}>
            <div className="p-6 border-b border-dark-tertiary">
              <h2 className="text-xl font-bold">Recent Activity</h2>
            </div>
            <div className="divide-y divide-dark-tertiary">
              {activities.map(activity => (
                <div key={activity.id} className="p-4 hover:bg-dark-tertiary/50 transition-colors duration-200">
                  <div className="flex items-start">
                    <div className="w-2 h-2 rounded-full bg-neon-blue mt-2 mr-3"></div>
                    <div>
                      <div className="font-medium">
                        <span className="text-gray-400">{activity.user}</span> <span>{activity.action.toLowerCase()}</span> <span className="text-neon-blue">{activity.item}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{activity.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 text-center">
              <Link to="/activity" className="text-neon-blue hover:underline text-sm">View all activity</Link>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { icon: '📄', label: 'New Document', bg: 'bg-blue-500/10', color: 'text-blue-500', path: '/documents/new' },
              { icon: '📊', label: 'New Report', bg: 'bg-green-500/10', color: 'text-green-500', path: '/reports/new' },
              { icon: '🧰', label: 'AI Tools', bg: 'bg-purple-500/10', color: 'text-purple-500', path: '/tools' },
              { icon: '📝', label: 'New Template', bg: 'bg-amber-500/10', color: 'text-amber-500', path: '/templates/new' },
              { icon: '🚀', label: 'Start Project', bg: 'bg-pink-500/10', color: 'text-pink-500', path: '/projects/new' },
            ].map((action, index) => (
              <Link 
                key={index}
                to={action.path}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border ${
                  isDarkMode ? 'border-dark-tertiary hover:bg-dark-tertiary/50' : 'border-gray-200 hover:bg-gray-100'
                } transition-all duration-200 text-center`}
              >
                <div className={`w-12 h-12 ${action.bg} rounded-lg flex items-center justify-center mb-2 text-2xl`}>
                  {action.icon}
                </div>
                <span className={`text-sm ${action.color}`}>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 