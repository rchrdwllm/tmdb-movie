import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --bg: ${({ theme }) => theme.bg};
        --bg-opacity: ${({ theme }) => theme.bgOpacity};
        --bg-opacity-2: ${({ theme }) => theme.bgOpacity2};
        --second-bg: ${({ theme }) => theme.secondBg};
        --second-bg-opacity: ${({ theme }) => theme.secondBgOpacity};
        --text: ${({ theme }) => theme.text};
        --text-opacity: ${({ theme }) => theme.textOpacity};
        --text-opacity-2: ${({ theme }) => theme.textOpacity2};
        --accent: ${({ theme }) => theme.accent};
        --accent-opacity: ${({ theme }) => theme.accentOpacity};
        --skeleton-color: ${({ theme }) => theme.skeletonColor};
        --skeleton-highlight: ${({ theme }) => theme.skeletonHighlight};
        --gradient: ${({ theme }) => theme.gradient};
        --box-shadow: ${({ theme }) => theme.boxShadow};
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Inter';
        will-change: color, background-color;
        transition: 0.05s color, 0.25s background-color;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    body {
        font-size: 1rem;
        font-weight: 400;
        background-color: var(--bg);
        color: var(--text);
        a {
            text-decoration: none;
            color: inherit;
            display: inline-block;
        }
        img {
            width: 100%;
            transition: 0.5s opacity;
            will-change: opacity;
        }
        button, input {
            border: none;
            outline: none;
            font-size: inherit;
            color: inherit;
            &::placeholder {
                color: var(--text-opacity)
            }
        }
    }
`;

export default GlobalStyles;
