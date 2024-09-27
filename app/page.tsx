import { redirect } from "next/navigation";
import { auth, signOut } from "../auth";
import TasksContainer from "../components/TaskContainer";
import SignOut from "../components/SignOut";

export default async function Home() {
  const session = await auth();

  if (!session)
    return redirect('/sign-in');

  const handleAction = async () => {
    "use server";

    await signOut();
    
    return redirect('/sign-in');
  }

  return (
    <>
      <h1 className="text-center font-bold">Hi, {session.user?.name}</h1>
      <SignOut handleAction={handleAction} />
      <TasksContainer />
    </>
  );
}
