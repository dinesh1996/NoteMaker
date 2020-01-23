import * as SQLite from 'expo-sqlite';

import { AsyncStorage } from 'react-native';

class Database {
    db = SQLite.openDatabase('db.db');

    initDatabase() {
        this.db.transaction(tx => {
            tx.executeSql(
                'create table if not exists notes (id integer primary key not null, title varchar(255), content text);'
            );
        });
    }

    async getNotes() {
        let notes = await AsyncStorage.getItem('NOTES');
        console.log(' notes', notes)
        let tab = [];
        if (notes != null) {
            tab = JSON.parse(notes);
        }
        tab = tab.filter(n => n)
        console.log('clean', tab)
        return tab;
    }

    async getNote(noteId) {
        let notes = await AsyncStorage.getItem('NOTES');
        if (notes != null) {
            tab = JSON.parse(notes);
            return notes[noteId];
        }
        return null;
    }

    async addNote(id, title, content, image) {
        let notes = await AsyncStorage.getItem('NOTES');
        let tab = [];
        if (notes != null) {
            tab = JSON.parse(notes);
        }
        console.log('t', title, content, image, id)
        tab[id] = { id: id, title: title, content: content, image: image };
        console.log('test', tab);
        await AsyncStorage.setItem('NOTES', JSON.stringify(tab));
        return tab[id];
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

    async deleteNote(noteId) {
        let notes = await AsyncStorage.getItem('NOTES');
        if (notes != null) {
            tab = JSON.parse(notes);
            tab = tab.filter(function (obj) {
                return obj.id !== noteId;
            });
            await AsyncStorage.setItem('NOTES', JSON.stringify(tab));
        }
        return null;
    }
}

export default Database;
