<!-- LostAndFoundView OK -->
<script setup>
import Link from "@/components/Link.vue";
import FoundItemCard from "./FoundItemCardView.vue";
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
          </li>
          <li class="step-item">
            <span class="step-highlight">Reclama tu Objeto:</span> Si encuentras tu objeto, ponte en contacto con la persona que lo encontró haciendo clic en el botón de "Reclamar" y demuestra que es tuyo. Ten en cuenta que la persona que subió el objeto encontrado será responsable de eliminar el anuncio una vez que se encuentre el dueño. Si no se elimina, el anuncio será borrado automáticamente en el plazo de 7 días.
          </li>
          <li class="step-item">
            <span class="step-highlight">Entrega:</span> Una vez verificada la
            propiedad, serán las personas quienes se coordinen para reunirse y
            entregar el objeto.
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
          <li class="step-item">
            <span class="step-highlight">Mantén el Anuncio:</span> La persona que subió el objeto encontrado será responsable de eliminar el anuncio una vez que se encuentre el dueño. Si no se elimina, el anuncio será borrado automáticamente en el plazo de 7 días.
          </li>
        </ol>
        <div class="report-link-container">
          <Link to="found-items" class="report-link">
            Reportar Objeto
          </Link>
        </div>
      </section>
    </section>
    <p v-if="items.noResults">No han reportado ningún artículo</p>
    <div v-else>
      <h3 class="list-title">Lista de Objetos Perdidos</h3>
      <div class="found-items">
        <ul class="items-list">
          <FoundItemCard 
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
  margin-bottom: 1rem;
}

.intro-text,
.step-item {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.steps-list {
  list-style: none;
  padding: 0;
}

.step-highlight {
  font-weight: bold;
  color: var(--accent-200);
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
