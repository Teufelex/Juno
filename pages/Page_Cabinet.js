import React, { Fragment } from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import { Prompt } from 'react-router';
import JunoEvents from '../components/events';

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
        disabled: true,
        isBlocking: false,
    }

    nameChanged = (e) => this.setState({nameValue: e.target.value, isBlocking: true});

    lastnameChanged = (e) => this.setState({lastnameValue: e.target.value, isBlocking: true});

    surnameChanged = (e) => this.setState({surnameValue: e.target.value, isBlocking: true});

    checkValueName = () => this.setState({
        nameValid: this.checkValueStr(this.state.nameValue)
    }, this.validAll);

    checkValueLast = () => this.setState({
        lastnameValid: this.checkValueStr(this.state.lastnameValue)
    }, this.validAll);

    checkValueSur = () => this.setState({
        surnameValid: this.checkValueStr(this.state.surnameValue)}, this.validAll);

    checkValueStr = (str) => {
        return (str.trim() === "") ? false : true;
    }

    phoneChanged = (e) => this.setState({phoneValue: e.target.value, isBlocking: true});

    checkValuePhone = () => {
        let res = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(this.state.phoneValue);
        this.setState({phoneValid: res}, this.validAll);
    }

    mailChanged = (e) => this.setState({mailValue: e.target.value, isBlocking: true});

    checkValueMail = () => {
        let res = /.+@.+\..+/i.test(this.state.mailValue);
        this.setState({mailValid: res}, this.validAll);
    }

    validAll = () => {
        this.setState({disabled: this.checkAll()});
    }

    checkAll = () => {
        return (
            this.state.nameValid === false || this.state.nameValid === null ||
            this.state.lastnameValid === false || this.state.lastnameValid === null ||
            this.state.surnameValid === false || this.state.surnameValid === null ||
            this.state.phoneValid === false || this.state.phoneValid === null ||
            this.state.mailValid === false || this.state.mailValid === null 
        ) ? true : false;
    };

    saveUser = () => {
        let userInfo = {
            name: this.state.nameValue,
            lastname: this.state.lastnameValue,
            surname: this.state.surnameValue,
            phone: this.state.phoneValue,
            email: this.state.mailValue,
        };

        this.setState({isBlocking: false});
        this.props.dispatch(userName_add(userInfo));
        JunoEvents.emit("PageBlocked");
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
                    <Prompt
                        when={this.state.isBlocking}
                        message="This page has unsaved changes. Are you sure you want to leave?"
                    />
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
                                    *Invalid value. Shouldn't be an empty string 
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
                                    *Invalid value. Shouldn't be an empty string 
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
                                    *Invalid value. Shouldn't be an empty string 
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
                                    *Invalid Phone Value 
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
                                    *Invalid Email Value. Shoud consist "@" and "."
                                    </span> : ""
                                }
                            </div>
                        </label>
                        <input 
                            type="button" 
                            value="Done" 
                            disabled = {this.state.disabled}
                            onClick = {this.saveUser} 
                            className = "init__submit"
                        />
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