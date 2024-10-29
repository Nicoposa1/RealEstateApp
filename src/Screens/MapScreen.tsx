import React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { MockData } from '../utils/MockData';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../Navigation/RootStackParamList';
import { setSelectedProperty } from '../store/propertiesSlice';
import { useDispatch } from 'react-redux';
import WebView from 'react-native-webview';

export const MapScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const initialLatitude = MockData[0].location.latitude;
  const initialLongitude = MockData[0].location.longitude;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: initialLatitude,
          longitude: initialLongitude,
          latitudeDelta: 0.9,
          longitudeDelta: 0.9,
        }}
      >
        {MockData.map((property) => (
          <Marker
            key={property.id}
            coordinate={{
              latitude: property.location.latitude,
              longitude: property.location.longitude,
            }}
            title={property.address}
            description={property.description}
            image={{ uri: 'https://img.icons8.com/ios-filled/50/000000/marker.png' }}
          >
            <Callout>
              <View style={styles.calloutContainer}>
                {Platform.OS === 'android' ? (
                  <TouchableOpacity
                    onPress={() => {
                      console.log('Property selected: ', property);
                      navigation.navigate('PropertyDetail', { property });
                      dispatch(setSelectedProperty(property));
                    }}
                  >
                    <Text>
                      <WebView style={{ height: 100, width: 150, }} source={{ uri: property.imageUrl[0] }}
                        rezizeMode='cover'
                      />
                    </Text>
                    <Text style={styles.address}>{property.address}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('PropertyDetail', { property });
                      dispatch(setSelectedProperty(property));
                    }}
                  >
                    <Image
                      source={{ uri: property.imageUrl[0] }}
                      style={styles.image}
                    />
                    <Text style={styles.address}>{property.address}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  calloutContainer: {
    width: 150,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  address: {
    marginTop: 5,
    fontWeight: 'bold',
  },
});
