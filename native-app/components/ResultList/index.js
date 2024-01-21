import React from "react";
import { StyleSheet, ScrollView } from "react-native";

import RestaurantTile from "../RestaurantTile";

const DATA = [
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
  },
];

export default function ResultList({ restaurantList }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {restaurantList.map((restaurant) => (
        <RestaurantTile
          key={restaurant.id}
          id={restaurant.id}
          name={restaurant.name}
          stars={restaurant.rating}
          distance={restaurant.distance}
          imageSrc={restaurant.image_url}
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
