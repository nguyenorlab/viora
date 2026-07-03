import styled, { keyframes } from 'styled-components';
import { Container, Eyebrow, Section, SectionHeader, SectionText, SectionTitle } from '../components/Layout';

type CapabilitiesProps = {
  t: {
    eyebrow: string;
    title: string;
    text: string;
    items: readonly string[];
  };
};

const breathe = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.025); }
`;

const Wrapper = styled.div`
  position: relative;
  border-radius: 34px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  padding: 42px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    width: 260px;
    height: 260px;
    right: -100px;
    bottom: -110px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.accentSoft};
    animation: ${breathe} 6s ease-in-out infinite;
  }

  @media (max-width: 640px) {
    padding: 28px;
  }
`;

const Grid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const Capability = styled.div`
  min-height: 180px;
  padding: 22px;
  border-radius: 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surfaceLight};
  transition: transform ${({ theme }) => theme.motion.medium}, background ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateY(-8px) rotate(-0.5deg);
    background: ${({ theme }) => theme.colors.primarySoft};
  }

  strong {
    display: block;
    font-size: 18px;
    line-height: 1.35;
    letter-spacing: -0.03em;
  }
`;

export function Capabilities({ t }: CapabilitiesProps) {
  return (
    <Section id="capabilities">
      <Container>
        <Wrapper>
          <SectionHeader>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <SectionTitle>{t.title}</SectionTitle>
            <SectionText>{t.text}</SectionText>
          </SectionHeader>

          <Grid>
            {t.items.map((item) => (
              <Capability key={item}>
                <strong>{item}</strong>
              </Capability>
            ))}
          </Grid>
        </Wrapper>
      </Container>
    </Section>
  );
}
