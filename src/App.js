/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View,StatusBar} from 'react-native';
import Nav from './navigation';
import Styles from './Styles';

const App = () => {
    return (
        <View style={{flex: 1}}>
            <StatusBar backgroundColor={Styles.colors.primary} />
            <Nav/>
        </View>
    );
};


export default App;
