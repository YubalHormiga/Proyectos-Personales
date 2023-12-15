<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="title">
    <RouterLink :to="{ name: 'new-booking' }" class="no-underline">
      <div class="center">
        <h1 class="border">WaterSportWorld</h1>
        <h1 class="wave">WaterSportWorld</h1>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.no-underline {
  text-decoration: none;
}

.center {
  margin-top: 20rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 9vw;
  position: absolute;
  color: #fff;
  opacity: 0.6;
  text-align: center;
  margin: 0;
}

.border {
  color: rgb(233, 240, 217);
  text-shadow: -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white,
    1px 1px 0 white;
}

.wave {
  color: rgb(7, 18, 173);
  animation: wave 3s ease-in-out infinite;
}

.two {
  transform: translateY(0.8em);
}

.three {
  transform: translateY(-0.8em);
}

@keyframes wave {
  0%, 100% {
    clip-path: polygon(
      0% 47%,
      10% 48%,
      33% 54%,
      54% 60%,
      70% 61%,
      84% 59%,
      100% 52%,
      100% 100%,
      0% 100%
    );
  }

  50% {
    clip-path: polygon(
      0% 60%,
      15% 65%,
      34% 66%,
      51% 62%,
      67% 50%,
      84% 45%,
      100% 46%,
      100% 100%,
      0% 100%
    );
  }
}
</style>
