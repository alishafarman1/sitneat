/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{Component} from 'react';
import {StatusBar, View} from 'react-native';
import Nav from './navigation';
import Styles from './Styles';

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
