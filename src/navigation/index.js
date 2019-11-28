import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Splash from '../pages/Splash';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Styles from '../Styles';

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
    Home: {
        screen: Home,
    },
},{
    initialRouteName:"Home",
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Styles.colors.primary
        },
        headerTintColor:"white"
    }
});

export default createAppContainer(AppNavigator);
