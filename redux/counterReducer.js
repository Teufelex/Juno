import { 
  USER_NAME_ADD, 
  USER_COMMENT_ADD, 
  USER_ORDER_ADD, 
  USER_ORDER_DELETE,
  COMMENTS_LOADING,
  COMMENTS_ERROR,
  COMMENTS_SET,
} from './countersAC';
import { DataLockget } from './fetchThunk';

const initState={
  junoUserInfo: {},
  junoUserInit: false,
  junoUserBooking: [],
  junoUserComments: [],
  loadingStat: 0, // 1 - loading, 2 - err, 3 - complete
  commentsList: [],
}

function countersReducer(state=initState,action) {
  switch (action.type) {
    
    case USER_NAME_ADD: {
      let newState={...state,
        junoUserInfo: action.addvalue, junoUserInit: true
      };

      return newState;
    }

    case USER_ORDER_ADD: {
      let newOrderList = [...state.junoUserBooking];
      newOrderList.push(action.addvalue);
      let newState={...state, junoUserBooking: newOrderList};

      return newState;
    }

    case USER_ORDER_DELETE: {
      let newOrderList = [...state.junoUserBooking];
      //newOrderList.splice(action.deleteValue, 1);
      newOrderList = newOrderList.filter(b => b.code !== action.deleteValue);
      let newState={...state, junoUserBooking: newOrderList};

      return newState;
    }

    case USER_COMMENT_ADD: {
      let _user = {
        name: state.junoUserInfo.name, 
        text: action.addvalue, 
        photo: "/assets/user.png",
        code: state.commentsList[state.commentsList.length - 1].code + 10,
      }
      let userComments = [...state.junoUserComments, _user];
      let _commentsList = [...state.commentsList, _user];
      DataLockget(_commentsList);
      let newState={...state, junoUserComments: userComments, commentsList: _commentsList};

      return newState;
    }

    case COMMENTS_LOADING: {
      let newState = {...state, loadingStat: 1};

      return newState;
    }

    case COMMENTS_ERROR: {
      let newState = {...state, loadingStat: 2};

      return newState;
    }

    case COMMENTS_SET: {
      let newState = {...state, loadingStat: 3, commentsList: action.comments};

      return newState;
    }

    default:
      return state;
  }
}

export default countersReducer;
