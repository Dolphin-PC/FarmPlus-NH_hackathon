export type TypeUser = {
  FinAcno: string;
  Rgno: string;
  accountNumber: string;
  address: string;
  bankCode: string;
  birthDay: string;
  favorite?: any;
  id: string;
  isVIP?: boolean;
  landNumber?: string;
  name: string;
  password?: string;
  phoneNumber: string;
  notice?: any[];
  trade?: any[];
};
export type TypeFilter = {};

export type TypePost = {
  id?: string;
  title: string;
  star: number;
  size?: number;
  category: string;
  subCategory: string;
  location: string;
  cost?: number;
  content: string;
  imageUrls: string[];
  createDate: Date;
  date: string;
  address?: string;
  plantDay?: string;
  outDay?: string;
  landNumber?: string;
};
export type TypeNav = {};

export type TypeContract = {};

export type TypeProduct = TypePost & {
  seller: TypeUser;
  id: string;
  image: string;
};

export type TypeNotice = {
  deposit?: number;
  isContract?: boolean;
  noticeType: TypeNoticeType;
  product: TypeProduct;
  requester: TypeUser;
  tradeId: string;
};
export type TypeNoticeType = "거래대기" | "거래진행" | "거래완료";
