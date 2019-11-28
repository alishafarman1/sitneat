import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

export default class Button extends Component<Props> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{backgroundColor:"white",alignSelf:"center",paddingHorizontal:30,paddingVertical:7.5,marginTop:20,borderRadius:20}}>
                <Text style={{fontWeight:"bold"}}>{this.props.children}</Text>
            </TouchableOpacity>
        );
    }
}
Button.propTypes = {};
