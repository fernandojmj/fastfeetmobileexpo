import React, {Component} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';

import {AsyncStorage} from 'react-native';
import styles from './styles';
import api from '../../services/api';
import {Avatar} from './styles';

import Logo from '../../assets/fastfeet-logo.png';

export default class Login extends Component {
  state = {
    idUser: '',
    loading: false,
    error: false,
    user: '',
    url: '',
  };

  checkUsename = async (idUser) => {
    const response = await api.get(`/deliveryMan/show/${idUser}`);
    console.log(response);
    if (response.data === '') {
      return undefined;
    } else {
      return response.data;
    }
  };

  saveUser = async (idUser) => {
    await AsyncStorage.setItem('@fastfeet:idUser', idUser);
  };

  signIn = async () => {
    const {idUser} = this.state;
    const {navigation} = this.props;

    this.setState({loading: true});
    try {
      console.log(idUser);
      const responseUser = await this.checkUsename(idUser);
      await this.saveUser(idUser);
      if (responseUser !== undefined) {
        this.setState({user: responseUser});

        console.log(this.state.user);

        navigation.navigate('Delivery', {idUser, responseUser});
      } else {
        this.setState({loading: false, error: true});
        console.log(error);
        console.log('Usuario não existe');
      }
    } catch (error) {
      this.setState({loading: false, error: true});
      console.log(error);
      console.log('Usuario não existe');
    }
  };

  render() {
    const {idUser, loading, error} = this.state;

    return (
      <View style={styles.container}>
        <View style={{backgroundColor: '#E0FFFF', padding:20, borderRadius:20, width:"100%", height:"40%"}}>

        <StatusBar barStyle="light-content" />
        <Image style={styles.image} source={Logo} />
        <View>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Informe seu Id de cadastro"
            underlineColorAndroid="transparent"
            value={idUser}
            onChangeText={(text) => this.setState({idUser: text})}
            />

          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Entrar no sistema</Text>
              )}
          </TouchableOpacity>

          {error && <Text style={styles.error}>Usuario não existe</Text>}
        </View>
      </View>
      </View>
    );
  }
}
2;
