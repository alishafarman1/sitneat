import React, {Component} from 'react';
import {FlatList, Image, Text, View, TouchableOpacity,RefreshControl} from 'react-native';
import Styles from '../Styles';
import OrderData from '../data/OrderData';
import {resetRoute} from '../Utils';

const data = [
    OrderData,
    OrderData,
    OrderData,
    OrderData,
    OrderData,
    OrderData,
    OrderData,
    OrderData
];

export default class AdminDashboard extends Component<Props> {
    static navigationOptions = ({navigation}) => ({
        title:"Canteen Dashboard",
        headerRight:(
            <TouchableOpacity style={{backgroundColor:"#fff",paddingHorizontal:10,paddingVertical:5,borderRadius:20,marginRight:10}} onPress={()=>{
                resetRoute(navigation,"Splash")
            }}>
                <Text style={{color:Styles.colors.primary,fontWeight:"bold"}}>Logout</Text>
            </TouchableOpacity>
        )
    });

    navigation;

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
          isHistory:false
        };
    }

    componentDidMount(){

    }

    render() {
        const {navigate} = this.navigation;
        const {isHistory} = this.state;
        let tabItem = (text,image,selected = false,onPress)=>(
            <TouchableOpacity onPress={onPress} style={{flex:1,paddingHorizontal:10,paddingVertical:10,alignItems:"center",backgroundColor:selected ? Styles.colors.primaryDark : Styles.colors.primary}}>
                <Image source={image} style={{width:30,height:30,marginBottom:5,tintColor:"white"}} resizeMode={"contain"} />
                <Text style={{color:"white",fontSize:12}}>{text}</Text>
            </TouchableOpacity>
        );
        return (
            <View style={{flex: 1,backgroundColor:"white"}}>
                <FlatList
                    data={data}
                    refreshControl={<RefreshControl refreshing={false} />}
                    ListHeaderComponent={this.headerView(isHistory)}
                    renderItem={({item,index})=>this.itemView(item,isHistory)}
                    keyExtractor={(i,idx)=>(idx*10)+"KEY"}
                    ListFooterComponent={()=>(<View style={{width:1,height:30}}/>)}
                />
                <View style={{backgroundColor:Styles.colors.primary,elevation:15,bottom:0,position:"absolute",width:"100%",flexDirection:"row"}}>
                    {tabItem("Current Orders",require("../images/current.png"),!isHistory,()=>{
                        this.setState({
                            isHistory:false
                        });
                    })}
                    {tabItem("Orders History",require("../images/history.png"),isHistory,()=>{
                        this.setState({
                            isHistory:true
                        });
                    })}
                </View>
            </View>
        );
    }

    itemView = (data,isHistory = false)=>(
        <View style={{marginHorizontal:12,marginTop:10,elevation:5,backgroundColor:"white",borderRadius:12,overflow:"hidden"}}>
            <View style={{backgroundColor:Styles.colors.primary,paddingHorizontal:10,paddingVertical:5,flexDirection:"row"}}>
                <Text style={{color:"white",fontSize:13}}>{data.name}</Text>
                <Text style={{color:"white",fontSize:13,flex:1,textAlign:"center"}}>Order #{data.orderNo}</Text>
                <Text style={{color:"white",fontSize:13}}>{data.dateTime}</Text>
            </View>
            <View style={{paddingHorizontal:10,paddingVertical:5}}>
                <Text style={{fontSize:13}}><Text style={{fontWeight:"bold"}}>Note: </Text>{data.note}</Text>
                <Text style={{fontSize:14,marginTop:10,alignSelf:"center",backgroundColor: Styles.colors.primary,color:"white",paddingHorizontal:10,paddingVertical:5,borderTopLeftRadius:20,borderBottomRightRadius:20}}>Items</Text>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        {data.items.map((item,itemIndex)=>(
                            <Text key={itemIndex+"ITEM"} style={{fontSize:14}}><Text style={{fontWeight:"bold"}}>{item.name}</Text> X {item.qty}</Text>
                        ))}
                    </View>
                    <View style={{alignItems:"center",justifyContent:"center"}}>
                        <Text style={{fontSize:25}}>Rs 300</Text>
                    </View>
                </View>
            </View>
            {!isHistory && <TouchableOpacity style={{padding:7,backgroundColor:"green"}}>
                <Text style={{textAlign:"center",color:"white"}}>Mark As Completed</Text>
            </TouchableOpacity>}
        </View>
    );

    headerView(isHistory = false) {
        let statBox = (prefixText,num = 0,text = "Total",color = Styles.colors.primary)=>(
            <View style={{flex:1,backgroundColor:color,alignItems:"center",paddingVertical:15}}>
                <View style={{flexDirection:"row"}}>
                    {prefixText}
                    <Text style={{color:"white",fontSize:25}}>{num}</Text>
                </View>
                <Text style={{color:"white",fontSize:14}}>{text}</Text>
            </View>
        );

        return (
            <View>
                <View style={{padding:10}}>
                    <Text style={{fontSize:20,fontWeight:"400"}}>Statistics</Text>
                </View>
                <View style={{flexDirection:"row"}}>
                    {statBox(null,22,"Total Current Orders")}
                    {statBox(<Text style={{top:9,right:2,color:"white",fontSize:17}}>Rs</Text>,22000,"Total Current Orders","green")}
                </View>

                <View style={{alignItems:"center",marginTop:10,backgroundColor:Styles.colors.primary,alignSelf:"center",paddingHorizontal:20,paddingVertical:5,borderRadius:20}}>
                    <Text style={{fontSize:18,color:"#fff"}}>{isHistory ? "Orders History" :"Current Orders"}</Text>
                </View>
            </View>
        );
    }
}
