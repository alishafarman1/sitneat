import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Splash from '../pages/Splash';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';
import Styles from '../Styles';
import ItemDetails from '../pages/ItemDetails';
import Cart from '../pages/Cart';
import AdminDashboard from '../pages/AdminDashboard';


const navConfigs = {
    //initialRouteName:"Home",
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Styles.colors.primary
        },
        headerTintColor:"white"
    }
};

const UserNavigator = createStackNavigator({
    Home:Home,
    ItemDetails: ItemDetails,
    Cart: Cart
},navConfigs);

const AdminNavigator = createStackNavigator({
    Dashboard:AdminDashboard,
},navConfigs);

const AppNavigator = createStackNavigator({
    Splash: Splash,
    Login: Login,
    SignUp: SignUp,
    UserApp:UserNavigator,
    AdminApp:AdminNavigator,
},{
    //initialRouteName:"Home",
    defaultNavigationOptions:{
       header:null
    }
});

export default createAppContainer(AppNavigator);
