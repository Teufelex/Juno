import React, { Fragment } from 'react';
import JunoTours from "../components/JunoTours";

import {TOURS_ARR} from "../AppData";
import './Page_Tours.css';

class ToursPage extends React.PureComponent {

    render() {
        return <JunoTours tours = {TOURS_ARR} page={this.props.match.params.trpg}/>
    }
}

export default ToursPage;