import styled from 'styled-components';

export const Container = styled.div`
  width: min(100% - 40px, ${({ theme }) => theme.layout.maxWidth});
  margin: 0 auto;

  @media (max-width: 640px) {
    width: min(100% - 28px, ${({ theme }) => theme.layout.maxWidth});
  }
`;

export const Section = styled.section<{ $compact?: boolean }>`
  padding: ${({ $compact }) => ($compact ? '72px 0' : '104px 0')};

  @media (max-width: 768px) {
    padding: ${({ $compact }) => ($compact ? '56px 0' : '72px 0')};
  }
`;

export const SectionHeader = styled.div`
  max-width: 760px;
  margin-bottom: 42px;
`;

export const Eyebrow = styled.p`
  margin: 0 0 12px;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-size: 13px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: clamp(32px, 5vw, 52px);
  line-height: 1.08;
  letter-spacing: -0.06em;
`;

export const SectionText = styled.p`
  margin: 18px 0 0;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 680px;
  font-size: 17px;
`;
