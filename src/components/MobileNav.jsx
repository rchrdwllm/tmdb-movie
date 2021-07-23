import styled from "styled-components";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAnimations } from "../hooks/useAnimations";
import { useGenres } from "../hooks/useGenres";
import ThemeBtn from "./ThemeBtn";
import Form from "./Form";

const StyledNav = styled(motion.nav)`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    background-color: var(--bg-opacity);
    backdrop-filter: blur(25px) saturate(180%);
    border-bottom: 1px solid var(--text-opacity-2);
    transition: none;
    .shown {
        height: 10vh;
        padding: 0 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media screen and (min-width: 640px) {
            padding: 0 3rem;
        }
        .logo {
            font-size: 1.5rem;
            font-weight: 700;
        }
        .burger {
            cursor: pointer;
            .burger-line {
                width: 32px;
                height: 1px;
                background-color: var(--text);
                margin: 3px 0;
            }
        }
    }
    .hidden {
        height: 0;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        .menu {
            padding: 1rem;
            @media screen and (min-width: 640px) {
                padding: 1rem 3rem;
                &:last-child {
                    padding: 1rem 3rem 3rem;
                }
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
    }
`;

const MobileNav = () => {
    const [shouldOpen, setOpen] = useState(false);
    const { menuReveal, navOpacity } = useAnimations();
    const genres = useGenres();
    const query = useSelector((state) => state.query);

    const toggleMenu = () => {
        shouldOpen ? setOpen(false) : setOpen(true);
    };

    useEffect(() => {
        setOpen(false);
    }, [query]);

    useEffect(() => {
        const themeBtn = document.querySelector(".theme-btn");

        themeBtn.addEventListener("click", toggleMenu);

        return () => themeBtn.removeEventListener("click", toggleMenu);
    }, [shouldOpen]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <StyledNav
            variants={navOpacity}
            initial="initial"
            animate={shouldOpen ? "animate" : "initial"}
        >
            <div className="shown">
                <NavLink exact to="/" className="logo">
                    Movies
                </NavLink>
                <div className="burger" onClick={toggleMenu}>
                    <div className="burger-line"></div>
                    <div className="burger-line"></div>
                </div>
            </div>
            <motion.div
                className="hidden"
                variants={menuReveal}
                initial="initial"
                animate={shouldOpen ? "animate" : "initial"}
            >
                <ThemeBtn />
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
                                onClick={() => setOpen(false)}
                            >
                                Home
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
                                          onClick={() => setOpen(false)}
                                      >
                                          {name}
                                      </NavLink>
                                  </li>
                              ))
                            : ""}
                    </ul>
                </div>
            </motion.div>
        </StyledNav>
    );
};

export default MobileNav;
