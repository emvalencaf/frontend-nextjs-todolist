"use client";
export interface ISignInDemoButton {
    handleAction: () => Promise<void>;
}

const SignInDemoButton: React.FC<ISignInDemoButton> = ({handleAction}) => {

    const onClick = () => {
        handleAction();
    }

    return (
        <button onClick={onClick} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 mt-4">
            Sign In with a Demo Account
        </button>
    );
}

export default SignInDemoButton;