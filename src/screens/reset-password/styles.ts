import { fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";

const IMAGE_EMAIL_WIDTH = 150;

const resetPasswordStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: fontSizes["lg"],
    marginTop: 70,
    fontFamily: fonts.regular,
    textAlign: "center",
    marginBottom: 50,
    color: theme.colors["blackDark"],
  },
  submitButton: {
    marginTop: 40,
  },
  pleaseCheck: {
    fontSize: fontSizes["xl"],
    fontFamily: fonts.regular,
    textAlign: "center",
    color: theme.colors["blackDark"],
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  checkEmail: {
    fontSize: fontSizes["md"],
    fontFamily: fonts.regular,
    textAlign: "center",
    color: theme.colors["blackDark"],
    marginBottom: 30,
    paddingHorizontal: 12,
  },
  sheetContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 20,
  },
  imgEmail: {
    width: IMAGE_EMAIL_WIDTH,
    height: IMAGE_EMAIL_WIDTH,
    borderRadius: IMAGE_EMAIL_WIDTH / 2,
    marginVertical: 30,
    alignSelf: "center",
  },
}));

export default resetPasswordStyles;
