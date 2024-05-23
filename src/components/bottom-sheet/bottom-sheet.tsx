import { Portal } from "@gorhom/portal";
import { makeStyles } from "@utils";
import React from "react";
import { View } from "react-native";
import { Modalize, ModalizeProps } from "react-native-modalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface BottomSheetProps extends ModalizeProps {
  ref?: any;
  children?: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = React.forwardRef(
  (props, ref) => {
    const { children, ...rest } = props;
    const styles = useStyles();
    const insets = useSafeAreaInsets();
    const bottomInsets = insets.bottom;
    const heigthBottomBarHeight = bottomInsets > 0 ? bottomInsets : 0;

    return (
      <Portal>
        <Modalize
          withHandle={false}
          modalStyle={styles.modalStyle}
          {...rest}
          ref={ref}
        >
          <View style={{ paddingBottom: heigthBottomBarHeight }}>
            {children}
          </View>
        </Modalize>
      </Portal>
    );
  }
);

export default BottomSheet;

const useStyles = makeStyles((theme) => ({
  modalStyle: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
}));
