import { makeStyles } from "@utils";
import React from "react";
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export interface ModalProps extends RNModalProps {
  onBackdropPress?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
  const { onBackdropPress, children, ...modalOtherProps } = props;
  const styles = useStyles();

  return (
    <RNModal transparent animationType="fade" {...modalOtherProps}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onBackdropPress}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        {children}
      </View>
    </RNModal>
  );
};

export default Modal;

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors["backdrop"],
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
}));
