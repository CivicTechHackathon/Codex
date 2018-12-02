import React, { Component } from 'react';
import {
    Alert,
    PermissionsAndroid,
    Image,
    StyleSheet,
    View,
    TouchableOpacity
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { RegisterUser, getUser } from '../../Config/azureApi'

export default class CameraScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permission: null,
            flash: 'off',
            flashSource: '2'
        }
    }

    componentWillMount() {
        this.requestCameraPermission()
    }

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Cool Photo App Camera Permission',
                    'message': 'Cool Photo App needs access to your camera ' +
                        'so you can take awesome pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera")
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }


    takePicture = async function () {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data)
            console.log(data.uri);
            getUser('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgRHDIMQOz8Csa5XTSLJQu1HjBuoPI5suQ91g4AUlaXi2F_ac1').then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err)
            })
        }
    };

    flashModes = () => {
        const { flash } = this.state;
        switch (flash) {
            case 'off':
                return this.flashOff()
            case 'on':
                return this.flashOn()
            case 'auto':
                return this.flashAuto()
            default:
                break;
        }
    }

    flashOff = () => {
        const flashOff = 1;
        RNCamera.Constants.FlashMode.on
        this.setState({ flash: 'on', flashSource: flashOff })
    }
    flashOn = () => {
        const flashOn = 3;
        RNCamera.Constants.FlashMode.auto

        this.setState({ flash: 'auto', flashSource: flashOn })
    }
    flashAuto = () => {
        const flashAuto = 1;
        RNCamera.Constants.FlashMode.off
        this.setState({ flash: 'off', flashSource: flashAuto })
    }

    render() {
        const { flashSource } = this.state;
        console.log(flashSource, 'asssssssssss')
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={this.flashModes}
                    style={styles.flash}
                >
                    {
                        flashSource == 1 ?
                            <Image source={require(`../../assets/images/1.png`)} />
                            :
                            flashSource == 2 ?
                                <Image source={require(`../../assets/images/2.png`)} />
                                :
                                <Image source={require(`../../assets/images/3.png`)} />
                    }
                </TouchableOpacity>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes)
                    }}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center', }}>
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style={styles.capture}
                    >
                        <Image source={require('../../assets/images/5.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    }, flash: {
        flex: 0,
        padding: 16
    }
});
