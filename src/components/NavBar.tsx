import React from 'react';

import { NavLink, Link, useParams } from 'react-router-dom';

import logo from '../assets/bugtracking_logo.png';
import { useAuth } from './context/AuthContext';

interface ParamTypes {
    teamSlug: string;
    projectSlug: string;
    ticketSlug: string;
}

export default function NavBar(): React.ReactElement {
    const { teamSlug, projectSlug } = useParams<ParamTypes>();
    const { currentUser, logout } = useAuth();
    const [burgerIsActive, setBurgerIsActive] = React.useState(false);

    return (
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <img src={logo} alt="Bugtracking.io" />
                </Link>

                <a
                    role="button"
                    className={burgerIsActive ? 'navbar-burger is-active' : 'navbar-burger'}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbar-main"
                    onClick={() => setBurgerIsActive(!burgerIsActive)}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            {/* Desktop Navbar */}
            <div id="navbar-main" className={burgerIsActive ? 'is-active navbar-menu' : 'navbar-menu'}>
                <div className="navbar-start">
                    {currentUser && (
                        <NavLink
                            className="navbar-item"
                            activeClassName="navbar-item has-text-weight-semibold"
                            exact
                            to="/teams/"
                        >
                            Teams
                        </NavLink>
                    )}

                    {teamSlug && (
                        <NavLink
                            className="navbar-item"
                            activeClassName="navbar-item has-text-weight-semibold"
                            exact
                            to={`/teams/${teamSlug}/projects/`}
                        >
                            Projects
                        </NavLink>
                    )}

                    {projectSlug && (
                        <NavLink
                            className="navbar-item"
                            activeClassName="navbar-item has-text-weight-semibold"
                            exact
                            to={`/teams/${teamSlug}/projects/${projectSlug}`}
                        >
                            Tickets
                        </NavLink>
                    )}
                </div>

                <div className="navbar-end">
                    {!currentUser ? (
                        <>
                            <div className="navbar-item">
                                <div className="buttons">
                                    <Link className="button is-primary" to="/auth/">
                                        <strong>Log In</strong>
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link">More</a>

                                <div className="navbar-dropdown is-right">
                                    <Link className="navbar-item" to="/docs/">
                                        How to use this site
                                    </Link>
                                    <Link className="navbar-item" to="/dashboard/">
                                        User dashboard
                                    </Link>
                                    <Link className="navbar-item" to="/dashboard/invitations">
                                        My team invitations
                                    </Link>
                                    <hr className="navbar-divider" />
                                    {currentUser && (
                                        <a className="navbar-item" onClick={() => logout()}>
                                            Log out
                                        </a>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
