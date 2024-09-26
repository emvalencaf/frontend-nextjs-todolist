import { object, string, z } from "zod"

export interface CredentialSignInParams {
    email: string;
    password: string;
}

export interface PayloadSignIn {
    user: {
        name: string;
        email: string;
    };
    accessToken: string;
}

export interface SignUpParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthday: string;
}


export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
});


export const signUpSchema = z
    .object({
        firstName: z
            .string()
            .min(2, 'First name must be at least 2 characters long')
            .max(50, 'First name cannot exceed 50 characters'),
        lastName: z
            .string()
            .min(2, 'Last name must be at least 2 characters long')
            .max(50, 'Last name cannot exceed 50 characters'),
        sex: z.enum(['male', 'female'], {
            errorMap: () => ({ message: 'Sex must be either male or female' }),
        }),
        birthday: z.string().refine((value) => !isNaN(Date.parse(value)), {
            message: 'Invalid date format',
        }),
        email: z.string().email('Invalid email format'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters long')
            .max(100, 'Password cannot exceed 100 characters'),
        confirmedPassword: z.string(), // Campo para confirmar a senha
    })
    .refine((data) => data.password === data.confirmedPassword, {
        message: 'Passwords do not match',
        path: ['confirmedPassword'], // Define que o erro será associado ao campo confirmedPassword
    });
