import React, {Component} from 'react';
import {View, Text,TextInput,TouchableOpacity} from 'react-native';
import Styles from '../Styles';
import Input from '../components/Input';
import Button from '../components/Button';
import {resetRoute} from '../Utils';
import firebase from 'react-native-firebase';
import LoadingContainer from '../components/LoadingContainer';
import Utils from '../base/Utils';

export default class Login extends Component<Props> {

    navigation;

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
            email:"",
            password:"",
            isLoading:false
        };
    }

    signIn(){
        Utils.startLoading(this);
        const {email,password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email,password).then((res)=>{

        }).catch((e)=>{
            alert(e.message)
            Utils.stopLoading(this);
        }).finally(()=>{

        });

    }

    render() {
        const {navigate} = this.navigation;

        return (
            <LoadingContainer isLoading={this.state.isLoading}>
                <View style={{flex: 1,justifyContent:"center",alignItems:"center",backgroundColor:Styles.colors.primary}}>
                    <Text style={{color:"white",fontSize:40,fontWeight:"bold"}}>Login </Text>
                    <View style={{width:"80%"}}>
                        <Input placeholder={"Email"} parent={this} name={"email"} />
                        <Input placeholder={"Password"}  parent={this} name={"password"} secureTextEntry={true}/>
                        <Button onPress={()=>{
                            this.signIn();
                        }}>Login</Button>
                        <View style={{width:"100%",marginTop:40,marginBottom:20}}>
                            <View style={{height:1,backgroundColor:"white",width:"100%"}} />
                            <Text style={{position:"absolute",color:"white",top:-15,backgroundColor:Styles.colors.primary,alignSelf:"center",fontSize:20,paddingHorizontal:20}}>OR</Text>
                        </View>
                        <Button onPress={()=>navigate('SignUp')}>Sign Up</Button>
                    </View>
                </View>
            </LoadingContainer>
        );
    }
}
