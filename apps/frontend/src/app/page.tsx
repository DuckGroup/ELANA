import { auth0 } from "@/lib/auth0";
import './globals.css';
import { Header } from "./components/header";

export default async function Home() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <main>
        <Header></Header>
        <a href="/auth/login?screen_hint=signup">
          <button>Sign up</button>
        </a>
        <a href="/auth/login">
          <button>Log in</button>
        </a>
      </main>
    );
  }

  return (
    <main>
      <h1>Welcome, {session.user.name}!</h1>
      <p>
        <a href="/auth/logout">
          <button>Log out</button>
        </a>
      </p>
    </main>
  );
}