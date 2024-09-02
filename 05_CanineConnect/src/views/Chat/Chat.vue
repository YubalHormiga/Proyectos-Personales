<script setup>
import ChatMessagesView from './ChatMessagesView.vue';

const chatRules = [
  {
    title: "Respeto Mutuo:",
    description:
      " Mantén siempre un tono respetuoso y amigable con todos los participantes. No se tolerarán insultos, descalificaciones ni lenguaje ofensivo.",
  },
  {
    title: "No Spam:",
    description:
      " Evita enviar mensajes repetitivos, publicidad no solicitada o enlaces que no aporten valor a la conversación.",
  },
  {
    title: "Privacidad:",
    description:
      " No compartas información personal tuya ni de otros usuarios. Respeta la privacidad de los demás.",
  },
  {
    title: "Contenido Apropiado:",
    description:
      " No publiques contenido que sea inapropiado, ilegal o que infrinja derechos de autor. Esto incluye imágenes, videos y enlaces.",
  },
  {
    title: "Feedback Constructivo:",
    description:
      " Si tienes críticas o sugerencias, exprésalas de manera constructiva y con el objetivo de mejorar la experiencia de todos.",
  },
  {
    title: "Moderación:",
    description:
      " Los moderadores tienen la última palabra en la interpretación y aplicación de estas normas. Sigue sus indicaciones y respeta sus decisiones.",
  },
];
</script>

<template>
  <div class="chat-container">
    <!-- Sección de Normas del Chat -->
    <div class="chat-rules-container">
      <h2 class="chat-rules-title">Normas del Chat</h2>
      <ol class="chat-rules-list">
        <li
          v-for="(chatRule, index) in chatRules"
          :key="index"
          class="chat-rule-item"
        >
          <span class="chat-rule-title">{{ chatRule.title }}</span>
          <span class="chat-rule-description"> {{ chatRule.description }}</span>
        </li>
      </ol>
    </div>
    <!-- Sección de Mensajes del Chat -->
    <div class="chat-messages-container">
      <ChatMessagesView />
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal del chat */
.chat-container {
  padding: 1rem;
}

/* Contenedor de las normas del chat */
.chat-rules-container {
  margin-bottom: 1rem;
}

/* Título de las normas del chat */
.chat-rules-title {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: bold;
}

/* Lista de normas del chat */
.chat-rules-list {
  list-style-type: decimal;
  padding-left: 1.5rem;
}

/* Elemento individual de las normas del chat */
.chat-rule-item {
  margin-bottom: 1rem;
}

/* Título de cada norma del chat */
.chat-rule-title {
  font-weight: 700;
  display: block;
  margin-bottom: 0.5rem;
}

/* Contenedor de los mensajes del chat */
.chat-messages-container {
  margin-top: 1rem;
}
</style>
