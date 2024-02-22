<script setup>
import {useNotificationStore} from '../stores/notification'

const notification = useNotificationStore()
</script>
<template>
  <div v-if="notification.show" class="floating-notification">
    {{ notification.message }}
  </div>
</template>


