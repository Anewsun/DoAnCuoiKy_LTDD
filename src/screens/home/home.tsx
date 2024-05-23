import {
  ActivityIndicator,
  BottomSheet,
  Divider,
  FabButton,
  HeaderDrawer,
  Icon,
  ItemComic,
} from "@components";
import { IMAGES, SORT } from "@constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useAppSelector } from "@redux";
import { getComicsService } from "@services";
import { IComic } from "@types";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import homeStyles from "./styles";

const GAP = 12;

const HomeScreen: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "homeScreen" });
  const navigation = useNavigation();
  const styles = homeStyles();
  const [data, setData] = useState<Array<IComic>>([]);
  const theme = useTheme();
  const user = useAppSelector((state) => state.auth.user);

  const filterRef = useRef<any>(null);
  const [isCallApi, setIsCallApi] = useState(false);

  const [filter, setFilter] = useState({
    title: "",
    sort: SORT.DESC,
  });

  const dataFilter = [
    {
      key: SORT.DESC,
      value: t("sortDesc"),
    },
    {
      key: SORT.ASC,
      value: t("sortAsc"),
    },
  ];

  useEffect(() => {
    const unsubscribe = getComicsService(
      {
        title: filter.title,
        sort: filter.sort,
      },
      (data) => {
        setData(data);
        console.log(data.length);
        setIsCallApi(true);
      }
    );
    return () => unsubscribe();
  }, [filter]);

  const onPressItem = (item: IComic) => {
    navigation.navigate("ComicDetail", {
      item: item,
    });
  };

  const onPressItemFilter = (key: SORT) => {
    setFilter({ ...filter, sort: key });
    filterRef.current?.close();
  };

  const getLabel = () => {
    const find = dataFilter.find((e) => e.key == filter.sort);
    return find?.value;
  };

  const onFab = () => {
    navigation.navigate("Search");
  };

  return (
    <>
      <HeaderDrawer
        title={t("title")}
        rightComponent={
          <>
            <TouchableOpacity
              onPress={() => {
                filterRef.current?.open();
              }}
            >
              <Icon name={"filter"} type={"ant-design"} />
            </TouchableOpacity>
          </>
        }
      />
      <Image source={IMAGES.BANNER} style={styles.banner} />
      <View style={[styles.container, { marginHorizontal: GAP }]}>
        <Text style={styles.label}>{getLabel()}</Text>
        <FlatList
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => {
            return (
              <ItemComic
                disabled={user?.isAdmin}
                item={item}
                onPress={() => {
                  onPressItem(item);
                }}
                gap={GAP}
              />
            );
          }}
          columnWrapperStyle={{ gap: GAP }}
          contentContainerStyle={{ gap: GAP }}
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
        <BottomSheet
          adjustToContentHeight
          ref={filterRef}
          HeaderComponent={
            <>
              <FlatList
                contentContainerStyle={styles.filterList}
                data={dataFilter}
                renderItem={({ item }) => {
                  const checked = item.key == filter.sort;

                  return (
                    <>
                      <TouchableOpacity
                        style={styles.itemFilter}
                        onPress={() => {
                          onPressItemFilter(item.key);
                        }}
                      >
                        <Text style={styles.titleItemFilter}>{item.value}</Text>
                        <Icon
                          name={"check"}
                          type={"ant-design"}
                          color={
                            checked ? theme.colors["primary"] : "transparent"
                          }
                        />
                      </TouchableOpacity>
                    </>
                  );
                }}
                ItemSeparatorComponent={() => <Divider />}
              />
            </>
          }
        />
        <FabButton onPress={onFab} style={styles.fabButton} />
      </View>
    </>
  );
};

export default HomeScreen;
