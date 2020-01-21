/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, Picker } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator, Button } from 'react-native-paper';
import ItemNote from '../components/ItemNote';
import DatabaseService from '../services/databaseService';
import TranslateService from '../services/translateService';

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
    translate = new TranslateService();

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
            /*<View style={{ flex: 1 }}>
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
            </View>*/
            <View>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                />
                <Button onPress={() =>
                    this.translate.getTranslation(this.state.text).then(resp => {
                        this.setState({ text: resp.data[0][0][0] })
                        console.log(resp.data[0][0][0])
                    })
                }> Translate
                </Button>
            </View>
        );
    }
}

export default HomeScreen;
