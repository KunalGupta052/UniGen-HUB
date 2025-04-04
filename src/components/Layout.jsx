import React from 'react';
import ToolsSidebar from './layout/ToolsSidebar';
import SideActions from './layout/SideActions';
import TeamChat from './layout/TeamChat';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Tools sidebar */}
      <ToolsSidebar />
      
      {/* Main content area */}
      <main className="flex-1 ml-64 pt-16">
        {children}
      </main>
      
      {/* Right sidebar for actions */}
      <SideActions />
      
      {/* Team chat widget */}
      <TeamChat />
    </div>
  );
};

export default Layout; 