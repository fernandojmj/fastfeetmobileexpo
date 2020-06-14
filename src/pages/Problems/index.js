import React, {Component} from 'react';

import {TouchableOpacity, Text, View, Button, TextInput, SafeAreaView} from 'react-native';
import {AsyncStorage} from 'react-native';
import moment from 'moment';
import IconFeather from 'react-native-vector-icons/Feather';

import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import Delivery from './../Delivery';
import api from '../../services/api';
import {Header, Container, Title, VIEWDETALHES, Linha, List} from './styles';

const Form = (props) => (
  <View style={styles.container}>
    <Button onPress={props.handleSubmit} title="enviar" />
  </View>
);

export default class Problems extends Component {
  static navigationOptions = ({navigation}) => ({
    IdDelivery: navigation.getParam('deliveryId'),
  });

  state = {
    userId: '',
    deliveryId: '',
    error: '',
    problems: '',
  };

  async componentDidMount() {
    const idUser = await AsyncStorage.getItem('@fastfeet:idUser');
    const {navigation} = this.props;
    console.log('Visualizar problemas' + navigation.getParam('deliveryId'));
    this.setState({
      deliveryId: navigation.getParam('deliveryId'),
    });

    const retorno = await api.get(
      `/delivery/${this.state.deliveryId}/problems`,
    );
    console.log(retorno.data.response);

    if (retorno.data.response !== null) {
      this.setState({
        problems: retorno.data.response,
      });
    }
  }

  voltar = async () => {
    const {navigation} = this.props;
    const {deliveryId} = this.state;
    navigation.navigate('DeliveryDetail', {deliveryId});
  };

  render() {
    const {error} = this.state;
    const {problems} = this.state;

    return (
      <Container>
        <Header>
          <TouchableOpacity style={{width: '25%'}} onPress={this.voltar}>
            <IconMaterial
              style={{marginLeft: 10, width: '25%', marginTop: 10}}
              name="chevron-left"
              color="#ffff"
              size={40}></IconMaterial>
          </TouchableOpacity>
          <Title>Visualizar Problemas</Title>
        </Header>
        <Text
          style={{
            position: 'absolute',
            marginTop: '20%',
            fontSize: 20,
            color: '#ffff',
            fontWeight: 'bold',
          }}>
          Encomenda {this.state.deliveryId}
        </Text>
        <VIEWDETALHES>
          <List
            data={problems}
            keyExtractor={(pro) => String(pro.id)}
            renderItem={({item}) => (
              <Linha>
                <Text
                  style={{
                    color: '#D3D3D3',
                    fontSize: 17,
                    fontWeight: 'bold',
                    width: '70%',
                  }}>
                  {item.description.substr(0, 20)}
                </Text>
                <Text style={{color: '#D3D3D3', fontSize: 13}}>
                  {moment(item.createdAt).format('DD/MM/YYYY')}
                </Text>
              </Linha>
            )}
          />
        </VIEWDETALHES>
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
