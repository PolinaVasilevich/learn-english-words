<template>
  <div class="dashboard">
    <select v-model="selectedWords">
      <option disabled value="">Choose a filter</option>
      <option value="all">All words</option>
      <option value="nouns">Nouns</option>
      <option value="adjectives">Adjectives</option>
      <option value="verbs">Verbs</option>
      <option value="phrasal">Phrasal verbs</option>
    </select>
    <div class="dashboard__random-word random-word" v-if="randomWord">
      <p class="random-word__definition">
        {{ randomWord.Definition }} ({{ randomWord.Translate }})
      </p>

      <button class="random-word__btn" @click="changeWord">
        Change a word
      </button>
      <input
        class="random-word__input"
        type="text"
        v-model.trim="inputWord"
        placeholder="Enter a word"
        @keyup="onKeyupHandler"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "dashboard",

  setup() {
    const inputWord = ref("");
    const dataTable = ref(null);
    const randomWord = ref(null);

    const selectedWords = ref("all");

    onMounted(() => {
      dataTable.value = JSON.parse(localStorage.getItem("dataTable")) || [];
      getRandomWord();
    });

    const words = computed(() => {
      switch (selectedWords.value) {
        case "all":
          return dataTable.value;

        case "nouns":
          console.log("noun");
          return dataTable.value.filter((word) =>
            word["Part of Speech"].includes("n")
          );

        case "adjectives":
          return dataTable.value.filter((word) =>
            word["Part of Speech"].includes("adv")
          );

        case "phrasal":
          return dataTable.value.filter((word) =>
            word["Part of Speech"].includes("phr")
          );

        case "verbs":
          return dataTable.value.filter((word) =>
            word["Part of Speech"].includes("v")
          );

        default:
          return dataTable.value;
      }
    });

    const getRandomWord = () => {
      const dataTableWithoutLearnedWords = words.value.filter(
        (item) => !item.isLearnt
      );

      const id = Math.floor(
        Math.random() * dataTableWithoutLearnedWords.length
      );

      randomWord.value = dataTableWithoutLearnedWords[id];
    };

    const changeWord = () => {
      alert(`Correct word is ${randomWord.value.Word.toUpperCase()}`);
      getRandomWord();
    };

    const onKeyupHandler = (e) => {
      if (e.key === "Enter") checkWord();
    };

    const checkWord = () => {
      if (
        inputWord.value.toLowerCase() ===
        randomWord.value.Word.toLowerCase().trim()
      ) {
        alert(`You're right:)`);

        const data = [...dataTable.value];

        const index = data.findIndex(
          (item) => item.Word === randomWord.value.Word
        );

        data[index].isLearnt = true;

        localStorage.setItem("dataTable", JSON.stringify(data));
      } else {
        alert(
          `You're wrong:( Correct word is ${randomWord.value.Word.toUpperCase()}`
        );
      }

      getRandomWord();
      inputWord.value = "";
    };

    return {
      inputWord,
      randomWord,
      onKeyupHandler,
      changeWord,
      selectedWords,
      words,
    };
  },
};
</script>

<style lang="scss">
.dashboard {
  .random-word {
    width: 70vw;
    margin-top: 15px;
    padding: 25px;
    border: 1px solid #5c5c5c;

    &__definition {
      font-weight: bold;
      font-size: 1.3rem;
    }

    &__input {
      width: 100%;
      margin-top: 15px;
      padding: 15px;
      font-size: 1.3rem;

      outline: none;
      border: 1px solid #999;
      box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0);
      border-radius: 5px;

      &:focus {
        box-shadow: 0 0 1px 1px #4d90f0;
      }
    }

    &__btn {
      margin-top: 15px;

      outline: none;
      border: none;
      padding: 10px;

      border-radius: 10px;

      cursor: pointer;
      &:hover {
        background: lightsteelblue;
      }
    }
  }

  select {
    padding: 10px;

    font-size: 1.5rem;
    font-family: "Rock Salt", cursive;
    font-weight: bold;

    outline: none;
    border: none;

    cursor: pointer;
  }
}
</style>
