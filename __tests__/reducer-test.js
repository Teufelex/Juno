import countersReducer from '../redux/counterReducer'

test('работа counterReducer', () => {
    let state = {};
    state = countersReducer(state, {type: "USER_NAME_ADD", addvalue: {name: "Marko", lastname: "Polo"}});
    expect(state).toEqual({junoUserInfo: {name: "Marko", lastname: "Polo"}, junoUserInit: true});

    state = {junoUserBooking: []};
    state = countersReducer(state, {type: "USER_ORDER_ADD", addvalue: {name: "Pluto", code: 345}});
    expect(state).toEqual({junoUserBooking: [{name: "Pluto", code: 345}]});

    state = countersReducer(state, {type: "USER_ORDER_DELETE", deleteValue: 345});
    expect(state).toEqual({junoUserBooking: []});
});