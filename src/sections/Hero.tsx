import styled, { keyframes } from 'styled-components';
import { Container } from '../components/Layout';

type HeroProps = {
  t: {
    badge: string;
    titlePrefix: string;
    titleSuffix: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    panel: readonly string[];
    metrics: readonly (readonly [string, string])[];
  };
};

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-14px) rotate(1.5deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.75; }
  50% { transform: scale(1.08); opacity: 1; }
`;

const HeroShell = styled.section`
  position: relative;
  padding: 96px 0 80px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 72px 0 56px;
  }
`;

const Grid = styled(Container)`
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 54px;
  align-items: center;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const Badge = styled.div`
  width: fit-content;
  margin-bottom: 22px;
  padding: 8px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 13px;
  font-weight: 800;
  box-shadow: ${({ theme }) => theme.colors.shadow};
`;

const Title = styled.h1`
  margin: 0;
  max-width: 850px;
  font-size: clamp(42px, 7vw, 74px);
  line-height: 0.98;
  letter-spacing: -0.03em;

  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Lead = styled.p`
  margin: 26px 0 0;
  max-width: 650px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: clamp(17px, 2vw, 20px);
`;

const Actions = styled.div`
  margin-top: 36px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
`;

const Button = styled.a<{ $variant?: 'primary' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: 0 22px;
  border-radius: ${({ theme }) => theme.radius.full};
  border: 1px solid ${({ theme, $variant }) => ($variant === 'ghost' ? theme.colors.border : theme.colors.primary)};
  background: ${({ theme, $variant }) => ($variant === 'ghost' ? theme.colors.surface : theme.colors.primary)};
  color: ${({ theme, $variant }) => ($variant === 'ghost' ? theme.colors.text : theme.colors.white)};
  font-weight: 800;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  transition: transform ${({ theme }) => theme.motion.fast}, background ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateY(-3px);
    background: ${({ theme, $variant }) => ($variant === 'ghost' ? theme.colors.primarySoft : theme.colors.primary)};
  }
`;

const VisualCard = styled.div`
  position: relative;
  min-height: 520px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 34px;
  background: ${({ theme }) => theme.colors.elevated};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  padding: 28px;
  overflow: hidden;
  animation: ${float} 7s ease-in-out infinite;

  @media (max-width: 920px) {
    min-height: 420px;
  }
`;

const Ring = styled.div`
  position: absolute;
  width: 190px;
  height: 190px;
  right: -46px;
  top: -48px;
  border: 22px solid ${({ theme }) => theme.colors.primarySoft};
  border-radius: 50%;
  animation: ${pulse} 5s ease-in-out infinite;
`;

const Dot = styled.div<{ $left: string; $top: string; $delay?: string }>`
  position: absolute;
  width: 12px;
  height: 12px;
  left: ${({ $left }) => $left};
  top: ${({ $top }) => $top};
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.accent};
  box-shadow: 0 0 0 8px ${({ theme }) => theme.colors.accentSoft};
  animation: ${pulse} 3.5s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay || '0s'};
`;

const CodePanel = styled.div`
  position: relative;
  z-index: 1;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.surfaceLight};
  padding: 20px;
`;

const PanelHeader = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 18px;

  span {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
  }

  span:nth-child(2) {
    background: ${({ theme }) => theme.colors.accent};
  }

  span:nth-child(3) {
    background: ${({ theme }) => theme.colors.muted};
  }
`;

const CodeLine = styled.p`
  margin: 10px 0;
  color: ${({ theme }) => theme.colors.muted};
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 14px;

  strong {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 800;
  }
`;

const MetricGrid = styled.div`
  position: absolute;
  left: 28px;
  right: 28px;
  bottom: 28px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    position: relative;
    left: auto;
    right: auto;
    bottom: auto;
    margin-top: 24px;
  }
`;

const Metric = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.surface};
  padding: 16px;
  transition: transform ${({ theme }) => theme.motion.fast}, border ${({ theme }) => theme.motion.fast};

  &:hover {
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.primary};
  }

  b {
    display: block;
    font-size: 22px;
    letter-spacing: -0.04em;
  }

  span {
    display: block;
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.muted};
    font-size: 12px;
  }
`;

export function Hero({ t }: HeroProps) {
  return (
    <HeroShell id="home">
      <Grid>
        <div>
          <Badge>{t.badge}</Badge>
          <Title>
            <span>{t.titlePrefix}</span> {t.titleSuffix}
          </Title>
          <Lead>{t.lead}</Lead>
          <Actions>
            {/* <Button href="tel:0365048367">{t.ctaPrimary}</Button> */}
            <Button href="#services" /*$variant="ghost"*/>
              {t.ctaSecondary}
            </Button>
          </Actions>
        </div>

        <VisualCard aria-label="VIORA system dashboard preview">
          <Ring />
          <Dot $left="76%" $top="38%" />
          <Dot $left="19%" $top="62%" $delay="-1.4s" />
          <Dot $left="49%" $top="62%" $delay="-1.4s" />
          <Dot $left="79%" $top="62%" $delay="-1.4s" />
          <CodePanel>
            <PanelHeader><span /><span /><span /></PanelHeader>
            {t.panel.map((item, index) => (
              <CodeLine key={item}>
                <strong>0{index + 1}</strong> · {item}
              </CodeLine>
            ))}
          </CodePanel>

          <MetricGrid>
            {t.metrics.map(([value, label]) => (
              <Metric key={value}>
                <b>{value}</b>
                <span>{label}</span>
              </Metric>
            ))}
          </MetricGrid>
        </VisualCard>
      </Grid>
    </HeroShell>
  );
}
