import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials, { CredentialsConfig } from "next-auth/providers/credentials";
import { handleSignIn } from "./actions/auth";
import { signInSchema } from "./actions/auth/schemas";

// Your own logic for dealing with plaintext password strings; be careful!

const configCredentialsOptions: CredentialsConfig = {
    async authorize(credentials) {
        try {

            const { email, password } = await signInSchema.parseAsync({
                password: credentials.password,
                email: credentials.email,
            });
    
            // Fazendo a autenticação
            const res = await handleSignIn({ email, password });
            console.log(res);
    
            if (!res || !res.user) {
                throw new Error("Invalid email or password");
            }
    
            const { user, backendToken } = res;
            
            user.backendToken = backendToken;
    
            return user;

        } catch (err) {
            console.log(err);
            throw new Error("Failed to authenticate user");
        }
    },
    type: "credentials",
    credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password", placeholder: "Your password" },
    },
    id: "credentials",
    name: "Credentials",
};

export const authOptions: NextAuthConfig = {
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials(configCredentialsOptions),
    ],
    pages: {
        signIn: "/sign-in",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.backendToken = user.backendToken;  // Add backendToken to the token
                token.name = user.name;
                token.email = user.email;
            }

            // console.log("Token in JWT callback:", token);
            return token;
        },
        async session({ session, token }) {
            session.backendToken = token.backendToken;  // Make backendToken available in the session
            return session;
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async redirect({ url, baseUrl }) {
            return baseUrl;
        }
    },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);