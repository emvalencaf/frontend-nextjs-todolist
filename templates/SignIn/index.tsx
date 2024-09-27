'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { SignInParams, signInSchema } from '../../actions/auth/schemas';


export interface ISignInTemplate {
    handleAction: (signIn: SignInParams) => Promise<void>;
}

const SignInTemplate: React.FC<ISignInTemplate> = ({ handleAction }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<SignInParams>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: SignInParams) => {
        console.log('Sign In Data:', data);
        await handleAction(data);
    };

    return (
        <div className="w-full flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-50 bg-white p-8 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email')}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            {...register('password')}
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignInTemplate;
