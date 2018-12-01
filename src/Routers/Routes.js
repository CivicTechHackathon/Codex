import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from '../Screens/Home/Home';
import Login from '../Screens/Register/Register';
import Register from '../Screens/Login/Login';
import Camera from '../Screens/Camera/Camera';

const AppNavigator = createStackNavigator({
    Home: {
        screen: Home
    },
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    Camera: {
        screen: Camera
    }
});

export default createAppContainer(AppNavigator);