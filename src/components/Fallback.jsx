import styled from "styled-components";

const StyledFallback = styled.section`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
        color: var(--text-opacity);
        font-size: 2rem;
        text-align: center;
    }
`;

const Fallback = () => {
    return (
        <StyledFallback>
            <h1>Hang on...</h1>
        </StyledFallback>
    );
};

export default Fallback;
