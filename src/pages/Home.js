import React, {Component} from 'react';
import {FlatList, Image, Text, View, TouchableOpacity} from 'react-native';
import Styles from '../Styles';

const  dataSample = [
    {
        id:"1",
        image:require('../images/samosa.jpg'),
        title:"Samoosa",
        price:"15",
        left:10
    },
    {
        id:"2",
        image:require('../images/roll.jpg'),
        title:"Roll",
        price:"15",
        left:15
    },
    {
        id:"3",
        image:require('../images/chat.jpg'),
        title:"Chat",
        price:"60",
        left:18
    },
    {
        id:"4",
        image:require('../images/panipuri.jpg'),
        title:"Pani Puri",
        price:"100",
        left:5
    },
    {
        id:"5",
        image:require('../images/burger.jpg'),
        title:"Burger",
        price:"200",
        left:30
    },
    {
        id:"6",
        image:require('../images/Sandwhich.jpg'),
        title:"Sandwich",
        price:"150",
        left:100
    }
];
export default class Home extends Component<Props> {
    static navigationOptions = ({navigation}) => ({
        title:"Menu",
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

        return (
            <View style={{flex: 1,backgroundColor:"white"}}>
                <FlatList
                    data={dataSample}
                    renderItem={({item,index})=>this.itemView(item,index)}
                    keyExtractor={(i)=>JSON.stringify(i)}
                    ListFooterComponent={()=>(<View style={{width:1,height:30}}/>)}
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
