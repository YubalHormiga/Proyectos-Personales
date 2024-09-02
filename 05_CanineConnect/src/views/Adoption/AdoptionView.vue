<script setup>
import Link from "@/components/Link.vue";
import { useAuthStore } from "@/stores/authStore";
import { RouterLink } from "vue-router";

const infoGuide = [
  {
    title: "Explora Perfiles:",
    text: "Navega a través de una amplia variedad de perros de diferentes tamaños, edades y personalidades. Cada perfil incluye fotos y una descripción detallada para ayudarte a encontrar al perro ideal para ti.",
  },
  {
    title: "Encuentra el Compañero Ideal:",
    text: " Utiliza nuestros filtros de búsqueda para ajustar las opciones según tus preferencias y necesidades, como tamaño, raza, nivel de actividad y más.",
  },
  {
    title: "Solicita una Adopción:",
    text: "Cuando encuentres al perro que te enamora, completa la solicitud de adopción directamente en nuestra plataforma. Podrás proporcionarnos detalles sobre tu hogar y tu experiencia con mascotas.",
  },
  {
    title: "Conecta con las Protectores:",
    text: "Recibirás una respuesta de la protectora o refugio encargado del perro. Ellos te proporcionarán más información y coordinarán los siguientes pasos para una posible adopción.",
  },
  {
    title: "Prepárate para la Llegada:",
    text: "Una vez aprobada tu solicitud, prepara tu hogar para recibir a tu nuevo amigo y empieza a disfrutar de la maravillosa experiencia de tener un perro.",
  },
];
const whyAdopt = [
  {
    title: "Amor Incondicional:",
    text: "Los perros adoptados son agradecidos y se integran con amor y lealtad en sus nuevos hogares.",
  },
  {
    title: "Cambio de Vida:",
    text: "Estás dando a un perro la oportunidad de una vida mejor y ayudando a reducir el número de animales sin hogar.",
  },
  {
    title: "Compañía y Alegría: ",
    text: " Un perro puede ser el mejor amigo, compañero de aventuras y una fuente constante de alegría.",
  },
];

const authStore = useAuthStore();
</script>

<template>
  <Link to="add-adoption" v-if="authStore.isAdmin" Añadir Adopción
    >Añadir perro en adopción</Link
  >
  <header>
    <h2>¡Encuentra a tu Nuevo Mejor Amigo en CanineConnect!</h2> 
   
  </header>

  <main>
    <p>
      En CanineConnect, estamos emocionados de ayudarte a encontrar el compañero
      perfecto que traerá alegría y amor a tu vida. Adoptar un perro no solo
      significa añadir un miembro a tu familia, sino también darle a un perro
      una segunda oportunidad en la vida.
    </p>
    <p>
      Si eres una protectora o un refugio comprometido con el bienestar animal,
      ¡nos encantaría contar contigo!
    </p>
    <div class="dog-icon-header">
      <RouterLink
        class="router-link"
        :to="{ name: 'adoption-list' }"
        title="Ver perros disponibles para adopción"
      >
        <div class="content-icon-header">
          <img src="../../assets/icons/dog.webp" alt="Adoption" />
          <span>Ver perros en adopción</span>
        </div>
      </RouterLink>
    </div>
  </main>
  <section>
    <h3>¿Cómo Funciona?</h3>
    <ol>
      <li v-for="guide in infoGuide" :key="guide.title">
        <h4>{{ guide.title }}</h4>
        <p>{{ guide.text }}</p>
      </li>
    </ol>
  </section>
  <section>
    <h3>¿Por Qué Adoptar?</h3>
    <ol>
      <li v-for="why in whyAdopt" :key="why.title">
        <h4>{{ why.title }}</h4>
        <p>{{ why.text }}</p>
      </li>
    </ol>
  </section>
  <section>
    <h3>¿Listo para adoptar?</h3>
    <p>
      ¡Descubre a los increíbles perros que están esperando por un hogar
      amoroso!
    </p>
    <div class="dog-icon-footer">
      <RouterLink
        class="router-link"
        :to="{ name: 'adoption-list' }"
        title="Ver perros disponibles para adopción"
      >
        <div class="content-icon-footer">
          <img src="../../assets/icons/dog.webp" alt="Adoption" />
          <span>Ver perros en adopción</span>
        </div>
      </RouterLink>
    </div>
  </section>
</template>
<style scoped>
h2 {
  text-align: center;
}
h2,
p {
  margin-bottom: 1rem;
}
span {
  display: block;
  text-align: center;
  color: var(--accent-200);
  font-weight: bold;
}
/* Estilo general del enlace */

.router-link {
  text-decoration: none;
}
.dog-icon-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.content-icon-header {
  display: flex;
  flex-direction: column;
  flex-direction: column-reverse;
  align-items: center;
  
}
.content-icon-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-icon-footer img{
  height: 4rem;
  padding: 0 1rem 0 0
}
</style>
