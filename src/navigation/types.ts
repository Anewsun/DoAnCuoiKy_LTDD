import { IComic, IReview } from "@types";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
  TabStack: undefined;
  CreateComic: undefined;
  ChangePassword: undefined;
  Settings: undefined;
  EditProfile: undefined;
  ComicDetail: {
    item: IComic;
  };
  CreateReview: {
    comicId: string;
  };
  EditReview: {
    item: IReview;
  };
  ComicReviews: {
    id: string;
  };
  ComicReader: {
    content: string;
  };
  FavoriteList: undefined;
  ComicList: undefined;
  EditComnic: {
    item: IComic;
  };
  Search: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
