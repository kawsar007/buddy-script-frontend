'use client';

import { AuthProvider } from '@/src/contexts/AuthContext';
import { ThemeProvider } from '@/src/contexts/ThemeContext';
import { getQueryClient } from '@/src/lib/api/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, useState } from 'react';
import { Toaster } from 'react-hot-toast';
// import { getQueryClient } from '@/lib/api/query-client';
// import { ThemeProvider } from '@/contexts/ThemeContext';
// import { AuthProvider } from '@/contexts/AuthContext';

export function Providers({ children }: { children: ReactNode }) {
  // useState (not a module-level constant) so the browser client survives
  // across re-renders but is still created client-side, matching the
  // server/browser split in lib/api/query-client.ts.
  const [queryClient] = useState(getQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              className: '!bg-card !text-card-foreground !border !border-border',
            }}
          />
        </AuthProvider>
      </ThemeProvider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
