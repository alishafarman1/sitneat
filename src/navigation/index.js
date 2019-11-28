import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Splash from '../pages/Splash';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

const AppNavigator = createStackNavigator({
    Splash: {
        screen: Splash,
    },
    Login: {
        screen: Login,
    },
    SignUp: {
        screen: SignUp,
    },
});

export default createAppContainer(AppNavigator);
