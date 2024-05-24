import { Header, Input } from "@components";
import { authSlice, useAppDispatch, useAppSelector } from "@redux";
import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import editProfileStyles from "./styles";
import { useLoading } from "@hooks";
import { editUserService } from "@services";
import { message } from "@utils";
import i18next from "i18next";
import { useDispatch } from "react-redux";

const EditProfileScreen: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "editProfileScreen" });
  const styles = editProfileStyles();
  const { showLoading, hideLoading } = useLoading();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required(t("enterFullname")),
    image: Yup.string().url(t("enterImage")),
  });

  const initialValues = {
    fullname: user?.fullname,
    image: user?.image || "",
  };

  const {
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: (values, actions) => {
      Keyboard.dismiss();
      showLoading();
      user &&
        editUserService(
          user?.id,
          {
            fullname: values.fullname,
            image: values.image,
          },
          () => {
            hideLoading();
            dispatch(
              authSlice.actions.updateUser({ fullname: values.fullname, image: values.image })
            );
            message.success(t("updatedSuccess"));
          },
          (error) => {
            hideLoading();
            message.error(i18next.t(error.code));
          }
        );
    },
  });

  return (
    <View style={styles.container}>
      <Header
        title={t("title")}
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              handleSubmit();
              showLoading();
            }}
          >
            <Text style={styles.submitText}>{t("submit")}</Text>
          </TouchableOpacity>
        }
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Input
          label={t("labelFullname")}
          placeholder={t("hintFullname")}
          value={values.fullname}
          onChangeText={(text) => {
            setFieldValue("fullname", text);
            setFieldTouched("fullname", true, false);
          }}
          onBlur={handleBlur("fullname")}
          autoCapitalize={"words"}
          error={
            touched.fullname && errors.fullname ? errors.fullname : undefined
          }
          style={styles.inputSpacing}
        />
        <Input
        label={t("labelImage")}
        placeholder={t("enterImage")}
        value={values.image}
        onChangeText={(text) => {
          setFieldValue("image", text);
          setFieldTouched("image", true, false);
        }}
        onBlur={handleBlur("image")}
        error={touched.image && errors.image ? errors.image : undefined}
        style={styles.inputSpacing}
        />
        <Input
          editable={false}
          label={t("labelEmail")}
          value={user?.email}
          style={styles.inputSpacing}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EditProfileScreen;
