import React, { Fragment } from 'react';
import PropTypes from "prop-types"; 
import { NavLink } from 'react-router-dom';
import JunoEvents from './events';

import JunoTour from './JunoTour';

import './JunoTours.css';

class JunoTours extends React.PureComponent {

    static propTypes = {

    }

    state = { 
        elemOnPage: 4,
        activeElem: null,
    }

    componentDidMount = () => {
        JunoEvents.addListener('ShowActiveItem',this.e_showActiveItem);
        JunoEvents.addListener('HideActiveItem',this.e_hideActiveItem);
    };
    
    componentWillUnmount = () => {
        JunoEvents.removeListener('ShowActiveItem',this.e_showActiveItem);
        JunoEvents.removeListener('HideActiveItem',this.e_hideActiveItem);
    };

    e_showActiveItem = (it) => {
        this.setState({activeElem: it});
    }

    e_hideActiveItem = () => {
        this.setState({activeElem: null});
    }

    render() {
        let toursArr = [];
        let pagesArr = [];
        let page = this.props.page;
        let numOfPages = Math.ceil(this.props.tours.length / this.state.elemOnPage);
        let startIdx = (page - 1) * this.state.elemOnPage;
        let showElem = this.props.tours.slice().splice(startIdx, this.state.elemOnPage);
 
        showElem.forEach(b => {
            let block = <JunoTour tour={b}  key={b.code} act={false}/>;
            toursArr.push(block);
        });
    
        for(let i = 1; i <= numOfPages; i++) {
            if (i !== 1) pagesArr.push(<div key={i + 10}>|</div>);
            pagesArr.push(<NavLink to={"/tours/" + i} key={i} activeClassName="link--active">{i}</NavLink>);
        }

        return (
            <Fragment>
                {
                    (this.state.activeElem) ?
                    <div className="Tours__card">
                        <JunoTour tour={this.state.activeElem} act={true}/>
                    </div>
                    : ""
                }
                <div className="Tours">{toursArr}</div>
                <div className="Nav_List">{pagesArr}</div>
            </Fragment>
        );
    }
}

export default JunoTours;