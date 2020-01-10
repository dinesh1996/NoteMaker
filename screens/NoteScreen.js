import React, { Component } from 'react';
import { Button, Text, Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

class NoteScreen extends Component {
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

    state = {
        image: null
    };

    componentDidMount() {
        this.askPermission();
    }

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
            <>
                <Button title="Camera" onPress={this.openCamera} />
                {this.state.image ? (
                    <View>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={{
                                uri: `${this.state.image}`
                            }}
                        />
                        <Text>{this.state.image}</Text>
                    </View>
                ) : (
                    <Text>pas d'image</Text>
                )}
            </>
        );
    }
}

export default NoteScreen;
