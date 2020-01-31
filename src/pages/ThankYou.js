import React, {Component} from 'react';
import {View, TouchableOpacity,Text,Image} from 'react-native';
import Styles from '../Styles';
import Input from '../components/Input';
import Button from '../components/Button';
import ImagePicker from 'react-native-image-picker';
import firebase from "react-native-firebase";
import LoadingContainer from '../components/LoadingContainer';
import Utils from '../base/Utils';

export default class ItemForm extends Component<Props> {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.navTitle,
    });
    navigation;

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {isLoading:false,imageChanged:false,progress:0,...this.navigation.state.params.item};
        this.isAdd = !this.state.id;
    }

    pickImage = ()=>{
         const options = {
            title: 'Select Image',
        };


        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                this.setState({
                    selectedImage: source,
                    imageChanged:true
                });
            }
        });
    };

    saveData(){
        Utils.startLoading(this);
        let {id,title,image,price,left,selectedImage,imageChanged} = this.state;
        const dbRef =   firebase.database().ref("menu");
        const storageRef = firebase.storage().ref("menu");
        if(this.isAdd){
            id = dbRef.push().key;
        }

        const uploadData = ()=>{
            dbRef.child(id).set({
                title:title,
                price:price,
                left:left,
                id:id,
                image:image
            }).then(()=>{
                Utils.stopLoading(this);
                this.navigation.goBack();
            }).catch((e)=>{
                alert(e)
            });
        };

        if(imageChanged){
            const ext = selectedImage.uri.split('.').pop();
            const filename = `${id}.${ext}`;
            storageRef.child(filename).putFile(selectedImage.uri)
                .on(
                    firebase.storage.TaskEvent.STATE_CHANGED,
                    snapshot => {
                        this.setState({
                            progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        });
                        if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
                            image = {
                                uri:snapshot.downloadURL
                            };
                            uploadData()
                        }
                    },
                    error => {
                        alert('Sorry, Try again.');
                    }
                );
        }else{
            uploadData();
        }
    }

    render() {
        const {navigate} = this.navigation;
        const {title,image,price,left,selectedImage,isLoading,progress} = this.state;

        const addImageBox = ()=>(
            <TouchableOpacity onPress={this.pickImage} style={{borderWidth:2,borderColor:"white",borderStyle:"dashed",width:100,height:100, borderRadius: 1,alignItems:"center",justifyContent:"center"}}>
                <Image source={require('../images/addImage.png')} style={{tintColor:"white",width:50,height:50}} />
            </TouchableOpacity>
        );

        const imageBox = () => (
            <TouchableOpacity onPress={this.pickImage} style={{overflow:"hidden",borderWidth:1,borderColor:"white",width:100,height:100, borderRadius: 1,marginRight:10}}>
                <Image source={selectedImage || image} resizeMode={"cover"} style={{width:100,height:100}} />
            </TouchableOpacity>
        );

        return (
            <LoadingContainer isLoading={isLoading}>
                <View style={{flex:1,zIndex:1}}>
                    <View style={{backgroundColor:Styles.colors.primary,margin:10,elevation:10,borderRadius:10,padding:19,zIndex:1}}>
                        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                            {this.isAdd && !selectedImage ? addImageBox() : imageBox()}
                        </View>
                        <View style={{backgroundColor: 'white',marginTop:20,height: 3,shadowColor: '#000',width: `${progress}%`}} />
                        <Input placeholder={"Item Name. For eg. Samosa, chat..."} parent={this} name={"title"} value={title} />
                        <Input placeholder={"Price In Rupees"}  parent={this} name={"price"} keyboardType={'number-pad'} value={price} />
                        <Input placeholder={"Available Qty"}  parent={this} name={"left"} keyboardType={'number-pad'} value={left} />
                        <Button onPress={()=>{
                            this.saveData();
                        }}>{this.isAdd ? "ADD ITEM" : "SAVE CHANGES"}</Button>
                    </View>
                </View>
            </LoadingContainer>
        );
    }
}
