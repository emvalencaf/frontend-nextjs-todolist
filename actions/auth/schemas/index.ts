import { object, string, z } from "zod"

export interface PayloadSignIn {
    user: {
        name: string;
        email: string;
    };
    accessToken: string;
}


export const signInSchema = object({
    email: string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: string({ required_error: "Password is required" })
        .min(1, "Password is required")
});

export type SignInParams = z.infer<typeof signInSchema>;

export const signUpSchema = object({
        firstName: z
            .string()
            .min(2, 'First name must be at least 2 characters long')
            .max(50, 'First name cannot exceed 50 characters'),
        lastName: z
            .string()
            .min(2, 'Last name must be at least 2 characters long')
            .max(50, 'Last name cannot exceed 50 characters'),
        birthday: z.string().refine((value) => !isNaN(Date.parse(value)), {
            message: 'Invalid date format',
        }),
        email: z.string().email('Invalid email format'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters long')
            .max(100, 'Password cannot exceed 100 characters'),
        confirmedPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmedPassword, {
        message: 'Passwords do not match',
        path: ['confirmedPassword'],
    });

export type SignUpParams = z.infer<typeof signUpSchema>;