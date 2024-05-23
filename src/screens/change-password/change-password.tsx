import { Header, Input } from "@components";
import { useLoading } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@redux";
import { changePasswordService } from "@services";
import { message } from "@utils";
import { useFormik } from "formik";
import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Yup from "yup";
import changePasswordStyles from "./styles";

const ChangePasswordScreen: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "changePasswordScreen" });
  const styles = changePasswordStyles();
  const { showLoading, hideLoading } = useLoading();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const bottomInsets = insets.bottom;

  const user = useAppSelector((state) => state.auth.user);

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(8, t("invalidMinPassword"))
      .required(t("enterPassword")),
    newPassword: Yup.string()
      .min(8, t("invalidMinPassword"))
      .required(t("enterPassword")),
  });

  const initialValues = {
    oldPassword: "",
    newPassword: "",
  };

  const onForgotPassword = () => {
    navigation.navigate("ResetPassword");
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
        changePasswordService(
          user?.email,
          values.oldPassword,
          values.newPassword,
          () => {
            hideLoading();
            message.success(t("changePasswordSuccess"));
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
          type={"password"}
          label={t("labelOldPassword")}
          placeholder={t("hintOldPassword")}
          value={values.oldPassword}
          onChangeText={(text) => {
            setFieldValue("oldPassword", text);
            setFieldTouched("oldPassword", true, false);
          }}
          onBlur={handleBlur("oldPassword")}
          autoCapitalize={"none"}
          error={
            touched.oldPassword && errors.oldPassword
              ? errors.oldPassword
              : undefined
          }
          style={styles.inputSpacing}
        />
        <Input
          type={"password"}
          label={t("labelNewPassword")}
          placeholder={t("hintNewPassword")}
          value={values.newPassword}
          onChangeText={(text) => {
            setFieldValue("newPassword", text);
            setFieldTouched("newPassword", true, false);
          }}
          onBlur={handleBlur("newPassword")}
          autoCapitalize={"none"}
          error={
            touched.newPassword && errors.newPassword
              ? errors.newPassword
              : undefined
          }
        />
      </KeyboardAwareScrollView>
      <TouchableOpacity onPress={onForgotPassword}>
        <Text
          style={[
            styles.forgotPassword,
            { paddingBottom: bottomInsets > 0 ? bottomInsets : 20 },
          ]}
        >
          {t("forgotPassword")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordScreen;
