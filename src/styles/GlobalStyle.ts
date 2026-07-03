import { createGlobalStyle, keyframes } from 'styled-components';

const floatBackground = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(18px, -16px, 0); }
`;

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
    transition: background ${({ theme }) => theme.motion.medium}, color ${({ theme }) => theme.motion.medium};
  }

  body::before,
  body::after {
    content: '';
    position: fixed;
    z-index: -1;
    pointer-events: none;
    border-radius: 999px;
    opacity: ${({ theme }) => (theme.mode === 'light' ? 0.45 : 0.28)};
    animation: ${floatBackground} 10s ease-in-out infinite;
  }

  body::before {
    width: 420px;
    height: 420px;
    left: -120px;
    top: 80px;
    background: ${({ theme }) => theme.colors.primarySoft};
  }

  body::after {
    width: 360px;
    height: 360px;
    right: -120px;
    top: 18vh;
    background: ${({ theme }) => theme.colors.accentSoft};
    animation-delay: -4s;
  }

  html::before {
    content: 'VIORA';
    position: fixed;
    top: 40%;
    left: 55%;
    transform: translateX(-50%);
    z-index: -2;
    pointer-events: none;
    font-size: 20vw;
    font-weight: 900;
    letter-spacing: 1vw;
    color: ${({ theme }) => theme.colors.accentSoft};
    opacity: ${({ theme }) => (theme.mode === 'light' ? 0.25 : 0.2)};
    white-space: nowrap;
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }  

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, textarea {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 1ms !important;
    }
  }
`;
