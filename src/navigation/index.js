import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Splash from '../pages/Splash';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Styles from '../Styles';
import ItemDetails from '../pages/ItemDetails';
import Cart from '../pages/Cart';

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
    ItemDetails: {
        screen: ItemDetails,
    },
    Cart: {
        screen: Cart,
    },
},{
    //initialRouteName:"Home",
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Styles.colors.primary
        },
        headerTintColor:"white"
    }
});

export default createAppContainer(AppNavigator);
