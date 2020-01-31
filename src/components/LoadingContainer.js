import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

export default class LoadingContainer extends Component<Props> {
    render() {
        return (
            <View style={{flex: 1}}>
                <Text>LoadingContainer</Text>
            </View>
        );
    }
}
LoadingContainer.propTypes = {};
