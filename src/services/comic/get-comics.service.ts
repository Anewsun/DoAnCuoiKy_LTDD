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

  const checkQueryArgs = (() => {
    if (filters.title && filters.title.trim()) {
      queryArgs.push(where("title", ">=", filters.title));
      queryArgs.push(where("title", "<=", filters.title + "\uf8ff"));
    }
    if (filters?.ids) {
      queryArgs.push(where("id", "in", filters.ids));
    }
  })();

  const _sort = filters.sort == undefined ? "desc" : filters.sort;

  console.log(filters.sort);

  return onSnapshot(
    filters.title == undefined
      ? query(
          docRef,
          ...queryArgs,
          // orderBy("title", _sort),
          orderBy("createdAt", _sort)
        )
      : query(
          docRef,
          ...queryArgs,
          orderBy("title", _sort),
          orderBy("createdAt", _sort)
        ),
    (snapshot) => {
      const newData = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
      }));
      onSuccess(newData);
    }
  );
};
