import React, { Fragment } from 'react';
import PropTypes from "prop-types"; 
import {connect} from 'react-redux';

import { userOrder_delete } from '../redux/countersAC';

import './JunoTourCabinet.css';

class JunoTourCabinet extends React.PureComponent {

    static propTypes = {
        counters: PropTypes.object.isRequired,
    }

    state = {
        isDeleted: false,
    }

    itemRef = null;

    bookingRef = (ref) => {
        this.itemRef = ref;
    }

    buttonPressed = () => {
        this.setState({isDeleted: true});
    }

    deleteMyself = () => {
        this.props.dispatch(userOrder_delete(this.props.tour.code));
    }

    componentDidUpdate = () => {
        if (this.state.isDeleted) {
            this.itemRef.classList.add("BookingTours__deleted");
            setTimeout(this.deleteMyself, 1000);
        }
    }

    render() {

        return (
            <div className="BookingTours" ref = {this.bookingRef}>
                <img src = {this.props.tour.image} alt = {this.props.tour.name + " photo"} className="BookingTours__photo"/>
                <div className="BookingTours__info">
                    <span className="BookingTours__name">{this.props.tour.name}</span>
                    <p className="BookingTours__description">{this.props.tour.description}</p>
                    <span className="BookingTours__price">{this.props.tour.price}</span>
                    <div>
                        Ticket color: 
                        <div className="BookingTours__color" 
                            style={{ backgroundColor: `${this.props.tour.color}` }}
                        ></div>
                    </div>
                    <button onClickCapture={this.buttonPressed} className="BookingTours__delete">x</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
      counters: state.counters,
    };
};
  
export default connect(mapStateToProps)(JunoTourCabinet);