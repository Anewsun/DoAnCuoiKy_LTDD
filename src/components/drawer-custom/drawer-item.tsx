import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { makeStyles } from "@utils";
import { fonts } from "@styles";

export interface DrawerItemProps {
  title: string;
  onPress: () => void;
  isFocused?: boolean;
}

const DrawerItem: React.FC<DrawerItemProps> = (props) => {
  const { title, onPress, isFocused } = props;
  const styles = useStyles();

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default DrawerItem;

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: "center",
    marginHorizontal: 12,
    height: 60,
  },
  title: {
    fontFamily: fonts.medium,
  },
}));
