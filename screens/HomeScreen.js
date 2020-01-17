/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ItemNote from '../components/ItemNote';
import { getAll } from '../redux/actions/notesActions';

class HomeScreen extends Component {
    static navigationOptions = e => {
        return {
            title: 'HomePage',
            headerRight: (
                <Icon
                    size={25}
                    name="ios-add"
                    style={{
                        padding: 25
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
                    style={{ padding: 25 }}
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

    state = {
        notes: null
    };

    componentDidMount() {
        this.props.getAll();
        this.setState({ notes: this.props.notes });
    }

    delete = () => {
        console.info('delete');
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.notes === null ? (
                    <View>
                        <ActivityIndicator />
                    </View>
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

const mapStateToProps = stateStore => {
    return {
        notes: stateStore.notes.notes
    };
};

const mapActionsToProps = payload => {
    return {
        getAll: bindActionCreators(getAll, payload)
    };
};

export default connect(mapStateToProps, mapActionsToProps)(HomeScreen);
