import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { FirebaseError } from "firebase/app";
import { deleteDoc, doc } from "firebase/firestore";

export const deleteComicService = async (
  id: string,
  onSuccess: () => void,
  onError: (error: FirebaseError) => void
) => {
  const docRef = doc(db, COLLECTIONS.COMICS, id);

  deleteDoc(docRef)
    .then(() => {
      onSuccess();
    })
    .catch((error) => {
      onError(error);
    });
};
