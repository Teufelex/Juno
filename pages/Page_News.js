import React, { Fragment } from 'react';
import PropTypes from "prop-types";

import './Page_News.css';

class NewsPage extends React.PureComponent {


    render() {
        return( 
            <div className = "NewsPage">
                <div className = "NewsPage__titleWrapper">
                    news our Company
                </div>
            </div>
        )
    }
}

export default NewsPage;