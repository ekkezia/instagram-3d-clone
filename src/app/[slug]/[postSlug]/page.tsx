import ThreeDPostViewer from '@/components/three-d-post-viewer';
import supabase from '@/utils/supabase/client';
import { parseCaption } from '@/utils/caption';
import { formatTimeAgo } from '@/utils/time';

export const revalidate = 60;

export async function generateStaticParams(): Promise<{ "postSlug": string }[]> {
  const { data: postData } = await supabase.from('instagram-clone-posts').select().limit(100);

  if (!postData) return []; 

  return postData.map((post) => ({
    "postSlug": post.id,
  }))
}

interface PhotoPageProps {
  params: Promise<{ postSlug: string }>;
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const { data: postData } = await supabase.from('instagram-clone-posts').select().limit(100);
  const { data: userData } = await supabase.from('instagram-clone-users').select().limit(100);

  const { postSlug: id } = await params;

  const post = postData?.find(p => p.id === id);
  const user = userData?.find(user => user.id === post.user_id) || {};

  if (!id || !user || !post) {
    return (
      <div className="capitalize text-center">
        No post found
      </div>
    );
  }

  return (
    <div className="bg-white min-h-dvh">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={user.avatar}
            alt={user.username}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold text-sm">{user.username}</span>
        </div>
        <button className="p-1">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* 3D Scene */}
      {
        post.object ? <ThreeDPostViewer postIdx={post.object} /> 
          :
          <div className="relative aspect-square">
            <img
              src={post.image as string}
              alt="Post"
              className="object-cover"
            />
          </div>
      }

      {/* Actions and Details */}
      <div className="px-4 py-3">
        {/* Actions */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button className="p-1">
              <svg 
                className={`w-6 h-6 ${post.isLiked ? 'text-red-500 fill-current' : 'text-black'}`} 
                fill={post.isLiked ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="p-1">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <button className="p-1 rotate-90">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <button className="p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Likes */}
        {/* <div className="mb-2">
          <span className="font-semibold text-sm">{post.likes.toLocaleString()} likes</span>
        </div> */}

        {/* Caption */}
        <div className="mb-2">
          <span className="font-semibold text-sm mr-2">{user.username}</span>
          <span className="text-sm">{parseCaption(post.caption)}</span>
        </div>

        {/* Comments */}
        {/* {post.comments > 0 && (
          <div className="mb-2">
            <button className="text-gray-500 text-sm">
              View all {post.comments} comments
            </button>
          </div>
        )} */}

        {/* Time */}
        <div className="text-gray-500 text-xs uppercase">
          {formatTimeAgo(post.created_at)}
        </div>
      </div>
    </div>
  );
}