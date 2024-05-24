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
    paddingHorizontal: 15,
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 15,
  },
  backButton: {
    position: "absolute",
    bottom: 50,
    right: 20,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  backButtonText: {
    color: "black",
    fontSize: 18,
  },
}));
export default comicDetailStyles;
