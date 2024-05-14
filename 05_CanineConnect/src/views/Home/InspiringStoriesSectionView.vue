<script setup></script>

<template>
  <section class="inspiring-stories-section">
    <h2 class="stories-heading">Historias inspiradoras</h2>
    <ul class="stories-list">
      <li class="story-item">
        <a href="" class="story-link">
          <img
            src="../../../public/images/toby.jpg"
            alt="Foto de Toby"
            class="story-image"
            loading="lazy"
          />
          <h3 class="story-title">La historia de Toby</h3>
        </a>
      </li>
      <li class="story-item">
        <a href="" class="story-link">
          <img
            src="../../../public/images/toby.jpg"
            alt="Foto de Luna"
            class="story-image"
            loading="lazy"
          />
          <h3 class="story-title">La historia de Luna</h3>
        </a>
      </li>
      <li class="story-item">
        <a href="" class="story-link">
          <img
            src="../../../public/images/toby.jpg"
            alt="Foto de Max"
            class="story-image"
            loading="lazy"
          />
          <h3 class="story-title">La historia de Max</h3>
        </a>
      </li>
    </ul>
  </section>
</template>
<style scoped>
.story-item {
  list-style: none;
}
.story-link {
  text-decoration: none;
}
.story-image {
  width: 10rem;
}
</style>
