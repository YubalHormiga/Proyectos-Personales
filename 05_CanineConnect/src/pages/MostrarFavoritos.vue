<script setup>
import {ref} from 'vue'
import { UseDogsStore } from "../stores/dogs.js";
import CustomSpinner from "../share/CustomSpinner.vue";

const dogs = UseDogsStore();
const expanded = ref(false);


</script>
<template>
  <h5 class="text-center">Mis Favoritos</h5>
  <div class="bg-grey-2">
    <div v-if="dogs.spinner" class="row justify-center q-mt-lg">
      <CustomSpinner  />
    </div>
    <div v-else>
      <div class="q-pa-md" style="max-width: 300px">
        <div class="q-gutter-md">
          <q-select
            standout="bg-grey-6 text-white"
            v-model="dogs.selectedBreed"
            :options="dogs.options"
            label="Selecciona Raza"
          />
        </div>
      </div>
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card
          v-for="(dato, index) in dogs.favoritos"
          :key="index"
          class="my-card"
          flat
          bordered
        >
          <!-- Move q-img inside the template -->
          <q-img
            :src="dato.image?.url || '../../public/cat.jpg'"
            :alt="dato.name"
          />
          <q-card-section>
            <div class="text-overline text-orange-9">
              {{ dato.breed_group }}
            </div>
            <div class="text-h5 q-mt-sm q-mb-xs">{{ dato.name }}</div>
            <div class="text-caption text-grey">
              {{ dato.bred_for }}
            </div>
          </q-card-section>
          <q-card-actions style="height: 100px">
            <q-btn flat color="brown-10" label="Share" />
            <q-btn
              flat
              color="blue-grey-10"
              icon="favorite"
              @click="anadirFavoritos(dato.id)"
            />
            <q-space />
            <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded = !expanded"
            />
          </q-card-actions>
          <q-slide-transition>
            <div v-show="expanded">
              <q-separator />
              <q-card-section class="">
                <span  class=" text-blue-8">Temparament: </span> {{ dato.temperament }}
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
      </div>
    </div>
  </div>

</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
