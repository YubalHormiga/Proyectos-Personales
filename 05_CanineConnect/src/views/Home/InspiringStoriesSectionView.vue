<!-- InspiringStoriesSectionView OK -->
<template>
  <section class="inspiring-stories-section">
    <h2 class="stories-heading">Historias inspiradoras <span>en Construcción</span></h2>
    <ul class="stories-list">
      <!-- Cada elemento de la lista representa una historia inspiradora -->
      <li class="story-item">
        <a href="#" class="story-link">
          <img
            src="/images/dog1.jpg"
            alt="Foto de Toby"
            class="story-image"
            loading="lazy"
          />
          <h3 class="story-title">La historia de Toby</h3>
        </a>
      </li>
      <li class="story-item">
        <a href="#" class="story-link">
          <img
            src="/images/dog2.jpg"
            alt="Foto de Luna"
            class="story-image"
            loading="lazy"
          />
          <h3 class="story-title">La historia de Luna</h3>
        </a>
      </li>
      <li class="story-item">
        <a href="#" class="story-link">
          <img
            src="/images/dog3.jpg"
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
span {
  color: red;
}
</style>

