import Profile from '../profile/page';
import supabase from '@/utils/supabase/client';

export const revalidate = 60;

export async function generateStaticParams(): Promise<{ slug: string }[]> {  
  const { data: userData } = await supabase.from('instagram-clone-users').select().limit(100);
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
