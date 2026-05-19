import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../common/components/Sidebar';

const UserLayout = () => {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar with Blue Accent for User */}
      <Sidebar accentColor="#3b82f6" module="user" />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default UserLayout;
