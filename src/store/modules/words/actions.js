const ActionTypes = {
  SET_WORD_LIST: "SET_WORD_LIST",
  ADD_LEARNED_WORD: "ADD_LEARNED_WORD",
};

export const actions = {
  [ActionTypes.SET_WORD_LIST]({ commit }, wordList) {
    commit("SET_WORD_LIST", wordList);
  },

  [ActionTypes.ADD_LEARNED_WORD]({ commit }, word) {
    commit("ADD_LEARNED_WORD", word);
  },
};
