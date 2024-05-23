import {
  ActionItemSheetProps,
  ActionSheet,
  Button,
  Divider,
  HeaderDrawer,
  Icon,
} from "@components";
import { useLoading } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { deleteComicService, getComicsService } from "@services";
import { IComic } from "@types";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import comicListStyles from "./styles";

const ComicListScreen: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "comicListScreen" });
  const styles = comicListStyles();
  const navigation = useNavigation();
  const { showLoading, hideLoading } = useLoading();

  const [data, setData] = useState<Array<IComic>>([]);
  const sheetRef = useRef<any>(null);
  const [currentComic, setCurrentComic] = useState<IComic>();

  const dataSheet: Array<ActionItemSheetProps> = [
    {
      title: t("edit"),
      icon: {
        name: "edit",
        type: "ant-design",
      },
      onPress: () => {
        sheetRef.current?.close();
        currentComic &&
          navigation.navigate("EditComnic", {
            item: currentComic,
          });
      },
    },
    {
      title: t("delete"),
      icon: {
        name: "delete",
        type: "ant-design",
      },
      onPress: () => {
        sheetRef.current?.close();
        showLoading();
        currentComic &&
          deleteComicService(
            currentComic?.id,
            () => {
              hideLoading();
            },
            () => {
              hideLoading();
            }
          );
      },
    },
  ];

  useEffect(() => {
    const unsubscribe = getComicsService({}, (data) => {
      setData(data);
    });
    return () => unsubscribe();
  }, []);

  const onCreateComic = () => {
    navigation.navigate("CreateComic");
  };

  const onPressItem = (item: IComic) => {
    sheetRef.current?.open();
    setCurrentComic(item);
  };

  return (
    <>
      <HeaderDrawer title={t("title")} />
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Button
          onPress={onCreateComic}
          title={t("createComic")}
          uppercase
          style={styles.btnCreate}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => {
            return (
              <Pressable onPress={() => {}} style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.viewInfor}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    onPressItem(item);
                  }}
                >
                  <Icon name={"more-vertical"} type={"feather"} />
                </TouchableOpacity>
              </Pressable>
            );
          }}
          ItemSeparatorComponent={() => <Divider />}
        />

        <ActionSheet ref={sheetRef} data={dataSheet} />
      </View>
    </>
  );
};

export default ComicListScreen;
