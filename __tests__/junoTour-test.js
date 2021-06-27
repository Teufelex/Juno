import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import combinedReducer from '../redux/reducers';

import JunoTour from '../components/JunoTour';
import {TOURS_ARR} from '../AppData';
import { userName_add } from '../redux/countersAC';

test('работа JunoTour', () => {
    let store=createStore(combinedReducer, applyMiddleware(thunk));
    
    const component = renderer.create(
        <Provider store = {store}>
            <BrowserRouter>
                <JunoTour tour={TOURS_ARR[0]} act={false}/>
            </BrowserRouter>
        </Provider>
    );

    let componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const buttonElem = component.root.find( el => el.type==='button'); 

    buttonElem.props.onClick();

    componentTree=component.toJSON();
    expect(componentTree).toMatchSnapshot();

    const componentActive = renderer.create(
        <Provider store = {store}>
            <BrowserRouter>
                <JunoTour tour={TOURS_ARR[0]} act={true}/>
            </BrowserRouter>
        </Provider>
    );

    let componentTreeAct=componentActive.toJSON();
    expect(componentTreeAct).toMatchSnapshot();

    let userInfo = {
        name: "Marko",
        lastname: "Polo",
        surname: "August",
        phone: "84648765484664",
        email: "markopolo@map.me",
    };

    store.dispatch(userName_add(userInfo));
    componentActive.update(
        <Provider store = {store}>
            <BrowserRouter>
                <JunoTour tour={TOURS_ARR[0]} act={true}/>
            </BrowserRouter>
        </Provider>
    );

    componentTreeAct=componentActive.toJSON();
    expect(componentTreeAct).toMatchSnapshot();

    const buttonElemColor = componentActive.root
    .findAll( el => el.type==='div' && el.props.className === "color");
    
    expect(buttonElemColor.length).toBe(72); 

    componentTreeAct=componentActive.toJSON();
    expect(componentTreeAct).toMatchSnapshot();
});