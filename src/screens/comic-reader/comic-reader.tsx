import { Header } from "@components";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import comicReaderStyles from "./styles";

const ComicReaderScreen: React.FC = () => {
  const styles = comicReaderStyles();
  const route = useRoute();

  return (
    <View style={styles.container}>
      <Header isBack />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.content}>
          {route?.params?.content}
        </Text>
      </ScrollView>
    </View>
  );
};

export default ComicReaderScreen;
