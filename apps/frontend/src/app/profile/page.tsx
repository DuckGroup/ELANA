import { Header } from "@/app/components/header";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { Button } from "../components/button";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  const user = session?.user;
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center">
        <section className="flex flex-col px-4 py-2 gap-4 justify-center max-w-156">
          <h1>Hello, {user.name || user.nickname}!</h1>
          <p>{user.email}</p>
          <Button
            name="logout"
            color="primary"
            route="/auth/logout"
            buttonType="link"
            textColor="white"
          />
        </section>
      </main>
    </>
  );
}
