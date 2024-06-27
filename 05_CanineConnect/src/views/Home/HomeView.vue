<!-- HomeView OK -->
<script setup>
// Importamos los componentes
import AboutSectionView from "./AboutSectionView.vue";
import InspiringStoriesSectionView from "./InspiringStoriesSectionView.vue";
import CallToActionSection from "./CallToActionSection.vue";
import MissingDogView from "./MissingDogView.vue";
</script>

<template>
  <main class="main">
    <!-- Componentes incluidos en el orden requerido -->
    <MissingDogView />
    <AboutSectionView />
    <InspiringStoriesSectionView />
    <CallToActionSection />
  </main>
</template>

<style scoped>

</style>
