import React, { useState, useEffect, useRef } from "react";
import {
  StatusBar,
  View,
  Text,
  ToastAndroid,
  ActivityIndicator,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Camera } from "expo-camera";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";

import api from "../../services/api";

import {
  Container,
  HeaderExtented,
  Content,
  ContentOverlap,
  Card,
  ButtonCapture,
  ButtonSend,
  ButtonSendText,
} from "./styles";

export default function ConfirmDelivery({ navigation }) {
  const id = navigation.getParam("deliveryId");
  const [photo, setPhoto] = useState({});
  const [loading, setLoading] = useState(false);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const PendingView = () => (
    <View
      style={{
        flex: 1,
        backgroundColor: "lightgreen",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Aguardando...</Text>
    </View>
  );

  async function voltar() {
    const deliveryId = id;
    navigation.navigate("DeliveryDetail", { deliveryId });
  }

  function switchCamera() {
    if (cameraType === Camera.Constants.Type.back)
      setCameraType(Camera.Constants.Type.front);
    else setCameraType(Camera.Constants.Type.back);
  }

  async function takePicture() {
    const options = { quality: 0.5, base64: true };
    const data = await cameraRef.current.takePictureAsync(options);
    setPhoto({
      uri: data.uri,
      type: "image/jpeg",
      originalname: `user_signature_delivery_id_${id}.jpg`,
    });
  }

  async function handleSubmitSignature() {
    setLoading(true);
    console.log("enviando Photo!!");
    const data = new FormData(); // eslint-disable-line
    data.append("file", {
      uri: photo.uri,
      type: photo.type,
      name: photo.originalname,
    });
    console.log(data);

    try {
      const response = await api.post("files", data);
      console.log("photo_gravada" + response.data);
      const { id: signature_id } = response.data;

      if (response.status === 201) {
        const result = await api.put(`/delivery/deliveryEnd/${id}`, {
          signature_id,
        });

        if (result.status === 200) {
          ToastAndroid.show(
            "Encomenda entregue com sucesso",
            ToastAndroid.LONG
          );

          voltar();
        }
      } else {
        ToastAndroid.show(
          "Não foi possível confirmar a entrega. Tente novamente.",
          ToastAndroid.LONG
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Opsss...", "Não foi possível enviar a imagem.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7D40E7" />
      <Container>
        <HeaderExtented>
          <View
            style={{
              width: "100%",
              position: "absolute",
              alignItems: "center",
              marginTop: "2%",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity style={{ width: "25%" }} onPress={voltar}>
              <IconMaterial
                style={{ marginLeft: 10, width: "25%" }}
                name="chevron-left"
                color="#ffff"
                size={40}
              ></IconMaterial>
            </TouchableOpacity>
            <Text style={{ color: "#ffff", fontSize: 25, marginLeft: 50 }}>
              Confirmar Entrega
            </Text>
          </View>
        </HeaderExtented>
        <Content>
          <ContentOverlap>
            <Card>
              {photo.uri ? (
                <View
                  style={{
                    position: "relative",
                    flex: 1,
                  }}
                >
                  <Image source={{ uri: photo.uri }} style={{ flex: 1 }} />
                  <ButtonCapture
                    onPress={() => setPhoto({})}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      alignSelf: "center",
                    }}
                  >
                    <Icon name="clear" size={24} color="#fff" />
                  </ButtonCapture>
                </View>
              ) : (
                <Camera ref={cameraRef} style={{ flex: 1 }} type={cameraType}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      marginHorizontal: 20,
                    }}
                  >
                    {console.log("Entrou if camera")}
                    {console.log("Entrou permisao camera")}
                    <ButtonCapture
                      onPress={() => switchCamera()}
                      onLongPress={() =>
                        ToastAndroid.show(
                          "Altera entre câmera frontal e traseira",
                          ToastAndroid.LONG
                        )
                      }
                    >
                      <Icon name="switch-camera" size={24} color="#fff" />
                    </ButtonCapture>
                    <ButtonCapture onPress={() => takePicture()}>
                      <Icon name="photo-camera" size={24} color="#fff" />
                    </ButtonCapture>
                  </View>
                </Camera>
              )}
            </Card>
            <ButtonSend
              disabled={(loading || !photo.uri) && 1}
              onPress={handleSubmitSignature}
            >
              {loading ? (
                <ActivityIndicator color="#666" />
              ) : (
                <ButtonSendText>
                  {photo.uri ? "Enviar" : "Capture a foto"}
                </ButtonSendText>
              )}
            </ButtonSend>
          </ContentOverlap>
        </Content>
      </Container>
    </>
  );
}

ConfirmDelivery.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }),
};
