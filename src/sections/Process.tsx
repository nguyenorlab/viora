import styled from 'styled-components';
import { Container, Eyebrow, Section, SectionHeader, SectionText, SectionTitle } from '../components/Layout';

type ProcessProps = {
  t: {
    eyebrow: string;
    title: string;
    text: string;
    items: readonly string[];
  };
};

const Timeline = styled.div`
  display: grid;
  gap: 14px;
  counter-reset: process;
`;

const Step = styled.div`
  counter-increment: process;
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 18px;
  align-items: center;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 22px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  transition: transform ${({ theme }) => theme.motion.fast}, border ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateX(8px);
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::before {
    content: counter(process, decimal-leading-zero);
    width: 54px;
    height: 54px;
    display: grid;
    place-items: center;
    border-radius: 18px;
    background: ${({ theme }) => theme.colors.primarySoft};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 900;
  }

  span {
    font-size: 17px;
    font-weight: 700;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;

    &:hover {
      transform: translateY(-4px);
    }
  }
`;

export function Process({ t }: ProcessProps) {
  return (
    <Section id="process" $compact>
      <Container>
        <SectionHeader>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <SectionTitle>{t.title}</SectionTitle>
          <SectionText>{t.text}</SectionText>
        </SectionHeader>

        <Timeline>
          {t.items.map((item) => (
            <Step key={item}>
              <span>{item}</span>
            </Step>
          ))}
        </Timeline>
      </Container>
    </Section>
  );
}
