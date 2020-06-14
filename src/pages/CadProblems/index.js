import React, {Component} from 'react';

import {
  TouchableOpacity,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
} from 'react-native';
import { AsyncStorage } from 'react-native';
import moment from 'moment';
import IconFeather from 'react-native-vector-icons/Feather';

import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Delivery from './../Delivery';
import api from '../../services/api';
import {
  Header,
  Container,
  Title,
  VIEWDETALHES,
  VIEWSTATUS,
  VIEWBOTTONS,
  VIEWBUTON,
} from './styles';

const Form = (props) => (
  <View style={styles.container}>
    <Button onPress={props.handleSubmit} title="enviar" />
  </View>
);

export default class CadProblems extends Component {
  static navigationOptions = ({navigation}) => ({
    IdDelivery: navigation.getParam('deliveryId'),
  });

  state = {
    userId: '',
    deliveryId: '',
    error: '',
    description: '',
  };

  async componentDidMount() {
    const idUser = await AsyncStorage.getItem('@fastfeet:idUser');
    const {navigation} = this.props;
    this.setState({
      deliveryId: navigation.getParam('deliveryId'),
      userId: idUser,
    });
  }

  voltar = async () => {
    const {navigation} = this.props;
    const {deliveryId} = this.state;
    navigation.navigate('DeliveryDetail', {deliveryId});
  };

  sendProblem = async () => {
    console.log('Enviado problema');
    const data = {
      description: this.state.description,
    };
    console.log(data);
    if (data.description == '') {
      this.setState({
        description: '',
      });
      ToastAndroid.show('Informe o problema!', ToastAndroid.LONG);

      return '';
    }
    const response = await api.post(
      `delivery/${this.state.deliveryId}/problems`,
      data,
    );
    console.log(response.data);
    if ((response.data !== undefined) & (response.data.id != null)) {
      this.setState({
        // error: 'Cadastrado problema com Sucesso.',
        description: '',
      });
      ToastAndroid.show('Cadastrado problema com Sucesso', ToastAndroid.LONG);
    } else {
      ToastAndroid.show(response.data.Withdrawal, ToastAndroid.LONG);
    }
  };

  render() {
    const {delivery, error} = this.state;
    const {recipient} = this.state;

    return (
      <Container>
        <Header>
          <TouchableOpacity style={{width: '25%'}} onPress={this.voltar}>
            <IconMaterial
              style={{marginLeft: 10, width: '25%'}}
              name="chevron-left"
              color="#ffff"
              size={40}></IconMaterial>
          </TouchableOpacity>
          <Title>Informar problema</Title>
        </Header>
        <VIEWDETALHES>
          <TextInput
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#ffff',
              marginTop: 10,
              textAlignVertical: 'top',
            }}
            multiline
            editable
            numberOfLines={100}
            autoFocus
            autoCorrect
            maxLength={1000}
            placeholder="informe seu problema"
            value={this.state.description}
            onChangeText={(text) => this.setState({description: text})}
          />
        </VIEWDETALHES>

        <TouchableOpacity
          onPress={() => this.sendProblem()}
          style={{width: '100%'}}>
          <VIEWBOTTONS
            style={{
              width: '100%',
              height: 50,
              backgroundColor: '#7d40e7',
              borderRadius: 10,
              alignItems: 'center',
              marginTop: '80%',
              flexDirection: 'column',
            }}>
            <Text
              style={{
                width: '20%',
                marginTop: 8,
                color: '#ffff',
                alignItems: 'center',
                textAlignVertical: 'center',
                fontSize: 20,
                fontStyle: 'bold',
              }}>
              Enviar
            </Text>
          </VIEWBOTTONS>
        </TouchableOpacity>

        {error !== '' ? (
          <View
            style={{
              height: '15%',
              width: '80%',
              backgroundColor: '#ffff',
              borderStyle: 'solid',
              borderColor: '#7d40e7',
              borderWidth: 2,
              position: 'absolute',
              marginTop: '40%',
              alignItems: 'center',
            }}>
            <IconFeather
              name="x-circle"
              size={40}
              color="#eb7e80"
              style={{marginTop: 20}}></IconFeather>
            <Text style={{marginTop: 6}}>{error}</Text>
            <View
              style={{
                backgroundColor: '#ffff',
                borderColor: '#7d40e7',
                borderStyle: 'solid',
                borderWidth: 3,
                marginTop: 5,
                width: '20%',
                height: '20%',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    error: '',
                  })
                }>
                <Text style={{color: '#7d40e7', fontWeight: 'bold'}}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{display: 'none'}}></View>
        )}
      </Container>
    );
  }
}

Delivery.navigationOptions = {
  tabBarLabel: 'Entregas',
  tabBarIcon: ({tintColor}) => (
    <IconMaterial name="menu" size={20} color={tintColor} />
  ),
};
