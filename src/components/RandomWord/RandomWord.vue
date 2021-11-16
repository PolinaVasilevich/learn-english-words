<template>
  <div class="random-word">
    <p class="word" v-if="selectedLearnMethod === 'definition'">
      {{ randomWord.Definition }}
    </p>

    <p v-else class="word">{{ translateWord }}</p>
    <input
      class="input"
      type="text"
      v-model.trim="inputWord"
      @keyup="onKeypress"
      placeholder="Enter a word"
      :class="{ 'error-input': !isCorrectAnswer }"
    />
    <p class="error">{{ !isCorrectAnswer ? "You're not right" : null }}</p>
    <p v-if="correctAnswer">{{ correctAnswer }}</p>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "random-word",

  props: {
    randomWord: {
      type: Object,
    },
    translateWord: {
      type: String,
    },
    selectedLearnMethod: {
      type: String,
    },
  },

  setup(props, { emit }) {
    const inputWord = ref("");

    const isCorrectAnswer = ref(true);
    const correctAnswer = ref("");

    const numberOfWrongAnswers = ref(0);
    const limitOfWrongAnswers = 2;

    const resetData = () => {
      numberOfWrongAnswers.value = 0;
      inputWord.value = "";
    };

    const onKeypress = (e) => {
      isCorrectAnswer.value = true;
      correctAnswer.value = "";
      if (e.key === "Enter") {
        checkWord();
      }
    };

    const checkWord = () => {
      if (numberOfWrongAnswers.value >= limitOfWrongAnswers) {
        correctAnswer.value = props.randomWord.Word;

        resetData();
        emit("getRandomWord");
      } else {
        if (inputWord.value === props.randomWord.Word) {
          isCorrectAnswer.value = true;

          resetData();
          emit("learnWord");
          emit("getRandomWord");
        } else {
          isCorrectAnswer.value = false;
          numberOfWrongAnswers.value++;
        }
      }
    };

    return {
      inputWord,
      onKeypress,
      isCorrectAnswer,
      numberOfWrongAnswers,
      correctAnswer,
    };
  },
};
</script>

<style scoped lang="scss">
.random-word {
  width: 70vw;
  margin: 20px auto;
  padding: 20px;

  border: 1px solid #ccc;

  .word {
    margin-bottom: 20px;

    font-size: 1.2rem;
  }

  .input {
    width: 100%;
    padding: 10px;

    margin-bottom: 10px;

    font-size: 1.2rem;

    outline: none;
    border: 1px solid #ccc;
  }

  .error-input {
    border-color: red;
  }

  .error {
    color: red;
    font-size: 1.2rem;
  }
}
</style>
