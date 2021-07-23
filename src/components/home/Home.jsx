import styled from "styled-components";
import { useWidth } from "../../hooks/useWidth";
import TopBar from "../TopBar";
import Featured from "./Featured";
import Trending from "./Trending";
import Popular from "./Popular";
import Footer from "../Footer";

const StyledDiscover = styled.div`
    wwidth: 100%;
    padding: 6rem 1rem 1rem;
    overflow-x: hidden;
    @media screen and (min-width: 640px) {
        padding: 5rem 3rem 3rem;
    }
    @media screen and (min-width: 768px) {
        padding: 8rem 3rem 3rem;
    }
    @media screen and (min-width: 1024px) {
        height: 100vh;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding: 5rem 2rem 2rem;
    }
    @media screen and (min-width: 1536px) {
        padding: 8rem 3rem 3rem;
    }
`;

const Discover = () => {
    const width = useWidth();

    return (
        <StyledDiscover>
            {width >= 1024 ? <TopBar /> : ""}
            <Featured />
            <Trending />
            <Popular />
            <Footer />
        </StyledDiscover>
    );
};

export default Discover;
