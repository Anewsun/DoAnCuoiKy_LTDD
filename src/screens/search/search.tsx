import { ActivityIndicator, Divider, Input } from "@components";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import searchStyles from "./styles";
import { IComic } from "@types";
import { SORT } from "@constants";
import { getComicsService } from "@services";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
const SearchScreen: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "searchScreen" });
  const navigation = useNavigation();
  const styles = searchStyles();
  const [data, setData] = useState<Array<IComic>>([]);
  const [isCallApi, setIsCallApi] = useState(false);
  const [filter, setFilter] = useState({
    title: "",
    sort: SORT.DESC,
  });

  useEffect(() => {
    const unsubscribe = getComicsService(
      {
        title: filter.title,
        sort: filter.sort,
      },
      (data) => {
        setData(data);
        setIsCallApi(true);
      }
    );
    return () => unsubscribe();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Input
        autoFocus
        placeholder={t("search")}
        value={filter.title}
        onChangeText={(text) => {
          setFilter({ ...filter, title: text });
          console.log(filter);
        }}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate("ComicDetail", {
                  item: item,
                });
              }}
              style={styles.itemContainer}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.viewInfor}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={() => (
          <View style={styles.viewEmpty}>
            {isCallApi ? (
              <Text style={styles.empty}>{t("noResult")}</Text>
            ) : (
              <ActivityIndicator />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default SearchScreen;
