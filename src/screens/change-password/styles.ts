import { fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";

const changePasswordStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  inputSpacing: {
    paddingBottom: 10,
  },
  submitText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["lg"],
    color: theme.colors["primary"],
    marginLeft: 12,
  },
  forgotPassword: {
    alignItems: "center",
    fontFamily: fonts.medium,
    fontSize: fontSizes["lg"],
    color: theme.colors["primary"],
    textAlign: "center",
    textDecorationLine: "underline",
  },
}));
export default changePasswordStyles;
