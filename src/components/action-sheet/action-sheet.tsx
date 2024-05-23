import { Divider, Icon, IconProps } from "@components";
import { fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";
import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import BottomSheet from "../bottom-sheet/bottom-sheet";

export interface ActionItemSheetProps {
  icon: IconProps;
  title: string;
  onPress: () => void;
}

export interface ActionSheetProps {
  data: Array<ActionItemSheetProps>;
  ref: any;
}

const ActionSheet: React.FC<ActionSheetProps> = React.forwardRef(
  (props, ref) => {
    const { data } = props;
    const styles = useStyles();

    const ItemOption = (props: ActionItemSheetProps) => {
      const { icon, title, onPress } = props;

      return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <Icon name={icon?.name} type={icon?.type} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      );
    };

    return (
      <BottomSheet
        ref={ref}
        adjustToContentHeight
        HeaderComponent={
          <FlatList
            bounces={false}
            contentContainerStyle={styles.list}
            data={data}
            renderItem={({ item }) => {
              return <ItemOption {...item} />;
            }}
            ItemSeparatorComponent={() => <Divider />}
          />
        }
      />
    );
  }
);

export default ActionSheet;

const useStyles = makeStyles((theme) => ({
  list: {
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  icon: {
    color: theme.colors["primary"],
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["md"],
    flex: 1,
    marginHorizontal: 12,
  },
}));
