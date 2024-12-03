'use server';
import { auth } from "../../auth";
import AddItem from "../components/AddItem";

export default async function AddItemPage() {
  const session = await auth();

  return (
    <div>
      <AddItem session={session} />
    </div>
  );
}
