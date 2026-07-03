import styled from 'styled-components';
import { Container } from './Layout';
import { languages, type Language } from '../data/i18n';
import type { ThemeMode } from '../styles/theme';

type HeaderProps = {
  t: {
    services: string;
    process: string;
    capabilities: string;
    contact: string;
    hotline: string;
    admin: string;
  };
  mode: ThemeMode;
  language: Language;
  onModeChange: (mode: ThemeMode) => void;
  onLanguageChange: (language: Language) => void;
};

const HeaderShell = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  backdrop-filter: blur(18px);
  background: ${({ theme }) => theme.mode === 'light' ? 'rgba(246, 248, 252, 0.78)' : 'rgba(11, 16, 32, 0.78)'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const HeaderInner = styled(Container)`
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;
  letter-spacing: -0.04em;
  font-size: 24px;
`;

const Mark = styled.span`
  width: 38px;
  height: 38px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 12px 34px ${({ theme }) => theme.colors.primarySoft};
  color: white;

  &::before {
    content: 'V';
    font-size: 20px;
    font-weight: 900;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 24px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
  font-weight: 700;

  a {
    position: relative;
    padding: 6px 0;
  }

  a::after {
    content: '';
    position: absolute;
    height: 2px;
    left: 0;
    right: 100%;
    bottom: 0;
    background: ${({ theme }) => theme.colors.primary};
    transition: right ${({ theme }) => theme.motion.fast};
  }

  a:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  a:hover::after {
    right: 0;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 560px) {
    gap: 6px;
  }
`;

const ToggleGroup = styled.div`
  display: flex;
  padding: 4px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.colors.shadow};
`;

const ToggleButton = styled.button<{ $active?: boolean }>`
  border: 0;
  min-width: 38px;
  height: 32px;
  padding: 0 10px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.muted)};
  font-weight: 800;
  font-size: 12px;
  transition: background ${({ theme }) => theme.motion.fast}, transform ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateY(-1px);
    color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.text)};
  }

  @media (max-width: 560px) {
    min-width: 34px;
    padding: 0 8px;
  }
`;

const ContactLink = styled.a`
  padding: 11px 18px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  font-weight: 800;
  font-size: 14px;
  box-shadow: ${({ theme }) => theme.colors.shadow};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primarySoft};
  }

  @media (max-width: 700px) {
    display: none;
  }
`;

export function Header({ t, mode, language, onModeChange, onLanguageChange }: HeaderProps) {
  return (
    <HeaderShell>
      <HeaderInner>
        <Brand href="#home" aria-label="VIORA home">
          <Mark />
          VIORA
        </Brand>

        <Nav aria-label="Primary navigation">
          <a href="#services">{t.services}</a>
          <a href="#process">{t.process}</a>
          <a href="#capabilities">{t.capabilities}</a>
          <a href="#contact">{t.contact}</a>
        </Nav>

        <Controls>
          <ToggleGroup aria-label="Theme mode">
            <ToggleButton $active={mode === 'light'} onClick={() => onModeChange('light')}>☀</ToggleButton>
            <ToggleButton $active={mode === 'dark'} onClick={() => onModeChange('dark')}>☾</ToggleButton>
          </ToggleGroup>

          <ToggleGroup aria-label="Language">
            {languages.map((item) => (
              <ToggleButton
                key={item.code}
                $active={language === item.code}
                onClick={() => onLanguageChange(item.code)}
              >
                {item.label}
              </ToggleButton>
            ))}
          </ToggleGroup>
        </Controls>
      </HeaderInner>
    </HeaderShell>
  );
}
