import React, {Component} from 'react';
import {View, Text,TextInput,TouchableOpacity} from 'react-native';
import Styles from '../Styles';
import Input from '../components/Input';
import Button from '../components/Button';
import {resetRoute} from '../Utils';
import LoadingContainer from '../components/LoadingContainer';
import Utils from '../base/Utils';
import firebase from "react-native-firebase";

export default class SignUp extends Component<Props> {

    navigation;

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
            email:"",
            password:"",
            cpassword:"",
            name:"",
            type:"",
            isLoading:false
        };
    }

    signUp(){
        Utils.startLoading(this);
        const {email,password,name,type} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email,password).then((res)=>{
            res.user.updateProfile({
               displayName:name
            }).then(()=>{
                firebase.database().ref("users/").child(res.user.uid).set({
                    email:email,
                    name:name,
                    type:type,
                });
            });

        }).catch((e)=>{
            alert(e.message);
            Utils.stopLoading(this);
        }).finally(()=>{

        });

    }


    render() {
        const {navigate} = this.navigation;

        return (
            <LoadingContainer isLoading={this.state.isLoading}>
                <View style={{flex: 1,justifyContent:"center",alignItems:"center",backgroundColor:Styles.colors.primary}}>
                    <Text style={{color:"white",fontSize:40,fontWeight:"bold"}}>Sign Up</Text>
                    <View style={{width:"80%"}}>
                        <Input placeholder={"Full Name"} parent={this} name={"name"}/>
                        <Input placeholder={"Staff Member / Student"} parent={this} name={"type"}/>
                        <Input placeholder={"Email"} parent={this} name={"email"}/>
                        <Input placeholder={"Password"} secureTextEntry={true} parent={this} name={"password"}/>
                        <Input placeholder={"Confirm Password"} secureTextEntry={true} parent={this} name={"cpassword"}/>
                        <Button onPress={()=>{
                           this.signUp();
                        }}>Register</Button>
                        <View style={{width:"100%",marginTop:40,marginBottom:20}}>
                            <View style={{height:1,backgroundColor:"white",width:"100%"}} />
                            <Text style={{position:"absolute",color:"white",top:-15,backgroundColor:Styles.colors.primary,alignSelf:"center",fontSize:20,paddingHorizontal:20}}>OR</Text>
                        </View>
                        <Button onPress={()=>navigate('Login')}>Login</Button>
                    </View>
                </View>
            </LoadingContainer>
        );
    }
}
