import { redirect } from "next/navigation";
import { auth, signIn } from "../../../auth";
import SignInTemplate from "../../../templates/SignIn";
import { SignInParams } from "../../../actions/auth/schemas";


export default async function SignInPage() {

    // const session = await auth();

    // console.log(session);

    // if (session)
    //    return redirect('/');

    const handleAction = async (params: SignInParams) => {
        "use server";
        await signIn("credentials", params);

        return redirect('/');
    }

    return <SignInTemplate handleAction={handleAction} />
}