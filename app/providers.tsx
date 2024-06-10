'use client';

import { AuthProvider } from "./context/auth";
import { ThemeProvider } from "./context/theme";

export function Providers({ children }: Readonly<{children: React.ReactNode;}>) {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}