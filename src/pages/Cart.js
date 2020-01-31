import React, {Component} from 'react';
import {FlatList, Image, Text, View, TouchableOpacity,TextInput} from 'react-native';
import Styles from '../Styles';
import Button from '../components/Button';
import Utils from '../base/Utils';
import firebase from "react-native-firebase";
import {resetRoute} from '../Utils';
import LoadingContainer from '../components/LoadingContainer';


export default class Cart extends Component<Props> {
    static navigationOptions = ({navigation}) => ({
        title:"Basket",
    });

    navigation;

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {note:"",isLoading:false}
    }


    componentDidMount(): void {

    }

     formatDate(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    }



    placeOrder = ()=>{
        let d = new Date();
        const {navigate} = this.navigation;
        let dateStr = this.formatDate(d);
        const {basket} = this.props.screenProps.app.state;
        const {note} = this;
        let total = basket.map((i)=>i.price*i.qty).reduce((a, b) => a + b, 0);
        if (!note || !note.length){
            alert("Please enter note with details of delivery");
            return;
        }
        Utils.confirmationDialog("Place order","Are you sure to place an order? your total amount will be Rs"+total,()=>{
            Utils.startLoading(this);
            firebase.database().ref("orders").once("value",(osnap)=> {
                let uid = firebase.auth().currentUser.uid;
                firebase.database().ref("users").child(uid).once("value",(snap)=> {
                    let orders = firebase.database().ref("orders");
                    let key = orders.push().key;
                    orders.child(key).set({
                        ...snap.val(),
                        items:basket,
                        note:note,
                        id:key,
                        dateStr:dateStr,
                        isDelivered:false,
                        total:total
                    }).then(()=>{
                        navigate("ThankYou");
                        Utils.stopLoading(this);
                        basket.forEach((bi)=>{
                            firebase.database().ref("menu").child(bi.id).child("left").once("value",(leftSnap)=>{
                                firebase.database().ref("menu").child(bi.id).child("left").set(parseInt(leftSnap.val())-bi.qty);
                            },(leftError)=>{

                            });
                        })
                    });
                    this.props.screenProps.app.setState({
                        basket:[]
                    });

                },(error)=>{
                    Utils.stopLoading(this);
                });
            },(error)=>{
                Utils.stopLoading(this);
            });
        });

    };

    render() {
        const {navigate} = this.navigation;
        const {basket} = this.props.screenProps.app.state;
        const {note,isLoading} = this.state;
        return (
            <LoadingContainer isLoading={isLoading}>
                <View style={{flex: 1,backgroundColor:"white"}}>
                    {basket.length > 0 ? <FlatList
                        data={basket}
                        renderItem={({item,index})=>this.itemView(item,index)}
                        keyExtractor={(i)=>JSON.stringify(i)}
                        ListFooterComponent={()=>(
                            <View>
                                <TextInput

                                    style={{
                                        borderWidth:1,
                                        borderColor:"#999",
                                        borderRadius:10,
                                        margin:10,
                                        marginBottom:0,
                                        textAlignVertical: "top",
                                        paddingHorizontal:10,
                                        height:100
                                    }}
                                    placeholder={"Your Order Note / Special Instructions\ne.g. Deliver Order in cafeteria table 5 & wrap it pack"}
                                    placeholderTextColor={"black"}
                                    onChangeText={(text)=>{
                                        this.note = text;
                                    }}
                                    multiline={true}
                                />
                                <View style={{backgroundColor:Styles.colors.primary,marginTop:20,elevation:5,margin:10,borderRadius:10,paddingVertical:10}}>
                                    <Text style={{color:"white",fontSize:22,fontWeight:"bold",alignSelf:"center"}}>Total Amount : Rs {basket.map((i)=>i.price*i.qty).reduce((a, b) => a + b, 0)}</Text>
                                    <Button onPress={this.placeOrder}>Place Order</Button>
                                </View>
                            </View>
                        )}
                    /> : <Text style={{alignSelf:"center",top:"40%",fontSize:20}}>No Items Added yet!</Text>}
                </View>
            </LoadingContainer>
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
                Utils.confirmationDialog("Remove item","Are you sure?",()=>{
                    this.props.screenProps.app.deleteFromCart(data.id);
                })
            }}>
                <Text style={{color:"white",alignSelf:"center",fontSize:17,fontWeight:"bold",paddingVertical:7}}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
}
