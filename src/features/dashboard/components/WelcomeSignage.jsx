// src/features/dashboard/components/WelcomeSignage.jsx

import React from 'react';

const WelcomeSignage = ({ user }) => {
  if (!user) return null;

  return (
    <div className="theme-bg-card theme-text-primary p-6 rounded-xl shadow-lg flex items-center">
      <img src={user.avatarUrl} alt={user.name} className="h-16 w-16 rounded-full border-2 border-white mr-5" />
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {user.name}!
        </h1>
        <p className="text-md theme-text-secondary">
          {user.role}, {user.companyName}
        </p>
      </div>
    </div>
  );
};

export default WelcomeSignage;