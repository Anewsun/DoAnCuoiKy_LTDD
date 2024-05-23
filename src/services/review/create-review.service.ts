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

export interface IInputCreateReviewService {
  rating: number;
  comment: string;
  comicId: string;
  uid: string;
}

export const createReviewService = async (
  input: IInputCreateReviewService,
  onSuccess: () => void,
  onError: (error: FirebaseError) => void
) => {
  const collectionRef = collection(db, COLLECTIONS.REVIEWS);
  await addDoc(collectionRef, {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
    .then((data) => {
      const docRef = doc(db, COLLECTIONS.REVIEWS, data.id);
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
