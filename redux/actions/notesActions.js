import DatabaseService from '../../services/databaseService';

export const NOTES_ALL = 'NOTES_ALL';

const databaseService = new DatabaseService();

export const getAll = () => {
    return dispatch => {
        databaseService.initDatabase();
        databaseService.getNotes().then(result => {
            return dispatch({ type: NOTES_ALL, payload: result.rows._array });
        });
    };
};

// export const addNoteAsync = payload => {
//     return dispatch => {
//         AsyncStorage.getItem('NOTES').then(data => {
//             let tab = [];
//             if (data !== null) {
//                 tab = JSON.parse(data);
//             }
//             tab.push(payload);
//             AsyncStorage.setItem('NOTES', JSON.stringify(tab)).then(() => {
//                 return dispatch({ type: NOTES_ALL, payload: tab });
//             });
//         });
//     };
// };

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
