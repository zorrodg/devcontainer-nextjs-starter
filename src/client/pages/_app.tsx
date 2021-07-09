import type { AppProps /*, AppContext */ } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps): JSX.Element {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default App;
