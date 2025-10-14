// Mock type for Instagram clone

export interface Story {
  id: number;
  username: string;
  avatar: string;
  isViewed: boolean;
}

export interface Post {
  id: number;
  user_id: number;
  image: string;
  object: number;
  caption: string;
  likes: number;
  comments: number;
  created_at: Date;
  isLiked: boolean;
}

export interface User {
  id: number;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  website?: string;
  followers: number;
  following: number;
  isFollowing: boolean;
  isOwnProfile: boolean;
  isVerified: boolean;
  posts: Post[];
}
