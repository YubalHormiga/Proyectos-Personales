<!-- Footer.vue OK-->
<script setup>
import { RouterLink } from "vue-router";
const socialLinks = [
  {
    href: "https://www.linkedin.com/in/yubal-hormiga/",
    iconClass: "fa-linkedin",
    alt: "LinkedIn",
  },
  {
    href: "https://github.com/YubalHormiga",
    iconClass: "fa-github",
    alt: "GitHub",
  },
];
</script>

<template>
  <footer class="footer-container">
    <div itemscope itemtype="http://schema.org/WPFooter" class="media">
      <div>
        <p class="footer-text" itemprop="copyrightHolder">
          &copy; 2024 <span itemprop="name">Yubal Hormiga</span>
        </p>
      </div>
      <div align="center" class="socialbtns">
        <ul>
          <li v-for="link in socialLinks" :key="link.alt">
            <a
              :href="link.href"
              class="fa fa-lg"
              :class="link.iconClass"
              :alt="link.alt"
              target="_blank"
            >
              <!-- Enlace visible para accesibilidad -->
              <span class="sr-only">{{ link.alt }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-links">
      <div class="links">
        <a href="mailto:yubalhh@yahoo.es" itemprop="url">Contact</a>
      </div>
      <div>
        <RouterLink :to="{ name: 'privacy-policy' }" itemprop="url"
          >Privacy Policy</RouterLink
        >
      </div>
    </div>
  </footer>
</template>
<!-- Se ha añadido un esquema de microdatos usando itemscope y itemtype para definir el WPFooter. También se ha añadido itemprop a los elementos relevantes para indicar el titular del copyright y las URLs. -->
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
.media {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.footer-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.footer-text {
  margin: 0;
  text-align: center;
  color: var(--text-200);
}

.footer-links {
  list-style-type: none;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.footer-links a {
  text-decoration: none;
  color: var(--text-100);
}

.footer-links a:hover {
  border-bottom: 2px solid var(--accent-100);
}

/*Social */

a,
a:hover {
  color: #000;
  text-decoration: none;
  padding: 5px;
}

.socialbtnsbtnsbtns,
.socialbtnsbtnsbtns ul,
.socialbtnsbtnsbtns li {
  margin: 0;
  padding: 5px;
}

.socialbtnsbtnsbtns li {
  list-style: none outside none;
  display: inline-block;
}

.socialbtns li {
  list-style: none outside none;
  display: inline-block;
}

.socialbtns .fa {
  color: #fff;
  text-shadow: 1px 1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000,
    -1px -1px 0px #000;
  -webkit-text-shadow: 1px 1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000,
    -1px -1px 0px #000;
  -moz-text-shadow: 1px 1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000,
    -1px -1px 0px #000;
  -o-text-shadow: 1px 1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000,
    -1px -1px 0px #000;
  transition: all ease-out 0.5s;
  -moz-transition: all ease-out 0.5s;
  -webkit-transition: all ease-out 0.5s;
  -o-transition: all ease-out 0.5s;
}

.socialbtns .fa:hover {
  color: #000;
  text-shadow: 1px 1px 0px #fff, 1px -1px 0px #fff, -1px 1px 0px #fff,
    -1px -1px 0px #fff;
  -webkit-text-shadow: 1px 1px 0px #fff, 1px -1px 0px #fff, -1px 1px 0px #fff,
    -1px -1px 0px #fff;
  -moz-text-shadow: 1px 1px 0px #fff, 1px -1px 0px #fff, -1px 1px 0px #fff,
    -1px -1px 0px #fff;
  -o-text-shadow: 1px 1px 0px #fff, 1px -1px 0px #fff, -1px 1px 0px #fff,
    -1px -1px 0px #fff;
  transition: all ease 0.5s;
  -moz-transition: all ease-in 0.5s;
  -webkit-transition: all ease-in 0.5s;
  -o-transition: all ease-in 0.5s;
}
</style>
