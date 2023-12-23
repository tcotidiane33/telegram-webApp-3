import React from 'react';
import './Nav.css';

const Nav = () => {
    return (
        <div className="navbar">
            <a href="/" className="navbarHome">Home</a>
            {/* <a href='/oder'>Panier</a> */}
            <a href="/category">Category</a>
        </div>
    );
};

export default Nav;
