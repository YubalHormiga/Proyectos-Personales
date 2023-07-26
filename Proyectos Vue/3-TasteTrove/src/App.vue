<script setup>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Modal from "./components/Modal.vue";
import { useModalStore } from "../src/stores/modal";
import Notofication from "./components/Notofication.vue";
const modal = useModalStore();

</script>
<template>
  <Header />
  <RouterView />
  <Modal v-if="modal.modal" />
  <Notofication />
</template>


