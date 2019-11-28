import React, {Component} from 'react';
import {FlatList, Image, Text, View} from 'react-native';

const  dataSample = [
    {
        image:require('../images/samosa.jpg'),
        title:"Samoosa",
        price:"15"
    },
    {
        image:require('../images/roll.jpg'),
        title:"Roll",
        price:"15"
    },
    {
        image:require('../images/chat.jpg'),
        title:"Chat",
        price:"60"
    }
];
export default class Home extends Component<Props> {
    static navigationOptions = ({navigation}) => ({
        title:"Menu"
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
                    renderItem={({item})=>this.itemView(item)}/>
            </View>
        );
    }

    itemView = (data)=>(
        <View style={{marginHorizontal:12,marginTop:10,elevation:5,backgroundColor:"white",borderRadius:12,overflow:"hidden"}}>
            <Image source={data.image} resizeMode={"cover"} style={{width:"100%",height:150}} />
            <View style={{flexDirection:"row",position:"absolute",bottom:0,left:0,width:"100%",backgroundColor:"rgba(0,0,0,0.5)",paddingHorizontal:20,paddingVertical:5}}>
                <Text style={{color:"#fff",fontSize:20,flex:1}}>{data.title}</Text>
                <Text style={{color:"#fff",fontSize:17,alignSelf:"center",fontWeight:"bold"}}>Rs {data.price}</Text>
            </View>
        </View>
    );
}
