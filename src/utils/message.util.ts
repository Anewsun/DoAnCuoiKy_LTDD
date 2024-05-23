import { IS_ANDROID, STATUS_BAR_HEIGHT } from "@constants";
import { fonts } from "@styles";
import { MessageType, showMessage } from "react-native-flash-message";

const show = (message: string, type: MessageType) => {
  type = type;
  showMessage({
    message: message,
    type: type,
    titleStyle: {
      fontFamily: fonts.medium,
    },
    style: {
      marginTop: IS_ANDROID ? STATUS_BAR_HEIGHT : 0,
    },
  });
};

export const message: Record<
  "success" | "error" | "infor" | "warning",
  (message: string) => void
> = {
  success: (message: string) => show(message, "success"),
  error: (message: string) => show(message, "danger"),
  infor: (message: string) => show(message, "info"),
  warning: (message: string) => show(message, "warning"),
};
