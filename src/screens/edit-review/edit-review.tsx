import { Header, Input, Rating, TextError } from "@components";
import { useLoading } from "@hooks";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAppSelector } from "@redux";
import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import editReviewStyles from "./styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@navigation";
import { editReviewService } from "@services";

type EditReviewScreenRouteProps = NativeStackScreenProps<
  RootStackParamList,
  "EditReview"
>["route"];

const EditReviewScreen: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "editReviewScreen" });
  const styles = editReviewStyles();
  const { showLoading, hideLoading } = useLoading();
  const route = useRoute<EditReviewScreenRouteProps>();
  const navigation = useNavigation();

  const user = useAppSelector((state) => state.auth.user);
  const item = route.params.item;

  const validationSchema = Yup.object().shape({
    rating: Yup.number().min(1, t("minRating")).required(),
    comment: Yup.string(),
  });

  const initialValues = {
    rating: item.rating,
    comment: item.comment,
  };

  const {
    handleSubmit,
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
        editReviewService(
          {
            rating: values.rating,
            comment: values.comment,
            id: item.id,
            uid: user?.id,
          },
          () => {
            navigation.goBack();
            hideLoading();
          },
          () => {
            hideLoading();
          }
        );
    },
  });

  return (
    <View style={styles.container}>
      <Header
        isBackType={"close"}
        title={t("rateThisComic")}
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={styles.submit}>{t("post")}</Text>
          </TouchableOpacity>
        }
      />
      <KeyboardAwareScrollView>
        <View style={styles.content}>
          <Rating
            value={values.rating}
            onChangeValue={(value) => {
              setFieldValue("rating", value);
              setFieldTouched("rating", true, false);
            }}
            style={styles.rating}
          />
          <TextError
            style={styles.errorRating}
            error={touched.rating && errors.rating ? errors.rating : undefined}
          />
          <Input
            multiline
            numberOfLines={5}
            placeholder={t("enterReview")}
            value={values.comment}
            onChangeText={(text) => {
              setFieldValue("comment", text);
            }}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default EditReviewScreen;
