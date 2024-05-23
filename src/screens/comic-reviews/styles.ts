import { fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";

const IMAGE_WIDTH = 40;

const comicReviewsStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
  },
  viewInfor: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  fullname: {
    marginLeft: 12,
    fontFamily: fonts.medium,
    fontSize: fontSizes["lg"],
    flex: 1,
  },
  comment: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["md"],
    textAlign: "justify",
    marginTop: 10,
  },
  itemContainer: {
    paddingVertical: 16,
  },
  ratingView: {
    flexDirection: "row",
  },
  date: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["md"],
    textAlign: "justify",
    marginLeft: 10,
  },
  empty: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["md"],
    textAlign: "center",
    marginTop: 20,
  },
}));
export default comicReviewsStyles;
