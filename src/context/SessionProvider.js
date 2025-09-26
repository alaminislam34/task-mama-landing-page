"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers({ children, session }) {
  console.log(session)
  return (
    <SessionProvider
      session={session} // initial session from server
      refetchInterval={60} // optional: refetch every 60s
      refetchOnWindowFocus={true} // refetch on tab focus
    >
      {children}
    </SessionProvider>
  );
}
