import React, { useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { GlobalStyle } from './styles/GlobalStyle';
import { makeTheme, type ThemeMode } from './styles/theme';
import type { Language } from './data/i18n';

function Root() {
  const [mode, setMode] = useState<ThemeMode>('light');
  const [language, setLanguage] = useState<Language>('vi');
  const theme = useMemo(() => makeTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App
        mode={mode}
        language={language}
        onModeChange={setMode}
        onLanguageChange={setLanguage}
      />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
