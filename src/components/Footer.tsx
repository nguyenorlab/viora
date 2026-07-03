import styled from 'styled-components';
import { Container } from './Layout';
import { company } from '../data/site';
import type { Language } from '../data/i18n';

type FooterProps = {
  t: {
    rights: string;
  };
  language: Language;
};

const FooterShell = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 34px 0;
  color: ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.backgroundSoft};
`;

const FooterInner = styled(Container)`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;

  strong {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export function Footer({ t, language }: FooterProps) {
  const companyText = company[language];

  return (
    <FooterShell>
      <FooterInner>
        <div>
          <strong>{companyText.legalName}</strong>
          <div>{companyText?.field ?? ''}</div>
        </div>
        <div>© {new Date().getFullYear()} VIORA. {t.rights}</div>
      </FooterInner>
    </FooterShell>
  );
}
