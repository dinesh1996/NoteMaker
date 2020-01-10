import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { SwipeRow } from 'react-native-swipe-list-view';

class ItemNote extends Component {
    static propTypes = {
        onDelete: PropTypes.func.isRequired,
        note: PropTypes.any.isRequired
    }

    state = {
        data: {
            name: "test 1",
            text: "du texte"
        }
    }

    componentDidMount() {
        /*this.props.serv.getWeatherByCity(c).then((resp) => {
            
            this.setState({ data: resp.data });
        });*/
        this.setState({ data: this.props.note });
    }

    render() {
        return (
            <SwipeRow leftOpenValue={80} rightOpenValue={-80} key={this.state.data.name}>
                <View style={{ alignItems: 'center', backgroundColor: '#CCC', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button style={{ padding: 10 }} title="Suppr." onPress={() => this.props.onDelete(this.state.data.name)}></Button>
                    <Button style={{ padding: 20 }} title="lock ." onPress={() => this.props.onDelete(this.state.data.name)}></Button>
                </View>
                <View style={styles.standaloneRowFront}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{this.state.data.name} </Text>
                    </View>
                </View>
            </SwipeRow>
        );
    }
}

export default ItemNote;

const styles = StyleSheet.create({
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 80,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    backTextWhite: {
        color: '#FFF',
    }
});