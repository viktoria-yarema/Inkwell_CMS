"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type PropsWithChildren } from "react";

export const queryClientDefault = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 1000 } },
});

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    return queryClientDefault;
  } else {
    if (!browserQueryClient) browserQueryClient = queryClientDefault;
    return browserQueryClient;
  }
}

export const queryClient = getQueryClient();

export default function ReactQueryProvider({
  children,
}: Readonly<PropsWithChildren>) {
  return (
    <QueryClientProvider client={queryClientDefault}>
      {children}
      <ReactQueryDevtools
        buttonPosition="bottom-left"
        initialIsOpen={import.meta.env.VITE_NODE_ENV === "development"}
      />
    </QueryClientProvider>
  );
}
