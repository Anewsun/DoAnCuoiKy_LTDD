import { db } from "@config";
import { COLLECTIONS, SORT } from "@constants";
import { IComic } from "@types";

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export const getComicsService = (
  filters: {
    title?: string;
    ids?: Array<string>;
    sort?: SORT;
  },
  onSuccess: (data: Array<IComic>) => void
) => {
  const docRef = collection(db, COLLECTIONS.COMICS);

  const queryArgs = [];

  if (filters.title && filters.title.trim()) {
    queryArgs.push(where("title", ">=", filters.title));
    queryArgs.push(where("title", "<=", filters.title + "\uf8ff"));
  }
  if (filters?.ids) {
    queryArgs.push(where("id", "in", filters.ids));
  }

  const _sort = filters.sort == undefined ? "desc" : filters.sort;

  // Construct the query properly
  let queryRef;
  if (filters.title) {
    queryRef = query(
      docRef,
      ...queryArgs,
      orderBy("title", _sort),
      orderBy("createdAt", _sort)
    );
  } else {
    queryRef = query(docRef, ...queryArgs, orderBy("createdAt", _sort));
  }

  return onSnapshot(queryRef, (snapshot) => {
    const newData = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    onSuccess(newData);
  });
};
