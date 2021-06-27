import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { NavLink } from 'react-router-dom';
import JunoEvents from './events';
import thunk from 'redux-thunk';

import PagesRouter from '../pages/PageRouter';
import PagesLinks from '../pages/Juno_menu';
import JunoUser from './JunoUser';

import combinedReducer from '../redux/reducers';

import './Juno.css';

let store=createStore(combinedReducer, applyMiddleware(thunk));

class Juno extends React.PureComponent {

    state = {
        isBlocking: false,
    }

    componentDidMount = () => {
        window.addEventListener("beforeunload", this.e_onbeforeunload);
        JunoEvents.addListener('PageBlocked',this.e_blokedPage);
    };
    
    componentWillUnmount = () => {
        window.removeEventListener('beforeunload ',this.e_onbeforeunload);
        JunoEvents.removeListener('PageBlocked',this.e_blokedPage);
    };

    e_blokedPage = () => {
        this.setState({isBlocking: true});
    }

    e_onbeforeunload = (e) => {
        e = e || window.event;
        if (!this.state.isBlocking) return;
        let dialogText = 'This page has unsaved changes. Are you sure you want to refresh?';
        e.returnValue = dialogText;
        return dialogText;
    }

    render() {
       return (
        <Provider store={store}>
            <div className = "MainContainer">
                <BrowserRouter>
                    <Fragment>
                        <h1>Juno</h1>
                        <NavLink to="/" exact><div className = "header__logo"></div></NavLink>
                        <PagesLinks />
                        <PagesRouter />
                        <NavLink to="/cabinet"><JunoUser /></NavLink>
                    </Fragment>
                </BrowserRouter>
                <div className = "footer">
                    <span>Copyright © 2253 Juno Inc. All rights reserved.</span>
                    <span>Milky Way Galaxy</span>
                </div>
            </div>
        </Provider>
       )
    }
}
  
export default Juno;