import React, { Fragment } from 'react';
import PropTypes from "prop-types";

import './Page_About.css';

class AboutPage extends React.PureComponent {


    render() {
        return( 
            <div className = "AboutPage">
                <div className = "AboutPage__block">
                    <img src="/assets/globe.jpg" className = "AboutPage__img"/>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                    in reprehenderit in voluptate velit esse cillum dolore eu 
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
                <div className = "AboutPage__block">
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                    in reprehenderit in voluptate velit esse cillum dolore eu 
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <img src="/assets/plant.jpg" className = "AboutPage__img"/>
                </div>
                <div className = "AboutPage__block">
                    <img src="/assets/bedroom.jpg" className = "AboutPage__img"/>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
                    in reprehenderit in voluptate velit esse cillum dolore eu 
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non 
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        )
    }
}

export default AboutPage;