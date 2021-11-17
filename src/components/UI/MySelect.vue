<template>
  <select
    class="my-select"
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option value="" disabled>Choose...</option>
    <option
      v-for="(option, index) in options"
      :key="index"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script>
export default {
  name: "my-select",
  props: {
    options: {
      type: Array,
      default: () => [],
      required: true,
    },

    modelValue: {
      type: String,
      required: true,
    },
  },
};
</script>
