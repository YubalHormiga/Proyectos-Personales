<script setup>
import { computed } from "vue";
const props = defineProps({
  alert: {
    type: Object,
    required: true,
  },
});

const isError = computed(() => {
  return props.alert.type === "error";
});
</script>

<template>
  <div
    :class="[isError ? 'bg-[#D90429]' : 'bg-[#00ADB5]']"
    class="text-[#fdf6fd] p-3 font-bold text-center uppercase mb-3 rounded-md"
  >
    {{ alert.message }}
  </div>
</template>
