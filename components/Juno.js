import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { NavLink } from 'react-router-dom';
import thunk from 'redux-thunk';

import PagesRouter from '../pages/PageRouter';
import PagesLinks from '../pages/Juno_menu';
import JunoUser from './JunoUser';

import combinedReducer from '../redux/reducers';

import './Juno.css';

let store=createStore(combinedReducer, applyMiddleware(thunk));

class Juno extends React.PureComponent {
    render() {
       return (
        <Provider store={store}>
            <div className = "MainContainer">
                <h1>Juno</h1>
                <div className = "header__logo"></div>
                <BrowserRouter>
                    <Fragment>
                        <PagesLinks />
                        <PagesRouter />
                        <NavLink to="/cabinet"><JunoUser /></NavLink>
                    </Fragment>
                </BrowserRouter>
                <div className = "footer">

                </div>
            </div>
        </Provider>
       )
    }
}

export default Juno;