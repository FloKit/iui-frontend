import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import Carousel from 'react-native-snap-carousel'

const data = [
  {
    title: "Osteria Italiana",
    body: "delicious",
    imgUrl: "https://lh5.googleusercontent.com/p/AF1QipNMIhkQYYDsq4f4Eswy-8NvjcXb8ufoMfjyGUvp=w408-h532-k-no",
  },
  {
    title: "Torros Döner",
    body: "delicious",
    imgUrl: "https://lh5.googleusercontent.com/p/AF1QipNycs8Os5G2FeQBK8e1afIfSxkOuvS8LclhgwzG=w408-h544-k-no",
  },
  {
    title: "Man Fat",
    body: "delicious",
    imgUrl: "https://lh5.googleusercontent.com/p/AF1QipOHZKoJB3OlBjb8E52VKYK5woHhXtQNmU-fDMv4=w408-h320-k-no",
  },
];

const SLIDER_WIDTH = Dimensions.get('window').width
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.92)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text>
      <Image
        source={{ uri: item.imgUrl }}
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
        data={data}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
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
  image: {
    width: ITEM_WIDTH,
    height: 180,
    //borderRadius:12,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 18,
    padding: 20,
  }
})


export default RestaurantCarousel;