import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { IUser } from "@types";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";

export const getUserService = async (
  id: string,
  onSuccess: (data: IUser) => void,
  onError: (error: FirebaseError) => void
) => {
  const docRef = doc(db, COLLECTIONS.USERS, id);
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
  } catch (error) {
    onError(error as any);
  }
};
