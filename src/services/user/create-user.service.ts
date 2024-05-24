import { db } from "@config";
import { COLLECTIONS } from "@constants";
import { UserStatus } from "@types";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const auth = getAuth();

export const createUserService = (
  email: string,
  password: string,
  fullname: string,
  onSuccess: () => void,
  onError: (error: FirebaseError) => void
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const docRef = doc(db, COLLECTIONS.USERS, userCredential.user.uid);
      setDoc(docRef, {
        email: email,
        fullname: fullname,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: UserStatus.ACTIVE,
        isAdmin: false,
        id: userCredential.user.uid,
        image:
          "https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang.jpg",
      })
        .then(() => {
          onSuccess();
        })
        .catch((error) => {});
    })
    .catch((error) => {
      onError(error);
    });
};
