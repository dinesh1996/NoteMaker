import React, { Component } from 'react';
import { Button, Image, View, Text, Alert } from 'react-native';
import * as Sharing from 'expo-sharing';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

class SharingScreen extends Component {
    static navigationOptions = () => {
        return {
            title: 'Sharing'
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
    }

    componentDidMount() {
        this.getPermissionAsync();
        console.log('hi');
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                Alert.alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({
                image: result.uri
            });
        }
    };

    share = async () => {
        const { image } = this.state;
        Sharing.shareAsync(image);
    };

    render() {
        const { image } = this.state;
        return (
            <>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Button title="Pick an image from camera roll" onPress={this.pickImage} />
                    {image && (
                        <Image
                            source={{
                                uri: image
                            }}
                            style={{
                                width: 200,
                                height: 200
                            }}
                        />
                    )}
                </View>
                <View>
                    <Text>Sharing</Text>
                    <Button title="Share" onPress={this.share} />
                </View>
            </>
        );
    }
}

export default SharingScreen;
