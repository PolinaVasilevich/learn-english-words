<template>
  <table class="table">
    <thead>
      <tr>
        <th>
          <select
            :value="selectedWords"
            @change="$emit('update:selectedWords', $event.target.value)"
          >
            <option value="" disabled>Choose filter</option>

            <option value="all">All words</option>
            <option value="learned">Learned words</option>
            <option value="new">New words</option>
          </select>
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
          <input type="checkbox" disabled :checked="word.isLearnt" />
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
    padding: 20px;
    border: 1px solid #ccc;
  }

  thead th,
  tfoot th {
    font-family: "Rock Salt", cursive;
    font-size: 1.5rem;
  }

  select {
    padding: 5px;

    font-size: 1.5rem;
    font-family: "Rock Salt", cursive;
    font-weight: bold;

    outline: none;
    border: none;

    cursor: pointer;
  }
}
</style>
