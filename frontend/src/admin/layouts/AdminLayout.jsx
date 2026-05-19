import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../common/components/Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar with Indigo Accent for Admin */}
      <Sidebar accentColor="#6366f1" module="admin" />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
