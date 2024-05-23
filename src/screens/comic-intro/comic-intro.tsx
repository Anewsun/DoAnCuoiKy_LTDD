import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Header } from "@components";
import { useNavigation, useRoute } from '@react-navigation/native';

const ComicIntroductionScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;

  const onReadNow = () => {
    //navigation.navigate('ComicReader', { content: item.content });
    navigation.navigate('ComicDetail', { item: item });
  };

  return (
    <View style={styles.container}>
      <Header title={item.title} isBack />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity style={styles.button} onPress={onReadNow}>
          <Text style={styles.buttonText}>Đọc ngay</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  contentContainer: {
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 300,
    marginBottom: 20
  },
  description: {
    fontSize: 20,
    textAlign: 'justify',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
});

export default ComicIntroductionScreen;