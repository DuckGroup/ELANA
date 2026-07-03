import { Header } from "@/app/components/header";
import { auth0 } from "@/lib/auth0";
import { getUserById } from "@/lib/api";
import { User } from "@/types/user";
import { redirect } from "next/navigation";
import { ProfilePanel } from "../components/profile/profilePanel";
import { Button } from "../components/button";

export default async function ProfilePage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const authUser = session.user;

  let dbUser: User | null = null;
  try {
    dbUser = await getUserById(authUser.sub);
  } catch (error) {
    console.error("Failed to load profile:", error);
  }

  const initial = (authUser.name || authUser.email || "?")
    .charAt(0)
    .toUpperCase();

  return (
    <>
      <Header />
      <main className="flex flex-col items-center px-4 py-10">
        <section className="w-full max-w-md flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-medium">
              {initial}
            </div>
            <h1 className="font-medium">{authUser.name || authUser.nickname}</h1>
          </div>

          {dbUser ? (
            <ProfilePanel
              userId={dbUser.id}
              email={dbUser.email}
              role={dbUser.role}
            />
          ) : (
            <p className="text-stone-600 text-center">
              We could not load your account details.
            </p>
          )}

          <Button
            name="Log out"
            color="secondary"
            route="/auth/logout"
            buttonType="link"
            textColor="black"
          />
        </section>
      </main>
    </>
  );
}
