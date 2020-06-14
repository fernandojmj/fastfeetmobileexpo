import React, { Component } from "react";

import { TouchableOpacity, Text, View } from "react-native";
import { AsyncStorage } from "react-native";

import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import AvatarText from "./../../components/AvatarNome";
import api from "../../services/api";

import {
  Header,
  Container,
  Name,
  VIEWTITLE,
  Repos,
  Repositorio,
  Linha,
  TITLE,
  Welcome,
  VIEWNAME,
  VIEWEXIT,
  AvatarFoto,
  ButtonEntregues,
  ButtonPendentes,
  VIEWDETALHES,
  VIEWTITLEITEM,
  VIEWSTATUSITEM,
  LinhaIn,
  TITLEITEM,
  STEP,
  VIEWHEADDETALHES,
  DETALHES,
} from "./styles";

// import { Container } from './styles';

export default class Delivery extends Component {
  static navigationOptions = ({ navigation }) => ({
    idUser: navigation.getParam("idUser"),
    userParam: navigation.getParam("responseUser"),
  });

  state = {
    deliveryes: [],
    user: "",
    url: "",
    sigla: "",
    clickButton: "",
  };

  voltar = async () => {
    console.log("Voltando");
    await AsyncStorage.removeItem("@fastfeet:idUser");
    const { navigation } = this.props;
    navigation.navigate("Login");
  };

  getCaractersStart = async (name) => {
    console.log("Obterndo sigla" + name);
    let text = name.toString();
    text = name.substr(0, 2);
    this.setState({
      sigla: text,
    });
  };

  async componentDidMount() {
    const idUser = await AsyncStorage.getItem("@fastfeet:idUser");
    console.log("buscando Encomendas");
    const { navigation } = this.props;
    const response = await api.get(`deliveryMan/${idUser}/deliveries`);
    this.setState({
      deliveryes: response.data.response,
    });
    if (navigation.getParam("responseUser") === undefined) {
      const response2 = await api.get(`/deliveryMan/show/${idUser}`);
      console.log("buscando dados usuario");
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
        user: navigation.getParam("responseUser"),
      });

      if (
        navigation.getParam("responseUser").avatarid != null &&
        navigation.getParam("responseUser").avatarid.url != null
      ) {
        this.setState({
          url: navigation.getParam("responseUser").avatarid.url,
        });
      }

      await this.getCaractersStart(navigation.getParam("responseUser").name);
    }

    redirect = async (deliveryId) => {
      const { navigation } = this.props;
      navigation.navigate("DeliveryDetail", { deliveryId });
    };

    this.setState({
      clickButton: "pendente",
    });

    console.log("--------------------------------");
    console.log(this.state.deliveryes);
    console.log("--------------------------------");
    console.log(this.state.user);
    console.log("--------------------------------");
  }

  getDeliveryes = async () => {
    const response = await api.get(
      `deliveryMan/${this.state.user.id}/deliveries`
    );
    this.setState({
      deliveryes: response.data.response,
    });

    this.setState({
      clickButton: "pendente",
    });
  };

  getDeliveryeds = async () => {
    const response = await api.get(
      `deliveryMan/${this.state.user.id}/deliveried`
    );
    this.setState({
      deliveryes: response.data.response,
    });

    this.setState({
      clickButton: "entregue",
    });
  };

  render() {
    const { deliveryes } = this.state;
    const { user } = this.state;
    const { url } = this.state;
    const { sigla } = this.state;
    console.log(url);

    const create_at = moment(user.createdAt).format("DD-MM-YYYY hh:mm:ss");
    const updated_at = moment(user.updatedAt).format("DD/MM/YYYY");
    return (
      <Container>
        <Header>
          {url ? (
            <AvatarFoto source={{ uri: url }} />
          ) : (
            <AvatarText text={sigla} />
          )}

          <VIEWNAME>
            <Welcome>Bem vindo,</Welcome>
            <Name>{user.name}</Name>
          </VIEWNAME>
          <VIEWEXIT>
            <TouchableOpacity onPress={this.voltar}>
              <IconMaterial name="exit-to-app" color="red" size={24} />
            </TouchableOpacity>
          </VIEWEXIT>
        </Header>
        <VIEWTITLE>
          <TITLE>Entregas</TITLE>
          <TouchableOpacity onPress={this.getDeliveryes}>
            <ButtonPendentes clickButton={this.state.clickButton}>
              Pendentes
            </ButtonPendentes>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.getDeliveryeds}>
            <ButtonEntregues clickButton={this.state.clickButton}>
              Entregues
            </ButtonEntregues>
          </TouchableOpacity>
        </VIEWTITLE>

        <Repos
          data={deliveryes}
          keyExtractor={(repo) => String(repo.id)}
          renderItem={({ item }) => (
            <Linha>
              <LinhaIn>
                <VIEWTITLEITEM>
                  <Icon name="truck" size={19} color="#7d40e7" />
                  <TITLEITEM>Encomenda {item.id}</TITLEITEM>
                </VIEWTITLEITEM>
                <VIEWSTATUSITEM>
                  <ProgressSteps
                    activeStep={item.statusNumber}
                    // progressBarColor="#7d40e7"
                    disabledStepIconColor="#be9ff3"
                    disabledStepNumColor="#be9ff3"
                    activeStepIconBorderColor="#7d40e7"
                    completedStepIconColor="#7d40e7"
                    completedProgressBarColor="#7d40e7"
                    activeStepIconColor="#7d40e7"
                    completedCheckColor="#ffff"
                    activeStepNumColor="#7d40e7"
                    activeLabelColor="#7d40e7"
                  >
                    <ProgressStep label="Aguardando Retirada" removeBtnRow>
                      <View style={{ alignItems: "center" }}></View>
                    </ProgressStep>
                    <ProgressStep label="Retirada" removeBtnRow>
                      <View
                        style={{
                          alignItems: "center",
                          // width: '4px',
                          // height: '4px',s
                        }}
                      ></View>
                    </ProgressStep>
                    <ProgressStep label="Entregue" removeBtnRow>
                      <View style={{ alignItems: "center" }}></View>
                    </ProgressStep>
                  </ProgressSteps>
                </VIEWSTATUSITEM>
              </LinhaIn>
              <VIEWDETALHES>
                <VIEWHEADDETALHES>
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 10,
                      color: "#8B8989",
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    Data
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#8B8989",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Cidade
                  </Text>
                </VIEWHEADDETALHES>
                <DETALHES>
                  <Text
                    style={{
                      marginLeft: 20,
                      fontSize: 14,
                      fontWeight: "bold",
                      width: "30%",
                    }}
                  >
                    {moment(item.createdAt).format("DD/MM/YYYY")}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      width: "33%",
                    }}
                  >
                    {item.recipient.cidade}
                  </Text>
                  <TouchableOpacity
                    style={{ width: "100%" }}
                    onPress={() => redirect(item.id)}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "#7d40e7",
                        width: "30%",
                      }}
                    >
                      Ver detalhes
                    </Text>
                  </TouchableOpacity>
                </DETALHES>
              </VIEWDETALHES>
            </Linha>
          )}
        />
      </Container>
    );
  }
}
Delivery.navigationOptions = {
  tabBarLabel: "Entregas",
  tabBarIcon: ({ tintColor }) => (
    <IconMaterial name="menu" size={20} color={tintColor} />
  ),
};
