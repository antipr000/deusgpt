import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { getDefaultStore } from "jotai/vanilla";

const storage = createJSONStorage();
export const idTokenAtom = atomWithStorage("idToken", null, storage, {
  getOnInit: true,
});
