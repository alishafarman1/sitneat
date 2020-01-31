import React, {Component} from 'react';
import {FlatList, Image, Text, View, TouchableOpacity, RefreshControl} from 'react-native';
import Styles from '../Styles';
import {resetRoute} from '../Utils';
import Utils from '../base/Utils';
import firebase from "react-native-firebase";

export default class ManageMenu extends Component<Props> {
    static navigationOptions = ({navigation}) => ({
        title:"Manage Menu",
        headerRight:(
            <TouchableOpacity style={{backgroundColor:"#fff",paddingHorizontal:10,paddingVertical:5,borderRadius:20,marginRight:10}} onPress={()=>{
                navigation.navigate("ItemForm",{item:{},navTitle:"Add Menu Item"})
            }}>
                <Text style={{color:Styles.colors.primary,fontWeight:"bold"}}>Add Menu Item +</Text>
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
                />
                {!isLoading && items.length<=0 ? <Text style={{position:"absolute",alignSelf:"center",marginTop:"60%",fontSize:20}}>No Menu Items Right Now!</Text> : null}
            </View>
        );
    }

    itemView = (data,i)=>{
        let actionButton = (text,image,onPress)=>(
            <TouchableOpacity onPress={onPress} style={{flexDirection:"row",backgroundColor:"white",elevation:10,margin:10,width:100,height:35,alignItems:"center",justifyContent:"center",borderRadius:17.5}}>
                <Text style={{fontSize:16,color:Styles.colors.primary,marginRight:10,fontWeight:"bold"}}>{text}</Text>
                <Image source={image} resizeMode={"contain"} style={{width:20,height:20,tintColor:Styles.colors.primary}} />
            </TouchableOpacity>
        );
        return (
            <View  style={{marginHorizontal:12,marginTop:10,elevation:5,backgroundColor:"white",borderRadius:12,overflow:"hidden"}}>
                <Image source={data.image} resizeMode={"cover"} style={{width:"100%",height:150}} />
                <View style={{flexDirection:"row",position:"absolute",bottom:0,left:0,width:"100%",backgroundColor:"rgba(0,0,0,0.5)",paddingHorizontal:20,paddingVertical:5}}>
                    <Text style={{color:"#fff",fontSize:20,flex:1}}>{data.title}</Text>
                       <View>
                           <Text style={{color:"#fff",fontSize:17,alignSelf:"center",fontWeight:"bold"}}>Rs {data.price}</Text>
                       </View>
                </View>
                <Text style={{color:"#fff",fontSize:17,alignSelf:"center",fontWeight:"bold",position:"absolute",left:0,margin:10,backgroundColor:"rgba(0,0,0,0.5)",padding:10}}>Stock Left : {data.left}</Text>
                <View style={{position:"absolute",right:0}}>
                    {actionButton("Edit",require('../images/edit.png'),()=>{
                        this.navigation.navigate("ItemForm",{item:data,navTitle:"Edit "+data.title})
                    })}
                    {actionButton("Delete",require('../images/delete.png'),()=>{
                        Utils.confirmationDialog("Delete Menu Item","Are you sure to delete "+data.title+"?",()=> {
                            firebase.database().ref("menu").child(data.id).remove();
                            firebase.storage().ref("menu").child(data.id+".jpg").delete();
                        })
                    })}
                </View>
            </View>
    )};
}
