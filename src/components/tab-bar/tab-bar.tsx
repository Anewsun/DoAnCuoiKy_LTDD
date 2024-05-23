import { Icon } from "@components";
import { WINDOW_WIDTH } from "@constants";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TabActions } from "@react-navigation/native";
import { colors, fontSizes, fonts } from "@styles";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconType } from "../icon/icon";

type TabProps = {
  label: string;
  size: number;
  icon: string;
  type: IconType;
};

export const TabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const { t } = useTranslation([], { keyPrefix: "component.tabBar" });

  const insets = useSafeAreaInsets();
  const bottomInsets = insets.bottom;

  const bottomBarHeight = 60 + (bottomInsets > 0 ? bottomInsets - 10 : 10);

  const tabs: TabProps[] = [
    {
      label: t("home"),
      size: 24,
      icon: "home",
      type: "entypo",
    },
    {
      label: t("profile"),
      size: 24,
      icon: "account-circle",
      type: "material-community",
    },
  ];

  const routes = state.routes.slice(0, 2);

  return (
    <View
      style={[
        styles.tabContainer,
        {
          height: bottomBarHeight,
        },
      ]}
    >
      <View style={{ flexDirection: "row" }}>
        <Animated.View style={styles.slider} />
        {routes.map((route: any, index) => {
          const { options } = descriptors[route.key];
          const stateIndex = state.index == 1 ? 1 : 0;
          const isFocused = stateIndex === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.dispatch({
                ...TabActions.jumpTo(route.name),
                target: state.key,
              });
            }
            if (isFocused && index == 0) {
              navigation.openDrawer();
            }
          };

          const isFocusedColor = isFocused ? colors.yellow : colors.white;

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tab}
            >
              <View>
                <Icon
                  type={tabs[index].type}
                  name={tabs[index].icon}
                  size={tabs[index].size}
                  color={isFocusedColor}
                />
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: isFocusedColor,
                  },
                ]}
              >
                {tabs[index].label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    width: WINDOW_WIDTH,
    backgroundColor: colors.red,
  },
  slider: {
    height: 2,
    position: "absolute",
    top: 0,
    left: 10,
    borderRadius: 10,
    width: 50,
  },
  tab: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  tabLabel: {
    fontSize: fontSizes.md,
    fontFamily: fonts.medium,
  },
});
