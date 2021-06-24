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
                            <span>{this.props.counters.junoUserInfo.name}</span>
                        </div>
                    </Fragment> :
                    <Fragment>
                        <span>Sign in!</span>
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