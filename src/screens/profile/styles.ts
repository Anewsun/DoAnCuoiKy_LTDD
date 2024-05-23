import { colors, fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";

const AVATAR_WIDTH = 150;

const profileStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  cardInfor: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  avatar: {
    width: AVATAR_WIDTH,
    height: AVATAR_WIDTH,
    borderRadius: AVATAR_WIDTH / 2,
    marginBottom: 100,
    marginTop: 50,
  },
  fullname: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["2xl"],
    color: theme.colors["blackDark"],
    textAlign: "center",
  },
  email: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["md"],
    marginTop: 20,
  },
  button: {
    backgroundColor: colors.turquoise,
    marginVertical: 20,
    paddingVertical: 10,
  },
  signOut: {
    textAlign: "center",
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: fontSizes["2xl"],
    textTransform: "uppercase",
  },
}));
export default profileStyles;
