import * as SQLite from 'expo-sqlite';

class Database {
    db = SQLite.openDatabase('db.db');

    initDatabase() {
        this.db.transaction(tx => {
            tx.executeSql(
                'create table if not exists notes (id integer primary key not null, title varchar(255));'
            );
        });
    }

    getNotes() {
        return new Promise(resolve => {
            this.db.transaction(tx => {
                tx.executeSql(`select * from notes`, [], (trans, result) => {
                    resolve(result);
                });
            });
        });
    }

    getNote(noteId) {
        return new Promise(resolve => {
            this.db.transaction(tx => {
                tx.executeSql(`select * from notes where id = ?;`, [noteId], (trans, result) => {
                    resolve(result);
                });
            });
        });
    }

    addNote(title) {
        return this.db.transaction(
            tx => {
                tx.executeSql('insert into notes (title) values (?)', [title]);
            },
            null,
            this.getNotes
        );
    }

    updateNote(title, nodeId) {
        this.db.transaction(
            tx => {
                tx.executeSql(`update notes set title = ? where id = ?;`, [title, nodeId]);
            },
            null,
            this.getNotes
        );
    }

    deleteNote(noteId) {
        this.db.transaction(
            tx => {
                tx.executeSql(`delete from notes where id = ?;`, [noteId]);
            },
            null,
            this.getNotes
        );
    }

    search(text) {
        return new Promise(resolve => {
            this.db.transaction(tx => {
                tx.executeSql(
                    `select * from notes where title like '%?%' `,
                    [text],
                    (trans, result) => {
                        resolve(result);
                    }
                );
            });
        });
    }
}

export default Database;
