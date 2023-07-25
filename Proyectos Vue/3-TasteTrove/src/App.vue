<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Modal from "./components/Modal.vue";
import { useModalStore } from "../src/stores/modal";
import Notofication from "./components/Notofication.vue";
import { useNotificationStore } from "./stores/notification";
const modal = useModalStore();
const notification = useNotificationStore();
</script>
<template>
  <Header />
  <Modal v-if="modal.modal" />
  <RouterView />
  <Notofication />
</template>

<style scoped></style>
