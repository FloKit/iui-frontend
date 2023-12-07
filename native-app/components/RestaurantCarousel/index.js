import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native"
import Carousel from 'react-native-snap-carousel'
import {DATA} from '../ResultList';

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.92)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <View style={styles.headlineWrapper}>
            <Text style={styles.header}>{item.name}</Text>
            <Text style={styles.stars}>{item.stars}</Text>
      </View>
      
        <View style={styles.footerWrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.body}>{item.distance}</Text>
            <Text style={styles.body}>{item.type}</Text>
          </View>
          <TouchableOpacity style={styles.touchableOpacity}>
                <Text style={styles.navigationText}>Navigate Me</Text>
              </TouchableOpacity>
        </View>
        
      <Image
        source={{ uri: item.imageSrc }}
        style={styles.image}
      />
    </View>
  )
}

const RestaurantCarousel = () => {
  const isCarousel = React.useRef(null)

  return (
    <View>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={DATA}
        containerCustomStyle={styles.carousel}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0}
        useScrollView={true}
      />
    </View>
  )
}

const RADIUS = 8
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: RADIUS,
    width: ITEM_WIDTH,
    height: 300,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 5,
    elevation: 10,
  },
  carousel: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 8,
  },
  headlineWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
  },
  stars: {
    fontSize: 14,
    color: "#3F3D5675",
    fontWeight: "300",
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
  },
  textWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  body: {
    color: "gray",
    fontSize: 18,
    padding: 0,
  },
  footerWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 8,
  },
  touchableOpacity: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#F9A826",
    borderRadius: RADIUS,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },
  image: {
    width: ITEM_WIDTH,
    height: 180,
    borderBottomLeftRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
  },
})


export default RestaurantCarousel;