import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import VendorSidebar from './VendorSidebar';
import VendorHeader from './VendorHeader';

const VendorLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Extract page title from pathname
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop() || 'dashboard';
    return path.replace('-', ' ');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <VendorSidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Header */}
        <VendorHeader onMenuToggle={toggleSidebar} title={getPageTitle()} />

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;