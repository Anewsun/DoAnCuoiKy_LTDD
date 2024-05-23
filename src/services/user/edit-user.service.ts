import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { FirebaseError } from "firebase/app";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export interface IInputEditUserService {
  fullname?: string;
}

export const editUserService = (
  id: string,
  input: IInputEditUserService,
  onSuccess: () => void,
  onError: (error: FirebaseError) => void
) => {
  const docRef = doc(db, COLLECTIONS.USERS, id);
  updateDoc(docRef, {
    ...input,
    updatedAt: serverTimestamp(),
  })
    .then((data) => {
      onSuccess();
    })
    .catch((error) => {
      onError(error);
    });
};
