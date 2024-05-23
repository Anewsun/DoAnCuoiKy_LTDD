import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { FirebaseError } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export const createFavouriteService = async (
  uid: string,
  comicId: string,
  onSuccess: () => void,
  onError: (error: FirebaseError) => void
) => {
  const collectionRef = collection(db, COLLECTIONS.FAVORITES);
  await addDoc(collectionRef, {
    uid: uid,
    comicId: comicId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
    .then((data) => {
      const docRef = doc(db, COLLECTIONS.FAVORITES, data.id);
      try {
        updateDoc(docRef, {
          id: data.id,
        }).then(() => {
          onSuccess();
        });
      } catch (error) {}
    })
    .catch((error) => {
      onError(error);
    });
};
