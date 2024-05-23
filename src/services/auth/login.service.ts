import { getUserService } from "@services";
import { IUser } from "@types";
import { FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const loginService = (
  email: string,
  password: string,
  onSuccess: (data: IUser) => void,
  onError: (err: FirebaseError) => void
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const userId = userCredential.user.uid;
      getUserService(
        userId,
        (data) => {
          onSuccess(data);
        },
        (error) => {}
      );
    })
    .catch((error) => {
      onError(error);
    });
};
