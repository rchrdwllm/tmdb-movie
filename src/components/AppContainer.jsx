import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";

const StyledContainer = styled.div`
    @media screen and (min-width: 1024px) {
        display: grid;
        grid-template-columns: 30% 1fr;
    }
`;

const AppContainer = ({ children }) => {
    const theme = useSelector((state) => state.theme);

    return (
        <ThemeProvider theme={theme}>
            <StyledContainer>{children}</StyledContainer>
        </ThemeProvider>
    );
};

export default AppContainer;
