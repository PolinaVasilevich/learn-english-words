<template>
  <div class="app">
    <h1 class="app__title">Learn English Words</h1>
    <header class="app__header header">
      <router-link to="/" class="header__link">Home</router-link>
      <router-link to="/dashboard" class="header__link" v-if="wordList.length"
        >Dashboard</router-link
      >
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "App",
  setup() {
    const store = useStore();

    const wordList = computed(() => {
      return store.getters["words/wordList"];
    });

    return { wordList };
  },
};
</script>
