import React, {Component} from 'react';

import {TouchableOpacity, Text, View, Button} from 'react-native';
import {AsyncStorage} from 'react-native';
import moment from 'moment';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import AvatarText from './../../components/AvatarNome';
import api from '../../services/api';
import {
  Header,
  Container,
  Label,
  Dado,
  VIEWNAME,
  VIEWDADOS,
  AvatarFoto,
  VIEWBUTON,
  Logout,
} from './styles';

export default class Profile extends Component {
  static navigationOptions = ({navigation}) => ({
    idUser: navigation.getParam('idUser'),
    userParam: navigation.getParam('responseUser'),
  });

  state = {
    user: '',
    url: '',
    sigla: '',
  };

  voltar = async () => {
    console.log('Voltando');
    await AsyncStorage.removeItem('@fastfeet:idUser');
    const {navigation} = this.props;
    navigation.navigate('Login');
  };

  getCaractersStart = async (name) => {
    console.log('Obterndo sigla' + name);
    let text = name.toString();
    text = name.substr(0, 2);
    this.setState({
      sigla: text,
    });
  };

  async componentDidMount() {
    const idUser = await AsyncStorage.getItem('@fastfeet:idUser');

    const {navigation} = this.props;

    if (navigation.getParam('responseUser') === undefined) {
      const response2 = await api.get(`/deliveryMan/show/${idUser}`);
      console.log('buscando dados usuario');
      this.setState({
        user: response2.data,
      });

      if (response2.data.avatarid != null) {
        this.setState({
          url: response2.data.avatarid.url,
        });
      }

      await this.getCaractersStart(response2.data.name);
    } else {
      this.setState({
        user: navigation.getParam('responseUser'),
      });

      if (
        navigation.getParam('responseUser').avatarid != null &&
        navigation.getParam('responseUser').avatarid.url != null
      ) {
        this.setState({
          url: navigation.getParam('responseUser').avatarid.url,
        });
      }

      await this.getCaractersStart(navigation.getParam('responseUser').name);
    }
  }

  render() {
    const {user} = this.state;
    const {url} = this.state;
    const {sigla} = this.state;

    const create_at = moment(user.createdAt).format('DD/MM/YYYY');

    return (
      <Container>
        <Header>
          {url ? (
            <AvatarFoto source={{uri: url}} />
          ) : (
            <AvatarText text={sigla} />
          )}
        </Header>

        <VIEWDADOS>
          <VIEWNAME>
            <Label>Nome Completo</Label>
            <Dado>{user.name}</Dado>
            <Label>Email</Label>
            <Dado>{user.email}</Dado>
            <Label>Data Cadastro</Label>
            <Dado>{create_at}</Dado>
          </VIEWNAME>
          <TouchableOpacity onPress={this.voltar}>
            <VIEWBUTON>
              <Logout>Logout</Logout>
            </VIEWBUTON>
          </TouchableOpacity>
        </VIEWDADOS>
      </Container>
    );
  }
}
Profile.navigationOptions = {
  tabBarLabel: 'Meu Perfil',
  tabBarIcon: ({tintColor}) => (
    <IconMaterial name="person" size={20} color={tintColor} />
  ),
};
