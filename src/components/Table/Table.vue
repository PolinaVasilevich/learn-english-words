<template>
  <table class="table">
    <thead>
      <tr>
        <th>
          <my-select
            :options="[
              { value: 'all', label: 'All words' },
              { value: 'learned', label: 'Learned words' },
              { value: 'new', label: 'New words' },
            ]"
            v-model="selected"
          />

          ({{ dataTable.length }})
        </th>

        <th>Word</th>
        <th>Pronunciation</th>
        <th>Translate</th>
        <th>Definition</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(word, index) in dataTable" :key="index">
        <th>
          <input type="checkbox" disabled :checked="word.isLearned" />
        </th>
        <th>{{ word.Word }}</th>
        <th>{{ word.Pron }}</th>
        <th>{{ word.Translate }}</th>
        <th>{{ word.Definition }}</th>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { computed } from "@vue/reactivity";
export default {
  name: "Table",
  props: {
    dataTable: {
      type: Array,
      required: true,
      default: () => [],
    },
    selectedWords: {
      type: String,
      default: "all",
    },
  },

  setup(props, { emit }) {
    const selected = computed({
      get: () => props.selectedWords,
      set: (val) => {
        emit("update:selectedWords", val);
      },
    });

    return { selected };
  },
};
</script>

<style scoped lang="scss">
.table {
  margin: 30px 0;
  table-layout: fixed;
  width: 70vw;
  border-collapse: collapse;
  border: 1px solid #ccc;

  th,
  td {
    width: 20vh;
    padding: 20px;
    border: 1px solid #ccc;
  }

  thead th,
  tfoot th {
    font-family: "Rock Salt", cursive;
    font-size: 1.5rem;
  }

  select {
    font-size: 1.5rem;
    font-family: "Rock Salt", cursive;
    font-weight: bold;

    appearance: none;
    outline: none;
    background-color: transparent;
    border: none;

    text-align: center;

    cursor: pointer;
  }
}
</style>
