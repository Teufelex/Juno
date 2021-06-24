import React, { Fragment } from 'react';
import PropTypes from "prop-types"; 
import {connect} from 'react-redux';
import JunoEvents from './events';
import { NavLink } from 'react-router-dom';

import { userOrder_add } from '../redux/countersAC';
import { COLORS } from '../AppData';

import './JunoTour.css';

class JunoTour extends React.PureComponent {

    static propTypes = {
        counters: PropTypes.object.isRequired,
    }

    state = {
        itemPressed: false,
        color: "", 
    }

    componentDidMount = () => {
        if (this.props.act) this.setState({itemPressed: true});
    };

    readPressed = () => {
        JunoEvents.emit("ShowActiveItem", this.props.tour);
    }

    orderPressed = () => {
        this.props.dispatch(userOrder_add({...this.props.tour, color: this.state.color}));
        this.cancelPressed();
    }

    cancelPressed = () => {
        JunoEvents.emit("HideActiveItem");
    }

    colorPressed = (e) => {
        let _color = e.target.getAttribute("data-color");
        this.setState({color: _color});
    }

    render() {
        let colors = [];
        if (this.state.itemPressed) {
            COLORS.forEach((b, idx) => {
                colors.push(
                <div style={{ backgroundColor: `${b}` }} 
                    key = {idx} 
                    className="color"
                    onClick={this.colorPressed}
                    data-color={b}
                ></div>
                );
            })
        }

        return (
            <Fragment>
                <div className={(this.state.itemPressed) ? "toursItem toursItem--active" : "toursItem"}>
                <div style={{ backgroundImage: `url(${this.props.tour.image})` }} className="toursItem__photo"/>
                <div className="toursItem__info">
                    <span className="toursItem__name">{this.props.tour.name}</span>
                    {
                    (this.state.itemPressed) ? 
                    <p className="toursItem__description">{this.props.tour.description}</p> : ""
                    }
                    {
                    (this.state.itemPressed && this.props.counters.junoUserInit) ? 
                    <Fragment>
                        <span>Choose your personal ticket color:</span>
                        <div className="toursItem__ticketColors">
                        {colors}
                        </div>
                    </Fragment> : ""
                    }
                    <span className="toursItem__price">{this.props.tour.price + " $"}</span>
                    {
                    (!this.state.itemPressed) ? 
                    <button onClick={this.readPressed} className="toursItem__more">Read More</button> : ""
                    }
                </div>
                </div>
                {
                    (this.state.itemPressed && this.props.counters.junoUserInit) ? 
                    <div className="toursItem__activeButtonBlock">
                        <button onClick={this.orderPressed} className="toursItem__order">Order</button>
                        <button onClick={this.cancelPressed} className="toursItem__cancel">Cancel</button>
                    </div> : ""
                }
                {
                    (this.state.itemPressed && !this.props.counters.junoUserInit) ? 
                    <div className="toursItem__activeButtonBlock">
                        <NavLink to="/cabinet">
                            <button onClick={this.navlinkPressed} className="toursItem__signIn">Sign In!</button>
                        </NavLink>
                    </div> : ""
                }
            </Fragment>
        );
    }
}

const mapStateToProps = function (state) {
    return {
      counters: state.counters,
    };
  };
  
export default connect(mapStateToProps)(JunoTour);