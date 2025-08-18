// components/NavBar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function NavBarContent() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="shadow-md shadow-gray-300 w-full overflow-x-hidden">
      <div className="max-w-screen-xl mx-auto px-4 flex justify-between items-center">
        <Image
          className="pl-2"
          src="/anonymousLogo.png"
          alt="Anonymous Message"
          width={90}
          height={42}
          priority
          onClick={() => router.push('/')}
        />
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          {session?.user ? (
            <>
              <span>
                Welcome, {session.user.username || session.user.email}
              </span>
              <Button
                onClick={() => {
                  signOut();
                  router.replace("/sign-in");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href="/sign-in">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function NavBarWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="shadow-md">
        <div className="container mx-auto flex justify-between items-center h-16">
          <div className="pl-3 w-[90px] h-[42px] bg-gray-200 rounded animate-pulse" />
          <div className="w-24 h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </nav>
    );
  }

  return <NavBarContent />;
}
