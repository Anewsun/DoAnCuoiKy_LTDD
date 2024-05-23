import { fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";

const createComicStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
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
}));
export default createComicStyles;
