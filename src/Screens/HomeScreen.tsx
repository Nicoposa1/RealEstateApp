import React from "react";
import { StyleSheet, SafeAreaView, Image, Text } from "react-native";
import SearchBar from "../Components/SearchBar";
import PropertyList from "../Components/PropertyList";
import { MockData } from "../utils/MockData";

export const HomeScreen = () => {
  const [properties] = React.useState(MockData);
  const [filteredProperties, setFilteredProperties] = React.useState(properties);
  const [query, setQuery] = React.useState("");

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    if (searchTerm) {
      const filtered = properties.filter((property) =>
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.zipCode === searchTerm
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(properties); 
    }
  };

  React.useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/images/ez-logo.jpeg")}
        style={{ width: 50, height: 50, alignSelf: 'center' }}
      />
      <SearchBar onSearch={handleSearch} query={query}  />
      {query && filteredProperties.length === 0 ? ( 
        <Text style={styles.noResultsText}>No results found</Text>
      ) : (
        <PropertyList properties={filteredProperties} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  noResultsText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
