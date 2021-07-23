import styled from "styled-components";

const StyledFooter = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    padding: 0 3rem;
    p {
        text-align: center;
        line-height: 175%;
        color: var(--text-opacity);
        font-size: 0.875rem;
        a {
            color: var(--accent);
            transition: 0.15s color;
            &:hover {
                color: var(--text-opacity);
            }
        }
    }
`;

const Footer = () => {
    return (
        <StyledFooter>
            <p>
                Designed and developed with 💙 by{" "}
                <a href="/#" target="_blank" rel="noreferrer">
                    Richard William.
                </a>
            </p>
        </StyledFooter>
    );
};

export default Footer;
