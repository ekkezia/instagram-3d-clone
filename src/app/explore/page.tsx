'use client';

import React, { useState } from 'react';
 ;
import { useRouter } from 'next/navigation';
import { SupabaseRow, useSupabaseData } from '@/context/SupabaseDataContext';
import { User } from '@/data/types';

export default function Explore() {
  const { users } = useSupabaseData();

  const [searchQuery, setSearchQuery] = useState('');

  if (!users) return;
  // Filter users based on search query
  const filteredUsers = users.filter(user =>
    (user.username as string).toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.fullName as string).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white min-h-dvh">
      {/* Search Header */}
      <div className="px-4 py-3 border-b border-gray-200 sticky top-16 bg-white z-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="px-4 py-2">
        {/* {searchQuery && (
          <p className="text-gray-500 text-sm mb-4">
            {filteredUsers.length} result{filteredUsers.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        )} */}

        {/* User List */}
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <UserSearchItem key={user.id as string} user={user} />
          ))}
        </div>

        {/* {filteredUsers.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No users found</div>
            <div className="text-gray-500 text-sm">Try searching for a different name</div>
          </div>
        )} */}

        {!searchQuery && (
          <div className="text-center py-8">
            <div className="text-gray-500 text-sm">Search for users by username or name</div>
          </div>
        )}
      </div>
    </div>
  );
}

function UserSearchItem({ user }: { user: SupabaseRow | User }) {
  const router = useRouter();
  
  const handleUserClick = () => {
    router.push(`/${(user.username as string)}`);
  };

  return (
    <div 
      onClick={handleUserClick}
      className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
    >
      {/* Profile Picture */}
      <div className="flex-shrink-0">
        <img
          src={user.avatar as string}
          alt={user.username as string}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>

      {/* User Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-1">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {(user.username as string)}
          </p>
          {/* {user.isOwnProfile && (
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )} */}
        </div>
        <p className="text-sm text-gray-500 truncate">{(user.fullName as string)}</p>
        <p className="text-xs text-gray-400">
          {(user.followers as number).toLocaleString()} followers
        </p>
      </div>

      {/* Follow Button */}
      <div className="flex-shrink-0">
        {!user.isOwnProfile && (
          <button
            className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
              user.isFollowing
                ? 'bg-gray-100 text-black hover:bg-gray-200'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              // Toggle follow logic here
              console.log(`Toggle follow for ${(user.username as string)}`);
            }}
          >
            {(user.isFollowing as boolean) ? 'Following' : 'Follow'}
          </button>
        )}
      </div>
    </div>
  );
}
