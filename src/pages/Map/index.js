import React, { useState, useEffect, Fragment } from "react";
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

Geocoder.init("");

export default function Map({ navigation }) {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: -8.125835,
    longitude: -50.908913,
    latitudeDelta: 0.0143,
    longitudeDelta: 0.0134,
  });
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);

  const [titleRegion, setTitleRegion] = useState("Estou Aqui!");
  const [adressDelivery, setAdressDelivery] = useState("");
  const [map, setMap] = useState(null);
  const [destination, setDestination] = useState(null);
  const address = navigation.getParam("recipient");
  console.log("Recipiente");
  console.log(address);

  //   console.log(location);

  async function voltar() {
    //   const deliveryId = id;
    //     navigation.navigate("DeliveryDetail", { deliveryId });
    navigation.navigate("Delivery");
  }

  useEffect(() => {
    if (address != null && address != undefined) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          const response = await Geocoder.from({ latitude, longitude });
          const address = response.results[0].formatted_address;
          setTitleRegion(address.substring(0, address.indexOf(",")));

          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          });
        }, // success
        () => {}, // error
        {
          timeout: 2000,
          enableHighAccuracy: true,
          maximumAge: 1000,
        }
      );

      Geocoder.from(
        address.rua +
          ", " +
          address.numero +
          ", " +
          address.cidade +
          ", " +
          address.estado
      )
        .then((json) => {
          // console.log(json.results[0]);
          var locationGeometry = json.results[0].geometry.location;
          const addressLocation = json.results[0].formatted_address;
          console.log(json.results[0].formatted_address);
          console.log(
            addressLocation.substring(0, addressLocation.indexOf(","))
          );
          setLocation({
            latitude: locationGeometry.lat,
            longitude: locationGeometry.lng,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
            address: addressLocation.substring(0, addressLocation.indexOf(",")),
          });

          setDestination({
            latitude: locationGeometry.lat,
            longitude: locationGeometry.lng,
            title: addressLocation.substring(0, addressLocation.indexOf(",")),
          });
          // if (region == null) {
          //   setRegion(location);
          // }
        })
        .catch((error) => console.warn(error));
    }
  }, []);

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
              origin={region}
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
              <LocationBox>
                <LocationTimeBox>
                  <LocationTimeText>{duration}</LocationTimeText>
                  <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                </LocationTimeBox>
                <LocationText>{titleRegion}</LocationText>
              </LocationBox>
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
}
