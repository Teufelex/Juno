import React, { Fragment } from 'react';
import PropTypes from "prop-types"; 
import {connect} from 'react-redux';
import JunoEvents from './events';
import { NavLink } from 'react-router-dom';
import { Prompt } from 'react-router';

import { userOrder_add } from '../redux/countersAC';
import { COLORS } from '../AppData';

import './JunoTour.css';

class JunoTour extends React.PureComponent {

    static propTypes = {
        counters: PropTypes.object.isRequired,
        act: PropTypes.bool.isRequired,
    }

    state = {
        itemPressed: false,
        color: "", 
        disabled: true,
        isBlocking: false,
    }

    blockRef = null;

    compRef = (ref) => {
        this.blockRef = ref;
    }

    componentDidMount = () => {
        if (this.props.act) this.setState({itemPressed: true});
    };

    readPressed = () => {
        JunoEvents.emit("ShowActiveItem", this.props.tour);
    }

    orderPressed = () => {
        this.props.dispatch(userOrder_add({...this.props.tour, color: this.state.color}));
        this.blockRef.classList.remove("toursItem--viewed");
        this.blockRef.classList.add("toursItem--hidden");
        setTimeout(() => JunoEvents.emit("HideActiveItem"), 500);
    }

    cancelPressed = () => {
        if (this.state.isBlocking) {
            if (confirm("This page has unsaved changes. Are you sure you want to leave?")) {
                this.blockRef.classList.remove("toursItem--viewed");
                this.blockRef.classList.add("toursItem--hidden");
                setTimeout(() => JunoEvents.emit("HideActiveItem"), 500);
            }   
        } else {
            this.blockRef.classList.remove("toursItem--viewed");
            this.blockRef.classList.add("toursItem--hidden");
            setTimeout(() => JunoEvents.emit("HideActiveItem"), 500);
        }
    }

    colorPressed = (e) => {
        let _color = e.target.getAttribute("data-color");
        this.setState({color: _color, disabled: false, isBlocking: true});
    }

    render() {
        let colors = [];
        if (this.state.itemPressed) {
            COLORS.forEach((b, idx) => {
                colors.push(
                <div style={{ backgroundColor: `${b}` }} 
                    key = {idx} 
                    className={(this.state.color === b) ? "color color--active" : "color"}
                    onClick={this.colorPressed}
                    data-color={b}
                ></div>
                );
            })
        }

        return (
            <div ref={this.compRef} className={(this.state.itemPressed) ? "toursItem--viewed" : ""}>
                <Prompt
                        when={this.state.isBlocking}
                        message="This page has unsaved changes. Are you sure you want to leave?"
                />
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
                            <span className="toursItem__ticketColorsTitle">Choose your personal ticket color:</span>
                            <div className="toursItem__ticketColors">
                            {colors}
                            </div>
                        </Fragment> : ""
                        }
                        <span className={(!this.state.itemPressed) ? "toursItem__price" : "toursItem__price--active"}>
                            {this.props.tour.price + " $"}
                        </span>
                        {
                        (!this.state.itemPressed) ? 
                        <button onClick={this.readPressed} className="toursItem__more">Read More</button> : ""
                        }
                    </div>
                </div>
                {
                    (this.state.itemPressed && this.props.counters.junoUserInit) ? 
                    <div className="toursItem__activeButtonBlock">
                        <button 
                            onClick={this.orderPressed} 
                            className="toursItem__order"
                            disabled={this.state.disabled}
                        >Order</button>
                        <button onClick={this.cancelPressed} className="toursItem__cancel">Cancel</button>
                    </div> : ""
                }
                {
                    (this.state.itemPressed && !this.props.counters.junoUserInit) ? 
                    <div className="toursItem__activeButtonBlock">
                        <NavLink to="/cabinet">
                            <button onClick={this.navlinkPressed} className="toursItem__signIn">Log In!</button>
                        </NavLink>
                        <button onClick={this.cancelPressed} className="toursItem__cancel">Cancel</button>
                    </div> : ""
                }
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
      counters: state.counters,
    };
  };
  
export default connect(mapStateToProps)(JunoTour);