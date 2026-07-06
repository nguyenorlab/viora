import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Services } from './sections/Services';
import { Process } from './sections/Process';
import { Capabilities } from './sections/Capabilities';
import { Contact } from './sections/Contact';
import { dictionary, type Language } from './data/i18n';
import { AdminAttendancePage } from './admin/AdminAttendancePage';
import type { ThemeMode } from './styles/theme';

type AppProps = {
  mode: ThemeMode;
  language: Language;
  onModeChange: (mode: ThemeMode) => void;
  onLanguageChange: (language: Language) => void;
};

export default function App({ mode, language, onModeChange, onLanguageChange }: AppProps) {
  const t = dictionary[language];
  const getHashPath = () => window.location.hash.slice(1) || '/';
  const [path, setPath] = useState(getHashPath);

  useEffect(() => {
    const updatePath = () => setPath(getHashPath());
    window.addEventListener('hashchange', updatePath);
    return () => window.removeEventListener('hashchange', updatePath);
  }, []);

  if (path.startsWith('/admin')) {
    return (
      <AdminAttendancePage
        mode={mode}
        language={language}
        onModeChange={onModeChange}
        onLanguageChange={onLanguageChange}
      />
    );
  }

  return (
    <>
      <Header
        t={t.nav}
        mode={mode}
        language={language}
        onModeChange={onModeChange}
        onLanguageChange={onLanguageChange}
      />
      <main>
        <Hero t={t.hero} />
        <Services t={t.services} />
        <Process t={t.process} />
        <Capabilities t={t.capabilities} />
        <Contact t={t.contact} language={language} />
      </main>
      <Footer t={t.footer} language={language} />
    </>
  );
}
