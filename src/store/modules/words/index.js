import { mutations } from "@/store/modules/words/mutations";
import { actions } from "@/store/modules/words/actions";
import { getters } from "@/store/modules/words/getters";

const state = {
  wordList: JSON.parse(localStorage.getItem("wordList")) || [],
};

const namespaced = true;

export const words = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
