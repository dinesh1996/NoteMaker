/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { View, FlatList, Platform } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SearchBar } from 'react-native-elements';
import ItemNote from '../components/ItemNote';
import { getAll, deleteNote } from '../redux/actions/notesActions';

class HomeScreen extends Component {
    static navigationOptions = e => {
        return {
            title: 'HomePage',
            headerRight: (
                <Icon
                    size={25}
                    name="md-add"
                    style={{
                        padding: 10
                    }}
                    onPress={() => {
                        e.navigation.push('Authentication');
                    }}
                />
            ),
            headerLeft: (
                <Icon
                    size={25}
                    name="md-share"
                    style={{
                        marginStart: 10
                    }}
                    onPress={() => {
                        e.navigation.push('Sharing');
                    }}
                />
            )
        };
    };

    static propTypes = {
        getAll: PropTypes.func.isRequired,
        notes: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        // setting default state
        this.state = {
            search: '',
            notes: null,
            arrayholder: []
        };
    }

    componentDidMount() {
        this.props.getAll();
        this.setState({
            notes: this.props.notes,
            dataSource: this.props.notes
        });
        console.log(this.state.dataSource);
    }

    search = text => {
        console.log(text);
    };

    clear = () => {
        this.search.clear();
    };

    searchFilterFunction = text => {
        // passing the inserted text in textinput
        const newData = this.state.notes.filter(item => {
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        this.setState({
            dataSource: newData,
            search: text
        });
    };

    delete = id => {
        // this.props.deleteNote(id);
    };

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,

                    backgroundColor: '#fff'
                }}
            />
        );
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.dataSource === null ? (
                    <View>
                        <ActivityIndicator animating size="large" />
                    </View>
                ) : (
                    <View>
                        <SearchBar
                            round
                            showCancel
                            cancelIcon
                            lightTheme
                            platform={Platform.OS === 'ios' ? 'ios' : 'android'}
                            searchIcon={{
                                size: 24
                            }}
                            placeholder="Search..."
                            onChangeText={text => this.searchFilterFunction(text)}
                            onClear={text => this.searchFilterFunction('')}
                            value={this.state.search}
                        />
                        <FlatList
                            data={this.state.dataSource}
                            ItemSeparatorComponent={this.ListViewItemSeparator}
                            renderItem={e => (
                                <ItemNote key={e.item.id} note={e.item} onDelete={this.delete} />
                            )}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                )}
            </View>
        );
    }
}

const mapStateToProps = stateStore => {
    return {
        notes: stateStore.notes.notes
    };
};

const mapActionsToProps = payload => {
    return {
        getAll: bindActionCreators(getAll, payload),
        deleteNote: bindActionCreators(deleteNote, payload)
    };
};

export default connect(mapStateToProps, mapActionsToProps)(HomeScreen);
