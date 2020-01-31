import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';

export default class Input extends Component<Props> {

    constructor(props) {
        super(props);
        this.parent = props.parent;
        this.name = props.name;
    }

    render() {
        return  <TextInput {...this.props} onChangeText={text => {
            if(this.parent && this.name){
                let stateUpdate = {};
                stateUpdate[this.name] = text;
                this.parent.setState(stateUpdate);
            }
        }} underlineColorAndroid={"transparent"} placeholderTextColor={"white"} style={[{color:"white",borderWidth:1,borderColor:"white",marginTop:15,paddingVertical:5,borderRadius:20,paddingHorizontal:15},this.props.myStyle]}/>;
    }
}
