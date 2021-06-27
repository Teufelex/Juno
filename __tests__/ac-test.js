import {
    userName_add, USER_NAME_ADD,
    userComment_add, USER_COMMENT_ADD,
    userOrder_add, USER_ORDER_ADD,
    userOrder_delete, USER_ORDER_DELETE,
    commentsLoadingAC, COMMENTS_LOADING,
    commentsErrorAC, COMMENTS_ERROR,
} from '../redux/countersAC.js';

test('работа counterAC', () => {
    const name_add = userName_add({name: "Marko", lastname: "Polo"});
    expect(name_add).toEqual({ type: USER_NAME_ADD, addvalue: {name: "Marko", lastname: "Polo"} });

    const com_add = userComment_add({name: "Marko", text: "lorem ipsum dolor sit amet"});
    expect(com_add).toEqual({ type: USER_COMMENT_ADD, addvalue: {name: "Marko", text: "lorem ipsum dolor sit amet"} });

    const order_add = userOrder_add({name: "pluto", description: "lorem ipsum dolor sit amet"});
    expect(order_add).toEqual({ type: USER_ORDER_ADD, addvalue: {name: "pluto", description: "lorem ipsum dolor sit amet"} });

    const order_delete = userOrder_delete({name: "pluto", description: "lorem ipsum dolor sit amet"});
    expect(order_delete).toEqual({ type: USER_ORDER_DELETE, deleteValue: {name: "pluto", description: "lorem ipsum dolor sit amet"} });

    const load = commentsLoadingAC({name: "Marko", lastname: "Polo"});
    expect(load).toEqual({ type: COMMENTS_LOADING });

    const err = commentsErrorAC("Error");
    expect(err).toEqual({ type: COMMENTS_ERROR });
});