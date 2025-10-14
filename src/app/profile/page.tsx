'use client';

import React from 'react';
import GridIcon from '@/icon/grid-icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSupabaseData } from '@/context/SupabaseDataContext';

export default function Profile() {
  const path = usePathname();
  const username = path?.split('/')[1]; // URL structure is /[username]

  const { users, posts } = useSupabaseData();

  const user = users?.find(u => u.username === username);

  const userPosts = posts?.filter(p => p.user_id === user?.id) || [];

  if (!username || !user) {
    return <div className="text-center py-10 capitalize">User not found</div>;
  }
  
  return (
    <div className="bg-white">
      {/* User Header */}
      <div className="px-4 py-6">
        <div className="flex items-start space-x-4 mb-4">
          {/* User Picture */}
          <div className="flex-shrink-0">
            <img
              src={user.avatar as string}
              alt={user.username as string}
              width={80}
              height={80}
            className="w-20 h-20 rounded-full object-cover"
            />
          </div>

          {/* Stats */}
          <div className="flex-1">
            <div className="flex justify-around text-center">
              <div>
                <div className="font-semibold text-lg">{userPosts.length}</div>
                <div className="text-gray-500 text-sm">Posts</div>
              </div>
              <div>
                <div className="font-semibold text-lg">{user.followers as number}</div>
                <div className="text-gray-500 text-sm">Followers</div>
              </div>
              <div>
                <div className="font-semibold text-lg">{user.following as number}</div>
                <div className="text-gray-500 text-sm">Following</div>
              </div>
            </div>
          </div>
        </div>

        {/* user Info */}
        <div className="mb-4">
          <h1 className="font-semibold text-sm mb-1">{user.fullName as string}</h1>
          <p className="text-sm text-gray-700 whitespace-pre-line">{user.bio as string}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mb-4">
          {user.isOwnuser ? (
            <>
              <button disabled className="flex-1 bg-gray-100 text-black font-semibold py-2 px-4 rounded-md text-sm">
                Edit user
              </button>
              <button disabled className="flex-1 bg-gray-100 text-black font-semibold py-2 px-4 rounded-md text-sm">
                Share user
              </button>
            </>
          ) : (
            <>
              <button disabled
                className={`flex-1 font-semibold py-2 px-4 rounded-md text-sm ${
                  user.isFollowing 
                    ? 'bg-gray-100 text-black' 
                    : 'bg-blue-500 text-white'
                }`}
              >
                {user.isFollowing ? 'Following' : 'Follow'}
              </button>
              <button className="flex-1 bg-gray-100 text-black font-semibold py-2 px-4 rounded-md text-sm">
                Message
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="w-full flex items-center justify-center">
          <button className="px-4 py-3 border-b-[2px] border-black">
            <GridIcon />
          </button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-[2px] p-1">
        {userPosts ? userPosts.map((post, idx) => (
          <Link key={idx} href={`/${user.username}/${post.id}`}>
            <img
              src={post.image as string}
              alt={`Post ${post.id}`}
              className="object-cover w-full h-full"
            />
          </Link>
        ))
        :
        <p className="text-center w-full py-10 col-span-3 capitalize">
          No posts yet
        </p>
      }
      </div>
    </div>
  );
}
