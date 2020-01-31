import React, {Component} from 'react';
import {View, Text,ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import Styles from '../Styles';

export default class LoadingContainer extends Component<Props> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.props.children}
                {this.props.isLoading ? <View style={{backgroundColor:"rgba(0,0,0,0.8)",alignItems:"center",justifyContent:"center",position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:99999}}>
                    <ActivityIndicator size={50} color={"#ffffff"} />
                    <Text style={{color:"#fff",fontSize:18,marginTop:20,fontWeight:"bold"}}>Please wait</Text>
                </View> : null}
            </View>
        );
    }
}
LoadingContainer.propTypes = {
    isLoading:PropTypes.bool,
};
