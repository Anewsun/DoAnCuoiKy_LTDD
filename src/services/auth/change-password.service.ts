import { FirebaseError } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
} from "firebase/auth";

const auth = getAuth();

export const changePasswordService = (
  email: string,
  oldPassword: string,
  newPassword: string,
  onSuccess: () => void,
  onError: (error: FirebaseError) => void
) => {
  signInWithEmailAndPassword(auth, email, oldPassword)
    .then(async (userCredential) => {
      let user = userCredential.user;
      updatePassword(user, newPassword)
        .then(() => {
          onSuccess();
        })
        .catch(() => {});
    })
    .catch((error) => {
      onError(error);
    });
};
