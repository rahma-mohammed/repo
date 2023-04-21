import React from 'react'
import logo from '../../Images/logo.png'
import { NavLink, Link } from 'react-router-dom'

export default function NavBar({ userToken, logOut }) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
                <div className="container mt-2">
                    <Link className="navbar-brand" to={
                        userToken != null ? "Home" : "SignIn"
                    }>
                        <img src={logo} className="logo" />
                        Game Over
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {userToken != null ? <ul className="navbar-nav ms-4 me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link ActiveColor" : "nav-link"} to="Home">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "nav-link ActiveColor" : "nav-link"} to="All">All</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className={"nav-link dropdown-toggle"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Platforms
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className={({ isActive }) => isActive ? "dropdown-item ActiveColor" : "dropdown-item"} to="Pc">PC</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="Browser">Browser</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className={"nav-link dropdown-toggle"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort By
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="ReleaseDate">Release Date</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="Popularity">Popularity</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="Alphabetical">Alphabetical</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="Relevance">Relevance</NavLink></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className={"nav-link dropdown-toggle"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to="Racing">Racing</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="Sports">Sports</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="Social">Social</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="Shooter">Shooter</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="OpenWorld">Open World</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="Zombie">Zombie</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="Fantasy">Fantasy</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="ActionRpg">Action Rpg</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="Action">Action</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="Flight">Flight</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="BattleRoyale">Battle Royale</NavLink></li>
                                </ul>
                            </li>
                        </ul> : ""}
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {userToken != null ?
                                <li className="nav-item">
                                    <button type="button">Log Out</button>
                                </li>
                                :
                                <>
                                    <li className="nav-item">
                                        <NavLink className={({ isActive }) => isActive ? "nav-link ActiveColor" : "nav-link"} to='SignIn'>Join</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className={({ isActive }) => isActive ? "nav-link ActiveColor" : "nav-link"} to='SignUp'>
                                            <button type="button">
                                                Join Free
                                            </button>
                                        </NavLink>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
