import { createStackNavigator, createAppContainer } from "react-navigation";
import Home from '../Screens/Home/Home';
import Login from '../Screens/Register/Register';
import Register from '../Screens/Login/Login';


const AppNavigator = createStackNavigator({
    Home: {
        screen: Home
    },
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    }
});

export default createAppContainer(AppNavigator);