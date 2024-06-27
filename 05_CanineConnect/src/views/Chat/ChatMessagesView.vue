// ChatMessagesView OK
<script setup>
// Importamos las funciones y referencias necesarias desde Vue
import { ref, inject, computed } from "vue";
// Importamos los stores para el manejo del chat y la autenticación
import { useChatStore } from "@/stores/chatStore";
import { useAuthStore } from "@/stores/authStore";

// Inicializamos el store del chat y de autenticación
const messagesStore = useChatStore();
const authStore = useAuthStore();

// Creamos una referencia para el nuevo mensaje
const newMessage = ref("");
// Definimos la longitud máxima del mensaje
const maxLength = 300;
// Creamos una referencia para manejar el estado de envío del mensaje
const isSending = ref(false);
// Inyectamos el servicio de notificación (toast)
const toast = inject("toast");

// Computed property para comprobar si el mensaje supera la longitud máxima
const isOverLimit = computed(() => newMessage.value.length > maxLength);

// Computed property para determinar si el botón de enviar debe estar deshabilitado
const isDisabled = computed(
  () => isSending.value || newMessage.value.trim() === "" || isOverLimit.value
);

// Función para manejar el envío del mensaje
const handleSubmit = async () => {
  try {
    // Si el mensaje no está vacío y no supera el límite de caracteres
    if (newMessage.value.trim() && !isOverLimit.value) {
      // Marcamos el estado como enviando
      isSending.value = true;
      // Enviamos el mensaje usando el store del chat
      await messagesStore.sendMessage(
        newMessage.value,
        authStore.userData.displayName,
        authStore.userData.uid
      );

      // Limpiamos el campo de nuevo mensaje después de enviarlo
      newMessage.value = "";
    } else if (isOverLimit.value) {
      // Si el mensaje supera el límite de caracteres, mostramos una notificación de error
      toast.open({
        message: `El mensaje supera el máximo de ${maxLength} caracteres.`,
        type: "error",
      });
    } else {
      // Si el mensaje está vacío, mostramos una notificación de error
      toast.open({
        message: "El mensaje está vacío",
        type: "error",
      });
    }
  } catch (error) {
    // Si ocurre un error durante el envío, lo mostramos en la consola
    console.error("Error enviando mensaje: ", error);
  } finally {
    // Restauramos el estado de envío
    isSending.value = false;
  }
};
</script>

<template>
  <section class="chat-container">
    <section class="messages-section">
      <h3>Mensajes:</h3>
      <ul class="messages-list">
        <article
          v-for="(message, index) in messagesStore.messagesCollection"
          class="message-item"
          :class="{
            'blue-message': index % 2 === 0,
            'green-message': index % 2 !== 0,
          }"
          :key="message.id"
        >
          <div>
            <span class="message-author">{{ message.displayName }}: </span>
            {{ message.text }} -
            <span class="message-timestamp">{{
              new Date(message.timestamp.seconds * 1000).toLocaleString()
            }}</span>
          </div>
          <div v-if="message.uid === authStore.userData.uid">
            <button
              type="button"
              @click="messagesStore.deleteMessage(message.id)"
              aria-label="Eliminar mensaje"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-trash"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ff2825"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </button>
          </div>
        </article>
      </ul>
      <p class="no-messages" v-if="messagesStore.noResults">No hay mensajes</p>
    </section>
    <div class="user-info">
      <span>Nombre de usuario: </span>{{ authStore.userData.displayName }}
    </div>
    <form class="message-form" @submit.prevent="handleSubmit">
      <textarea
        class="message-input"
        :class="{ 'over-limit': isOverLimit }"
        v-model="newMessage"
        placeholder="Escribe tu mensaje..."
        :disabled="isSending"
        rows="3"
        cols="50"
      ></textarea>
      <div class="message-length">
        {{ newMessage.length }} / {{ maxLength }}
      </div>
      <button class="send-button" type="submit" :disabled="isDisabled">
        Enviar
      </button>
    </form>
  </section>
</template>

<style>
.chat-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user-info {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
}

.message-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.message-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  resize: none;
}

.message-input:disabled {
  background-color: #e9ecef;
  cursor: not-allowed;
}

.message-input.over-limit {
  border-color: red;
  color: red;
}

.message-length {
  align-self: flex-end;
  font-size: 12px;
  color: #666;
}

.send-button {
  align-self: flex-end;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.send-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.send-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.messages-section {
  margin-top: 20px;
}

.messages-list {
  list-style: none;
  padding: 0;
}

.message-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #b2ebf2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.blue-message {
  background-color: #d1e7fd;
  border: 1px solid #91c7f1;
}

.green-message {
  background-color: #d4edda;
  border: 1px solid #a3d8b0;
}

.message-author {
  font-weight: bold;
}

.message-timestamp {
  font-size: 12px;
  color: #666;
}

.no-messages {
  text-align: center;
  color: #666;
}

button {
  border: none;
  background: none;
  cursor: pointer;
}
</style>

