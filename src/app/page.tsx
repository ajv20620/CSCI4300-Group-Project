'use server';
import { auth } from "../auth";
import Home from "./components/Home";

export default async function HomePage() {
  const session = await auth();

  return (
    <div>
      <Home session={session} />
    </div>
  );
}