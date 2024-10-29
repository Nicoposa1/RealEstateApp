import { Keyboard, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import PropertyList from '../Components/PropertyList'
import { useSelector } from 'react-redux'
import { Property } from '../Interfaces/Property'
import SearchBar from '../Components/SearchBar'

interface RootState {
  properties: {
    favorites: Property[];
  };
}

export const FavoriteScreen = () => {
  const favorite = useSelector((state: RootState) => state.properties.favorites);
  const [filteredProperties, setFilteredProperties] = React.useState(favorite);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    setFilteredProperties(favorite);
  }, [favorite]);

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);
    if (searchTerm) {
      const filtered = favorite.filter((property) =>
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.zipCode === searchTerm
      );
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(favorite);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={styles.container}>
        <SearchBar onSearch={handleSearch} query={query} />
        <PropertyList
          properties={filteredProperties}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
})