<script setup>
import Link from "../components/Link.vue";
</script>

<template>
  <div class="lost-and-found">
    <h2>Objetos Perdidos</h2>
    <section>
      <h3>Bienvenido a la Sección de Objetos Perdidos y Encontrados</h3>
      <p>
        Si has extraviado algún objeto o has encontrado uno, ¡no te preocupes!
        Estamos aquí para ayudarte. A continuación, puedes encontrar una lista
        de los objetos que han sido encontrados y reportados. Si alguno de ellos
        te pertenece, sigue las instrucciones para reclamarlo. También puedes
        reportar cualquier objeto que hayas encontrado para ayudar a que llegue
        a su dueño.
      </p>
      <h4>¿Cómo Funciona?</h4>
      <section>
        <h5>Si Has Perdido un Objeto:</h5>
        <ol>
          <li>
            <span>Busca tu Objeto:</span> Navega a través de la lista de objetos
            perdidos que se actualiza regularmente. Utiliza los filtros o la
            barra de búsqueda para encontrar tu artículo más rápidamente.
          </li>
          <li>
            <span>Reclama tu Objeto:</span> Si encuentras tu objeto, haz clic en
            el botón de "Reclamar" y sigue los pasos indicados para proporcionar
            la información necesaria y demostrar la propiedad del objeto.
          </li>
          <li>
            <span>Entrega:</span> Una vez verificada la propiedad, coordinaremos
            la entrega del objeto de manera segura y conveniente para ti.
          </li>
        </ol>
      </section>
      <section>
        <h5>Si Has Encontrado un Objeto:</h5>
        <ol>
          <li>
            <span>Reporta el Objeto:</span> Haz clic en el botón de "Reportar
            Objeto Encontrado" y completa el formulario con la información del
            objeto que has encontrado, incluyendo una descripción detallada y la
            ubicación donde fue encontrado.
          </li>
          <Link @click="" to="found-items"
            >Reportar Objeto Encontrado</Link
          >
          <li>
            <span>Publicación:</span> Nosotros verificaremos la información y
            publicaremos el objeto en la lista de objetos encontrados para que
            su dueño pueda encontrarlo.
          </li>
          <li>
            <span>Entrega:</span> Ayudaremos a coordinar la entrega del objeto
            al dueño legítimo.
          </li>
        </ol>
      </section>
    </section>
    <h3>Lista de Objetos Perdidos</h3>
    <!-- Aquí puedes incluir los componentes o elementos para mostrar la lista de objetos perdidos -->
  </div>
</template>

<style scoped>
.container {
  padding: 0 1rem;
  text-align: justify;

}
@media (min-width: 640px) {
  .container {
    max-width: 120rem;
    margin: 0 auto;
  }
}
h2,
h3,
h4,
h5 {
  color: #2c3e50;
}

p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}

ol {
  margin-left: 20px;
}

span {
  font-weight: bold;
}
</style>
