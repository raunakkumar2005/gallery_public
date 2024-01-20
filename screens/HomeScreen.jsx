// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const [imageData, setImageData] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    let isMounted = true; // Variable to track component mount status

    const fetchRecentImages = async () => {
      try {
        const cachedImageData = await AsyncStorage.getItem('cachedImageData');

        if (cachedImageData) {
          const parsedImageData = JSON.parse(cachedImageData);
          if (isMounted) {
            setImageData(parsedImageData);
          }
        }

        const response = await axios.get(
          'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s'
        );

        const newImageData = response.data.photos.photo;

        if (isMounted && JSON.stringify(newImageData) !== JSON.stringify(imageData)) {
          setImageData(newImageData);
          await AsyncStorage.setItem('cachedImageData', JSON.stringify(newImageData));
        }
      } catch (error) {
        console.error('Error fetching recent images:', error);
      }
    };

    fetchRecentImages();

    // Cleanup function to handle component unmount
    return () => {
      isMounted = false;
    };
  }, []);



  const renderImage = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('FullScreenImage', { screen: 'FullScreenImageStack', params: { image: item } })}
      style={styles.imageContainer}
    >
      <Image source={{ uri: item.url_s }} style={styles.image} resizeMode="cover" />
      {/* <View style={styles.overlay}>
        <Text style={styles.overlayText}>View</Text>
      </View> */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={imageData}
        renderItem={renderImage}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20, // Adjust as needed
  },
  flatListContainer: {
    padding: 8,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    overflow: 'hidden',
    borderRadius: 12,
    margin: 8,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 12,
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
