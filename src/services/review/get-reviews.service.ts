import { db } from "@config";
import { COLLECTIONS } from "@constants";

import { IReview } from "@types";
import { FirebaseError } from "firebase/app";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const getReviewsService = (
  filter: {
    comicId?: string;
    id?: string;
    uid?: string;
  },
  onSuccess: (data: Array<IReview>) => void,
  onError: (error: FirebaseError) => void
) => {
  const docRef = collection(db, COLLECTIONS.REVIEWS);

  const queryArgs = [];

  const whereComicId = where("comicId", "==", filter.comicId);
  const whereId = where("id", "==", filter.id);
  const whereUId = where("uid", "==", filter.uid);

  if (filter.comicId) {
    queryArgs.push(whereComicId);
  }

  if (filter.id) {
    queryArgs.push(whereId);
  }

  if (filter.uid) {
    queryArgs.push(whereUId);
  }

  const q = query(docRef, ...queryArgs, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const newData = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    onSuccess(newData);
  });
};
