<!-- HomeView.vue -->
<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

// Arreglo de enlaces principales
const mainLinks = [
  { name: "adoption", text: "Adopta un perro" },
  { name: "donate", text: "Dona" },
  {
    name: "volunteer",
    text: "Sé voluntario",
    external: true,
    href: "https://ajuntament.barcelona.cat/benestaranimal/es/voluntariado",
  },
];

// Arreglo de enlaces de redes sociales

const urlWeb = "https://canine-connect.vercel.app";
const socialLinks = [
  {
    href: `https://api.whatsapp.com/send?text=Visita%20CanineConnect%20aquí:%20${urlWeb}`,
    iconClass: "fa-whatsapp",
    alt: "WhatsApp",
  },
  {
    href: `https://www.addtoany.com/add_to/facebook?linkurl=${urlWeb}`,
    iconClass: "fa-facebook",
    alt: "Facebook",
  },
  {
    href: `https://www.addtoany.com/add_to/twitter?linkurl=${urlWeb}`,
    iconClass: "fa-twitter",
    alt: "Twitter",
  },
  {
    href: `https://www.addtoany.com/add_to/linkedin?linkurl=${urlWeb}`,
    iconClass: "fa-linkedin",
    alt: "LinkedIn",
  },
];
</script>

<template>
  <section class="call-to-action-section">
    <h2 class="cta-heading">¿Quieres ayudar?</h2>
    <ul class="cta-list">
      <!-- Iterar sobre los enlaces principales -->
      <li v-for="link in mainLinks" :key="link.text" class="cta-item">
        <template v-if="link.external">
          <a :href="link.href" target="_blank" class="cta-link">{{
            link.text
          }}</a>
        </template>
        <template v-else>
          <RouterLink :to="{ name: link.name }" class="cta-link">{{
            link.text
          }}</RouterLink>
        </template>
      </li>
      <li class="cta-item cta-media">
        <span>¡Comparte!</span>
        <!-- Enlace para compartir la página -->
        <div class="socialbtns">
          <ul>
            <li v-for="link in socialLinks" :key="link.iconClass">
              <a
                :href="link.href"
                class="fa fa-lg"
                :class="link.iconClass"
                :aria-label="link.alt"
                target="_blank"
              >
                <!-- Enlace visible para accesibilidad -->
                <span class="sr-only">{{ link.alt }}</span>
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
/* Estilo para ocultar el texto visible pero accesible */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.cta-heading {
  font-size: 24px;
  margin-bottom: 20px;
}

.cta-list {
  list-style: none;
  padding: 0;
}

.cta-media {
  display: flex;
  gap: 3rem;
}
.cta-media span {
  margin-right: 1rem;
}

.cta-link,
span {
  text-decoration: none;
}

.cta-link:hover {
  border-bottom: 2px solid var(--accent-100);
}

.socialbtns {
  display: grid;
  place-items: center;
}

.socialbtns ul {
  padding: 0;
}

.socialbtns li {
  list-style: none;
  display: inline-block;
  margin-right: 1rem;
}

.socialbtns .fa {
  color: #fff;
  text-shadow: 1px 1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000,
    -1px -1px 0px #000;
  transition: all ease-out 0.5s;
}

.socialbtns .fa:hover {
  color: #000;
  text-shadow: 1px 1px 0px #fff, 1px -1px 0px #fff, -1px 1px 0px #fff,
    -1px -1px 0px #fff;
  transition: all ease 0.5s;
}
</style>
