import React, { Fragment } from 'react';
import PropTypes from "prop-types";
import { NavLink } from 'react-router-dom';

import './JunoMenu.css';

class PageNavigation extends React.Component {


    render() {
        return (
            <div className = "pageMenu">
                <NavLink to="/" exact className = "pageMenu__item" activeClassName="pageMenu__item--active">About</NavLink>
                <NavLink to="/tours/1" className = "pageMenu__item" activeClassName="pageMenu__item--active">Tours</NavLink>
                <NavLink to="/reviews" className = "pageMenu__item" activeClassName="pageMenu__item--active">Reviews</NavLink>
                <NavLink to="/contacts" className = "pageMenu__item" activeClassName="pageMenu__item--active">Contacts</NavLink>
            </div>
        )
    } 
}

export default PageNavigation;