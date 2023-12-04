import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL from "@rnmapbox/maps";

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken("pk.eyJ1IjoiaHVpLW1pbiIsImEiOiJjbHBxdmFiaXQwMTEwMmptemVhYjZrY3RtIn0.f9PnmxLA4K7AchNOWJXYdw");

const MapNavigation=()=> {
    const [coordinates] = useState([48.262524874129895, 12.005044929190767])

    return(
        <View style={styles.page}>
            <View style={styles.container}>
                <MapboxGL.MapView style={styles.map}>
                    <MapboxGL.Camera zoomLevel={4} centerCoordinate={coordinates} />
                </MapboxGL.MapView>
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