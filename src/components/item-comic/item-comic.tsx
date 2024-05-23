import { SCREEN_WIDTH, WINDOW_WIDTH } from "@constants";
import { fontSizes, fonts } from "@styles";
import { IComic } from "@types";
import { makeStyles } from "@utils";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const RADIUS = 20;

interface ItemComicProps {
  disabled?: boolean;
  onPress: () => void;
  item: IComic;
  gap: number;
  numColumns?: number;
}

const ItemComic: React.FC<ItemComicProps> = (props) => {
  const { disabled, onPress, item, gap = 12, numColumns = 2 } = props;
  const availableSpace = SCREEN_WIDTH - (numColumns - 1) * gap;
  const ITEM_SIZE = availableSpace / numColumns - gap;

  const styles = useStyles();
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, { width: ITEM_SIZE, height: ITEM_SIZE }]}
    >
      <Image source={{ uri: item?.image }} style={styles.image} />
      <Text style={styles.title}>{item?.title}</Text>
    </TouchableOpacity>
  );
};

export default ItemComic;

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RADIUS,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: theme.colors["border"],
  },
  image: {
    width: "100%",
    height: "90%",
    borderTopLeftRadius: RADIUS,
    borderTopRightRadius: RADIUS,
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["lg"],
    flex: 1,
    color: theme.colors["blackDark"],
    textAlign: "center",
  },
}));
