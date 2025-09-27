'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Mail, Phone, Calendar, BookOpen, User, Edit, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../Loading'; // Assuming you have a standard LoadingSpinner component

// Mock data structure for type hinting and initial state
const initialUserData = {
  name: '',
  email: '',
  image: '/default-avatar.png',
  phone: 'N/A',
  bio: 'No bio provided.',
  memberSince: null,
  coursesEnrolled: 0,
};

function ProfilePage() {
  const [userData, setUserData] = useState(initialUserData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/user');
        const data = await res.json();

        if (res.ok && data.success) {
          // Destructure and set data, using defaults for safety
          setUserData({
            name: data.user.name || 'User Profile',
            email: data.user.email || 'N/A',
            image: data.user.image || '/default-avatar.png',
            phone: data.user.phone || 'N/A',
            bio: data.user.bio || 'No bio provided.',
            memberSince: data.user.memberSince ? new Date(data.user.memberSince) : null,
            coursesEnrolled: data.user.coursesEnrolled || 0,
          });
        } else {
          setError(data.error || 'Failed to fetch user data.');
          toast.error(data.error || 'Could not load profile data.');
        }
      } catch (err) {
        console.error('Fetch user error:', err);
        setError('Network error or server issue.');
        toast.error('Network error. Check console.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <LoadingSpinner />
        <p className="ml-3 text-lg text-gray-600">Loading Profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen p-4 text-center bg-red-50">
        <h1 className="text-2xl font-bold text-red-700">Error Loading Profile</h1>
        <p className="mt-2 text-red-600">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header and Edit Button */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-3">
            <User className="w-8 h-8 text-primary" />
            My Profile
          </h1>
          <button 
            // In a real app, this would open a modal or navigate to /profile/edit
            onClick={() => toast.info('Edit functionality coming soon!')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition shadow-md"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {/* Profile Card Layout */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-6 sm:p-10">
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* Left Column: Avatar and Quick Info */}
            <div className="md:w-1/3 flex flex-col items-center text-center">
              
              {/* Avatar */}
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={userData.image}
                  alt={`${userData.name}'s avatar`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full ring-4 ring-primary p-1 shadow-lg"
                />
              </div>

              <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
              <p className="text-sm text-gray-500 mb-6">{userData.email}</p>

              {/* Quick Stats */}
              <div className="w-full space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-gray-700">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Courses Enrolled:
                  </span>
                  <span className="text-lg font-bold text-gray-800">{userData.coursesEnrolled}</span>
                </div>
                <div className="flex items-center justify-between text-gray-700">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <Calendar className="w-4 h-4 text-primary" />
                    Member Since:
                  </span>
                  <span className="text-sm font-semibold text-gray-800">
                    {userData.memberSince ? userData.memberSince.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Details and Bio */}
            <div className="md:w-2/3 md:pl-8 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0">
              
              {/* Bio Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 border-b pb-2">About Me</h3>
                <p className="text-gray-700 leading-relaxed italic">
                  "{userData.bio}"
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Contact Details</h3>
                <div className="space-y-4">
                  
                  {/* Email */}
                  <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email Address</p>
                      <p className="text-base font-semibold text-gray-900">{userData.email}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone Number</p>
                      <p className="text-base font-semibold text-gray-900">{userData.phone}</p>
                    </div>
                  </div>
                  
                </div>
              </div>

              {/* Action Section (e.g., Change Password, Notifications) */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Account Actions</h3>
                <div className="flex flex-wrap gap-4">
                  <button className="px-5 py-2 text-sm font-medium text-primary border border-primary rounded-full hover:bg-primary hover:text-white transition">
                    Change Password
                  </button>
                  <button className="px-5 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-100 transition">
                    Manage Notifications
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;