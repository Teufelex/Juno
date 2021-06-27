import React, { Fragment } from 'react';
import PropTypes from "prop-types";

import AboutPage from './Page_About';

import './Page_Main.css';

class MainPage extends React.PureComponent {


    render() {
        return( 
            <div className = "MainPage">
                <div className = "MainPage__titleWrapper">
                    <h2 className = "titleWrapper__title">Make your incredible travel</h2>
                </div>
                <AboutPage/>
            </div>
        )
    }
}

export default MainPage;