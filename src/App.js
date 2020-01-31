/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *- def command = "${npx} --quiet --no-install react-native config"
 + def command = "yarn --silent react-native config"
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {StatusBar, View} from 'react-native';
import Nav from './navigation';
import Styles from './Styles';
import firebase from "react-native-firebase";
import {resetRoute} from './Utils';


console.disableYellowBox = true;
class App extends Component {
    state = {basket:[]};

    addToBasket = (item)=>{
        let basket = this.state.basket;
        let ids = basket.map((i)=>i.id);
        if(ids.indexOf(item.id) >= 0){
            basket[ids.indexOf(item.id)] = item;
        }else {
            basket.push(item);
        }
        this.setState({basket})
    };

    getBasketQty = (itemId)=>{
        let basket = this.state.basket;
        let ids = basket.map((i)=>i.id);
        if(ids.indexOf(itemId) >= 0){
            return basket[ids.indexOf(itemId)].qty;
        }else{
            return 0;
        }
    };

    deleteFromCart = (itemId)=>{
        let basket = this.state.basket;
        let ids = basket.map((i)=>i.id);
        if(ids.indexOf(itemId) >= 0){
            basket.splice(ids.indexOf(itemId),1);
            this.setState({basket});
        }
    };

    bindAuthStateListener(navigator){
        firebase.auth().onAuthStateChanged((user)=>{
            if(user != null){
               let isAdmin = user.uid === "Is2Ss7AeRqd50qr6jHvSqIvMrv53";
               if(isAdmin){
                   resetRoute(navigator,"AdminApp");
               }else{
                   resetRoute(navigator,"UserApp");
               }
            }else{
                resetRoute(navigator,"Login");
            }
        });
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor={Styles.colors.primary}/>
                <Nav screenProps={{app:this}}/>
            </View>
        );
    }
}


export default App;
