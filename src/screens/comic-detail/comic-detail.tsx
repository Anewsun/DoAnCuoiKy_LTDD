import { Button, Divider, Header, Icon } from "@components";
import { useLoading, useTheme } from "@hooks";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppSelector } from "@redux";
import {
  createFavouriteService,
  deleteFavoriteService,
  getComicService,
  getReviewsService,
} from "@services";
import { IComic, IReview } from "@types";
import { message } from "@utils";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import FastImage from "react-native-fast-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Share from "react-native-share";
import comicDetailStyles from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation";

type ComicDetailScreenRouteProps = NativeStackScreenProps<
  RootStackParamList,
  "ComicDetail"
>["route"];

const ComicDetailScreen: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "comicDetailScreen" });
  const styles = comicDetailStyles();
  const route = useRoute<ComicDetailScreenRouteProps>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const bottomInsets = insets.bottom;
  const { showLoading, hideLoading } = useLoading();
  const theme = useTheme();
  const item = route.params.item;

  const [data, setData] = useState<IComic>(item);
  const [currentReview, setCurrentReview] = useState<Array<IReview>>([]);
  const [isCallCheckReview, setIsCallCheckReview] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const favorite = useAppSelector((state) => state.favorite);
  const isFavorite = favorite.some((e) => e.comicId == item.id);

  useEffect(() => {
    getComicService(item.id, (data) => {
      setData(data);
    });
  }, []);

  useEffect(() => {
    // check
    user &&
      getReviewsService(
        {
          comicId: item.id,
          uid: user.id,
        },
        (data) => {
          setIsCallCheckReview(true);
          setCurrentReview(data);
        },
        () => {}
      );
  }, []);

  const onReview = () => {
    if (currentReview?.length == 0) {
      navigation.navigate("CreateReview", {
        comicId: item.id,
      });
    } else {
      navigation.navigate("EditReview", {
        item: currentReview[0],
      });
    }
  };

  const onSeeAllView = () => {
    navigation.navigate("ComicReviews", {
      id: item.id,
    });
  };

  const onShare = async () => {
    const url = "https://metruyencv.com/";
    const title = "Me Truyen Chu";
    const message = "Truyện sẽ được cập nhật sớm trên app, bạn chuyển qua web để đọc đầy đủ nhé";

    const options = {
      title,
      url,
      message,
    };
    try {
      await Share.open(options);
    } catch (err) {
      console.log(err);
    }
  };

  const onFavorite = () => {
    if (isFavorite) {
      message.success(t("addedFavorite"));
    } else {
      showLoading();
      user &&
        createFavouriteService(
          user?.id,
          item.id,
          () => {
            hideLoading();
            message.success(t("addedFavorite"));
          },
          (error) => {
            hideLoading();
            message.error(i18next.t(error.code));
          }
        );
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Header isBack={false} title={data.title} />
        <Text style={styles.content}>{data.content}</Text>
      </View>
      <View
        style={[
          styles.buttonWrapper,
          { paddingBottom: bottomInsets > 0 ? bottomInsets : 16 },
        ]}
      >
        <Button
          onPress={onSeeAllView}
          style={styles.btnReview}
          title={t("seeReviews")}
          uppercase
        />
        <Button
          onPress={onReview}
          style={styles.btnReview}
          title={t("writeAReview")}
          uppercase
        />
        <Button
          onPress={onShare}
          style={styles.btnShare}
          title={t("share")}
          uppercase
        />
        <Button
          disabled={!isCallCheckReview}
          style={styles.btnFavortie}
          onPress={onFavorite}
          title={t("favorite")}
          uppercase
        />
      </View>
    </>
  );
};

export default ComicDetailScreen;
