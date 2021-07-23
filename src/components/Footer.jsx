import styled from "styled-components";

const StyledFooter = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 3rem;
    padding: 0 3rem;
    p {
        text-align: center;
        line-height: 175%;
        color: var(--text-opacity);
        font-size: 0.875rem;
        &:last-child {
            margin-top: 2rem;
            a {
                display: block;
                margin: 0.5rem auto 0;
                opacity: 0.25;
                width: 75%;
            }
        }
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
            <p>
                Data from
                <a
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"
                        alt="TBDB Api"
                    />
                </a>
            </p>
        </StyledFooter>
    );
};

export default Footer;
