import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemNote from '../components/ItemNote';
import { ActivityIndicator } from 'react-native-paper';

class HomeScreen extends Component {

    state = {
        notes: [
            {
                name: "test 1",
                text: "du texte"
            },
            {
                name: "test 2",
                text: "encore du texte"
            }
        ]
    }

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

    delete = () => {
        console.log("delete");
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.notes ? (
                    <FlatList data={this.state.notes}
                        renderItem={(e) => (
                            <ItemNote key={e.item.name} note={e.item} onDelete={this.delete} />
                        )} />
                ) : (<ActivityIndicator />)}
            </View>
        );
    }
}

export default HomeScreen;
