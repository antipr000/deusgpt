import { atom } from "jotai";

export const userAtom = atom({
  firstName: "",
  lastName: "",
  id: "",
  email: "",
  isAdmin: "",
  plan: "",
  createdAt: null,
});
