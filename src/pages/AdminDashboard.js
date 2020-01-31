import React, {Component} from 'react';
import {FlatList, Image, Text, View, TouchableOpacity,RefreshControl} from 'react-native';
import Styles from '../Styles';
import firebase from 'react-native-firebase';
import Utils from '../base/Utils';
import {navigate} from '@react-navigation/core/lib/commonjs/NavigationActions';

export default class AdminDashboard extends Component<Props> {
    static navigationOptions = ({navigation}) => ({
        title:"Canteen Dashboard",
    });

    navigation;

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
          isHistory:false,
            isLoading:false,
            items:[]
        };
    }

    componentDidMount(){
       this.loadData();
    }

    loadData(){
        this.dbRef = firebase.database().ref("orders").orderByChild("isDelivered").equalTo(this.state.isHistory);
        this.dbRef.once("value",(snap)=> {
            Utils.stopLoading(this);
        },(error)=>{
            Utils.stopLoading(this);
        });
        this.dbRef.on("child_added",(snap)=> {
            let {items} = this.state;
            items.push(snap.val());
            this.setState({
                items: items,
                isLoading: false
            });
        },(error)=>{
            Utils.stopLoading(this);
        });

        this.dbRef.on("child_changed",(snap)=>{
            let {items} = this.state;
            const keys = items.map((itm)=>itm.id);
            const index = keys.indexOf(snap.key);
            items[index] = snap.val();
            this.setState({
                items:items,
                isLoading:false
            });
        },(error)=>{
            Utils.stopLoading(this);
        });

        this.dbRef.on("child_removed",(snap)=>{
            let {items} = this.state;
            const keys = items.map((itm)=>itm.id);
            const index = keys.indexOf(snap.key);
            items.splice(index,1);
            this.setState({
                items:items,
                isLoading:false
            });
        },(error)=>{
            Utils.stopLoading(this);
        });
    }

    turnOff(){
        firebase.database().ref("orders").off("child_added");
        firebase.database().ref("orders").off("child_changed");
        firebase.database().ref("orders").off("child_removed");
    }

    render() {
        const {navigate} = this.navigation;
        const {isHistory,items} = this.state;
        let tabItem = (text,image,selected = false,onPress)=>(
            <TouchableOpacity onPress={onPress} style={{flex:1,paddingHorizontal:10,paddingVertical:10,alignItems:"center",backgroundColor:selected ? Styles.colors.primaryDark : Styles.colors.primary}}>
                <Image source={image} style={{width:30,height:30,marginBottom:5,tintColor:"white"}} resizeMode={"contain"} />
                <Text style={{color:"white",fontSize:12}}>{text}</Text>
            </TouchableOpacity>
        );
        return (
            <View style={{flex: 1,backgroundColor:"white"}}>
                <FlatList
                    data={items}
                    refreshControl={<RefreshControl refreshing={false} />}
                    ListHeaderComponent={this.headerView(isHistory)}
                    renderItem={({item,index})=>this.itemView(item,isHistory,index)}
                    keyExtractor={(i,idx)=>(idx*10)+"KEY"}
                    ListFooterComponent={()=>(<View style={{width:1,height:100}}/>)}
                />
                <View style={{backgroundColor:Styles.colors.primary,elevation:15,bottom:0,position:"absolute",width:"100%",flexDirection:"row"}}>
                    {tabItem("Current Orders",require("../images/current.png"),!isHistory,()=>{
                        this.setState({
                            isHistory:false,
                            items:[]
                        },()=>{
                            this.turnOff();
                            this.loadData();
                        });
                    })}
                    {tabItem("Orders History",require("../images/history.png"),isHistory,()=>{
                        this.setState({
                            isHistory:true,
                            items:[]
                        },()=>{
                            this.turnOff();
                            this.loadData();
                        });
                    })}
                </View>
            </View>
        );
    }

    itemView = (data,isHistory = false,i)=>(
        <View style={{marginHorizontal:12,marginTop:10,elevation:5,backgroundColor:"white",borderRadius:12,overflow:"hidden"}}>
            <View style={{backgroundColor:Styles.colors.primary,paddingHorizontal:10,paddingVertical:5,flexDirection:"row"}}>
                <Text style={{color:"white",fontSize:13}}>{data.name}</Text>
                <Text style={{color:"white",fontSize:13,flex:1,textAlign:"right"}}>Order #0{i+10}</Text>
                <Text style={{color:"white",fontSize:13}}>{data.dateTime}</Text>
            </View>
            <View style={{paddingHorizontal:10,paddingVertical:5}}>
                <Text style={{fontSize:13}}><Text style={{fontWeight:"bold"}}>Note: </Text>{data.note}</Text>
                <Text style={{fontSize:14,marginTop:10,alignSelf:"center",backgroundColor: Styles.colors.primary,color:"white",paddingHorizontal:10,paddingVertical:5,borderTopLeftRadius:20,borderBottomRightRadius:20}}>Items</Text>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:1}}>
                        {data.items.map((item,itemIndex)=>(
                            <Text key={itemIndex+"ITEM"} style={{fontSize:14}}><Text style={{fontWeight:"bold"}}>{item.title}</Text> X {item.qty}</Text>
                        ))}
                    </View>
                    <View style={{alignItems:"center",justifyContent:"center"}}>
                        <Text style={{fontSize:12}}>{data.dateStr}</Text>
                        <Text style={{fontSize:25}}>Rs {data.total}</Text>
                    </View>
                </View>
            </View>
            {!isHistory && <TouchableOpacity onPress={()=>{
                Utils.confirmationDialog("Mark as delivered","Are you sure its delivered?",()=>{
                    firebase.database().ref("orders").child(data.id).child("isDelivered").set(true);
                })
            }} style={{padding:7,backgroundColor:"green"}}>
                <Text style={{textAlign:"center",color:"white"}}>Mark As Completed</Text>
            </TouchableOpacity>}
        </View>
    );

    total = (myNumbers)=>{
        var total = 0;
        for(var i = 0; i < myNumbers.length; i++){
            total += parseInt(myNumbers[i]);
        }
        return total;
    };

    headerView(isHistory = false) {
        const {navigate} = this.navigation;
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
                <View style={{padding:10,flexDirection:"row"}}>
                    <Text style={{fontSize:20,fontWeight:"400",flex:1}}>Statistics</Text>
                    <TouchableOpacity style={{backgroundColor:Styles.colors.primary,paddingHorizontal:10,paddingVertical:5,borderRadius:20,marginRight:10}} onPress={()=>{
                        navigate("ManageMenu")
                    }}>
                        <Text style={{color:"white",fontWeight:"bold"}}>Manage Menu</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection:"row"}}>
                    {statBox(null,this.state.items.length,"Total Current Orders")}
                    {statBox(<Text style={{top:9,right:2,color:"white",fontSize:17}}>Rs</Text>,this.total(this.state.items.map((itm)=>parseInt(itm.total))),"Total Revenue","green")}
                </View>

                <View style={{alignItems:"center",marginTop:10,backgroundColor:Styles.colors.primary,alignSelf:"center",paddingHorizontal:20,paddingVertical:5,borderRadius:20}}>
                    <Text style={{fontSize:18,color:"#fff"}}>{isHistory ? "Orders History" :"Current Orders"}</Text>
                </View>
            </View>
        );
    }
}
