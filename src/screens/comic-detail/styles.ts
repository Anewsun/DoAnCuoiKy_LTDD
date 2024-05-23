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
    fontSize: fontSizes["lg"],
    textAlign: "justify",
    paddingTop: 20,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnShare: {
    backgroundColor: colors.turquoise,
  },
  btnFavortie: {
    backgroundColor: colors.red,
  },
  btnReview: {
    backgroundColor: colors.darkBlue,
  },
}));
export default comicDetailStyles;
