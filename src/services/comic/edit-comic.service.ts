import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { FirebaseError } from "firebase/app";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export interface IInputEditComicService {
  title: string;
  image: string;
  content: string;
  description: string;
}

export const editComicService = (
  id: string,
  input: IInputEditComicService,
  onSuccess: () => void,
  onError: (error: FirebaseError) => void
) => {
  const docRef = doc(db, COLLECTIONS.COMICS, id);
  updateDoc(docRef, {
    ...input,
    updatedAt: serverTimestamp(),
  })
    .then(() => {
      onSuccess();
    })
    .catch((error) => {
      onError(error);
    });
};
