'use client';

import React from 'react';
 ;
import { useRouter } from 'next/navigation';

interface Story {
  id: number;
  username: string;
  avatar: string;
  isViewed: boolean;
}

interface StoriesProps {
  stories: Story[];
}

const Stories: React.FC<StoriesProps> = ({ stories }) => {
  const router = useRouter();
  return (
    <div className="bg-white border-b border-gray-200 py-3">
      <div className="flex space-x-4 px-4 overflow-x-auto scrollbar-hide">
        {stories.map((story) => {
          const handleStoryClick = () => {
            if (story.username !== "Your story") {
              router.push(`/user/${story.username}`);
            }
          };

          return (
            <div 
              key={story.id} 
              className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer"
              onClick={handleStoryClick}
            >
              <div 
                className={`p-0.5 rounded-full ${
                  story.isViewed 
                    ? 'bg-gray-300' 
                    : 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500'
                }`}
              >
                <div className="bg-white p-0.5 rounded-full">
                  <img
                    src={story.avatar}
                    alt={story.username}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="text-xs text-gray-600 max-w-[60px] truncate hover:text-gray-800">
                {story.username}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stories;
