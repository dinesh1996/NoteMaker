import DatabaseService from '../../services/databaseService';

export const NOTES_ALL = 'NOTES_ALL';
export const NOTE_ADD = 'NOTE_ADD';

const databaseService = new DatabaseService();

export const getAll = () => {
    return dispatch => {
        databaseService.initDatabase();
        databaseService.getNotes().then(result => {
            return dispatch({ type: NOTES_ALL, payload: result.rows._array });
        });
    };
};

export const addNote = payload => {
    return dispatch => {
        databaseService.addNote(payload.title, payload.content);
        return dispatch({ type: NOTE_ADD, payload });
    };
};

// export const deleteAsync = noteTitle => {
//     return dispatch => {
//         AsyncStorage.getItem('NOTES').then(data => {
//             const tab = JSON.parse(data);
//             tab.splice(
//                 tab.findIndex(e => e === noteTitle),
//                 1
//             );
//             AsyncStorage.setItem('NOTES', JSON.stringify(tab)).then(() => {
//                 return dispatch({ type: NOTES_ALL, payload: tab });
//             });
//         });
//     };
// };
