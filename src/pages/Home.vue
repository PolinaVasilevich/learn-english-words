<template>
  <div class="home-page">
    <div class="input" v-if="!wordList.length">
      <input
        type="file"
        @change="onUploadFiles"
        id="input__file"
        class="input__file"
      />
      <label for="input__file" class="input__button">Choose file</label>
    </div>

    <Table :dataTable="words" v-model:selectedWords="selectedWords" v-else />
    <div ref="observerRef"></div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import Table from "@/components/Table/Table";

import XLSX from "xlsx";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  name: "home",
  components: { Table },

  setup() {
    const store = useStore();
    const wordList = computed(() => store.getters["words/wordList"]);

    const totalWordsOnPage = ref(10);

    const limitWordOfPage = 10;

    const selectedWords = ref("all");

    const observerRef = ref(null);

    onMounted(() => {
      const options = {
        rootMargin: "0px",
        threshold: 1.0,
      };
      const callback = (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreWords();
        }
      };
      const observer = new IntersectionObserver(callback, options);
      observer.observe(observerRef.value);
    });

    const words = computed(() => {
      switch (selectedWords.value) {
        case "all":
          return wordList.value.slice(0, totalWordsOnPage.value);
        case "learned":
          return wordList.value
            .filter((word) => word.isLearned)
            .slice(0, totalWordsOnPage.value);
        case "new":
          return wordList.value
            .filter((word) => !word.isLearned)
            .slice(0, totalWordsOnPage.value);
        default:
          return wordList.value.slice(0, totalWordsOnPage.value);
      }
    });

    const onUploadFiles = (e) => {
      const file = e.target.files ? e.target.files[0] : null;
      const reader = new FileReader();

      reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];

        store.dispatch(
          "words/SET_WORD_LIST",
          XLSX.utils.sheet_to_json(worksheet)
        );
      };

      reader.readAsArrayBuffer(file);
    };

    const loadMoreWords = () => {
      totalWordsOnPage.value = totalWordsOnPage.value + limitWordOfPage;
    };

    return {
      observerRef,
      selectedWords,
      words,
      wordList,
      onUploadFiles,
    };
  },
};
</script>
