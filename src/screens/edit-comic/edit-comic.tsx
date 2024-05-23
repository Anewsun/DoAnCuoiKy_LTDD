import { Header, Input } from "@components";
import { useLoading } from "@hooks";
import { RootStackParamList } from "@navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IInputEditComicService, editComicService } from "@services";
import { message } from "@utils";
import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import editComicStyles from "./styles";

type EditComicScreenRouteProps = NativeStackScreenProps<
  RootStackParamList,
  "EditComnic"
>["route"];

const EditComicScreen: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "editComicScreen" });
  const styles = editComicStyles();
  const { showLoading, hideLoading } = useLoading();
  const route = useRoute<EditComicScreenRouteProps>();
  const navigation = useNavigation();

  const item = route.params.item;

  const validationSchema = Yup.object().shape({
    title: Yup.string().trim().required(t("enterTitle")),
    image: Yup.string().required(t("enterImage")),
    content: Yup.string().required(t("enterContent")),
    description: Yup.string().required(t("enterDescription")),
  });

  const initialValues = {
    title: item.title,
    image: item.image,
    content: item.content,
    description: item.description,
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
      const input: IInputEditComicService = {
        title: values.title,
        image: values.image,
        content: values.content,
        description: values.description,
      };
      editComicService(
        item.id,
        input,
        () => {
          message.success(t("editedSuccess"));
          hideLoading();
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

export default EditComicScreen;
