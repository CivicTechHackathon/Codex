import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Button } from 'react-native-elements';

const { width, height } = Dimensions.get('window')

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    static navigationOptions = {
        header: null
    }
    toLogin = () => {
        this.props.navigation.navigate('Camera');
    }
    toRegister = () => {
        this.props.navigation.navigate('Register')
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Button
                    title="Login"
                    titleStyle={{ fontWeight: "700" }}
                    buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{ marginTop: 20 }}
                    onPress={this.toLogin}
                />
                <Button
                    title="Register"
                    titleStyle={{ fontWeight: "700" }}
                    buttonStyle={{
                        backgroundColor: "rgba(92, 99,216, 1)",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 5
                    }}
                    containerStyle={{ marginTop: 60 }}
                    onPress={this.toRegister}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    startButton: {
        width: width * 0.8,
        height: height * 0.05,
        backgroundColor: '#08ABA0',
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 4,
        marginTop: height * 0.01
    },
    buttonText: {
        color: '#fff',
        fontSize: 22
    }
})

export default Home