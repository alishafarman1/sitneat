import React, {Component} from 'react';
import {View, Text,ActivityIndicator} from 'react-native';
import Styles from '../Styles';
import {resetRoute} from '../Utils';

export default class Splash extends Component<Props> {
    static navigationOptions = ({navigation}) => ({
        header:null
    });

    navigation;

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
    }


    componentDidMount(): void {
        setTimeout(()=>{
            resetRoute(this.navigation,"Login")
        },2000)
    }

    render() {
        const {navigate} = this.navigation;

        return (
            <View style={{flex: 1,justifyContent:"center",alignItems:"center",backgroundColor:Styles.colors.primary}}>
                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"white",fontSize:50,fontWeight:"bold"}}>Sit</Text>
                    <Text style={{color:"white",fontSize:30,marginHorizontal:10}}>“N”</Text>
                    <Text style={{color:"white",fontSize:50,fontWeight:"bold"}}>Eat</Text>
                </View>
                <Text style={{color:"white",fontSize:16,marginHorizontal:10}}>Cafeteria Ordering System</Text>
                <View style={{position:"absolute",bottom:100}}>
                    <ActivityIndicator color="white" size={30} />
                </View>
            </View>
        );
    }
}
