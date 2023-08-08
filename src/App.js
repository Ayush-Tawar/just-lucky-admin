import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
// routes
import Router from "./routes";
// theme
import ThemeProvider from "./theme";
// components
import ScrollToTop from "./components/ScrollToTop";
import { BaseOptionChartStyle } from "./components/chart/BaseOptionChart";
import { AuthProvider } from "./utils/AuthContext";
import BackdropLoader from "./layouts/BackdropLoader";

// ----------------------------------------------------------------------

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <PersistGate persistor={persistor} loading={<BackdropLoader />}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Router />
            </AuthProvider>
          </QueryClientProvider>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}
