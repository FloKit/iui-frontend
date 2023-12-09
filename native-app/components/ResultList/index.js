import React from "react";
import { StyleSheet, ScrollView } from "react-native";

import RestaurantTile from "../RestaurantTile";

export const DATA = [
  {
    name: "Osteria Italiana",
    stars: "4.2 (536)",
    type: "Italian Restaurant",
    review:
      "There is disagreement in the reviews of this restaurant in Munich. Some praise the authentic food, charming service and ambience, while others think it is too expensive and the experience was marred by inconveniences, such as a lack of food and a less than hospitable welcome. Despite mixed reviews, the quality of the food and the friendliness of the staff are often highlighted.",
    distance: "200m",
    id: "123",
    imageSrc:
      "https://lh5.googleusercontent.com/p/AF1QipNMIhkQYYDsq4f4Eswy-8NvjcXb8ufoMfjyGUvp=w408-h532-k-no",
    longitude: 11.572167382343027,
    latitude: 48.15146265546954,
  },
  {
    name: "Torros Döner",
    stars: "3.6 (32)",
    type: "Turkish Restaurant",
    review:
      "There is disagreement in the reviews of this restaurant in Munich. Some praise the authentic food, charming service and ambience, while others think it is too expensive and the experience was marred by inconveniences, such as a lack of food and a less than hospitable welcome. Despite mixed reviews, the quality of the food and the friendliness of the staff are often highlighted.",
    distance: "350m",
    id: "12343",
    imageSrc:
      "https://lh5.googleusercontent.com/p/AF1QipNycs8Os5G2FeQBK8e1afIfSxkOuvS8LclhgwzG=w408-h544-k-no",
    longitude: 11.574270643046704, 
    latitude: 48.1528437566003,
  },
  {
    name: "Man Fat",
    stars: "4.6 (1,234)",
    type: "Chinese Restaurant",
    review:
      "There is disagreement in the reviews of this restaurant in Munich. Some praise the authentic food, charming service and ambience, while others think it is too expensive and the experience was marred by inconveniences, such as a lack of food and a less than hospitable welcome. Despite mixed reviews, the quality of the food and the friendliness of the staff are often highlighted.",
    distance: "500m",
    id: "12asda43",
    imageSrc:
      "https://lh5.googleusercontent.com/p/AF1QipOHZKoJB3OlBjb8E52VKYK5woHhXtQNmU-fDMv4=w408-h320-k-no",
    longitude: 11.573826836721876,
    latitude: 48.152169339722334,
  },
  {
    name: "Il Grappolo",
    stars: "4.0 (405)",
    type: "Italian Restaurant",
    review:
      "There is disagreement in the reviews of this restaurant in Munich. Some praise the authentic food, charming service and ambience, while others think it is too expensive and the experience was marred by inconveniences, such as a lack of food and a less than hospitable welcome. Despite mixed reviews, the quality of the food and the friendliness of the staff are often highlighted.",
    distance: "850m",
    id: "12654343",
    imageSrc:
      "https://lh5.googleusercontent.com/p/AF1QipPENqCwBZ6XAFdltl4skHvvhBNS1P5Zcw6uM-vi=w408-h544-k-no",
    longitude: 11.579649751147267, 
    latitude: 48.1522329537023,
  },
  {
    name: "Türkenhof",
    stars: "4.4 (829)",
    type: "Bavarain Restaurant",
    review:
      "There is disagreement in the reviews of this restaurant in Munich. Some praise the authentic food, charming service and ambience, while others think it is too expensive and the experience was marred by inconveniences, such as a lack of food and a less than hospitable welcome. Despite mixed reviews, the quality of the food and the friendliness of the staff are often highlighted.",
    distance: "1.2km",
    id: "12343324563",
    imageSrc:
      "https://lh5.googleusercontent.com/p/AF1QipNBxZPGtWh4ZWI7nwEA8Mw04X-tcnmYvwYv4jfN=w408-h408-k-no",
    longitude: 11.577106303254476, 
    latitude: 48.151521813288156,
  },
];

export default function ResultList() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {DATA.map((restaurant) => (
        <RestaurantTile
          key={restaurant.id}
          review={restaurant.review}
          name={restaurant.name}
          stars={restaurant.stars}
          distance={restaurant.distance}
          type={restaurant.type}
          imageSrc={restaurant.imageSrc}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 24,
    paddingVertical: 24,
    paddingBottom: 100,
  },
});
