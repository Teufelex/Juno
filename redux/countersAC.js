const USER_NAME_ADD = 'USER_NAME_ADD';
const USER_COMMENT_ADD = 'USER_COMMENT_ADD';
const USER_ORDER_ADD = 'USER_ORDER_ADD';
const USER_ORDER_DELETE = 'USER_ORDER_DELETE';
const COMMENTS_LOADING='COMMENTS_LOADING';
const COMMENTS_ERROR='COMMENTS_ERROR';
const COMMENTS_SET='COMMENTS_SET';

const commentsLoadingAC=function() {
  return {
    type: COMMENTS_LOADING,
  };
}

const commentsErrorAC=function() {
  return {
    type: COMMENTS_ERROR,
  };
}

const commentsSetAC=function(comments) {
  return {
    type: COMMENTS_SET,
    comments:comments,
  };
}

const userName_add = (addvalue) => {
  return {
    type: USER_NAME_ADD,
    addvalue:addvalue,
  };
}

const userComment_add = (addvalue) => {
  return {
    type: USER_COMMENT_ADD,
    addvalue:addvalue,
  };
}

const userOrder_add = (addvalue) => {
  return {
    type: USER_ORDER_ADD,
    addvalue:addvalue,
  };
}

const userOrder_delete = (deleteValue) => {
  return {
    type: USER_ORDER_DELETE,
    deleteValue:deleteValue,
  };
}

export {
    userName_add, USER_NAME_ADD,
    userComment_add, USER_COMMENT_ADD,
    userOrder_add, USER_ORDER_ADD,
    userOrder_delete, USER_ORDER_DELETE,
    commentsLoadingAC, COMMENTS_LOADING,
    commentsErrorAC, COMMENTS_ERROR,
    commentsSetAC, COMMENTS_SET,
}
