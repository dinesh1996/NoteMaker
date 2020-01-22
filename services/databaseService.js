import * as SQLite from 'expo-sqlite';

class Database {
    db = SQLite.openDatabase('db.db');

    initDatabase() {
        this.db.transaction(tx => {
            tx.executeSql(
                'create table if not exists notes (id integer primary key not null, title varchar(255), content text);'
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
        console.log('enter2');
        return new Promise((resolve, reject) => {
            resolve('nique');
            this.db.transaction(tx => {
                tx.executeSql(
                    `select * from notes where id = ?;`,
                    [noteId],
                    (trans, result) => {
                        resolve(result);
                    }
                );
            });

        });
    }

    addNote(title, content) {
        console.log('enter', title, content);
        return new Promise(resolve => {
            this.db.transaction(tx => {
                tx.executeSql('INSERT into notes VALUES (1,\'Salaud\',\'Connard\')', [], (trans, result) => {
                    console.log('a', 'a')
                    resolve(result);
                });
            })
        }).then(x => { console.log('?') }).catch((err) => console.log('errno', err));
        return new Promise(resolve => {
            this.db.transaction(tx => {
                tx.executeSql(
                    'insert into notes (title, content) values (?, ?)',
                    [title, content], (tx, result) => {
                        console.log("marche fdp")
                        resolve(result)
                    });
            });
        })
    }

    updateNote(title, nodeId) {
        this.db.transaction(
            tx => {
                tx.executeSql(`update notes set title = ? where id = ?;`, [
                    title,
                    nodeId
                ]);
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
}

export default Database;
