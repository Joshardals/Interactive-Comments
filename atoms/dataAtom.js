import { atom } from "recoil";
import { data } from "../data";

export const dataItem = atom({
  key: "dataItem",
  default: data,
})