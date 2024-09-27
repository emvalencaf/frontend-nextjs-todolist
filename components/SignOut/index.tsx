"use client";

export interface ISignOut {
    handleAction: () => Promise<void>;
}

const SignOut: React.FC<ISignOut> = ({ handleAction, }) => {

    const onClick = async () => {
        await handleAction();
    }

    return <button onClick={onClick} className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200 mt-4">
        Sign Out
    </button>
}

export default SignOut;