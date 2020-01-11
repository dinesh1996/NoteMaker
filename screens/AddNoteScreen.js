import React, { Component } from 'react';
import { Text } from 'react-native';

class AddNoteScreen extends Component {
    static navigationOptions = () => {
        return {
            title: 'New Note'
        };
    };

    render() {
        return (
            <>
                <Text>Add Note </Text>
            </>
        );
    }
}

export default AddNoteScreen;
