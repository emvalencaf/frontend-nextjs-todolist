declare module "next-auth" {
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User {
        backendToken?: string; // Adicionando backendToken ao User
    }
    /**
     * The shape of the account object returned in the OAuth providers' `account` callback,
     * Usually contains information about the provider being used, like OAuth tokens (`access_token`, etc).
     */
    /**
     * Returned by `useSession`, `auth`, contains information about the active session.
     */
    interface Session {
        backendToken?: string;
    }
}

// The `JWT` interface can be found in the `next-auth/jwt` submodule
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface User {
        backendToken?: string;
    }
    interface JWT {
        /** OpenID ID Token */
        idToken?: string
        backendToken?: string;

    }
}