import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { IComic } from "@types";
import { doc, getDoc } from "firebase/firestore";

export const getComicService = async (
  docId: string,
  onSuccess: (data: IComic) => void
) => {
  const docRef = doc(db, COLLECTIONS.COMICS, docId);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const newData: any = {
        ...docSnap.data(),
      };
      onSuccess(newData);
    } else {
      // Document does not exist
    }
  } catch (error) {}
};
