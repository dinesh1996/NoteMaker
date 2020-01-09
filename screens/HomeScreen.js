import React, { Component } from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class HomeScreen extends Component {
    static navigationOptions = e => {
        return {
            title: 'HomePage',
            headerRight: (
                <Icon
                    size={25}
                    name="ios-add"
                    style={{ padding: 10 }}
                    onPress={() => {
                        e.navigation.push('AddNote');
                    }}
                />
            )
        };
    };

    render() {
        return (
            <>
                <Text>HomeScreen</Text>
            </>
        );
    }
}

export default HomeScreen;
