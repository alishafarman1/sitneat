import React, {Component} from 'react';
import {FlatList, Image, Text, View, TouchableOpacity, RefreshControl} from 'react-native';
import Styles from '../Styles';
import {resetRoute} from '../Utils';
import Utils from '../base/Utils';
import firebase from "react-native-firebase";

export default class Home extends Component<Props> {
    static navigationOptions = ({navigation}) => ({
        title:"Menu",
        headerRight:(
            <TouchableOpacity style={{backgroundColor:"#fff",paddingHorizontal:10,paddingVertical:5,borderRadius:20,marginRight:10}} onPress={()=>{
                Utils.signOut(()=>{
                    resetRoute(navigation,"Splash");
                })
            }}>
                <Text style={{color:Styles.colors.primary,fontWeight:"bold"}}>Logout</Text>
            </TouchableOpacity>
        )
    });

    navigation;



    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {items:[],isLoading:false}
    }


    componentDidMount(): void {
        Utils.startLoading(this);
        firebase.database().ref("menu").once("value",(snap)=> {
            Utils.stopLoading(this);
        },(error)=>{
            Utils.stopLoading(this);
        });
        firebase.database().ref("menu").on("child_added",(snap)=> {
            let {items} = this.state;
            items.push(snap.val());
            this.setState({
                items: items,
                isLoading: false
            });
        },(error)=>{
            Utils.stopLoading(this);
        });

        firebase.database().ref("menu").on("child_changed",(snap)=>{
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

        firebase.database().ref("menu").on("child_removed",(snap)=>{
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

    render() {
        const {navigate} = this.navigation;
        const {items,isLoading} = this.state;
        return (
            <View style={{flex: 1,backgroundColor:"white"}}>
                <FlatList
                    refreshControl={<RefreshControl refreshing={isLoading} />}
                    data={items}
                    renderItem={({item,index})=>this.itemView(item,index)}
                    keyExtractor={(i)=>JSON.stringify(i)}
                    ListFooterComponent={()=>(<View style={{width:1,height:30}}/>)}
                    ListHeaderComponent={()=>(<View style={{width:"100%",paddingHorizontal:20,paddingTop:20}}>
                        <Text style={{color:"black",fontSize:25}}>Hi {firebase.auth().currentUser.displayName}</Text>
                    </View>)}
                />
                <TouchableOpacity onPress={()=>{
                    navigate("Cart");
                }} style={{position:"absolute",bottom:20,backgroundColor:Styles.colors.primary,padding:10,borderRadius:27.5,width:55,height:55,right:20,elevation:20}}>
                    <Image source={require('../images/basket.png')} style={{width:35,height:35,tintColor:"#fff"}} resizeMode={"contain"}/>
                </TouchableOpacity>
            </View>
        );
    }

    itemView = (data,i)=>(
        <TouchableOpacity onPress={()=>{
            this.navigation.navigate("ItemDetails",{item:data})
        }} style={{marginHorizontal:12,marginTop:10,elevation:5,backgroundColor:"white",borderRadius:12,overflow:"hidden"}}>
            <Image source={data.image} resizeMode={"cover"} style={{width:"100%",height:150}} />
            <View style={{flexDirection:"row",position:"absolute",bottom:0,left:0,width:"100%",backgroundColor:"rgba(0,0,0,0.5)",paddingHorizontal:20,paddingVertical:5}}>
                <Text style={{color:"#fff",fontSize:20,flex:1}}>{data.title}</Text>
                <Text style={{color:"#fff",fontSize:17,alignSelf:"center",fontWeight:"bold"}}>Rs {data.price}</Text>
            </View>
        </TouchableOpacity>
    );
}
