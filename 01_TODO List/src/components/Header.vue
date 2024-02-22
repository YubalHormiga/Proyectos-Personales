<template>
  <h1 class="font-black text-5xl text-center text-[#fdf6fd]">
    TODO <span class="dynamic-text">List</span>
  </h1>
</template>
<style lang="css">
.dynamic-text {
  animation: changeColor 10s infinite;
}

@keyframes changeColor {
  0%,
  24% {
    color: #9b5de5;
  }
  25%,
  49% {
    color: #f15bb5;
  }
  50%,
  74% {
    color: #fee440;
  }
  75%,
  99% {
    color: #00bbf9;
  }
}
</style>
