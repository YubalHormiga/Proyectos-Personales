<!-- AboutSectionView OK -->
<script setup>
import { ref } from 'vue';

const showContent = ref(false);

const valueList = [
  'Compasión',
  'Responsabilidad',
  'Transparencia',
  'Colaboración',
];
</script>

<template>
  <section class="about-section">
    <article class="initial-content">
      <p class="mission-paragraph">
        Desde mi infancia, he compartido mi vida con una variedad de animales
        gracias a la influencia de mis padres. Mi madre, una amante apasionada
        de los animales, dejó una marca indeleble en mi corazón con su devoción
        por ellos. Aunque falleció cuando yo tenía solo 5 años, su legado de
        amor por los animales perdura. En nuestra casa, convivíamos con tortugas
        de tierra, perros, gatos, patos y más, creando un entorno lleno de
        alegría y compañía animal.
      </p>
    </article>
    
    <article v-if="showContent">
      <p class="mission-paragraph">
        Mi padre, quien también se despidió de este mundo durante la pandemia,
        continuó con la tradición de tener perros a su alrededor durante gran
        parte de su vida. Sin embargo, llegó un momento en el que, debido a la
        edad, ya no pudo hacerse cargo de ellos. A pesar de ello, su amor por
        los caninos siempre fue evidente y dejó una profunda influencia en mi
        conexión con los animales.
      </p>
      <p class="mission-paragraph">
        Antes de mudarme a Barcelona desde Fuerteventura, decidí adoptar a Lua,
        una encantadora mezcla de pichón maltés que se convirtió en mi fiel
        compañera durante 18 años. Su pérdida fue dolorosa, pero su memoria vive
        en el nuevo miembro de la familia: Neo, un bodeguero con mezcla de
        podenco. Esta experiencia de cuidar y compartir mi vida con estos seres
        tan especiales me ha inspirado a contribuir de manera significativa a
        través de mi carrera como desarrollador web.
      </p>
      <p class="mission-paragraph">
        Ahora, como aspirante a Junior Developer, mi objetivo es trascender la
        tecnología y utilizar mis habilidades para marcar la diferencia en la
        vida de los animales necesitados. Mi proyecto consiste en crear una
        página web dedicada a ayudar a los perros sin hogar a encontrar familias
        amorosas. Quiero diseñar una plataforma que no solo facilite la adopción
        de estos animales, sino que también sensibilice a la sociedad sobre la
        importancia de la tenencia responsable de mascotas.
      </p>
      <p class="mission-paragraph">
        A través de esta iniciativa, busco fusionar mi pasión por la
        programación con mi profundo amor y respeto por los animales. Quiero
        construir un puente tecnológico que conecte a personas con el deseo de
        dar un hogar a un perro con aquellos que buscan la compañía leal y
        amorosa de un nuevo amigo peludo. Al hacerlo, espero contribuir a crear
        un mundo en el que cada perro tenga la oportunidad de vivir una vida
        plena y feliz en un hogar lleno de amor.
      </p>
    </article>

    <button
      @click="showContent = !showContent"
      v-if="!showContent"
      class="read-more-button"
      aria-expanded="false"
      aria-controls="additional-content"
    >
      Seguir Leyendo
    </button>
    <button
      @click="showContent = !showContent"
      v-else
      class="close-button"
      aria-expanded="true"
      aria-controls="additional-content"
    >
      Cerrar
    </button>

    <p><span class="values-heading">Valores:</span></p>
    <ul class="values-list">
      <li v-for="(value, index) in valueList" :key="index" class="value-item">
        {{ value }}
      </li>
    </ul>
  </section>
</template>

<style scoped>
.about-section {
  text-align: justify;
  padding: 1rem;
  border-radius: 8px;
  font-family: Arial, sans-serif;
}

.read-more-button,
.close-button {
  border: none;
  border-radius: 0.5rem;
  background-color: var(--accent-200);
  color: white;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-bottom: 1rem;
}

.read-more-button:hover,
.close-button:hover {
  background-color: var(--accent-100);
}

p {
  font-weight: 300;
  margin-bottom: 1rem;
}

.values-heading {
  font-weight: bold;
}

.values-list {
  list-style-type: disc;
  padding-left: 1rem;
}

.value-item {
  margin-bottom: 0.5rem;
}
</style>


