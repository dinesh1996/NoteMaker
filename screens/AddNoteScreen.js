import React, { Component } from 'react';
import { TextInput, View, StyleSheet, Button, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { addNote } from '../redux/actions/notesActions';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
class AddNoteScreen extends Component {
    static navigationOptions = e => {
        return {
            title: 'Ajouter une note',
            headerRight: (
                <></>
            )
        };
    };

    static propTypes = {
        addNote: PropTypes.func.isRequired
    };

    state = {
        title: '',
        content: ''
    };

    onChangeTitle = value => {
        this.setState({
            title: value
        });
    };

    onChangeContent = value => {
        this.setState({
            content: value
        });
    };

    save = () => {
        this.props.addNote(this.state);
    };

    openCamera = () => {
        ImagePicker.launchCameraAsync({}).then(data => {
            this.setState({ image: data.uri });
            console.log(data);
        });
    };

    askPermission = () => {
        Permissions.askAsync(Permissions.CAMERA_ROLL);
        Permissions.askAsync(Permissions.CAMERA);
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.title}
                    onChangeText={this.onChangeTitle}
                    placeholder="Title"
                />
                <TextInput
                    style={styles.text}
                    onChangeText={this.onChangeContent}
                    multiline
                    placeholder="Content"
                />
                {this.state.image ? <Image
                    style={{ flex: 1 }}
                    source={{
                        uri: `${this.state.image}`
                    }}
                /> : <Button title="Ajouter une image" onPress={this.openCamera} />}

                <Button title="Enregistrer la note" onPress={this.save} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 22,
        padding: 20,
        borderBottomColor: 'black',
        borderStyle: 'solid',
        borderBottomWidth: 1
    },
    text: {
        fontSize: 22,
        padding: 20,
        flex: 1,
        textAlignVertical: 'top',
        flexShrink: 1
    }
});

const mapActionsToProps = payload => {
    return {
        addNote: bindActionCreators(addNote, payload)
    };
};

export default connect(null, mapActionsToProps)(AddNoteScreen);
