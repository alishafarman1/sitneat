import {Alert,Keyboard} from 'react-native';
import firebase from 'react-native-firebase';

export default class Utils {
    constructor() {

    }

    static signOut(onDone){
        this.confirmationDialog("Sign Out","Do you really want to logout the app?",()=>{
            firebase.auth().signOut(onDone)
        })
    }

    static confirmationDialog(title,message,onOk,onCancel){
        Alert.alert(
            title,
            message,
            [
                {
                    text: 'Cancel',
                    onPress: onCancel,
                    style: 'cancel',
                },
                {text: 'OK', onPress: onOk},
            ],
            {cancelable: false},
        );
    }

    static startLoading(ref){
        Keyboard.dismiss();
        ref.setState({
            isLoading:true
        });
    }

    static stopLoading(ref){
        ref.setState({
            isLoading:false
        });
    }
}
