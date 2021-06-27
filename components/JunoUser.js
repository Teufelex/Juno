import React, { Fragment } from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';

import './JunoUser.css'

class JunoUser extends React.PureComponent {

    static propTypes = {
        counters: PropTypes.object.isRequired, 
    };    

    render() {
        return(
            <div className = "userBlock">
                {
                    (this.props.counters.junoUserInit) ?
                    <Fragment>
                        <img src="/assets/user.png"  alt="user photo" className="userBlock__photo"/>
                        <div className = "userBlock__info">
                            <span className="info__name">{this.props.counters.junoUserInfo.name}</span>
                            <span>Orders: {this.props.counters.junoUserBooking.length}</span>
                            <span>Comments: {this.props.counters.junoUserComments.length}</span>
                        </div>
                    </Fragment> :
                    <Fragment>
                        <span>Log in!</span>
                    </Fragment>
                }
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
      counters: state.counters,
    };
  };

export default connect(mapStateToProps)(JunoUser);