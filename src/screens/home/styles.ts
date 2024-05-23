import { WINDOW_WIDTH } from "@constants";
import { fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";
import { StyleSheet } from "react-native";

const RATIO_BANNER = 675 / 1200;

const homeStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  banner: {
    width: WINDOW_WIDTH,
    height: WINDOW_WIDTH * RATIO_BANNER,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["xl"],
    paddingTop: 10,
    paddingBottom: 20,
    textTransform: "capitalize",
  },
  filterList: {
    marginHorizontal: 16,
  },
  itemFilter: {
    flexDirection: "row",
    paddingVertical: 15,
  },
  titleItemFilter: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["lg"],
    flex: 1,
  },
  empty: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["md"],
    textAlign: "center",
  },
  viewEmpty: {
    marginTop: 20,
  },
  fabButton: {
    position: "absolute",
    right: 5,
    bottom: 50,
  },
}));
export default homeStyles;
