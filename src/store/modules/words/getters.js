export const getters = {
  wordList(state) {
    return state.wordList;
  },

  wordListWithoutLearnedWords() {
    return getters.wordList.filter((item) => !item.isLearned);
  },
};
