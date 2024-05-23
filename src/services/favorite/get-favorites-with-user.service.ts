import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { IFavorite } from "@types";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const getFavoritesWithUserService = (
  uid: string,
  onSuccess: (data: Array<IFavorite>) => void
) => {
  const docRef = collection(db, COLLECTIONS.FAVORITES);

  const whereUid = where("uid", "==", uid);

  const q = query(docRef, whereUid, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const newData = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    onSuccess(newData);
  });
};
