import { Timestamp } from "firebase/firestore";

export interface IComic {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  title: string;
  image: string;
  content: string;
  description: string;
}
