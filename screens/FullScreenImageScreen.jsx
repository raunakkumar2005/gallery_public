import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const FullScreenImageScreen = ({ route }) => {
    // console.log(route)
    // Check if route or params is undefined
    if (!route || !route.params) {
        // Handle the case where the params are not available
        return <View><Text>No image data available</Text></View>;
    }

    // Extract image data from route.params
    const { image } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: image.url_s }} style={styles.image} resizeMode="contain" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    image: {
        width: '100%',
        height: '100%',
    },
});


export default FullScreenImageScreen;
