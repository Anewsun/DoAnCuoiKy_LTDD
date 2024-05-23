import moment from "moment";
import { Timestamp } from "firebase/firestore";
export function formatDate(date?: Timestamp) {
  const formatDate = new Date(
    date?.seconds * 1000 + date?.nanoseconds / 1000000
  );
  return moment(formatDate).format("DD-MM-YYYY");
}
