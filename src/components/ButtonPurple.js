import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Styles from '../Styles';

export default class ButtonPurple extends Component<Props> {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} style={{backgroundColor:Styles.colors.primary,alignSelf:"center",paddingHorizontal:30,paddingVertical:7.5,marginTop:20,borderRadius:20}}>
                <Text style={[{fontWeight:"bold",color:"#fff"},this.props.textStyle]}>{this.props.children}</Text>
            </TouchableOpacity>
        );
    }
}
ButtonPurple.propTypes = {};
