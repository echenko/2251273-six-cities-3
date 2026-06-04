import { UserType } from './user';

export type CommentElementType = {
  id: string;
  date: string;
  user: UserType;
  comment: string;
  rating: number;
};
