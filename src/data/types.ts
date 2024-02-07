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

export type TypePost = {};
export type TypeNav = {};

export type TypeContract = {};

export type TypeProduct = {
  address: string;
  category: string;
  content: string;
  cost: number;
  createDate: Date;
  date: string;
  id: string;
  image: string;
  imageUrls: string[];
  landNumber: string;
  location: string;
  outDay: string;
  plantDay: string;
  seller: TypeUser;
  size: number;
  star: number;
  subCategory: string;
  title: string;
};

export type TypeAccountHolderResult = any;
