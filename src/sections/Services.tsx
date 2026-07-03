import styled from 'styled-components';
import { Container, Eyebrow, Section, SectionHeader, SectionText, SectionTitle } from '../components/Layout';

type ServicesProps = {
  t: {
    eyebrow: string;
    title: string;
    text: string;
    items: readonly {
      title: string;
      eyebrow: string;
      description: string;
      items: readonly string[];
    }[];
  };
};

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  position: relative;
  min-height: 320px;
  padding: 30px;
  border-radius: ${({ theme }) => theme.radius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.colors.shadow};
  overflow: hidden;
  transition: transform ${({ theme }) => theme.motion.medium}, border ${({ theme }) => theme.motion.fast};

  &::before {
    content: '';
    position: absolute;
    width: 130px;
    height: 130px;
    right: -64px;
    top: -64px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.primarySoft};
    transition: transform ${({ theme }) => theme.motion.medium};
  }

  &:hover {
    transform: translateY(-8px);
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:hover::before {
    transform: scale(1.35);
  }
`;

const CardEyebrow = styled.p`
  position: relative;
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 13px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.12em;
`;

const CardTitle = styled.h3`
  position: relative;
  margin: 0;
  font-size: 28px;
  line-height: 1.15;
  letter-spacing: -0.02em;
`;

const CardText = styled.p`
  position: relative;
  margin: 16px 0 22px;
  color: ${({ theme }) => theme.colors.muted};
`;

const ItemList = styled.ul`
  position: relative;
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
    font-size: 14px;
  }

  li::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 5px ${({ theme }) => theme.colors.primarySoft};
  }
`;

export function Services({ t }: ServicesProps) {
  return (
    <Section id="services">
      <Container>
        <SectionHeader>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <SectionTitle>{t.title}</SectionTitle>
          <SectionText>{t.text}</SectionText>
        </SectionHeader>

        <Cards>
          {t.items.map((service) => (
            <Card key={service.title}>
              <CardEyebrow>{service.eyebrow}</CardEyebrow>
              <CardTitle>{service.title}</CardTitle>
              <CardText>{service.description}</CardText>
              <ItemList>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ItemList>
            </Card>
          ))}
        </Cards>
      </Container>
    </Section>
  );
}
