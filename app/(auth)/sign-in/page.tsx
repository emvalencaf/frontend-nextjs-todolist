import { redirect } from "next/navigation";
import { auth, signIn } from "../../../auth";
import SignInTemplate from "../../../templates/SignIn";
import { SignInParams } from "../../../actions/auth/schemas";
import SignInDemoButton from "../../../components/SignInDemoButton";


export default async function SignInPage() {

    const session = await auth();

    if (session)
        return redirect('/');

    const handleAction = async (params: SignInParams) => {
        "use server";
        await signIn("credentials", params);

        return redirect('/');
    }
    
    const handleActionDemo = async () => {
        "use server"
        
        const params = {
            email: 'aocharle@gmail.com',
            password: 'mysecurepassword1234',
        }

        await signIn("credentials", params);

        return redirect('/');
    }    

    return <>
        <SignInTemplate handleAction={handleAction} />
        <SignInDemoButton handleAction={handleActionDemo} />
    </>
}