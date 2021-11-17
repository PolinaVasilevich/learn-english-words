const MutationType = {
  SET_WORD_LIST: "SET_WORD_LIST",
  ADD_LEARNED_WORD: "ADD_LEARNED_WORD",
};

export const mutations = {
  [MutationType.SET_WORD_LIST](state, wordList) {
    state.wordList = wordList;
    localStorage.setItem("wordList", JSON.stringify(wordList));
  },

  [MutationType.ADD_LEARNED_WORD](state, word) {
    const wordIndex = state.wordList.findIndex(
      (item) => item.Word === word.Word
    );

    state.wordList[wordIndex].isLearned = true;

    localStorage.setItem("wordList", JSON.stringify(state.wordList));
  },
};
