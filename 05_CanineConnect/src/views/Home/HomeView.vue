<script setup>
import AboutSectionView from "./AboutSectionView.vue";
import InspiringStoriesSectionView from "./InspiringStoriesSectionView.vue";
import CallToActionSection from "./CallToActionSection.vue";
import MissingDogView from "./MissingDogView.vue";
</script>

<template>
  <main class="main-section container">
      <MissingDogView />
      <AboutSectionView />
    <InspiringStoriesSectionView />
    <CallToActionSection />
  </main>
</template>
<style scoped>
.container {
  padding: 0 1rem;
}
@media (min-width: 640px) {
  .container {
    max-width: 120rem;
    margin: 0 auto;
  }
}

</style>
