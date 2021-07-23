import styled from "styled-components";
import { useGenres } from "../hooks/useGenres";
import { NavLink } from "react-router-dom";
import Form from "./Form";

const StyledNav = styled.nav`
    position: relative;
    width: 100%;
    height: 100vh;
    z-index: 3;
    background-color: var(--second-bg);
    backdrop-filter: blur(30px) saturate(180%);
    overflow-y: scroll;
    padding: 1rem 2rem 2rem;
    -webkit-overflow-scrolling: touch;
    @media screen and (min-width: 1536px) {
        padding: 2rem 3rem 3rem;
    }
    .logo {
        font-size: 1.5rem;
        font-weight: 700;
        @media screen and (min-width: 1536px) {
            font-size: 2rem;
        }
    }
    .menu {
        margin-top: 1rem;
        @media screen and (min-width: 1536px) {
            margin-top: 3rem;
        }
        .label {
            color: var(--text-opacity);
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 4px;
        }
        .nav-links {
            list-style: none;
            margin-top: 1rem;
            li {
                &:not(:first-child) {
                    margin-top: 0.5rem;
                }
                .nav-link {
                    padding: 0.5rem;
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    &:hover {
                        background-color: var(--accent-opacity);
                        color: var(--accent);
                    }
                    &.active-link {
                        background-color: var(--accent);
                        color: #ffffff;
                        &:hover {
                            background-color: var(--accent);
                            color: #ffffff;
                        }
                    }
                }
            }
        }
    }
`;

const DesktopNav = () => {
    const genres = useGenres();

    return (
        <StyledNav>
            <NavLink exact to="/" className="logo">
                Movies
            </NavLink>
            <Form />
            <div className="menu">
                <p className="label">Menu</p>
                <ul className="nav-links">
                    <li>
                        <NavLink
                            exact
                            to="/"
                            className="nav-link"
                            activeClassName="active-link"
                        >
                            Discover
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="menu">
                <p className="label">Genres</p>
                <ul className="nav-links">
                    {genres
                        ? genres.map(({ id, name }) => (
                              <li key={id}>
                                  <NavLink
                                      exact
                                      to={`/genres/${name.toLowerCase()}`}
                                      className="nav-link"
                                      activeClassName="active-link"
                                  >
                                      {name}
                                  </NavLink>
                              </li>
                          ))
                        : ""}
                </ul>
            </div>
        </StyledNav>
    );
};

export default DesktopNav;
