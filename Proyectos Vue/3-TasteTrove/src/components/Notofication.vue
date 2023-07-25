<script setup>
import {useNotificationStore} from '../stores/notification'

const notification = useNotificationStore()
</script>
<template>
  <div v-if="notification.show" class="floating-notification">
    {{ notification.message }}
  </div>
</template>

<style>
.floating-notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}
</style>
