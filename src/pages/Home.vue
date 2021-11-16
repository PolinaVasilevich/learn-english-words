<template>
  <div class="home-page">
    <div class="input" v-if="!dataTable.length">
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

export default {
  name: "home",
  components: { Table },

  setup() {
    const allDataTable = ref([]);
    const dataTable = ref([]);
    const limitWordOfPage = 10;

    const selectedWords = ref("all");

    const observerRef = ref(null);

    onMounted(() => {
      allDataTable.value = JSON.parse(localStorage.getItem("dataTable")) || [];
      if (allDataTable.value.length) {
        dataTable.value = allDataTable.value.slice(0, limitWordOfPage);
      }

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
          return allDataTable.value;
        case "learned":
          return allDataTable.value.filter((word) => word.isLearnt);
        case "new":
          return allDataTable.value.filter((word) => !word.isLearnt);
        default:
          return allDataTable.value;
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

        localStorage.setItem(
          "dataTable",
          JSON.stringify(XLSX.utils.sheet_to_json(worksheet))
        );
      };

      reader.readAsArrayBuffer(file);
    };

    const loadMoreWords = () => {
      dataTable.value = [
        ...dataTable.value,
        ...allDataTable.value.slice(
          dataTable.value.length,
          dataTable.value.length + limitWordOfPage
        ),
      ];
    };

    return {
      dataTable,
      observerRef,
      selectedWords,
      words,
      onUploadFiles,
      loadMoreWords,
    };
  },
};
</script>

<style scoped lang="scss">
.input {
  width: 100%;
  position: relative;
  margin-top: 20px;
  text-align: center;

  &__file {
    opacity: 0;
    visibility: hidden;
    position: absolute;
  }

  &__button {
    width: 100%;
    max-width: 290px;
    padding: 15px;
    height: 60px;
    background: #1bbc9b;
    color: #fff;

    border-radius: 3px;
    cursor: pointer;
    margin: 0 auto;
  }
}
</style>
