import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom reminder component
const ReminderItem = ({ title, date, priority, onRemove }) => {
  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    low: 'bg-blue-100 text-blue-700 border-blue-200'
  };

  return (
    <div className={`p-2.5 rounded-lg mb-2 border ${priorityColors[priority]} animate-fade-in transition-all duration-300 hover:shadow-md`}>
      <div className="flex justify-between items-start mb-1">
        <h4 className="text-sm font-semibold text-high-contrast">{title}</h4>
        <button 
          onClick={onRemove}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="flex items-center text-xs font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{date}</span>
      </div>
    </div>
  );
};

// Project item component
const ProjectItem = ({ title, type, date, icon, link }) => {
  return (
    <Link 
      to={link || `/project/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'))}`}
      className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer group animate-fade-in transition-all duration-300 hover:translate-x-1"
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary/10 text-primary mr-3 group-hover:animate-pulse-slow">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-text-darker truncate group-hover:text-primary transition-colors">{title}</h4>
        <div className="flex items-center text-xs font-medium text-text-primary">
          <span className="mr-2">{type}</span>
          <span>•</span>
          <span className="ml-2">{date}</span>
        </div>
      </div>
    </Link>
  );
};

// Main SideActions component
const SideActions = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('actions');
  const [reminders, setReminders] = useState([
    { id: 1, title: 'Submit Physics Paper', date: 'Tomorrow, 11:59 PM', priority: 'high' },
    { id: 2, title: 'Team Meeting', date: 'Wed, May 15 • 3:00 PM', priority: 'medium' },
    { id: 3, title: 'Review Draft', date: 'Fri, May 17 • 2:00 PM', priority: 'low' },
  ]);
  const [newReminder, setNewReminder] = useState({ title: '', date: '', priority: 'medium' });
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [showFloatingIcons, setShowFloatingIcons] = useState(true);

  // Sample projects
  const savedProjects = [
    { id: 1, title: 'Quantum Physics Research Paper', type: 'Word Document', date: 'May 10', icon: '📝', link: '/project/quantum-physics' },
    { id: 2, title: 'Marketing Strategy Presentation', type: 'PowerPoint', date: 'May 8', icon: '📊', link: '/project/marketing-strategy' },
    { id: 3, title: 'Financial Analysis Q1 2023', type: 'Excel', date: 'May 5', icon: '📊', link: '/project/financial-analysis' },
    { id: 4, title: 'AI Research Paper Draft', type: 'Word Document', date: 'May 3', icon: '📝', link: '/project/ai-research' },
  ];

  // PC Saved Documents
  const pcDocuments = [
    { id: 1, title: 'Project Proposal Final.docx', type: 'MS Word', date: 'May 11', icon: '📄', link: '/document/project-proposal' },
    { id: 2, title: 'Analysis Results.xlsx', type: 'MS Excel', date: 'May 9', icon: '📊', link: '/document/analysis-results' },
    { id: 3, title: 'Team Presentation.pptx', type: 'PowerPoint', date: 'May 7', icon: '📊', link: '/document/team-presentation' },
    { id: 4, title: 'Research Notes.pdf', type: 'PDF', date: 'May 2', icon: '📑', link: '/document/research-notes' },
  ];

  // Sample document formats
  const documentFormats = [
    { id: 1, name: 'Save as PDF', icon: '📄', link: '/action/save-as-pdf' },
    { id: 2, name: 'Save as Word', icon: '📝', link: '/action/save-as-word' },
    { id: 3, name: 'Save as PPT', icon: '📊', link: '/action/save-as-ppt' },
    { id: 4, name: 'Save as Image', icon: '🖼️', link: '/action/save-as-image' },
    { id: 5, name: 'Print Document', icon: '🖨️', link: '/action/print' },
    { id: 6, name: 'Share Document', icon: '🔗', link: '/action/share' },
  ];

  // Document quick actions (floating icons on the right)
  const quickActions = [
    { id: 1, name: 'New Project', icon: '➕', action: () => alert('Create new project'), link: '/action/new-project' },
    { id: 2, name: 'Save as PDF', icon: '📄', action: () => alert('Save as PDF'), link: '/action/save-as-pdf' },
    { id: 3, name: 'Save as Word', icon: '📝', action: () => alert('Save as Word'), link: '/action/save-as-word' },
    { id: 4, name: 'PC Documents', icon: '💻', action: () => { setActiveTab('pc'); setIsExpanded(true); }, link: '#pc' },
    { id: 5, name: 'Projects', icon: '📂', action: () => { setActiveTab('projects'); setIsExpanded(true); }, link: '#projects' },
    { id: 6, name: 'Reminders', icon: '⏰', action: () => { setActiveTab('reminders'); setIsExpanded(true); }, link: '#reminders' },
  ];

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (newReminder.title && newReminder.date) {
      setReminders([
        ...reminders,
        { 
          id: reminders.length + 1, 
          title: newReminder.title, 
          date: newReminder.date, 
          priority: newReminder.priority 
        }
      ]);
      setNewReminder({ title: '', date: '', priority: 'medium' });
      setShowReminderForm(false);
    }
  };

  const handleRemoveReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  // Toggle floating sidebar based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setShowFloatingIcons(currentScrollPos < 200 || !isExpanded);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isExpanded]);

  return (
    <>
      {/* Main sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-md z-40 transform transition-transform duration-300 ease-in-out border-l border-gray-100 ${isExpanded ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Toggle button - visible when sidebar is expanded */}
        <button 
          onClick={() => setIsExpanded(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-primary transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Sidebar header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center mt-10">
          <h2 className="text-lg font-bold text-text-darker">Project Hub</h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button 
            onClick={() => setActiveTab('actions')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors duration-300 ${
              activeTab === 'actions' 
                ? 'text-primary border-b-2 border-primary font-bold' 
                : 'text-text-primary hover:text-primary'
            }`}
          >
            Actions
          </button>
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors duration-300 ${
              activeTab === 'projects' 
                ? 'text-primary border-b-2 border-primary font-bold' 
                : 'text-text-primary hover:text-primary'
            }`}
          >
            Projects
          </button>
          <button 
            onClick={() => setActiveTab('pc')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors duration-300 ${
              activeTab === 'pc' 
                ? 'text-primary border-b-2 border-primary font-bold' 
                : 'text-text-primary hover:text-primary'
            }`}
          >
            PC Files
          </button>
          <button 
            onClick={() => setActiveTab('reminders')}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors duration-300 ${
              activeTab === 'reminders' 
                ? 'text-primary border-b-2 border-primary font-bold' 
                : 'text-text-primary hover:text-primary'
            }`}
          >
            <span className="relative">
              Reminders
              {reminders.some(r => r.priority === 'high') && (
                <span className="absolute -top-1 -right-4 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              )}
            </span>
          </button>
        </div>

        {/* Tab content */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-120px)]">
          {/* Document Actions Tab */}
          {activeTab === 'actions' && (
            <div className="animate-fade-in">
              <h3 className="text-sm font-bold text-text-darker mb-3">Document Actions</h3>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {documentFormats.map(format => (
                  <Link 
                    key={format.id}
                    to={format.link}
                    className="tool-icon group flex flex-col items-center justify-center py-2 hover:scale-105 transition-all duration-300"
                  >
                    <div className="text-xl mb-1 text-text-darker group-hover:text-primary transition-colors">
                      {format.icon}
                    </div>
                    <span className="text-xs font-medium text-text-primary group-hover:text-primary transition-colors">{format.name}</span>
                  </Link>
                ))}
              </div>

              {/* 3D Hologram Element */}
              <div className="mt-6 hologram bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4 text-center shadow-sm">
                <div className="animate-float">
                  <div className="w-16 h-16 mx-auto mb-2 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full animate-pulse-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-text-darker">Project Visualizer</h3>
                  <p className="text-xs font-medium text-text-primary mt-1">3D visualization of your project structure</p>
                </div>
              </div>
            </div>
          )}

          {/* Saved Projects Tab */}
          {activeTab === 'projects' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-text-darker">Saved Projects</h3>
                
                <Link to="/project/create" className="text-primary hover:text-primary-dark text-sm flex items-center group font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="group-hover:underline">New</span>
                </Link>
              </div>
              <div className="space-y-1">
                {savedProjects.map(project => (
                  <ProjectItem 
                    key={project.id}
                    title={project.title}
                    type={project.type}
                    date={project.date}
                    icon={project.icon}
                    link={project.link}
                  />
                ))}
              </div>
            </div>
          )}

          {/* PC Documents Tab */}
          {activeTab === 'pc' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-text-darker">PC Documents</h3>
                
                <Link to="/document/browse" className="text-primary hover:text-primary-dark text-sm flex items-center group font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                  </svg>
                  <span className="group-hover:underline">Browse</span>
                </Link>
              </div>
              <div className="space-y-1">
                {pcDocuments.map(doc => (
                  <ProjectItem 
                    key={doc.id}
                    title={doc.title}
                    type={doc.type}
                    date={doc.date}
                    icon={doc.icon}
                    link={doc.link}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Reminders Tab */}
          {activeTab === 'reminders' && (
            <div className="animate-fade-in">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-text-darker">Reminders</h3>
                
                <button 
                  onClick={() => setShowReminderForm(!showReminderForm)}
                  className="text-primary hover:text-primary-dark text-sm flex items-center group font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="group-hover:underline">Add</span>
                </button>
              </div>

              {/* Add reminder form */}
              {showReminderForm && (
                <form onSubmit={handleAddReminder} className="mb-4 p-3 bg-light-secondary rounded-lg animate-fade-in">
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Reminder title"
                      className="w-full p-2 text-sm rounded-md border border-gray-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-text-darker"
                      value={newReminder.title}
                      onChange={e => setNewReminder({...newReminder, title: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Date (e.g. May 20, 2:00 PM)"
                      className="w-full p-2 text-sm rounded-md border border-gray-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-text-darker"
                      value={newReminder.date}
                      onChange={e => setNewReminder({...newReminder, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      className="w-full p-2 text-sm rounded-md border border-gray-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary text-text-darker"
                      value={newReminder.priority}
                      onChange={e => setNewReminder({...newReminder, priority: e.target.value})}
                    >
                      <option value="low">Low Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Priority</option>
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="flex-1 bg-primary text-white text-sm py-1.5 rounded-md hover:bg-primary-dark transition-colors"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReminderForm(false)}
                      className="flex-1 bg-gray-100 text-gray-600 text-sm py-1.5 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Reminders list */}
              <div className="space-y-2">
                {reminders.length > 0 ? (
                  reminders.map(reminder => (
                    <ReminderItem
                      key={reminder.id}
                      title={reminder.title}
                      date={reminder.date}
                      priority={reminder.priority}
                      onRemove={() => handleRemoveReminder(reminder.id)}
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">No reminders yet</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Quick Action Icons */}
      {showFloatingIcons && !isExpanded && (
        <div className="fixed right-4 top-1/3 transform -translate-y-1/2 z-40 flex flex-col space-y-2">
          {quickActions.map(action => (
            <div key={action.id} className="relative group">
              <Link
                to={action.link}
                onClick={(e) => {
                  if (action.action) {
                    e.preventDefault();
                    action.action();
                  }
                }}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300 border border-gray-200"
              >
                <span className="text-lg">{action.icon}</span>
              </Link>
              <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                {action.name}
              </div>
            </div>
          ))}
          <div className="relative group">
            <button 
              onClick={() => setIsExpanded(true)}
              className="w-10 h-10 rounded-full bg-primary shadow-md flex items-center justify-center text-white hover:bg-primary-dark transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
            <div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-white px-2 py-1 rounded shadow text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Expand Panel
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideActions; 