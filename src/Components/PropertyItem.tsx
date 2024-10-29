import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Property } from "../Interfaces/Property";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite, setSelectedProperty } from "../store/propertiesSlice";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "../Constants/Colors";
import { RootStackParamList } from "../Navigation/RootStackParamList";

interface PropertyItemProps {
  item: Property;
}

const PropertyItem = ({ item }: PropertyItemProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const favorite = useSelector((state: { properties: { favorites: Property[] } }) => state.properties.favorites)
  const dispatch = useDispatch();

  const isFavorite = favorite.some((property: Property) => property.id === item.id);

  const handlePress = () => {
    navigation.navigate("PropertyDetail", { property: item });
    dispatch(setSelectedProperty(item));
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(item)); 
    } else {
      dispatch(addFavorite(item)); 
    }
  };

  return (
    <TouchableOpacity style={styles.propertyItem} onPress={handlePress}>
      <Image
        source={{
          uri: item.imageUrl[0] || "https://media.licdn.com/dms/image/v2/D4D10AQGWiKbH7EFp9Q/image-shrink_800/image-shrink_800/0/1729040623927?e=1730581200&v=beta&t=sm-nks6Q_u80bIUDLXLV4UkEq7fAfNaxDei3JZOjfaE",
        }}
        style={styles.propertyImage}
        onError={(e) => console.error("Error loading image: ", e.nativeEvent.error)}
      />
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={toggleFavorite}
      >
        <FontAwesome
          name={isFavorite ? "heart" : "heart-o"}
          size={24}
          color={isFavorite ? Colors.secondary : "white"}
        />
      </TouchableOpacity>
      <View style={styles.propertyInfo}>
        <View>
          <Text style={styles.addressText}>{item.address}</Text>
          <View style={styles.featuresContainer}>
            <PropertyFeature icon="bed" value={item.beds} />
            <PropertyFeature icon="bath" value={item.baths} />
            <PropertyFeature icon="square-o" value={item.sqft} />
            <PropertyFeature icon="building-o" value={item.yearBuilt} />
          </View>
        </View>
        <Text style={styles.priceText}>Price: {item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const PropertyFeature = ({ icon, value }: { icon: keyof typeof FontAwesome.glyphMap; value: number }) => (
  <View style={styles.feature}>
    <FontAwesome name={icon} size={16} color={Colors.secondary} />
    <Text style={styles.propertyText}> {value}</Text>
  </View>
);

const styles = StyleSheet.create({
  propertyItem: {
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    marginHorizontal: 10,
    borderWidth: 0.2,
    borderColor: Colors.gray,
  },
  propertyImage: {
    height: 120,
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    width: "100%",
  },
  propertyInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  addressText: {
    fontWeight: "600",
    width: 200,
    marginBottom: 10,
    color: Colors.grayDark,
  },
  priceText: {
    fontWeight: "600",
    color: Colors.grayDark,
  },
  featuresContainer: {
    flexDirection: "row",
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  propertyText: {
    fontSize: 16,
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});

export default PropertyItem;
