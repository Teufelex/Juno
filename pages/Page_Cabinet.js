import React, { Fragment } from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';

import { userName_add } from '../redux/countersAC';
import UserCabinet from '../components/UserCabinet';

import './Page_Cabinet.css';

class PageCabinet extends React.PureComponent {

    state = {
        nameValue: "",
        lastnameValue: "",
        surnameValue: "",
        phoneValue: "",
        mailValue: "",
        nameValid: null,
        lastnameValid: null,
        surnameValid: null,
        phoneValid: null,
        mailValid: null,
        pass: false,
    }

    nameChanged = (e) => this.setState({nameValue: e.target.value});

    lastnameChanged = (e) => this.setState({lastnameValue: e.target.value});

    surnameChanged = (e) => this.setState({surnameValue: e.target.value});

    checkValueName = () => this.setState({nameValid: this.checkValueStr(this.state.nameValue)});

    checkValueLast = () => this.setState({lastnameValid: this.checkValueStr(this.state.lastnameValue)});

    checkValueSur = () => this.setState({surnameValid: this.checkValueStr(this.state.surnameValue)});

    checkValueStr = (str) => {
        return (str.trim() === "") ? false : true;
    }

    phoneChanged = (e) => this.setState({phoneValue: e.target.value});

    checkValuePhone = () => {
        let res = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(this.state.phoneValue);
        this.setState({phoneValid: res});
    }

    mailChanged = (e) => this.setState({mailValue: e.target.value});

    checkValueMail = () => {
        let res = /.+@.+\..+/i.test(this.state.mailValue);
        this.setState({mailValid: res});
    }

    checkAll = () => this.state.nameValid ||
            this.state.lastnameValid ||
            this.state.surnameValid ||
            this.state.phoneValid ||
            this.state.mailValid;

    saveUser = () => {
        let userInfo = {
            name: this.state.nameValue,
            lastname: this.state.lastnameValue,
            surname: this.state.surnameValue,
            phone: this.state.phoneValue,
            email: this.state.mailValue,
        };
        this.props.dispatch(userName_add(userInfo));
    }

    render() {
        return(
            <div className = "PageCabinet">
                {
                (this.props.counters.junoUserInit) ?
                <div className = "PageCabinet__initialization--done">
                    <div className = "init">
                        <UserCabinet />
                    </div>
                </div> 
                :
                <div className = "PageCabinet__initialization">
                    <div className = "init">
                        <label>Name: 
                            <div className="init__inputWrapper">
                                <input
                                className="init__input" 
                                type="text" 
                                value={this.state.nameValue} 
                                name="name" 
                                onChange={this.nameChanged}
                                onBlur = {() => this.checkValueName()}
                                />
                                {
                                    (this.state.nameValid === false) ?
                                    <span className="init__alertMassage">
                                    *Warn
                                    </span> : ""
                                }
                            </div>
                        </label>
                        <label>Surname: 
                            <div className="init__inputWrapper">
                                <input
                                className="init__input" 
                                type="text" 
                                value={this.state.surnameValue} 
                                name="surname" 
                                onChange={this.surnameChanged}
                                onBlur = {() => this.checkValueSur()}
                                />
                                {
                                    (this.state.surnameValid === false) ?
                                    <span className="init__alertMassage">
                                    *Warn
                                    </span> : ""
                                }
                            </div>
                        </label>
                        <label>Lastname: 
                            <div className="init__inputWrapper">
                                <input
                                className="init__input" 
                                type="text" 
                                value={this.state.lastnameValue} 
                                name="lastname" 
                                onChange={this.lastnameChanged}
                                onBlur = {() => this.checkValueLast()}
                                />
                                {
                                    (this.state.lastnameValid === false) ?
                                    <span className="init__alertMassage">
                                    *Warn
                                    </span> : ""
                                }
                            </div>
                        </label>
                        <label>Phone Number: 
                            <div className="init__inputWrapper">
                                <input
                                className="init__input" 
                                type="text" 
                                value={this.state.phoneValue} 
                                name="phone" 
                                onChange={this.phoneChanged}
                                onBlur = {() => this.checkValuePhone()}
                                />
                                {
                                    (this.state.phoneValid === false) ?
                                    <span className="init__alertMassage">
                                    *Warn
                                    </span> : ""
                                }
                            </div>
                        </label>
                        <label>Email: 
                            <div className="init__inputWrapper">
                                <input
                                className="init__input" 
                                type="email" 
                                name="email" 
                                value={this.state.mailValue} 
                                onChange={this.mailChanged}
                                onBlur = {() => this.checkValueMail()}
                                />
                                {
                                    (this.state.mailValid === false) ?
                                    <span className="init__alertMassage">
                                    *Warn
                                    </span> : ""
                                }
                            </div>
                        </label>
                        <input type="button" value="Done" onClick = {this.saveUser} className = "init__submit"/>
                    </div>
                </div>
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
  
export default connect(mapStateToProps)(PageCabinet);