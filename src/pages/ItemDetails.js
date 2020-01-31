import React, {Component} from 'react';
import {View, Text, Image,TouchableOpacity} from 'react-native';
import Styles from '../Styles';
import Input from '../components/Input';
import Button from '../components/Button';

export default class ItemDetails extends Component<Props> {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.item.title,
    });
    navigation;

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        let existingQty = props.screenProps.app.getBasketQty(this.navigation.state.params.item.id);
        this.state = {qty :existingQty,...this.navigation.state.params.item};
    }



    render() {
        const {navigate} = this.navigation;
        const {qty,title,image,price,left} = this.state;
        return (
            <View style={{flex:1}}>
                <View style={{flex: 1}}>
                    <View style={{elevation:5,backgroundColor:"white",overflow:"hidden"}}>
                        <Image source={image} resizeMode={"cover"} style={{width:"100%",height:350}} />
                    </View>
                    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
                        <View style={{flexDirection:"row",paddingHorizontal:20,paddingVertical:5}}>
                            <Text style={{color:Styles.colors.primary,fontSize:30}}>{title} : </Text>
                            <Text style={{color:"black",fontSize:30,alignSelf:"center",fontWeight:"bold"}}>Rs {price}</Text>
                        </View>
                        <View style={{flexDirection:"row",paddingHorizontal:20,paddingVertical:5}}>
                            <Text style={{color:Styles.colors.primary,fontSize:30}}>Items Left (In Stock) : </Text>
                            <Text style={{color:"black",fontSize:30,alignSelf:"center",fontWeight:"bold"}}>{left}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection:"row",paddingBottom:10,width:"100%",backgroundColor:Styles.colors.primary,paddingHorizontal:20,paddingVertical:5}}>
                        <Button onPress={()=>{
                            if(qty === 1){
                                return;
                            }
                            this.setState({qty:qty-1})
                        }} textStyle={{fontSize:19}}>-</Button>
                        <Input myStyle={{flex:1,textAlign:"center",fontSize:17,marginHorizontal:10}} value={qty.toString()} />
                        <Button onPress={()=>{
                            if(qty >= left){
                                return;
                            }
                            this.setState({qty:qty+1})
                        }} textStyle={{fontSize:19}}>+</Button>
                    </View>
                </View>
                <TouchableOpacity disabled={qty < 1} onPress={()=>{
                    this.props.screenProps.app.addToBasket(this.state);
                    this.navigation.goBack();
                    this.navigation.navigate("Cart");
                }}>
                    <View style={{backgroundColor:(qty < 1 ? "gray" : Styles.colors.primaryLight),paddingVertical:15,paddingHorizontal:15}}>
                        <Text style={{color:"white",fontSize:17,fontWeight:"bold",alignSelf:"center"}}>Add To Basket</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
