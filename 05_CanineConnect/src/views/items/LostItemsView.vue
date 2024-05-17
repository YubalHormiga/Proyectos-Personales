<script setup>
import Link from "@/components/Link.vue";
import ItemsFound from "./ItemsFoundView.vue";
import { useItemsStore } from "@/stores/itemsStore.js";

const items = useItemsStore();
</script>

<template>
  <div class="lost-and-found">
    <h2 class="section-title">Objetos Perdidos</h2>
    <section class="introduction">
      <h3 class="subsection-title">
        Bienvenido a la Sección de Objetos Perdidos y Encontrados
      </h3>
      <p class="intro-text">
        Si has extraviado algún objeto o has encontrado uno, ¡no te preocupes!
        Estamos aquí para ayudarte. A continuación, puedes encontrar una lista
        de los objetos que han sido encontrados y reportados. Si alguno de ellos
        te pertenece, sigue las instrucciones para reclamarlo. También puedes
        reportar cualquier objeto que hayas encontrado para ayudar a que llegue
        a su dueño.
      </p>
      <h4 class="how-it-works-title">¿Cómo Funciona?</h4>
      <section class="lost-steps">
        <h5 class="steps-title">Si has Perdido un Objeto:</h5>
        <ol class="steps-list">
          <li class="step-item">
            <span class="step-highlight">Busca tu Objeto:</span> Navega a través
            de la lista de objetos perdidos que se actualiza regularmente.
            Utiliza los filtros o la barra de búsqueda para encontrar tu
            artículo más rápidamente.
          </li>
          <li class="step-item">
            <span class="step-highlight">Reclama tu Objeto:</span> Si encuentras
            tu objeto, haz clic en el botón de "Reclamar" y sigue los pasos
            indicados para proporcionar la información necesaria y demostrar la
            propiedad del objeto.
          </li>
          <li class="step-item">
            <span class="step-highlight">Entrega:</span> Una vez verificada la
            propiedad, coordinaremos la entrega del objeto de manera segura y
            conveniente para ti.
          </li>
        </ol>
      </section>
      <section class="found-steps">
        <h5 class="steps-title">Si has Encontrado un Objeto:</h5>
        <ol class="steps-list">
          <li class="step-item">
            <span class="step-highlight">Reporta el Objeto:</span> Haz clic en
            el botón de "Reportar Objeto Encontrado" y completa el formulario
            con la información del objeto que has encontrado, incluyendo una
            descripción detallada y la ubicación donde fue encontrado.
          </li>
          <div class="report-link-container">
            <Link @click="" to="found-items" class="report-link">
              Reportar Objeto Encontrado
            </Link>
          </div>
          <li class="step-item">
            <span class="step-highlight">Publicación:</span> Nosotros
            verificaremos la información y publicaremos el objeto en la lista de
            objetos encontrados para que su dueño pueda encontrarlo.
          </li>
          <li class="step-item">
            <span class="step-highlight">Entrega:</span> Ayudaremos a coordinar
            la entrega del objeto al dueño legítimo.
          </li>
        </ol>
      </section>
    </section>
    <p v-if="items.noResults">No han reportado ningún artículo</p>
    <div v-else>
      <h3 class="list-title">Lista de Objetos Perdidos</h3>
      <div class="found-items">
        <ul class="items-list">
          <ItemsFound 
            v-for="item in items.itemsCollection"
            :key="item.id"
            :item="item"
            class="item"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos generales */
.lost-and-found {
  padding: 1rem;
}

.section-title,
.subsection-title,
.how-it-works-title,
.steps-title,
.list-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.intro-text,
.step-item {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.steps-list {
  margin-left: 20px;
}

.step-highlight {
  font-weight: bold;
}

/* Estilos para la sección de objetos encontrados */
.found-items {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.items-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap; 
  gap: 1rem; 
}

.report-link-container {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
}


</style>
