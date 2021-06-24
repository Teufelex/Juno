import React, { Fragment } from 'react';
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';

import './JunoMenu.css';

class PageNavigation extends React.PureComponent {


    render() {
        return (
            <div className = "pageMenu">
                <NavLink to="/" exact className = "pageMenu__item">Main</NavLink>
                <NavLink to="/about" className = "pageMenu__item">About</NavLink>
                <NavLink to="/tours/1" className = "pageMenu__item">Tours</NavLink>
                <NavLink to="/reviews" className = "pageMenu__item">Reviews</NavLink>
                <NavLink to="/contacts" className = "pageMenu__item">Contacts</NavLink>
                <NavLink to="/news" className = "pageMenu__item">News</NavLink>
            </div>
        )
    } 
}

export default PageNavigation;

let newsArr = [
    {
        
    },
]