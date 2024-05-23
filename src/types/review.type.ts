import { Timestamp } from "firebase/firestore";

export interface IReview {
  id: string;
  uid: string;
  comicId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  comment: string;
  rating: number;
}
