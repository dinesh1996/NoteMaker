import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native-paper';
import ItemNote from '../components/ItemNote';
import DatabaseService from '../services/databaseService';

class HomeScreen extends Component {
    static navigationOptions = e => {
        return {
            title: 'HomePage',
            headerRight: (
                <Icon
                    size={25}
                    name="ios-add"
                    style={{
                        padding: 10
                    }}
                    onPress={() => {
                        e.navigation.push('AddNote');
                    }}
                />
            )
        };
    };

    state = {
        notes: []
    };

    databaseService = new DatabaseService();

    componentDidMount() {
        this.databaseService.initDatabase();
        this.databaseService.getNotes().then(result => {
            this.setState({ notes: result.rows._array });
        });
    }

    delete = () => {
        console.log('delete');
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.notes ? (
                    <FlatList
                        data={this.state.notes}
                        renderItem={e => (
                            <ItemNote key={e.item.id} note={e.item} onDelete={this.delete} />
                        )}
                        keyExtractor={item => item.id.toString()}
                    />
                ) : (
                    <ActivityIndicator />
                )}
            </View>
        );
    }
}

export default HomeScreen;
