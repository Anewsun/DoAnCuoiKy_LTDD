import { Header, Input } from "@components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import createComicStyles from "./styles";

import { useLoading } from "@hooks";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IInputCreateComicService, createComicService } from "@services";
import { message } from "@utils";

const CreateComicScreen: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "createComicScreen" });
  const styles = createComicStyles();
  const { showLoading, hideLoading } = useLoading();

  const validationSchema = Yup.object().shape({
    title: Yup.string().trim().required(t("enterTitle")),
    image: Yup.string().required(t("enterImage")),
    content: Yup.string().required(t("enterContent")),
    description: Yup.string().required(t("enterDescription")),
  });

  const initialValues = {
    title: "",
    image: "",
    content: "",
    description: "",
  };

  const {
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    resetForm,
  } = useFormik({
    validationSchema: validationSchema,
    initialValues: initialValues,
    onSubmit: (values, actions) => {
      Keyboard.dismiss();
      showLoading();
      const input: IInputCreateComicService = {
        title: values.title,
        image: values.image,
        content: values.content,
        description: values.description,
      };
      createComicService(
        input,
        () => {
          message.success(t("createSuccess"));
          hideLoading();
          resetForm();
        },
        (error) => {
          hideLoading();
        }
      );
    },
  });

  return (
    <View style={styles.container}>
      <Header
        isBackType={"close"}
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
          label={t("labelName")}
          placeholder={t("hintName")}
          value={values.title}
          onChangeText={(text) => {
            setFieldValue("title", text);
            setFieldTouched("title", true, false);
          }}
          onBlur={handleBlur("title")}
          autoCapitalize={"words"}
          error={touched.title && errors.title ? errors.title : undefined}
          style={styles.inputSpacing}
        />
        <Input
          label={t("lableCoverImage")}
          placeholder={t("hintCoverImage")}
          value={values.image}
          onChangeText={(text) => {
            setFieldValue("image", text);
            setFieldTouched("image", true, false);
          }}
          onBlur={handleBlur("image")}
          autoCapitalize={"none"}
          error={touched.image && errors.image ? errors.image : undefined}
          style={styles.inputSpacing}
        />
        <Input
          label={t("labelDescription")}
          placeholder={t("hintDescription")}
          value={values.description}
          onChangeText={(text) => {
            setFieldValue("description", text);
            setFieldTouched("description", true, false);
          }}
          onBlur={handleBlur("description")}
          error={
            touched.description && errors.description
              ? errors.description
              : undefined
          }
          multiline
          numberOfLines={2}
          style={styles.inputSpacing}
        />
        <Input
          label={t("labelContent")}
          placeholder={t("hintContent")}
          value={values.content}
          onChangeText={(text) => {
            setFieldValue("content", text);
            setFieldTouched("content", true, false);
          }}
          onBlur={handleBlur("content")}
          error={touched.content && errors.content ? errors.content : undefined}
          multiline
          numberOfLines={10}
          style={styles.inputSpacing}
        />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateComicScreen;
