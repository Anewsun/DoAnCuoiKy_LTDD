import { fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";

const comicReaderStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  scrollView: {
    flex: 1
  },
  contentContainer: {
    paddingVertical: 16 // Thêm đệm dọc để đảm bảo nội dung không bị cắt
  },
  content: {
    fontFamily: fonts.medium,
    fontSize: fontSizes["2xl"]
  },
}));

export default comicReaderStyles;
