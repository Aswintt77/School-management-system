import { legacy_createStore as createStore } from 'redux'
import { combineReducers } from 'redux';


const initialState = {
  sidebarShow: true,
  theme: 'light',
  role:localStorage.getItem('role')
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}


const store = createStore(changeState)
export default store
