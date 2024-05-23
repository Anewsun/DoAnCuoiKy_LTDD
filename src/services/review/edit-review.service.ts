import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { FirebaseError } from "firebase/app";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export interface IInputEditReviewService {
  rating: number;
  comment: string;
  id: string;
  uid: string;
}

export const editReviewService = (
  input: IInputEditReviewService,
  onSuccess: () => void,
  onError: (error: FirebaseError) => void
) => {
  const docRef = doc(db, COLLECTIONS.REVIEWS, input.id);
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
