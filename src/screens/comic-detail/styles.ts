import { colors, fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";

const comicDetailStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  review: {
    textAlign: "center",
    fontFamily: fonts.medium,
    fontSize: fontSizes["md"],
    marginBottom: 20,
    marginTop: 25,
    color: theme.colors["primary"],
  },
  content: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["2xl"],
    textAlign: "justify",
    paddingTop: 20,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnShare: {
    backgroundColor: colors.turquoise,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  btnFavortie: {
    backgroundColor: colors.red,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
  },
  btnReview: {
    backgroundColor: colors.darkBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
}));
export default comicDetailStyles;
