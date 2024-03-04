<script setup>
import { currentPage, totalPages } from "../composables/usePagination.js";
</script>

<template>
  <div v-if="totalPages > 1" style="margin-top: 20px">
    <button v-if="currentPage > 1" @click="currentPage -= 1">
      {{ prevIcon }}
    </button>

    <button
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      @click="currentPage = pageNumber"
      :class="{ active: currentPage === pageNumber }"
    >
      {{ pageNumber }}
    </button>

    <button v-if="currentPage < totalPages" @click="currentPage += 1">
      {{ nextIcon }}
    </button>
  </div>
</template>
<style scoped></style>
