import React, {Component} from 'react';
import {View,Text} from 'react-native';
import {resetRoute} from '../Utils';
import ButtonPurple from '../components/ButtonPurple';

export default class ThankYou extends Component<Props> {
    static navigationOptions = ({navigation}) => ({
        title: "Order Complete",
    });
    navigation;

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
    }

    render() {
        const {navigate} = this.navigation;

        return (
            <View style={{flex:1,zIndex:1,justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:30}}>Thank you</Text>
                <Text style={{fontSize:20}}>For ordering</Text>
                <Text style={{fontSize:55}}>😁</Text>
                <ButtonPurple onPress={()=>{
                    resetRoute(this.navigation,"UserApp");
                }}>{"Continue to App"}</ButtonPurple>
            </View>
        );
    }
}
