import { FirebaseError } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export const signOutService = (
  onSuccess: () => void,
  onError: (err: FirebaseError) => void
) => {
  signOut(auth)
    .then(() => {
      onSuccess();
    })
    .catch((error) => {
      onError(error);
    });
};
