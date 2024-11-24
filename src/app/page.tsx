'use server';
import { auth } from "../auth";
import HomePage from "./components/HomePage";

export default async function Home() {
  // Fetch the session server-side
  const session = await auth();

  return (
    <div>
      {/* Pass the session to the client component */}
      <HomePage session={session} />
    </div>
  );
}