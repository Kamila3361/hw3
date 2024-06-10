"use client";

import React, {createContext, useContext, useState, ReactNode, useEffect} from "react";
import { useRouter } from "next/navigation";

interface AuthContextType{
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token') ? 
        JSON.parse(localStorage.getItem('token') as string) : "";
        if (!storedToken) {
            router.push("/login");
        } else {
            setIsAuthenticated(true);
        }
        console.log("again");
    }, [router]);

    return (
        <AuthContext.Provider value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider, useAuth };