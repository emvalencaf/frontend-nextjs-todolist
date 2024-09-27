import { redirect } from "next/navigation";
import SignUpTemplate from "../../../templates/SignUp";
import { SignUpParams } from "../../../actions/auth/schemas";
import { handleSignUp } from "../../../actions/auth";

export default async function SignUpPage() {

    // const session = await auth();

    // if (session)
    //    return redirect('/');

    const handleAction = async (signUp: SignUpParams) => {
        "use server";
        await handleSignUp(signUp);

        return redirect("/sign-in");
    }

    return <SignUpTemplate handleAction={handleAction} />
}