import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import RestaurantCarousel from "../RestaurantCarousel";
import { request, PERMISSIONS } from 'react-native-permissions';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken("pk.eyJ1IjoiaHVpLW1pbiIsImEiOiJjbHBxdmFiaXQwMTEwMmptemVhYjZrY3RtIn0.f9PnmxLA4K7AchNOWJXYdw");

requestLocationPermission = async () => {
  if (Platform.OS === 'ios') {
    var response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    console.log('iPhone: ' + response);

    if (response === 'granted') {
      this.locateCurrentPosition();
    }
  } else {
    var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    console.log('Android: ' + response);

    if (response === 'granted') {
      this.locateCurrentPosition();
    }
  }
}

const MapNavigation=()=> {
    const [coordinates] = useState([11.572167382343027, 48.15146265546954])

    return(
        <View style={styles.page}>
            <View style={styles.container}>
                <MapboxGL.MapView style={styles.map}>
                    <MapboxGL.Camera zoomLevel={15} centerCoordinate={coordinates} style={"mapbox://styles/mapbox/satellite-streets-v12"}/>
                </MapboxGL.MapView>
                <RestaurantCarousel></RestaurantCarousel>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    },
    container: {
      height: "100%",
      width: "100%",
      backgroundColor: "tomato"
    },
    map: {
      flex: 1
    }
  });
  
export default MapNavigation;