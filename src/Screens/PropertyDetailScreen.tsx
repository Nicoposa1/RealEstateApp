import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Linking,
} from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Property } from '../Interfaces/Property';
import { PropertyInfo } from '../Components/PropertyInfo';
import { ModalCarousel } from '../Components/ModalCarousel';
import { RootStackParamList } from '../Navigation/RootStackParamList';
import MapView, { Marker } from 'react-native-maps';
import { MockData } from '../utils/MockData';

const { width } = Dimensions.get('window');

export const PropertyDetailScreen: React.FC = () => {
  const selectedProperty = useSelector((state: { properties: { selectedProperty: Property } }) => state.properties.selectedProperty);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const flatListRef = useRef<FlatList<string>>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const onBookNow = () => {
    const phoneNumber = `tel:${selectedProperty.agent.phone}`;
    Linking.openURL(phoneNumber).catch((err) =>
      console.error("Failed to open phone dialer", err)
    );
  };

  const onViewMap = () => {
    navigation.navigate('Map', { property: selectedProperty });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../assets/images/ez-logo.jpeg")}
          style={styles.logo}
        />
      </View>

      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={openModal} style={styles.openModalButton}>
          <Ionicons name="expand" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.carouselContainer}>
          <FlatList
            data={selectedProperty.imageUrl}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            style={{ width }}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={styles.image}
              />
            )}
            onScroll={onScroll}
            ref={flatListRef}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          />
          <View style={styles.pagination}>
            {selectedProperty.imageUrl.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { opacity: index === currentIndex ? 1 : 0.3 },
                ]}
              />
            ))}
          </View>
        </View>
        <PropertyInfo property={selectedProperty} onBookNow={onBookNow} onViewMap={onViewMap} />
      </View>
      <ModalCarousel isModalVisible={isModalVisible} closeModal={closeModal} selectedProperty={selectedProperty} currentIndex={currentIndex} onScroll={onScroll} flatListRef={flatListRef} width={width} />
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  contentContainer: {
    marginHorizontal: 10,
    flex: 1,
  },
  logo: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  backButton: {
    padding: 10,
    width: 50,
    position: 'absolute',
    zIndex: 100,
    top: 0,
  },
  openModalButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 999,
  },
  carouselContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: 200,
    marginVertical: 10,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    margin: 5,
  },
  map: {
    width: '100%',
    height: 200,
  },
});

