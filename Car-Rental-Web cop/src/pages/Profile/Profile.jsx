import React from "react";

const Profile = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6">User Profile</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="w-32 text-gray-600 dark:text-gray-400">Name:</span>
          <span className="text-gray-900 dark:text-white">John Doe</span>
        </div>
        <div className="flex items-center">
          <span className="w-32 text-gray-600 dark:text-gray-400">Email:</span>
          <span className="text-gray-900 dark:text-white">john.doe@example.com</span>
        </div>
        <div className="flex items-center">
          <span className="w-32 text-gray-600 dark:text-gray-400">Phone:</span>
          <span className="text-gray-900 dark:text-white">+1 234 567 890</span>
        </div>
        <div className="flex items-center">
          <span className="w-32 text-gray-600 dark:text-gray-400">Role:</span>
          <span className="text-gray-900 dark:text-white">Admin</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
