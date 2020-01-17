/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native-paper';
import ItemNote from '../components/ItemNote';
import DatabaseService from '../services/databaseService';

class HomeScreen extends Component {
    static navigationOptions = e => {
        return {
            title: 'Home Page',
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
            ),
            headerLeft: (
                <Icon
                    size={25}
                    name="md-share"
                    style={{ padding: 10 }}
                    onPress={() => {
                        e.navigation.push('Sharing');
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
        console.info('delete');
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.notes === null ? (
                    <>
                        <View>
                            <Text> Noting to show </Text> <ActivityIndicator />
                        </View>{' '}
                    </>
                ) : (
                        <FlatList
                            data={this.state.notes}
                            renderItem={e => (
                                <ItemNote key={e.item.id} note={e.item} onDelete={this.delete} />
                            )}
                            keyExtractor={item => item.id.toString()}
                        />
                    )}
            </View>
        );
    }
}

export default HomeScreen;
