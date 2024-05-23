import { colors, fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";

const favoritesStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  submit: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["lg"],
    color: theme.colors["primary"],
  },
  empty: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["md"],
    textAlign: "center",
    marginTop: 20,
  },
  unfavorite: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["xl"],
    color: theme.colors["blackGrey"],
    marginBottom: 15,
    marginTop: 4,
  },
  modalCenter: { flex: 1, justifyContent: "center" },
  modalContent: {
    backgroundColor: "white",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  button: {
    width: 50,
    borderRadius: 4,
    backgroundColor: colors.lightgray,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 4,
  },
  buttonTitle: {
    color: colors.black,
  },
}));
export default favoritesStyles;
