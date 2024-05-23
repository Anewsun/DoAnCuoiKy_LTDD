import { fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";

const signUpStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  appName: {
    fontSize: fontSizes["2xl"],
    fontFamily: fonts.medium,
    textAlign: "center",
    marginTop: 120,
    color: theme.colors["primary"],
  },
  title: {
    fontSize: fontSizes["lg"],
    marginTop: 10,
    fontFamily: fonts.regular,
    textAlign: "center",
    marginBottom: 50,
    color: theme.colors["blackDark"],
  },
  inputSpacing: {
    marginBottom: 12,
  },
  signInButton: {
    marginTop: 40,
  },
  viewSignIn: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 10,
  },
  haveAnAccount: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["md"],
    color: theme.colors["blackGrey"],
  },
  login: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["md"],
    color: theme.colors["primary"],
  },
}));

export default signUpStyles;
