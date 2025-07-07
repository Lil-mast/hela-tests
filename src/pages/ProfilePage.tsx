import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout 
      title="Profile"
      subtitle=""
    >
      <div className="max-w-2xl">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Aisha Hassan</h2>
          <p className="text-gray-600 mb-1">aisha.hassan@email.com</p>
          <p className="text-sm text-gray-500">Joined on Jan 15, 2023</p>
        </div>

        {/* Account Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
              <div>
                <h4 className="font-medium text-gray-900">Profile Information</h4>
                <p className="text-sm text-gray-500">Update your name and profile picture</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                Update
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
              <div>
                <h4 className="font-medium text-gray-900">Account Settings</h4>
                <p className="text-sm text-gray-500">Change your password or link/unlink third-party accounts</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                Manage
              </button>
            </div>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription</h3>
          
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
            <div>
              <h4 className="font-medium text-gray-900">Subscription Details</h4>
              <p className="text-sm text-gray-500">View and manage your subscription details</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              View
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Danger Zone</h3>
          
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200 hover:bg-red-50 transition-colors cursor-pointer">
            <div>
              <h4 className="font-medium text-red-900">Delete Account</h4>
            </div>
            <button className="text-red-600 hover:text-red-700 transition-colors font-medium">
              Delete
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;