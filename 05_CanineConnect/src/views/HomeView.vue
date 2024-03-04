<script setup>
import { ref } from "vue";
const showContent = ref(false);
</script>

<template>
  <main class="main-section">
    <section class="about-section">
      <div class="initial-content">
        <p class="mission-paragraph">
          Desde mi infancia, he compartido mi vida con una variedad de animales
          gracias a la influencia de mis padres. Mi madre, una amante apasionada
          de los animales, dejó una marca indeleble en mi corazón con su
          devoción por ellos. Aunque falleció cuando yo tenía solo 4 años, su
          legado de amor por los animales perdura. En nuestra casa, convivíamos
          con tortugas de tierra, perros, gatos, patos y más, creando un entorno
          lleno de alegría y compañía animal.
        </p>
      </div>
      <div v-if="showContent">
        <p class="mission-paragraph">
          Mi padre, quien también se despidió de este mundo durante la pandemia,
          continuó con la tradición de tener perros a su alrededor durante gran
          parte de su vida. Sin embargo, llegó un momento en el que, debido a la
          edad, ya no pudo hacerse cargo de ellos. A pesar de ello, su amor por
          los caninos siempre fue evidente y dejó una profunda influencia en mi
          conexión con los animales.
        </p>
        <p class="mission-paragraph">
          Antes de mudarme a Barcelona desde Fuerteventura, decidí adoptar a
          Lua, una encantadora mezcla de pichón maltés que se convirtió en mi
          fiel compañera durante 18 años. Su pérdida fue dolorosa, pero su
          memoria vive en el nuevo miembro de la familia: Neo, un bodeguero con
          mezcla de podenco. Esta experiencia de cuidar y compartir mi vida con
          estos seres tan especiales me ha inspirado a contribuir de manera
          significativa a través de mi carrera como desarrollador web.
        </p>
        <p class="mission-paragraph">
          Ahora, como aspirante a Junior Developer, mi objetivo es trascender la
          tecnología y utilizar mis habilidades para marcar la diferencia en la
          vida de los animales necesitados. Mi proyecto consiste en crear una
          página web dedicada a ayudar a los perros sin hogar a encontrar
          familias amorosas. Quiero diseñar una plataforma que no solo facilite
          la adopción de estos animales, sino que también sensibilice a la
          sociedad sobre la importancia de la tenencia responsable de mascotas.
        </p>
        <p class="mission-paragraph">
          A través de esta iniciativa, busco fusionar mi pasión por la
          programación con mi profundo amor y respeto por los animales. Quiero
          construir un puente tecnológico que conecte a personas con el deseo de
          dar un hogar a un perro con aquellos que buscan la compañía leal y
          amorosa de un nuevo amigo peludo. Al hacerlo, espero contribuir a
          crear un mundo en el que cada perro tenga la oportunidad de vivir una
          vida plena y feliz en un hogar lleno de amor.
        </p>
      </div>
      <button @click="showContent = !showContent">Mostrar más</button>
      <p><span class="values-heading">Valores:</span></p>
      <ul class="values-list">
        <li class="value-item">Compasión</li>
        <li class="value-item">Responsabilidad</li>
        <li class="value-item">Transparencia</li>
        <li class="value-item">Colaboración</li>
      </ul>
    </section>
    <section id="historias" class="inspiring-stories-section">
      <h2 class="stories-heading">Historias inspiradoras</h2>
      <ul class="stories-list">
        <li class="story-item">
          <a href="" class="story-link">
            <img src="" alt="Foto de Toby" class="story-image" />
            <h3 class="story-title">La historia de Toby</h3>
          </a>
        </li>
        <li class="story-item">
          <a href="" class="story-link">
            <img src="" alt="Foto de Luna" class="story-image" />
            <h3 class="story-title">La historia de Luna</h3>
          </a>
        </li>
        <li class="story-item">
          <a href="" class="story-link">
            <img src="" alt="Foto de Max" class="story-image" />
            <h3 class="story-title">La historia de Max</h3>
          </a>
        </li>
      </ul>
    </section>
    <section id="llamada-a-la-accion" class="call-to-action-section">
      <h2 class="cta-heading">¿Quieres ayudar?</h2>
      <ul class="cta-list">
        <li class="cta-item">
          <a href="adoptar-un-perro.html" class="cta-link">Adopta un perro</a>
        </li>
        <li class="cta-item">
          <a href="donar.html" class="cta-link"
            >Dona para ayudar a los perros sin hogar</a
          >
        </li>
        <li class="cta-item">
          <a href="voluntariado.html" class="cta-link">Sé voluntario</a>
        </li>
        <li class="cta-item">
          <a href="compartir.html" class="cta-link">Comparte esta página web</a>
        </li>
      </ul>
    </section>
  </main>
</template>
<style scoped>
.about-section {
  text-align: justify;
}
</style>
