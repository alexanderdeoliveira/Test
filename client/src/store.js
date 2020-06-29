import { createStore } from 'redux';

const INITIAL_STATE = { data: [] };

function historic(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'GET':
      return { ...state, data: [...action.historic] };
    case 'ADD':
      return { ...state, data: [...state.data, action.historic] };
    case 'EDIT':
      return { ...state, data: [...state.data.filter(d => d.id !== action.historic.id), action.historic] };
    case 'REMOVE':
      return { ...state, data: [...state.data.filter(d => d.id !== action.historic.id)] };
    default:
      return state;
  }
}

const store = createStore(historic);

export default store;