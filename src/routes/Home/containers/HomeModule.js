import update from 'immutability-helper'
import request from 'superagent'

export const NAME = 'home'
export const SET_SELECTED_CITY = 'SET_SELECTED_CITY' + NAME
export const SET_BANK_DATA = 'SET_BANK_DATA' + NAME
export const SET_DEBOUNCED_TEXT = 'SET_DEBOUNCED_TEXT' + NAME

export const setSelectedCity = (data) => {
  return {
    type : SET_SELECTED_CITY,
    data
  }
}

export const setBankData = (data) => {
  return {
    type : SET_BANK_DATA,
    data
  }
}

export const setDebouncedText = (data) => {
  return {
    type : SET_DEBOUNCED_TEXT,
    data
  }
}

export const updateSelectedCity = (city) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch(setSelectedCity(city));
      request
      .get(`https://vast-shore-74260.herokuapp.com/banks?city=${city}`)
      .end(function(err, res){
        if(!err){
            dispatch(setBankData({key:city,value:res.body}));
            resolve();
        }
      });
    });
  }
}

const ACTION_HANDLERS = {
    [SET_SELECTED_CITY]: (state,action) => {
      return update(state, {selectedCity : {$set : action.data}});
    },
    [SET_BANK_DATA]: (state,action) => {  
      let newState = update(state, {bankData : {[action.data.key] : {$set : action.data.value}}});
      return newState;
    },
    [SET_DEBOUNCED_TEXT]: (state,action) => {
      return update(state, {debouncedText : {$set : action.data}});
    }
}

const initialState = {
    selectedCity:"MUMBAI",
    bankData:{},
    debouncedText:"",
  }
  
  export default function counterReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
  }
  