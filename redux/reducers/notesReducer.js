import { NOTES_ALL, NOTE_ADD } from '../actions/notesActions';

const INITIAL_STATE = {
    notes: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NOTES_ALL:
            return { notes: action.payload };
        case NOTE_ADD:
            return { note: action.payload };
        default:
            return state;
    }
};
