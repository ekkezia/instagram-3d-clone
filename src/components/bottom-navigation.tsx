'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ExploreIcon, HomeIcon, NotificationIcon, PostIcon } from '@/icon/bottom-bar-icons';
import Link from 'next/link';

const BottomNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navigateToHome = () => {
    router.push('/');
  };

  return (
    <nav className="bg-white border-t border-gray-200 px-4 py-2 sticky bottom-0 max-w-md z-50 flex items-center justify-center">
      <div className="flex items-center justify-around max-w-md w-full">
        {/* Home */}
        <Link href="/">
          <button 
            className={`p-3 ${pathname === '/' ? 'text-black' : 'text-gray-400'}`}
          >
            <HomeIcon />
          </button>
        </Link>
        
        {/* Search/Explore */}
        <Link href="/explore">
          <button
            className={`p-3 ${pathname === '/explore' ? 'text-black' : 'text-gray-400'}`}
          >
            <ExploreIcon />
          </button>
        </Link>

        {/* Add Post - disabled */}
        <button disabled className="p-3 text-gray-300 cursor-not-allowed">
          <PostIcon />
        </button>

        {/* Reels - disabled */}
        <button disabled className="p-3 text-gray-300 cursor-not-allowed">
          <NotificationIcon />
        </button>

        {/* Profile : hardcode shahnaz */}
        <Link href="/shahnaz.indira">
          <button 
            className={`p-3 ${pathname === '/shahnaz.indira' ? 'text-black' : 'text-gray-400'}`}
          >
            <div className={`w-6 h-6 rounded-full bg-gray-300 border-2 ${pathname === '/profile' ? 'border-black' : 'border-gray-300'}`}>
              <img 
                src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg" 
                alt="Profile" 
                width={24}
                height={24}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;
