import { FirebaseError } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth();

export const resetPasswordService = (
  email: string,
  onSuccess: () => void,
  onError: (error: FirebaseError) => void
) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      onSuccess();
    })
    .catch((error) => {
      onError(error);
    });
};
