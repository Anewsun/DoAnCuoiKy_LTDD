import { Header, Input, Rating, TextError } from "@components";
import { useLoading } from "@hooks";
import { RootStackParamList } from "@navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppSelector } from "@redux";
import { createReviewService } from "@services";
import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import createReviewStyles from "./styles";

type CreateReviewScreenRouteProps = NativeStackScreenProps<
  RootStackParamList,
  "CreateReview"
>["route"];

const CreateReviewScreen: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "createReviewScreen" });
  const styles = createReviewStyles();
  const { showLoading, hideLoading } = useLoading();
  const route = useRoute<CreateReviewScreenRouteProps>();
  const navigation = useNavigation();

  const user = useAppSelector((state) => state.auth.user);

  const validationSchema = Yup.object().shape({
    rating: Yup.number().min(1, t("minRating")).required(),
    comment: Yup.string(),
  });

  const initialValues = {
    rating: 0,
    comment: "",
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
        createReviewService(
          {
            rating: values.rating,
            comment: values.comment,
            comicId: route.params.comicId,
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

export default CreateReviewScreen;
