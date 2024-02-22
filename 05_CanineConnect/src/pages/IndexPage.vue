<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { UseDogsStore } from "../stores/dogs.js";
import CustomSpinner from "../share/CustomSpinner.vue";

const dogs = UseDogsStore();

const expanded = ref(false);
const perrosAMostrar = ref([]);
const razaSeleccionada = ref(false);
const itemsPerPage = 10;
const currentPage = ref(1);

onMounted(async () => {
  await dogs.obtener();
  perrosAMostrar.value = dogs.datos;
  razaSeleccionada.value = false;
  updatePerrosAMostrar(currentPage.value);
});

watch(
  () => dogs.selectedBreed,
  (newBreed) => {
    razaSeleccionada.value = !!newBreed;
    perrosAMostrar.value = razaSeleccionada.value
      ? dogs.perrosMismaRaza()
      : dogs.datos;
  }
);

watch(currentPage, (newPage) => {
  updatePerrosAMostrar(newPage);
});

watch(razaSeleccionada, () => {
  updatePerrosAMostrar(currentPage.value);
});

const updatePerrosAMostrar = (page) => {
  const startIdx = (page - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const perrosMostrados = razaSeleccionada.value
    ? dogs.perrosMismaRaza()
    : dogs.datos;

  const totalItems = perrosMostrados.length;

  if (startIdx >= totalItems) {
    currentPage.value = 1;
    return;
  }

  perrosAMostrar.value = perrosMostrados.slice(startIdx, endIdx);
};

const totalPages = computed(() => {
  const perrosMostrados = razaSeleccionada.value
    ? dogs.perrosMismaRaza()
    : dogs.datos;

  return Math.ceil(perrosMostrados.length / itemsPerPage);
});

const prevIcon = "arrow_back";
const nextIcon = "arrow_forward";
</script>

<template>
  <div class="bg-grey-2">
    <div v-if="dogs.spinner" class="row justify-center q-mt-lg">
      <CustomSpinner />
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
      <div class="q-pa-md row justify-center q-gutter-md">
        <q-card
          v-for="(dato, index) in perrosAMostrar"
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
              @click="dogs.anadirFavoritos(dato.id)"
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
              <q-card-section class="text-subtitle2  ">
              <span class="text-subtitle1 text-orange-9">Temparament: </span> {{ dato.temperament }}
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
      </div>
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :max="totalPages"
        :total-visible="totalPages"
        color="deep-orange-5"
        :emit-value="true"
        :input="true"
        :boundary-links="true"
        :prev-icon="prevIcon"
        :next-icon="nextIcon"
        style="margin-top: 20px"
        size="1rem"
      />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
