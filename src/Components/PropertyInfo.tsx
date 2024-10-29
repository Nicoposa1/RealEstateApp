import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Property } from "../Interfaces/Property";
import { Colors } from "../Constants/Colors";
import MapView, { Marker } from "react-native-maps";
import { MockData } from "../utils/MockData";

type PropertyInfoProps = {
  property: Property;
  onBookNow: () => void;
  onViewMap: () => void;
};

export const PropertyInfo: React.FC<PropertyInfoProps> = ({ property, onBookNow, onViewMap }) => (
  <ScrollView style={styles.infoContainer} showsVerticalScrollIndicator={false}>
    <Text style={styles.title}>{property.address}</Text>
    <Text style={styles.price}>Price: {property.price}</Text>
    <Text style={styles.description}>{property.description}</Text>
    <View style={styles.detailsContainer}>
      <Text style={styles.detail}>Bedrooms: {property.beds}</Text>
      <Text style={styles.detail}>Bathrooms: {property.baths}</Text>
      <Text style={styles.detail}>Size: {property.sqft} sqft</Text>
      <Text style={styles.detail}>Year Built: {property.yearBuilt}</Text>
      <Text style={styles.detail}>Status: {property.status}</Text>
    </View>
    <View style={styles.mlsContainer}>
      <Text style={styles.mls}>MLS #: {property.mlsNumber}</Text>
      <Text style={styles.neighborhood}>Neighborhood: {property.neighborhood}</Text>
      <Text style={styles.county}>County: {property.county}</Text>
    </View>
    <View style={styles.agentContainer}>
      <Text style={styles.agentTitle}>Listed By:</Text>
      <Text style={styles.agent}>{property.agent.name}</Text>
      <Text style={styles.phone}>Phone: {property.agent.phone}</Text>
    </View>
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: property ? property.location.latitude : MockData[0].location.latitude,
        longitude: property ? property.location.longitude : MockData[0].location.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      }}
    >
      {property && (
        <Marker
          coordinate={{
            latitude: property.location.latitude,
            longitude: property.location.longitude,
          }}
          title={property.address}
          description={property.description}
          image={{ uri: 'https://img.icons8.com/ios-filled/50/000000/marker.png' }}
        />
      )}
    </MapView>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onBookNow}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  infoContainer: {
    padding: 10,
    marginVertical: 15,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 15,
    lineHeight: 22,
  },
  detailsContainer: {
    marginBottom: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.secondary,
  },
  detail: {
    fontSize: 16,
    color: Colors.secondary,
    marginVertical: 2,
  },
  mlsContainer: {
    marginBottom: 15,
  },
  mls: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.secondary,
  },
  neighborhood: {
    fontSize: 16,
    color: Colors.secondary,
    marginVertical: 2,
  },
  county: {
    fontSize: 16,
    color: Colors.secondary,
    marginVertical: 2,
  },
  agentContainer: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: Colors.secondary,
  },
  agentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: 5,
  },
  agent: {
    fontSize: 16,
    color: Colors.secondary,
  },
  phone: {
    fontSize: 16,
    color: Colors.secondary,
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  mapButton: {
    backgroundColor: Colors.secondary,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  map: {
    width: "100%",
    height: 200,
  },
});
