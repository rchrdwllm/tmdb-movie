import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import { NavLink } from "react-router-dom";
import ThemeBtn from "./ThemeBtn";
import { updateQuery } from "../actions/updateQuery";

const StyledBar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    padding: 2rem 2rem 2rem calc(30% + 2rem);
    background-color: var(--bg-opacity);
    backdrop-filter: blur(30px) saturate(180%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--text-opacity-2);
    @media screen and (min-width: 1024px) {
        padding: 1rem 2rem 1rem calc(30% + 2rem);
    }
    @media screen and (min-width: 1536px) {
        padding: 2rem 3rem 2rem calc(30% + 3rem);
    }
    .page-heading {
        font-size: 1.5rem;
        font-weight: 700;
        @media screen and (min-width: 1536px) {
            font-size: 2rem;
        }
    }
`;

const TopBar = ({ genreName, movieTitle }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { query } = useParams();

    return (
        <StyledBar>
            <NavLink
                exact
                to="/"
                className="page-heading"
                onClick={() => dispatch(updateQuery(""))}
            >
                {query
                    ? "Search"
                    : location.pathname === "/"
                    ? "Discover"
                    : location.pathname === "/people"
                    ? "People"
                    : movieTitle
                    ? movieTitle
                    : genreName
                    ? genreName
                    : ""}
            </NavLink>
            <ThemeBtn />
        </StyledBar>
    );
};

export default TopBar;
