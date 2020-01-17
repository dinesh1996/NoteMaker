import { NOTES_ALL } from '../actions/notesActions';

const INITIAL_STATE = {
    notes: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NOTES_ALL:
            return { notes: action.payload };
        default:
            return state;
    }
};
