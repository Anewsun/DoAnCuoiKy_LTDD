import { Button, Input } from "@components";
import { useLoading } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { createUserService } from "@services";
import { message } from "@utils";
import { useFormik } from "formik";
import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import signUpStyles from "./styles";

const SignUpScreen: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "signUpScreen" });
  const styles = signUpStyles();
  const { showLoading, hideLoading } = useLoading();
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().trim().required(t("enterFullname")),
    email: Yup.string().email(t("invalidEmail")).required(t("enterEmail")),
    password: Yup.string()
      .min(8, t("invalidMinPassword"))
      .required(t("enterPassword")),
  });

  const initialValues = {
    fullname: "",
    email: "",
    password: "",
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
      createUserService(
        values.email,
        values.password,
        values.fullname,
        () => {
          hideLoading();
          message.success(t("signUpSuccess"));
          navigation.navigate("Login");
        },
        (error) => {
          hideLoading();
          message.error(i18next.t(error.code));
        }
      );
    },
  });

  const onLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={"handled"}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.appName}>comic app ●</Text>
        <Text style={styles.title}>{t("pleaseSignUp")}</Text>
        <Input
          placeholder={t("fullname")}
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
          placeholder={t("email")}
          value={values.email}
          onChangeText={(text) => {
            setFieldValue("email", text);
            setFieldTouched("email", true, false);
          }}
          onBlur={handleBlur("email")}
          autoCapitalize={"none"}
          keyboardType={"email-address"}
          error={touched.email && errors.email ? errors.email : undefined}
          style={styles.inputSpacing}
        />
        <Input
          type={"password"}
          placeholder={t("password")}
          value={values.password}
          onChangeText={(text) => {
            setFieldValue("password", text);
            setFieldTouched("password", true, false);
          }}
          onBlur={handleBlur("password")}
          autoCapitalize={"none"}
          error={
            touched.password && errors.password ? errors.password : undefined
          }
          style={styles.inputSpacing}
        />
        <Button
          block
          title={t("signUp")}
          onPress={handleSubmit}
          style={styles.signInButton}
        />
        <View style={styles.viewSignIn}>
          <Text style={styles.haveAnAccount}>{t("haveAnAccount")}</Text>
          <TouchableOpacity onPress={onLogin}>
            <Text style={styles.login}> {t("login")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;
