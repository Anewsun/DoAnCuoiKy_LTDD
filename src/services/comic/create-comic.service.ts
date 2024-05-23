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

export interface IInputCreateComicService {
  title: string;
  image: string;
  content: string;
  description: string;
}

export const createComicService = async (
  input: IInputCreateComicService,
  onSuccess: () => void,
  onError: (error: FirebaseError) => void
) => {
  const collectionRef = collection(db, COLLECTIONS.COMICS);
  await addDoc(collectionRef, {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
    .then((data) => {
      const docRef = doc(db, COLLECTIONS.COMICS, data.id);
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
