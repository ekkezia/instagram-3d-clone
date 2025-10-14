"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

export type SupabaseRow = Record<string, unknown>;

type SupabaseContextValue = {
  users: SupabaseRow[] | null;
  setUsers: (d: SupabaseRow[] | null) => void;
  posts: SupabaseRow[] | null;
  setPosts: (d: SupabaseRow[] | null) => void;
  refresh?: () => Promise<void>;
};

const SupabaseDataContext = createContext<SupabaseContextValue | undefined>(undefined);

export function SupabaseDataProvider({ initialUserData, initialPostData, children }: { initialUserData?: SupabaseRow[] | null; initialPostData?: SupabaseRow[] | null; children: React.ReactNode }) {
  const [users, setUsers] = useState<SupabaseRow[] | null>(initialUserData ?? null);
  const [posts, setPosts] = useState<SupabaseRow[] | null>(initialPostData ?? null);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/users');
      if (!res.ok) return;
      const json = await res.json();
      // Expect shape { data } or diagnostic shape
      if (json.data) setUsers(json.data);
      else if (json.primary?.data) setUsers(json.primary.data);
    } catch {
      // noop
    }
  }, []);

  return (
    <SupabaseDataContext.Provider value={{ users, setUsers, posts, setPosts, refresh }}>
      {children}
    </SupabaseDataContext.Provider>
  );
}

export function useSupabaseData() {
  const ctx = useContext(SupabaseDataContext);
  if (!ctx) throw new Error('useSupabaseData must be used within SupabaseDataProvider');
  return ctx;
}

export default SupabaseDataContext;
