import React from "react";
import MapViewDirections from "react-native-maps-directions";

const Directions = ({ destination, origin, onReady }) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyBKrKi6Xuew4q_KMVsoIDYd7RODZViZT5U"
    strokeWidth={3}
    strokeColor="#222"
  />
);

export default Directions;
