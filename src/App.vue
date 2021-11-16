<template>
  <div class="app">
    <h1 class="app__title">Learn English Words</h1>
    <header class="app__header header">
      <router-link to="/" class="header__link">Home</router-link>
      <router-link to="/dashboard" class="header__link" v-if="dataTable"
        >Dashboard</router-link
      >
    </header>
    <router-view></router-view>
    <!-- <h1 class="app__title">Learn English Words</h1>
    <input type="file" @change="onUploadFiles" v-if="!dataTable.length" />
    <div class="btns">
      <button class="app__btn" @click="getRandomWord">Change a word</button>
      <select v-model="selectedLearnMethod" class="app__select">
        <option value="" disabled>Select a way learn words</option>
        <option value="definition">Definition</option>
        <option value="translate">Translate</option>
      </select>
    </div>
    <random-word
      v-if="dataTable.length"
      :randomWord="randomWord"
      :translateWord="translateWord"
      :selectedLearnMethod="selectedLearnMethod"
      @getRandomWord="getRandomWord"
      @learnWord="learnWord"
    />
    <Table :dataTable="dataTable" /> -->
  </div>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
export default {
  name: "App",

  setup() {
    const dataTable = ref(null);

    onMounted(() => {
      dataTable.value = JSON.parse(localStorage.getItem("dataTable"));
    });

    return { dataTable };
  },

  // setup() {
  //   const dataTable = ref([]);
  //   const randomWord = ref({});
  //   const translateWord = ref("");

  //   const selectedLearnMethod = ref("definition");

  //   const getRandomWord = () => {
  //     const id = Math.floor(Math.random() * dataTable.value.length);
  //     randomWord.value = dataTable.value[id];

  //     if (selectedLearnMethod.value === "translate") {
  //       getTranslateWord();
  //     }
  //   };

  //   watch(() => getRandomWord());

  //   const getTranslateWord = async () => {
  //     const data = {
  //       q: randomWord.value.Word,
  //       source: "en",
  //       target: "ru",
  //     };

  //     const response = await axios.request({
  //       url: `https://libretranslate.de/translate`,
  //       method: "POST",
  //       data,
  //     });

  //     translateWord.value = response.data.translatedText;
  //   };

  //   const learnWord = () => {
  //     const data = [...dataTable.value, { ...randomWord, isLearnt: true }];
  //     localStorage.setItem("dataTable", JSON.stringify(data));
  //   };

  //   onMounted(() => {
  //     const data = JSON.parse(localStorage.getItem("dataTable"));
  //     dataTable.value = data;
  //     if (data) {
  //       dataTable.value = data;
  //     }
  //     getRandomWord();
  //   });

  // const onUploadFiles = (e) => {
  //   const file = e.target.files ? e.target.files[0] : null;
  //   const reader = new FileReader();

  //   reader.onload = function (e) {
  //     const data = new Uint8Array(e.target.result);
  //     const workbook = XLSX.read(data, { type: "array" });
  //     const sheetName = workbook.SheetNames[0];

  //     const worksheet = workbook.Sheets[sheetName];

  //     dataTable.value = XLSX.utils.sheet_to_json(worksheet);

  //     localStorage.setItem(
  //       "dataTable",
  //       JSON.stringify(XLSX.utils.sheet_to_json(worksheet))
  //     );
  //   };

  //   reader.readAsArrayBuffer(file);
};
</script>

<style scoped lang="scss">
.app {
  &__header {
    display: flex;
  }

  .header__link {
    text-decoration: none;
    margin-right: 2rem;
    color: #333;

    &:hover {
      color: #9f0013;
    }
  }
}
</style>
