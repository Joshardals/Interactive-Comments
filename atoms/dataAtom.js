import { atom } from "recoil";
import { data } from "../data";
import { user } from "../data";

export const dataItem = atom({
  key: "dataItem",
  default: data,
});
export const userItem = atom({
  key: "userItem",
  default: user,
});
export const replyItem = atom({
  key: "replyItem",
  default: data.map((res) => {return res}),
});
