"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};
