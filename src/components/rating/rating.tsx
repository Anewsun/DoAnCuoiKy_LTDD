import { useTheme } from "@hooks";
import React from "react";
import {
  FlatList,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Icon from "../icon/icon";

interface RatingProps {
  style?: StyleProp<ViewStyle>;
  value: number;
  onChangeValue?: (number: number) => void;
  starSize?: number;
}

const Rating: React.FC<RatingProps> = (props) => {
  const { style, value = 0, onChangeValue, starSize = 20 } = props;
  const theme = useTheme();

  const maxRating = [1, 2, 3, 4, 5];

  return (
    <View style={[styles.container, style]}>
      <FlatList
        horizontal
        data={maxRating}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              onPress={() => {
                onChangeValue && onChangeValue(item);
              }}
              style={styles.item}
            >
              {item <= value ? (
                <Icon
                  name={"star"}
                  type={"ant-design"}
                  size={starSize}
                  color={theme.colors["primary"]}
                />
              ) : (
                <Icon
                  name={"staro"}
                  type={"ant-design"}
                  size={starSize}
                  color={theme.colors["primary"]}
                />
              )}
            </Pressable>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {},
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    margin: 2,
  },
});
