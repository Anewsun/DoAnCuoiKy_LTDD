import { STATUS_BAR_HEIGHT } from "@constants";
import { colors, fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";

const IMAGE_WIDTH = 70;
const IMAGE_HEIGHT = 100;

const searchStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    paddingTop: STATUS_BAR_HEIGHT,
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: "row",
    paddingBottom: 10,
    paddingTop: 10,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    resizeMode: "stretch",
  },
  title: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["xl"],
    marginLeft: 12,
    color: colors.orange,
    paddingBottom: 20,
    textAlign: "center",
  },
  viewInfor: {
    flex: 1,
    justifyContent: "center",
  },
  empty: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["md"],
    textAlign: "center",
  },
  viewEmpty: {
    marginTop: 20,
  },
}));
export default searchStyles;
