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
            if (confirm("Are you want to delete?")) {
                this.itemRef.classList.add("BookingTours__deleted");
                setTimeout(this.deleteMyself, 1000);
            } else {
                this.setState({isDeleted: false});
            }
        }
    }

    render() {

        return (
            <div className="BookingTours" ref = {this.bookingRef}>
                <img src = {this.props.tour.image} alt = {this.props.tour.name + " photo"} className="BookingTours__photo"/>
                <div className="BookingTours__info">
                    <span className="BookingTours__name">{this.props.tour.name}</span>
                    <p className="BookingTours__description">{this.props.tour.description}</p>
                    
                    <div>
                        <span className="ticket__title">Your Personal Ticket:</span> 
                        <div className="BookingTours__color" 
                            style={{ backgroundColor: `${this.props.tour.color}` }}
                        >
                            <div className="BookingTours__layer"
                            style = {{backgroundImage: `url(${"/assets/Star_background.svg"})`}}
                            >
                                <div className="BookingTours__layerLogo"
                                style = {{backgroundImage: `url(${this.props.tour.logo})`}}
                                >
                                    <div className="BookingTours__JunoLogo"
                                    style = {{backgroundImage: `url(${"/assets/juno-ltd-logo-vector.svg"})`}}
                                    >
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="BookingTours__price">{this.props.tour.price + " $"}</span>
                    <button onClickCapture={this.buttonPressed} className="BookingTours__delete">×</button>
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