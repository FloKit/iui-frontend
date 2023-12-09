import React, { Children, useState } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL, { Logger } from "@rnmapbox/maps";
import RestaurantCarousel from "../../components/RestaurantCarousel";
import {DATA} from '../../components/ResultList';
import Icon from 'react-native-vector-icons/Ionicons';
import { request, PERMISSIONS } from 'react-native-permissions';

Logger.setLogCallback(log => {
  const {message} = log;

  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});

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

                    {
                      DATA.map((marker, index) => (
                        <MapboxGL.MarkerView
                          coordinate={coordinates}>
                            <View style={styles.destinationIcon}>
                              <Icon name="location-sharp" size={38} color="#FF9F17" />
                            </View>
                          </MapboxGL.MarkerView>
                      ))
                    }

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
      backgroundColor: "white"
    },
    map: {
      flex: 1
    }
  });
  
export default MapNavigation;