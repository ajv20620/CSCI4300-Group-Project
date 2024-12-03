'use server';
import { auth } from "../../auth";
import Library from "../components/Library";

export default async function LibraryPage() {
  const session = await auth();

  return (
    <div>
      <Library session={session} />
    </div>
  );
}