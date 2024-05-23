import { Button, Input } from "@components";
import { useLoading } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { authSlice, useAppDispatch } from "@redux";
import { loginService } from "@services";
import { message } from "@utils";
import { useFormik } from "formik";
import i18next from "i18next";
import React from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import loginStyles from "./styles";

const LoginScreen: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "loginScreen" });
  const styles = loginStyles();
  const { showLoading, hideLoading } = useLoading();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t("invalidEmail")).required(t("enterEmail")),
    password: Yup.string()
      .min(8, t("invalidMinPassword"))
      .required(t("enterPassword")),
  });

  const initialValues = {
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
      loginService(
        values.email,
        values.password,
        (data) => {
          hideLoading();
          dispatch(authSlice.actions.setUser(data));
          navigation.reset({
            index: 0,
            routes: [{ name: "TabStack" }],
          });
        },
        (error) => {
          message.error(i18next.t(error.code));
          hideLoading();
        }
      );
    },
  });

  const onForgotPassword = () => {
    navigation.navigate("ResetPassword");
  };

  const onSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={"handled"}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.appName}>HTReader App●</Text>
        <Text style={styles.title}>{t("pleaseLogin")}</Text>
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
        <TouchableOpacity
          onPress={onForgotPassword}
          style={styles.buttonForgot}
        >
          <Text style={styles.forgotPassword}>{t("forgotPassword")}</Text>
        </TouchableOpacity>
        <Button
          block
          title={t("login")}
          onPress={handleSubmit}
          style={styles.loginButton}
        />
        <View style={styles.viewSignUp}>
          <Text style={styles.noAccount}>{t("noAccount")}</Text>
          <TouchableOpacity onPress={onSignUp}>
            <Text style={styles.signUp}> {t("signUp")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
