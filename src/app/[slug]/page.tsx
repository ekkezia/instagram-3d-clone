import Profile from '../profile/page';
import getSupabase from '@/utils/supabase/client';

export const revalidate = 60;

type UserSlugRow = {
  username: string;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {  
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data } = await supabase.from('instagram-clone-users').select('username').limit(100);
  const userData = data as UserSlugRow[] | null;
  if (!userData) return [];
  return userData.map((user) => ({
    "slug": user.username,
  }))
}
        
export type ParamsType = Promise<{ slug: string }>;

export default async function PhotoPage(props: { params: Promise<ParamsType> }) {
  const { slug } = await props.params;

  if (!slug) return <></>

  return (
    <Profile />
  );
}
