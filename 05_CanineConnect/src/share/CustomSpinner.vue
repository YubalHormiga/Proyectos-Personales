<script setup>
import { ref } from 'vue';


const color = ref('cyan')
const size = ref('25rem')
const thickness = ref('1')
const props = defineProps({

})


</script>
<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="q-gutter-md">
      <q-skeleton height="300px" width="300px" />
      <q-skeleton width="300px" />
      <q-skeleton width="300px" height="100px" />
    </div>
    <div class="q-gutter-md">
      <q-skeleton height="300px" width="300px" />
      <q-skeleton width="300px" />
      <q-skeleton width="300px" height="100px" />
    </div>
    <div class="q-gutter-md">
      <q-skeleton height="300px" width="300px" />
      <q-skeleton width="300px" />
      <q-skeleton width="300px" height="100px" />
    </div>
    <div class="q-gutter-md">
      <q-skeleton height="300px" width="300px" />
      <q-skeleton width="300px" />
      <q-skeleton width="300px" height="100px" />
    </div>
    <div class="q-gutter-md">
      <q-skeleton height="300px" width="300px" />
      <q-skeleton width="300px" />
      <q-skeleton width="300px" height="100px" />
    </div>
    <div class="q-gutter-md">
      <q-skeleton height="300px" width="300px" />
      <q-skeleton width="300px" />
      <q-skeleton width="300px" height="100px" />
    </div>
    <div class="q-gutter-md">
      <q-skeleton height="300px" width="300px" />
      <q-skeleton width="300px" />
      <q-skeleton width="300px" height="100px" />
    </div>
  </div>
</template>


