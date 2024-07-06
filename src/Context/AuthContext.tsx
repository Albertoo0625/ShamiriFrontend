import React, { createContext, FC, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Define the type for your authentication data
interface AuthData {
  user: string| null, 
  pwd:string | null, 
  roles:string| null, 
  accessToken:string | null
}

// Define the context type
interface AuthContextType {
    auth: AuthData;
    setAuth: Dispatch<SetStateAction<AuthData>>;
}

// Create the context with initial empty values
const AuthContext = createContext<AuthContextType>({
    auth: { user: null, pwd: null ,roles: null,accessToken: null},
    setAuth: () => {},
});

// Define props for AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [auth, setAuth] = useState<AuthData>({ user: null, pwd: null ,roles: null,accessToken: null });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

// Export the context for use in consuming components
export default AuthContext;
