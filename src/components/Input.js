import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';

export default class Input extends Component<Props> {
    render() {
        return  <TextInput {...this.props} underlineColorAndroid={"transparent"} placeholderTextColor={"white"} style={[{color:"white",borderWidth:1,borderColor:"white",marginTop:15,paddingVertical:5,borderRadius:20,paddingHorizontal:15},this.props.myStyle]}/>;
    }
}
