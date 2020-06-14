/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';

import './config/DevTools';

// import AsyncStorange from '@react-native-community/async-storage';
import { AsyncStorage } from 'react-native';
import createSwitchNavigator from './routes';

export default class App extends Component {
  state = {
    checkUser: false,
    userLoggend: false,
  };

  async componentDidMount() {
    const userLoggend = await AsyncStorage.getItem('@fastfeet:idUser');
    console.log(`Usuario logado: ${userLoggend}`);
    this.setState({
      checkUser: true,
    });
    if (userLoggend != null) {
      this.setState({
        userLoggend: true,
      });
    }

    console.log(this.state.userLoggend);

    console.log(this.state.checkUser);

    // await AsyncStorange.clear();
  }

  render() {
    const {userLoggend, checkUser} = this.state;

    if (!checkUser) {
      const Routes = createSwitchNavigator(checkUser);
      return <Routes />;
    }

    const Routes = createSwitchNavigator(userLoggend);

    return <Routes />;
  }
}
