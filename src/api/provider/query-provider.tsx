// Query Imports
import { queryClient, persister } from "./query-client";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

export function QueryProvider(props: React.PropsWithChildren) {
  // ** Props
  const { children } = props;

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
