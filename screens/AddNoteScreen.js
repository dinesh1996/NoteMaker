import React, { Component } from 'react';
import { TextInput, Button, View, AsyncStorage } from 'react-native';

class AddNoteScreen extends Component {
    static navigationOptions = e => {
        return {
            title: 'Ajouter une note'
        };
    };

    state = { noteTitle: '' };

    onChange = value => {
        this.setState({ noteTitle: value });
    };

    save = () => {
        // console.log(this.state.cityName);
        AsyncStorage.getItem('CITIES').then(data => {
            let tab = [];
            if (data != null) {
                tab = JSON.parse(data);
            }
            tab.push(this.state.noteTitle);
            AsyncStorage.setItem('CITIES', JSON.stringify(tab)).then(() => {
                this.props.navigation.push('Home');
            });
        });
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TextInput onChangeText={this.onChange} />
                <Button title="Ajouter" onPress={this.save} />
            </View>
        );
    }
}

export default AddNoteScreen;
