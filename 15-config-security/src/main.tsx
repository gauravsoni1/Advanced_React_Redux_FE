import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css'
import "./i18n.ts";
import { persistor, store } from './redux/store.ts';
// import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/ErrorBoundary/ErrorFallback.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './theme/ThemeProvider.tsx';
import { FeatureFlagProvider } from './components/HOC/FeatureFlagProvider.tsx';
// import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';

(async () => {
  // const LDProvider = await asyncWithLDProvider({
  //   clientSideID: '669ba4ddeecc911072f423bd',
  //   // reactOptions: {
  //   //   useCamelCaseFlagKeys: false
  //   // }
  // });

  const root = ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Provider store={store}>
              <ThemeProvider>
                {/* <LDProvider> */}
                <FeatureFlagProvider>
                  <App />
                </FeatureFlagProvider>
                {/* </LDProvider> */}
              </ThemeProvider>
            </Provider>
          </BrowserRouter>
        </PersistGate>
      </ErrorBoundary>
    </React.StrictMode>,
  )
})();



