import {
  ActionItemSheetProps,
  ActionSheet,
  Divider,
  Header,
  Icon,
  Rating,
} from "@components";
import { useLoading } from "@hooks";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppSelector } from "@redux";
import {
  deleteReviewService,
  getReviewsService,
  getUsersService,
} from "@services";
import { IReview, IUser } from "@types";
import { formatDate } from "@utils";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import comicReviewsStyles from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation";

type ComicReviewsScreenRouteProps = NativeStackScreenProps<
  RootStackParamList,
  "ComicReviews"
>["route"];

const ComicReviewsScreen: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "comicReviewsScreen" });
  const route = useRoute<ComicReviewsScreenRouteProps>();
  const navigation = useNavigation();
  const { showLoading, hideLoading } = useLoading();
  const user = useAppSelector((state) => state.auth.user);

  const comicId = route.params.id;

  const styles = comicReviewsStyles();

  const [reviews, setReviews] = useState<Array<IReview>>([]);
  const [users, setUsers] = useState<Array<IUser>>([]);

  const sheetRef = useRef<any>(null);
  const [currentReview, setCurrentReview] = useState<IReview>();

  const onPressItem = (item: IReview) => {
    sheetRef.current?.open();
    setCurrentReview(item);
  };

  useEffect(() => {
    getReviewsService(
      {
        comicId: comicId,
      },
      (data) => {
        setReviews(data);
      },
      () => {}
    );
  }, []);

  useEffect(() => {
    getUsersService({}, (data) => {
      setUsers(data);
    });
  }, []);

  const dataSheet: Array<ActionItemSheetProps> = [
    {
      title: t("edit"),
      icon: {
        name: "edit",
        type: "ant-design",
      },
      onPress: () => {
        currentReview &&
          navigation.navigate("EditReview", {
            item: currentReview,
          });
        sheetRef.current?.close();
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
        currentReview &&
          deleteReviewService(
            currentReview?.id,
            () => {
              hideLoading();
            },
            (error) => {
              hideLoading();
            }
          );
      },
    },
  ];

  return (
    <View style={styles.container}>
      <Header isBack={false} title={t("title")} />
      <FlatList
        data={reviews}
        renderItem={({ item }) => {
          const findUser = users.find((e) => e.id == item.uid);
          const isYou = user?.id == item.uid;

          return (
            <View style={styles.itemContainer}>
              <View style={styles.viewInfor}>
                <FastImage
                  source={{ uri: findUser?.image }}
                  style={styles.image}
                />
                <Text style={styles.fullname}>{findUser?.fullname}</Text>
                {isYou && (
                  <TouchableOpacity
                    onPress={() => {
                      onPressItem(item);
                    }}
                  >
                    <Icon name={"more-vertical"} type={"feather"} />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.ratingView}>
                <Rating starSize={10} value={item.rating} />
                <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
              </View>

              <Text style={styles.comment}>{item.comment}</Text>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={() => (
          <>
            <Text style={styles.empty}>{t("noReviewsYet")}</Text>
          </>
        )}
      />
      <ActionSheet ref={sheetRef} data={dataSheet} />
    </View>
  );
};

export default ComicReviewsScreen;
