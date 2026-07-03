import styled from 'styled-components';
// import { company } from '../data/site';
import { Container, Eyebrow, Section } from '../components/Layout';
import { getContactText } from './sectionsI18n';
import { Language } from '../data/i18n';

type ContactProps = {
  t: {
    eyebrow: string;
    title: string;
    text: string;
    phone: string;
    email: string;
    address: string;
  };
  language: Language;
};

const ContactBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  gap: 28px;
  align-items: stretch;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const CTA = styled.div`
  position: relative;
  padding: 42px;
  border-radius: 34px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.colors.shadow};

  &::after {
    content: '';
    position: absolute;
    width: 220px;
    height: 220px;
    right: -80px;
    bottom: -90px;
    border: 24px solid rgba(255,255,255,0.16);
    border-radius: 999px;
  }

  h2 {
    position: relative;
    margin: 0;
    max-width: 720px;
    font-size: clamp(34px, 5vw, 58px);
    line-height: 1.2;
    letter-spacing: -0.03em;
  }

  p {
    position: relative;
    margin: 18px 0 0;
    max-width: 620px;
    font-size: 18px;
    opacity: 0.9;
  }
`;

const ContactPanel = styled.div`
  padding: 34px;
  border-radius: 34px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.colors.shadow};
`;

const ContactItem = styled.a`
  display: block;
  padding: 18px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: transform ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateX(6px);
  }

  &:last-child {
    border-bottom: 0;
  }

  span {
    display: block;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 13px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  strong {
    display: block;
    margin-top: 6px;
    line-height: 1.45;
  }
`;

export function Contact({ t, language }: ContactProps) {
  const l = getContactText(language);

  return (
    <Section id="contact" $compact>
      <Container>
        <ContactBox>
          <CTA>
            <Eyebrow style={{ color: 'white', opacity: 0.9 }}>{t.eyebrow}</Eyebrow>
            <h2>{t.title}</h2>
            <p>{t.text}</p>
          </CTA>

          <ContactPanel>
            <ContactItem>
              <span>{t.phone}</span>
              <strong>{l.phone}</strong>
            </ContactItem>
            <ContactItem>
              <span>{t.email}</span>
              <strong>{l.email}</strong>
            </ContactItem>
            <ContactItem>
              <span>{t.address}</span>
              <strong>{l.address}</strong>
            </ContactItem>
          </ContactPanel>
        </ContactBox>
      </Container>
    </Section>
  );
}
