import { BottomSheet, Button, Header, Input } from "@components";
import { IMAGES } from "@constants";
import { useLoading } from "@hooks";
import { useNavigation } from "@react-navigation/native";
import { resetPasswordService } from "@services";
import { message } from "@utils";
import { useFormik } from "formik";
import i18next from "i18next";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Image, Keyboard, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import resetPasswordStyles from "./styles";

const ResetPasswordScreen: React.FC = () => {
  const styles = resetPasswordStyles();
  const { t } = useTranslation([], { keyPrefix: "resetPasswordScreen" });
  const { showLoading, hideLoading } = useLoading();
  const navigation = useNavigation();

  const bottomSheetRef = useRef<any>(null);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t("invalidEmail")).required(t("enterEmail")),
  });

  const initialValues = {
    email: "",
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
      showLoading();
      Keyboard.dismiss();
      resetPasswordService(
        values.email,
        () => {
          hideLoading();
          bottomSheetRef?.current?.open();
        },
        (error) => {
          hideLoading();
          message.error(i18next.t(error.code));
        }
      );
    },
  });

  const onLogin = () => {
    bottomSheetRef?.current?.close();
    navigation.navigate("Login");
  };

  return (
    <>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Header title={t("title")} isBackType={"close"} />
          <Text style={styles.title}>{t("pleaseEnterEmail")}</Text>
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
          />
          <Button
            block
            title={t("submit")}
            onPress={handleSubmit}
            style={styles.submitButton}
          />
        </View>
      </KeyboardAwareScrollView>
      <BottomSheet ref={bottomSheetRef} adjustToContentHeight>
        <View style={styles.sheetContent}>
          <Image style={styles.imgEmail} source={IMAGES.CHECK_EMAIL} />
          <Text style={styles.pleaseCheck}>{t("pleaseCheck")}</Text>
          <Text style={styles.checkEmail}>{t("checkEmail")}</Text>
          <Button title={t("returnToLogin")} onPress={onLogin} />
        </View>
      </BottomSheet>
    </>
  );
};

export default ResetPasswordScreen;
