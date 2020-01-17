import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import notesReducer from './reducers/notesReducer';

const reducers = combineReducers({
    notes: notesReducer
});

export const store = createStore(reducers, applyMiddleware(thunk));
