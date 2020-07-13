import React, { useState, useEffect, useCallback, Fragment } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Geocoder from "react-native-geocoding";
import IconMaterial from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");
import Directions from "../../components/Directions";
import {
  LocationBox,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  LocationText,
  LocationBoxBig,
} from "./styles";

import { getPixelSize } from "../../utils";
import api from "../../services/api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

Geocoder.init("AIzaSyDc-3OPlSPnF4lYf7Q_Yn8xwMH0M86nT_A");

export default function Map({ navigation }) {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: -8.1258339763885,
    longitude: -34.908913657708865,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134,
  });

  const [position, setPosition] = useState({
    latitude: -8.1258339763885,
    longitude: -34.908913657708865,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134,
  });

  const [initialRegion, setInitialRegion] = useState({
    latitude: -8.1258339763885,
    longitude: -34.908913657708865,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134,
  });

  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);

  const [titleRegion, setTitleRegion] = useState("Estou Aqui!");
  const [adressDelivery, setAdressDelivery] = useState("");
  const [map, setMap] = useState(null);
  const address = navigation.getParam("recipient");

  const [intervalo, setIntervalo] = useState(null);

  //   console.log(location);

  async function voltar() {
    //   const deliveryId = id;
    //     navigation.navigate("DeliveryDetail", { deliveryId });
    clearInterval(intervalo);
    navigation.navigate("Delivery");
  }

  useEffect(() => {
    console.log("User Effect");
    if (address != null && address != undefined) {
      // obterLocalizacao();

      obterLocalizacaoEndereco();
    }
    setIntervalo(
      setInterval((id) => {
        obterLocalizacao();
        console.log("passou 20 segundos");
      }, 20000)
    );

    console.log(intervalo);

    obterLocalizacaoAtual();

    // map.fitToCoordinates(result.coordinates, {
    //   edgePadding: {
    //     right: getPixelSize(50),
    //     left: getPixelSize(50),
    //     top: getPixelSize(50),
    //     bottom: getPixelSize(350),
    //   },
    // });
  }, []);

  useEffect(() => {
    if (address != null && address != undefined) {
      setRegion({
        latitude: position.latitude,
        longitude: position.longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      });
      if (map != null) {
        // map.fitToCoordinates([region.latitude,re], {
        //   edgePadding: {
        //     right: getPixelSize(2),
        //     left: getPixelSize(2),
        //     top: getPixelSize(2),
        //     bottom: getPixelSize(2),
        //   },
        // });
      }
    }
  }, [position]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={region}
        showsUserLocation
        loadingEnabled
        ref={(el) => setMap(el)}
      >
        {location ? (
          <Fragment>
            <Directions
              origin={initialRegion}
              destination={location}
              onReady={(result) => {
                setDuration(Math.floor(result.duration));
                setDistance(Math.floor(result.distance));

                map.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: getPixelSize(50),
                    left: getPixelSize(50),
                    top: getPixelSize(50),
                    bottom: getPixelSize(350),
                  },
                });
              }}
            />

            <TouchableOpacity style={{ width: "25%" }} onPress={voltar}>
              <IconMaterial
                style={{
                  marginLeft: 10,
                  marginTop: 30,
                  width: "25%",
                }}
                name="chevron-left"
                // color="#ffff"
                size={40}
              ></IconMaterial>
            </TouchableOpacity>

            <Marker coordinate={location} anchor={{ x: 0, y: 0 }}>
              <LocationBoxBig>
                <IconMaterial
                  name="map-marker-radius"
                  color="red"
                  size={40}
                ></IconMaterial>
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{distance}</LocationTimeText>
                    <LocationTimeTextSmall>KM</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>{location.address}</LocationText>
                </LocationBox>
              </LocationBoxBig>
            </Marker>

            <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
              <LocationBoxBig>
                <IconMaterial
                  name="map-marker-radius"
                  color="red"
                  size={40}
                ></IconMaterial>
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>
                    {console.log("novo localização")}
                    {region.latitude}
                  </LocationText>
                  <LocationText>{region.longitude}</LocationText>
                </LocationBox>
              </LocationBoxBig>
            </Marker>
          </Fragment>
        ) : (
          <View>
            <TouchableOpacity style={{ width: "25%" }} onPress={voltar}>
              <IconMaterial
                style={{
                  marginLeft: 10,
                  marginTop: 30,
                  width: "25%",
                }}
                name="chevron-left"
                // color="#ffff"
                size={40}
              ></IconMaterial>
            </TouchableOpacity>
          </View>
        )}

        {/* <Marker
          coordinate={location}
          anchor={{ x: 0, y: 0 }}
          image={markerImage}
        ></Marker> */}
      </MapView>
    </View>
  );

  function obterLocalizacao() {
    navigator.geolocation.watchPosition(
      async ({ coords: { latitude, longitude } }) => {
        // const response = await Geocoder.from({ latitude, longitude });
        // const address = response.results[0].formatted_address;
        // setTitleRegion(address.substring(0, address.indexOf(",")));
        console.log("=================");
        console.log(latitude);
        console.log(longitude);
        console.log("=================");

        setPosition({
          latitude,
          longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
        });
      },
      () => {},
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    );
  }

  function obterLocalizacaoAtual() {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0143,
          longitudeDelta: 0.0134,
        });
      },
      () => {},
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    );
  }

  async function obterLocalizacaoEndereco() {
    const response = await api.get(`/recenpients/cordinate/${address.id}`);
    console.log(response.data);
    const { latitude, longitude } = response.data;

    setLocation({
      latitude,
      longitude,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
      address: address.rua + ", " + address.numero + " - " + address.estado,
    });

    // Não esta sendo mais usado usando API para busca coordendas
    //   Geocoder.from(
    //     address.rua +
    //       ", " +
    //       address.numero +
    //       ", " +
    //       address.cidade +
    //       ", " +
    //       address.estado
    //   )
    //     .then((json) => {
    //       // console.log(json.results[0]);
    //       var locationGeometry = json.results[0].geometry.location;
    //       const addressLocation = json.results[0].formatted_address;
    //       console.log(json.results[0].formatted_address);
    //       console.log(addressLocation.substring(0, addressLocation.indexOf(",")));
    //       setLocation({
    //         latitude: locationGeometry.lat,
    //         longitude: locationGeometry.lng,
    //         latitudeDelta: 0.0143,
    //         longitudeDelta: 0.0134,
    //         address: addressLocation.substring(0, addressLocation.indexOf(",")),
    //       });

    //       setDestination({
    //         latitude: locationGeometry.lat,
    //         longitude: locationGeometry.lng,
    //         title: addressLocation.substring(0, addressLocation.indexOf(",")),
    //       });
    //       // if (region == null) {
    //       //   setRegion(location);
    //       // }
    //     })
    //     .catch((error) => console.warn(error));
  }
}
