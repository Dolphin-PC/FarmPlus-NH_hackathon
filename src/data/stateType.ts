import { TypePost, TypeUser } from "./dbType";

export type TypeStatePost = {
  posts: TypePost[];
  current: TypeStateCurrentPost;
  loading: boolean;
  uploading: boolean;
  error?: any;
};
export type TypeStateCurrentPost = TypePost & { seller: TypeUser };
