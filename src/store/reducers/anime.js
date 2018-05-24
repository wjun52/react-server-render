import { GET_ANMIE, GET_ANMIE_DETAIL } from '../constants';

export const animeInfo = (state = [], action) => {
  switch(action.type){
    case GET_ANMIE:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

export const detailInfo = (state = [], action) => {
  switch(action.type){
    case GET_ANMIE_DETAIL:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}