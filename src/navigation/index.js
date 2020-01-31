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
import ManageMenu from '../pages/ManageMenu';
import {Text, TouchableOpacity} from 'react-native';
import Utils from '../base/Utils';
import {resetRoute} from '../Utils';
import React from 'react';
import ItemForm from '../pages/ItemForm';
import ThankYou from '../pages/ThankYou';


const navConfigs = {
    //initialRouteName:"Home",
    defaultNavigationOptions:({navigation})=> ({
        headerStyle:{
            backgroundColor:Styles.colors.primary
        },
        headerTintColor:"white",
        headerRight:(
            <TouchableOpacity style={{backgroundColor:"#fff",paddingHorizontal:10,paddingVertical:5,borderRadius:20,marginRight:10}} onPress={()=>{
                Utils.signOut(()=>{
                    resetRoute(navigation,"Splash");
                })
            }}>
                <Text style={{color:Styles.colors.primary,fontWeight:"bold"}}>Logout</Text>
            </TouchableOpacity>
        )
    })
};

const UserNavigator = createStackNavigator({
    Home:Home,
    ItemDetails: ItemDetails,
    Cart: Cart,
    ThankYou: ThankYou,
},navConfigs);

const AdminNavigator = createStackNavigator({
    Dashboard:AdminDashboard,
    ManageMenu:ManageMenu,
    ItemForm:ItemForm,
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

