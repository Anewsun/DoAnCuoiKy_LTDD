import { Timestamp } from "firebase/firestore";

export interface IFavorite {
  id: string;
  uid: string;
  comicId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
