import { makeStyles } from "@utils";
import React from "react";
import { View } from "react-native";

const Divider: React.FC = () => {
  const styles = useStyles();
  return <View style={styles.container} />;
};

const useStyles = makeStyles((theme) => ({
  container: {
    borderBottomWidth: 1,
    borderColor: theme.colors["divider"],
  },
}));

export default Divider;
