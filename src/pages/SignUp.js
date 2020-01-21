import React, {Component} from 'react';
import {View, Text,TextInput,TouchableOpacity} from 'react-native';
import Styles from '../Styles';
import Input from '../components/Input';
import Button from '../components/Button';
import {resetRoute} from '../Utils';

export default class SignUp extends Component<Props> {

    navigation;

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
    }


    render() {
        const {navigate} = this.navigation;

        return (
            <View style={{flex: 1,justifyContent:"center",alignItems:"center",backgroundColor:Styles.colors.primary}}>
                <Text style={{color:"white",fontSize:40,fontWeight:"bold"}}>Sign Up</Text>
                <View style={{width:"80%"}}>
                    <Input placeholder={"Full Name"}/>
                    <Input placeholder={"Staff Member / Student"}/>
                    <Input placeholder={"Email"}/>
                    <Input placeholder={"Password"} secureTextEntry={true}/>
                    <Button onPress={()=>{
                        resetRoute(this.navigation,"Home")
                    }}>Register</Button>
                    <View style={{width:"100%",marginTop:40,marginBottom:20}}>
                        <View style={{height:1,backgroundColor:"white",width:"100%"}} />
                        <Text style={{position:"absolute",color:"white",top:-15,backgroundColor:Styles.colors.primary,alignSelf:"center",fontSize:20,paddingHorizontal:20}}>OR</Text>
                    </View>
                    <Button onPress={()=>navigate('Login')}>Login</Button>
                </View>
            </View>
        );
    }
}
