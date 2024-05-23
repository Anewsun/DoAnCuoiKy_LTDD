import { fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";

const createReviewStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  submit: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["lg"],
    color: theme.colors["primary"],
  },
  content: {
    justifyContent: "center",
  },
  rating: {
    marginVertical: 20,
  },
  errorRating: {
    marginBottom: 10,
  },
}));
export default createReviewStyles;
