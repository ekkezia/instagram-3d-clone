import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNavigation from "@/components/bottom-navigation";
import { SupabaseDataProvider } from '@/context/SupabaseDataContext';
import supabase from '@/utils/supabase/client';
import Header from '@/components/Header';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Instagram Clone",
  description: "Instagram-like social media app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // server-side fetch of initial data for the provider
  const { data: userData } = await supabase.from('instagram-clone-users').select().limit(100);
  const { data: postData } = await supabase.from('instagram-clone-posts').select().limit(100);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen flex items-center justify-center`}
      >
        <div className="max-w-md mx-auto bg-white h-screen md:h-[740px] overflow-y-scroll relative md:rounded-2xl shadow-xl">
          <Header />
          <main className="pb-16">
            <SupabaseDataProvider initialUserData={userData} initialPostData={postData}>
              {children}
            </SupabaseDataProvider>
          </main>
          <BottomNavigation />
        </div>
      </body>
    </html>
  );
}
