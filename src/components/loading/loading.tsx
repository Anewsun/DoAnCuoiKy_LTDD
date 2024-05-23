import { ActivityIndicator, Modal } from "@components";
import { fontSizes } from "@styles";
import { makeStyles } from "@utils";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

const Loading: React.FC = () => {
  const { t } = useTranslation([], { keyPrefix: "component.loading" });
  const styles = useStyles();

  return (
    <Modal>
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator />
          <Text style={styles.title}>{t("loading")}...</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loading;

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    width: 100,
    height: 100,
    backgroundColor: theme.colors["card"],
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  title: {
    fontSize: fontSizes["md"],
    color: theme.colors["blackLight"],
    marginTop: 4,
  },
}));
