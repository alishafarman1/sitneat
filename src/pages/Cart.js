import React, {Component} from 'react';
import {FlatList, Image, Text, View, TouchableOpacity} from 'react-native';
import Styles from '../Styles';
import Button from '../components/Button';


export default class Cart extends Component<Props> {
    static navigationOptions = ({navigation}) => ({
        title:"Basket",
    });

    navigation;

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
    }


    componentDidMount(): void {

    }

    render() {
        const {navigate} = this.navigation;
        const {basket} = this.props.screenProps.app.state;
        return (
            <View style={{flex: 1,backgroundColor:"white"}}>
                {basket.length > 0 ? <FlatList
                    data={basket}
                    renderItem={({item,index})=>this.itemView(item,index)}
                    keyExtractor={(i)=>JSON.stringify(i)}
                    ListFooterComponent={()=>(
                        <View style={{backgroundColor:Styles.colors.primary,marginTop:20,elevation:5,margin:10,borderRadius:10,paddingVertical:10}}>
                            <Text style={{color:"white",fontSize:22,fontWeight:"bold",alignSelf:"center"}}>Total Amount : Rs {basket.map((i)=>i.price*i.qty).reduce((a, b) => a + b, 0)}</Text>
                            <Button>Place Order</Button>
                        </View>
                    )}
                /> : <Text style={{alignSelf:"center",top:"40%",fontSize:20}}>No Items Added yet!</Text>}
            </View>
        );
    }

    itemView = (data,i)=>(
        <View style={{marginHorizontal:12,marginTop:10,elevation:5,backgroundColor:"white",borderRadius:12,overflow:"hidden"}}>
            <TouchableOpacity onPress={()=>{
                this.navigation.navigate("ItemDetails",{item:data})
            }}  style={{flexDirection:"row"}}>
                <Image source={data.image} resizeMode={"cover"} style={{width:70,height:65}} />
                <View style={{flex:1,paddingHorizontal:20,paddingVertical:5}}>
                    <Text style={{color:"black",fontSize:17}}>{data.title}</Text>
                    <Text style={{color:"black",fontSize:17,fontWeight:"bold"}}>Each: Rs {data.price}</Text>
                </View>
                <View style={{flex:1,paddingHorizontal:20,paddingVertical:5}}>
                    <Text style={{color:"black",fontSize:17}}>Qty {data.qty}</Text>
                    <Text style={{color:"black",fontSize:17,fontWeight:"bold"}}>Total: Rs {data.price*data.qty}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:"#a82a15"}} onPress={()=>{
                this.props.screenProps.app.deleteFromCart(data.id);
            }}>
                <Text style={{color:"white",alignSelf:"center",fontSize:17,fontWeight:"bold",paddingVertical:7}}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
}
