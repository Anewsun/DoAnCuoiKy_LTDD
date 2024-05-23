import { Button, Divider, HeaderDrawer, ItemComic, Modal } from "@components";
import { useLoading, useTheme } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@redux";
import { deleteFavoriteService, getComicsService } from "@services";
import { IComic } from "@types";
import { message } from "@utils";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, View } from "react-native";
import favoritesStyles from "./styles";

const GAP = 12;

const FavoriteListScreen: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "favoritesScreen" });
  const navigation = useNavigation();
  const theme = useTheme();
  const { showLoading, hideLoading } = useLoading();

  const [favoriteId, setFavoriteId] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const styles = favoritesStyles();

  const favorites = useAppSelector((state) => state.favorite);

  const [data, setData] = useState<Array<IComic>>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const ids = favorites.map((item) => {
        return item.comicId;
      });

      if (ids.length !== 0) {
        showLoading();
        getComicsService(
          {
            ids,
          },
          (data) => {
            hideLoading();
            setData(data);
          }
        );
      }
    });

    return unsubscribe;
  }, [navigation, favorites]);

  const onPressItem = (id: string) => {
    setFavoriteId(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const deleteFavorite = () => {
    deleteFavoriteService(
      favoriteId,
      () => {
        closeModal();
        message.success(t("deletedFavorite"));
      },
      (error) => {
        message.error(i18next.t(error.code));
      }
    );
  };

  return (
    <>
      <HeaderDrawer title={t("title")} />
      <View style={[styles.container, { marginHorizontal: GAP }]}>
        <FlatList
          numColumns={2}
          data={favorites}
          renderItem={({ item }) => {
            const findComic = data.find((e) => e.id == item.comicId);
            return (
              <>
                <ItemComic
                  item={findComic as IComic}
                  onPress={() => {
                    onPressItem(item.id);
                  }}
                  gap={GAP}
                />
              </>
            );
          }}
          columnWrapperStyle={{ gap: GAP }}
          contentContainerStyle={{ gap: GAP }}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={() => (
            <>
              <Text style={styles.empty}>{t("noFavoritesYet")}</Text>
            </>
          )}
        />
      </View>
      <Modal visible={modalVisible}>
        <View style={styles.modalCenter}>
          <View style={styles.modalContent}>
            <Text style={styles.unfavorite}>{t("unfavorite")}</Text>
            <View style={styles.buttonWrapper}>
              <Button
                onPress={deleteFavorite}
                style={styles.button}
                titleStyle={styles.buttonTitle}
                title={t("yes")}
                uppercase
              />
              <Button
                onPress={closeModal}
                style={styles.button}
                titleStyle={styles.buttonTitle}
                title={t("no")}
                uppercase
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default FavoriteListScreen;
