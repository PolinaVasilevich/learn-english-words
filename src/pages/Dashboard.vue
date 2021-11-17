<template>
  <div class="dashboard">
    <my-select :options="optionsSelect" v-model="selectedWords" />
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
    <p class="random-word__definition" v-else>
      You have learned all words this category
    </p>
  </div>
</template>

<script>
import { ref, computed } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";

// import _ from "lodash";

import MySelect from "../components/UI/MySelect.vue";
import { useStore } from "vuex";
export default {
  components: { MySelect },
  name: "dashboard",

  setup() {
    const store = useStore();
    const wordList = computed(() => store.getters["words/wordList"]);

    const inputWord = ref("");
    const randomWord = ref(null);

    const selectedWords = ref("all");

    const optionsSelect = [
      {
        value: "all",
        label: "All words",
      },
      {
        value: "nouns",
        label: "Nouns",
      },
      {
        value: "adjectives",
        label: "Adjectives",
      },
      {
        value: "verbs",
        label: "Verbs",
      },
      {
        value: "phrasal",
        label: "Phrasal verbs",
      },
    ];

    onMounted(() => {
      getRandomWord();
    });

    const words = computed(() => {
      switch (selectedWords.value) {
        case "all":
          return wordList.value;
        case "nouns":
          return wordList.value.filter((word) =>
            word["Part of Speech"].includes("n")
          );

        case "adjectives":
          return wordList.value.filter((word) =>
            word["Part of Speech"].includes("adv")
          );

        case "phrasal":
          return wordList.value.filter((word) =>
            word["Part of Speech"].includes("phr")
          );

        case "verbs":
          return wordList.value.filter((word) =>
            word["Part of Speech"].includes("v")
          );

        default:
          return wordList.value;
      }
    });

    const getRandomWord = () => {
      if (words.value) {
        const id = Math.floor(Math.random() * words.value.length);
        randomWord.value = words.value[id];
      }
    };

    watch(selectedWords, () => {
      getRandomWord();
    });

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

        store.dispatch("words/ADD_LEARNED_WORD", randomWord.value);
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
      optionsSelect,
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
    border-radius: 5px;
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
}
</style>
