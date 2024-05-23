import { fontSizes, fonts } from "@styles";
import { makeStyles } from "@utils";

const comicReaderStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: 'lightgray', // Thêm màu nền để kiểm tra
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'lightblue', // Thêm màu nền để kiểm tra
    borderWidth: 1, // Thêm đường viền để kiểm tra
    borderColor: 'red',
  },
  contentContainer: {
    paddingVertical: 16, // Thêm đệm dọc để đảm bảo nội dung không bị cắt
  },
  content: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.lg,
    color: 'black', // Đảm bảo rằng văn bản có màu để hiển thị
  },
}));

export default comicReaderStyles;
