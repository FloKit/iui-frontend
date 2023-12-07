import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import RestaurantCarousel from "../RestaurantCarousel";

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken("pk.eyJ1IjoiaHVpLW1pbiIsImEiOiJjbHBxdmFiaXQwMTEwMmptemVhYjZrY3RtIn0.f9PnmxLA4K7AchNOWJXYdw");

const MapNavigation=()=> {
    const [coordinates] = useState([48.262524874129895, 12.005044929190767])

    return(
        <View style={styles.page}>
            <View style={styles.container}>
                <MapboxGL.MapView style={styles.map}>
                    <MapboxGL.Camera zoomLevel={2} centerCoordinate={coordinates} style={"mapbox://styles/mapbox/satellite-streets-v12"}/>
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