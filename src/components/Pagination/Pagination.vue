<template>
  <div class="pagination">
    <button
      class="pagination__btn"
      @click="previewPage"
      :disabled="currentPage === 0"
    >
      Preview
    </button>
    <p class="pagination__item">
      {{ currentPage + 1 }}
    </p>
    <button
      class="pagination__btn"
      @click="nextPage"
      :disabled="currentPage === totalPages"
    >
      Next
    </button>
  </div>
</template>

<script>
import { computed, ref, toRefs } from "@vue/reactivity";

export default {
  name: "pagination",
  props: {
    limitWordOfPage: {
      type: Number,
      default: 10,
    },
  },

  setup(props) {
    const { dataLength, limitWordOfPage } = toRefs(...props);

    const totalPages = computed(() => {
      return Math.ceil(dataLength / limitWordOfPage);
    });

    const currentPage = ref(0);

    const nextPage = () => {
      if (currentPage.value === totalPages) return;
      currentPage.value++;
    };

    const previewPage = () => {
      if (currentPage.value === 0) return;

      currentPage.value--;
    };

    const words = computed(() => {
      return props.dataTable.slice(
        currentPage.value * limitWordOfPage,
        currentPage.value * limitWordOfPage + limitWordOfPage
      );
    });

    return { totalPages, currentPage, words, nextPage, previewPage };
  },
};
</script>

<style lang="scss">
.pagination {
  margin-top: 30px;
  display: flex;
  align-content: center;

  &__item {
    padding: 10px;
    border: 1px solid #ccc;

    cursor: pointer;
  }

  &__btn {
    padding: 10px;
    border: 1px solid #ccc;

    outline: none;
    background: none;

    cursor: pointer;
  }
}
</style>
