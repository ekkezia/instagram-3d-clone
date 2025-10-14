'use client';

import PostCard from '@/components/post-card';
import { useSupabaseData } from '@/context/SupabaseDataContext';

export default function Home() {
  const { posts } = useSupabaseData();

  return (
    <div className="bg-white">
      {/* Stories Section */}
      {/* <Stories stories={mockStories} /> */}
      
      {/* Posts Feed */}
      <div className="divide-y divide-gray-200">
        {posts && posts.map((post, idx) => (
          <PostCard key={`${post.id}-${idx}`} post={post} />
        ))}
      </div>
    </div>
  );
}
