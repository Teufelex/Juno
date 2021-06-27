import React, { Fragment } from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';

import JunoTour from './JunoTourCabinet';

import './UserCabinet.css';

class UserCabinet extends React.PureComponent {

    static propTypes = {
        counters: PropTypes.object.isRequired,
    }

    state = {
        workMode: 1, // 1 - booking, 2 - info, 3 - comments
    }

    changeWorkMode_1 = (e) => {
        this.setState({workMode: 1});
    }

    changeWorkMode_2 = (e) => {
        this.setState({workMode: 2});
    }

    changeWorkMode_3 = (e) => {
        this.setState({workMode: 3});
    }

    render() {
        let tours = [];
        let b = this.props.counters.junoUserBooking;
        if (this.state.workMode === 1) {
            for (let i = 0; i < b.length; i++) {
                    let block = <JunoTour tour={b[i]}  key={b[i].code}/>;
                    tours.push(block);
            }
        }

        let comments = [];
        let _com = this.props.counters.junoUserComments;
        if (this.state.workMode === 3) {
            for (let i = 0; i < _com.length; i++) {
                let block = 
                <div key = {i} className = "Comment__block">
                    <div className = "Comment__name">{_com[i].name}</div>
                    <div className = "Comment__text">{_com[i].text}</div>
                </div>;
                comments.push(block);
            }
        }

        return (
            <div className="UserCabinet">
                    <ul className="UserCabinet__navigation">
                        <li 
                            onClick={this.changeWorkMode_1} 
                            className={(this.state.workMode === 1) ? "UserCabinet__InfoItem--active" : ""}
                        >Orders</li>
                        <li 
                            onClick={this.changeWorkMode_2}
                            className={(this.state.workMode === 2) ? "UserCabinet__InfoItem--active" : ""}
                        >Info</li>
                        <li 
                            onClick={this.changeWorkMode_3}
                            className={(this.state.workMode === 3) ? "UserCabinet__InfoItem--active" : ""}
                        >Comments</li>
                    </ul>
                    <div>
                    {
                        (this.state.workMode === 1) ? 
                        <Fragment>
                            {tours}
                        </Fragment>
                        : (this.state.workMode === 2) ?
                        <Fragment>
                            <div className="UserCabinet__ClientInfo">
                                <div className="UserCabinet__InfoItem">
                                    Name: {this.props.counters.junoUserInfo.name}
                                </div>
                                <div className="UserCabinet__InfoItem">
                                    Surname: {this.props.counters.junoUserInfo.surname}
                                </div>
                                <div className="UserCabinet__InfoItem">
                                    Lastname: {this.props.counters.junoUserInfo.lastname}
                                </div>
                                <div className="UserCabinet__InfoItem">
                                    Phone: {this.props.counters.junoUserInfo.phone}
                                </div>
                                <div className="UserCabinet__InfoItem">
                                    Email: {this.props.counters.junoUserInfo.email}
                                </div>
                            </div>
                        </Fragment>
                        : 
                        <Fragment>
                            {comments}
                        </Fragment>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
      counters: state.counters,
    };
  };
  
export default connect(mapStateToProps)(UserCabinet);