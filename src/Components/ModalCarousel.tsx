import { Dimensions, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

export const ModalCarousel = ({
  isModalVisible,
  closeModal,
  selectedProperty,
  currentIndex,
  onScroll,
  flatListRef,
  width,
}: {
  isModalVisible: boolean
  closeModal: () => void
  selectedProperty: { imageUrl: string[] }
  currentIndex: number
  onScroll: (event: any) => void
  flatListRef: any
  width: any
}) => {
  return (
    <Modal visible={isModalVisible} transparent={true} animationType="fade">
      <View style={styles.modalBackground}>
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>
        <FlatList
          data={selectedProperty.imageUrl}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          style={{ width }}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={styles.fullscreenImage}
            />
          )}
          onScroll={onScroll}
          ref={flatListRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
        <View style={[styles.pagination, { bottom: 100 }]}>
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
    </Modal>
  )
}


const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: Dimensions.get('window').width,
    height: '80%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
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

})