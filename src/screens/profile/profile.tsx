import {
  ActionSheet,
  Button,
  HeaderDrawer,
  Icon,
  IconProps,
} from "@components";
import { useNavigation } from "@react-navigation/native";
import { authSlice, useAppDispatch, useAppSelector } from "@redux";
import { signOutService } from "@services";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, View } from "react-native";
import profileStyles from "./styles";

const ProfileScreen: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "profileScreen" });
  const styles = profileStyles();

  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const optionRef = useRef<any>(null);

  const data: Array<{
    title: string;
    icon: IconProps;
    onPress: () => void;
  }> = [
    {
      title: t("bookmarkComic"),
      icon: {
        name: "bookmark-outline",
        type: "ionicon",
      },
      onPress: () => {
        navigation.navigate("FavoriteList");
      },
    },
  ];

  const dataOption: Array<{
    title: string;
    icon: IconProps;
    onPress: () => void;
  }> = [
    {
      title: t("changePassword"),
      icon: {
        name: "key",
        type: "feather",
      },
      onPress: () => {
        navigation.navigate("ChangePassword");
        optionRef.current?.close();
      },
    },
    {
      title: t("edit"),
      icon: {
        name: "edit",
        type: "ant-design",
      },
      onPress: () => {
        navigation.navigate("EditProfile");
        optionRef.current?.close();
      },
    },
  ];

  const onOption = () => {
    optionRef.current?.open();
  };

  const onSignOut = () => {
    signOutService(
      () => {
        dispatch(authSlice.actions.removeUser());
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      },
      () => {}
    );
  };

  return (
    <>
      <HeaderDrawer
        title={t("title")}
        rightComponent={
          <TouchableOpacity onPress={onOption}>
            <Icon name={"more-vertical"} type={"feather"} />
          </TouchableOpacity>
        }
      />
      <View style={styles.container}>
        <View style={styles.cardInfor}>
          <Image
            source={{
              uri: user?.image,
            }}
            style={styles.avatar}
          />

          <Text style={styles.fullname}>{user?.fullname} </Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onSignOut} style={styles.button}>
        <Text style={styles.signOut}>{t("signOut")}</Text>
      </TouchableOpacity>

      <ActionSheet ref={optionRef} data={dataOption} />
    </>
  );
};

export default ProfileScreen;
